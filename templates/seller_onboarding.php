<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'On Boarding'])
?>

<?php $this->start('page-body') ?>
  <div class="onboarding_wrapper">
    <div class="text-align-center welcome_text_big">Welcome to Central Seller Portal</div>
    <div class="text-align-center welcome_text_small">Complete these task to launch your store</div>
  </div>

  <div> 
    <div class="onboarding_content">
      <? $this->insert('components/forms/seller_task', 
        ["field_header" => "Change password", 
         "field_text" => "In order for you to remember password easier",
         "button_text" => "Change Password",
         "image_name" => "icon-onboard-password"]) ?>

      <? $this->insert('components/forms/seller_task', 
        ["field_header" => "Add product", 
         "field_text" => "Add at least one item to your store",
         "button_text" => "Add Product",
         "image_name" => "icon-onboard-product"]) ?>

      <? $this->insert('components/forms/seller_task', 
        ["field_header" => "Decorate your store", 
         "field_text" => "Add banner and select theme",
         "button_text" => "Set Appearance",
         "image_name" => "icon-onboard-decorate"]) ?>

      <? $this->insert('components/forms/seller_task', 
        ["field_header" => "Review & launch your store", 
         "field_text" => "Time to go live!",
         "button_text" => "Launch",
         "image_name" => "icon-onboard-launch",
         "disble_status" => "disabled"]) ?>

      <div class="complete_line home_task_space">
        <span class="complte_line_text">Completed</span>
      </div>

      <? $this->insert('components/forms/seller_task', 
        ["field_header" => "Set up your shop account", 
         "field_text" => "We have set up your account.",
         "button_text" => "View Profile",
         "image_name" => "icon-onboard-setting",
         "home_task_container_class" => "background_blue"]) ?>
                   
    </div>

  </div>

<?php $this->stop() ?>