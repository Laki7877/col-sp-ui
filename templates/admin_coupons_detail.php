<?php
$menus = [
  ["id" => "information", "name" => 'Information', "class" => "active"],
  ["id" => "conditions", "name" => 'Conditions'],
];

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Coupons']);

?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminGlobalCouponAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="{{title}}" link="{{url}}" icon="fa-bookmark">
      <div class="page-header">
        <a class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</a>
        <button class="btn btn-blue btn-width-xl margin-left-10" ng-click="save()">Save</button>
      </div>
    </nc-page-title>
    <div ng-show="loading" nc-loading="{{loadingMessage}}"></div>
    <div ng-show="saving" nc-loading="{{savingMessage}}"></div>
    <form class="ah-form sticky-mainform-action" name="form" ng-show="!loading && !saving" novalidate>
    <div class="add-product-body">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="require active">
            <a href="#information" data-id="information" aria-controls="information" role="tab" data-toggle="tab">Information</a>
          </li>
          <li role="presentation">
            <a href="#conditions" data-id="conditions" aria-controls="conditions" role="tab" data-toggle="tab">Conditions</a>
          </li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-30 active" id="information">
            <div id="create_coupon_information_tab_content">
              <div class="row">
                <div class="col-xs-12">
                  <div class="form-section">
                    <div class="form-section-header"><h2>Coupon Information</h2></div>
                    <div class="form-section-content">
                      <div nc-template="common/input/form-group-with-label" nc-label="Coupon Name" nc-template-form="form.CouponName" nc-template-options-path="couponForm/CouponName">
                          <input class="form-control width-field-large" name="CouponName" ng-model="formData.CouponName" ng-pattern-restrict="^[^<>]+$" maxlength="255" required/>
                      </div>
                      <div nc-template="common/input/form-group-with-label" nc-label="Coupon Code" nc-template-form="form.CouponCode" nc-template-options-path="couponForm/CouponCode">
                          <input class="form-control width-field-large" ng-uppercase name="CouponCode" ng-model="formData.CouponCode" ng-pattern-restrict="^[0-9a-zA-Z]+$" maxlength="10" required/>
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
                      <div nc-template="common/input/form-group-with-label"
                        nc-template-options-path="couponForm/Status"
                        nc-template-form="form.Status" 
                        nc-label="Status">
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
                          <div nc-template="common/input/form-group-with-label" 
                            nc-label="Action">
                              <div class="ah-select2-dropdown">
                                  <select ng-model="formData.Action" class="form-control" ng-disabled="manageable"
                                  ng-init="formData.Action = {Type: 'PERCENT'}"
                                  ng-options="i as i.display for i in discount track by i.Type" required>
                                  </select>
                              </div>
                          </div>
                          <div ng-if="formData.Action.Type == 'AMOUNT'">
                          <div nc-template="common/input/form-group-with-label"
                            nc-template-form="form.DiscountAmount" 
                            nc-template-options-path="couponForm/DiscountAmount"
                            nc-label="Discount Amount">
                                <input type="text" name="DiscountAmount" class="form-control" ng-model="formData.Action.DiscountAmount" ng-pattern-restrict="^[0-9]*(\.[0-9]{0,2})?$" required/>
                          </div>
                          </div>
                          <div ng-if="formData.Action.Type != 'AMOUNT'">
                          <div nc-template="common/input/form-group-with-label"
                            nc-template-form="form.DiscountPercent"   
                            nc-template-options-path="couponForm/DiscountPercent"
                            nc-label="Discount Percent">
                              <div class="input-with-unit">
                                <input type="text" name="DiscountPercent" class="form-control" ng-model="formData.Action.DiscountAmount" ng-pattern-restrict="^[0-9]*(\.[0-9]{0,2})?$" ng-maxnumber="100" ng-minnumber="0" required/>
                                <span class="input-unit">%</span>
                              </div>
                          </div>
                          <div nc-template="common/input/form-group-with-label" 
                            nc-template-form="form.MaximumAmount" 
                            nc-label="Max. Discount Amount" 
                            nc-template-options-path="couponForm/MaximumAmount">
                              <input type="text" name="MaximumAmount" class="form-control" ng-model="formData.Action.MaximumAmount" ng-pattern-restrict="^[0-9]*(\.[0-9]{0,2})?$" maxlength="10" placeholder="9999999"/>
                          </div>
                          </div>
                    </div>
                  </div>
                  <div class="form-section">
                    <div class="form-section-header"><h2>More Options</h2></div>
                    <div class="form-section-content">
                      <div nc-template="common/input/form-group-with-label" 
                        nc-template-form="form.MaximumUsers" 
                        nc-label="Maximum Usage" 
                        nc-template-options-path="couponForm/MaximumUsers">
                          <input type="text" name="MaximumUsers" class="form-control" ng-model="formData.MaximumUser" ng-pattern-restrict="^[0-9]*$" maxlength="10" placeholder="10" required/>
                      </div>
                      <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.UsagePerCustomer" 
                        nc-label="Usage per Customer" 
                        nc-template-options-path="couponForm/UsagePerCustomer">
                          <input type="text" name="UsagePerCustomer" class="form-control" ng-model="formData.UsagePerCustomer" ng-pattern-restrict="^[0-9]*$" maxlength="10" placeholder="1"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" class="tab-pane margin-top-30" id="conditions">
            <div id="create_coupon_condition_tab_content">
              <div class="row">
                <div class="col-xs-12">
                  <div class="form-section">
                    <div class="form-section-header"><h2>Order Condition</h2></div>
                    <div class="form-section-content">
                      <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.Condition_Order" 
                        nc-label="Criteria">
                        <ui-select name="Condition_Order" ng-model="formData.Conditions.Order[0].Type" search-enabled="false">
                            <ui-select-match placeholder="-- Select Criteria --">{{ $select.selected.name }}</ui-select-match>
                            <ui-select-choices repeat="i.value as i in criteria">{{ i.name }}</ui-select-choices>
                        </ui-select>
                      </div>
                      <div ng-if="formData.Conditions.Order[0].Type != 'NoFilter'">
                        <div nc-template="common/input/form-group-with-label" 
                          nc-label="Price"
                          nc-template-options-path="couponForm/Condition_Value">
                          <input name="Condition_Value" class="form-control" ng-model="formData.Conditions.Order[0].Value" ng-pattern-restrict="^[0-9]*(\.[0-9]{0,2})?$" maxlength="10" placeholder="0" required/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-section">
                    <div class="form-section-header"><h2>Filter</h2></div>
                    <div class="form-section-content">
                      <div nc-template="common/input/form-group-with-label" 
                        nc-template-form="form.Conditions_Criteria" 
                        nc-label="Filter by">
                        <ui-select name="Conditions_Criteria" ng-model="formData.Conditions.FilterBy.Type" search-enabled="false">
                            <ui-select-match placeholder="-- Select Filter --">{{ $select.selected.name }}</ui-select-match>
                            <ui-select-choices repeat="i.value as i in filters">{{ i.name }}</ui-select-choices>
                        </ui-select>
                      </div>
                      <div ng-show="formData.Conditions.FilterBy.Type == 'GlobalCategory'"
                        nc-template="common/input/form-group-with-label"
                        nc-template-options-path="couponForm/FilterByValue"
                        nc-template-form="form.FilterByValue" 
                        nc-label="Include">
                        <nc-breadcrumb-select placeholder="Search for Global Category Name or ID" nc-breadcrumb-select-options="{ tagCount: 50 }" name="FilterByValue" nc-model="formData.Conditions.FilterBy.LocalCategories" nc-breadcrumb-select-tree="categories" required></nc-breadcrumb-select>
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
