<?php $this->layout('layouts/simple-sidebar', get_defined_vars()) ?>

<?php $this->start('sidebar') ?>
    <div class="logo-img-wrapper">
        <img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
    </div>

    <ul ng-init="initMenu('seller')" class="sidebar-nav no-padding">
        <li ng-repeat="menuItem in menu track by $index" class="sidebar-brand {{activeMenuItem(menuItem)}}" ng-mouseenter="menuItem.hover=true" ng-mouseleave="menuItem.hover=false">
            <i class="fa fa-fw sidebar-font-awesome {{menuItem.icon}}"></i>
            <a ng-href="{{menuItem.url}}">{{menuItem.header}}</a>
        </li>
    </ul>

    <ul ng-if="menuItem.submenu.length > 0" ng-repeat="menuItem in menu track by $index" class="sub-sidebar" ng-show="menuItem.hover" ng-mouseenter="menuItem.hover=true" ng-mouseleave="menuItem.hover=false">
        <li class="sub-sidebar-header">{{menuItem.header}}</li>
        <li ng-repeat="submenuItem in menuItem.submenu track by $index" class="{{ activeSubmenuItem(submenuItem) }} {{ submenuItem.css }} {{ $index == 0 ? 'margin-top-20' : '' }} item">
            <a ng-if="submenuItem.url.length > 0" ng-href="{{ submenuItem.url }}">{{ submenuItem.header }}</a>
        </li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-sidebar-product-collection">
        <li class="sub-sidebar-header">Collection</li>
        <li ng-class="activeUrl('/collections')"  class="item margin-top-20"><a href="/collections">View</a></li>
        <li ng-class="activeUrl('/collections/add')"  class="item"><a href="/collections/add">Add</a></li>
        <li ng-class="activeUrl('/collections/addlist')"  class="item"><a href="/collections/addlist">Add Item List</a></li>

        <li ng-class="activeUrl('/collections/cat')" class="item margin-top-30"><a href="/collections/cat">Category View</a></li>
        <li ng-class="activeUrl('/collections/catadd')" class="item"><a href="/collections/catadd">Category Add</a></li>

        <li ng-class="activeUrl('/collections/group')" class="item margin-top-30"><a href="/collections/group">Category Group View</a></li>
        <li ng-class="activeUrl('/collections/groupadd')" class="item"><a href="/collections/groupadd">Category Group Add</a></li>

    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-sidebar-buy1get1">
         <li class="sub-sidebar-header">Buy 1 Get 1</li>
        <li ng-class="activeUrl('/buy1get1')"  class="item margin-top-20"><a href="/buy1get1">View</a></li>
        <li ng-class="activeUrl('/buy1get1/add')"  class="item"><a href="/buy1get1/add">Add</a></li>
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
