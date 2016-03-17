r<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminMasterProductCtrl">
    <nc-page-title nc-title="Master Products">
      <a class="btn btn-blue btn-width-xl" ng-href="{{url}}/add">Add {{item}}</a>
    </nc-page-title>
    <div class="row search-section-wrapper">
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Master Product Name'"></nc-search>
    </div>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th nc-sort="Pid">PID</th>
            <th nc-sort="ProductNameEn">Product Name</th>
            <th>Child Products (PID)</th>
            <th nc-sort="UpdatedDt">Modified</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="width_100">{{row.Pid}}</td>
            <td class="column-text-ellipsis">
              <div><a href="{{url}}/{{ row.ProductId }}">{{ row.ProductNameEn || '(Untitled Product)' }}</a></div>
              <div ng-if="row.VariantCount > 0">({{row.VariantCount}} variants)</div>
            </td>
            <td>{{ getChildProducts(row.ChildProducts) }}</td>
            <td class="width_100"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
            <td class="width_100">{{row.UpdatedDt | dateTh}}</td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
