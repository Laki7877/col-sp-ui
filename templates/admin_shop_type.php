<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminShoptypeCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Shop Type">
      <a class="btn btn-blue btn-width-xl" ng-href="{{url}}/add">Add {{item}}</a>
    </nc-page-title>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="{{id}}"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Shop Type'"></nc-search>
    </div>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="ShopTypeNameEn">Shop Type</th>
            <th># of Shops</th>
            <th>Action</th>
            <th nc-sort="UpdatedDt">Modified</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td nc-link="/admin/shoptypes/{{row.ShopTypeId}}">{{row.ShopTypeNameEn}}</td>
            <td class="width_200">{{row.ShopCount}}</td>
            <td class="width_100"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
            <td class="width_100">{{row.UpdatedDt | dateTh}}</td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>

<?php $this->stop() ?>
