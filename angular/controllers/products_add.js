module.exports = ['$scope', '$http', 'Product', 'Image', 'FileUploader',  function($scope, $http, Product, Image, FileUploader){
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
/*	$('[ckeditor-initialize]').each(function(idx, textarea) {
		CKEDITOR.replace( textarea );
	});
	$('.input-icon-calendar').datetimepicker({
		format: "LL" // this is momentjs format make it show only date, no time will be show. see: http://momentjs.com/docs/#/displaying/format/
	});
*/
	//Initialize Select2
	$.fn.select2.defaults.set("tokenSeparators", [",", " "]);
	$(document).on('shown.bs.tab ready', function(){
			$(".select2-init").select2();
	});

	$("body").tooltip({ selector: '[data-toggle=tooltip]' });

	
	//Product Image
	$scope.uploader = Image.getUploader();
}];
