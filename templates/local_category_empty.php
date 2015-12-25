<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Local Category']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page">
		<? $this->insert('components/page-title-with-buttons-local-category', ['text' => 'Local Category']) ?>
		<div class="local-category-empty-section margin-top-20 row">
			<div class="col-xs-2">
				<div class="zero-category-image">
				</div>
			</div>
			<div class="col-xs-10 local-category-empty-text">
				You do not have local category
			</div>
		</div>
	</div>

<?php $this->stop() ?>