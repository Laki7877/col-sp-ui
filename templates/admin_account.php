<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminAccountCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-with-one-button', ['text' => 'Admin Accounts','button' => 'Add Admin Account', 'button_class' => 'btn-width-xxl', 'link' => '/admin/accounts/add']) ?>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="UserId"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Admin Name and Email'"></nc-search>
    </div>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="NameEn">Admin Name</th>
            <th nc-sort="Email">Email</th>
            <th nc-sort="UserGroup">Role</th>
            <th>Action</th>
            <th nc-sort="UpdatedDt">Modified</th>
        </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td nc-link="/admin/accounts/{{row.UserId}}">{{row.NameEn}}</td>
            <td class="width_200">{{row.Email}}</td>
            <td class="width_200">{{row.UserGroup[0]}}</td>
            <td class="width_100"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
            <td class="width_100">{{row.UpdatedDt | dateTh}}</td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
