
<div id="create_cms_information_tab_content">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header"><h2>Information</h2></div>
                <div class="form-section-content">
                  
                    <div nc-template="common/input/form-group-with-label" nc-label="Type">
                      <div class="ah-select2-dropdown width-field-large" style="padding: 0;">
                        <select ng-init="typeChanged('ST')" ng-model="formData.CMSMasterType" ng-change="typeChanged(formData.CMSMasterType)" class="form-control" required="">
                          <option value="ST">Static</option>
                          <option value="CT">Collection</option>
                        </select>
                      </div>
                    </div>
                  
                    <div nc-template="common/input/form-group-with-label" 
                         nc-label="Name (English)" nc-template-form="formData.CMSMasterNameEN" 
                         nc-template-options-path="addCMSMasterForm/CMSMasterNameEN">
                        <input 
                          class="form-control width-field-large" 
                          name="CMSMasterNameEN" 
                          ng-model="formData.CMSMasterNameEN"
                          maxlength="300" 
                          required />
                    </div>
                  
                    <div nc-template="common/input/form-group-with-label" 
                         nc-label="Name (ไทย)" 
                         nc-template-form="formData.CMSMasterNameTH" 
                         nc-template-options-path="addCMSMasterForm/CMSMasterNameTH">
                        <input 
                          class="form-control width-field-large" 
                          name="CMSMasterNameTH" 
                          ng-model="formData.CMSMasterNameTH" 
                          maxlength="300" 
                          required />
                    </div>
                  
                    <div nc-template="common/input/form-group-with-label" 
                         nc-label="URL Key" 
                         nc-template-form="formData.CMSMasterURLKey" 
                         nc-template-options-path="addCMSMasterForm/CMSMasterURLKey">
                        <input 
                          class="form-control width-field-large" 
                          name="CMSMasterURLKey" 
                          ng-model="formData.CMSMasterURLKey" 
                          maxlength="300" 
                          required />
                    </div>
                  
                    <div nc-template="common/input/form-group-with-label" 
                         nc-label="Link">
                        <div class="input-group width-field-large" style="padding: 0;">
                            <input id="CMSMasterLink" class="form-control" ng-model="formData.CMSMasterLink" disabled="disabled" />
                            <span class="input-group-btn">
                              <button class="btn btn-default" ng-click="copyFieldValue($event, 'CMSMasterLink')">Copy link</button>
                            </span>
                        </div>
                    </div>
                  
                    <div nc-template="common/input/form-group-with-label" nc-label="Visibility">
                      <div class="ah-select2-dropdown  width-field-large" style="padding: 0;">
                        <select ng-model="formData.Visibility" class="form-control" required="">
                          <option value="true" ng-selected="formData.Visibility == true">Visible</option>
                          <option value="false"  ng-selected="formData.Visibility == false">Not Visible</option>
                        </select>
                      </div>
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Default Sorting">
                      <div class="ah-select2-dropdown  width-field-large" style="padding: 0;">
                        <select ng-model="formData.Visibility" class="form-control" required="">
                          <option value="true" ng-selected="formData.Visibility == true">Visible</option>
                          <option value="false"  ng-selected="formData.Visibility == false">Not Visible</option>
                        </select>
                      </div>
                    </div>

                </div>
            </div>

          <!-- Descript for Desktop -->
          <div class="form-section">
            <div class="form-section-header">
              <h2>Description for Desktop</h2>
            </div>
            <div class="form-section-content">
              <div class="two-columns">
                
                <div class="row">
                  <div nc-template="common/input/div-with-label" nc-label="Description (English)" nc-template-options-path="genericForm/DescriptionFull"
                  nc-template-form="form.LongDescriptionEN">
                    <textarea ng-ckeditor="$root.ckOptions" class="form-control" maxlength="500" name="LongDescriptionEN" ng-model="formData.LongDescriptionEN">
                    </textarea>
                  </div>
                  <div nc-template="common/input/div-with-label" nc-label="Description (ไทย)" nc-template-options-path="genericForm/DescriptionFull"
                  nc-template-form="form.LongDescriptionTH">
                    <textarea ng-ckeditor="$root.ckOptions" class="form-control" maxlength="500" name="LongDescriptionTH" ng-model="formData.LongDescriptionTH">
                    </textarea>
                  </div>

                </div>
                
                <div class="row margin-top-30">
                  <div nc-template="common/input/div-with-label" nc-label="Short Description (English)" nc-template-options-path="genericForm/DescriptionShortEn"
                  nc-template-form="form.ShortDescriptionEN">
                    <textarea class="form-control" maxlength="500" name="ShortDescriptionEN" ng-model="formData.ShortDescriptionEN">
                    </textarea>
                  </div>
                  <div nc-template="common/input/div-with-label" nc-label="Short Description (ไทย)" nc-template-options-path="genericForm/DescriptionShortTh"
                  nc-template-form="form.ShortDescriptionTH">
                    <textarea class="form-control" maxlength="500" name="ShortDescriptionTH" ng-model="formData.ShortDescriptionTH">
                    </textarea>
                  </div>
                </div>
              
              </div>
            </div>
          </div>

          <!-- Descript for Mobile -->
          <div class="form-section">
            <div class="form-section-header">
              <h2>Description for Mobile</h2>
            </div>
            <div class="form-section-content">
              <div class="two-columns">

                <div class="row">
                  <div nc-template="common/input/div-with-label" nc-label="Description (English)" nc-template-options-path="genericForm/DescriptionFull"
                  nc-template-form="form.MobileLongDescriptionEN">
                    <textarea ng-ckeditor="$root.ckOptions" class="form-control" maxlength="500" name="MobileLongDescriptionEN" ng-model="formData.MobileLongDescriptionEN">
                    </textarea>
                  </div>
                  <div nc-template="common/input/div-with-label" nc-label="Description (ไทย)" nc-template-options-path="genericForm/DescriptionFull"
                  nc-template-form="form.MobileLongDescriptionTH">
                    <textarea ng-ckeditor="$root.ckOptions" class="form-control" maxlength="500" name="MobileLongDescriptionTH" ng-model="formData.MobileLongDescriptionTH">
                    </textarea>
                  </div>

                </div>

                <div class="row margin-top-30">
                  <div nc-template="common/input/div-with-label" nc-label="Short Description (English)" nc-template-options-path="genericForm/DescriptionShortEn"
                  nc-template-form="form.MobileShortDescriptionEN">
                    <textarea class="form-control" maxlength="500" name="MobileShortDescriptionEN" ng-model="formData.MobileShortDescriptionEN">
                      </textarea>
                  </div>
                  <div nc-template="common/input/div-with-label" nc-label="Short Description (ไทย)" nc-template-options-path="genericForm/DescriptionShortTh"
                  nc-template-form="form.MobileShortDescriptionTH">
                    <textarea class="form-control" maxlength="500" name="MobileShortDescriptionTH" ng-model="formData.MobileShortDescriptionTH">
                      </textarea>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
    </div>
</div>
