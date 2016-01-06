module.exports = ['$scope', '$window', 'Product', 'Image', 'FileUploader', 'AttributeSet',  function($scope, $window, Product, ImageService, FileUploader, AttributeSet){
	'use strict';
	$scope.formData = {};
	//TODO: Change _attrEnTh(t) to _attrEnTh(Name, t)
	$scope._attrEnTh = function(t){ return t.AttributeSetNameEn + " / " + t.AttributeSetNameTh; }
	//Test
	$scope.items = [{text: "hello"}, {text:"world"}];	
	//Attribute Options to be filled via API
	$scope.available_attribute_options = [];
  	AttributeSet.getByCategory(11).then(function(data){
		$scope.available_attribute_options = data; 		
		console.log("Attribute Set", data);	
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
	$scope.attribute_options = {
		0: {
			attribute: null,
			options: []
		},
		1: {
			attribute: null,
			options: []
		}	
	};

	//When selected attribute change we have to regen cross multiply
	$scope.$watch('attribute_options[0].attribute', function(oldv, newv){
		//Reset Options
		$(".select2-init").select2({
			tags: true
		});
		$scope.attribute_options[0].options = [];	

	});	

	$scope.$watch('attribute_options[1].attribute', function(oldv, newv){	
		//Reset Options
		$(".select2-init").select2({
			tags: true
		});
		//TODO: does this need $digest listener again?

		$scope.attribute_options[1].options = [];
	});	
	//Multiply attributes into variants
	$scope.$watch('attribute_options', function(oldv, newv){
		if($scope.attribute_options[1].options.length == 0) return;
		if($scope.attribute_options[0].options.length == 0) return;
	
		//TODO: Don't clear but only removed changed/stale	
		$scope.variants = [];
		//Multiply out unmultiplied options
		$scope.attribute_options[0].options.forEach(function(A){
			$scope.attribute_options[1].options.forEach(function(B){
				$scope.variants.push(new Pair(A,B));
			});
		});
		
		console.log($scope.variants);
	}, true);

	//When selected attribute change, the other box wil not allow to have selected option

	//Initialize Select2 (variation select)
	$.fn.select2.defaults.set("tokenSeparators", [","]);
	$(document).on('shown.bs.tab ready', function(){
		$(".select2-init").select2({
			tags: true
		});
		$(".select2-init").on("change", function(ev){
			console.log("select:change @ Digest Loop");
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
