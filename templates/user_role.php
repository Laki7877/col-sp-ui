<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Account']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerRoleCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-with-one-button', ['text' => 'User Roles','button' => 'Add Role', 'button_class' => 'btn-width-xxxl', 'link' => '/roles/add']) ?>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="UserId"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Roles'"></nc-search>
    </div>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="GroupNameEn">Role Name</th>
            <th># of Users</th>
            <th>Action</th>
            <th nc-sort="UpdatedDt">Modified</th>
        </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td nc-link="/roles/{{row.GroupId}}">{{row.GroupNameEn}}</td>
            <td>{{row.UserCount}}</td>
            <td><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
            <td>{{row.UpdatedDt | dateTh}}</td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>

<?php $this->stop() ?>
