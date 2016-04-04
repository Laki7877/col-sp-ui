module.exports = function ($scope, Product, AttributeSet, NcAlert, $base64) {
	'ngInject';
	$scope.ProductList = [];
	$scope.SELECT_ALL = false;
	$scope.sumProductAttributeSet = 0;
	$scope.loading = [];
	$scope.availableFields = {};
	$scope.selectAllAttributeSets = false;
	$scope.columnCount = 3;
	$scope.availableFieldsColumn = [];
	Product.getExportableFields().then(function(data){
		data.forEach(function(record){
			var groupName = record.GroupName;
			var headerName = record.HeaderName;
			if(!_.has($scope.availableFields, groupName)){
				$scope.availableFields[groupName] = [];
			}

			$scope.availableFields[groupName].push(record);
			$scope.fields[record.MapName] = (record.MapName == 'PID');
			$scope.loading.push(true);
		});

		var groupList = Object.keys($scope.availableFields);
			for(var i = 0; i < $scope.columnCount; i++){
				var dct = {};
				var keyPerColumn = Math.ceil(groupList.length / $scope.columnCount);

				for(var j = 0 ; j < keyPerColumn; j++){
					var moveKey = groupList.shift();
					dct[moveKey] = ($scope.availableFields[moveKey]);
				}

				$scope.availableFieldsColumn.push(dct);
		}

	});

	var normalFlow = function(){
		if(productIds.length == 0){
			$scope.SELECT_ALL = true;
		}

		$scope.ProductList = productIds.map(function(p){
			return { ProductId: p }
		});
		
		$scope.dataSet.attributeSets = {};
		if($scope.SELECT_ALL){
			AttributeSet.getAll().then(function(data){
				$scope.dataSet.attributeSets = data.map(function(m){
					m.Display = m.AttributeSetNameEn + " (" + m.ProductCount + ")";
					$scope.sumProductAttributeSet += Number(m.ProductCount);
					$scope.loading.push(true);
					return m;
				});
				console.log(data);
			});
		}else{
			Product.getAllAttributeSetsForProducts($scope.ProductList).then(function(data){
				$scope.dataSet.attributeSets = data.map(function(m){
					m.Display = m.AttributeSetNameEn + " (" + m.ProductCount.length + ")";
					$scope.sumProductAttributeSet += Number(m.ProductCount.length);
					$scope.loading.push(true);
					return m;
				});
				console.log(data);
			});
		}
	}

	var productIds = [];
	$scope.init = function(viewBag){
		productIds = viewBag.selectedProducts || [];
		var searchCriteriaObject = (viewBag.searchCriteria != "" && viewBag.searchCriteria != null) ? JSON.parse($base64.decode(viewBag.searchCriteria)) : null;

		console.log(viewBag, searchCriteriaObject, productIds);

		if(searchCriteriaObject){
			return Product.advanceList(searchCriteriaObject).then(function(data) {
	          	console.log(data, 'recv data advanced list');
	          	$scope.SELECT_ALL = false;
	          	
	          	//restructure into normal flow
	          	productIds = data.data.map(function(i){
	          		return i.ProductId;
	          	});

	          	normalFlow();
	        });
		}
		

		normalFlow();
	}

	$scope.startExportProducts = function () {
		$scope.exporter = {
			progress: 10,
			title: 'Exporting...'
		};

		$("#export-product").modal('show');
	};

	$scope.alert = new NcAlert();
	$scope.confirmExportProducts = function(){

		$("#export-product").modal('hide');

		var fileName = "ProductExport.csv";
		var a = document.getElementById("export_download_btn");

		var error = function (r) {
			$(".modal").modal('hide');
			$scope.exporter.title = 'Error'
				$scope.alert.error('Unable to Export Product');
			$scope.reloadData();
		};

		$scope.exporter.progress = 15;
		var blobs = [];

		var body = {};
		body.Options  = [];
		body.ProductList = $scope.ProductList;
		body.AttributeSets = $scope.ctrl.tradedAS;

		Object.keys($scope.fields).forEach(function(fieldKey){
			if($scope.fields[fieldKey] == true){
				body.Options.push(fieldKey);
			}
		});

		if($scope.selectAllAttributeSets){
			body.AttributeSets = $scope.dataSet.attributeSets;
		}

		Product.export(body).then(function (result) {

			blobs.push(result);
			var file = new Blob(blobs, {type: 'application/csv'});
			var fileURL = URL.createObjectURL(file);
			$scope.exporter.href = fileURL;
			$scope.exporter.download = fileName;
			$scope.exporter.progress = 100;
			//$scope.exporter.title = 'Export Complete'
				a.href = fileURL;
			a.click();

			$("#export-product-progressing").modal('hide');
		}, error);
	}

	$scope.lockAS = function(){
		return false
	}

	$scope.dataSet = {};


	$scope.ctrl = {
		selectAll: false,
		tradedAS: []
	};
	$scope.toggleSelectAll = function(){
		Object.keys($scope.fields).forEach(function(key){
			$scope.fields[key] = $scope.ctrl.selectAll;
		});
		$scope.fields.PID = true;
	};


	$scope.$watch('fields', function(){
		var m = Object.keys($scope.fields).map(function(k){
			return $scope.fields[k];
		}).reduce(function(prev,cur){
			return prev && cur;
		}, true);
		$scope.ctrl.selectAll = m;
	}, true);

	$scope.fields = {
		PID: true
	};
};
