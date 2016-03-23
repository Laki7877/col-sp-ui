 <?php
$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration'])
?>
<?php $this->start('page-body') ?>

<div ng-controller="AdminProductDetailCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
    
        <nc-alert nc-model="alert"></nc-alert>
        
		<div ng-controller="SellerProductDetailCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
            <nc-alert nc-model="devAlert"></nc-alert>
            <nc-alert nc-model="alert"></nc-alert>
            <nc-alert nc-model="adminAlert"></nc-alert>

            <div ap-component="ap/form-product-add"></div>

        </div>

</div>

<?php $this->stop() ?>
