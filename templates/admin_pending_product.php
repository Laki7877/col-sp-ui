<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Pending Products']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminPendingProductCtrl">
    <nc-page-title nc-title="Pending Products">
      <a class="btn btn-blue btn-width-xxl" ng-href="{{url}}/add">Create Group Variant</a>
    </nc-page-title>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="{{id}}"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Product Name'"></nc-search>
      <nc-advance-search-button nc-model="advanceSearch"></nc-advance-search-button>
    </div>
    <nc-advance-search nc-model="advanceSearchParams" nc-advance-search-toggle="advanceSearch" nc-advance-search-event="onAdvanceSearch" nc-advance-search-options="advanceSearchOptions"></nc-advance-search>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="ProductNameEn">Product Name</th>
            <th nc-sort="Pid">PID</th>
            <th nc-sort="Sku">SKU</th>
            <th nc-sort="Shop">Shop</th>
            <th nc-sort="SalePrice">Price</th>
            <th nc-sort="UpdatedDt">Modified</th>
        </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td>{{ row.ProductNameEn}}</td>
            <td>{{ row.Pid }}</td>
            <td>{{ row.Sku }}</td>
            <td>{{ row.Shop.ShopNameEn }}</td>
            <td>{{ row.SalePrice }}</td>
            <td class="modified-column">{{row.UpdatedDt | dateTh}}</td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
