<?php $this->layout('layouts/simple-sidebar-admin', get_defined_vars()) ?>

<?php $this->start('sidebar') ?>
	<div class="logo-img-wrapper">
		<img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
	</div>
    
    <?php $this->insert('components/sidebar-nav-admin', ['itemActive' => 'Home']) ?>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-account">
        <li class="sub-sidebar-header">Admin Accounts</li>
        <li ng-class="activeUrl('/admin/accounts')" class="item active margin-top-20"><a href="/admin/accounts">View</a></li>
        <li ng-class="activeUrl('/admin/accounts/add')" class="item"><a href="/admin/accounts/add">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-role">
        <li class="sub-sidebar-header">Admin Roles</li>
        <li ng-class="activeUrl('/admin/roles')" class="item active margin-top-20"><a href="/admin/roles">View</a></li>
        <li ng-class="activeUrl('/admin/roles/add')" class="item"><a href="/admin/roles/add">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-shop-account">
        <li class="sub-sidebar-header">Shop Accounts</li>
        <li ng-class="activeUrl('/admin/shopaccounts')" class="item active margin-top-20"><a href="/admin/shopaccounts">View</a></li>
        <li ng-class="activeUrl('/admin/shopaccounts/add')" class="item"><a href="/admin/shopaccounts/add">Add</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-admin-shop-type">
        <li class="sub-sidebar-header">Shop Types</li>
        <li ng-class="activeUrl('/admin/shoptypes')" class="item active margin-top-20"><a href="/admin/shoptypes">View</a></li>
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