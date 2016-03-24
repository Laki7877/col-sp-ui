<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminSellerAccountCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Seller Accounts" icon="fa-user">
    </nc-page-title>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="{{id}}"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Seller or Shop Name'"></nc-search>
    </div>
    <nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th class="width_200" nc-sort="Email">Email</th>
            <th nc-sort="NameEn">Name</th>
            <th class="width_200">Shop Owner</th>
            <th nc-sort="Shops">Shop</th>
            <th class="action-column-lg">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td>{{row.Email}}</td>
            <td class="width_200">{{row.NameEn}}</td>
            <td class="width_120">{{getShopOwner(row.UserGroup)}}</td>
            <td><span ng-class="{ 'color-red': row.Shops.length == 0 }">{{ getShop(row.Shops) }}</span></td>
            <td class="action-column-lg"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
