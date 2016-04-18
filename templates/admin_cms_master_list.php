<?php 
 $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
<div ng-controller="AdminCMSMasterListCtrl">
  <nc-alert nc-model="alert"></nc-alert>
  <nc-page-title nc-title="CMS Master" icon="fa-tag">
    <form id="exportForm" name="exportForm" action="/cms/master/export" method="post">
      <input type="hidden" name="selected_products[]" ng-repeat="item in bulkContainer" value="{{ item.CMSMasterId }}"/>
      <!--
          <div class="btn-group margin-right-10">
            <button type="button" class="btn btn-white dropdown-toggle btn-width-lg" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Export <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="/cms/master/export">Export All CMS</a></li>
              <li><a ng-click="exportSelected()">Export Selected CMS</a></li>
            </ul>
          </div>
          <div class="btn-group margin-right-10">
            <button type="button" class="btn btn-white dropdown-toggle btn-width-lg" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Import <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="/cms/master/import">Add New CMS</a></li>
              <li><a href="/cms/master/import/update">Update Existing CMS</a></li>
            </ul>
          </div>-->
      <a href="/admin/cms/master/create" class="btn-blue btn btn-width-xl">
        <span class="">Create</span>
      </a>
    </form>
  </nc-page-title>
  <div class="row search-section-wrapper">
    <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="CMSMasterId"></nc-bulk>
    <nc-search nc-model="params.searchText" nc-search-event="onSearch" nc-search-placeholder="'Search for CMS Name'"></nc-search>
    <!--<nc-advance-search-button nc-model="advanceSearch"></nc-advance-search-button>-->
    <!-- <div class="search-section-item pull-right">
        <div class="filter-checkbox">
          <input ng-model="showOnOffStatus.value"type="checkbox" />
          Show Online/Offline Status
        </div>
      </div> -->
  </div>
  <!--<nc-advance-search nc-model="advanceSearchParams" nc-advance-search-toggle="advanceSearch" nc-advance-search-event="onAdvanceSearch" nc-advance-search-options="advanceSearchOptions"></nc-advance-search>-->
  <!--<nc-filter nc-model="params._filter" nc-filter-options="filterOptions">
  </nc-filter>-->
  <nc-table id="inventory-tab-content" nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
    <table class="table table-curved">
      <thead>
        <tr class="table-head">
          <th class="checkbox-column">
            <nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox>
          </th>
          <th nc-sort="CMSMasterNameEN">Master Name(EN)</th>
          <th nc-sort="CMSMasterNameTH">Master Name(TH)</th>
          <th nc-sort="CMSTypeId">Type</th>
          <th nc-sort="Status">Status</th>
          <th>Visible</th>
          <th nc-sort="UpdatedDt">Modified</th>
          <th class="action-column">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="row in list.data">
          <td class="checkbox-column">
            <nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox>
          </td>
          <td class="column-text-ellipsis" nc-link="/admin/cms/master/{{row.CMSMasterId}}">
            {{row.CMSMasterNameEN}}
          </td>
          <td class="column-text-ellipsis" nc-link="/admin/cms/master/{{row.CMSMasterId}}">
            {{row.CMSMasterNameTH}}
          </td>
          <td class="status-column">
            {{row.CMSTypeId}}
          </td>
          <td class="status-column">
              {{row.Status}}
          </td>
          <td class="visible-column">
            <nc-eye nc-model="row.Visibility" nc-eye-on-toggle="toggleEye(row)"></nc-eye>
          </td>
          <td class="modified-column">{{ row.UpdateDate | dateTh }}</td>
          <td class="action-column">
            <nc-action nc-model="row" nc-action-fn="actions"></nc-action>
          </td>
        </tr>
      </tbody>
    </table>
  </nc-table>
  <nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
</div>
<?php $this->stop() ?>
