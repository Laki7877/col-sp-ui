<div id="shop-setting-content">

	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Shop Information</h2></div>
				<div class="form-section-content">
					<div nc-template="common/input/form-group-with-label" nc-label="Shop ID"
                    nc-template-options-path="shopSettingForm/ShopId">
                           <input class="form-control" type="text" ng-model="formData.ShopId" readonly value="DE39222"/>
                    </div>

										<div class="form-group">
											<div class="width-label"><label class="control-label">Shop Logo</label></div>
										    <div class="width-field-normal">
													<div nc-template="components/single-upload" nc-view-bag="uploadViewBag"></div>
										    </div>
										</div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Name"
                    nc-template-options-path="shopSettingForm/ShopNameEn">
                           <input class="form-control" type="text" ng-model="formData.ShopNameEn"/>
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Description (English)"
                    nc-template-options-path="shopSettingForm/ShopDescriptionEn">
                           <textarea class="form-control" rows="4" type="text" ng-model="formData.ShopDescriptionEn"></textarea>
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Description (Thai)"
                    nc-template-options-path="shopSettingForm/ShopDescriptionTh">
                           <textarea class="form-control" rows="4" type="text" ng-model="formData.ShopDescriptionTh"></textarea>
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Float Message (English)"
                    nc-template-options-path="shopSettingForm/FloatMessageEn">
                           <input class="form-control" type="text" ng-model="formData.FloatMessageEn"/>
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Float Message (Thai)"
                    nc-template-options-path="shopSettingForm/FloatMessageTh">
                           <input class="form-control" type="text" ng-model="formData.FloatMessageTh"/>
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Address"
                    nc-template-options-path="shopSettingForm/ShopAddress">
                           <input class="form-control" type="text" ng-model="formData.ShopAddress"/>
                    </div>

				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Financial Information</h2></div>
				<div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Bank Account Number"
                    nc-template-options-path="shopSettingForm/BankAccountNumber">
                           <input class="form-control" type="text" ng-model="formData.BankAccountNumber" disabled/>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Bank Account Name"
                    nc-template-options-path="shopSettingForm/BankAccountName">
                           <input class="form-control" type="text" ng-model="formData.BankAccountName" disabled/>
                    </div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Social Media Link</h2></div>
				<div class="form-section-content">

                    <div nc-template="common/input/form-group-with-label" nc-label="Facebook"
                    nc-template-options-path="shopSettingForm/Facebook">
                           <input class="form-control" type="text" ng-model="formData.Facebook"/>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="YouTube"
                    nc-template-options-path="shopSettingForm/YouTube">
                           <input class="form-control" type="text" ng-model="formData.YouTube"/>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Twitter"
                    nc-template-options-path="shopSettingForm/Twitter">
                           <input class="form-control" type="text" ng-model="formData.Twitter"/>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Instagram"
                    nc-template-options-path="shopSettingForm/Instagram">
                           <input class="form-control" type="text" ng-model="formData.Instagram"/>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Pinterest"
                    nc-template-options-path="shopSettingForm/Pinterest">
                           <input class="form-control" type="text" ng-model="formData.Pinterest"/>
                    </div>


				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>More Options</h2></div>
				<div class="form-section-content">
					<div nc-template="common/input/form-group-with-label" nc-label="Gift Wrap" nc-template-options-path="shopSettingForm/GiftWrap">
                            <select class="form-control" ng-init="formData.GiftWrap = 'NA'" ng-model="formData.GiftWrap">
                                <option value='NA'>Not Available</option>
                            </select>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Tax Invoice" nc-template-options-path="shopSettingForm/TaxInvoice">
                            <select class="form-control" ng-init="formData.TaxInvoice = 'NA'" ng-model="formData.TaxInvoice">
                                <option value='NA'>Not Available</option>
                            </select>
                    </div>
                     <div nc-template="common/input/form-group-with-label" nc-label="Stock Alert" nc-template-options-path="shopSettingForm/StockAlert">
                            <input class="form-control" type="text" ng-model="formData.StockAlert"/>
                    </div>

				</div>
			</div>
		</div>
	</div>

</div>
