<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Orders']) ?>

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
            <th>Total Price</th>
            <th>Carrier</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td class="modified_column">{{row.OrderDate | dateTh}}</td>
            <td class="modified_column" nc-link="{{url}}/{{row.OrderId}}">{{row.OrderId}}</td>
            <td class="column-text-ellipsis">{{row.CustomerName}}</td>
            <td class="width_100">{{ row.TotalAmt | currency: ' ': 2 }}</td>
            <td class="width_100">{{ row.ShippingType }}</td>
            <td class="width_200">
              <span class="{{row.Status | mapDropdown: status:'color'}}">
                <i class="fa {{row.Status | mapDropdown: status:'icon'}}"></i>
                {{ row.Status | mapDropdown: status }}
              </span>
            </td>

            <td class="width_200">
              <button ng-disabled="getButtonState(row).disabled" class="btn btn-white btn-width-xl margin-right-15" ng-click="onButtonClick(row)">{{getButtonState(row).text}}</button>
              <nc-action nc-model="row" nc-action-fn="actions"></nc-action>
            </td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
    <div class="add-product-body">
      <form class="ah-form sticky-mainform-action">
        <div class="add-product-form-action main-form-action full-width-row">
          <div class="container-fluid">
            <span class="float-left"><p class="color-red">Debug Mode</p></span>
            <span class="float-right">
              <input class="form-control" placeholder="Order ID" ng-model="debug.id" />
              <ui-select ng-model="debug.status" search-enabled="false">
                <ui-select-match>{{$select.selected.name}}</ui-select-match>
                <ui-select-choices repeat="i.value as i in status">{{i.name}}</ui-select-choices>
              </ui-select>
              <button class="btn btn-blue btn-width-xl float-right" ng-click="debug.change()">Change</button>
            </span> 
          </div>
        </div>
      </form>
    </div>
  </div>
<?php $this->stop() ?>
