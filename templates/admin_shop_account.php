<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminShopCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Shop Accounts" icon="fa-user">
      <a class="btn btn-blue btn-width-xxl" ng-href="{{url}}/add">Add {{item}}</a>
    </nc-page-title>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="{{id}}"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Shop Name, ID, and Type'"></nc-search>
    </div>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="ShopId">Shop ID</th>
            <th nc-sort="ShopNameEn">Shop Name</th>
            <th nc-sort="ShopType.ShopTypeNameEn">Shop Type</th>
            <th class="status-column">Status</th>
            <th class="modified-column" nc-sort="UpdatedDt">Modified</th>
            <th class="action-column-lg">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td class="column-text-ellipsis width_100">{{row.ShopId }}</td>
            <td nc-link="/admin/shops/{{row.ShopId}}">{{row.ShopNameEn }}</td>
            <td class="width_200">{{row.ShopType.ShopTypeNameEn }}</td>
            <td class="width_100">{{row.Status | mapDropdown:statusDropdown }}</td>
            <td class="modified-column">{{row.UpdatedDt | dateTh }}</td>
            <td class="action-column-lg"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>

<?php $this->stop() ?>
