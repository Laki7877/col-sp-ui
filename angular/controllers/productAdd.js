module.exports = ['$scope', '$window', 'Product', 'Image', 'FileUploader',  function($scope, $window, Product, ImageService, FileUploader){
	'use strict';
	//Variation Options Available
	$scope.available_attribute_options = [{
		name: 'Capacity',
		id: 5,
		unit: 'mAh',
		available_options: [
			{ Id: 51, Name: '1000 mAh'},
			{ Id: 31, Name: '2500 mAh'},
			{ Id: 92, Name: '10000 mAh' }
		]
	},{
		name: 'Material',
		id: 1,
		unit: '',
		available_options: [
			{ Id: 1, Name: "Palladium" },
			{ Id: 2, Name: "Carbon Fiber" },
			{ Id: 3, Name: "Nano Polymer" }
		]
	}];

	var Pair = function(a,b){ 
		this.first = a; 
		this.second = b; 
		this.hash = a.Id + "-" + b.Id;
		this.text = (a.Name + ", " + b.Name)
	};

	$scope.variants = [];
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
	$scope.$watch('attribute_options[0].attribute_id', function(oldv, newv){
		//Reset Options
		$scope.attribute_options[0].options = [];

	});	
	$scope.$watch('attribute_options[1].attribute_id', function(oldv, newv){
		//Reset Options
		$scope.attribute_options[1].options = [];
	});	
	//Multiply attributes into variants
	$scope.$watch('attribute_options', function(oldv, newv){
		if($scope.attribute_options[1].options.length == 0) return;
		if($scope.attribute_options[0].options.length == 0) return;
	
		//TODO: Don't clear but only removed changed/stale	
		$scope.variants = [];
		$scope.attribute_options[0].options.forEach(function(A){
			$scope.attribute_options[1].options.forEach(function(B){
				$scope.variants.push(new Pair(A,B));
			});
		});
		
		console.log($scope.variants);
	}, true);

	//When selected attribute change, the other box wil not allow to have selected option

	//Initialize Select2 (variation select)
	$.fn.select2.defaults.set("tokenSeparators", [",", " "]);
	$(document).on('shown.bs.tab ready', function(){
		$(".select2-init").select2();
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
