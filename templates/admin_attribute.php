<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminAttributeCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-with-one-button', ['text' => 'Attribute','button' => 'Add Attribute', 'button_class' => 'btn-width-xxxl', 'link' => '/admin/attributes/add']) ?>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="AttributeId"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Attribute Name'"></nc-search>
    </div>
    <nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="AttributeNameEn">Attribute Name</th>
            <th nc-sort="DisplayNameEn">Display Name</th>
            <th>Field Type</th>
            <th>Variation</th>
            <th>Mapped Set</th>
            <th nc-sort="UpdatedDt" class="modified-column">Modified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td class="column-text-ellipsis" nc-link="/admin/attributes/{{row.AttributeId}}">
              {{row.AttributeNameEn}}
            </td>
            <td>{{row.DisplayNameEn}}</td>
            <td>{{row.DataType | mapDropdown:dataTypeDropdown }}</td>
            <td>{{row.VariantStatus | mapDropdown:yesNoDropdown }}</td>
            <td>{{row.AttributeSetCount}}</td>
            <td>{{row.UpdatedDt | dateTh}}</td>
            <td><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?> 