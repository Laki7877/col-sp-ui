<div id="create_cms_category_information">

  <div class="row">
    <div class="col-xs-12">
      <div class="form-section">
        <div class="form-section-header">
          <h2>Category Information</h2>
        </div>
        <div class="form-section-content">
          <div nc-template="common/input/form-group-with-label" nc-label="Category Name(ไทย)" nc-template-form="form.NameTh" nc-template-options-path="addCMSCategoryForm/NameTh">
            <input class="form-control width-field-large" name="NameTh" ng-model="formData.CMSCategoryNameTH" ng-pattern="/^[^<>]+$/" maxlength="300" required  />
          </div>

          <div nc-template="common/input/form-group-with-label" nc-label="Category Name(EN)" nc-template-form="form.NameEn" nc-template-options-path="addCMSCategoryForm/NameEn">
            <input class="form-control width-field-large" name="NameEn" ng-model="formData.CMSCategoryNameEN" ng-pattern="/^[^<>]+$/" maxlength="300" required  />
          </div>

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
