<?php
$menus = [
	["id" => "buy1get1_static", "name" => 'Buy 1 Get 1', "class" => "require active"]
];

$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Buy 1 Get 1'])
?>
<?php $this->start('page-body') ?>
<div ng-controller="Buy1Get1AddCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>

		<div ng-show="pageState.success" id="alert-success" class="alert alert-green alert-dismissible" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			Your product has been saved sucessfully. <a href="/buy1get1/">View Buy 1 Get 1 List</a>
		</div>

		<div ng-show="pageState.failure" id="alert-failure" class="alert alert-red alert-dismissible" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			Unable to save because <strong>{{ pageState.failure_message }}</strong>
		</div>

		<div id="alert-validation" ng-show="pageState.invalid" class="alert alert-red alert-dismissible" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<strong>Unable to save because required fields are missing or incorrect.</strong>
			</hr>
			<ul>
				<li ng-repeat="e in addProductForm.$error.required">{{ e.$name }}</li>
			</ul>
		</div>
    <?php $this->insert('components/modal-buy1item-selected', ['id' => 'modal-buy1item-selected', 'buy1ItemId' => '1' ,'confirmfunc' =>'confirmBuy1ItemSelected()']) ?>
    <?php $this->insert('components/modal-get1item-selected', ['id' => 'modal-get1item-selected', 'get1ItemId' => '1' ,'confirmfunc' =>'confirmGet1ItemSelected()']) ?>
    

	<?php $this->insert('components/page-title-buy1get1-breadcrumb', ['text' => "Buy 1 Get 1 " , 'urls' => ['/buy1get1']]) ?>
		
		<!-- <div ng-show="loading">
			<img src="/assets/img/loader.gif" width="40"> <small>Loading Global Categories..</small>
		</div> -->
		<form name="addBuy1Get1Form" class="ah-form sticky-mainform-action" novalidate class="ah-form margin-top-30" >
			<input type="hidden" name="category" ng-value="selected.CategoryId" />

<div>
<div>			
					<div class="category-content no-padding">					
						<?php $this->insert('partials/add-buy1get1-information') ?>
					</div>
				</div>
				<div class="category-footer no-padding">
					<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<button ng-show="formData.Status != '4'"
							class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>

							<button ng-show="formData.Status != '4'"
							class="btn btn-white btn-width-xl"
							type="submit" ng-click="publish('1')">Save as Draft</button>

							<button ng-show="formData.Status != '4'"
							type="submit" class="btn btn-blue btn-width-xl"
							ng-click="publish('2')">Publish</button>
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
