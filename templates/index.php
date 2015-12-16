<?php $this->layout('layouts/simple-sidebar', ['title' => 'User Profile']) ?>

<?php $this->start('sidebar') ?>
<ul class="sidebar-nav no-padding">
    <li class="sidebar-brand active">
        <i class="fa fa-home sidebar-font-awesome"></i>
        <a href="#">Home</a>
    </li>
    <li class="sidebar-brand">
        <i class="fa fa-inbox sidebar-font-awesome"></i>
        <a href="#">Orders</a>
    </li>
    <li class="sidebar-brand">
        <i class="fa fa-tag sidebar-font-awesome"></i>
        <a href="#">Products</a>
    </li>
    <li class="sidebar-brand">
        <i class="fa fa-archive sidebar-font-awesome"></i>
        <a href="#">Inventory</a>
    </li>
    <li class="sidebar-brand">
        <i class="fa fa-bookmark sidebar-font-awesome"></i>
        <a href="#">Promotion</a>
    </li>
    <li class="sidebar-brand">
        <i class="fa fa-sliders sidebar-font-awesome"></i>
        <a href="#">Shop Setting</a>
    </li>
    <li class="sidebar-brand">
        <i class="fa fa-line-chart sidebar-font-awesome"></i>
        <a href="#">Report</a>
    </li>
    <li class="sidebar-brand">
        <i class="fa fa-gear sidebar-font-awesome"></i>
        <a href="#">Account</a>
    </li>
</ul>
<?php $this->stop() ?>

<?php $this->start('page-content') ?>
	<div class="row">
        <div class="col-xs-12">
            <!-- content of page -->
            <div>
            	hello, it's me.
            </div>
        </div>
    </div>
<?php $this->stop() ?>