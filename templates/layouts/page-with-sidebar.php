<?php $this->layout('layouts/simple-sidebar', get_defined_vars()) ?>

<?php $this->start('sidebar') ?>
    <?php $this->insert('components/sidebar-nav', ['itemActive' => 'Home']) ?>
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