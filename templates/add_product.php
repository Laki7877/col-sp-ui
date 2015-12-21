<?php
$menus = [
	["id" => "information", "name" => 'Information', "class" => "require"],
	["id" => "images", "name" => 'Images', "class" => "require"],
	["id" => "category", "name" => 'Category'],
	["id" => "variation", "name" => 'Variation'],
	["id" => "more_option", "name" => 'More Options', "class" => "active"],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'User Profile'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title', ['text' => "Products/Add Product"]) ?>

		<div class="add-product-body">
			<? $this->insert('components/tab-nav', ["items" => $menus]) ?>
			<form class="ah-form">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20" id="information">info</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="images">images</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="category">
						<? $this->insert('partials/add-product-category') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="variation">variation</div>
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/add-product-more-option') ?>
					</div>
				</div>
			</form>
		</div>
	</div>
<?php $this->stop() ?>