<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Shop Types/Create New Shop Types"]) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/admin-add-shop-type-content') ?>
					</div>
				</div>
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<a href="#" class="link-btn-plain">Cancel</a>
							<button class="btn btn-blue btn-width-xl">Save</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->stop() ?>