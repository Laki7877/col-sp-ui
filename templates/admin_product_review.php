<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Product Reviews']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminProductReviewCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Product Reviews" icon="fa-tag"></nc-page-title>
    <div class="row search-section-wrapper">
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search by PID or Customer'"></nc-search>
    </div>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="width_100" nc-sort="UpdatedDt">Date</th>
            <th class="width_150">Shop Name</th>
            <th class="width_100" nc-sort="PID">PID</th>
            <th>Product name</th>
            <th>Customer</th>
            <th class="action-column">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td>{{row.UpdatedDt | dateTh}}</td>
            <td>{{row.Shop.ShopNameEn}}</td>
            <td>{{row.Pid}}</td>
            <td class="column-text-ellipsis">{{row.ProductNameEn}}</td>
            <td class="column-text-ellipsis">{{row.Customer.Name}}</td>
            <td><button class="btn btn-white btn-width-xl" ng-click="open(row)">View Detail</button></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
