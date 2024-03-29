<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Inventory']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page">
		<? $this->insert('components/alert-text', ['close' => true, 'color' => 'green', 'text' => 'Successfully Import Products. <a class="color-black text-underline">View Product List</a>']) ?>

		<? $this->insert('components/page-title-breadcrumb-border', ['text' => 'Inventory/Export & Import Inventory']) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/inventory_export_import_content') ?>
					</div>
				</div>
			</form>
		</div>
	</div>

<? $this->insert('components/modal-local-category', ['id' => 'local-category-detail', 'header' => 'Local Category Detail']) ?>

<?php $this->stop() ?>
