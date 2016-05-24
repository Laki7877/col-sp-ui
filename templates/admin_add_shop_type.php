<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Shop Type'])
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
										  <div nc-template="common/input/form-group-with-label"
										  	nc-label="Shop Type ID"
										  	ng-show="formData.ShopTypeId">
												<div class="text-result">
													{{formData.ShopTypeId}}
												</div>
										  </div>
							              <!-- Name -->
							              <div nc-template="common/input/form-group-with-label"
							              	nc-template-form="form.ShopTypeNameEn"
							                nc-template-options-path="addShopTypeForm/ShopTypeNameEn"
							                nc-label="Type Name">
							                <input class="form-control"
							                  name="ShopTypeNameEn"
							                  ng-model="formData.ShopTypeNameEn"
							                  maxlength="255"
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
											ng-template-options="{ 'label' : 'All Features' }">
											<label><input ng-model="selectAll" ng-change="checkAll(selectAll)" type="checkbox">Select All</label>
										</div>
										<div ng-repeat="name in group">
											<div ng-template="common/input/multiline-checkbox"
												ng-template-options="{ 'label' : name }">
												<div ng-include="'common/roleNode'" ng-repeat="p in formData.Permissions[name]"></div>
											</div>
										</div>
										<!-- template -->
										<div>
											<div ng-template="common/input/multiline-checkbox"
												ng-template-options="{ 'label' : 'Template' }">
												<div ng-repeat="p in formData.Themes">
												 <label>
												 	<i class="fa fa-level-up fa-rotate-90 child-checkbox-enter" aria-hidden="true"></i>
													<input ng-model="p.check" type="checkbox">{{ p.ThemeName }}
												</label>
												</div>
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
