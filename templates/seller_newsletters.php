<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Newsletters']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerNewsletterCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Newsletters" icon="fa-home"></nc-page-title>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th nc-sort="PublishedDt">Date</th>
            <th nc-sort="Subject">Subject</th>
            <th class="text-align-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="modified-column">{{ row.PublishedDt | dateTh }}</td>
            <td><a ng-click="open(row)">{{ row.Subject }}</a></td>
            <td class="width_100 text-align-center"><button class="btn btn-white btn-width-default" ng-click="open(row)">Read</button></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
