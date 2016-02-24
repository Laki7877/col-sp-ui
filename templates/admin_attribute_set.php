<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute Set']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminAttributeSetCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-with-one-button', ['text' => 'Attribute Sets','button' => 'Add Attribute Set', 'button_class' => 'btn-width-xxl', 'link' => '/admin/attributesets/add']) ?>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="AttributeSetId"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Attribute Set Name'"></nc-search>
    </div>
    <!--nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter-->
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="AttributeSetNameEn">Attribute Set Name</th>
            <th nc-sort="AttributeCount">Attribute In Set</th>
            <th nc-sort="CategoryCount">Mapped Categories</th>
            <th nc-sort="UpdatedDt" class="modified-column">Modified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td class="column-text-ellipsis" nc-link="/admin/attributesets/{{row.AttributeSetId}}">
              {{row.AttributeSetNameEn}}
            </td>
            <td class="width_200">{{row.AttributeCount }}</td>
            <td class="width_200" nc-link="/admin/attributesets/{{row.AttributeSetId}}">{{row.CategoryCount }}</td>
            <td class="width_100">{{row.UpdatedDt | dateTh}}</td>
            <td class="width_100"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
