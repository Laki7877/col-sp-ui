<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Product Review']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="ProductReviewCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-breadcrumb-border', ['text' => 'Product Review']) ?>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="ReviewId"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Review'"></nc-search>
    </div>
    <nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="params.searchText.length > 0" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="UpdatedDt">Date</th>
            <th nc-sort="Rating">Rating</th>
            <th nc-sort="PID">PID</th>
            <th>Comment</th>
            <th>Customer</th>
            <th nc-sort="Status">Status</th>
            <th>Approve</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td>{{row.UpdatedDt || dateTh}}</td>
            <td>{{row.Rating}} / {{maxRating}}</td>
            <td>{{row.PID}}</td>
            <td>{{}}</td>
            <td><a ng-click="open(row)">{{row.Customer}}</a></td>
            <td>{{row.ReviewStatus | mapDropdown:reviewStatus}}</td>
            <td><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>