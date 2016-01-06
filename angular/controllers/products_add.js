module.exports = ['$scope', '$http', 'Product', 'Image', 'FileUploader',  function($scope, $http, Product, Image, FileUploader){
	'use strict';
	//Variation Options Available
	$scope.variation_options = [{
		name: 'Capacity',
		value: 0,
		unit: 'mAh'
	},{
		name: 'Material',
		value: 1,
		unit: ''
	}];

  	//Will Replace or wrap with angular equivalent
	/*$('[ckeditor-initialize]').each(function(idx, textarea) {
		CKEDITOR.readyplace( textarea );
	});
	$('.input-icon-calendar').datetimepicker({
		format: "LL" // this is momentjs format make it show only date, no time will be show. see: http://momentjs.com/docs/#/displaying/format/
	});
	//Initialize Select2
	$.fn.select2.defaults.set("tokenSeparators", [",", " "]);
	$(document).on('shown.bs.tab ready', function(){
			$(".select2-init").select2();
	});

	$("body").tooltip({ selector: '[data-toggle=tooltip]' });
	*/
	
	//Product Image
	$scope.uploader360 = Image.getUploader();
	$scope.images360 = [];
	$scope.uploader = Image.getUploader('images', {
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
    $scope.$on('left', function(item, array, index) {
    	var to = index - 1;
    	if(to < 0) to = array.length - 1;
    	
    	var tmp = array[to];
    	array[to] = item;
    	array[index] = tmp;
    });
    $scope.$on('right', function(item, array, index) {
    	var to = index + 1;
    	if(to >= array.length) to = 0;
    	
    	var tmp = array[to];
    	array[to] = item;
    	array[index] = tmp;
    });
}];
