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

					<div nc-date-range="components/date-range-vertical"
						nc-start-label="Start Date"
						nc-start-placeholder="Select date and time coupon will be valid"
						nc-end-label="Expire Date"
						nc-end-placeholder="Select date and time coupon will expire"
						nc-model-start="formData.StartDate"
						nc-model-end="formData.ExpireDate"
						nc-error-text="Expire Date must come after Start Date"
						nc-template-options-path="couponForm/DateRange">
					</div>

         <div nc-template="common/input/form-group-with-label" nc-label="Status">
                        <div class="ah-select2-dropdown">
                            <select ng-model="formData.Status" class="form-control" required>
																<option value="AT">Active</option>
																<option value="NA">Inactive</option>
                            </select>
                        </div>
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
									<input type="text" class="form-control" ng-model="formData.Action.DiscountAmount"/>
		          </div>

							<div nc-template="common/input/form-group-with-label" nc-label="Maximum Amount" nc-template-options-path="couponForm/MaximumAmount">
									<input type="text" class="form-control" ng-model="formData.Action.MaximumAmount"/>
		          </div>

				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>More Options</h2></div>
				<div class="form-section-content">
					<div nc-template="common/input/form-group-with-label" nc-label="Usage per Customer" nc-template-options-path="couponForm/UsagePerCustomer">
							<input type="text" class="form-control" ng-model="formData.UsagePerCustomer"/>
					</div>
					<div nc-template="common/input/form-group-with-label" nc-label="Maximum Users" nc-template-options-path="couponForm/MaximumUsers">
							<input type="text" class="form-control" ng-model="formData.MaximumUser"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
