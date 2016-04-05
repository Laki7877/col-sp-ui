<div id="create_cms_information_tab_content">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header"><h2>Information</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Name TH" nc-template-form="formData.CMSMasterNameTH" nc-template-options-path="addCMSMasterForm/CMSMasterNameTH">
                        <input class="form-control width-field-large" name="CMSMasterNameTH" ng-model="formData.CMSMasterNameTH" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Name EN" nc-template-form="formData.CMSMasterNameEN" nc-template-options-path="addCMSMasterForm/CMSMasterNameEN">
                        <input class="form-control width-field-large" name="CMSMasterNameEN" ng-model="formData.CMSMasterNameEN" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="CMS URL Key" nc-template-form="formData.CMSMasterURLKey" nc-template-options-path="addCMSMasterForm/CMSMasterURLKey">
                        <input class="form-control width-field-large" name="CMSMasterURLKey" ng-model="formData.CMSMasterURLKey" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Type">
                        <div class="ah-select2-dropdown">
                            <select ng-model="formData.CMSType" class="form-control" required>
                                <option value="ST">Static</option>
                                <option value="CT">Collection</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
            <div class="form-section">
                <div class="form-section-header">
                    <h2>Description</h2>
                </div>
                <div class="form-section-content">
				<?php $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (Thai)", "ng_model" => "formData.LongDescriptionTH", "size" => "xxl"]) ?>

				<div ng-template="common/input/textarea2"
					ng-template-options="{
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
					<textarea
						ng-pattern="/^[0-9A-Za-zก-ฮ\s]+$/"
						class="form-control"
						maxlength="500"
						name="ShortDescriptionTH"
						ng-model="formData.ShortDescriptionTH"
						ng-class="{ 'has-error' : $root.isInvalid(addProductForm.ShortDescriptionTH) }" />
					</textarea>
				</div>

				<?php $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (English)", "ng_model" => "formData.LongDescriptionEN", "size" => "xxl", "form_group_class" => "margin-top-40"]) ?>

				<div ng-template="common/input/textarea2"
					ng-template-options="{
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
					<textarea
						ng-pattern="/^[0-9A-Za-z\s]+$/"
						class="form-control"
						maxlength="500"
						name="formData_ShortDescriptionEN"
						ng-model="formData.ShortDescriptionEN"
						ng-class="{ 'has-error' : $root.isInvalid(addProductForm.formData_ShortDescriptionEN) }" />
					</textarea>
				</div>
			</div>
            </div>
            
        </div>
    </div>
</div>
