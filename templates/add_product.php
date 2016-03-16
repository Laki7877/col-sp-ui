<?php
$menus = [
    ['id' => 'information', 'name' => 'Information', 'class' => 'require active'],
    ['id' => 'images', 'name' => 'Images', 'class' => 'require'], // "ng_class" => "{require : ((formData.Variants || []).length == 0) }"
    ['id' => 'category', 'name' => 'Category', 'class' => ''],
    ['id' => 'more_option', 'name' => 'More Options', 'class' => ''],
    ['id' => 'variation', 'name' => 'Variation', 'class' => ''],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product'])
?>
<?php $this->start('page-body') ?>

<div ng-controller="SellerProductDetailCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
   <nc-alert nc-model="devAlert"></nc-alert>
   <nc-alert nc-model="alert"></nc-alert>

		<form name="addProductForm" class="ah-form sticky-mainform-action" novalidate>
            <fieldset ng-disabled="formData.Status == 'WA'">
            <?php $this->insert('components/page-title-breadcrumb', ['text' => 'Products/ '.$title, 'urls' => ['/products']]) ?>
            <div ng-if="pageState.loading.state" nc-loading="{{ pageState.loading.message }}..">
            </div>
            <div class="add-product-body" ng-if="!pageState.loading.state">

                <?php $this->insert('components/tab-nav', ['items' => $menus]) ?>
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
                            <div class="float-right">
                                <a href="/products" class="link-btn-plain">Cancel</a>

				<button ng-click="_debugLoad()" class="btn btn-success"><i class="glyphicon glyphicon-folder-open"></i>&nbsp;&nbsp;Load</button>
				<button ng-click="_debugSave()" class="btn btn-success"><i class="glyphicon glyphicon-floppy-disk"></i>&nbsp;Save</button>

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

  <?php //$this->insert('components/modal-add-alternative-global-category', ['id' => 'global-category', 'header' => 'Add Alternative Global Category', 'ng_model' => 'viewCategorySelected', 'template' => 'viewCategoryColumns']) ?>
  <?php //$this->insert('components/modal-add-local-category', ['id' => 'local-category', 'header' => 'Add Local Category', 'ng_model' => 'viewCategorySelected', 'template' => 'viewCategoryColumns']) ?>

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
