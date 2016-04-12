 <?php
$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration'])
?>
<?php $this->start('page-body') ?>

<script type="text/ng-template" id="page-btn-controls">
     <div class="float-right" ng-if="!_loading.state">
    <a class="btn btn-white btn-width-xl" ng-href="/admin/products">Cancel</a>
    <button ng-show="formData.Status != 'WA'" class="btn btn-white margin-left-10 btn-width-xl" ng-click="preview()">Preview</button>
    <button type="submit" class="btn btn-blue margin-left-10 btn-width-xl" ng-click="prePublishWA()">Save</button>
    </div>
</script>

<div ng-controller="AdminProductDetailCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
    
        <nc-alert nc-model="alert"></nc-alert>
        
		<div ng-controller="SellerProductDetailCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
            <nc-alert nc-model="alert"></nc-alert>
            <div ap-component="ap/form-product-add"></div>

        </div>

</div>

<?php $this->stop() ?>
