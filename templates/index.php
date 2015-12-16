<?php $this->layout('layouts/simple-sidebar', ['title' => 'User Profile']) ?>

<?php $this->start('sidebar') ?>
<ul class="sidebar-nav">
    <li class="sidebar-brand"><a href="#">Home</a></li>
    <li><i class="fa fa-home"></i><a href="#">Another link</a></li>
    <li><a href="#">Next link</a></li>
    <li><a href="#">Last link</a></li>
</ul>
<?php $this->stop() ?>

<?php $this->start('page-content') ?>
	<div class="row">
        <div class="header">
            <span class="header-font-subject">
                Lara Thailand
            </span>
            <span class="header-font-detail header-padding-right">
                user1@lara.co.th
            </span>
            <span class="header-font-detail">
                View your store
            </span>
        </div>
        <div class="col-xs-12">
            <!-- content of page -->
            <div>
            	hello, it's me.
            </div>
        </div>
    </div>
<?php $this->stop() ?>