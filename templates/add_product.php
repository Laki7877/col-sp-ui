<?php
$menus = [
	["id" => "information", "name" => 'Information', "class" => "require"],
	["id" => "images", "name" => 'Images', "class" => "require"],
	["id" => "category", "name" => 'Category', 'class' => 'active'],
	["id" => "variation", "name" => 'Variation'],
	["id" => "more_option", "name" => 'More Options'],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'User Profile'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title-breadcrumb', ['text' => "Products/Add Product"]) ?>

		<div class="add-product-body">
			<? $this->insert('components/tab-nav', ["items" => $menus]) ?>
			<form class="ah-form">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20" id="information">
						<? $this->insert('partials/add-product-information') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="images">images</div>
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="category">
						<? $this->insert('partials/add-product-category') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="variation">variation</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="more_option">
						<? $this->insert('partials/add-product-more-option') ?>
					</div>
				</div>
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<a href="#" class="link-btn-plain">Cancel</a>
							<button class="btn btn-white btn-width-xl">Preview</button>
							<button class="btn btn-white btn-width-xl">Save as Draft</button>
							<button class="btn btn-blue btn-width-xl">Publish</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<script src="/assets/libs/ckeditor/ckeditor.js"></script>
	<script src="/assets/libs/ckeditor/config.js"></script>
	<script src="/assets/libs/moment/moment.min.js"></script>
	<script src="/assets/libs/datepicker/js/bootstrap-datetimepicker.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/assets/libs/datepicker/css/bootstrap-datetimepicker.min.css">
	<script>
		$('[ckeditor-initialize]').each(function(idx, textarea) {
			console.log("Initializing ckeditor for:", textarea);
			CKEDITOR.replace( textarea );
		});
		$('.input-icon-calendar').datetimepicker({
			format: "LL" // this is momentjs format make it show only date, no time will be show. see: http://momentjs.com/docs/#/displaying/format/
		});
	</script>

<?php $this->stop() ?>