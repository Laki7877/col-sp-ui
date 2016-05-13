<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attributes']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminAttributeCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Attributes" icon="fa-tag">
      <a class="btn btn-blue btn-width-xxl" ng-href="{{url}}/add">Add {{item}}</a>
    </nc-page-title>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="{{id}}"></nc-bulk>
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
            <th>Default</th>
            <th>Variation</th>
            <th>Mapped Set</th>
            <th nc-sort="UpdatedDt" class="modified-column">Modified</th>
            <th class="action-column-lg">Action</th>
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
            <td class="width_100">{{row.DefaultAttribute | mapDropdown:yesNoDropdown }}</td>
            <td class="width_100">{{row.VariantStatus | mapDropdown:yesNoDropdown }}</td>
            <td class="width_100">{{row.AttributeSetCount}}</td>
            <td class="modified-column">{{row.UpdatedDt | dateTh}}</td>
            <td class="action-column-lg"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
