<?php
	    $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminProductListCtrl">
       <nc-page-title nc-title="All On Top Credit Card">
            <a ng-href="/admin/ontopcreditcard/create" class="btn margin-right-10 ng-scope btn-white btn-width-xl">
          	  <span class="">Create</span>
          </a>
       </nc-page-title>
	    <div class="row search-section-wrapper">
  			<nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="ProductId"></nc-bulk>
      		<nc-search nc-model="params.searchText" nc-search-event="onSearch" nc-search-placeholder="'Search for Product Name'"></nc-search>
		  	<nc-advance-search-button nc-model="searchAdvance"></nc-advance-search-button>
		</div>
		<nc-advance-search nc-model="params" nc-advance-search-toggle="searchAdvance" nc-advance-search-event="onAdvanceSearch" nc-advance-search-options="advanceSearchOptions"></nc-advance-search>
		<nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter><!-- advance search will appear here -->
		<nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="params.searchText.length > 0">
		    <table class="table table-curved">
		        <thead>
		            <tr class="table-head">
		                <th></th>
		                <th nc-sort="ProductNameEn">Product Name </th>
		                <th nc-sort="Shop">Shop</th>
		                <th nc-sort="OriginalPrice">Original Price</th>
		                <th nc-sort="Status">Status</th>
		                <th>Live</th>
		                <th>Visible</th>
		                <th nc-sort="UpdatedDt" class="modified-column">Modified</th>
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
		                <td class="column-text-ellipsis" nc-link="/admin/products/{{row.ProductId}}">
		                    {{row.ProductNameEn}}
		                </td>
		                <td>{{row.Shop.ShopNameEn}}</td>
		                <td>{{row.OriginalPrice | number: 2 }}</td>
		                <td>
		                    <span class="{{ asStatus(row.Status).color }}">
		                      <i class="fa {{ asStatus(row.Status).icon }}"></i>
		                      {{ asStatus(row.Status).name }}
		                    </span>
		                </td>
		                <td><i class="fa fa-circle color-grey"></i></td>
		                <td>
		                    <nc-eye nc-model="row.Visibility" nc-eye-on-toggle="toggleEye(row)"></nc-eye>
		                </td>
		                <td>{{row.UpdatedDt | dateTh}}</td>
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
