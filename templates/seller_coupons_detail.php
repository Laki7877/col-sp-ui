<?php
$menus = [
  ["id" => "information", "name" => 'Information', "class" => "active"],
  ["id" => "conditions", "name" => 'Conditions'],
];

$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Coupons']);

?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerCouponAddCtrl" ng-init="init(<?=$params?>)">
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
      <? $this->insert('components/tab-nav', ["items" => $menus]) ?>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-30 active" id="information">
            <div id="create_coupon_information_tab_content">
              <div class="row">
                <div class="col-xs-12">
                  <div class="form-section">
                    <div class="form-section-header"><h2>Coupon Information</h2></div>
                    <div class="form-section-content">
                      <div nc-template="common/input/form-group-with-label" 
                        nc-label="Coupon Name" 
                        nc-template-form="form.CouponName" 
                        nc-template-options-path="couponForm/CouponName">
                          <input class="form-control width-field-large" name="CouponName" ng-model="formData.CouponName"   maxlength="255" required ng-disabled="manageable" />
                      </div>
                      <div nc-template="common/input/form-group-with-label" 
                        nc-label="Coupon Code" 
                        nc-template-form="form.CouponCode" 
                        nc-template-options-path="couponForm/CouponCode">
                          <input class="form-control width-field-large" ng-uppercase name="CouponCode" ng-model="formData.CouponCode" ng-pattern-restrict="^[a-zA-Z0-9]*$" maxlength="10" required ng-disabled="manageable" required/>
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
                        <ui-select ng-model="formData.Status" search-enabled="false" ng-disabled="manageable" required>
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
                                <input type="text" name="DiscountAmount" class="form-control" ng-model="formData.Action.DiscountAmount" ng-disabled="manageable" ng-pattern-restrict="^[0-9]*(\.[0-9]{0,2})?$" maxlength="10" required/>
                          </div>
                          </div>
                          <div ng-if="formData.Action.Type != 'AMOUNT'">
                          <div nc-template="common/input/form-group-with-label"
                            nc-template-form="form.DiscountPercent"   
                            nc-template-options-path="couponForm/DiscountPercent"
                            nc-label="Discount Percent">
                              <div class="input-with-unit">
                                <input type="text" name="DiscountPercent" class="form-control" ng-model="formData.Action.DiscountAmount" ng-disabled="manageable" ng-pattern-restrict="^[0-9]*(\.[0-9]{0,2})?$" ng-maxnumber="100" ng-minnumber="0" required/>
                                <span class="input-unit">%</span>
                              </div>
                          </div>
                          <div nc-template="common/input/form-group-with-label" 
                            nc-template-form="form.MaximumAmount" 
                            nc-label="Max. Discount Amount" 
                            nc-template-options-path="couponForm/MaximumAmount">
                              <input type="text" name="MaximumAmount" class="form-control" ng-model="formData.Action.MaximumAmount" ng-disabled="manageable" ng-pattern-restrict="^[0-9]*(\.[0-9]{0,2})?$" maxlength="10" placeholder="9999999"/>
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
                          <input type="text" name="MaximumUsers" class="form-control" ng-model="formData.MaximumUser" ng-disabled="manageable" ng-pattern-restrict="^[0-9]*$" maxlength="10" placeholder="10" required/>
                      </div>
                      <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.UsagePerCustomer" 
                        nc-label="Usage per Customer" 
                        nc-template-options-path="couponForm/UsagePerCustomer">
                          <input type="text" name="UsagePerCustomer" class="form-control" ng-model="formData.UsagePerCustomer" ng-disabled="manageable" ng-pattern-restrict="^[0-9]*$" maxlength="10" placeholder="1"/>
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
                      <div nc-template="common/input/form-group-with-label"
                        nc-template-form="form.Condition_Order" 
                        nc-label="Criteria">
                        <ui-select name="Condition_Order" ng-init="formData.Conditions.Order[0].Type = 'NoFilter'" ng-model="formData.Conditions.Order[0].Type" ng-disabled="manageable" search-enabled="false">
                            <ui-select-match placeholder="-- Select Criteria --">{{ $select.selected.name }}</ui-select-match>
                            <ui-select-choices repeat="i.value as i in criteria">{{ i.name }}</ui-select-choices>
                        </ui-select>
                      </div>
                      <div ng-if="formData.Conditions.Order[0].Type != 'NoFilter'">

                        <div nc-template="common/input/form-group-with-label" 
                          nc-label="Price"
                          nc-template-options-path="couponForm/Condition_Value">
                          <input name="Condition_Value" class="form-control" ng-model="formData.Conditions.Order[0].Value" ng-disabled="manageable" ng-pattern-restrict="^[0-9]*(\.[0-9]{0,2})?$" maxlength="10" placeholder="0" required/>
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
							<ui-select name="Conditions_Criteria" ng-model="formData.Conditions.FilterBy.Type" ng-disabled="manageable" search-enabled="false">
                            <ui-select-match placeholder="-- Select Filter --">{{ $select.selected.name }}</ui-select-match>
                            <ui-select-choices repeat="i.value as i in filters">{{ i.name }}</ui-select-choices>
                        </ui-select>
                      </div>


					  <div ng-show="formData.Conditions.FilterBy.Type == 'LocalCategory'"
                        nc-template="common/input/form-group-with-label"
                        nc-template-options-path="couponForm/FilterByValue"
                        nc-template-form="form.FilterByValue" 
                        nc-label="Categories">
							<ui-select multiple ng-model="formData.Conditions.FilterBy.LocalCategories" ng-disabled="manageable" close-on-select="false" search-enabled="true">
								<ui-select-match ctrl-fn="exclude(arg1)" nc-click-select 
								value="{{formData.Conditions.FilterBy.LocalCategories[$selectMultiple.activeMatchIndex]}}" 
								ng-model="multipleDemoSelected" placeholder="-- Select Category --" 
								title="click at the category label to exclude product in this category.">{{$item.NameEn}}</ui-select-match>

								<ui-select-choices repeat="i in categories">
								  <div ng-bind-html="i.NameEn | highlight: $select.search"></div>
								</ui-select-choices>
							</ui-select>
                      </div>

					  <div ng-show="formData.Conditions.FilterBy.Type == 'LocalCategory'"
                        nc-template="common/input/form-group-with-label"
                        nc-label="Include">
							<ui-select multiple ng-model="formData.Conditions.Include" ng-disabled="manageable" close-on-select="false" search-enabled="true">
								<ui-select-match ng-model="includeProductSelected" placeholder="-- Select Product --">{{$item.ProductNameEn}}</ui-select-match>
								<ui-select-choices repeat="i in products">
								  <div ng-bind-html="i.ProductNameEn | highlight: $select.search"></div>
								</ui-select-choices>
							</ui-select>
                      </div>

					  <div ng-show="formData.Conditions.FilterBy.Type == 'Product'"
                        nc-template="common/input/form-group-with-label"
                        nc-label="Include">
							<ui-select multiple ng-model="formData.Conditions.Include" ng-disabled="manageable" close-on-select="false" search-enabled="true">
								<ui-select-match ng-model="includeProductSelected" placeholder="-- Select Product --">{{$item.ProductNameEn}}</ui-select-match>
								<ui-select-choices repeat="i in products">
								  <div ng-bind-html="i.ProductNameEn | highlight: $select.search"></div>
								</ui-select-choices>
							</ui-select>
                      </div>

					  <div ng-show="formData.Conditions.FilterBy.Type == 'Product'"
                        nc-template="common/input/form-group-with-label"
                        nc-label="Exclude">
							<ui-select multiple ng-model="formData.Conditions.Exclude" ng-disabled="manageable" close-on-select="false" search-enabled="true">
								<ui-select-match ng-model="excludeProductSelected" placeholder="-- Select Product --">{{$item.ProductNameEn}}</ui-select-match>
								<ui-select-choices repeat="i in products">
								  <div ng-bind-html="i.ProductNameEn | highlight: $select.search"></div>
								</ui-select-choices>
							</ui-select>
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

  <!-- modal temaplate -->
<script type="text/ng-template" id="templates/coupon-include-or-exclude.html">
  
  <div class="modal-header">
    <h3 class="modal-title">Exclude Product in this Category</h3>
  </div>
  <div class="modal-body">
	<form class="form-horizontal">
		
		<br><br>

		<div class="row">
			<div class="col-md-6">
				<div class="form-group" style="position: fixed; width: 48%;">
					<div class="col-md-12">
						<input type="text" name="search" 
							class="form-control" 
							ng-model="searchText" 
							ng-enter="searchProduct(searchText)"
							placeholder="Search for Product" />
					</div>
				</div>

				<div  style="min-height: 400px; height: 400px; margin-top: 10px; overflow-y: auto;">
					<div class="table-section">
						<table class="table">
							<thead ng-show="products.length > 0">
								<tr class="bg-info">
									<!--th>PID</th-->
									<th>Product Name</th>
									<th class="text-right">Exclude</th>
								<tr>
							</thead>

							<tbody ng-show="products.length > 0">
								<tr ng-repeat="item in products">
									<!--td>{{item.Pid}}</td-->
									<td>{{item.ProductNameEn}}</td>
									<td class="text-right">
										<button class="btn btn-sm btn-info" ng-click="moveTo('product', 'exclude', item)"> 
											<i class="fa fa-chevron-right" aria-hidden="true"></i>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div nc-empty="" ng-show="products.length == 0" class="ng-isolate-scope" style="">
						<div class="local-category-page margin-bottom-20">
							<div class="local-category-empty-section margin-top-20">
								<span><span class="zero-category-image"></span> You do not have any product </span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-6">
			
				<div class="row">
					<div class="form-section">
						<div class="form-section-header" style="background-color: #d9534f; color: white;"><h2>Product Exclude</h2></div>
						<div class="form-section-content" style="min-height: 400px; height: 400px; overflow-y: scroll;">
							<table class="table">
								<tbody>
									<tr ng-repeat="item in excludes">
										<!--td>{{item.Pid}}</td-->
										<td>{{item.ProductNameEn}}</td>
										<td class="text-right">
											<button class="btn btn-sm btn-default" ng-click="removeExclude(item)">
												<i class="fa fa-trash"></i> Remove
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<button class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</button>
							<button class="btn btn-blue btn-width-xl" ng-click="ok()">OK</button>
						</div>
					</div>
				</div>

			</div>
		</div>

	</form>
  </div>
</script>

<?php $this->stop() ?>
