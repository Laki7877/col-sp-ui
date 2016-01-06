module.exports = ['$scope', '$window', 'Product', 'Image', 'FileUploader', 'AttributeSet',  function($scope, $window, Product, ImageService, FileUploader, AttributeSet){
	'use strict';
	$scope.formData = {};
	//TODO: Change _attrEnTh(t) to _attrEnTh(Name, t)
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

	//Multiplied Variants (product)
	$scope.variants = [];
	//Unmultiplied Variants (factor)
	$scope.attributeOptions = {
		0: {
			attribute: null,
			options: []
		},
		1: {
			attribute: null,
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
		$scope.variants = [];
		//Multiply out unmultiplied options
		$scope.attributeOptions[0].options.forEach(function(A){
			$scope.attributeOptions[1].options.forEach(function(B){
				$scope.variants.push(new Pair(A,B));
			});
		});

		$scope.formData.DefaultVariant = $scope.variants[0];
		
	}, true);

	//When selected attribute change, the other box wil not allow to have selected option

	//Initialize Select2 (variation select)
	$.fn.select2.defaults.set("tokenSeparators", [","]);
	$(document).on('shown.bs.tab ready', function(){
		initAttributeOptionSelect2(0);
		initAttributeOptionSelect2(1);

		$(".select2-init").on("change", function(ev){
			$scope.$digest();
		});

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
	$scope.uploader360 = ImageService.getUploader();
	$scope.images360 = [];
	$scope.uploader = ImageService.getUploader('images', {
		autoUpload: false
	});
	$scope.images = [];
	var loadend = function(reader) {
		return function() {
	        $scope.images.push({
	        	src: reader.result
	        });
	        $scope.$apply();
		};
	}
    $scope.uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
        var reader = new FileReader();
        reader.onloadend = loadend(reader);
        reader.readAsDataURL(fileItem._file);
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
   		console.log('delete');
   		array.splice(index, 1);
   	});
   	$scope.$on('zoom', function(evt, item, array, index) {
        var image = new Image();
        image.src = item.src;

        var w = $window.open("");
        w.document.write(image.outerHTML);
   	});
}];
