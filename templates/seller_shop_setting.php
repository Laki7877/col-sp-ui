<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title-with-buttons', ['text' => "Shop Profile Setting",
			'buttons' => [
	        	['link' => '#', 'class' => 'btn-white btn-width-xl', 'name' => 'Live View'],
	        	['link' => '#', 'class' => 'btn-blue btn-width-xl', 'name' => 'Save']
	        ]
		]) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/shop_setting_content') ?>
					</div>
				</div>
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<button class="btn btn-white btn-width-xl">Live View</button>
							<button class="btn btn-blue btn-width-xl">Save</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->stop() ?>