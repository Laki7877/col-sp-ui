<?php $this->layout('layouts/page-with-sidebar', ['title' => $title]) ?>
fdsfadfsa
<?php $this->start('page-body') ?>
	<div class="local-category-page" ng-controller="Buy1Get1ImportCtrl">
		<? $this->insert('components/alert-text', ['close' => true, 'color' => 'green', 'text' => 'Successfully Import Collections. <a class="color-black text-underline">View Buy1 Get 1 List</a>']) ?>
		<? $this->insert('components/alert-text', ['close' => true, 'color' => 'red', 'text' => 'Fail to import Collections', 'header_class' => 'font-weight-bold',
		 'text_multilines' => ['- Wrong template file or format'
		,'- Required fields are missing'
		, '- Products with wrong PID'		
		, '- Wrong data type'
		]]) ?>

		<? $this->insert('components/page-title-breadcrumb-border', ['text' => 'Buy1 Get 1/Import Item']) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/import-buy1get1-content') ?>
					</div>
				</div>
			</form>
		</div>
	</div>



<?php $this->stop() ?>