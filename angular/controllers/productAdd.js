module.exports = ['$scope', 'Product', 'Image', 'AttributeSet', 'Brand', 'Shop', 'GlobalCategory', 'Category', 'VariantPair', function($scope, Product, ImageService, AttributeSet, Brand, Shop, GlobalCategory, Category, VariantPair){
	'use strict';
	$scope.logForm = function(){
		console.log('formData', $scope.formData);
	};

	$scope.formData = {
		MasterImages: [],
		MasterImages360: [],
		VideoLinks: [],
		Variants: []
	};

	//Attribute Options to be filled via API
	$scope.availableAttributeSets = [];
	$scope.availableGlobalCategories = [];
	$scope.availableLocalCategories = [];

	$scope.init = function(catId) {
		//Load Attribute Set
		AttributeSet.getByCategory(catId).then(function(data){
			$scope.availableAttributeSets = data; 
		});

		//Load Global Cat
		GlobalCategory.getAll().then(function(data) {
			$scope.availableGlobalCategories = Category.convertDepthArrayToNestedArray(data);
		});

		//Load Local Cat
		LocalCategory.getAll().then(function(data) {
			$scope.availableLocalCategories = Category.convertDepthArrayToNestedArray(data);
		});
	}

	//TODO: Change _attrEnTh(t) to _attrEnTh(Name, t)
	$scope._attrEnTh = function(t){ return t.AttributeSetNameEn + " / " + t.AttributeSetNameTh; }
	//Constant Comparison Functions
	//TODO: Move this to commons or something
	$scope._isFreeTextInput = function(t){
		return (t == "ST");
	};
	$scope._isListInput = function(t){
		return (t == "LT");
	};
	
	//Unmultiplied Variants (factor)
	$scope.attributeOptions = {
		0: {
			attribute: false,
			options: []
		},
		1: {
			attribute: false,
			options: []
		}	
	};

	//Regen select2 field for attribute option
	var initAttributeOptionSelect2 = function(index){
		var freeText = false;
		if($scope.attributeOptions[index].attribute){
			freeText = ($scope._isListInput($scope.attributeOptions[index].attribute.Attribute.DataType));
		}
		//Reset Options
		$(".select2-init-" + index).select2({
			tags: !freeText
		});

		$scope.attributeOptions[index].options = [];
	};

	$scope.$watch('attributeOptions[0].attribute', function(){
		initAttributeOptionSelect2(0);
	});	

	$scope.$watch('attributeOptions[1].attribute', function(){	
		initAttributeOptionSelect2(1);
	});	

	//Multiply attributes into variants
	$scope.$watch('attributeOptions', function(){
		console.log("Attribute Option Changed", $scope.attributeOptions);
		// if($scope.attributeOptions[1].options.length == 0) return;
		// if($scope.attributeOptions[0].options.length == 0) return;
		
		var variantHashes = {};
		//Product Hash Tracking Table
		$scope.formData.Variants.forEach(function(elem, index){
			//Keep track of the index of the hashed item
			variantHashes[elem.hash] = index;
		});

		//Multiply out unmultiplied options
		for(var aKey in $scope.attributeOptions[0].options){
			var A = $scope.attributeOptions[0].options[aKey];
			for(var bKey in $scope.attributeOptions[1].options){
				var B = $scope.attributeOptions[1].options[bKey];

				var kpair = new VariantPair({
					AttributeKey: $scope.attributeOptions[0].attribute,
					AttributeValue: A 
				},{
					AttributeKey: $scope.attributeOptions[1].attribute,
					AttributeValue: B
				});

				//Only push if don't exist
				if(!(kpair.hash in variantHashes)){
					console.log("Appending Pair", variantHashes, kpair.hash)
					$scope.formData.Variants.push(kpair);
				}
				
				//Mark hash as used
				variantHashes[kpair.hash] = -1;
			}
		}

		//Remove deleted variants
		for(var rhash in variantHashes){
			//Only if its unused
			if(variantHashes[rhash] == -1) continue;
			console.log("removing", rhash);
			$scope.formData.Variants.splice(variantHashes[rhash], 1);
		}


		$scope.formData.DefaultVariant = $scope.formData.Variants[0];	
	}, true);

	//When selected attribute change, 
	//the other box wil not allow to have selected option

	var tabPage = {};
	tabPage.global = {
		init: function(){
			//TODO:select2-init classes should probably be named in a more
			//meaningful way	
			$(".select2-init-normal").select2();
			$(".select2-init, .select2-init-normal").on("change", function(ev){
				$scope.$digest();
			});
		}
	};
	tabPage.information = {
		init: function(){
			$(".select2-init-brand").select2({
				templateResult: function(d){
					return d.BrandNameEn + " (" + d.BrandNameTh + ")";
				},
				templateSelection: function(d){
					return d.BrandNameEn + " (" + d.BrandNameTh + ")";	
				},
				ajax: {
					processResults: function (data) {
						var mapped = data.map(function(obj){
							obj.id = obj.$id;
							return obj;
						});

						console.log(mapped);
						return {results: mapped};
					},
					transport: function(params, success, failure){
						//Call Brand Service
						return Brand.getAll(params.data.q).then(success, failure);
					}
				}
			});
		}
	};
	tabPage.variation = {
		init: function(){
			initAttributeOptionSelect2(0);
			initAttributeOptionSelect2(1);
		}
	};	

	//Initialize Select2 stuff
	$.fn.select2.defaults.set("tokenSeparators", [","]);
	$(document).on('shown.bs.tab ready', function(){
		//Initialize All Tab
		tabPage.global.init();
	        for (var page in tabPage){
			tabPage[page].init();
		}	
	});

	//TODO: Init CK Editor (apparently this breaks)
	/*	$('[ckeditor-initialize]').each(function(idx, textarea) {
		CKEDITOR.readyplace( textarea );
	});
	$('.input-icon-calendar').datetimepicker({
		format: "LL" // this is momentjs format make it show only date, no time will be show. see: http://momentjs.com/docs/#/displaying/format/
	});
	*/

	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
	
	/**
	 * PRODUCT IMAGE
	 */
	$scope.uploader = ImageService.getUploader('/ProductImages');
	$scope.uploaderModal = ImageService.getUploader('/ProductImages');
	$scope.uploader360 = ImageService.getUploader('/ProductImages', {
		queueLimit: 60
	});

	//Assign uploader images
	ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages);
    ImageService.assignUploaderEvents($scope.uploader360, $scope.formData.MasterImages360);
    
    /**
     * IMAGE THUMBNAIL EVENTS
     */
    $scope.$on('left', function(evt, item, array, index) {
    	var to = index - 1;
    	if(to < 0) to = array.length - 1;
    	
    	var tmp = array[to];
    	array[to] = item;
    	array[index] = tmp;
    });
    $scope.$on('right', function(evt, item, array, index) {
    	var to = index + 1;
    	if(to >= array.length) to = 0;
    	
    	var tmp = array[to];
    	array[to] = item;
    	array[index] = tmp;
   	});
   	$scope.$on('delete', function(evt, item, array, index) {
   		array.splice(index, 1);
   	});
   	$scope.$on('zoom', function(evt, item, array, index) {
   		//Should use angular way, but ok whatever
        $('#product-image-zoom img').attr('src', item.url);
        $('#product-image-zoom').modal('show');
   	});
   	/**
   	 * 
   	 */

   	/**
   	 * MODALS EVENTS
   	 */
   	$scope.$on('openPairModal', function(evt, pair, array, index){
   		//Define if not defined
   		if(angular.isUndefined(pair.Images)) {
   			pair.Images = [];
   		}
   		if(angular.isUndefined(pair.queue)) {
   			pair.queue = [];
   		}
   		
   		//Modal target (for viewing pair)
   		$scope.pairModal = angular.copy(pair);
   		$scope.pairIndex = index;
   		$scope.uploaderModal.queue = $scope.pairModal;
	   	ImageService.assignUploaderEvents($scope.uploaderModal, $scope.pairModal.Images);

   		//Show modal
   		$('#variant-detail-1').modal('show');
   	});
   	$scope.$on('savePairModal', function(evt){
   		$scope.formData.Variants[$scope.pairIndex] = $scope.pairModal;
   		$('#variant-detail-1').modal('hide');
   	});
   	$scope.$on('openGlobalCat', function(evt, model) {
   		
   	});
   	/**
   	 * 
   	 */

   	//Final saving
   	$scope.save = function() {
   		//TURN $scope.formData into api-able format
   		var formData = {};
   	}
}];
