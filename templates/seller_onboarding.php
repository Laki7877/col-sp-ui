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
      <div class="home_task">
        <div class="image-thumbs-img-wrapper">
            <img class="logo-imgx" src="<?= $this->asset('/assets/img/icon-onboard-password.png') ?>" />
        </div>
        <div class="home_task_text">
          <div class="font-size-18">Change password</div>
          <div class="color-dark-grey">In order for you to remember password easier</div>
        </div>
        <div class="home_task_button">
          <div>
            <button class="btn btn-white btn-width-xxl" type="button">Change Password</button>
          </div>
        </div>
      </div>
      <div class="home_task">
        <div class="image-thumbs-img-wrapper">
            <img class="logo-imgx" src="<?= $this->asset('/assets/img/icon-onboard-password.png') ?>" />
        </div>
        <div class="home_task_text">
          <div class="font-size-18">Change password</div>
          <div class="color-dark-grey">In order for you to remember password easier</div>
        </div>
        <div class="home_task_button">
          <div>
            <button class="btn btn-white btn-width-xxl" type="button">Change Password</button>
          </div>
        </div>
      </div>
    </div>
    <? $this->insert('components/page-title-with-buttons', ['text' => "Coupons" , 
      'buttons' => [
          ['link' => '?p=seller_coupons_detail', 'class' => 'btn-blue btn-width-xl', 'name' => 'Create Coupon']
        ]
    ]) ?>
    <div class="row search-section-wrapper">
      <div class="search-section section-search">
        <div class="input-group">
          <input type="text" class="form-control input-search-icon search-box" placeholder="Search for Coupon Code" aria-describedby="basic-addon2">
          <span class="input-group-btn">
            <button class="btn btn-white" type="button">Search</button>
          </span>
        </div>
      </div>
    </div>
    <div class="table-section">
      <table class="table table-curved table-border-none">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input"> 
            </th>
            <th class="width_120">
              <a class="header-link" href="#"><span>Coupon Code</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th>
              <a class="header-link" href="#"><span>Coupon Name</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th class="text-center width_number">
              <a class="header-link" href="#"><span>Remaining</span></a>
            </th>
            <th class="text-center width_date">
              <a class="header-link" href="#"><span>Start Date</span></a>
            </th>
            <th class="text-center width_date">
              <a class="header-link" href="#"><span>Expire Date</span></a>
            </th>
            <th class="text-center width_120">
              <a class="header-link" href="#"><span>Status</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
           
            <td>
              <a href="?p=seller_coupons_detail">SHOE10OFF</a> 
            </td>
            <td class="column-text-ellipsis">
              10 off on shoe category (only first 10 customer) fsdfdsfsdfsdfsd
            </td>
            <td class="text-center">
              10/100
            </td>
            <td class="text-center">
              01/07/2016 12:01 AM
            </td>
            <td class="text-center">
              08/07/2016 11:59 PM
            </td>
            <td class="text-center">
              Active
            </td>
            <td class="action-column popover-gear">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<div>View / Edit</div> <div>Delete</div>" data-original-title="" title=""></i>
            </td>
          </tr>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
           
            <td>
              <a href="?p=seller_coupons_detail">SPLC15OFF</a> 
            </td>
            <td class="column-text-ellipsis">
              10 off on shoe category (only first 10 customer) fsdfdsfsdfsdfsd
            </td>
            <td class="text-center">
              10/100
            </td>
            <td class="text-center">
              01/07/2016 12:01 AM
            </td>
            <td class="text-center">
              08/07/2016 11:59 PM
            </td>
            <td class="text-center">
              Inactive
            </td>
            <td class="action-column popover-gear">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<div>View / Edit</div> <div>Delete</div>" data-original-title="" title=""></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="page-navigation">
      <span>
        <i class="fa fa-chevron-left grey-chevron"></i>
        <span> Page 1 of 1</span>
        <i class="fa fa-chevron-right padding-right-15 blue-chevron"></i>
        <span class="view-page-separator">View per page</span>
        <!-- Split button -->
        <div class="btn-group dropdown-btn">
          <button type="button" class="btn btn-default dropdown-text">20</button>
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-right">
            <li><a href="#">21</a></li>
            <li><a href="#">22</a></li>
            <li><a href="#">23</a></li>
            <li><a href="#">24</a></li>
          </ul>
        </div>
      </span>
    </div>
  </div>

<?php $this->stop() ?>