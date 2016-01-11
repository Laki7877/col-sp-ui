<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title"><?=$header?></h3>
      </div>
      <div class="modal-body">
        <form class="ah-form margin-top-20" name="editingForm">
          <div class="row">
            <div class="col-xs-12">
              <div class="form-section">
                <div class="form-section-header"><h2>Local Category Detail</h2></div>
                <div class="form-section-content modal-custom">
                  <input type="text"
                    name="NameTh"
                    class="form-control"
                    ng-class="{ 'has-error' : editingForm.NameTh.$invalid }"
                    ng-model="editingCategory.NameTh"
                    ng-pattern="/^[a-zA-Z0-9 ]*$/" 
                    ng-template="common/input/text" 
                    ng-template-options="{
                      'label': 'Category Name (Thai)',
                      'labelClass': 'required',
                      'formGroupClass': '',
                      'error' : {
                        'message': 'Cannot use special characters such as ! # $ % ^ &',
                        'show' : editingForm.NameTh.$invalid
                      }
                    }"
                  />
                  <input type="text" 
                    name="NameEn"
                    class="form-control"
                    ng-class="{ 'has-error' : editingForm.NameEn.$invalid }"
                    ng-model="editingCategory.NameEn" 
                    ng-pattern="/^[a-zA-Z0-9 ]*$/" 
                    ng-template="common/input/text" 
                    ng-template-options="{
                      'label': 'Category Name (Eng)',
                      'labelClass': 'required',
                      'formGroupClass': '',
                      'error' : {
                        'message': 'Cannot use special characters such as ! # $ % ^ &',
                        'show' : editingForm.NameEn.$invalid 
                      }
                    }" 
                  />

                  <input type="text" 
                    name="UrlKeyEn"
                    class="form-control"
                    ng-model="editingCategory.UrlKeyEn"
                    ng-template="common/input/text" 
                    ng-template-options="{
                      'label': 'Url (Eng)',
                      'labelClass': 'required'
                    }" 
                  />
                </div>
              </div>
              <div class="form-section">
                <div class="form-section-header"><h2>Category Visibility</h2></div>
                <div class="form-section-content modal-custom">
                    <label ng-template="common/input/multiline-radio" ng-template-options="{ 'label' : 'Visibility' }" ng-repeat="choice in editingStatusOptions"><input type="radio" ng-model="editingCategory.Status" ng-value="choice.value"/>{{choice.text}}</label>
                </div>
              </div>
            </div>
            <div class="category-footer col-xs-12">
              <span class="float-right">
                  <a class="link-btn-plain" data-dismiss="modal">Cancel</a>
                  <button type="button" class="btn btn-blue btn-width-xl" ng-click="$emit('saveEditLocalCategory')">Select</button>
              </span>
            </div>
          </div>
        </form>
      </div>
      <!-- <div class="modal-footer">
            
      </div> -->
    </div>
  </div>
</div>