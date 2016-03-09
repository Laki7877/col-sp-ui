<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminNewsletterCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Newsletters">
      <button type="button" class="btn btn-blue btn-width-xl" ng-click="open()">Add Newsletter</button>
    </nc-page-title>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th nc-sort="CreatedDt">Date</th>
            <th nc-sort="Subject">Subject</th>
            <th class="text-align-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="modified-column">{{ row.CreatedDt | dateTh }}</td>
            <td><a ng-click="open(row)">{{ row.Subject }}</a></td>
            <td class="action-column text-align-center"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>

<!--   <a data-toggle="modal" data-target="#modal-loading">Loading Modal</a>
 -->
    <!-- Modal -->
  <div class="modal fade" tabindex="-1" role="dialog" id="modal-loading">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h3 class="modal-title margin-bottom-20">Processing...</h3>
          <div class="progress margin-0">
            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
            </div>
          </div>
        </div> <!-- end .modal-body -->
      </div> <!-- end .modal-content -->
    </div> <!-- end .modal-dialog -->
  </div> <!-- end .modal -->

  <? $this->insert('components/modal_admin_newsletter_detail', ['id' => 'image-guideline', 'header' => 'Add Newsletter']) ?>
 
<?php $this->stop() ?>