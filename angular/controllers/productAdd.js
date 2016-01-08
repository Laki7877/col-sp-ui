var angular = require('angular');

module.exports = ['$scope', 'Product', 'Image', 'AttributeSet', 'Brand', 'Shop', 'GlobalCategory', 'Category', 'VariantPair', function($scope, Product, ImageService, AttributeSet, Brand, Shop, GlobalCategory, Category, VariantPair){
	'use strict';
	$scope.logForm = function(){
		console.log('formData', $scope.formData);
	};

	$scope.formData = {
		MasterImages: [],
		MasterImages360: [],
		VideoLinks: [],
		Variants: [],
		GlobalCategories: [null,null,null],
		LocalCategories: [null,null,null]
	};

	/**
	 * All Tabs
	 * Seperated by jquery parts and angular parts
	 * WWWW
	 */
	var tabPage = {};
	tabPage.global = {
		jquery: function(){

			//TODO: Init CK Editor (apparently this breaks)
			/*	$('[ckeditor-initialize]').each(function(idx, textarea) {
				CKEDITOR.readyplace( textarea );
			});
			$('.input-icon-calendar').datetimepicker({
				format: "LL" // this is momentjs format make it show only date, no time will be show. see: http://momentjs.com/docs/#/displaying/format/
			});
			*/

			$("body").tooltip({ selector: '[data-toggle=tooltip]' });

			//TODO:select2-init classes should probably be named in a more
			//meaningful way	
			$.fn.select2.defaults.set("tokenSeparators", [","]);
			$(".select2-init-normal").select2();
			$(".select2-init, .select2-init-normal").on("change", function(ev){
				$scope.$digest();
			});
		},
		angular: function() {
			$scope.init = function(catId) {
				if(angular.isUndefined(catId)) {
					catId = 13;
				}
				//Load Attribute Set
				AttributeSet.getByCategory(catId).then(function(data){
					$scope.availableAttributeSets = data; 
				});

				//Load Global Cat
				GlobalCategory.getAll().then(function(data) {
					$scope.availableGlobalCategories = Category.convertDepthArrayToNestedArray(data);
					$scope.formData.GlobalCategories[0] = Category.findByCatId(catId, $scope.availableGlobalCategories);
				});

				//Load Local Cat
				Shop.getLocalCategories(1).then(function(data) {
					$scope.availableLocalCategories = Category.convertDepthArrayToNestedArray(data);
				});
			}

			//Attribute Options to be filled via API
			$scope.availableAttributeSets = [];
			$scope.availableGlobalCategories = [];
			$scope.availableLocalCategories = [];

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
		}
	};
	tabPage.information = {
		jquery: function(){
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
		},
		angular: function() {

		}
	};
	tabPage.images = {
		jquery: function() {

		},
		angular: function() {
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
		}
	};
	tabPage.category = {
		jquery: function() {

		},
		angular: function() {
			//For viewing only
			$scope.viewCategoryColumns = [];
			$scope.viewCategorySelected = null;
			$scope.$on('openGlobalCat', function(evt, item) {
				$scope.viewCategoryColumns = Category.createColumns(item);
				$scope.viewCategorySelected = item;
			});
			$scope.$on('selectGlobalCat', function(evt, model) {

			});
			$scope.$on('saveGlobalCat', function(evt, model) {

			});
		}
	}
	tabPage.variation = {
		jquery: function(){
		},
		angular: function() {
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

			initAttributeOptionSelect2(0);
			initAttributeOptionSelect2(1);

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
			
			
		   	/**
		   	 * This part handles when user click on More Detail and open pair form
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
		}
	};
	tabPage.options = {
		jquery: function() {

		},
		angular: function() {

		}
	}

	//Initialize Angular stuff
	tabPage.global.angular();
		for (var page in tabPage) {
			tabPage[page].angular();
		}

	//Initialize Jquery stuff
	$(document).on('shown.bs.tab ready', function(){
		//Initialize All Tab
		tabPage.global.jquery();
	        for (var page in tabPage){
			tabPage[page].jquery();
		}	
	});

   	//Final saving
   	$scope.save = function() {
   		//TURN $scope.formData into api-able formats
   	}
}];
