<?php
$menus = [
	["id" => "information", "name" => 'Information', "class" => "require active"],
	["id" => "images", "name" => 'Images', "class" => "require"],
	["id" => "category", "name" => 'Category', 'class' => ''],
	["id" => "variation", "name" => 'Variation', 'class' => ''],
	["id" => "more_option", "name" => 'More Options', 'class' => ''],
];

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Products'])
?>

<?php $this->start('page-body') ?>
	<div>
		<?php $this->insert('components/page-title-breadcrumb', ['text' => "Product Approval List/Product Detail", 
			'buttons' => [
	        	['link' => '#', 'class' => 'margin-bottom-15 btn-white btn-width-xl', 'name' => 'Preview'],
	        	['link' => '#', 'class' => 'margin-bottom-15 btn-blue btn-width-xl', 'name' => 'Save'],
	        ],
	        'borderClass' => 'with-border'
		]) ?>

		<div class="add-product-body">
			<div>
				<form class="ah-form sticky-mainform-action">
					<div class="tab-content">
						<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
							<?php $this->insert('partials/product_approval_list_content') ?>
						</div>
					</div>
				</form>
			</div>

			<?php $this->insert('components/tab-nav', ["items" => $menus]) ?>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
						<?php $this->insert('partials/add-product-information') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="images">
						<?php $this->insert('partials/add-product-images') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="category">
						<?php $this->insert('partials/add-product-category') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="variation">
						<?php $this->insert('partials/add-product-variation') ?>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="more_option">
						<?php $this->insert('partials/add-product-more-option') ?>
					</div>
				</div>
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<button class="btn btn-white btn-width-xl">Preview</button>
							<button class="btn btn-blue btn-width-xl">Save</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->stop() ?>