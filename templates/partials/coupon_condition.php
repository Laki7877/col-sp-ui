<div id="create_coupon_information_tab_content">

	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Order Condition</h2></div>
				<div class="form-section-content">
					<div nc-template="common/input/form-group-with-label" nc-label="Criteria">
												 <div class="ah-select2-dropdown">
														 <select ng-model="formData.Conditions.Order[0].Type" class="form-control" required>
															 	<option ng-repeat="opt in dataSet.criteria" value="{{ opt.value }}">
																	{{ opt.text }}
																</option>
														 </select>
												 </div>
					</div>

					<div ng-show="formData.Conditions.Order[0].Type == 'PriceGT'"
					 nc-template="common/input/form-group-with-label" nc-label="Price" nc-template-options-path="couponForm/ConditionValue">
							<input type="text" ng-model="formData.Conditions.Order[0].Value" class="form-control"/>
					</div>

				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Filter By...</h2></div>
				<div class="form-section-content">
					<div nc-template="common/input/form-group-with-label" nc-label="Criteria">
												 <div class="ah-select2-dropdown">
														 <select ng-model="formData.Conditions.FilterBy[0].Type" class="form-control" required>
															 	<option ng-repeat="opt in dataSet.filters" value="{{ opt.value }}">
																	{{ opt.text }}
																</option>
														 </select>
												 </div>
					</div>
					<div nc-template="common/input/form-group-with-label" nc-label="Include">
						<ui-select ng-model="formData.Conditions.FilterBy[0].Value" ng-if="formData.Conditions.FilterBy[0].Type == 'Brand'">
								<ui-select-match placeholder="Search by Brand...">
										<span ng-bind="$select.selected.BrandNameEn"></span>
										<span ng-show="!$select.selected.BrandNameEn">- Select Brand -</span>
								</ui-select-match>
								<ui-select-choices ui-disable-choice="item.disabled" refresh-delay="500" refresh="refreshBrands($select.search)"
								repeat="item in (dataSet.Brands)  | filter : $select.search track by item.BrandId">
										<span>{{ item.BrandNameEn }} </span>
										<span ng-if="item.BrandNameTh">/ {{ item.BrandNameTh }}</span>
								</ui-select-choices>
						</ui-select>
					</div>

				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Include</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input_tags', ["label" => "SKU", "choices" => ["Gulp", "Adico","Pascal"] ]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Exclude</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input_tags', ["label" => "SKU", "choices" => ["Gulp", "Adico","Pascal"] ]) ?>
				</div>
			</div>
		</div>
	</div>
</div>
