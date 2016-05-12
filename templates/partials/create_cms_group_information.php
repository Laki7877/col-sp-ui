<div id="create_cms_group_information">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header"><h2>Group Information</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Group Name(TH)" nc-template-form="formData.CMSGroupNameTH" nc-template-options-path="CMSGroupForm/NameTH">
                        <input class="form-control width-field-large" name="CMSGroupNameTH" ng-model="formData.CMSGroupNameTH" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Group Name(EN)" nc-template-form="formData.CMSGroupNameEN" nc-template-options-path="CMSGroupForm/NameEN">
                        <input class="form-control width-field-large" name="CMSGroupNameEN" ng-model="formData.CMSGroupNameEN" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>
                  
                    <!--<div nc-template="common/input/form-group-with-label" nc-label="Status">
                      <div class="ah-select2-dropdown">
                        <select ng-model="formData.Status" class="form-control width-field-large" required="">
                          <option value="true" ng-selected="formData.Status"> Active</option>
                          <option value="false" ng-selected="!formData.Status"> In Active</option>
                        </select>
                      </div>
                    </div>-->

                    <div nc-template="common/input/form-group-with-label" nc-label="Visibility">
                      <div class="ah-select2-dropdown">
                        <select ng-model="formData.Visibility" class="form-control width-field-large" required="">
                          <option value="true" ng-selected="formData.Visibility"> Visible</option>
                          <option value="false" ng-selected="!formData.Visibility"> Not Visible</option>
                        </select>
                      </div>
                    </div>
                  
                </div>
            </div>
          
        </div>
    </div>
</div>
