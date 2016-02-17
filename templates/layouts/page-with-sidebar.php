<?php $this->layout('layouts/simple-sidebar', get_defined_vars()) ?>

<?php $this->start('sidebar') ?>
	<div class="logo-img-wrapper">
		<img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
	</div>
    
    <?php $this->insert('components/sidebar-nav') ?>
    
    <ul class="sub-sidebar" style="display: none;" id="sub-sidebar-product">
        <li class="sub-sidebar-header">Product</li>
        <li ng-class="activeUrl('/products')" class="item margin-top-20"><a href="/products">View</a></li>
        <li ng-class="activeUrl('/products/add')" class="item"><a href="/products/select">Add</a></li>
        <li class="item"><a href="">Import</a></li>
        <li class="item"><a href="">Export</a></li>
        <li ng-class="activeUrl('/categories')" class="item margin-top-30"><a href="/categories">Local Category</a></li>
        <li ng-class="activeUrl('/products/reviews')" class="item"><a href="/products/reviews">Product Reviews</a></li>
        <li ng-class="activeUrl('/products/images')" class="item"><a href="/products/images">Product Images</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-sidebar-inventory">
        <li class="sub-sidebar-header">Inventory</li>
        <li class="item active margin-top-20"><a href="/?p=seller_inventory">View</a></li>
        <!-- <li class="item"><a href="/?p=add_product">Add</a></li> -->
        <!-- <li class="item"><a href="/?p=import_product">Import</a></li> -->
        <!-- <li class="item"><a href="/?p=index">Export</a></li> -->
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-sidebar-promotion">
        <li class="sub-sidebar-header">Promotion</li>
        <li class="item active margin-top-20"><a href="/?p=seller_coupons">Coupons</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-sidebar-account">
        <li class="sub-sidebar-header">Account</li>
        <li ng-class="activeUrl('/accounts')" class="item margin-top-20"><a href="/accounts">User Accounts</a></li>
        <li ng-class="activeUrl('/roles')" class="item"><a href="/roles">User Roles</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-sidebar-product-collection">
        <li class="sub-sidebar-header">Collection</li>
        <li ng-class="activeUrl('/collections')"  class="item margin-top-20"><a href="/collections">View</a></li>
        <li ng-class="activeUrl('/collections/add')"  class="item"><a href="/collections/add">add</a></li>
    </ul>
<?php $this->stop() ?>

<?php $this->start('page-content') ?>
    <div id="page-body-wrapper">
    	<div class="row">
            <div class="col-xs-12">
                <?= $this->section('page-body') ?>
            </div>
        </div>
    </div>
<?php $this->stop() ?>