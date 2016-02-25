<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>

<div ng-controller="AdminProductApprovalListCtrl">
   <nc-alert nc-model="alert"></nc-alert>
   <nc-page-title nc-title="Product Approval List">
   </nc-page-title>
<div>
    <div class="row search-section-wrapper">
          <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="ProductId"></nc-bulk>
		  <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Product SKU, Name, ...'"></nc-search>
		  <div class="search-section advance-search">
    		<button class="btn btn-white-fluid border_blue" type="button">Advanced Search</button>
  		   </div>
		</div>

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
</div>
<?php $this->stop() ?>
