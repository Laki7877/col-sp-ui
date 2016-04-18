<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product']) ?>
<?php $this->start('page-body') ?>

<script type="text/ng-template" id="page-btn-controls">
                <div class="float-right" ng-if="!_loading.state && adminMode">
                    <a class="link-btn-plain" type="button" ng-click="cancel()">Cancel</a>
                    <button type="button"  ng-show="formData.Status != 'WA'" class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>
                    <button type="button" class="btn btn-blue btn-width-xl" ng-click="saveAsIs()">Save</button>
                </div>
                <div class="page-actions float-right" ng-if="!_loading.state && !adminMode && formData.Status != 'AP'">
                    <a type="button" class="link-btn-plain" ng-click="cancel()">Cancel</a>
                    <button type="button"  ng-show="formData.Status != 'WA'" class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>
                    <button ng-show="formData.Status != 'WA'" class="btn btn-white btn-width-xl" type="button" ng-click="publish('DF')">Save as Draft</button>
                    <button ng-show="formData.Status != 'WA'" type="button" class="btn btn-blue btn-width-xl" ng-click="prePublishWA()">Publish</button>
                </div>
                <div class="page-actions float-right" ng-if="!_loading.state && !adminMode && formData.Status == 'AP'">
                    <a type="button" class="link-btn-plain" ng-click="cancel()">Cancel</a>
                    <button class="btn btn-white btn-width-xl" type="button" ng-click="preview()">Preview</button>
                    <button class="btn btn-blue btn-width-xl" type="button" ng-click="preEditProduct()">Edit Product</button>
                </div>
</script>

<div ng-controller="SellerProductDetailCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>

       <nc-alert nc-model="devAlert"></nc-alert>
       <nc-alert nc-model="alert"></nc-alert>
       <nc-alert nc-model="adminAlert"></nc-alert>

      <div style="padding-bottom: 10px" ng-show="!pageState.loading.state">
               <button ng-click="_debugLoad()" class="btn btn-xs" ng-disabled="disableDebugLoad">
                    <span class="glyphicon glyphicon-asterisk"></span> Quick Load
                </button>
                <button ng-click="_debugSave()" class="btn btn-xs">
                    <span class="glyphicon glyphicon-asterisk"></span> Quick Save
                </button>
       </div>

       <div ap-component="ap/form-product-add"></div>
</div>

<?php $this->stop() ?>
