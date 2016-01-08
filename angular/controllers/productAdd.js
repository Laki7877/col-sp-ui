module.exports = ['$scope', 'Product', 'Image', 'FileUploader', 'AttributeSet', 'Brand', 'VariantPair', 'util', function($scope, Product, ImageService, FileUploader, AttributeSet, Brand, VariantPair, util){
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

	//Data Sources
	$scope.availableAttributeSets = [];

	//On Controller init
	$scope.init = function(catId) {
		$scope.categoryId = catId;
		//Load Attrib. Set
		AttributeSet.getByCategory($scope.categoryId).then(function(data){
			$scope.availableAttributeSets = data; 
		});
		//TODO:select2-init classes should be named more meaningfully
		$(".select2-init-normal").select2();
		$(".select2-init, .select2-init-normal").on("change", function(ev){
			$scope.$digest();
		});
		//Initialize Select2 stuff
		$.fn.select2.defaults.set("tokenSeparators", [","]);
		$(document).on('shown.bs.tab ready', function(){
			//Initialize All Tab
			for(var page in tabPage){
				tabPage[page].init();
			}	
		});
	}

	//Expose Util  
	$scope._isListInput = util.isListDataType;
	$scope._isFreeTextInput = util.isFreeTextDataType;
	//TODO: Change _attrEnTh(t) to _attrEnTh(Name, t)
	$scope._attrEnTh = function(t){ return t.AttributeSetNameEn + " / " + t.AttributeSetNameTh; }

	//When selected attribute change, 
	//the other box wil not allow to have selected option
	var tabPage = {};
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
			/*
			 * Call to initialize select box
			 */
			var initAttributeOptionSelect2 = function(index){
				var listMode = false;
				if($scope.attributeOptions[index].attribute){
					listMode = (util.isListDataType($scope.attributeOptions[index].attribute.Attribute.DataType));
				}
				//Reset Options
				$(".select2-init-" + index).select2({
					tags: !listMode
				});

				$scope.attributeOptions[index].options = [];
			};

			/*
			 * Re init select2 component based on LT or ST type everytime
			 * attribute option changes
			 */
			$scope.$watch('attributeOptions[0].attribute', function(){
				initAttributeOptionSelect2(0);
			});	
			$scope.$watch('attributeOptions[1].attribute', function(){	
				initAttributeOptionSelect2(1);
			});	

			/* If any attribute option change
			   Update formData.Variants
			   by cross multiplying each Variant into VariantPair
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

				//Set Default Variant
				$scope.formData.DefaultVariant = $scope.formData.Variants[0];
				
			}, true);


			initAttributeOptionSelect2(0);
			initAttributeOptionSelect2(1);
		}
	};	



	//TODO: Init CK Editor (apparently this breaks)
	/*	$('[ckeditor-initialize]').each(function(idx, textarea) {
		CKEDITOR.readyplace( textarea );
	});
	$('.input-icon-calendar').datetimepicker({
		format: "LL" // this is momentjs format make it show only date, no time will be show. see: http://momentjs.com/docs/#/displaying/format/
	});
	*/

	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
	
	//Product Image
	$scope.uploader = ImageService.getUploader('/ProductImages');
	$scope.uploaderModal = ImageService.getUploader('/ProductImages');
	$scope.uploader360 = ImageService.getUploader('/ProductImages', {
		queueLimit: 60
	});

	$scope.setUploaderEvents = function(uploader, images) {
		uploader.onAfterAddingFile = function(item) {
			var obj = {
				url: ''
			};
			images.push(obj);
			item.indx = images.length-1;
		};
	    uploader.onSuccessItem = function(item, response, status, headers) {
	    	images[item.indx] = response;
	    };
	    uploader.onErrorItem = function(item, response, status, headers) {
	    	images.splice(item.indx, 1);
	    };
	}

	$scope.setUploaderEvents($scope.uploader, $scope.formData.MasterImages);
    $scope.setUploaderEvents($scope.uploader360, $scope.formData.MasterImages360);

    //Image gallery event
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
        $('#product-image-zoom img').attr('src', item.url);
        $('#product-image-zoom').modal('show');
   	});

   	//Variants open image modal
   	$scope.$on('openPairModal', function(evt, pair, array, index){
   		$scope.pairBefore = angular.copy(pair);

   		//Define if not defined
   		if(angular.isUndefined(pair.Images)) {
   			pair.Images = [];
   		}
   		if(angular.isUndefined(pair.queue)) {
   			pair.queue = [];
   		}

   		//Set uploader event
	   	$scope.setUploaderEvents($scope.uploaderModal, pair.Images);	
   		
	   	//Assign uploader queue
   		$scope.uploaderModal.queue = pair.queue;
   		
   		//Modal target (for viewing pair)
   		$scope.pairModal = pair;
   		$scope.pairIndex = index;

   		//Show modal
   		$('#variant-detail-1').modal('show');
   	});
   	$scope.$on('cancelPairModal', function(evt){
   		//Reset to before change
   		$scope.formData.Variants[$scope.pairIndex] = $scope.pairBefore;
   		$scope.pairModal = null;
   		
   		//Hide modal
   		$('#variant-detail-1').modal('hide');
   	});
   	$scope.$on('savePairModal', function(evt){
   		//Hide without doing anything
   		$('#variant-detail-1').modal('hide');
   	});
   	//Final saving
   	$scope.save = function() {
   		//TURN $scope.formData into api-able format
   		var formData = {};
   	}
}];
