<?php
$menus = [
	["id" => "information", "name" => 'Information', "class" => "require"],
	["id" => "images", "name" => 'Images', "class" => "require"],
	["id" => "category", "name" => 'Category', "class" => "active"],
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
			<form class="ah-form">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20" id="information">info</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="images">images</div>
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="category">
						<? $this->insert('partials/add-product-category') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="variation">variation</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="more_option">more_option</div>
				</div>
			</form>
		</div>
	</div>
<?php $this->stop() ?>