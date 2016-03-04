<?php
$menus = [
  ["id" => "information", "name" => 'Information', "class" => "active"],
  ["id" => "collection", "name" => 'Collection'],
];

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminCMSCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
    <nc-alert nc-model="alert"></nc-alert>
    <div ng-show="loading" nc-loading="Loading Coupon.."></div>
    <div ng-show="saving" nc-loading="Saving Coupon.."></div>
    <form class="ah-form sticky-mainform-action" name="form" ng-show="!loading && !saving" novalidate>

    <div>
      <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "CMS/Collection/Create", 'border_class' => 'no-padding']) ?>
    </div>

    <div class="add-product-body">
      <? $this->insert('components/tab-nav', ["items" => $menus]) ?> 

        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-30 active" id="information">
            <? $this->insert('partials/add-product-collection-information') ?>
          </div>
          <div role="tabpanel" class="tab-pane margin-top-30" id="collection">

            <div class="row">
              <div class="col-xs-12">
                  <button class="btn btn-info" ng-click="addNewGroup()">
                    Add Group
                  </button>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-xs-12">
              <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions">
                <table class="table table-curved">
                      <thead>
                        <tr class="table-head">
                          <th></th>
                          <th>Group Name</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr ng-repeat="item in groupItemList">
                          <td>{{$index + 1}}</td>
                          <td>{{item.GroupName}}</td>
                          <td>{{item.GroupTotal}}</td>
                          <td>
                            <nc-action nc-model="item" nc-action-fn="actions"></nc-action>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </nc-table>
              </div>
            </div>

          </div>
        </div>
        <div class="add-product-form-action main-form-action full-width-row">
          <div class="container-fluid">
            <div class="float-right">
              <button class="btn btn-white btn-width-xl">Cancel</button>
              <button class="btn btn-blue btn-width-xl" ng-click="preview()">Save</button>
            </div>
          </div>
        </div>

    </div>
    </form>
  </div>

<?php $this->stop() ?>
