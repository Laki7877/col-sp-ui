<?php
$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Onboarding'])
?>

<?php $this->start('page-body') ?>
  <!-- <div ng-controller="SellerOnboardingCtrl"> -->
  <div>
    <div class="onboarding_wrapper onboarding_admin">
      <div class="text-align-center welcome_text_big">Administration System's Homepage</div>
    </div>
    <div>
      <div class="onboarding_content">
        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Manage All Products",
           "field_text" => "This feature is only accessible if you have the permission.",
           "button_text" => "View Products",
           "image_name" => "icon-onboard-product",
           "disble_status" => "href='/admin/products'",
           "type" => ""]) ?>

         <? $this->insert('components/forms/seller_task',
           ["field_header" => "Manage Brands",
            "field_text" => "This feature is only accessible if you have the permission.",
            "button_text" => "View Brands",
            "image_name" => "icon-onboard-decorate",
            "disble_status" => "href='/admin/brands'",
            "type" => ""]) ?>

         <? $this->insert('components/forms/seller_task',
           ["field_header" => "Manage Global Categories",
            "field_text" => "This feature is only accessible if you have the permission.",
            "button_text" => "View Categories",
            "image_name" => "icon-onboard-category",
            "disble_status" => "href='/admin/categories'",
            "type" => ""]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Manage Shop Accounts",
           "field_text" => "This feature is only accessible if you have the permission.",
           "button_text" => "View Shops",
           "image_name" => "icon-onboard-account",
           "disble_status" => "href='/admin/shops'",
           "type" => ""]) ?>

         <? $this->insert('components/forms/seller_task',
           ["field_header" => "Manage Global Coupons",
            "field_text" => "This feature is only accessible if you have the permission.",
            "button_text" => "View Coupons",
            "image_name" => "icon-dashboard-promotion",
            "disble_status" => "href='/admin/coupons/global'",
            "type" => ""]) ?>

    </div>
  </div>

<?php $this->stop() ?>
