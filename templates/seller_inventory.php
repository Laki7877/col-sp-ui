<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Inventory'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="SellerInventoryListCtrl">
       <nc-page-title nc-title="Inventory">
            <a ng-href="/products/export" class="btn ng-scope btn-white btn-width-xxl">
	            <span class="">Export All Products</span>
          	</a>
            <div class="btn-group margin-left-10">
              <button type="button" class="btn btn-white dropdown-toggle btn-width-xxl" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Import Products <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li><a href="/products/import">Add New Products</a></li>
                <li><a href="/products/import/update">Update Existing Products</a></li>
              </ul>
            </div>
       </nc-page-title>
	    <div class="row search-section-wrapper">
      		<nc-search nc-model="params.searchText" nc-search-event="onSearch" nc-search-placeholder="'Search for Product SKU, Name, ...'"></nc-search>
		  	<nc-advance-search-button nc-model="advanceSearch"></nc-advance-search-button>
		</div>
		<nc-advance-search nc-model="advanceSearchParams" nc-advance-search-toggle="advanceSearch" nc-advance-search-event="onAdvanceSearch" nc-advance-search-options="advanceSearchOptions"></nc-advance-search>
		<nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter><!-- advance search will appear here -->
		<nc-table id="inventory-tab-content" nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
		    <table class="table table-curved">
		        <thead>
		            <tr class="table-head">
		                <th></th>
		                <th nc-sort="ProductNameEn">Product Name</th>
		                <th nc-sort="Pid">Product ID</th>
		                <th nc-sort="Sku">SKU</th>
		                <th nc-sort="AvailableStock" class="text-right">Available</th>
		                <th nc-sort="Status">Status</th>
		                <th>Action</th>
		            </tr>
		        </thead>
		        <tbody>
		            <tr ng-repeat="row in list.data">
		                <td class="display-column">
		                    <div class="img-holder">
		                        <img ng-if='!row.ImageUrl' class="logo-img" src="<?= $this->asset('/assets/img/placeholder-no-image.png') ?>" />
		                        <img ng-if='row.ImageUrl' class="logo-img" src="{{ row.ImageUrl }}" />
		                    </div>
		                </td>
		                <td class="column-text-ellipsis">
		                    <a href="/products/{{row.ProductId}}">{{row.ProductNameEn}}</a>
           					<div class="color-dark-grey font-size-12" ng-if="row.IsVariant">{{ row.VariantAttribute | variantValue }}</div>
		                </td>
		                <td>{{row.Pid}}</td>
		                <td>{{row.Sku}}</td>
		                <td class="text-right popover-markup" ng-click="popoverStock(row)" uib-popover-template="'inventory/stockPopover'" popover-placement="right" popover-is-open="row.open" popover-trigger="outsideClick" popover-append-to-body="true">
		                	<a href="javascript:;" class="color-dark-grey" style='{{ lastEdit == row.Pid ? "font-weight:bold;" : ""}}'>{{getAvailableStock(row)}}</span>
		                	<span><i class="fa fa-caret-down color-dark-grey"></i></span></td>
		                <td><span class="margin-left-10 {{getStatus(row).color}}">{{getStatus(row).name}}</span></td>
		                <td>
		                    <nc-action nc-model="row" nc-action-fn="actions"></nc-action>
		                </td>
		            </tr>
		        </tbody>
		    </table>
		</nc-table>
		<nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
	</div>
<?php $this->stop() ?>
