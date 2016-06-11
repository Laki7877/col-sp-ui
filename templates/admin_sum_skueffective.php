<?php
	$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminSumSKUEffectiveCtrl">
		<nc-page-title nc-title="SKU - Effective Summary" icon="fa-user">
	    <form id="exportForm" name="exportForm" action="/admin/sku/export" method="post">
	          <div class="btn-group">
	            <button type="button" class="btn btn-white btn-width-xl">
	              Export </span>
	            </button>
	          </div>
	      </form>
	  </nc-page-title>
	  <nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>
		
		<nc-table id="report-sum-tab-content" nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
    <table class="table table-curved">
      <thead>
        <tr class="table-head">
          <!-- <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th> -->
          <th nc-sort="Category">Category</th>
          <th nc-sort="Seller">Seller</th>
          <th nc-sort="Approved">Approved</th>
          <th nc-sort="NotApproved">Not Approved</th>
          <th nc-sort="WaitForApproved">Wait For Approved</th>
          <th nc-sort="Draft">Draft</th>
          <th nc-sort="Total">Total</th>
          <!-- <th class="action-column-lg">Action</th> -->
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="row in list.data" ng-show="list.data.length > '0'">
          <!-- <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td> -->
          <td class="width_100">{{row.Category}}</td>
          <td class="width_100">{{row.Seller}}</td>
          <td class="width_100">{{row.Approved}}</td>
          <td class="width_100">{{row.NotApproved}}</td>
          <td class="width_100">{{row.WaitForApproved}}</td>
          <td class="width_100">{{row.Draft}}</td>
          <td class="width_100">{{row.Total}}</td>
          <!-- <td class="action-column-lg"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td> -->
        </tr>
      </tbody>
    </table>
  </nc-table>
  <nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>

	</div>
<?php $this->stop() ?>