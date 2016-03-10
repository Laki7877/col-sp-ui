<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminShopCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <?php $this->insert('components/page-title-with-one-button', ['text' => 'Shop Accounts','button' => 'Add Shop Account', 'button_class' => 'btn-width-xxl', 'link' => '/admin/shops/add']) ?>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="ShopId"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Shop Name, ID, and Type'"></nc-search>
    </div>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="ShopId">Shop ID</th>
            <th nc-sort="ShopNameEn">Shop Name</th>
            <th nc-sort="ShopType">Shop Type</th>
            <th>Status</th>
            <th>Action</th>
            <th nc-sort="UpdatedDt">Modified</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td class="column-text-ellipsis width_100">{{row.ShopId | leadingzero:2 }}</td>
            <td nc-link="/admin/shops/{{row.ShopId}}">{{row.ShopNameEn }}</td>
            <td class="width_200">{{row.ShopType.ShopTypeNameEn }}</td>
            <td class="width_100">{{row.Status | mapDropdown:statusDropdown }}</td>
            <td class="width_100"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
            <td class="width_100">{{row.UpdatedDt | dateTh }}</td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>

<?php $this->stop() ?>
