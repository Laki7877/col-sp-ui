<div id="create_coupon_information_tab_content">

	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Coupon Information</h2></div>
				<div class="form-section-content">
					<div nc-template="common/input/form-group-with-label" nc-label="Coupon Name" nc-template-form="form.CouponName" nc-template-options-path="couponForm/CouponName">
							<input class="form-control width-field-large" name="CouponName" ng-model="formData.CouponName" ng-pattern="/^[^<>]+$/" maxlength="300" required/>
					</div>

					<? $this->insert('components/forms/input-text-with-label', ["label" => "Coupon Code", "label_class" => "required", "size" => "large"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Start Date", "label_class" => "required", "size" => "large", "input_class" => "input-icon-calendar"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Expire Date", "label_class" => "required", "size" => "large", "input_class" => "input-icon-calendar"]) ?>


                     <div nc-template="common/input/form-group-with-label" nc-label="Status">
                        <div class="ah-select2-dropdown">
                            <select ng-model="p" class="form-control" ng-init="p = { value: 'AT'}"
                            ng-options="i as i.text for i in [{ text: 'Active', value: 'AT'},{ text: 'Inactive', value: 'IA'}] track by i.value" required>
                            </select>
                        </div>
                    </div>

				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Action</h2></div>
				<div class="form-section-content">

			          <div nc-template="common/input/form-group-with-label" nc-label="Status">
                        <div class="ah-select2-dropdown">
                            <select ng-model="p" class="form-control" ng-init="p = {value: 'PERCENT'}" ng-options="i as i.text for i in [{ text: 'Discount by percent', value: 'PERCENT'},{ text: 'Discount by amount', value: 'AMOUNT'}] track by i.value" required>
                            </select>
                        </div>
                    </div>

            		<? $this->insert('components/forms/input-text-with-label', ["label" => "Discount Amount", "hint" => "Example: 50 or 75", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Maximum Amount", 'right_hint' => 'THB']) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>More Options</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "User per Customer"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Maximum Users"]) ?>
				</div>
			</div>
		</div>
	</div>
</div>
