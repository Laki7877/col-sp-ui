<?php
$menus = [
  ["id" => "information", "name" => 'Information', "class" => "active"],
  ["id" => "conditions", "name" => 'Conditions'],
];

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Coupons']);

?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminSellerCouponAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="All Seller Coupons/Coupon Detail" link="{{url}}" icon="fa-bookmark">
      <div class="page-header">
        <a class="btn btn-white btn-width-xl" ng-click="cancel()">Close</a>
      </div>
    </nc-page-title>
    <div ng-show="loading" nc-loading="{{loadingMessage}}"></div>
    <div ng-show="saving" nc-loading="{{savingMessage}}"></div>
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
                          <input readonly disabled class="form-control width-field-large" name="CouponName" ng-model="formData.CouponName" ng-pattern="/^[^<>]+$/" maxlength="300" required/>
                      </div>
                      <div nc-template="common/input/form-group-with-label" nc-label="Coupon Code" nc-template-form="form.CouponCode" nc-template-options-path="couponForm/CouponCode">
                          <input readonly disabled class="form-control width-field-large" name="CouponCode" ng-model="formData.CouponCode" ng-pattern="/^[^<>]+$/" maxlength="300" required/>
                      </div>
                      <!-- Datetime Expiration -->
                      <div nc-template="common/input/form-group-with-label" nc-label="Start Date" nc-template-form="form.DateRange" nc-template-options-path="couponForm/DateRange">
                          <input readonly disabled style="padding-left: 30px" class="form-control input-icon-calendar width-field-large" value="{{formData.StartDate | dateTh }}" required/>
                      </div>
                      <div nc-template="common/input/form-group-with-label" nc-label="Expire Date" nc-template-form="form.DateRange" nc-template-options-path="couponForm/DateRange">
                          <input readonly disabled style="padding-left: 30px" class="form-control input-icon-calendar width-field-large" value="{{formData.ExpireDate | dateTh }}" required/>
                      </div>
                      <!-- Shop Status -->
                      <div ng-template="common/input/dropdown"
                        ng-template-options="{
                          'label' : 'Status',
                          'labelClass' : 'required'
                        }">
                        <ui-select ng-disabled="true" ng-model="formData.Status" search-enabled="false" required>
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
                                  <select readonly disabled ng-model="formData.Action" class="form-control"
                                  ng-init="formData.Action = {Type: 'PERCENT'}"
                                  ng-options="i as i.display for i in discount track by i.Type" required>
                                  </select>
                              </div>
                          </div>
                          <div nc-template="common/input/form-group-with-label" nc-label="Discount Amount" nc-template-options-path="couponForm/DiscountAmount">
                              <input readonly disabled type="text" class="form-control" ng-model="formData.Action.DiscountAmount" ng-pattern-restrict="^[0-9]*(\.[0-9]*)?$"/>
                          </div>

                          <div nc-template="common/input/form-group-with-label" nc-label="Max. Discount Amount" nc-template-options-path="couponForm/MaximumAmount">
                              <input readonly disabled type="text" class="form-control" ng-model="formData.Action.MaximumAmount" ng-pattern-restrict="^[0-9]*(\.[0-9]*)?$"/>
                          </div>

                    </div>
                  </div>
                  <div class="form-section">
                    <div class="form-section-header"><h2>More Options</h2></div>
                    <div class="form-section-content">
                      <div nc-template="common/input/form-group-with-label" nc-label="Maximum Usage" nc-template-options-path="couponForm/MaximumUsers">
                          <input readonly disabled type="text" class="form-control" ng-model="formData.MaximumUser" ng-pattern-restrict="^[0-9]*$" required/>
                      </div>
                      <div nc-template="common/input/form-group-with-label" nc-label="Usage per Customer" nc-template-options-path="couponForm/UsagePerCustomer">
                          <input readonly disabled type="text" class="form-control" ng-model="formData.UsagePerCustomer" ng-pattern-restrict="^[0-9]*$"/>
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
                        <ui-select ng-disabled="true" name="Conditions_Order" ng-model="formData.Conditions.Order[0].Type" search-enabled="false" >
                            <ui-select-match placeholder="-- Select Criteria --">{{ $select.selected.name }}</ui-select-match>
                            <ui-select-choices repeat="i.value as i in criteria">{{ i.name }}</ui-select-choices>
                        </ui-select>
                      </div>
                      <div ng-show="formData.Conditions.Order[0].Type != 'No filter'"
                       nc-template="common/input/form-group-with-label" nc-label="Price"
                       nc-template-options-path="couponForm/ConditionValue">
                        <input readonly class="form-control" disabled ng-model="formData.Conditions.Order[0].Value" ng-pattern-restrict="^[0-9]*(\.[0-9]*)?$"/>
                      </div>
                    </div>
                  </div>
                  <div class="form-section">
                    <div class="form-section-header"><h2>Filter</h2></div>
                    <div class="form-section-content">
                      <div nc-template="common/input/form-group-with-label" nc-label="Filter by">
                        <ui-select ng-disabled="true" name="Conditions_Criteria" ng-model="formData.Conditions.FilterBy.Type" search-enabled="false" >
                            <ui-select-match placeholder="-- Select Filter --">{{ $select.selected.name }}</ui-select-match>
                            <ui-select-choices repeat="i.value as i in filters">{{ i.name }}</ui-select-choices>
                        </ui-select>
                      </div>
                      <div ng-show="formData.Conditions.FilterBy.Type == 'LocalCategory'"
                        nc-template="common/input/form-group-with-label"
                        nc-template-options-path="couponForm/FilterByValue"
                        nc-label="Include">
                        <ui-select ng-model="formData.Conditions.FilterBy.LocalCategories" multiple readonly ng-disabled="formData.Conditions.FilterBy.LocalCategories.length > 0">
                          <ui-select-match placeholder="Search for Local Category">{{$item.NameEn}} ({{$item.CategoryId}})</ui-select-match>
                          <ui-select-choices repeat="i in []"></ui-select-choices>
                        </ui-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </form>
  </div>

<?php $this->stop() ?>
