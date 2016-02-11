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
<div ng-controller="ProductAddCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
		
        <nc-alert nc-model="alert"></nc-alert>
        
		<form name="addProductForm" class="ah-form sticky-mainform-action" novalidate>
            <fieldset ng-disabled="formData.Status == 'WA'">
            <? $this->insert('components/page-title-breadcrumb', ['text' => "Products/ " . $title, 'urls' => ['/products']]) ?>
            

            <div ng-if="pageState.loading.state">
                <img src="/assets/img/loader.gif" width="40"> <small>{{ pageState.loading.message }}..</small>
            </div>
            <div class="add-product-body" ng-if="!pageState.loading.state">

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
                    <!-- tablc-ntent-->
                    <div class="add-product-form-action main-form-action full-width-row">
                        <div class="container-fluid">
                            <div class="float-right">
                                <a href="/products" class="link-btn-plain">Cancel</a>

                                <button ng-show="formData.Status != 'WA'"
                                class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>

                                <button ng-show="formData.Status != 'WA'"
                                class="btn btn-white btn-width-xl"
                                type="submit" ng-click="publish('DF')">Save as Draft</button>

                                <button ng-show="formData.Status != 'WA'"
                                type="submit" class="btn btn-blue btn-width-xl"
                                ng-click="publish('WA')">Publish</button>
                            </div>
                        </div>
                    </div>
                    <!--fullwidthrow-->
            </div>
            <!-- apbvody-->
        </fieldset>
	</form>
    <form name="addProductVariantForm" class="ah-form sticky-mainform-action" novalidate>
        <fieldset ng-disabled="formData.Status == 'WA'">
        <? $this->insert('components/modal-product-variant-detail', ["id" => "variant-detail-1", "model" => "pairModal"]) ?>
        </fieldset>
    </form>
</div>
    

	<script src="/assets/libs/ckeditor/ckeditor.js"></script>
	<script src="/assets/libs/ckeditor/config.js"></script>
	<script src="/assets/libs/ckfinder/ckfinder.js"></script>
	<script src="/assets/libs/moment/moment.min.js"></script>

	<script src="/assets/libs/datepicker/js/bootstrap-datetimepicker.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/assets/libs/datepicker/css/bootstrap-datetimepicker.min.css">

	<script src="/assets/libs/select2/js/select2.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">

<?php $this->stop() ?>
