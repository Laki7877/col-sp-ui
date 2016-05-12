<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'On Boarding'])
?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerOnboardingCtrl">
    <div class="onboarding_wrapper">
      <div class="text-align-center welcome_text_big">Welcome to Central Seller Portal</div>
      <div class="text-align-center welcome_text_small" ng-show="ShopInActiveStatus">Complete these tasks to launch your store</div>
      <div class="text-align-center welcome_text_small" ng-show="!ShopInActiveStatus">Your store is live and ready for business!</div>
    </div>
    <div>
      <div class="onboarding_content">
        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Change password",
           "field_text" => "In order for you to remember password easier",
           "button_text" => "Change Password",
           "image_name" => "icon-onboard-password",
           "task_display" => "ng-hide='Completed[0]'",
           "type" => "changePassword"]) ?>

         <? $this->insert('components/forms/seller_task',
           ["field_header" => "Add shop description",
            "field_text" => "Tell customers what your shop is about",
            "button_text" => "Add Description",
            "image_name" => "icon-onboard-setting",
            "task_display" => "ng-hide='Completed[1]'",
            "type" => "redirectShopSetting"]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "{{productFieldContent.title}}",
           "field_text" => "{{productFieldContent.subTitle}}",
           "button_text" => "{{productFieldContent.button}}",
           "image_name" => "icon-onboard-product",
           "task_display" => "ng-hide='Completed[2]'",
           "type" => "redirectProduct"]) ?>

        <!-- NOTED! : this component is hidden -->
        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Decorate your store",
           "field_text" => "Add at least one banner to make your store unique",
           "button_text" => "Set Appearance",
           "image_name" => "icon-onboard-decorate",
           "task_display" => "ng-hide='Completed[3]'",
           "type" => "redirectShopAppearance",
           "home_task_container_class" => "hide-component"]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Review & launch your store",
           "field_text" => "{{launchTextSubtitle}}",
           "button_text" => "Launch",
           "image_name" => "icon-onboard-launch",
           "disble_status" => "disabled",
           "task_display" => "ng-show='ShopInActiveStatus'",
           "type" => "launch"]) ?>

        <div class="complete_line home_task_space" ng-show="ShopInActiveStatus">
          <!-- ng-show='checkIfHaveCompleted' -->
          <span class="complte_line_text">Completed</span>
        </div>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Successfully, launch your store",
           "field_text" => "Now everyone can visit your store online",
           "button_text" => "View Storefront",
           "image_name" => "icon-onboard-launch",
           "home_task_container_class" => "background_blue",
           "disble_status" => "disabled",
           "task_display" => "ng-show='!ShopInActiveStatus'",
           "type" => "redirectStore"]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Successfully, set up your account",
           "field_text" => "We have set up the account for you",
           "button_text" => "View Account",
           "image_name" => "icon-onboard-account",
           "home_task_container_class" => "background_blue",
           "type" => "redirectUserAccounts"]) ?>


        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Successfully, change password",
           "field_text" => "In order for you to remember password easier",
           "button_text" => "Change Password",
           "image_name" => "icon-onboard-password",
           "home_task_container_class" => "background_blue",
           "task_display" => "ng-hide='!Completed[0]'",
           "type" => "changePassword"]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Successfully, add Description",
           "field_text" => "Tell customers what your shop is about",
           "button_text" => "View Profile",
           "image_name" => "icon-onboard-setting",
           "home_task_container_class" => "background_blue",
           "task_display" => "ng-hide='!Completed[1]'",
           "type" => "redirectShopSetting"]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "{{productFieldContent.title}}",
           "field_text" => "{{productFieldContent.subTitle}}",
           "button_text" => "{{productFieldContent.button}}",
           "image_name" => "icon-onboard-product",
           "home_task_container_class" => "background_blue",
           "task_display" => "ng-hide='!Completed[2]'",
           "type" => "redirectProduct"]) ?>

        <!-- NOTED! : this component is hidden -->
        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Successfully, decorate your store",
           "field_text" => "Add at least one banner to make your store unique",
           "button_text" => "Set Appearance",
           "image_name" => "icon-onboard-decorate",
           "home_task_container_class" => "background_blue",
           "task_display" => "ng-hide='!Completed[3]'",
           "type" => "redirectShopAppearance",
           "home_task_container_class" => "hide-component"]) ?>

      </div>
    </div>
  </div>

<?php $this->stop() ?>
