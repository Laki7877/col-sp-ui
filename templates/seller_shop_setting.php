<?= $this->layout('layouts/page-with-sidebar', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="SellerShopSettingCtrl" ng-init='init()'>
			  <div ng-show="loading" nc-loading="Loading Shop Settings.."></div>
				<nc-alert nc-model="alert"></nc-alert>
        <form class="ah-form sticky-mainform-action" name="form" ng-submit="save()" ng-show="!loading">
            <nc-page-title nc-title="Shop Profile" icon="fa-sliders">
                <button type="button" class="btn btn-white btn-width-xl margin-right-10">Preview</button>
                <button class="btn btn-blue btn-width-xl">Save</button>
            </nc-page-title>
		    <div>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<div id="shop-setting-content">
						    <div class="row">
						        <div class="col-xs-12">
						            <div class="form-section">
						                <div class="form-section-header">
						                    <h2>Shop Information</h2></div>
						                <div class="form-section-content">
											<!-- Shop Status -->
											<div ng-template="common/input/dropdown"
												ng-template-options="{
												'label' : 'Shop Status',
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
						                    <!-- Shop Logo -->
								            <div nc-template="common/input/form-group-with-label"
								              nc-template-form="form.Logo"
								              nc-label="Shop Logo file">
								                <button
								                type="button"
								                name="Logo"
								                class="btn btn-default"
								                ngf-accept="'.png,.jpg,.jpeg'"
								                ngf-select="uploadLogo($file)"
								                ng-class="{'has-error-btn' : isInvalid(form.Logo)}"
								                required>Choose File</button>
								            </div>
								            <div ng-show="formData.ShopImage.url"
								              nc-template="common/input/form-group-with-label"
								              nc-label="Logo Preview">
								                <img
								                  ng-src="{{formData.ShopImage.url}}"
								                  width="160"
								                  />
								                <a style="display:block;" class="margin-top-5" ng-click="formData.Logo=null"><i class="fa-trash fa"></i> Delete this image</a>
								            </div>
						                    <div nc-template="common/input/form-group-with-label" nc-label="Shop Name" nc-template-options-path="shopSettingForm/ShopNameEn">
						                        <input class="form-control" type="text" ng-model="formData.ShopNameEn" ng-pattern="/^[^<>]+$/" required/>
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
						            <div class="form-section">
						                <div class="form-section-header">
						                    <h2>Shop Configuration</h2></div>
						                <div class="form-section-content">
						                	<!-- Shop Id -->
						                    <div nc-template="common/input/form-group-with-label"
							                    nc-label="Shop ID"
							                    nc-template-options-path="shopSettingForm/ShopId">
						                        <input class="form-control" type="text" ng-model="formData.ShopId" readonly value="DE39222" disabled/>
						                    </div>

											<!-- Shop Group -->
											<div ng-template="common/input/dropdown"
												ng-template-options="{
													'label' : 'Shop Group'
												}">
												<ui-select ng-model="formData.ShopGroup" search-enabled="false" ng-disabled="true">
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
												}">
												<ui-select name="ShopType" ng-model="formData.ShopType" search-enabled="false" ng-disabled="true">
													<ui-select-match placeholder="- Select Shop Type -">
														<span ng-bind="$select.selected.ShopTypeNameEn"></span>
													</ui-select-match>
													<ui-select-choices repeat="item in shoptypes">
														<span ng-bind="item.ShopTypeNameEn"></span>
													</ui-select-choices>
												</ui-select>
											</div>
											<!-- Max local cat -->
											<div ng-template="common/input/text2"
												ng-template-options="{
												'label': 'Max Local Category (LV1)',
												}">
												<input
												class="form-control"
												name="MaxLocalCategory"
												ng-model="formData.MaxLocalCategory"
												readonly
												disabled
												/>
											</div>
											<!-- Commission -->
											<div ng-show="formData.Commissions.length > 0"
												nc-template="common/input/form-group-with-label"
												nc-label="Commission by Category">
						                        <div class="width-field-normal" ng-repeat="item in formData.Commissions track by $index">
						                        	<span class="form-text">{{item.Commission}}% for {{item.NameEn}}</span>
						                        </div>
											</div>
						                </div>
						            </div>
						        </div>
						    </div>
						    <div class="row">
						        <div class="col-xs-12">
						            <div class="form-section">
						                <div class="form-section-header">
						                    <h2>Financial Information</h2></div>
						                <div class="form-section-content">
						                    <div nc-template="common/input/form-group-with-label" nc-label="Bank Name" nc-template-options-path="shopSettingForm/BankName">
						                        <input class="form-control" type="text" ng-model="formData.BankName" disabled/>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label" nc-label="Bank Account Number" nc-template-options-path="shopSettingForm/BankAccountNumber">
						                        <input class="form-control" type="text" ng-model="formData.BankAccountNumber" disabled/>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label" nc-label="Bank Account Name" nc-template-options-path="shopSettingForm/BankAccountName">
						                        <input class="form-control" type="text" ng-model="formData.BankAccountName" disabled/>
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
							<button type="button" class="btn btn-white btn-width-xl">Preview</button>
							<button class="btn btn-blue btn-width-xl">Save</button>
						</div>
					</div>
				</div>
		    </div>
        </form>
	</div>

<?php $this->stop() ?>
