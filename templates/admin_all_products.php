<?php
	    $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminProductListCtrl">
            
       <nc-page-title options="{
        title: 'All Products',
        buttons: [{
            'action': 'export()',
            'title' : 'Export',
            'classes' : ['btn-white']
        }]
       }"></nc-page-title>

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