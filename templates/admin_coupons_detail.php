<?php
$menus = [
  ["id" => "information", "name" => 'Information', "class" => "active"],
  ["id" => "conditions", "name" => 'Conditions'],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'User Profile'])
?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminCouponAddCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
    <nc-alert nc-model="alert"></nc-alert>
    <div ng-show="loading" nc-loading="Loading Coupon.."></div>
    <div ng-show="saving" nc-loading="Saving Coupon.."></div>
    <form class="ah-form sticky-mainform-action" name="form" ng-show="!loading && !saving" novalidate>

    <div>
      <?php $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Coupons/Create Coupon", 'border_class' => 'no-padding']) ?>
    </div>

    <div class="add-product-body">
      <?php $this->insert('components/tab-nav', ["items" => $menus]) ?>

        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-30 active" id="information">
            <?php $this->insert('partials/create_coupon_information') ?>
          </div>
          <div role="tabpanel" class="tab-pane margin-top-30" id="conditions">
            <?php $this->insert('partials/coupon_condition') ?>
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
