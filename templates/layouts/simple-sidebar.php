<?php $this->layout('layouts/simple', ['title' => 'User Profile']) ?>

<div id="sidebar-wrapper">
	<?= $this->section('sidebar', ['title' => 'sidebar hello']); ?>
</div>
<div id="page-content-wrapper">
	<?= $this->section('page-header', $this->fetch('components/header')); ?>
	<div class="container-fluid">
		<?= $this->section('page-content'); ?>
	</div>
</div>