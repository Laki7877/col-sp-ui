<?php
$menus = [
	["id" => "information", "name" => 'Information', "class" => "active"],
	["id" => "images", "name" => 'Images', "class" => ""],
	["id" => "category", "name" => 'Category', "class" => ""],
	["id" => "variation", "name" => 'Variation', "class" => ""],
	["id" => "more_option", "name" => 'More Options', "class" => ""],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/view-product-title-breadcrumb', ['text' => "Products/View Product"]) ?>

		<div class="add-product-body">
			<? $this->insert('components/tab-nav', ["items" => $menus]) ?>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
						<? $this->insert('partials/view-product-information') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="images">
						<? $this->insert('partials/add-product-images') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="category">
						<? $this->insert('partials/add-product-category') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="variation">
						<? $this->insert('partials/add-product-variation') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="more_option">
						<? $this->insert('partials/add-product-more-option') ?>
					</div>
				</div>
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<a href="#" data-toggle="modal" data-target="#edit-product-confirm" >Show edit product modal</a>
							<button class="btn btn-white btn-width-xl">Cancel</button>
							<button class="btn btn-green btn-width-xl">Edit Product</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<? $this->insert('components/modal-edit-product', ['id' => 'edit-product-confirm']) ?>
<?php $this->stop() ?>