<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title-with-buttons', ['text' => "All Products", 
			'buttons' => [
	        	['link' => '#', 'class' => 'btn-white btn-width-xl', 'name' => 'Export']
	        ] ]) ?>
		<? $this->insert('components/search-section', ['actions' =>['Approve', 'Unapprove'], 'button_optional_class' => 'border_blue', 'optional_button_name' => 'Advanced Search' ]) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/admin_all_products_result_content') ?>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->stop() ?>