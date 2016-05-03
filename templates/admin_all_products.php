<?php
	    $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminProductListCtrl">
		<nc-alert nc-model="alert"></nc-alert>
	       <nc-page-title nc-title="All Products" icon="fa-tag">
	      <form id="exportForm" name="exportForm" action="/admin/products/export" method="post">
	          <input type="hidden" name="selected_products[]" ng-repeat="item in bulkContainer" value="{{ item.ProductId }}"/>
	          <div class="btn-group">
	            <button type="button" class="btn btn-white dropdown-toggle btn-width-xl" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	              Export <span class="caret"></span>
	            </button>
	            <ul class="dropdown-menu" style="right: 0; left: auto;">
	              <li><a href="/admin/products/export">Export All Products</a></li>
	              <li><a ng-click="exportSelected()">Export Selected Products</a></li>
	              <li><a ng-click="exportCriteria()">Export Search Results</a></li>
	            </ul>
	          </div>
	      </form>
       </nc-page-title>
	    <div class="row search-section-wrapper">
  			<nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="ProductId"></nc-bulk>
      		<nc-search nc-model="params.searchText" nc-search-event="onSearch" nc-search-placeholder="'Search for Product Name or Tag'"></nc-search>
		  	<nc-advance-search-button nc-model="advanceSearch"></nc-advance-search-button>
		</div>
		<nc-advance-search nc-model="advanceSearchParams" nc-advance-search-toggle="advanceSearch" nc-advance-search-event="onAdvanceSearch" nc-advance-search-options="advanceSearchOptions"></nc-advance-search>
		<nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>
		<nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
		    <table class="table table-curved">
		        <thead>
		            <tr class="table-head">
	                  <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
	                  <th class="display-column"></th>
	                  <th nc-sort="ProductNameEn">Product Name</th>
	                  <th>Shop Name</th>
	                  <th class="tag-column">Tag</th>
	                  <th class="price-column" nc-sort="SalePrice">Sale Price</th>
	                  <th><span>Info</span></th>
	                  <th><span>Image</span></th>
	                  <th class="status-column" nc-sort="Status">Status</th>
	                  <th class="live-column">Live</th>
	                  <th class="visible-column">Visible</th>
	                  <th class="modified-column" nc-sort="UpdatedDt">Modified</th>
	                  <th class="action-column">Action</th>
		            </tr>
		        </thead>
		        <tbody>
	              <tr ng-repeat="row in list.data">
	                  <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
	                  <td class="display-column">
	                    <div class="img-holder">
	                      <img ng-if='!row.ImageUrl' class="logo-img" src="<?= $this->asset('/assets/img/placeholder-no-image.png') ?>" />
	                      <img ng-if='row.ImageUrl' class="logo-img" src="{{ row.ImageUrl }}" />
	                    </div>
	                  </td>
	                  <td class="column-text-ellipsis">
	                    <div><a href="/admin/products/{{ row.ProductId }}">{{ row.ProductNameEn || '(Untitled Product)' }}</a></div>
	                    <div class="color-grey" ng-if="row.VariantCount > 0">({{row.VariantCount}} variants)</div>
									 	  <div class="color-grey">{{row.Pid}}</div>
	                  </td>
	                  <td>{{row.Shop.ShopNameEn}}</td>
	                  <td class="column-text-ellipsis">{{getTag(row.Tags)}}</td>
	                  <td class="price-column">
	                    <div>{{ row.SalePrice | currency: ' ' : 2 }}</div>
	                  </td>
	                  <td class="info-column">
	                    <i ng-if="!row.InfoFlag" class="fa fa-minus color-grey icon-size-18px"></i>
	                    <i ng-if="row.InfoFlag" class="fa fa-check color-green icon-size-18px"></i>
	                  </td>
	                  <td class="image-column">
	                    <i ng-if="!row.ImageFlag" class="fa fa-minus color-grey icon-size-18px"></i>
	                    <i ng-if="row.ImageFlag" class="fa fa-check color-green icon-size-18px"></i>
	                  </td>
	                  <td class="status-column">
	                    <span class="{{ asStatus(row.Status).color }}">
	                      <i class="fa {{ asStatus(row.Status).icon }}"></i>
	                      {{ asStatus(row.Status).name }}
	                    </span>
	                  </td>
	                  <td class="live-column">
	                    <i class="fa fa-circle color-grey"></i>
	                  </td>
	                  <td class="visible-column">
	                    <nc-eye nc-model="row.Visibility" nc-eye-on-toggle="toggleEye(row)"></nc-eye>
	                  </td>
	                  <td class="modified-column">{{ row.UpdatedDt | dateTh }}</td>
	                  <td class="action-column">
	                      <nc-action nc-model="row" nc-action-fn="actions"></nc-action>
	                  </td>
	              </tr>
		        </tbody>
		    </table>
		</nc-table>
		<nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
	</div>
<?php $this->stop() ?>
