<?php $this->layout('layouts/simple-sidebar', get_defined_vars()) ?>

<?php $this->start('sidebar') ?>
	<div class="logo-img-wrapper">
		<img class="logo-img" src="<?= $this->asset('/assets/img/seller_logo.png') ?>" />
	</div>
    
    <?php $this->insert('components/sidebar-nav', ['itemActive' => 'Home']) ?>
    
    <ul class="sub-sidebar" style="display: none;" id="sub-sidebar-product">
        <li class="sub-sidebar-header">Product</li>
        <li class="item active margin-top-20"><a href="">View</a></li>
        <li class="item"><a href="?p=add_product">Add</a></li>
        <li class="item"><a href="?p=import_product">Import</a></li>
        <li class="item"><a href="" data-toggle="modal" data-target="#export-product">Export</a></li>
        <li class="item margin-top-30"><a href="">Local Category</a></li>
        <li class="item"><a href="">Product Review</a></li>
        <li class="item"><a href="">Product Images</a></li>
    </ul>

    <ul class="sub-sidebar" style="display: none;" id="sub-sidebar-account">
        <li class="sub-sidebar-header">Account</li>
        <li class="item active margin-top-20"><a href="?p=user_account">User Accounts</a></li>
        <li class="item"><a href="?p=user_role">User Roles</a></li>
    </ul>

    <? $this->insert('components/modal-export-product', ['id' => 'export-product', 'newProductNum' => '1,500']) ?>
    <? $this->insert('components/modal-export-product-progressing', ['id' => 'export-product-progressing', 'percent' => '60']) ?>
    <? $this->insert('components/modal-export-product-complete', ['id' => 'export-product-complete']) ?>

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