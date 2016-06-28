module.exports = function ($scope, Product, AttributeSet, NcAlert, $base64, $filter, $interval, NCConfirm, smoothScroll, $timeout) {
	'ngInject';
	$scope.ProductList = [];
	$scope.SELECT_ALL = false;
	$scope.sumProductAttributeSet = 0;
	$scope.loading = [];
	$scope.availableFields = {};
	$scope.selectAllAttributeSets = false;
	$scope.columnCount = 3;
	$scope.availableFieldsColumn = [];
	$scope.ready = false;
	var mandatoryFields = new Set(['AAD', 'AAB', 'AAC', 'AAA']);
	var exportProgressInterval;

	$scope.shouldBeMandatory = function(mapName){
			return mandatoryFields.has(mapName);
	}

	Product.getExportableFields().then(function (data) {
		data.forEach(function (record) {
			var groupName = record.GroupName;
			var headerName = record.HeaderName;
			if (!_.has($scope.availableFields, groupName)) {
				$scope.availableFields[groupName] = [];
			}

			$scope.availableFields[groupName].push(record);
			$scope.fields[record.MapName] = mandatoryFields.has(record.MapName);
			$scope.loading.push(true);
		});

		var groupList = Object.keys($scope.availableFields);

		for (var i = 0; i < $scope.columnCount; i++) {
			var dct = {};
			var keyPerColumn = Math.ceil(groupList.length / $scope.columnCount) + 1;

			for (var j = 0; j <= keyPerColumn; j++) {
				var moveKey = groupList.shift();
				if (!moveKey) continue;
				dct[moveKey] = ($scope.availableFields[moveKey]);
			}

			$scope.availableFieldsColumn.push(dct);
		}

		console.log('allowed', $scope.availableFieldsColumn);

	});

	$scope.onSearch = function (q) {
		console.log(q, $scope.dataSet.attributeSets);
		$scope.dataSet.attributeSets = $filter('filter')($scope.dataSet._attributeSets, q);
	}

	var normalFlow = function () {
		if (productIds.length == 0) {
			$scope.SELECT_ALL = true;
		}

		$scope.ProductList = productIds.map(function (p) {
			return { ProductId: p }
		});

		$scope.dataSet.attributeSets = {};
		if ($scope.SELECT_ALL) {
			AttributeSet.getAll({
				byShop: true
			}).then(function (data) {
				$scope.dataSet.attributeSets = data.data.map(function (m) {
					//m.Display = m.AttributeSetNameEn + " (" + m.ProductCount + ")";
					m.Display = m.AttributeSetNameEn;
					$scope.sumProductAttributeSet += Number(m.ProductCount);
					$scope.loading.push(true);
					return m;
				});
				$scope.dataSet._attributeSets = $scope.dataSet.attributeSets;
				console.log(data);
			});
		} else {
			Product.getAllAttributeSetsForProducts($scope.ProductList).then(function (data) {
				$scope.dataSet.attributeSets = data.map(function (m) {
					// m.Display = m.AttributeSetNameEn + " (" + m.ProductCount.length + ")";
					m.Display = m.AttributeSetNameEn;
					$scope.sumProductAttributeSet += Number(m.ProductCount.length);
					$scope.loading.push(true);
					return m;
				});
				$scope.dataSet._attributeSets = $scope.dataSet.attributeSets;
				console.log(data);
			});
		}
	}

	$scope.exportAsyncDelegate = {
			active: false,
			progress: 0,
			requestDate: null,
			endDate: null
	};

	//TODO: Optimization required
	var productIds = [];
	$scope.init = function (viewBag) {
		productIds = viewBag.selectedProducts || [];
		var searchCriteriaObject = (viewBag.searchCriteria != "" && viewBag.searchCriteria != null) ? JSON.parse($base64.decode(viewBag.searchCriteria)) : null;

		console.log(viewBag, searchCriteriaObject, productIds);

		if (searchCriteriaObject) {
			return Product.advanceList(searchCriteriaObject).then(function (data) {
				console.log(data, 'recv data advanced list');
				$scope.SELECT_ALL = false;

				//restructure into normal flow
				productIds = data.data.map(function (i) {
					return i.ProductId;
				});

				$scope.ready = true;
				normalFlow();
			});
		}

		$scope.ready = true;
		normalFlow();
	}

	$scope.exporter = {
			progress: 0
	};

	$scope.startExportProducts = function () {
		$scope.exporter = {
			progress: 0,
			title: 'Requesting product export...'
		};

		$("#export-product").modal('show');
	};

	$scope.alert = new NcAlert();

	$scope.allowExport = function(){
		if(!$scope.exportAsyncDelegate.active) return true;
		if(!$scope.exportAsyncDelegate.requestDate) return true;
		if($scope.exportAsyncDelegate.requestDate && $scope.exportAsyncDelegate.progress == 0) return false;
		return !($scope.exportAsyncDelegate.progress > 0 && $scope.exportAsyncDelegate.progress < 100);
	}



	$scope.abortExport = function () {

		NCConfirm('Cancel Export', 'Are you sure you want to cancel this ongoing export?', function () {
			Product.exportAbort().then(function (result) {
				$interval.cancel(exportProgressInterval);
					$scope.alert.error("Export has been cancelled.");
					$scope.exportAsyncDelegate.active = false;
				});
			});
	}


	$scope.confirmExportProducts = function () {


		var error = function (r) {
			$(".modal").modal('hide');
			$scope.exporter.title = 'Error'
			$scope.alert.error('Unable to Export Product');
			$scope.reloadData();
		};


		var body = {};
		body.Options = [];
		body.ProductList = $scope.ProductList;
		body.AttributeSets = $scope.ctrl.tradedAS;

		Object.keys($scope.fields).forEach(function (fieldKey) {
			if ($scope.fields[fieldKey] == true) {
				body.Options.push(fieldKey);
			}
		});

		if ($scope.selectAllAttributeSets) {
			body.AttributeSets = $scope.dataSet.attributeSets;
		}

		Product.export(body).then(function (rx) {
            var fileName = "ProductExport.csv";
            $(".modal").modal('hide');
            //modal-download-btn
            var blobs = [];
            blobs.push(rx);
            var file = new Blob(blobs, { type: 'application/octet-stream' });
            var fileURL = URL.createObjectURL(file);
            if(window.navigator.msSaveOrOpenBlob){
                window.navigator.msSaveOrOpenBlob(file, fileName);
            }else{
                saveAs(file, fileName);
            }

		}, error);
	}


	$scope.downloadFile = function () {
		// Product.exportGet().then(function (rx) {
		// 	var fileName = "ProductExport.csv";
		// 	var a = document.getElementById("export_download_btn");
		// 	var blobs = [];
		// 	blobs.push(rx);
		// 	var file = new Blob(blobs, { type: 'application/octet-stream' });
		// 	var fileURL = URL.createObjectURL(file);
		// 	$scope.exporter.href = fileURL;
		// 	$scope.exporter.download = fileName;
		// 	$scope.exporter.progress = 100;

		// 	if(window.navigator.msSaveOrOpenBlob){
		// 		//Handle IE
		// 		window.navigator.msSaveOrOpenBlob(file, fileName);
		// 	}
		// 	else{
		// 		//File saver API
		// 		saveAs(file, fileName);
		// 	}
		// });
	}

	$scope.lockAS = function () {
		return false
	}

	$scope.dataSet = {};


	$scope.ctrl = {
		selectAll: false,
		tradedAS: []
	};
	$scope.toggleSelectAll = function () {
		Object.keys($scope.fields).forEach(function (key) {
			$scope.fields[key] = $scope.ctrl.selectAll;
		});

		mandatoryFields.forEach(function(mf){
				$scope.fields[mf] = true;
		});


	};


	$scope.$watch('fields', function () {
		var m = Object.keys($scope.fields).map(function (k) {
			return $scope.fields[k];
		}).reduce(function (prev, cur) {
			return prev && cur;
		}, true);
		$scope.ctrl.selectAll = m;
	}, true);

	$scope.fields = {
		AAD: true
	};
};
