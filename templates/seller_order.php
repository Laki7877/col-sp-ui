<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Orders']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerOrderCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Orders" icon="fa-inbox">
    </nc-page-title>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="{{id}}"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Order ID or Customer Name'"></nc-search>
    </div>
    <nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="OrderDate">Date</th>
            <th nc-sort="OrderId">Order ID</th>
            <th nc-sort="CustomerName">Customer Name</th>
            <th nc-sort="ShippingType">Shipping Type</th>
            <th nc-sort="Carrier">Carrier</th>
            <th nc-sort="Payment">Payment</th>
            <th class="price-column">Total Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td class="width_120">{{row.OrderDate | dateTh}}</td>
            <td class="width_100" nc-link="{{url}}/{{row.OrderId}}">{{row.OrderId}}</td>
            <td class="column-text-ellipsis">{{row.CustomerName}}</td>
            <td class="width_120">{{ row.ShippingType }}</td>
            <td class="width_100">{{ row.Carrier}}</td>
            <td class="width_100">{{ row.Payment}}</td>
            <td class="price-column">{{ row.TotalAmt | currency: ' ': 2 }}</td>
            <td class="width_200">{{ row.Status }}</td>
            <td class="width_100">
              <button ng-disabled="$root.permit(31) && getButtonState(row).disabled" class="btn btn-white btn-width-xl margin-right-15" ng-click="onButtonClick(row)">{{getButtonState(row).text}}</button>
            </td>   
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
