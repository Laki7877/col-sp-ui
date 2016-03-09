<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'On Boarding'])
?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerOnboardingCtrl">
    <div class="onboarding_wrapper">
      <div class="text-align-center welcome_text_big">Welcome to Central Seller Portal</div>
      <div class="text-align-center welcome_text_small">Complete these tasks to launch your store</div>
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
            "task_display" => "ng-hide='Completed[1]'"]) ?> 

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Add product",
           "field_text" => "Add at least one item to your store",
           "button_text" => "Add Product",
           "image_name" => "icon-onboard-product",
           "task_display" => "ng-hide='Completed[2]'",
           "type" => "redirectProduct"]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Decorate your store",
           "field_text" => "Add at least one banner to make your store unique",
           "button_text" => "Set Appearance",
           "image_name" => "icon-onboard-decorate",
           "task_display" => "ng-hide='Completed[3]'"]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Review & launch your store",
           "field_text" => "Complete the tasks above to launch your store",
           "button_text" => "Launch",
           "image_name" => "icon-onboard-launch",
           "disble_status" => "disabled",
           "type" => "launch"]) ?>

        <div class="complete_line home_task_space" ng-show='checkIfHaveCompleted'>
          <span class="complte_line_text">Completed</span>
        </div>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Change password",
           "field_text" => "In order for you to remember password easier",
           "button_text" => "Change Password",
           "image_name" => "icon-onboard-password",
           "home_task_container_class" => "background_blue",
           "task_display" => "ng-hide='!Completed[0]'",
           "type" => "changePassword"]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Add Description",
           "field_text" => "Tell customers what your shop is about",
           "button_text" => "Check Profile",
           "image_name" => "icon-onboard-setting",
           "home_task_container_class" => "background_blue",
           "task_display" => "ng-hide='!Completed[1]'"]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Add product",
           "field_text" => "Add at least one item to your store",
           "button_text" => "Add Product",
           "image_name" => "icon-onboard-product",
           "home_task_container_class" => "background_blue",
           "task_display" => "ng-hide='!Completed[2]'",
           "type" => "redirectProduct"]) ?>

        <? $this->insert('components/forms/seller_task',
          ["field_header" => "Decorate your store",
           "field_text" => "Add at least one banner to make your store unique",
           "button_text" => "Set Appearance",
           "image_name" => "icon-onboard-decorate",
           "home_task_container_class" => "background_blue",
           "task_display" => "ng-hide='!Completed[3]'"]) ?>
      </div>
    </div>
  </div>

<?php $this->stop() ?>
