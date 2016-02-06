<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title-breadcrumb-border', ['text' => "Product Approval List" ]) ?>
		<? $this->insert('components/search-section', ['actions' =>['Approve', 'Unapprove'] ]) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/admin_product_approval_list_content') ?>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->stop() ?>