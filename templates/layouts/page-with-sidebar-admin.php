<?php $this->layout('layouts/simple-sidebar-admin', get_defined_vars()) ?>

<?php $this->start('sidebar') ?>
	<div class="logo-img-wrapper">
		<img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
	</div>
    
    <ul ng-init="initMenu('admin')" class="sidebar-nav no-padding">
        <li ng-repeat="menuItem in menu track by $index" class="sidebar-brand {{activeMenuItem(menuItem)}}" ng-mouseenter="menuItem.hover=true" ng-mouseleave="menuItem.hover=false">
            <i class="fa fa-fw sidebar-font-awesome {{menuItem.icon}}"></i>
            <a ng-href="{{menuItem.url}}">{{menuItem.header}}</a>
        </li>
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
        <li ng-class="activeUrl('/admin/coupons/admin')" class="item margin-top-20"><a href="/admin/coupons/admin">Global Coupons</a></li>
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