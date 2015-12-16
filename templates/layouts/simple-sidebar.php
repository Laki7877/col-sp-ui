<?php $this->layout('layouts/simple', ['title' => 'User Profile']) ?>

<div id="sidebar-wrapper">
	<?= $this->section('sidebar'); ?>
</div>
<div id="page-content-wrapper">
	<div class="container-fluid">
		<?= $this->section('page-content'); ?>
	</div>
</div>