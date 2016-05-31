<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Shop Accounts'])
?>

<?php $this->start('page-body') ?>
<div ng-controller="AdminShopAddCtrl" ng-init="init(<?=$params?>)">
	<nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="{{title}}" link="{{url}}" icon="fa-user">
      <div class="page-header">
        <a class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</a>
        <button class="btn btn-blue btn-width-xl margin-left-10" ng-click="save()">Save</button>
      </div>
    </nc-page-title>
    <div ng-show="loading" nc-loading="{{loadingMessage}}"></div>
    <div ng-show="saving" nc-loading="{{savingMessage}}"></div>
    <form ng-show="!saving && !loading" name="form" class="ah-form margin-top-20 sticky-mainform-action" novalidate>
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="require active">
				<a href="#shop_account" data-id="shop_account" aria-controls="shop_account" role="tab" data-toggle="tab">Vital Information</a>
			</li>
			<li role="presentation">
				<a href="#shop_profile" data-id="shop_profile" aria-controls="shop_profile" role="tab" data-toggle="tab">Shop Profile</a>
			</li>
		</ul>
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane margin-top-20 active" id="shop_account">
				<div id="add-product-more-option-tab-content">
					<div class="row">
						<div class="col-xs-12">
							<div class="form-section">
								<div class="form-section-header"><h2>Shop Account Information</h2></div>
								<div class="form-section-content">
				                	<!-- Shop Id -->
				                    <div ng-show="id != 0"
					                    nc-template="common/input/form-group-with-label"
					                    nc-label="Shop ID"
					                    nc-template-options-path="shopSettingForm/ShopId">
				                        <input class="form-control" type="text" ng-model="formData.ShopId" readonly value="DE39222" disabled/>
				                    </div>
									<!-- Shop Name -->
									<div ng-template="common/input/text2"
										ng-template-options="{
										'label': 'Shop Name',
										'labelClass': 'required',
										'error' : {
										'messages': {
										'required': 'This is a required field'
										},
										'show': $root.isInvalid(form.ShopNameEn),
										'conditions' : form.ShopNameEn.$error
										}
										}">
										<input
										class="form-control"
										name="ShopNameEn"
										ng-model="formData.ShopNameEn"
										 
										ng-class="{ 'has-error' : $root.isInvalid(form.ShopNameEn) }"
										maxlength="255"
										required />
									</div>
									<!-- Domain Name -->
									<div ng-template="common/input/text2"
										ng-template-options="{
										'label': 'Domain Name'
										}">
										<input
										class="form-control"
										name="DomainName"
										ng-model="formData.DomainName"
										maxlength="255"
										/>
									</div>
									<!-- URL Key -->
									<div ng-template="common/input/text2"
										ng-template-options="{
										'label': 'URL Key',
										'error' : {
											'messages': {
													'pattern': 'Only 0-9 a-z - are allowed (no spaces or underscores)'
												},
											'show': isInvalid(form.UrlKey),
											'conditions' : form.UrlKey.$error
										}
										}">
										<input
										class="form-control"
										name="UrlKey"
										ng-lowercase
										ng-model="formData.UrlKey"
										ng-pattern="/^[0-9a-z\-]+$/"
                  						ng-pattern-restrict="^[^\s]*$"
										ng-class="{ 'has-error' : $root.isInvalid(form.UrlKey) }"
										maxlength="100"
										/>
									</div>
									<!-- Shop Group -->
									<div ng-template="common/input/dropdown"
										ng-template-options="{
										'label' : 'Shop Group',
										'labelClass' : 'required',
											'error' : {
												'messages': {
												'required': 'This is a required field',
												},
												'show': isInvalid(form.ShopGroup),
												'conditions' : form.ShopGroup.$error
											}
										}">
										<ui-select name="ShopGroup" ng-model="formData.ShopGroup" search-enabled="false" required>
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
										'labelClass' : 'required',
										'error' : {
										'messages': {
										'required': 'This is a required field',
										},
										'show': isInvalid(form.ShopType),
										'conditions' : form.ShopType.$error
										}
										}">
										<ui-select name="ShopType" ng-model="formData.ShopType" search-enabled="false" required>
										<ui-select-match placeholder="- Select Shop Type -">
										<span ng-bind="$select.selected.ShopTypeNameEn"></span>
										</ui-select-match>
										<ui-select-choices repeat="item in shoptypes">
										<span ng-bind="item.ShopTypeNameEn"></span>
										</ui-select-choices>
										</ui-select>
									</div>
									<!-- Create new Shop type -->
									<div ng-template="common/link"
										ng-template-options="{
										'link' : '/admin/shoptypes/add'
									}">Add Shop Type
									</div>
									<!-- Shop Status -->
									<div ng-template="common/input/dropdown"
										ng-template-options="{
										'label' : 'Shop Status',
										'labelClass' : 'required'
										}">
										<ui-select ng-model="formData.Status" search-enabled="false" required>
											<ui-select-match placeholder="- Select Shop Status -">
												<span ng-bind="$select.selected.name"></span>
											</ui-select-match>
											<ui-select-choices repeat="item.value as item in statusDropdown">
												<span ng-bind="item.name"></span>
											</ui-select-choices>
										</ui-select>
									</div>
									<!-- Max local cat -->
									<div ng-if="!(id != 0)">
										<div ng-template="common/input/text2"
											ng-template-options="{
											'label': 'Clone Global Category',
											'inputSize' : 'small',
											'error' : {
											'show': $root.isInvalid(form.CloneGlobalCategory),
											'conditions' : form.CloneGlobalCategory.$error
											}
											}">
											<ui-select name="CloneGlobalCategory" ng-model="formData.CloneGlobalCategory" search-enabled="false" required>
												<ui-select-match placeholder="- Select Type -">
													<span ng-bind="$select.selected.name"></span>
												</ui-select-match>
												<ui-select-choices repeat="item.value as item in yesNoDropdown">
													<span ng-bind="item.name"></span>
												</ui-select-choices>
											</ui-select>
										</div>
									</div>
									<!-- Max local cat -->
									<div ng-template="common/input/text2"
										ng-template-options="{
										'label': 'Maximum Local Category',
										'inputSize' : 'small',
										'error' : {
										'show': $root.isInvalid(form.MaxLocalCategory),
										'conditions' : form.MaxLocalCategory.$error
										}
										}">
										<input
										class="form-control"
										name="MaxLocalCategory"
										ng-model="formData.MaxLocalCategory"
										ng-pattern-restrict="^[0-9]*$"
										placeholder="50"
										maxlength="5"
										/>
									</div>
									<!-- Comission -->
									<div nc-template="common/input/form-group-with-label"
										nc-label="Commission by Category">
				                        <div class="width-field-normal" ng-repeat="item in formData.Commissions track by $index">
				                        	<span class="form-text"><a ng-click="openCommissionSelector(item)">{{item.Commission}}% for {{item.NameEn}}</a></span>
				                            <i class="clickable color-dark-grey fa fa-trash margin-left-10" ng-click="formData.Commissions.splice($index, 1)"></i>
				                        </div>
				                        <div class="width-field-normal">
				                            <a class="like-text form-text" ng-click="openCommissionSelector()">
				                                <i class="fa fa-plus-circle color-theme"></i> Add Commission Rule
				                            </a>
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
				                           <input class="form-control" name="TaxPayerId" type="text" ng-model="formData.TaxPayerId"   maxlength="13" required/>
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.TermOfPayment"
				                    	nc-label="Term of Payment"
				                    	nc-template-options-path="addShopAccountForm/TermOfPayment">
											<ui-select name="TermOfPayment" ng-model="formData.TermPayment" search-enabled="false" required>
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
											<ui-select name="VendorTaxRate" ng-model="formData.VendorTaxRate" search-enabled="false" required>
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
											<ui-select name="WithholdingTax" ng-model="formData.WithholdingTax" search-enabled="false" required>
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
											<ui-select name="BankName" ng-model="formData.BankName" search-enabled="false" required>
												<ui-select-match placeholder="- Select Bank -">
													<span ng-bind="$select.selected.BankName"></span>
												</ui-select-match>
												<ui-select-choices repeat="item in bankNames">
													<div ng-bind="item.BankName" class="column-text-ellipsis"></div>
												</ui-select-choices>
											</ui-select>
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.BankAccountNumber"
				                    	nc-label="Bank Account Number"
				                    	nc-template-options-path="addShopAccountForm/BankAccountNumber">
				                           <input class="form-control" name="BankAccountNumber" type="text" ng-model="formData.BankAccountNumber" ng-pattern-restrict="^[0-9]*$" maxlength="15" required/>
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.BankAccountName"
				                    	nc-label="Bank Account Name"
				                    	nc-template-options-path="addShopAccountForm/BankAccountName">
				                           <input class="form-control" name="BankAccountName" type="text" ng-model="formData.BankAccountName"   maxlength="80" required/>
				                    </div>
								</div>
							</div>
						</div>
					</div>
					<div ng-if="id == 0" class="row">
						<div class="col-xs-12">
							<div class="form-section">
								<div class="form-section-header"><h2>Shop Owner Information</h2></div>
								<div class="form-section-content">
								    <!-- Name -->
								    <div ng-template="common/input/text2"
										ng-template-options="{
										  'label': 'Name',
										  'labelClass': 'required',
										  'error' : {
											'messages': {
											'required': 'This is a required field'
											},
											'show': $root.isInvalid(form.NameEn),
											'conditions' : form.NameEn.$error
											}
											}">
											<input
											class="form-control"
											name="NameEn"
											ng-model="formData.ShopOwner.NameEn"
											ng-class="{ 'has-error' : $root.isInvalid(form.NameEn) }"
											 
											maxlength="255"
											required />
									</div>
									<!-- Position -->
									<div ng-template="common/input/text2"
										ng-template-options="{
										'label': 'Position',
										'labelClass': 'required',
										'error' : {
										'messages': {
										'required': 'This is a required field'
										},
										'show': $root.isInvalid(form.Position),
										'conditions' : form.Position.$error
										}
										}">
										<input
										class="form-control"
										name="Position"
										ng-model="formData.ShopOwner.Position"
										ng-class="{ 'has-error' : $root.isInvalid(form.Position) }"
										maxlength="255"
										required />
									</div>
									<!-- Email -->
									<div ng-template="common/input/text2"
										ng-template-options="{
										'label': 'Email',
										'labelClass': 'required',
										'error' : {
											'messages': {
												'required': 'This is a required field',
												'email': 'Please enter valid email address'
											},
											'show': $root.isInvalid(form.Email),
											'conditions' : form.Email.$error
											}
										}">
										<input
										class="form-control"
										name="Email"
										 
										ng-model="formData.ShopOwner.Email"
										ng-class="{ 'has-error' : $root.isInvalid(form.Email) }"
										type="email"
										maxlength="255"
										required />
									</div>
									<!-- Phone Number -->
									<div ng-template="common/input/text2"
										ng-template-options="{
										'label': 'Phone Number',
										'labelClass': 'required',
										'error' : {
										'messages': {
										'required': 'This is a required field'
										},
										'show': $root.isInvalid(form.Phone),
										'conditions' : form.Phone.$error
										}
										}">
										<input
										class="form-control"
										name="Phone"
										ng-model="formData.ShopOwner.Phone"
										ng-class="{ 'has-error' : $root.isInvalid(form.Phone) }"
										ng-pattern-restrict="^[0-9]*$"
										maxlength="20"
										required />
									</div>
									<!-- Password -->
									<div ng-template="common/input/password"
										ng-template-options="{
										'label': 'Password',
										'labelClass': { 'required' : !(id > 0) },
										'formGroupClass': 'margin-top-30',
										'error' : {
										'messages': {
										'required': 'This is a required field',
										'pattern': 'Your password must contain letters and numbers',
										'minlength': 'Your password must be 8-20 characters long',
										'maxlength': 'Your password must be 8-20 characters long'
										},
										'show': $root.isInvalid(form.Password),
										'conditions' : form.Password.$error
										}
										}">
										<input
										class="form-control"
										type="{{$parent.inputType}}"
										name="Password"
										ng-model="formData.ShopOwner.Password"
										ng-class="{ 'has-error' : $root.isInvalid(form.Password) }"
										ng-pattern="/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/"
										ng-pattern-restrict="^[0-9a-zA-Z]*$"
										ng-maxlength="20"
										ng-minlength="8"
										maxlength="20"
										ng-required="!(id > 0)" />
									</div>
									<!-- Confirm Password -->
									<div ng-template="common/input/password"
										ng-template-options="{
										'label': 'Confirm Password',
										'labelClass': { 'required' : !(id > 0) },
										'error' : {
										'messages': {
										'required': 'This is a required field',
										'match': 'Your password and password confirmation do not match'
										},
										'show': $root.isInvalid(form.ConfirmPassword),
										'conditions' : form.ConfirmPassword.$error
										}
										}">
										<input
										class="form-control"
										type="{{$parent.inputType}}"
										name="ConfirmPassword"
										ng-model="formData.ShopOwner.ConfirmPassword"
										ng-class="{ 'has-error' : $root.isInvalid(form.ConfirmPassword) }"
										ng-match="{{formData.ShopOwner.Password}}"
										maxlength="20"
										ng-required="!(id > 0)" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div ng-if="id > 0" class="row">
						<div class="col-xs-12">
							<div class="form-section">
								<div class="form-section-header"><h2>Shop Users</h2></div>
								<div class="form-section-content">
									<div class="form-group">
										<table class="table table-hover no-margin">
											<thead>
												<tr>
													<th>ID</th>
													<th>Name</th>
													<th>Email</th>
													<th>Role</th>
													<th>Status</th>
													<th class="text-align-center">Reset Password</th>
													<th class="text-align-center">Action</th>
												</tr>
											</thead>
											<tbody>
											<tr ng-repeat="user in formData.Users track by user.UserId">
													<td>{{ user.UserId }}</td>
													<td>{{ user.NameEn }}</td>
													<td>{{ user.Email }}</td>
													<td>{{ user.UserGroup[0] }}</td>
													<td>{{ user.Status | mapDropdown:statusDropdown }}</td>
													<td class="text-align-center">
														<a class="btn btn-white btn-width-xl" ng-click="resetPassword(user)">Reset</a>
													</td>
													<td class="text-align-center">
													<a class="btn btn-white btn-width-xl" ng-click="loginAs(user)">Login-As</a>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
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
			<div role="tabpanel" class="tab-pane margin-top-20" id="shop_profile">
				<div id="shop-setting-content">
				    <div class="row">
				        <div class="col-xs-12">
				            <div class="form-section">
				                <div class="form-section-header">
				                    <h2>Shop Information</h2></div>
				                <div class="form-section-content">
						                    <!-- Shop Logo -->
						            <div nc-template="common/input/form-group-with-label"
						            	nc-template-options-path="addShopAccountForm/Logo"
						              nc-template-form="form.Logo"
						              nc-label="Shop Logo">
						                <button
						                type="button"
						                name="Logo"
						                class="btn btn-default"
						                ngf-accept="'.jpg,.jpeg'"
					                	ngf-dimensions="$width >= 500 && $width <= 1000 && $height >= 500 && $height <= 1000"
						                ngf-ratio="1:1"
						                ngf-max-size="'5MB'"
						                ngf-select="uploadLogo($file)"
						                ng-class="{'has-error-btn' : isInvalid(form.Logo)}"
						                ng-model="formData._dummy"
						                >Choose File</button>
						            </div>
						            <div ng-show="formData.ShopImage.Url"
						              nc-template="common/input/form-group-with-label"
						              nc-label="Shop Logo Preview">
						                <img
						                  ng-src="{{formData.ShopImage.Url}}"
						                  width="160"
						                  />
						                <a style="display:block;" class="margin-top-5" ng-click="formData.ShopImage=null"><i class="fa-trash fa"></i> Delete this image</a>
						            </div>						            
				                    <div nc-template="common/input/form-group-with-label" 
				                    	nc-label="Shop Description (English)" 
				                    	nc-template-options-path="shopSettingForm/ShopDescriptionEn">
				                        <textarea class="form-control" rows="4" type="text" ng-model="formData.ShopDescriptionEn"   maxlength="500"></textarea>
				                    </div>

				                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Description (ไทย)" nc-template-options-path="shopSettingForm/ShopDescriptionTh">
				                        <textarea class="form-control" rows="4" type="text" ng-model="formData.ShopDescriptionTh"   maxlength="500"></textarea>
				                    </div>

				                    <div nc-template="common/input/form-group-with-label" nc-label="Float Message (English)" nc-template-options-path="shopSettingForm/FloatMessageEn">
				                        <input class="form-control" type="text" ng-model="formData.FloatMessageEn"   maxlength="255"/>
				                    </div>

				                    <div nc-template="common/input/form-group-with-label" nc-label="Float Message (ไทย)" nc-template-options-path="shopSettingForm/FloatMessageTh">
				                        <input class="form-control" type="text" ng-model="formData.FloatMessageTh"   maxlength="255"/>
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
				                    <div nc-template="common/input/form-group-with-label" nc-label="Facebook" 
				                    	nc-template-options-path="shopSettingForm/SocialMediaLink"
				                    	nc-template-form="form.Facebook">
				                        <input class="form-control" type="url" ng-model="formData.Facebook"    maxlength="255" />
				                    </div>
				                    <div nc-template="common/input/form-group-with-label" nc-label="YouTube" 
				                    	nc-template-options-path="shopSettingForm/SocialMediaLink"
				                    	nc-template-form="form.YouTube">
				                        <input class="form-control" type="url" ng-model="formData.YouTube"    maxlength="255"/>
				                    </div>
				                    <div nc-template="common/input/form-group-with-label" nc-label="Twitter" 
				                    	nc-template-options-path="shopSettingForm/SocialMediaLink"
				                    	nc-template-form="form.Twitter">
				                        <input class="form-control" type="url" ng-model="formData.Twitter"    maxlength="255"/>
				                    </div>
				                    <div nc-template="common/input/form-group-with-label" nc-label="Instagram" 
				                    	nc-template-options-path="shopSettingForm/SocialMediaLink"
				                    	nc-template-form="form.Instagram">
				                        <input class="form-control" type="url" ng-model="formData.Instagram"    maxlength="255"/>
				                    </div>
				                    <div nc-template="common/input/form-group-with-label" nc-label="Pinterest"
				                     	nc-template-options-path="shopSettingForm/SocialMediaLink"
				                     	nc-template-form="form.Pinterest">
				                        <input class="form-control" type="url" ng-model="formData.Pinterest"    maxlength="255"/>
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
				                        <input class="form-control" ng-model="formData.VendorAddressLine1"   maxlength="35" />
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-label="Address 2">
				                        <input class="form-control" ng-model="formData.VendorAddressLine2"   maxlength="35"/>
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-label="Address 3">
				                        <input class="form-control" ng-model="formData.VendorAddressLine3"   maxlength="35"/>
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.OverseaShop"
				                    	nc-label="Oversea Shop"
				                    	nc-template-options-path="addShopAccountForm/OverseaShop">
											<ui-select name="OverseaShop" ng-model="formData.OverseasVendorIndicator" search-enabled="false">
												<ui-select-match placeholder="- Select Oversea Shop -">
													<span ng-bind="$select.selected.Value"></span>
												</ui-select-match>
												<ui-select-choices repeat="item.Key as item in overseas">
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
				                    <div ng-if="formData.Province">
				                    <div nc-template="common/input/form-group-with-label"
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
					                </div>
				                    <div ng-if="formData.City">
				                    <div nc-template="common/input/form-group-with-label"
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
					                </div>
									<div ng-if="formData.District">
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.PostalCode"
				                    	nc-template-options-path="addShopAccountForm/PostalCode"
				                    	nc-label="Postal Code">
											<ui-select name="PostalCode" ng-model="formData.PostalCode" search-enabled="false">
												<ui-select-match placeholder="- Select Postal Code -">
													<span ng-bind="$select.selected.PostCode"></span>
												</ui-select-match>
												<ui-select-choices style="max-height:300px;" position="down" repeat="item in postals">
													<span ng-bind="item.PostCode"></span>
												</ui-select-choices>
											</ui-select>
				                    </div>
				          		    </div>
				                    <div class="margin-top-40"
				                    	nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.PhoneNumber"
				                    	nc-template-options-path="addShopAccountForm/PhoneNumber"
				                    	nc-label="Phone Number">
											<input name="PhoneNumber" class="form-control" ng-model="formData.PhoneNumber" ng-pattern-restrict="^[0-9]*$" maxlength="15" />
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.FaxNumber"
				                    	nc-template-options-path="addShopAccountForm/FaxNumber"
				                    	nc-label="Fax Number">
											<input name="FaxNumber" class="form-control" ng-model="formData.FaxNumber" ng-pattern-restrict="^[0-9]*$" maxlength="15" />
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.RemittanceFaxNumber"
				                    	nc-template-options-path="addShopAccountForm/RemittanceFaxNumber"
				                    	nc-label="Remittance Fax Number">
											<input name="RemittanceFaxNumber" class="form-control" ng-model="formData.RemittanceFaxNumber" ng-pattern-restrict="^[0-9]*$" maxlength="18" />
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.Telex"
				                    	nc-template-options-path="addShopAccountForm/Telex"
				                    	nc-label="Telex">
											<input name="Telex" class="form-control" ng-model="formData.Telex" ng-pattern-restrict="^[0-9]*$" maxlength="15" />
				                    </div>
				                    <div class="margin-top-40"
				                    	nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.ContactPersonFirstName"
				                    	nc-template-options-path="addShopAccountForm/ContactPersonFirstName"
				                    	nc-label="Contact Person First Name">
											<input name="ContactPersonFirstName" class="form-control" ng-model="formData.ContactPersonFirstName"   maxlength="15" />
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.ContactPersonLastName"
				                    	nc-template-options-path="addShopAccountForm/ContactPersonLastName"
				                    	nc-label="Contact Person Last Name">
											<input name="ContactPersonLastName" class="form-control" ng-model="formData.ContactPersonLastName"   maxlength="20" />
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.ShopEmail"
				                    	nc-template-options-path="addShopAccountForm/Email"
				                    	nc-label="Email Address">
											<input type="email" name="ShopEmail" class="form-control" ng-model="formData.Email"   maxlength="50" />
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
				</div>
			</div>
		</div>
		<div class="add-product-form-action main-form-action full-width-row">
			<div class="container-fluid">
				<div class="float-right">
					<a href="#" class="link-btn-plain" ng-click="cancel()">Cancel</a>
					<button type="button" class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
				</div>
			</div>
		</div>
	</form>
</div>

<?php $this->stop() ?>
