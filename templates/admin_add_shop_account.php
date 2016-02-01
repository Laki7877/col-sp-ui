<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminShopAddCtrl" ng-init="init(<?=$params?>)">
		<? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Shop Accounts/". $title, 'urls' => ['/admin/shops']]) ?>
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
										<div ng-template="common/input/label"
											ng-template-options="{
												'label': 'Shop ID'
											}"
											ng-show="formData.ShopId"
											>
											{{formData.ShopId | leadingzero: 2}}
										</div>
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
							                  required />
							            </div>
							            <div ng-template="common/input/dropdown"
							              ng-template-options="{
							                'label' : 'Shop Type'
							              }">
							              <ui-select ng-model="formData.ShopType" search-enabled="false">
							                <ui-select-match placeholder="- Select Shop Type -">
							                    <span ng-bind="$select.selected.ShopTypeNameEn"></span>
							                </ui-select-match>
							                <ui-select-choices repeat="item in shoptypes">
							                    <span ng-bind="item.ShopTypeNameEn"></span>
							                </ui-select-choices>
							              </ui-select>
							            </div>
							            <div ng-template="common/link"
							              ng-template-options="{
							              	'link' : '/admin/shoptypes/add'
							              }">Create New Shop Type
							          	</div>
							            <div ng-template="common/input/dropdown"
							              ng-template-options="{
							                'label' : 'Shop Status'
							              }">
							              <ui-select ng-model="formData.Status" search-enabled="false">
							                <ui-select-match placeholder="- Select Shop Status -">
							                    <span ng-bind="$select.selected.name"></span>
							                </ui-select-match>
							                <ui-select-choices repeat="item in statusDropdown">
							                    <span ng-bind="item.name"></span>
							                </ui-select-choices>
							              </ui-select>
							            </div>
					                    <div ng-template="common/input/text2"
					                      ng-template-options="{
					                        'label': 'Commission (%)',
					                      	'labelClass': 'required',
					                      	'inputSize' : 'small',
					                        'error' : {
					                              'messages': {
							                          	'required': 'This is a required field',
					                            		'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
					                                },
					                              'show': $root.isInvalid(form.Commission),
					                              'conditions' : form.Commission.$error
					                         }
					                      }">
					                      <input
					                        class="form-control"
					                        name="Commission"
					                        ng-model="formData.Commission"
                    						ng-pattern="/^\d+(\.\d{1,})?$/"
					                        ng-class="{ 'has-error' : $root.isInvalid(form.Commission) }"
					                        maxlength="20"
					                        />
					                    </div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
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
							                  ng-model="formData.Shopowner.NameEn"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.NameEn) }"
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
							                  ng-model="formData.Shopowner.Position"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.Position) }"
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
							                          'email': 'Only valid email allowed'
							                        },
							                        'show': $root.isInvalid(form.Email),
							                        'conditions' : form.Email.$error
							                   }
							                }">
							                <input
							                  class="form-control"
							                  name="Email"
							                  ng-model="formData.Shopowner.Email"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.Email) }"
							                  type="email"
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
							                  ng-model="formData.Shopowner.Phone"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.Phone) }"
							                  ng-pattern="/^[0-9\-]*$/"
							                  ng-pattern-restrict="^[0-9\-]*$"
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
							                  ng-model="formData.Shopowner.Password"
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
							                  ng-model="formData.Shopowner.ConfirmPassword"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.ConfirmPassword) }"
							                  ng-pattern="/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/"
							                  ng-pattern-restrict="^[0-9a-zA-Z]*$"
							                  required />
							              </div>
									</div>
								</div>
							</div>
						</div>
						<div ng-if="formData.ShopId > 0" class="row">
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
														<th class="text-align-center">Action</th> 
													</tr> 
												</thead> 
												<tbody> 
													<tr> 
														<td>{{ Shopowner.UserId | leadingzero:2 }}</td> 
														<td>{{ Shopowner.NameEn }}</td> 
														<td>{{ Shopowner.Email }}</td>
														<td>Shop Owner</td>
														<td>{{ Shopowner.Status | mapDropdown:statusDropdown }}</td>
														<td class="text-align-center"><a class="btn btn-white btn-width-xl">Login-As</a></td> 
													</tr>
													<tr ng-repeat="user in formData.Users"> 
														<td>{{ user.UserId | leadingzero:2 }}</td> 
														<td>{{ user.NameEn }}</td> 
														<td>{{ user.Email }}</td>
														<td>{{ user.UserGroup[0] }}</td>
														<td>{{ user.Status | mapDropdown:statusDropdown }}</td>
														<td class="text-align-center"><a class="btn btn-white btn-width-xl">Login-As</a></td> 
													</tr>
												</tbody>
											</table>
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
						<button class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
					</div>
				</div>
			</div>
		</form>
	</div>

<?php $this->stop() ?>