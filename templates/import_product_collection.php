<?php $this->layout('layouts/page-with-sidebar', ['title' => $title]) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page" ng-controller="ProductCollectionImportCtrl">
		<?php $this->insert('components/alert-text', ['close' => true, 'color' => 'green', 'text' => 'Successfully Import Collections. <a class="color-black text-underline">View Collections List</a>']) ?>
		<?php $this->insert('components/alert-text', ['close' => true, 'color' => 'red', 'text' => 'Fail to import Collections', 'header_class' => 'font-weight-bold',
		 'text_multilines' => ['- Wrong template file or format'
		,'- Required fields are missing'
		, '- Products with wrong PID'
		, '- Cannot update product that are "Wait for Apporval"'
		, '- Products with wrong brand or category ID'
		, '- Wrong data type'
		, '- Alien Attack'
		]]) ?>

		<?php $this->insert('components/page-title-breadcrumb-border', ['text' => 'Collections/Import Collections']) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<?php $this->insert('partials/import-product-content') ?>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->insert('components/modal-local-category', ['id' => 'local-category-detail', 'header' => 'Local Category Detail']) ?>

<?php $this->stop() ?>