<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminShoptypeCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-with-one-button', ['text' => 'Shop Type','button' => 'Add Shop Types', 'button_class' => 'btn-width-xxl', 'link' => '/admin/shoptypes/add']) ?>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="ShopTypeId"></nc-bulk>
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
            <td>{{row.ShopCount}}</td>
            <td><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
            <td>{{row.UpdatedDt | dateTh}}</td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>

<?php $this->stop() ?>
