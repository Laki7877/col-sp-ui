<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page">
		<? $this->insert('components/local-category-empty-content', ['text' => '404 Page not found']) ?>			
	</div>

<?php $this->stop() ?>