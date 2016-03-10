<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminRoleAddCtrl" ng-init="init(<?=$params?>)">
		<nc-alert nc-model="alert"></nc-alert>
		<?php $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Admin Roles/{{title}}", 'urls' => ['/admin/roles']]) ?>
		<div ng-show="loading" nc-loading="Loading Admin Role.."></div>
		<div ng-show="saving" nc-loading="Saving Admin Role.."></div>
		<form ng-show="!saving && !loading" name="form" class="ah-form sticky-mainform-action" novalidate>
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
										  		'label': 'Admin Role ID'
										  	}"
										  	ng-show="formData.GroupId"
										  	>
										  	{{formData.GroupId | leadingzero: 2}}
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
												'label' : 'Account'
											}">
											<label ng-repeat="permission in formData.Permission | slice:0:3"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Product'
											}">
											<label ng-repeat="permission in formData.Permission | slice:3:8"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Promotion'
											}">
											<label ng-repeat="permission in formData.Permission | slice:8:9"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Report'
											}">
											<label ng-repeat="permission in formData.Permission | slice:9:10"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Other'
											}">
											<label ng-repeat="permission in formData.Permission | slice:10"><input ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
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