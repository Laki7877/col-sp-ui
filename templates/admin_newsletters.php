<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminNewsletterCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Newsletters" icon="fa-sliders">
      <button type="button" class="btn btn-blue btn-width-xxl" ng-click="open()">Add Newsletter</button>
    </nc-page-title>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th nc-sort="PublishedDt">Published Date</th>
            <th nc-sort="Subject">Subject</th>
            <th class="text-align-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="date-column">{{ row.PublishedDt | datetimeTh }}</td>
            <td><a ng-click="open(row)">{{ row.Subject }}</a></td>
            <td class="action-column text-align-center"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
  <? $this->insert('components/modal_admin_newsletter_detail', ['id' => 'image-guideline', 'header' => 'Add Newsletter']) ?>

<?php $this->stop() ?>
