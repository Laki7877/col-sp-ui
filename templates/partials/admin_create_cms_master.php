<div id="create_cms_collection_information">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header"><h2>CMS Master Information</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Name(TH)" nc-template-form="formData.CMSMasterNameTH" nc-template-options-path="addCMSMasterForm/NameTH">
                        <input class="form-control width-field-large" name="NameTH" ng-model="formData.NameTH" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Name(EN)" nc-template-form="formData.CMSMasterNameEN" nc-template-options-path="addCMSMasterForm/NameEN">
                        <input class="form-control width-field-large" name="NameEN" ng-model="formData.NameEN" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>
                    <div nc-template="common/input/form-group-with-label" nc-label="Bank Name TH" nc-template-form="formData.CMSMasterURLKey" nc-template-options-path="addCMSMasterForm/URLKey">
                        <input class="form-control width-field-large" name="CMSMasterURLKey" ng-model="formData.CMSMasterURLKey" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Bank Name EN" nc-template-form="formData.BankNameEN" nc-template-options-path="CMSCategoryForm/BankNameEN">
                        <input class="form-control width-field-large" name="BankNameEN" ng-model="formData.BankNameEN" ng-pattern="/^[^<>]+$/" maxlength="300" required />
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
                    <option value="AT"> Active</option>
                    <option value="IA"> In Active</option>
                  </select>
                </div>
              </div>
              
              <div nc-template="common/input/form-group-with-label" nc-label="Visibility">
                <div class="ah-select2-dropdown">
                  <select ng-model="formData.Visibility" class="form-control" required="">
                    <option value="Visible">Visible</option>
                    <option value="NotVisible">Not Visible</option>
                  </select>
                </div>
              </div>
              
            </div>
          </div>

            <!-- Effective & Expiry -->
            <div class="form-section">
              <div class="form-section-header">
                <h2>Effective & Expiry</h2>
              </div>
              <div class="form-section-content">
              
                <div class="form-group">
                  <div class="width-label">
                    <label class="control-label">Effective On</label>
                  </div>
                  <div class="width-field-normal">
                    <div class="dropdown">
                      <a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" href="#">
                        <input readonly="" style="background-color:white" type="text" ng-class="{'has-error': formData.ExpireDate"<= formData.EffectiveDate }" placeholder="Select date and time" class="input-icon-calendar form-control" value="{{ formData.EffectiveDate | date: 'dd/MM/yy HH:mm' }}" />
                        </a>
                      <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                        <datetimepicker data-ng-model="formData.EffectiveDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'hour' }" />
                      </ul>
                    </div>
                    <span class="help-block"></span>
                  </div>
                  <div class="width-field-tooltip no-padding-left">
                    <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter" uib-tooltip="Date when your credit card will go online"></i>
                  </div>
                </div>

                <div class="form-group">
                  <div class="width-label">
                    <label class="control-label">Expire On</label>
                  </div>
                  <div class="width-field-normal">
                    <div class="dropdown">
                      <a class="dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" data-target="#" href="#">
                        <input readonly="" style="background-color:white" type="text" placeholder="Select date and time" class="input-icon-calendar form-control" name="ExpiryDate" ng-class="{'has-error': formData.ExpiryDate"<= formData.EffectiveDate }" value="{{ formData.ExpiryDate | date: 'dd/MM/yy HH:mm' }}">
                      </a>
                      <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                        <datetimepicker data-ng-model="formData.ExpiryDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown3', minView: 'hour' }" />
                      </ul>
                    </div>
                    <div class="width-field-large">
                      <span class="help-block color-red" ng-if="formData.ExpiryDate"
                        <= formData.EffectiveDate">
                        <span>Effective date/time must come before expire date/time</span>
                      </span>
                    </div>

                  </div>
                  <div class="width-field-tooltip no-padding-left">
                    <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter" uib-tooltip="Date when your credit card will go offline"></i>
                  </div>
                </div>
              </div>
            </div>
          
        </div>
    </div>
</div>
