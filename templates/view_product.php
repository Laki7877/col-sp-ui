<?php
$menus = [
	["id" => "information", "name" => 'Information', "class" => "active"],
	["id" => "images", "name" => 'Images', "class" => ""],
	["id" => "category", "name" => 'Category', "class" => ""],
	["id" => "variation", "name" => 'Variation', "class" => ""],
	["id" => "more_option", "name" => 'More Options', "class" => ""],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/view-product-title-breadcrumb', ['text' => "Products/View Product"]) ?>

		<div class="add-product-body">
			<? $this->insert('components/tab-nav', ["items" => $menus]) ?>
			<form class="ah-form">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
						<? $this->insert('partials/view-product-information') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="images">
						<? $this->insert('partials/add-product-images') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="category">
						<? $this->insert('partials/add-product-category') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="variation">
						<? $this->insert('partials/add-product-variation') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="more_option">
						<? $this->insert('partials/add-product-more-option') ?>
					</div>
				</div>
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<button class="btn btn-white btn-width-xl">Cancel</button>
							<button class="btn btn-green btn-width-xl">Edit Product</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

	<a href="#" data-toggle="modal" data-target="#edit-product-confirm" >Show edit product modal</a>

	<? $this->insert('components/modal-edit-product', ['id' => 'edit-product-confirm']) ?>

	<script src="/assets/libs/ckeditor/ckeditor.js"></script>
	<script src="/assets/libs/ckeditor/config.js"></script>
	<script src="/assets/libs/moment/moment.min.js"></script>
	
	<script src="/assets/libs/datepicker/js/bootstrap-datetimepicker.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/assets/libs/datepicker/css/bootstrap-datetimepicker.min.css">

	<script src="/assets/libs/select2/js/select2.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">
	
	<script>
		$('[ckeditor-initialize]').each(function(idx, textarea) {
			CKEDITOR.replace( textarea );
		});
		$('.input-icon-calendar').datetimepicker({
			format: "LL" // this is momentjs format make it show only date, no time will be show. see: http://momentjs.com/docs/#/displaying/format/
		});

		$.fn.select2.defaults.set("tokenSeparators", [",", " "]);
		var select2Init = $(".select2-init")
		$(document).on('shown.bs.tab ready', select2Init.select2.bind(select2Init));

		$("body").tooltip({ selector: '[data-toggle=tooltip]' });

		/********** THIS IS ABOUT TO ATTACH EVENT DRAG AND DROP OF IMAGE DROPZONE ************/
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
		/******************************* END IMAGE DROPZONE **********************************/
	</script>

<?php $this->stop() ?>