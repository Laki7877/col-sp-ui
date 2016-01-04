module.exports = ['$scope', '$http', 'Products',  function($scope, $http, Products){

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
	$('[ckeditor-initialize]').each(function(idx, textarea) {
		CKEDITOR.replace( textarea );
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

	$('.image-drop-zone').on('dragover', function(e) {
		var $this = $(this);
		e.preventDefault();
		$this.addClass('hover');
	}).on('dragleave drop', function(e) {
		var $this = $(this);
		e.preventDefault();
		$this.removeClass('hover');
	});

	$('[data-trigger="file"]').on('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		var target = $this.data('target');
		$(target).trigger('click');
	});

	$('#product-images, #product-360').on('drop', function(e) {
		e.preventDefault();
		console.log(e.type);
		//TODO: UPLOAD FILE WHEN USER DROPPED INTO DROPZONE
		return false;
	})

}];
