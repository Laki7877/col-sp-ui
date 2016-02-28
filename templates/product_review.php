<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Product Review']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="ProductReviewCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-breadcrumb-border', ['text' => 'Product Review']) ?>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="ProductReviewId"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for PID or Customer'"></nc-search>
    </div>
    <nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th class="width_100" nc-sort="UpdatedDt">Date</th>
            <th class="width_100" nc-sort="Rating">Rating</th>
            <th class="width_100" nc-sort="PID">PID</th>
            <th class="width_150" nc-sort="Customer">Customer</th>
            <th>Comment</th>
            <th class="width_120" nc-sort="Status">Status</th>
            <th class="width_150">Approve</th>
            <th class="action-column">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td>{{row.UpdatedDt | dateTh}}</td>
            <td>{{row.Rating}} / {{maxRating}}</td>
            <td>{{row.Pid}}</td>
            <td class="width_150 column-text-ellipsis">{{row.Customer}}</td>
            <td class="column-text-ellipsis"><a ng-click="open(row)">{{row.Comment}}</a></td>
            <td class="{{row.Status | mapDropdown:reviewStatus:'color'}} width_120">{{row.Status | mapDropdown:reviewStatus}}</td>
            <td><button class="btn btn-white btn-width-xl" ng-click="approve(row)">{{row.Status | mapDropdown:reviewButton}}</button></td>
            <td><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>