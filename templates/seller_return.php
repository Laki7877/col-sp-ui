<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Renturn Requests']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerReturnRequestCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Return Requests"></nc-page-title>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="{{id}}"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Return ID, Order ID'"></nc-search>
    </div>
    <nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="ModifiedDt">Date</th>
            <th nc-sort="ReturnId">Return ID</th>
            <th nc-sort="OrderId">Order ID</th>
            <th>Customer Name</th>
            <th>Total Price</th>
            <th>Carrier</th>
            <th>Status</th>
            <th>Accept</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td>{{row.ModifiedDt | dateTh}}</td>
            <td>{{row.ReturnId}}</td>
            <td>{{row.OrderId }}</td>            
            <td>{{row.NameEn }}</td>
            <td>{{row.Price | currency: ' ' : 2 }}</td>
            <td>{{row.Carrier}}</td>
            <td><span class="{{row.Status | mapDropdown: statusOptions: 'color'}}">{{row.Status | mapDropdown: statusOptions}}</span></td>
            <td><button ng-disabled="getDisabled(row)" class="btn {{getDisabled(row)}} btn-white btn-width-xl"></button></td>
            <td><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
