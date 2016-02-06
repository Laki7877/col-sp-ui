<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title-with-buttons', ['text' => "Inventory", 
			'buttons' => [
	        	['link' => '?p=seller_inventory_export_import', 'class' => 'btn-blue btn-width-xxl', 'name' => 'Export & Import Inventory']
	        ] ]) ?>
		<? $this->insert('components/search-section', ['actions' =>['Approve', 'Unapprove'] ]) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/inventory_content') ?>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->stop() ?>