<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product']) ?>
<?php $this->start('page-body') ?>

<script type="text/ng-template" id="page-btn-controls">
                <div class="float-right" ng-if="!_loading.state && adminMode">
                    <button ng-show="formData.Status != 'WA'" class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>
                    <button type="submit" class="btn btn-blue btn-width-xl" ng-click="saveAsIs()">Save</button>
                </div>
                <div class="page-actions float-right" ng-if="!_loading.state && !adminMode && formData.Status != 'AP'">
                    <button ng-click="_debugLoad()" class="btn btn-xs btn-success"><i class="glyphicon glyphicon-folder-open"></i></button>
				    <button ng-click="_debugSave()" class="btn btn-xs btn-success"><i class="glyphicon glyphicon-floppy-disk"></i></button>
                    <button ng-show="formData.Status != 'WA'" class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>
                    <button ng-show="formData.Status != 'WA'" class="btn btn-white btn-width-xl" type="submit" ng-click="publish('DF')">Save as Draft</button>
                    <button ng-show="formData.Status != 'WA'" type="submit" class="btn btn-blue btn-width-xl" ng-click="prePublishWA()">Publish</button>
                </div>
                <div class="page-actions float-right" ng-if="!_loading.state && !adminMode && formData.Status == 'AP'">
                    <button class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>
                    <button class="btn btn-blue btn-width-xl" ng-click="preEditProduct()">Edit Product</button>
                </div>
</script>

<div ng-controller="SellerProductDetailCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
       <nc-alert nc-model="devAlert"></nc-alert>
       <nc-alert nc-model="alert"></nc-alert>
       <nc-alert nc-model="adminAlert"></nc-alert>

       <div ap-component="ap/form-product-add"></div>

</div>

<?php $this->stop() ?>
