<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Account'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="SellerRoleAddCtrl" ng-init="init(<?=$params?>)">
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
									<div class="form-section-header"><h2>Role Information</h2></div>
									<div class="form-section-content">
										  <div ng-template="common/input/label"
										  	ng-template-options="{
										  		'label': 'Role ID'
										  	}"
										  	ng-show="formData.GroupId"
										  	>
										  	{{formData.GroupId}}
										  </div>
							              <!-- Name -->
							              <div ng-template="common/input/text2"
							                ng-template-options="{
							                  'label': 'Role Name',
							                  'labelClass': 'required',
							                  'error' : {
							                        'messages': {
							                          'required': 'This is a required field'
							                        },
							                        'show': $root.isInvalid(form.GroupNameEn),
							                        'conditions' : form.GroupNameEn.$error
							                   }
							                }">
							                <input
							                  class="form-control"
							                  name="GroupNameEn"
							                  ng-model="formData.GroupNameEn"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.GroupNameEn) }"
							                  maxlength="100"
							                  required />
							              </div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<div class="form-section">
									<div class="form-section-header"><h2>Role Permission</h2></div>
									<div class="form-section-content">
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'All Features'
											}">
											<label><input ng-model="selectAll.AllFeatures" ng-change="checkAll(selectAll.AllFeatures, 0, formData.Permission.length)" type="checkbox">Select All</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Dashboard'
											}">
											<label ng-repeat="permission in formData.Permission | slice:0:1"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Product'
											}">
											<label ng-repeat="permission in formData.Permission | slice:1:4"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>

											<!-- Edit Product -->
											<label><input ng-model="selectAll.EditProduct" type="checkbox"/>Edit Product</label>
												<!-- Edit Info -->
												<label ng-if="selectAll.EditProduct" class="margin-left-30"><input ng-model="selectAll.EditInformation" type="checkbox"/>Edit Information</label>
													<!-- Edit info children -->
													<label ng-if="selectAll.EditInformation" ng-repeat="permission in formData.Permission | slice:4:7" class="margin-left-60"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
												<!-- Edit product children -->
												<label ng-if="selectAll.EditProduct" ng-repeat="permission in formData.Permission | slice:7:10" class="margin-left-30"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>

											<label ng-repeat="permission in formData.Permission | slice:10:14"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Inventory'
											}">
											<label ng-repeat="permission in formData.Permission | slice:14:16"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Promotion'
											}">
											<label ng-repeat="permission in formData.Permission | slice:16:18"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Orders'
											}">
											<label ng-repeat="permission in formData.Permission | slice:18:22"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Shop Setting'
											}">
											<label ng-repeat="permission in formData.Permission | slice:22:24"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Account'
											}">
											<label ng-repeat="permission in formData.Permission | slice:24:27"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Report'
											}">
											<label ng-repeat="permission in formData.Permission | slice:27:28"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
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
