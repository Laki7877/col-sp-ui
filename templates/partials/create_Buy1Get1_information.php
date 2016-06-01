<div id="create_Buy1Get1_information_tab_content">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header"><h2>Information</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Name TH" nc-template-form="formData.NameTH" nc-template-options-path="addBuy1Get1Form/NameTH">
                        <input class="form-control width-field-large" name="NameTH" ng-model="formData.NameTH" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Name EN" nc-template-form="formData.NameEN" nc-template-options-path="addBuy1Get1Form/NameEN">
                        <input class="form-control width-field-large" name="NameEN" ng-model="formData.NameEN" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label=" URL Key" nc-template-form="formData.URLKey" nc-template-options-path="addBuy1Get1Form/URLKey">
                        <input class="form-control width-field-large" name="URLKey" ng-model="formData.URLKey" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Promotion Code" nc-template-form="formData.PromotionCode" nc-template-options-path="addBuy1Get1Form/PromotionCode">
                        <input class="form-control width-field-large" name="PromotionCode" ng-model="formData.PromotionCode" ng-pattern="/^[^<>]+$/" maxlength="300" />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Promotion Code Ref" nc-template-form="formData.PromotionCodeRef" nc-template-options-path="addBuy1Get1Form/PromotionCodeRef">
                        <input class="form-control width-field-large" name="PromotionCodeRef" ng-model="formData.PromotionCodeRef" ng-pattern="/^[^<>]+$/" maxlength="300" />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Campaign ID" nc-template-form="formData.CampaignID" nc-template-options-path="addBuy1Get1Form/CampaignID">
                        <input class="form-control width-field-large" name="CampaignID" ng-model="formData.CampaignID" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Campaign Name" nc-template-form="formData.CampaignName" nc-template-options-path="addBuy1Get1Form/CampaignName">
                        <input class="form-control width-field-large" name="CampaignName" ng-model="formData.CampaignName" ng-pattern="/^[^<>]+$/" maxlength="300" />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Limit" nc-template-form="formData.Limit" nc-template-options-path="addBuy1Get1Form/Limit">
                        <input class="form-control width-field-large" name="Limit" ng-model="formData.Limit" ng-pattern-restrict="^[0-9]*$" maxlength="6" />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Limit Per User" nc-template-form="formData.LimitPerUser" nc-template-options-path="addBuy1Get1Form/LimitPerUser">
                        <input class="form-control width-field-large" name="LimitPerUser" ng-model="formData.LimitPerUser" ng-pattern-restrict="^[0-9]*$" maxlength="5" />
                    </div>
                </div>

            </div>
            <div class="form-section">
                <div class="form-section-header">
                    <h2>Description</h2>
                </div>
                <div class="form-section-content">
                    <?php $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (Thai)", "ng_model" => "formData.LongDescriptionTH", "size" => "xxl"]) ?>

                    <div ng-template="common/input/textarea2" ng-template-options="{
					'label': 'Short Description (Thai)',
					'inputSize': 'xxl',
					'formGroupClass' : 'margin-top-30',
					'error' : {
					'messages': {
					'pattern': 'Only letters and numbers allowed'
					},
					'show': $root.isInvalid(formData.ShortDescriptionTH),
					'conditions' : formData.ShortDescriptionTH.$error
					}
					}">
                        <textarea ng-pattern="/^[0-9A-Za-zก-ฮ\s]+$/" class="form-control" maxlength="500" name="ShortDescriptionTH" ng-model="formData.ShortDescriptionTH" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.ShortDescriptionTH) }" />
					</textarea>
                    </div>

                    <?php $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (English)", "ng_model" => "formData.LongDescriptionEN", "size" => "xxl", "form_group_class" => "margin-top-40"]) ?>

                    <div ng-template="common/input/textarea2" ng-template-options="{
					'label': 'Short Description (English)',
					'inputSize': 'xxl',
					'formGroupClass' : 'margin-top-30',
					'error' : {
					'messages': {
					'pattern': 'Only letters and numbers allowed'
					},
					'show': $root.isInvalid(addProductForm.formData_ShortDescriptionEN),
					'conditions' : addProductForm.formData_ShortDescriptionEN.$error
					}
					}">
                        <textarea ng-pattern="/^[0-9A-Za-z\s]+$/" class="form-control" maxlength="500" name="formData_ShortDescriptionEN" ng-model="formData.ShortDescriptionEN" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.formData_ShortDescriptionEN) }" />
					</textarea>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <div class="form-section-header">
                    <h2>Absorb</h2>
                </div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Marketing Absorb" nc-template-options-path="PromotionForm/MarketingAbsorb">
                        <input type="text" class="form-control" ng-model="formData.MarketingAbsorb" />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Merchandise Absorb" nc-template-options-path="PromotionForm/MerchandiseAbsorb">
                        <input type="text" class="form-control" ng-model="formData.MerchandiseAbsorb" />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Vendor Absorb" nc-template-options-path="PromotionForm/VendorAbsorb">
                        <input type="text" class="form-control" ng-model="formData.VendorAbsorb" />
                    </div>
                </div>
            </div>
            <div class="form-section">
                <div class="form-section-header">
                    <h2>More Details</h2>
                </div>
                <div class="form-section-content">
                    <div class="form-group">
                        <div class="width-label">
                            <label class="control-label">Effective On</label>
                        </div>
                        <div class="width-field-normal">
                            <div class="dropdown">
                                <a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" href="#">
                                    <input readonly style="background-color:white" type="text" ng-class="{'has-error': formData.ExpireDate <= formData.EffectiveDate }" placeholder="Select date and time when promotion will go online" class="input-icon-calendar form-control" value="{{ formData.EffectiveDate | date: 'dd/MM/yy HH:mm' }}" />
                                </a>
                                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                    <datetimepicker data-ng-model="formData.EffectiveDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'hour' }" />
                                </ul>
                            </div>
                            <span class="help-block"></span>
                        </div>
                        <div class="width-field-tooltip no-padding-left">
                            <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter" uib-tooltip="Date when your promotion will go online"></i>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="width-label">
                            <label class="control-label">Expire On</label>
                        </div>
                        <div class="width-field-normal">
                            <div class="dropdown">
                                <a class="dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" data-target="#" href="#">
                                    <input readonly style="background-color:white" type="text" placeholder="Select date and time when promotion will go offline" class="input-icon-calendar form-control" name="ExpiryDate" ng-class="{'has-error': formData.ExpiryDate <= formData.EffectiveDate }" value="{{ formData.ExpiryDate | date: 'dd/MM/yy HH:mm' }}">
                                </a>
                                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                    <datetimepicker data-ng-model="formData.ExpiryDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown3', minView: 'hour' }" />
                                </ul>
                            </div>
                            <div class="width-field-large">
                                <span class="help-block color-red" ng-if="formData.ExpiryDate <= formData.EffectiveDate">
                                    <span>Effective date/time must come before expire date/time</span>
                                </span>
                            </div>

                        </div>
                        <div class="width-field-tooltip no-padding-left">
                            <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter" uib-tooltip="Date when your promotion will go offline"></i>
                        </div>
                    </div>

                </div>


            </div>
            <div class="form-section">
                <div class="form-section-header">
                    <h2>Status & Visibility</h2>
                </div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Status">
                        <div class="ah-select2-dropdown">
                            <select ng-model="formData.Status" class="form-control" required="">
                                <option value="1">Active</option>
                                <option value="0">In Active</option>
                            </select>
                        </div>
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Visibility">
                        <div class="ah-select2-dropdown">
                            <select ng-model="formData.Visibility" class="form-control" required="">
                                <option value="1">Visible</option>
                                <option value="0">Not Visible</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
