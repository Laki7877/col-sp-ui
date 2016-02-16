<?php $this->layout('layouts/simple-sidebar-admin', get_defined_vars()) ?>

<?php $this->start('sidebar') ?>
	<div class="logo-img-wrapper">
		<img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
	</div>
    
    <?php $this->insert('components/sidebar-nav-admin', ['itemActive' => 'Home']) ?>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-products">
        <li class="sub-sidebar-header">Products</li>
        <li ng-class="activeUrl('/admin/products')" class="item margin-top-20"><a href="/admin/products">View All Products</a></li>
        <li ng-class="activeUrl('/admin/approve')" class="item"><a href="/admin/approve">Approve Products</a></li>
        <li ng-class="activeUrl('/admin/master')" class="item"><a href="/admin/master">Master Products</a></li>
        <li ng-class="activeUrl('/admin/brands')" class="item"><a href="/admin/brands">Brands</a></li>
        <li ng-class="activeUrl('/admin/attributes')" class="item"><a href="/admin/brands">Attributes</a></li>
        <li ng-class="activeUrl('/admin/attributesets')" class="item"><a href="/admin/brands">Attribute Sets</a></li>
        <li ng-class="activeUrl('/admin/categories')" class="item"><a href="/admin/brands">Global Categories</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-accounts">
        <li class="sub-sidebar-header">Accounts</li>
        <li ng-class="activeUrl('/admin/shops')" class="item margin-top-20"><a href="/admin/shops">Shop Accounts</a></li>
        <li ng-class="activeUrl('/admin/shoptypes')" class="item"><a href="/admin/shoptypes">Shop Types</a></li>
        <li ng-class="activeUrl('/admin/accounts')" class="item"><a href="/admin/accounts">Admin Accounts</a></li>
        <li ng-class="activeUrl('/admin/roles')" class="item"><a href="/admin/roles">Admin Roles</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-promotion">
        <li class="sub-sidebar-header">Promotion</li>
        <li ng-class="activeUrl('/admin/coupons/global')" class="item margin-top-20"><a href="/admin/coupons/global">Global Coupons</a></li>
        <li ng-class="activeUrl('/admin/coupons/seller')" class="item"><a href="/admin/coupons/seller">Seller Coupons</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-reports">
        <li class="sub-sidebar-header">Reports</li>
        <li ng-class="activeUrl('/admin/reports')" class="item margin-top-20"><a href="/admin/reports">View</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-others">
        <li class="sub-sidebar-header">Others</li>
        <li ng-class="activeUrl('/admin/newsletters')" class="item margin-top-20"><a href="/admin/newsletters">Newsletters</a></li>
    </ul>


    <!-- <ul class="sub-sidebar" style="display: none;" id="sub-admin-account">
        <li class="sub-sidebar-header">Admin Accounts</li>
        <li ng-class="activeUrl('/admin/accounts')" class="item margin-top-20"><a href="/admin/accounts">View</a></li>
        <li ng-class="activeUrl('/admin/accounts/add')" class="item"><a href="/admin/accounts/add">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-role">
        <li class="sub-sidebar-header">Admin Roles</li>
        <li ng-class="activeUrl('/admin/roles')" class="item margin-top-20"><a href="/admin/roles">View</a></li>
        <li ng-class="activeUrl('/admin/roles/add')" class="item"><a href="/admin/roles/add">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-shop-account">
        <li class="sub-sidebar-header">Shop Accounts</li>
        <li ng-class="activeUrl('/admin/shops')" class="item margin-top-20"><a href="/admin/shops">View</a></li>
        <li ng-class="activeUrl('/admin/shops/add')" class="item"><a href="/admin/shops/add">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-shop-type">
        <li class="sub-sidebar-header">Shop Types</li>
        <li ng-class="activeUrl('/admin/shoptypes')" class="item margin-top-20"><a href="/admin/shoptypes">View</a></li>
        <li ng-class="activeUrl('/admin/shoptypes/add')" class="item"><a href="/admin/shoptypes/add">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-attribute">
        <li class="sub-sidebar-header">Attribute</li>
        <li ng-class="activeUrl('/admin/attributes')" class="item margin-top-20"><a href="/admin/attributes">View</a></li>
        <li ng-class="activeUrl('/admin/attributes/add')" class="item"><a href="/admin/attributes/add">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-attribute-set">
        <li class="sub-sidebar-header">Attribute Set</li>
        <li ng-class="activeUrl('/admin/attributesets')" class="item margin-top-20"><a href="/admin/attributesets">View</a></li>
        <li ng-class="activeUrl('/admin/attributesets/add')" class="item"><a href="/admin/attributesets/add">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-brand">
        <li class="sub-sidebar-header">Brand</li>
        <li ng-class="activeUrl('/admin/brands')" class="item margin-top-20"><a href="/admin/brands">View</a></li>
        <li ng-class="activeUrl('/admin/brands/add')" class="item"><a href="/admin/brands/add">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-category">
        <li class="sub-sidebar-header">Global Category</li>
        <li ng-class="activeUrl('/admin/categories')" class="item margin-top-20"><a href="/admin/categories">View</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-product-approval">
        <li class="sub-sidebar-header">Product Approval</li>
        <li class="item active margin-top-20"><a href="?p=admin_product_approval">View</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-all-product">
        <li class="sub-sidebar-header">All Product</li>
        <li class="item active margin-top-20"><a href="?p=admin_all_products">View</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-promotion">
        <li class="sub-sidebar-header">Promotion</li>
        <li class="item active margin-top-20"><a href="?p=admin_coupons">Coupons</a></li>
    </ul> -->

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