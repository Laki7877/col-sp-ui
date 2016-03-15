<?php
$menus = [
  ["id" => "information", "name" => 'Information', "class" => "active"],
  ["id" => "conditions", "name" => 'Conditions'],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'User Profile'])
?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminGlobalCouponAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Coupons/{{title}}",  'urls' => ['/admin/coupons/global'], 'border_class' => 'no-padding']) ?>

    <div ng-show="loading" nc-loading="Loading Coupon.."></div>
    <div ng-show="saving" nc-loading="Saving Coupon.."></div>

    <form class="ah-form sticky-mainform-action" name="form" ng-show="!loading && !saving" novalidate>
    <div class="add-product-body">
      <? $this->insert('components/tab-nav', ["items" => $menus]) ?>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-30 active" id="information">
            <div id="create_coupon_information_tab_content">
              <div class="row">
                <div class="col-xs-12">
                  <div class="form-section">
                    <div class="form-section-header"><h2>Coupon Information</h2></div>
                    <div class="form-section-content">
                      <div nc-template="common/input/form-group-with-label" nc-label="Coupon Name" nc-template-form="form.CouponName" nc-template-options-path="couponForm/CouponName">
                          <input class="form-control width-field-large" name="CouponName" ng-model="formData.CouponName" ng-pattern="/^[^<>]+$/" maxlength="300" required/>
                      </div>
                      <div nc-template="common/input/form-group-with-label" nc-label="Coupon Code" nc-template-form="form.CouponCode" nc-template-options-path="couponForm/CouponCode">
                          <input class="form-control width-field-large" name="CouponCode" ng-model="formData.CouponCode" ng-pattern="/^[^<>]+$/" maxlength="300" required/>
                      </div>
                      <!-- Datetime Expiration -->
                      <div nc-date-range="components/date-range-vertical2"
                        nc-start-label="Start Date"
                        nc-start-placeholder="Select date and time coupon will be valid"
                        nc-end-label="Expire Date"
                        nc-end-placeholder="Select date and time coupon will expire"
                        nc-model-start="formData.StartDate"
                        nc-model-end="formData.ExpireDate"
                        nc-error-text="Expire date must come after start date"
                        nc-template-form="form"
                        nc-template-options-path="couponForm/DateRange">
                      </div>
                      <!-- Shop Status -->
                      <div ng-template="common/input/dropdown"
                        ng-template-options="{
                          'label' : 'Status',
                          'labelClass' : 'required'
                        }">
                        <ui-select ng-model="formData.Status" search-enabled="false" required>
                          <ui-select-match placeholder="- Select Status -">
                            <span ng-bind="$select.selected.name"></span>
                          </ui-select-match>
                          <ui-select-choices repeat="item.value as item in statusDropdown">
                            <span ng-bind="item.name"></span>
                          </ui-select-choices>
                        </ui-select>
                      </div>
                    </div>
                  </div>
                  <div class="form-section">
                    <div class="form-section-header"><h2>Action</h2></div>
                    <div class="form-section-content">
                          <div nc-template="common/input/form-group-with-label" nc-label="Action">
                              <div class="ah-select2-dropdown">
                                  <select ng-model="formData.Action" class="form-control"
                                  ng-init="formData.Action = {Type: 'PERCENT'}"
                                  ng-options="i as i.display for i in [{ display: 'Discount by percent', Type: 'PERCENT'},{ display: 'Discount by amount', Type: 'AMOUNT'}]
                                  track by i.Type" required>
                                  </select>
                              </div>
                          </div>
                          <div nc-template="common/input/form-group-with-label" nc-label="Discount Amount" nc-template-options-path="couponForm/DiscountAmount">
                              <input type="text" class="form-control" ng-model="formData.Action.DiscountAmount" ng-pattern-restrict="^[0-9]*(\.[0-9]*)?$"/>
                          </div>

                          <div nc-template="common/input/form-group-with-label" nc-label="Maximum Amount" nc-template-options-path="couponForm/MaximumAmount">
                              <input type="text" class="form-control" ng-model="formData.Action.MaximumAmount" ng-pattern-restrict="^[0-9]*(\.[0-9]*)?$"/>
                          </div>

                    </div>
                  </div>
                  <div class="form-section">
                    <div class="form-section-header"><h2>More Options</h2></div>
                    <div class="form-section-content">
                      <div nc-template="common/input/form-group-with-label" nc-label="Usage per Customer" nc-template-options-path="couponForm/UsagePerCustomer">
                          <input type="text" class="form-control" ng-model="formData.UsagePerCustomer" ng-pattern-restrict="^[0-9]*$"/>
                      </div>
                      <div nc-template="common/input/form-group-with-label" nc-label="Maximum Users" nc-template-options-path="couponForm/MaximumUsers">
                          <input type="text" class="form-control" ng-model="formData.MaximumUser" ng-pattern-restrict="^[0-9]*$"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane margin-top-30" id="conditions">
            <div id="create_coupon_information_tab_content">
              <div class="row">
                <div class="col-xs-12">
                  <div class="form-section">
                    <div class="form-section-header"><h2>Order Condition</h2></div>
                    <div class="form-section-content">
                      <div nc-template="common/input/form-group-with-label" nc-label="Criteria">
                        <ui-select name="Conditions_Order" ng-model="formData.Conditions.Order[0].Type" search-enabled="false" >
                            <ui-select-match placeholder="-- Select Criteria --">{{ $select.selected.name }}</ui-select-match>
                            <ui-select-choices repeat="i.value as i in criteria">{{ i.name }}</ui-select-choices>
                        </ui-select>
                      </div>
                      <div ng-show="formData.Conditions.Order[0].Type != 'No filter'"
                       nc-template="common/input/form-group-with-label" nc-label="Price" 
                       nc-template-options-path="couponForm/ConditionValue">
                        <input ng-model="formData.Conditions.Order[0].Value" ng-pattern-restrict="^[0-9]*(\.[0-9]*)?$"/>
                      </div>
                    </div>
                  </div>
                  <div class="form-section">
                    <div class="form-section-header"><h2>Filter By...</h2></div>
                    <div class="form-section-content">
                      <div nc-template="common/input/form-group-with-label" nc-label="Criteria">
                        <ui-select name="Conditions_Criteria" ng-model="formData.Conditions.FilterBy.Type" search-enabled="false" >
                            <ui-select-match placeholder="-- Select Filter --">{{ $select.selected.name }}</ui-select-match>
                            <ui-select-choices repeat="i.value as i in filters">{{ i.name }}</ui-select-choices>
                        </ui-select>
                      </div>
                      <div ng-show="formData.Conditions.FilterBy.Type != 'No filter'" 
                        nc-template="common/input/form-group-with-label" 
                        nc-template-options-path="couponForm/FilterByValue"
                        nc-label="Include">
                        <nc-breadcrumb-select name="GlobalCategories" nc-model="formData.Conditions.FilterBy.GlobalCategories" nc-breadcrumb-select-tree="categories"></nc-breadcrumb-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="add-product-form-action main-form-action full-width-row">
          <div class="container-fluid">
            <div class="float-right">
              <button class="btn btn-white btn-width-xl">Cancel</button>
              <button class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
            </div>
          </div>
        </div>

    </div>
    </form>
  </div>

<?php $this->stop() ?>
