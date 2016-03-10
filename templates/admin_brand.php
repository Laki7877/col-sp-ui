<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Brands']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminBrandCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-with-one-button', ['text' => 'Brands','button' => 'Add Brand', 'button_class' => 'btn-width-xxl', 'link' => '/admin/brands/add']) ?>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="BrandId"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Brand Name'"></nc-search>
    </div>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="BrandId">Brand ID</th>
            <th nc-sort="BrandNameEn">Brand Name</th>
            <th nc-sort="UpdatedDt">Modified</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td class="width_100" nc-link="/admin/brands/{{row.BrandId}}">{{row.BrandId}}</td>
            <td nc-link="/admin/brands/{{row.BrandId}}">{{ row.BrandNameEn }}</td>
            <td class="width_100">{{row.UpdatedDt | dateTh}}</td>
            <td class="width_100"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
