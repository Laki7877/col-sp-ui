<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Accounts'])
?>
<?php $this->start('page-body') ?>
	<div ng-controller="SellerAccountAddCtrl" ng-init="init(<?=$params?>)">
		<nc-alert nc-model="alert"></nc-alert>
	    <nc-page-title nc-title="{{title}}" link="{{url}}" icon="fa-user">
	      <div class="page-header">
	        <a class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</a>
	        <button class="btn btn-blue btn-width-xl margin-left-10" ng-click="save()">Save</button>
	      </div>
	    </nc-page-title>
	    <div ng-show="loading" nc-loading="{{loadingMessage}}"></div>
	    <div ng-show="saving" nc-loading="{{savingMessage}}"></div>
	    <form ng-show="!saving && !loading" name="form" class="ah-form sticky-mainform-action" novalidate>
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
					<div id="add-product-more-option-tab-content">
						<div class="row">
							<div class="col-xs-12">
								<div class="form-section">
									<div class="form-section-header"><h2>User Account Information</h2></div>
									<div class="form-section-content">
										  <div ng-template="common/input/label"
										  	ng-template-options="{
										  		'label': 'User ID'
										  	}"
										  	ng-show="formData.UserId"
										  	>
										  	{{formData.UserId}}
										  </div>
							              <!-- Email -->
							              <div ng-template="common/input/text2"
							                ng-template-options="{
							                  'label': 'Email',
							                  'labelClass': 'required',
							                  'error' : {
							                        'messages': {
							                          'required': 'This is a required field',
							                          'email': 'Please enter a valid Email'
							                        },
							                        'show': $root.isInvalid(form.Email),
							                        'conditions' : form.Email.$error
							                   }
							                }">
							                <input
							                  class="form-control"
							                  name="Email"
							                  ng-model="formData.Email"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.Email) }"
											  ng-pattern-restrict="^[^<>]*$"
							                  type="email"
							                  maxlength="255"
							                  required />
							              </div>
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
							                  ng-model="formData.NameEn"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.NameEn) }"
											  ng-pattern-restrict="^[^<>]*$"
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
							                  ng-model="formData.Phone"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.Phone) }"
							                  ng-pattern-restrict="^[0-9]*$"
							                  maxlength="20"
							                  required />
							              </div>
							              <!-- Brand -->
							              <div ng-show="$root.Profile.Shop.ShopGroup != 'ME'"
							              	nc-template="common/input/form-group-with-label"
							              	nc-template-form="form.Brands"
							              	nc-template-options-path="genericForm/BrandVisibility"
							              	nc-label="Brand Visibility">
							              	<ui-select name="Brands" ng-model="formData.Brands" nc-tag-validator nc-max-tag-count="20" multiple>
							              		<ui-select-match placeholder="Search by Brand Name">{{$item.BrandNameEn}}</ui-select-match>
							              		<ui-select-choices repeat="item in brands" refresh="getBrands($select.search)" refresh-delay="1">{{item.BrandNameEn}}</ui-select-choices>
							              	</ui-select>
							              </div>
							              <!-- Old Password -->
							              <!-- <div ng-show="id != 0"
							              	ng-template="common/input/password"
							                ng-template-options="{
							                  'label': 'Old Password',
							                  'formGroupClass': 'margin-top-30'
							                }">
							                <input
							                  class="form-control"
							                  type="{{$parent.inputType}}"
							                  name="OldPassword"
							                  ng-model="formData.OldPassword"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.OldPassword) }"
							                  />
							              </div> -->
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
							                  ng-model="formData.Password"
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
							                  ng-model="formData.ConfirmPassword"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.ConfirmPassword) }"
							                  ng-match="{{formData.Password}}"
							                  maxlength="20"
							                  ng-required="!(id > 0)" />
							              </div>
									</div>
								</div>
							</div>
						</div>
						<div ng-if="!getShopOwner(formData.UserGroup)" class="row">
							<div class="col-xs-12">
								<div class="form-section">
									<div class="form-section-header"><h2>User Roles</h2></div>
									<div class="form-section-content">
										<div ng-if="roles.length > 0">
								            <div ng-template="common/input/dropdown"
								              ng-template-options="{
								                'label' : 'User Role',
								                'labelClass' : 'required',
								                'error' : {
								                        'messages': {
								                          'required': 'This is a required field',
								                        },
								                        'show': isInvalid(form.UserGroup),
								                        'conditions' : form.UserGroup.$error
									            }
								              }">
								              <ui-select name="UserGroup" ng-model="formData.UserGroup" search-enabled="false" required>
								                <ui-select-match placeholder="- Select User Role -">
								                    <span ng-bind="$select.selected.GroupNameEn"></span>
								                </ui-select-match>
								                <ui-select-choices repeat="item in roles">
								                    <span ng-bind="item.GroupNameEn"></span>
								                </ui-select-choices>
								              </ui-select>
								            </div>
							        	</div>
							            <div ng-template="common/link"
							              ng-template-options="{
							              	'label': roles.length > 0 ? '' : 'User Role',
							              	'labelClass': roles.length > 0 ? '' : 'required',
							              	'link' : '/roles/add'
							              }"><div ng-class="{ 'margin-top-7': roles.length == 0 }">Add New User Role</div>
							          </div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<p class="text-align-right"><span class="label color-red"><i class="fa fa-asterisk"></i></span> - Required Field</p>
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
