<?php
$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin Homepage'])
?>

<?php $this->start('page-body') ?>
  <!-- <div ng-controller="SellerOnboardingCtrl"> -->
  <div>
    <div class="onboarding_wrapper">
      <div class="text-align-center welcome_text_big">Administration System's Homepage</div>
      <div class="text-align-center welcome_text_small">Highlight Features</div>
    </div>
    <div>
      <div class="onboarding_content">
        <? $this->insert('components/forms/seller_task',
          ["field_header" => "View All Products",
           "field_text" => "This feature is only accessible if you have the permission.",
           "button_text" => "View Feature",
           "image_name" => "icon-onboard-product",
           "disble_status" => "href='/admin/products'",
           "type" => ""]) ?>

         <? $this->insert('components/forms/seller_task',
           ["field_header" => "View All Brands",
            "field_text" => "This feature is only accessible if you have the permission.",
            "button_text" => "View Feature",
            "image_name" => "icon-onboard-decorate",
            "disble_status" => "href='/admin/brands'",
            "type" => ""]) ?>

         <? $this->insert('components/forms/seller_task',
           ["field_header" => "View All Global Categories",
            "field_text" => "This feature is only accessible if you have the permission.",
            "button_text" => "View Feature",
            "image_name" => "icon-onboard-category",
            "disble_status" => "href='/admin/brands'",
            "type" => ""]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "View All Shop Accounts",
           "field_text" => "This feature is only accessible if you have the permission.",
           "button_text" => "View Feature",
           "image_name" => "icon-onboard-account",
           "disble_status" => "href='/admin/shops'",
           "type" => ""]) ?>

         <? $this->insert('components/forms/seller_task',
           ["field_header" => "View All Global Coupons",
            "field_text" => "This feature is only accessible if you have the permission.",
            "button_text" => "View Feature",
            "image_name" => "icon-dashboard-promotion",
            "disble_status" => "href='/admin/coupons/global'",
            "type" => ""]) ?>

    </div>
  </div>

<?php $this->stop() ?>
