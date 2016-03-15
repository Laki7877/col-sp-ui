<?= $this->layout('layouts/page-with-sidebar', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="SellerShopSettingCtrl" ng-init='init()'>
			  <div ng-show="loading" nc-loading="Loading Shop Settings.."></div>
				<nc-alert nc-model="alert"></nc-alert>
        <form class="ah-form sticky-mainform-action" name="form" ng-submit="save()" ng-show="!loading">
            <nc-page-title nc-title="Shop Profile Setting">
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
						                    <div ng-template="common/input/dropdown" ng-template-options="{
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
								            <div ng-show="formData.Logo"
								              nc-template="common/input/form-group-with-label" 
								              nc-label="Logo Preview">
								                <img
								                  ng-src="{{formData.Logo.url}}"
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
						                            <option value='NotAvailable'>Not Available</option>
						                            <option value='Available'>Available</option>
						                        </select>
						                    </div>
						                    <div nc-template="common/input/form-group-with-label" nc-label="Tax Invoice" nc-template-options-path="shopSettingForm/TaxInvoice">
						                        <select class="form-control" ng-model="formData.TaxInvoice">
						                            <option value='NotAvailable'>Not Available</option>
						                            <option value='Available'>Available</option>
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
						                    <!-- Shop Status -->
						                    <div ng-template="common/input/dropdown" ng-template-options="{
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

						                    <div class="form-group">
						                        <div class="width-label">
						                            <label class="control-label">Shop Logo</label>
						                        </div>
						                        <div class="width-field-normal">
						                            <div nc-template="components/single-upload" nc-view-bag="uploadViewBag"></div>
						                        </div>
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
