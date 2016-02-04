<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title-with-buttons', ['text' => "Products" , 
			'buttons' => [
	        	['link' => '#', 'class' => 'btn-white', 'name' => 'Export'],
	        	['link' => '#', 'class' => 'btn-white', 'name' => 'Import'],
	        	['link' => '#', 'class' => 'btn-blue btn-width-xl', 'name' => 'Add Product']
	        ]
	        ]) ?>
		<? $this->insert('components/search-section', ['actions' =>['Approve', 'Unapprove'] ]) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/product_list_content') ?>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->stop() ?>