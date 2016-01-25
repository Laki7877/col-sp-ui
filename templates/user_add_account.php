<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Account'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "User Accounts/Create New User Account"]) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/user-add-account-content') ?>
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