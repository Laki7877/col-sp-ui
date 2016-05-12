<?= $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="SellerShopSettingCtrl" ng-init='init()'>
			  <div ng-show="loading" nc-loading="Loading Shop Settings.."></div>
				<nc-alert nc-model="alert"></nc-alert>
        <form class="ah-form sticky-mainform-action" name="form" ng-submit="save()" ng-show="!loading">
            <nc-page-title nc-title="Shop Profile" icon="fa-sliders">
                <button class="btn btn-blue btn-width-xl">Save</button>
            </nc-page-title>
		    <div>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<div id="shop-setting-content">
						    <div class="row">
						        <div class="col-xs-12">
						            <div class="form-section">
						                <div class="form-section-header">
						                    <h2>Shop Information</h2></div>
						                <div class="form-section-content">
											<!-- Shop Status -->
											<div ng-template="common/input/dropdown"
												ng-template-options="{
												'label' : 'Shop Status',
												}">
												<ui-select ng-model="formData.Status" search-enabled="false" ng-disabled="!statusChangeable" required>
													<ui-select-match placeholder="- Select Shop Status -">
														<span ng-bind="$select.selected.name"></span>
													</ui-select-match>
													<ui-select-choices repeat="item.value as item in statusDropdown">
														<span ng-bind="item.name"></span>
													</ui-select-choices>
												</ui-select>
												<span class="help-block">The status cannot be changed until all <a href="/onboarding">onboarding tasks</a> are complete.</span>
											</div>
						                    <!-- Shop Logo -->
								            <div nc-template="common/input/form-group-with-label"
								              nc-template-form="form.Logo"
								              nc-label="Shop Logo file">
								                <button
								                type="button"
								                name="Logo"
								                class="btn btn-default"
								                ngf-accept="'.png,.jpg,.jpeg'"
								                ngf-select="uploadLogo($file)"
								                ng-class="{'has-error-btn' : isInvalid(form.Logo)}"
								                required>Choose File</button>
								            </div>
								            <div ng-show="formData.ShopImage.Url"
								              nc-template="common/input/form-group-with-label"
								              nc-label="Logo Preview">
								                <img
								                  ng-src="{{formData.ShopImage.Url}}"
								                  width="160"
								                  />
								                <a style="display:block;" class="margin-top-5" ng-click="formData.Logo=null"><i class="fa-trash fa"></i> Delete this image</a>
								            </div>
						                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Name" nc-template-options-path="shopSettingForm/ShopNameEn">
						                        <input class="form-control" type="text" ng-model="formData.ShopNameEn" ng-pattern="/^[^<>]+$/" required/>
						                    </div>

						                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Description (English)" nc-template-options-path="shopSettingForm/ShopDescriptionEn">
						                        <textarea class="form-control" rows="4" type="text" ng-model="formData.ShopDescriptionEn"></textarea>
						                    </div>

						                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Description (ไทย)" nc-template-options-path="shopSettingForm/ShopDescriptionTh">
						                        <textarea class="form-control" rows="4" type="text" ng-model="formData.ShopDescriptionTh"></textarea>
						                    </div>

						                    <div nc-template="common/input/form-group-with-label" nc-label="Float Message (English)" nc-template-options-path="shopSettingForm/FloatMessageEn">
						                        <input class="form-control" type="text" ng-model="formData.FloatMessageEn" />
						                    </div>

						                    <div nc-template="common/input/form-group-with-label" nc-label="Float Message (ไทย)" nc-template-options-path="shopSettingForm/FloatMessageTh">
						                        <input class="form-control" type="text" ng-model="formData.FloatMessageTh" />
						                    </div>

						                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Address" nc-template-options-path="shopSettingForm/ShopAddress">
						                        <textarea class="form-control" rows="4" type="text" ng-model="formData.ShopAddress" /></textarea>
						                    </div>

						                </div>
						            </div>
						        </div>
						    </div>
						    <div class="row">
						        <div class="col-xs-12">
						            <div class="form-section">
						                <div class="form-section-header">
						                    <h2>Social Media Link</h2></div>
						                <div class="form-section-content">

						                    <div nc-template="common/input/form-group-with-label" nc-label="Facebook" nc-template-options-path="shopSettingForm/Facebook">
						                        <input class="form-control" type="text" ng-model="formData.Facebook" />
						                    </div>
						                    <div nc-template="common/input/form-group-with-label" nc-label="YouTube" nc-template-options-path="shopSettingForm/YouTube">
						                        <input class="form-control" type="text" ng-model="formData.YouTube" />
						                    </div>
						                    <div nc-template="common/input/form-group-with-label" nc-label="Twitter" nc-template-options-path="shopSettingForm/Twitter">
						                        <input class="form-control" type="text" ng-model="formData.Twitter" />
						                    </div>
						                    <div nc-template="common/input/form-group-with-label" nc-label="Instagram" nc-template-options-path="shopSettingForm/Instagram">
						                        <input class="form-control" type="text" ng-model="formData.Instagram" />
						                    </div>
						                    <div nc-template="common/input/form-group-with-label" nc-label="Pinterest" nc-template-options-path="shopSettingForm/Pinterest">
						                        <input class="form-control" type="text" ng-model="formData.Pinterest" />
						                    </div>
						                </div>
						            </div>
						        </div>
						    </div>
						    <div class="row">
						        <div class="col-xs-12">
						            <div class="form-section">
						                <div class="form-section-header">
						                    <h2>More Options</h2></div>
						                <div class="form-section-content">
						                    <div nc-template="common/input/form-group-with-label" nc-label="Gift Wrap" nc-template-options-path="shopSettingForm/GiftWrap">
						                        <select class="form-control" ng-model="formData.GiftWrap">
						                            <option value='N'>Not Available</option>
						                            <option value='Y'>Available</option>
						                        </select>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label" nc-label="Tax Invoice" nc-template-options-path="shopSettingForm/TaxInvoice">
						                        <select class="form-control" ng-model="formData.TaxInvoice">
						                            <option value='N'>Not Available</option>
						                            <option value='Y'>Available</option>
						                        </select>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label" nc-label="Stock Alert" nc-template-options-path="shopSettingForm/StockAlert">
						                        <input class="form-control" type="text" ng-model="formData.StockAlert" ng-pattern-restrict="^[0-9]*$" />
						                    </div>

						                </div>
						            </div>
						        </div>
						    </div>
						    <div class="row">
						        <div class="col-xs-12">
						            <div class="form-section">
						                <div class="form-section-header">
						                    <h2>Shop Address and Contact Information</h2></div>
						                <div class="form-section-content">
						                    <div nc-template="common/input/form-group-with-label" 
						                    	nc-label="Address 1">
						                        <input class="form-control" ng-model="formData.Address1" />
						                    </div>
						                    <div nc-template="common/input/form-group-with-label" 
						                    	nc-label="Address 2">
						                        <input class="form-control" ng-model="formData.Address2" />
						                    </div>
						                    <div nc-template="common/input/form-group-with-label" 
						                    	nc-label="Address 3">
						                        <input class="form-control" ng-model="formData.Address3" />
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.OverseaShop"
						                    	nc-label="Oversea Shop"
						                    	nc-template-options-path="addShopAccountForm/OverseaShop">
													<ui-select name="OverseaShop" ng-model="formData.OverseaShop" search-enabled="false">
														<ui-select-match placeholder="- Select Oversea Shop -">
															<span ng-bind="$select.selected.Value"></span>
														</ui-select-match>
														<ui-select-choices repeat="item in overseas">
															<span ng-bind="item.Value"></span>
														</ui-select-choices>
													</ui-select>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.Country"
						                    	nc-label="Country"
						                    	nc-template-options-path="addShopAccountForm/Country">
													<ui-select name="Country" ng-model="formData.Country" search-enabled="false">
														<ui-select-match placeholder="- Select Country -">
															<span ng-bind="$select.selected.CountryName"></span>
														</ui-select-match>
														<ui-select-choices repeat="item in countries">
															<span ng-bind="item.CountryName"></span>
														</ui-select-choices>
													</ui-select>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.CountryCode"
						                    	nc-label="Country Code"
						                    	nc-template-options-path="addShopAccountForm/CountryCode">
													<ui-select name="CountryCode" ng-model="formData.Country" search-enabled="false">
														<ui-select-match placeholder="- Select Country Code -">
															<span ng-bind="$select.selected.CountryCode"></span>
														</ui-select-match>
														<ui-select-choices repeat="item in countries">
															<span ng-bind="item.CountryCode"></span>
														</ui-select-choices>
													</ui-select>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.Province"
						                    	nc-label="Province"
						                    	nc-template-options-path="addShopAccountForm/Province">
													<ui-select name="Province" ng-model="formData.Province" append-to-body="true" search-enabled="false">
														<ui-select-match placeholder="- Select Province -">
															<span ng-bind="$select.selected.ProvinceName"></span>
														</ui-select-match>
														<ui-select-choices style="max-height:300px;" position="down" repeat="item in provinces">
															<span ng-bind="item.ProvinceName"></span>
														</ui-select-choices>
													</ui-select>
						                    </div>
						                    <div ng-show="formData.Province"  
						                    	nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.City"
						                    	nc-label="City"
						                    	nc-template-options-path="addShopAccountForm/City">
													<ui-select name="City" ng-model="formData.City" search-enabled="false">
														<ui-select-match placeholder="- Select City -">
															<span ng-bind="$select.selected.CityName"></span>
														</ui-select-match>
														<ui-select-choices style="max-height:300px;" position="down" repeat="item in cities">
															<span ng-bind="item.CityName"></span>
														</ui-select-choices>
													</ui-select>
						                    </div>
						                    <div ng-show="formData.City" 
						                    	nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.District"
						                    	nc-label="District"
						                    	nc-template-options-path="addShopAccountForm/District">
													<ui-select name="District" ng-model="formData.District" search-enabled="false">
														<ui-select-match placeholder="- Select District -">
															<span ng-bind="$select.selected.DistrictName"></span>
														</ui-select-match>
														<ui-select-choices style="max-height:300px;" position="down" repeat="item in districts">
															<span ng-bind="item.DistrictName"></span>
														</ui-select-choices>
													</ui-select>
						                    </div>
						                    <div ng-show="formData.City" 
						                    	nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.PostalCode"
						                    	nc-template-options-path="addShopAccountForm/PostalCode"
						                    	nc-label="Postal Code">
													<input name="PostalCode" class="form-control" ng-model="formData.PostalCode" />
						                    </div>
						                    <div class="margin-top-40"
						                    	nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.PhoneNumber"
						                    	nc-template-options-path="addShopAccountForm/PhoneNumber"
						                    	nc-label="Phone Number">
													<input name="PhoneNumber" class="form-control" ng-model="formData.PhoneNumber" ng-pattern-restrict="[0-9]*"/>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.FaxNumber"
						                    	nc-template-options-path="addShopAccountForm/FaxNumber"
						                    	nc-label="Fax Number">
													<input name="FaxNumber" class="form-control" ng-model="formData.FaxNumber" ng-pattern-restrict="[0-9]*"/>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.RemittanceFaxNumber"
						                    	nc-template-options-path="addShopAccountForm/RemittanceFaxNumber"
						                    	nc-label="Remittance Fax Number">
													<input name="RemittanceFaxNumber" class="form-control" ng-model="formData.RemittanceFaxNumber" ng-pattern-restrict="[0-9]*"/>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.Telex"
						                    	nc-template-options-path="addShopAccountForm/Telex"
						                    	nc-label="Telex">
													<input name="Telex" class="form-control" ng-model="formData.Telex"/>
						                    </div>
						                    <div class="margin-top-40"
						                    	nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.ContactPersonFirstName"
						                    	nc-template-options-path="addShopAccountForm/ContactPersonFirstName"
						                    	nc-label="Contact Person First Name">
													<input name="ContactPersonFirstName" class="form-control" ng-model="formData.ContactPersonFirstName"/>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.ContactPersonLastName"
						                    	nc-template-options-path="addShopAccountForm/ContactPersonLastName"
						                    	nc-label="Contact Person Last Name">
													<input name="ContactPersonLastName" class="form-control" ng-model="formData.ContactPersonLastName"/>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.Email"
						                    	nc-template-options-path="addShopAccountForm/Email"
						                    	nc-label="Email Address">
													<input type="email" name="Email" class="form-control" ng-model="formData.Email"/>
						                    </div>
						                </div>
						            </div>
						        </div>
						    </div>
						    <div class="row">
						        <div class="col-xs-12">
						            <div class="form-section">
						                <div class="form-section-header">
						                    <h2>Shop Configuration</h2></div>
						                <div class="form-section-content">
						                	<!-- Shop Id -->
						                    <div nc-template="common/input/form-group-with-label"
							                    nc-label="Shop ID"
							                    nc-template-options-path="shopSettingForm/ShopId">
						                        <input class="form-control" type="text" ng-model="formData.ShopId" readonly value="DE39222" disabled/>
						                    </div>

											<!-- Shop Group -->
											<div ng-template="common/input/dropdown"
												ng-template-options="{
													'label' : 'Shop Group'
												}">
												<ui-select ng-model="formData.ShopGroup" search-enabled="false" ng-disabled="true">
													<ui-select-match placeholder="- Select Shop Group -">
													<span ng-bind="$select.selected.name"></span>
													</ui-select-match>
													<ui-select-choices repeat="item.value as item in shopGroupDropdown">
													<span ng-bind="item.name"></span>
													</ui-select-choices>
												</ui-select>
											</div>
											<!-- Shop Type -->
											<div ng-template="common/input/dropdown"
												ng-template-options="{
													'label' : 'Shop Type',
												}">
												<ui-select name="ShopType" ng-model="formData.ShopType" search-enabled="false" ng-disabled="true">
													<ui-select-match placeholder="- Select Shop Type -">
														<span ng-bind="$select.selected.ShopTypeNameEn"></span>
													</ui-select-match>
													<ui-select-choices repeat="item in shoptypes">
														<span ng-bind="item.ShopTypeNameEn"></span>
													</ui-select-choices>
												</ui-select>
											</div>
											<!-- Max local cat -->
											<div ng-template="common/input/text2"
												ng-template-options="{
												'label': 'Max Local Category (LV1)',
												}">
												<input
												class="form-control"
												name="MaxLocalCategory"
												ng-model="formData.MaxLocalCategory"
												readonly
												disabled
												/>
											</div>
											<!-- Commission -->
											<div ng-show="formData.Commissions.length > 0"
												nc-template="common/input/form-group-with-label"
												nc-label="Commission by Category">
						                        <div class="width-field-normal" ng-repeat="item in formData.Commissions track by $index">
						                        	<span class="form-text">{{item.Commission}}% for {{item.NameEn}}</span>
						                        </div>
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
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.TaxPayerId"
						                    	nc-label="Tax Payer ID"
						                    	nc-template-options-path="addShopAccountForm/TaxPayerId">
						                           <input class="form-control" name="TaxPayerId" type="text" ng-model="formData.TaxPayerId" required/>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.TermOfPayment"
						                    	nc-label="Term of Payment"
						                    	nc-template-options-path="addShopAccountForm/TermOfPayment">
													<ui-select name="TermOfPayment" ng-model="formData.TermOfPayment" search-enabled="false" required>
														<ui-select-match placeholder="- Select Term of Payment -">
															<span ng-bind="$select.selected.Description"></span>
														</ui-select-match>
														<ui-select-choices repeat="item in termOfPayments">
															<span ng-bind="item.Description"></span>
														</ui-select-choices>
													</ui-select>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.Payment"
						                    	nc-label="Payment"
						                    	nc-template-options-path="addShopAccountForm/Payment">
						                    		<input type="radio" name="Payment" style="margin-top: 10px" ng-model="formData.Payment" value="1" required/> Check
													<br/>
													<input type="radio" name="Payment" ng-model="formData.Payment" value="2" required/> EFT
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.VendorTaxRate"
						                    	nc-label="Vendor Tax Rate"
						                    	nc-template-options-path="addShopAccountForm/VendorTaxRate">
													<ui-select name="VendorTaxRate" ng-model="formData.VendorTaxRate" ng-disabled="true" search-enabled="false" required>
														<ui-select-match placeholder="- Select Vendor Tax Rate -">
															<span ng-bind="$select.selected.Description"></span>
														</ui-select-match>
														<ui-select-choices repeat="item in vendorTaxRates">
															<span ng-bind="item.Description"></span>
														</ui-select-choices>
													</ui-select>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.WithholdingTax"
						                    	nc-label="Withholding Tax"
						                    	nc-template-options-path="addShopAccountForm/WithholdingTax">
													<ui-select name="WithholdingTax" ng-model="formData.WithholdingTax" ng-disabled="true" search-enabled="false" required>
														<ui-select-match placeholder="- Select Withholding Tax -">
															<span ng-bind="$select.selected.Description"></span>
														</ui-select-match>
														<ui-select-choices repeat="item in withholdingTaxes">
															<span ng-bind="item.Description"></span>
														</ui-select-choices>
													</ui-select>
						                    </div>
						                    <div class="margin-top-10" 
						                    	nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.BankName"
						                    	nc-label="Bank Name"
						                    	nc-template-options-path="addShopAccountForm/BankName">
													<ui-select name="BankName" ng-model="formData.BankName" ng-disabled="true" search-enabled="false" required>
														<ui-select-match placeholder="- Select Bank -">
															<span ng-bind="$select.selected.BankName"></span>
														</ui-select-match>
														<ui-select-choices repeat="item in bankNames">
															<span ng-bind="item.BankName"></span>
														</ui-select-choices>
													</ui-select>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.BankAccountNumber"
						                    	nc-label="Bank Account Number"
						                    	nc-template-options-path="addShopAccountForm/BankAccountNumber">
						                           <input class="form-control" name="BankAccountNumber" type="text" ng-disabled="true" ng-model="formData.BankAccountNumber" required/>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label"
						                    	nc-template-form="form.BankAccountName"
						                    	nc-label="Bank Account Name"
						                    	nc-template-options-path="addShopAccountForm/BankAccountName">
						                           <input class="form-control" name="BankAccountName" type="text" ng-disabled="true" ng-model="formData.BankAccountName" required/>
						                    </div>
										</div>
									</div>
								</div>
							</div>
						    <div class="row">
						        <div class="col-xs-12">
						            <p class="text-align-right"><span class="color-red"><i class="fa fa-asterisk"></i></span> - Required Field</p>
						        </div>
						    </div>
						</div>
					</div>
				</div>
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<button type="button" class="btn btn-white btn-width-xl">Preview</button>
							<button class="btn btn-blue btn-width-xl">Save</button>
						</div>
					</div>
				</div>
		    </div>
        </form>
	</div>

<?php $this->stop() ?>
