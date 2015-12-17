<?php $this->layout('layouts/page-with-sidebar', ['title' => 'User Profile']) ?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title', ['text' => "Products/Add Product"]) ?>
		
		<div class="add-product-body">
			<? $this->insert('components/tab-nav') ?>
		</div>
	</div>
<?php $this->stop() ?>