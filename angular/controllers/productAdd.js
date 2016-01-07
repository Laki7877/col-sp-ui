module.exports = ['$scope', '$window', 'Product', 'Image', 'FileUploader', 'AttributeSet', 'Brand',  function($scope, $window, Product, ImageService, FileUploader, AttributeSet, Brand){
	'use strict';
	$scope.formData = {};
	//TODO: Change _attrEnTh(t) to _attrEnTh(Name, t)
	$scope.init = function(catId) {
		$scope.categoryId = catId;
	}
	$scope._attrEnTh = function(t){ return t.AttributeSetNameEn + " / " + t.AttributeSetNameTh; }
	
	//Attribute Options to be filled via API
	$scope.availableAttributeSets = [];

	//Constant Comparison Functions
	//TODO: Move this to commons or something
	$scope._isFreeTextInput = function(t){
		return (t == "ST");
	};
	$scope._isListInput = function(t){
		return (t == "LT");
	};

	//Load Attrib. Set
  	AttributeSet.getByCategory(11).then(function(data){
		$scope.availableAttributeSets = data; 		
	});

	//Struct for Variant Pair
	var Pair = function(a,b){
		this.first = a; 
		this.second = b; 
		this.hash = a+b;
		this.text = (a + ", " + b);
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
	$scope.$watch('attributeOptions', function(oldv, newv){
		if($scope.attributeOptions[1].options.length == 0) return;
		if($scope.attributeOptions[0].options.length == 0) return;
		
		//TODO: Don't clear but only removed changed/stale	
		$scope.formData.Variants = [];
		//Multiply out unmultiplied options
		$scope.attributeOptions[0].options.forEach(function(A){
			$scope.attributeOptions[1].options.forEach(function(B){
				$scope.formData.Variants.push(new Pair(A,B));
			});
		});

		$scope.formData.DefaultVariant = $scope.formData.Variants[0];
		
	}, true);

	//When selected attribute change, the other box wil not allow to have selected option
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
	        for(var page in tabPage){
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
	
	//Product Image
	$scope.uploader = ImageService.getUploader('images', {
		autoUpload: false
	});
	$scope.uploader360 = ImageService.getUploader();
	$scope.uploaderModal = ImageService.getUploader();

	$scope.images = [];
	$scope.images360 = [];
	$scope.imagesModal = [];

	var loadend = function(reader, img) {
		return function() {
	        img.src = reader.result;
	        $scope.$apply();
		};
	}
    $scope.uploader.onAfterAddingFile = function(fileItem) {
        var reader = new FileReader();
        var img = {
        	src: ''
        };
        $scope.images.push(img);
    };
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
        $('#product-image-zoom img').attr('src', item.src);
        $('#product-image-zoom').modal('show');
   	});
}];
