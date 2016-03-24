<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminShoptypeAddCtrl" ng-init="init(<?=$params?>)">
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
				<div class="tab-pane margin-top-30 active" id="more_option">
					<div id="add-product-more-option-tab-content">
						<div class="row">
							<div class="col-xs-12">
								<div class="form-section">
									<div class="form-section-header"><h2>Admin Account Information</h2></div>
									<div class="form-section-content">
										  <div ng-template="common/input/label"
										  	ng-template-options="{
										  		'label': 'Shop Type ID'
										  	}"
										  	ng-show="formData.ShopTypeId"
										  	>
										  	{{formData.ShopTypeId | leadingzero:2}}
										  </div>
							              <!-- Name -->
							              <div ng-template="common/input/text2"
							                ng-template-options="{
							                  'label': 'Type Name',
							                  'labelClass': 'required',
							                  'error' : {
							                        'messages': {
							                          'required': 'This is a required field'
							                        },
							                        'show': $root.isInvalid(form.ShopTypeNameEn),
							                        'conditions' : form.ShopTypeNameEn.$error
							                   }
							                }">
							                <input
							                  class="form-control"
							                  name="ShopTypeNameEn"
							                  ng-model="formData.ShopTypeNameEn"
							                  ng-class="{ 'has-error' : $root.isInvalid(form.ShopTypeNameEn) }"
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
									<div class="form-section-header"><h2>Shop Type Permission</h2></div>
									<div class="form-section-content">
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Shop Type Permission'
											}">
											<label><input ng-model="selectAll.ShopTypePermission" ng-change="checkAll(selectAll.ShopTypePermission, 'ShopTypePermission')" type="checkbox">Select All</label>
											<label ng-repeat="permission in formData.Permission | slice:0:4"><input name="permission{{permission.PermissionId}}" ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
										</div>
										<div ng-template="common/input/multiline-checkbox"
											ng-template-options="{
												'label' : 'Appearance Setting'
											}"
											ng-show="formData.Permission[3].check">
											<label><input ng-model="selectAll.AppearanceSetting" ng-change="checkAll(selectAll.AppearanceSetting, 'AppearanceSetting')" type="checkbox">Select All</label>
											<label ng-repeat="permission in formData.Permission | slice:4:8"><input name="permission{{permission.PermissionId}}" ng-model="permission.check" type="checkbox">{{ permission.PermissionName }}</label>
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
