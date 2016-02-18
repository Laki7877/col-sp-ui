<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Inventory'])
?>

<?php $this->start('page-body') ?>
	<div>

		<div class="page-header with-border">
	        <h1 class="float-left page-header-title">Inventory</h1>
	        <span class="float-right page-header-action">
	            <a href="/?p=seller_export_products" class="btn margin-left-10 btn-white btn-width-xl">
	              <span class="">Export All</span>
	            </a>

	            <div class="btn-group margin-left-10">
	              <button type="button" class="btn btn-white dropdown-toggle btn-width-xl" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                Import <span class="caret"></span>
	              </button>
	              <ul class="dropdown-menu">
	                <li><a href="/?p=seller_import_products">Add New Products</a></li>
	                <li><a href="/?p=seller_update_products">Update Existing Products</a></li>
	              </ul>
	            </div>
	        </span>
	    </div>

		<div class="row search-section-wrapper">
		  <form ng-submit="applySearch()" class="search-section section-search">
		    <div class="input-group">
		        <input type="text" ng-model="searchText"
		          class="form-control input-search-icon search-box" ng-model="searchText" placeholder="Search for Product SKU, Name, ..." aria-describedby="basic-addon2">
		        <span class="input-group-btn">
		          <button class="btn btn-white">Search</button>
		        </span>
		    </div>
		  </form>
		 <div class="search-section advance-search">
		    <button class="btn btn-white" type="button">Advanced Search</button>
		  </div>
		</div>



		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<? $this->insert('partials/inventory_content') ?>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->stop() ?>
