<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Return Requests']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerReturnRequestCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Return Requests" icon="fa-inbox"></nc-page-title>
    <div class="row search-section-wrapper">
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Return ID, Order ID'"></nc-search>
    </div>
    <nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
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
            <td>{{row.ReturnDate | dateTh}}</td>
            <td nc-link="{{url}}/{{row.ReturnId}}">{{row.ReturnId}}</td>
            <td>{{row.Order.OrderId }}</td>
            <td>{{row.Order.CustomerName }}</td>
            <td>{{row.Order.GrandTotalAmt | currency: ' ' : 2 }}</td>
            <td>{{row.Order.ShippingType}}</td>
            <td><span class="{{row.Status | mapDropdown: status: 'color'}}">{{row.Status | mapDropdown: status}}</span></td>
            <td><button ng-click="accept(row)" ng-disabled="getDisabled(row)" class="btn {{getDisabled(row)}} btn-white btn-width-xl">Accept</button></td>
            <td><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
