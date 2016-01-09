<?php $this->layout('layouts/simple-sidebar-admin', get_defined_vars()) ?>

<?php $this->start('sidebar') ?>
	<div class="logo-img-wrapper">
		<img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
	</div>
    
    <?php $this->insert('components/sidebar-nav-admin', ['itemActive' => 'Home']) ?>

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