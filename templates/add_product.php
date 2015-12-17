<?php
$menus = [
	["id" => "information", "name" => 'Information', "class" => "active require"],
	["id" => "images", "name" => 'Images', "class" => "require"],
	["id" => "category", "name" => 'Category'],
	["id" => "variation", "name" => 'Variation'],
	["id" => "more_option", "name" => 'More Options'],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'User Profile'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title', ['text' => "Products/Add Product"]) ?>

		<div class="add-product-body">
			<? $this->insert('components/tab-nav', ["items" => $menus]) ?>
		</div>
	</div>
<?php $this->stop() ?>