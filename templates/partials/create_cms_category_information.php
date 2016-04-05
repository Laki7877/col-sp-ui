<div id="create_cms_category_information">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header"><h2>Category Information</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Category Name(TH)" nc-template-form="formData.CMSCategoryNameTH" nc-template-options-path="CMSCategoryForm/NameTH">
                        <input class="form-control width-field-large" name="CMSCategoryNameTH" ng-model="formData.CMSCategoryNameTH" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Category Name(EN)" nc-template-form="formData.CMSCategoryNameEN" nc-template-options-path="CMSCategoryForm/NameEN">
                        <input class="form-control width-field-large" name="CMSCategoryNameEN" ng-model="formData.CMSCategoryNameEN" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>
                  
                    <div nc-template="common/input/form-group-with-label" nc-label="Active">
                      <div class="ah-select2-dropdown">
                        <select ng-model="formData.IsActive" class="form-control width-field-large" required="">
                          <option value="true" ng-selected="formData.IsActive"> Active</option>
                          <option value="false" ng-selected="!formData.IsActive"> In Active</option>
                        </select>
                      </div>
                    </div>
                  
                </div>
            </div>
          
        </div>
    </div>
</div>
