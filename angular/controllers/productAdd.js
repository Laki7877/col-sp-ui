var angular = require('angular');

module.exports = ['$scope','util', 'config', 'Product', 'Image', 'AttributeSet', 'Brand', 'Shop', 
'GlobalCategory', 'Category', 'VariantPair', 'productProxy', 'brandAdapter',
	function($scope, util, config, Product, ImageService, AttributeSet, Brand, Shop, 
		GlobalCategory, Category, VariantPair, productProxy, brandAdapter){
	'use strict';

	$scope.preview = function(){
		console.log('Form Data', $scope.formData);
		var apiRequest = productProxy.productTransform($scope.formData);
		console.log('API JSON', JSON.stringify(apiRequest));

	};

	$scope.publish = function(isValid){
		if(!isValid) return;
		console.log('Form Data', $scope.formData);
		var apiRequest = productProxy.productTransform($scope.formData);
		console.log('API JSON', JSON.stringify(apiRequest));
		//Save
		Product.publish(apiRequest, $scope.Status).then(function(){
			console.log("Save successful");
			alert("Just FYI, its saved. ")
		}, function(er){
			alert("FYI - Unable to save due to error - Send this message to a wizard near you: \n\n" + JSON.stringify(er));
			console.warn("Unable to save", er);
		});
	};

	$scope.formData = {
		MasterVariant: {},
		MasterImages: [],
		MasterImages360: [],
		VideoLinks: [],
		Variants: [],
		GlobalCategories: [null, null, null],
		LocalCategories: [null, null, null],
		SEO: {},
		ControlFlags: []
	};

	//CK editor options
	$scope.ckOptions = config.CK_DEFAULT_OPTIONS;

	/**
	 * All Tabs
	 * Seperated by jquery parts and angular parts
	 */
	//TODO: Please don't separate by jquery part and angular part
	//Because some jquery part has angular dependencies
	var tabPage = {

	};
	tabPage.global = {
		jquery: function(){

			//TODO: this wont play well with angular, not sure why
			//maybe use this: http://dalelotts.github.io/angular-bootstrap-datetimepicker/
			$('.input-icon-calendar').datetimepicker({
				format: "LL"
			}).on('dp.change', function(sd){
				$scope.$apply();
			});

			$("body").tooltip({ selector: '[data-toggle=tooltip]' });

			$.fn.select2.defaults.set("tokenSeparators", [","]);

			console.log($scope.formData, "at global jquery");
			
			$(".select2-init-simple").select2();
			$('.select2-init-keywords').select2();

			$(".select2-init-track").on("change", function(ev){
				$scope.$digest();
			});

		},
		angular: function() {

			$scope.init = function(viewBag) {

				//TODO: Refactor 

				var shopId = 1;
				var angularReady = function(){
					//Angular dependent
				  tabPage.global.jquery();
				  tabPage.information.jquery();
				  loadedTabs.information = true;
				};

				var catReady = function(catId, callback){
					AttributeSet.getByCategory(catId).then(function(data){
						$scope.availableAttributeSets = data;
						if($scope.formData.AttributeSet && $scope.formData.AttributeSet.AttributeSetId){
							//Find attribute set and assign it as object
							var idx = $scope.availableAttributeSets.map(function(o){
								return o.AttributeSetId
							}).indexOf($scope.formData.AttributeSet.AttributeSetId);
							$scope.formData.AttributeSet = $scope.availableAttributeSets[idx];
						}
 
						//Load Global Cat
						GlobalCategory.getAll().then(function(data) {
							$scope.availableGlobalCategories = Category.transformNestedSetToUITree(data);
							$scope.formData.GlobalCategories[0] = Category.findByCatId(catId, $scope.availableGlobalCategories);
							$scope.globalCategoryBreadcrumb = Category.createCatStringById(catId, $scope.availableGlobalCategories);
							callback();
						});

					});
					

				};

				if("productId" in viewBag){
					//EDIT MODE

					var productId = viewBag.productId;
					Product.getOne(productId).then(function(ivFormData){
						var gcat = ivFormData.GlobalCategory;
						console.log("formData (INVERSE)", ivFormData);
						$scope.formData = productProxy.inverseProductTransform(ivFormData);
						console.log("formData", $scope.formData);

						catReady(gcat, function(){
							//Load Brand
							Brand.getOne($scope.formData.Brand.BrandId).then(function(data){
								$scope.formData.Brand = data;
								delete $scope.formData.Brand.$id;
								$scope.formData.Brand.id = $scope.formData.Brand.BrandId;
								//MUST HAPPEN LAST
								angularReady();
							});
						});

						//auxiliary object (non-persist)
						//$scope.attributeOptions[0] = $scope.formData.Variants[0].FirstAttribute;

					});
				}

				if("catId" in viewBag){
					//ADD MODE
					catReady(viewBag.catId, angularReady);
				}

				//Load Local Cat
				Shop.getLocalCategories(shopId).then(function(data) {
					$scope.availableLocalCategories = Category.transformNestedSetToUITree(data);
				});
			}

			//Attribute Options to be filled via API
			$scope.availableAttributeSets = [];
			$scope.availableGlobalCategories = [];
			$scope.availableLocalCategories = [];

			//TODO: Change _attrEnTh(t) to _attrEnTh(Name, t)
			$scope._attrEnTh = function(t){ return t.AttributeSetNameEn + " / " + t.AttributeSetNameTh; }
			$scope._isFreeTextInput = util.isFreeTextDataType;
			$scope._isListInput = util.isListDataType;
		}
	};

	tabPage.information = {
		load: function(){
			//Call Load and Load will determine which part will be called
		},
		jquery: function(){
			//NOTE: as of now this is only called in EDIT mode
			//TODO: which is wrong
			brandAdapter.load($scope.formData);


			//define simple tag adapter
			//WILL USE UI-SELECT
			$.fn.select2.amd.define('select2/data/simpleTagsAdapter',[
				'select2/data/array',
				'select2/utils',
				'select2/selection/multiple'
			    ],
			    function (ArrayAdapter, Utils, Multiple) {

					function CustomDataAdapter ($element, options) {
					    CustomDataAdapter.__super__.constructor.call(this, $element, options);
					}

					Utils.Extend(CustomDataAdapter, ArrayAdapter);

					//current is called every time match list is queried
					 CustomDataAdapter.prototype.current = function (callback) {
		
						var data = $scope.formData.Keywords.map(function(m){
							return {
								'id': m,
								'text': m
							}
						}) || [];

						this.$element.find(':selected').each(function () {
							var $option = $(this);
							var option = self.item($option);
							data.push(option);
						});

						callback(data)
					};

					return CustomDataAdapter;
				 }
			); //end_define

			$('.select2-init-brand').select2({
				dataAdapter:  $.fn.select2.amd.require('select2/data/brandAdapter'),
				templateResult: function(d){
					if(!d || !d.BrandNameEn) return "Loading..";
					return d.BrandNameEn + " (" + d.BrandNameTh + ")";
				},
				templateSelection: function(d){
					if(!d || !d.BrandNameEn) return "No Brand";
					return d.BrandNameEn + " (" + d.BrandNameTh + ")";
				}
			});

			$('.select2-init-keywords').select2({
				dataAdapter: $.fn.select2.amd.require('select2/data/simpleTagsAdapter')
			});

		},
		angular: function() {}
	};

	tabPage.images = {
		jquery: function() {

		},
		angular: function() {

		    $scope.uploader = ImageService.getUploader('/ProductImages');
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
			$scope.viewCategoryIndex = 0;
			$scope.selectCategory = angular.noop;

			//Events
			$scope.$on('openGlobalCat', function(evt, item, indx) {
				$scope.viewCategoryColumns = Category.createColumns(item, $scope.availableGlobalCategories);
				$scope.viewCategorySelected = item;
				$scope.viewCategoryIndex = indx;
				$scope.selectCategory = Category.createSelectFunc($scope.viewCategoryColumns, function(selectedItem) {
					$scope.viewCategorySelected = selectedItem;
				});
			});
			$scope.$on('deleteGlobalCat', function(evt, indx) {
				$scope.formData.GlobalCategories[indx] = null;
			});
			$scope.$on('selectGlobalCat', function(evt, row, indx, parentIndx) {
				$scope.selectCategory(row, indx, parentIndx);
			});
			$scope.$on('saveGlobalCat', function(evt) {
				$scope.formData.GlobalCategories[$scope.viewCategoryIndex] = $scope.viewCategorySelected;
			});

			//Events
			$scope.$on('openLocalCat', function(evt, item, indx) {
				$scope.viewCategoryColumns = Category.createColumns(item, $scope.availableLocalCategories);
				$scope.viewCategorySelected = item;
				$scope.viewCategoryIndex = indx;
				$scope.selectCategory = Category.createSelectFunc($scope.viewCategoryColumns, function(selectedItem) {
					$scope.viewCategorySelected = selectedItem;
				});
			});
			$scope.$on('deleteLocalCat', function(evt, indx) {
				$scope.formData.LocalCategories[indx] = null;
			});
			$scope.$on('selectLocalCat', function(evt, row, indx, parentIndx) {
				$scope.selectCategory(row, indx, parentIndx);
			});
			$scope.$on('saveLocalCat', function(evt) {
				$scope.formData.LocalCategories[$scope.viewCategoryIndex] = $scope.viewCategorySelected;
			});
		}
	}
	
	tabPage.variation = {
		initSelect2: function(index){
			var isListInput	= false;
			if($scope.attributeOptions[index].attribute){
				isListInput = ($scope._isListInput($scope.attributeOptions[index].attribute.Attribute.DataType));
			}

			//Reset Options
			$(".select2-init-" + index).select2({
				tags: !isListInput
			});

			$scope.attributeOptions[index].options = [];

		},
		jquery: function(){
			tabPage.variation.initSelect2(0);
			tabPage.variation.initSelect2(1);
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


			$scope.$watch('attributeOptions[0].attribute', function(){
				tabPage.variation.initSelect2(0);
			});

			$scope.$watch('attributeOptions[1].attribute', function(){
				tabPage.variation.initSelect2(1);
			});

			/*
			 * Multiplying options into VariantPairs
			 */
			$scope.$watch('attributeOptions', function(){

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
							AttributeId: $scope.attributeOptions[0].attribute.AttributeId,
							ValueEn: A
						},{
							AttributeId: $scope.attributeOptions[1].attribute.AttributeId,
							ValueEn: B
						});

						//Only push if don't exist
						if(!(kpair.hash in variantHashes)){
							$scope.formData.Variants.push(kpair);
						}

						//Mark hash as used
						//This will not be deleted
						variantHashes[kpair.hash] = -1;
					}
				}

				//Remove deleted variants
				for(var rhash in variantHashes){
					if(variantHashes[rhash] == -1) continue;
					$scope.formData.Variants.splice(variantHashes[rhash], 1);
				}

				$scope.formData.DefaultVariant = $scope.formData.Variants[0];
			}, true);

			//TODO: When selected attribute change,
			//the other box wil not allow to have selected option

		   	/**
		   	 * This part handles when user click on More Detail and open pair form
		   	 */
			$scope.uploaderModal = ImageService.getUploader('/ProductImages');
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
		   		$scope.uploaderModal.queue = $scope.pairModal.queue;
			   	ImageService.assignUploaderEvents($scope.uploaderModal, $scope.pairModal.Images);
		   	});
		   	$scope.$on('savePairModal', function(evt){
		   		$scope.formData.Variants[$scope.pairIndex] = $scope.pairModal;
		   	});
		}
	};
	tabPage.more_option = {
		jquery: function() {
			$(".select2-init-related").select2({
				tags: false,
				templateResult: function(d){
					if(!("ProductNameEn" in d)) return null;
					return d.ProductNameEn + " / " + d.ProductNameTh;
				},
				templateSelection: function(d){
					return d.ProductNameEn + " / " + d.ProductNameTh;
				},
				ajax: {
					processResults: function (data) {
						var mapped = data.data.map(function(obj){
							console.log(obj);
							obj.id = obj.ProductId;
							return obj;
						});

						return {results: mapped};
					},
					transport: function(params, success, failure){
						return Product.getAll({
							searchText: params.data.q
						}).then(success, failure);
					}
				}
			});

		},
		angular: function() {

		}
	}

	//Initialize Angular stuff
	tabPage.global.angular();
	for (var page in tabPage) {
		tabPage[page].angular();
	}

	var loadedTabs = {};

	//init global jquery
	$(document).on('ready',function(){
	});

	//init tab jquery
	$(document).on('shown.bs.tab shown', function(tab){
		var pageId = tab.target.dataset.id;
		if(pageId in loadedTabs) return;
		console.log(tab, loadedTabs);
		console.log("initing ", pageId);
	    tabPage[pageId].jquery();
	    loadedTabs[pageId] = true;
	});

   	//Final saving
   	$scope.save = function() {
   		//TURN $scope.formData into api-able formats
   	}
}];
