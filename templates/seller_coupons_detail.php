<?php
$menus = [
  ["id" => "information", "name" => 'Information', "class" => "active"],
  ["id" => "conditions", "name" => 'Conditions'],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'User Profile'])
?>

<?php $this->start('page-body') ?>
  <div>
    <div>
      <?php $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Coupons/Create Coupon", 'border_class' => 'no-padding']) ?>
    </div>

    <div class="add-product-body">
      <?php $this->insert('components/tab-nav', ["items" => $menus]) ?>
      <form class="ah-form sticky-mainform-action">
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
            <?php $this->insert('partials/create_coupon_information') ?>
          </div>
          <div role="tabpanel" class="tab-pane margin-top-20" id="conditions">
            <?php $this->insert('partials/coupon_condition') ?>
          </div>
        </div>
        <div class="add-product-form-action main-form-action full-width-row">
          <div class="container-fluid">
            <div class="float-right">
              <button class="btn btn-white btn-width-xl">Cancel</button>
              <button class="btn btn-blue btn-width-xl">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

<?php $this->stop() ?>