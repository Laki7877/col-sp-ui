 <?php
$menus = [
	["id" => "information", "name" => 'Information', "class" => "require active"],
	["id" => "images", "name" => 'Images', "class" => "require"], // "ng_class" => "{require : ((formData.Variants || []).length == 0) }"
	["id" => "category", "name" => 'Category', 'class' => ''],
	["id" => "more_option", "name" => 'More Options', 'class' => ''],
	["id" => "variation", "name" => 'Variation', 'class' => ''],
];

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Seller Portal - Product'])
?>
<?php $this->start('page-body') ?>

<div ng-controller="AdminProductDetailCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>

        <nc-alert nc-model="alert"></nc-alert>

		<form name="addProductForm" class="ah-form sticky-mainform-action" novalidate>
            <fieldset> <!-- admin can edit all statuses -->
            <? $this->insert('components/page-title-breadcrumb', ['text' => "Products/ " . $title, 'urls' => ['/products']]) ?>
            <div ng-if="pageState.loading.state" nc-loading="{{ pageState.loading.message }}..">
            </div>
            <div class="add-product-body" ng-if="!pageState.loading.state">

                    <? $this->insert('components/tab-nav', ["items" => $menus]) ?>
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
                             <div ap-component="ap/tab-information"></div>
                        </div>
                        <div role="tabpanel" class="tab-pane margin-top-20" id="images">
                           <div ap-component="ap/tab-images"></div>
                        </div>
                        <div role="tabpanel" class="tab-pane margin-top-20" id="category">
                            <div ap-component="ap/tab-category"></div>
                        </div>
    					<div role="tabpanel" class="tab-pane margin-top-20" id="more_option">
                             <div ap-component="ap/tab-more-option"></div>
    					</div>
                        <div role="tabpanel" class="tab-pane margin-top-20" id="variation">
                             <div ap-component="ap/tab-variations"></div>
                        </div>
                    </div>
                    <!-- tablc-ntent-->
                    <div class="add-product-form-action main-form-action full-width-row">
                        <div class="container-fluid">
                            <div class="float-right" ng-if="adminMode">
                                <button ng-show="formData.Status != 'WA'"
                                class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>
                                
                                <button type="submit" class="btn btn-blue btn-width-xl"
                                ng-click="saveAsIs()">Save</button>
                            </div>
                            <div class="float-right" ng-if="!adminMode">
                                <a href="/products" class="link-btn-plain">Cancel</a>

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

	<link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">
    <link rel="stylesheet" href="/assets/libs/select2/css/selectize.css">


<?php $this->stop() ?>