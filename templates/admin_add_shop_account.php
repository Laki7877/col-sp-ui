<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
<div ng-controller="AdminShopAddCtrl" ng-init="init(<?=$params?>)">
	<nc-alert nc-model="alert"></nc-alert>
	<? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Shop Accounts/{{title}}", 'urls' => ['/admin/shops']]) ?>
	<div ng-show="loading" nc-loading="Loading Shop Account.."></div>
	<div ng-show="saving" nc-loading="Saving Shop Account.."></div>
	<form ng-show="!saving && !loading" name="form" class="ah-form sticky-mainform-action" novalidate>
		<div class="tab-content">
			<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
				<div id="add-product-more-option-tab-content">
					<div class="row">
						<div class="col-xs-12">
							<div class="form-section">
								<div class="form-section-header"><h2>Shop Account Information</h2></div>
								<div class="form-section-content">
									<!-- Shop ID -->
									<div ng-template="common/input/label"
										ng-template-options="{
										'label': 'Shop ID'
										}"
										ng-show="formData.ShopId"
										>
										{{formData.ShopId | leadingzero: 2}}
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
										ng-pattern-restrict="^[0-9]*(\.[0-9]*)?$"
										/>
									</div>
									<!-- Commission -->
									<div ng-template="common/input/text2"
										ng-template-options="{
										'label': 'Commission (%)',
										'inputSize' : 'small',
										'error' : {
										'messages': {
										'pattern': 'Only numbers and decimals (up to 2 digits) allowed',
										'minnumber': 'Please enter between 0% and 100%',
										'maxnumber': 'Please enter between 0% and 100%'
										},
										'show': $root.isInvalid(form.Commission),
										'conditions' : form.Commission.$error
										}
										}">
										<input
										class="form-control"
										name="Commission"
										ng-model="formData.Commission"
										ng-pattern="/^[\w]+(\.\w{0,2})?$/"
										ng-pattern-restrict="^[0-9]*(\.[0-9]*)?$"
										ng-class="{ 'has-error' : $root.isInvalid(form.Commission) }"
										maxlength="20"
										ng-maxnumber="100",
										ng-minnumber="0"
										/>
									</div>
									<div nc-template="common/input/form-group-with-label"
										nc-label="Commission by Category">
				                        <div class="width-field-normal" ng-repeat="item in formData.Commissions track by $index">
				                        	<span class="form-text"><a ng-click="openCommissionSelector(item)">{{item.Commission}}% for {{item.NameEn}}</a>
				                            </span>
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
