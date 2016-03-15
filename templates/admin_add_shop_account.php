<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
<div ng-controller="AdminShopAddCtrl" ng-init="init(<?=$params?>)">
	<nc-alert nc-model="alert"></nc-alert>
	<? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Shop Accounts/{{title}}", 'urls' => ['/admin/shops']]) ?>
	<div ng-show="loading" nc-loading="Loading Shop Account.."></div>
	<div ng-show="saving" nc-loading="Saving Shop Account.."></div>
	<form ng-show="!saving && !loading" name="form" class="ah-form margin-top-20 sticky-mainform-action" novalidate>
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="required active">
				<a href="#shop_account" data-id="shop_account" aria-controls="shop_account" role="tab" data-toggle="tab">Vital Information</a>
			</li>
			<li role="presentation" class="require">
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
										maxlength="100"
										required />
									</div>
									<!-- Shop Status -->
									<div ng-template="common/input/dropdown"
										ng-template-options="{
										'label' : 'Shop Group',
										'labelClass' : 'required'
										}">
										<ui-select ng-model="formData.ShopGroup" search-enabled="false" required>
										<ui-select-match placeholder="- Select Shop Group -">
										<span ng-bind="$select.selected.name"></span>
										</ui-select-match>
										<ui-select-choices repeat="item in shopGroupDropdown">
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
										<ui-select-choices repeat="item in statusDropdown">
										<span ng-bind="item.name"></span>
										</ui-select-choices>
										</ui-select>
									</div>
									<!-- Max local cat -->
									<div ng-template="common/input/text2"
										ng-template-options="{
										'label': 'Max Local Category (LV1)',
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
										ng-pattern-restrict="^[0-9]*(\.[0-9]*)?$"
										placeholder="8"
										/>
									</div>
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
				                    	nc-template-form="form.BankName"
				                    	nc-label="Bank Name"
				                    	nc-template-options-path="addShopAccountForm/BankName">
				                           <input class="form-control" name="BankName" type="text" ng-model="formData.BankName" required/>
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.BankAccountNumber"
				                    	nc-label="Bank Account Number"
				                    	nc-template-options-path="addShopAccountForm/BankAccountNumber">
				                           <input class="form-control" name="BankAccountNumber" type="text" ng-model="formData.BankAccountNumber" required/>
				                    </div>
				                    <div nc-template="common/input/form-group-with-label"
				                    	nc-template-form="form.BankAccountName"
				                    	nc-label="Bank Account Name"
				                    	nc-template-options-path="addShopAccountForm/BankAccountName">
				                           <input class="form-control" name="BankAccountName" type="text" ng-model="formData.BankAccountName" required/>
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
											maxlength="100"
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
										maxlength="100"
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
										maxlength="50"
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
													<td>{{ user.UserId | leadingzero:2 }}</td>
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
						              nc-template-form="form.Logo"
						              nc-label="Shop Logo File">
						                <button 
						                type="button"
						                name="Logo"
						                class="btn btn-default"
						                ngf-accept="'.png,.jpg,.jpeg'"
						                ngf-select="uploadLogo($file)"
						                ng-class="{'has-error-btn' : isInvalid(form.Logo)}"
						                required>Choose File</button>
						            </div>
						            <div ng-show="formData.Logo"
						              nc-template="common/input/form-group-with-label" 
						              nc-label="Shop Logo Preview">
						                <img
						                  ng-src="{{formData.Logo.url}}"
						                  width="160"
						                  />
						                <a style="display:block;" class="margin-top-5" ng-click="formData.Logo=null"><i class="fa-trash fa"></i> Delete this image</a>
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
				            <p class="text-align-right"><span class="color-red"><i class="fa fa-asterisk"></i></span> - Required Field</p>
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
