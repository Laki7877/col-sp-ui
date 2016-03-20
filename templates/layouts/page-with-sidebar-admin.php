<?php $this->layout('layouts/simple-sidebar-admin', get_defined_vars()) ?>

<?php $this->start('sidebar') ?>
    <div class="logo-img-wrapper">
        <img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
    </div>
    <div class="logo-img-wrapper-collased">
        <img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo_small.png') ?>" />
    </div>

    <ul ng-init="initMenu('admin')" class="sidebar-nav no-padding">
        <li ng-repeat="menuItem in menu track by $index" class="sidebar-brand {{activeMenuItem(menuItem)}}" ng-mouseenter="menuItem.hover=true" ng-mouseleave="menuItem.hover=false">
            <a ng-href="{{menuItem.url}}"><i class="fa fa-fw sidebar-font-awesome {{menuItem.icon}}"></i></a>
            <a ng-href="{{menuItem.url}}" class="sidebar-nav-text">{{menuItem.header}}</a>
        </li>
    </ul>

    <ul ng-if="menuItem.submenu.length > 0" ng-repeat="menuItem in menu track by $index" class="sub-sidebar" ng-show="menuItem.hover" ng-mouseenter="menuItem.hover=true" ng-mouseleave="menuItem.hover=false">
        <li class="sub-sidebar-header">{{menuItem.header}}</li>
        <li ng-repeat="submenuItem in menuItem.submenu track by $index" class="{{ activeSubmenuItem(submenuItem) }} {{ submenuItem.css }} {{ $index == 0 ? 'margin-first-submenu' : '' }} item">
            <a ng-if="submenuItem.url.length > 0" ng-href="{{ submenuItem.url }}">{{ submenuItem.header }}</a>
        </li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-newsletters">
        <li class="sub-sidebar-header">Newsletters</li>
        <li class="item active margin-top-20"><a href="?p=admin_newsletters">View</a></li>
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
