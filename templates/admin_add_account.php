<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminAccountAddCtrl" ng-init="init(<?=$params?>)">
		<? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Admin Accounts/" . $title, 'urls' => ['/admin/accounts']]) ?>
		<nc-alert nc-model="alert"></nc-alert>		
		<div ng-show="loading" nc-loading="Loading Admin Account.."></div>
		<div ng-show="saving" nc-loading="Saving Admin Account.."></div>
		<form ng-show="!saving" name="form" class="ah-form sticky-mainform-action" novalidate>
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
					<div id="add-product-more-option-tab-content">
						<div class="row">
							<div class="col-xs-12">
								<div class="form-section">
									<div class="form-section-header"><h2>Admin Account Information</h2></div>
									<div class="form-section-content">
										  <div ng-template="common/input/label"
										  	ng-template-options="{
										  		'label': 'Admin ID'
										  	}"
										  	ng-show="formData.UserId"
										  	>
										  	{{formData.UserId | leadingzero: 2}}
										  </div>
							              <!-- Email -->
							              <div ng-template="common/input/text2"
							                ng-template-options="{
							                  'label': 'Email',
							                  'labelClass': 'required',
							                  'error' : {
							                        'messages': {
							                          'required': 'This is a required field',
							                          'email': 'Only valid email allowed'
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
							                  type="email"
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
							                  ng-pattern="/^[0-9\-]*$/"
							                  ng-pattern-restrict="^[0-9\-]*$"
							                  required />
							              </div>
							              <!-- Employee ID -->
							              <div ng-template="common/input/text2"
							                ng-template-options="{
							                  'label': 'Employee ID',
							                  'labelClass': 'required',
							                  'error' : {
							                        'messages': {
							                          'required': 'This is a required field'
							                        },
							                        'show': $root.isInvalid(form.EmployeeId),
							                        'conditions' : form.EmployeeId.$error
							                   }
							                }">
							                <input
							                  class="form-control"
							                  name="EmployeeId"
							                  ng-model="formData.EmployeeId"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.EmployeeId) }"
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
							                  ng-model="formData.Position"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.Position) }"
							                  required />
							              </div>
							              <!-- Division / BU -->
							              <div ng-template="common/input/text2"
							                ng-template-options="{
							                  'label': 'Division / BU',
							                  'labelClass': 'required',
							                  'error' : {
							                        'messages': {
							                          'required': 'This is a required field'
							                        },
							                        'show': $root.isInvalid(form.Division),
							                        'conditions' : form.Division.$error
							                   }
							                }">
							                <input
							                  class="form-control"
							                  name="Division"
							                  ng-model="formData.Division"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.Division) }"
							                  required />
							              </div>
							              <!-- Password -->
							              <div ng-template="common/input/password"
							                ng-template-options="{
							                  'label': 'Password',
							                  'labelClass': 'required',
							                  'formGroupClass': 'margin-top-30',
							                  'error' : {
							                        'messages': {
							                          'required': 'This is a required field',
							                          'pattern': 'Must have both number and character'
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
							                  required />
							              </div>
							              <!-- Confirm Password -->
							              <div ng-template="common/input/password"
							                ng-template-options="{
							                  'label': 'Confirm Password',
							                  'labelClass': 'required',
							                  'error' : {
							                        'messages': {
							                          'required': 'This is a required field',
							                          'pattern': 'Must have both number and character'
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
							                  ng-pattern="/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/"
							                  ng-pattern-restrict="^[0-9a-zA-Z]*$"
							                  required />
							              </div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<div class="form-section">
									<div class="form-section-header"><h2>Admin Account Roles</h2></div>
									<div class="form-section-content">
							            <div ng-template="common/input/dropdown"
							              ng-template-options="{
							                'label' : 'Admin Role',
							                'labelClass' : 'required'
							              }">
							              <ui-select ng-model="formData.UserGroup" search-enabled="false">
							                <ui-select-match>
							                    <span ng-bind="$select.selected.GroupNameEn"></span>
							                </ui-select-match>
							                <ui-select-choices repeat="item in roles">
							                    <span ng-bind="item.GroupNameEn"></span>
							                </ui-select-choices>
							              </ui-select>
							            </div>
							            <div ng-template="common/link"
							              ng-template-options="{
							              	'link' : '/admin/roles/add'
							              }">Create New Admin Role
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
						<button class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
					</div>
				</div>
			</div>
		</form>
	</div>

<?php $this->stop() ?>