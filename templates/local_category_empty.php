<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Local Category']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page">
		<? $this->insert('components/page-title-with-buttons-local-category', ['text' => 'Local Category']) ?>
		<? $this->insert('components/local-category-empty-content', ['text' => 'You do not have local category']) ?>			
	</div>

<?php $this->stop() ?>