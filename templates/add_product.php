<?php $this->layout('layouts/page-with-sidebar', ['title' => 'User Profile']) ?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title', ['text' => "Products/Add Product"]) ?> <? $this->insert('components/button-primary', ['text' => "Create"]) ?>
	</div>
<?php $this->stop() ?>