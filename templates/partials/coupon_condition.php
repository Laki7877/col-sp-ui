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
			 		 ng-init="formData.Conditions.Order[0].Type = 'None'"
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
														 <select ng-init="formData.Conditions.FilterBy[0].Type = 'None'"
														 ng-model="formData.Conditions.FilterBy[0].Type" class="form-control" required>
															 	<option ng-repeat="opt in dataSet.filters" value="{{ opt.value }}">
																	{{ opt.text }}
																</option>
														 </select>
												 </div>
					</div>
					<div nc-template="common/input/form-group-with-label" nc-template-options-path="couponForm/FilterByValue"
					 nc-label="Include" ng-show="formData.Conditions.FilterBy[0].Type != 'None'">
						<ui-select multiple	ng-model="formData.Conditions.FilterBy[0].Value"
						ng-init="formData.Conditions.FilterBy[0].Value = []"
						ng-if="formData.Conditions.FilterBy[0].Type == 'Brand'">
								<ui-select-match placeholder="Search by Brand...">
										<span ng-bind="$item.BrandNameEn"></span>
								</ui-select-match>
								<ui-select-choices ui-disable-choice="item.disabled" refresh-delay="1000" refresh="refreshBrands($select.search)"
								repeat="item in (dataSet.Brands)  | filter : $select.search track by item.BrandId">
										<span>{{ item.BrandNameEn }} </span>
										<span ng-if="item.BrandNameTh">/ {{ item.BrandNameTh }}</span>
								</ui-select-choices>
						</ui-select>
						<ui-select multiple tagging tagging-label="(new)" ng-init="formData.Conditions.FilterBy[0].Value = []"
						ng-model="formData.Conditions.FilterBy[0].Value" ng-if="formData.Conditions.FilterBy[0].Type == 'Email'">
								<ui-select-match placeholder="Type emails">
										{{ $item }}
								</ui-select-match>
								<ui-select-choices repeat="color in [] | filter:$select.search">
										{{color}}
								</ui-select-choices>
						</ui-select>
						<ui-select multiple	ng-model="formData.Conditions.FilterBy[0].Value"
						ng-init="formData.Conditions.FilterBy[0].Value = []"
						ng-if="formData.Conditions.FilterBy[0].Type == 'Shop'">
								<ui-select-match placeholder="Search by Shop name or Shop Id...">
										<span ng-bind="$item.ShopNameEn"></span>
								</ui-select-match>
								<ui-select-choices ui-disable-choice="item.disabled" refresh-delay="1000" refresh="refreshShops($select.search)"
								repeat="item in (dataSet.Shops)  | filter : $select.search track by item.ShopId">
										<span>{{ item.ShopNameEn }} </span>
										<span ng-if="item.ShopNameTh">/ {{ item.ShopNameTh }}</span>
								</ui-select-choices>
						</ui-select>
					</div>

				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Include</h2></div>
				<div class="form-section-content">

					<div nc-template="common/input/form-group-with-label"
					nc-template-options-path="couponForm/IncludeProducts"
					nc-label="Products">
						<ui-select multiple	ng-model="formData.Conditions.Include" ng-init="formData.Conditions.Include = []">
								<ui-select-match placeholder="Search by Product Name or PID...">
										<span>{{ $item.ProductNameEn }} ({{ $item.Pid }}) </span>
								</ui-select-match>
								<ui-select-choices  refresh-delay="1000" refresh="refreshProducts($select.search)"
								repeat="item in (dataSet.Products)  | filter : $select.search track by item.Pid">
										<span>{{ item.ProductNameEn }} ({{ item.Pid }}) </span>
								</ui-select-choices>
						</ui-select>
					</div>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Exclude</h2></div>
				<div class="form-section-content">
					<div nc-template="common/input/form-group-with-label"
					nc-template-options-path="couponForm/IncludeProducts"
					nc-label="Products">
						<ui-select multiple	ng-model="formData.Conditions.Exclude" ng-init="formData.Conditions.Exclude = []">
								<ui-select-match placeholder="Search by Product Name or PID...">
										<span>{{ $item.ProductNameEn }} ({{ $item.Pid }}) </span>
								</ui-select-match>
								<ui-select-choices  refresh-delay="1000" refresh="refreshProducts($select.search)"
								repeat="item in (dataSet.Products)  | filter : $select.search track by item.Pid">
										<span>{{ item.ProductNameEn }} ({{ item.Pid }}) </span>
								</ui-select-choices>
						</ui-select>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
