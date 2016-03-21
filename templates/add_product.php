<?php
$menus = [
    ['id' => 'information', 'name' => 'Information', 'class' => 'require active'],
    ['id' => 'images', 'name' => 'Images', 'class' => 'require'], // "ng_class" => "{require : ((formData.Variants || []).length == 0) }"
    ['id' => 'category', 'name' => 'Category', 'class' => ''],
    ['id' => 'more_option', 'name' => 'More Options', 'class' => ''],
    ['id' => 'variation', 'name' => 'Variation', 'class' => ''],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product']) ?>
<?php $this->start('page-body') ?>

<div ng-controller="SellerProductDetailCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
       <nc-alert nc-model="devAlert"></nc-alert>
       <nc-alert nc-model="alert"></nc-alert>
       <nc-alert nc-model="adminAlert"></nc-alert>

		<form name="addProductForm" class="ah-form sticky-mainform-action" novalidate>

            <nc-page-title nc-title="Products/Product Detail" link="/products">
                <div class="float-right" ng-if="!_loading.state && adminMode">
                    <button ng-show="formData.Status != 'WA'" class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>
                    <button type="submit" class="btn btn-blue btn-width-xl" ng-click="saveAsIs()">Save</button>
                </div>
                <div class="page-actions float-right" ng-if="!_loading.state && !adminMode && formData.Status != 'AP'">
                    <button ng-show="formData.Status != 'WA'" class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>
                    <button ng-show="formData.Status != 'WA'" class="btn btn-white btn-width-xl" type="submit" ng-click="publish('DF')">Save as Draft</button>
                    <button ng-show="formData.Status != 'WA'" type="submit" class="btn btn-blue btn-width-xl" ng-click="prePublishWA()">Publish</button>
                </div>
                <div class="page-actions float-right" ng-if="!_loading.state && !adminMode && formData.Status == 'AP'">
                    <button class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>
                    <button class="btn btn-blue btn-width-xl" ng-click="preEditProduct()">Edit Product</button>

                </div>
            </nc-page-title>

            <fieldset ng-disabled="formData.Status == 'WA' || formData.Status == 'AP'">
            <div ng-if="pageState.loading.state" nc-loading="{{ pageState.loading.message }}.."></div>
            <div class="add-product-body" ng-if="!pageState.loading.state">

                <?php $this->insert('components/tab-nav', ['items' => $menus]) ?>
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
                             <div ng-include="'ap/tab-information'"></div>
                        </div>
                        <div role="tabpanel" class="tab-pane margin-top-20" id="images">
                           <div ng-include="'ap/tab-images'"></div>
                        </div>
                        <div role="tabpanel" class="tab-pane margin-top-20" id="category">
                            <div ng-include="'ap/tab-category'"></div>
                        </div>
    					<div role="tabpanel" class="tab-pane margin-top-20" id="more_option">
                             <div ng-include="'ap/tab-more-option'"></div>
    					</div>
                        <div role="tabpanel" class="tab-pane margin-top-20" id="variation">
                             <div ng-include="'ap/tab-variations'"></div>
                        </div>
                    </div>
                    <!-- tablc-ntent-->
                    <div class="add-product-form-action main-form-action full-width-row">
                        <div class="container-fluid">
                            <div class="float-right">
                                <a href="/products" class="link-btn-plain">Cancel</a>

				<button ng-click="_debugLoad()" class="btn btn-xs btn-success"><i class="glyphicon glyphicon-folder-open"></i></button>
				<button ng-click="_debugSave()" class="btn btn-xs btn-success"><i class="glyphicon glyphicon-floppy-disk"></i></button>

				<button ng-show="formData.Status != 'WA'"
                                class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>

                                <button ng-show="formData.Status != 'WA'"
                                class="btn btn-white btn-width-xl"
                                type="submit" ng-click="publish('DF')">Save as Draft</button>

                                <button ng-show="formData.Status != 'WA'"
                                type="submit" class="btn btn-blue btn-width-xl"
                                ng-click="prePublishWA()">Publish</button>
                            </div>
                        </div>
                    </div>
                    <!--fullwidthrow-->
            </div>
            <!-- apbvody-->
        </fieldset>
	</form>


</div>

	<script src="/assets/libs/ckeditor/ckeditor.js"></script>
	<script src="/assets/libs/ckeditor/config.js"></script>
	<script src="/assets/libs/ckfinder/ckfinder.js"></script>
	<script src="/assets/libs/moment/moment.min.js"></script>

	<script src="/assets/libs/datepicker/js/bootstrap-datetimepicker.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/assets/libs/datepicker/css/bootstrap-datetimepicker.min.css">



<?php $this->stop() ?>
