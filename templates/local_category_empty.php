<?php $this->layout('layouts/page-with-sidebar', ['title' => '404']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page">
		<?php $this->insert('components/page-title-with-buttons-local-category', ['text' => 'Local Category']) ?>
		<?php $this->insert('components/local-category-empty-content', ['text' => 'You do not have local category']) ?>			
	</div>

<?php $this->stop() ?>