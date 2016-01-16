<?php
$menus = [
	["id" => "information", "name" => 'Information', "class" => "require active"],
	["id" => "images", "name" => 'Images', "ng_class" => "{require : ((formData.Variants || []).length == 0) }"],
	["id" => "category", "name" => 'Category', 'class' => ''],
	["id" => "variation", "name" => 'Variation', 'class' => ''],
	["id" => "more_option", "name" => 'More Options', 'class' => ''],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product'])
?>
<?php $this->start('page-body') ?>
<div ng-controller="ProductAddCtrl" ng-init="init({
		<?php foreach($viewBag as $key=>$value): ?>
			<?=$key?> : '<?=$value?>'	
		<?php endforeach; ?>
		})">

		<? $this->insert('components/modal-warning-leave-page', ['id' => 'leave-page-warning']) ?>
		
		<form name="addProductForm" class="ah-form sticky-mainform-action" novalidate>
		<? $this->insert('components/page-title-breadcrumb', ['text' => "Products/ " . $title, 'urls' => ['/products']]) ?>

		<div ng-if="_loading.state">
			<img src="/assets/img/loader.gif" width="40"> <small>{{ _loading.message }}..</small>
		</div>
		<div class="add-product-body" ng-if="!_loading.state">

			<? $this->insert('components/tab-nav', ["items" => $menus]) ?>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
						<? $this->insert('partials/add-product-information') ?>
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
							<a href="/products" class="link-btn-plain">Cancel</a>

							<button ng-show="formData.Status != 'WA'" 
							class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>

							<button ng-show="formData.Status != 'WA'" 
							class="btn btn-white btn-width-xl" 
							type="submit"ng-click="publish('DF')" 
							ng-disabled="addProductForm.$invalid">Save as Draft</button>
							
							<button ng-show="formData.Status != 'WA'" 
							ng-disabled="addProductForm.$invalid" type="submit" class="btn btn-blue btn-width-xl" ng-click="publish('WA')">Publish</button>
						</div>
					</div>
				</div>
		</div>
	</div>
	</form>

	<script src="/assets/libs/ckeditor/ckeditor.js"></script>
	<script src="/assets/libs/ckeditor/config.js"></script>
	<script src="/assets/libs/ckfinder/ckfinder.js"></script>
	<script src="/assets/libs/moment/moment.min.js"></script>

	<script src="/assets/libs/datepicker/js/bootstrap-datetimepicker.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/assets/libs/datepicker/css/bootstrap-datetimepicker.min.css">

	<script src="/assets/libs/select2/js/select2.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">

<?php $this->stop() ?>
