<?php $this->layout('layouts/simple-sidebar-admin', get_defined_vars()) ?>

<?php $this->start('sidebar') ?>
	<div class="logo-img-wrapper">
		<img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
	</div>
    
    <?php $this->insert('components/sidebar-nav-admin', ['itemActive' => 'Home']) ?>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-account">
        <li class="sub-sidebar-header">Admin Accounts</li>
        <li class="item active margin-top-20"><a href="?p=admin_account">View</a></li>
        <li class="item"><a href="?p=admin_add_account">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-role">
        <li class="sub-sidebar-header">Admin Roles</li>
        <li class="item active margin-top-20"><a href="?p=admin_role">View</a></li>
        <li class="item"><a href="?p=admin_add_role">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-shop-account">
        <li class="sub-sidebar-header">Shop Accounts</li>
        <li class="item active margin-top-20"><a href="?p=admin_shop_account">View</a></li>
        <li class="item"><a href="?p=admin_add_shop_account">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-shop-type">
        <li class="sub-sidebar-header">Shop Types</li>
        <li class="item active margin-top-20"><a href="?p=admin_shop_type">View</a></li>
        <li class="item"><a href="?p=admin_add_shop_type">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-attribute">
        <li class="sub-sidebar-header">Attribute</li>
        <li class="item active margin-top-20"><a href="?p=admin_attribute">View</a></li>
        <li class="item"><a href="?p=admin_add_attribute">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-attribute-set">
        <li class="sub-sidebar-header">Attribute Set</li>
        <li class="item active margin-top-20"><a href="?p=admin_attribute_set">View</a></li>
        <li class="item"><a href="?p=admin_add_attribute_set">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-brand">
        <li class="sub-sidebar-header">Brand</li>
        <li class="item active margin-top-20"><a href="?p=admin_brand">View</a></li>
        <li class="item"><a href="?p=admin_add_brand">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-category">
        <li class="sub-sidebar-header">Global Category</li>
        <li class="item active margin-top-20"><a href="?p=admin_category">View</a></li>
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