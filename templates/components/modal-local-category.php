<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title"><?=$header?></h3>
      </div>
      <div class="modal-body">
        <form class="ah-form margin-top-20" name="editingForm" ng-submit="$emit('saveEditLocalCategory')" novalidate>
          <div class="row">
            <div class="col-xs-12">
              <div class="form-section">
                <div class="form-section-header"><h2>Local Category Detail</h2></div>
                <div class="form-section-content modal-custom">
                    <div ng-show="alert2.show" uib-alert template-url="common/alert" type="{{ alert2.type }}" close="alert2.close()" ng-bind-html="alert2.message"></div>
                    <div ng-template="common/input/text2"
                        ng-template-options="{
                          'label': 'Category Name (Thai)',
                          'labelClass': 'required',
                          'error' : {
                                'messages': {
                                  'required': 'This is a required field'
                                },
                                'show': $root.isInvalid(editingForm.NameTh),
                                'conditions' : editingForm.NameTh.$error
                           }
                        }">
                            <input
                             class="form-control"
                             name="NameTh"
                             ng-model="editingCategory.NameTh"
                             ng-class="{ 'has-error' : $root.isInvalid(editingForm.NameTh) }"
                             maxlength="100"
                             required />
                      </div>
                      <div ng-template="common/input/text2"
                        ng-template-options="{
                          'label': 'Category Name (Eng)',
                          'labelClass': 'required',
                          'error' : {
                                'messages': {
                                  'required': 'This is a required field'
                                },
                                'show': $root.isInvalid(editingForm.NameEn),
                                'conditions' : editingForm.NameEn.$error
                           }
                        }">
                          <input
                           class="form-control"
                           name="NameEn"
                           ng-model="editingCategory.NameEn"
                           ng-class="{ 'has-error' : $root.isInvalid(editingForm.NameEn) }"
                           maxlength="100"
                           required />
                      </div>
                      <div ng-template="common/input/text2"
                        ng-template-options="{
                          'label': 'URL (Eng)',
                          'error' : {
                                'messages': {
                                  'pattern': 'Only letters, numbers,  &quot;- &quot;, and   &quot;_&quot;; allowed. Space is not allowed'
                                  },
                                'show': $root.isInvalid(editingForm.UrlKeyEn),
                                'conditions' : editingForm.UrlKeyEn.$error
                           }
                        }">
                        <input
                          class="form-control"
                          name="UrlKeyEn"
                          ng-model="editingCategory.UrlKeyEn"
                          ng-pattern="/^[A-Za-z0-9_\-]+$/"
                          ng-class="{ 'has-error' : $root.isInvalid(editingForm.UrlKeyEn) }"
                          maxlength="300"
                          />
                      </div>
                </div>
              </div>
              <div class="form-section">
                <div class="form-section-header"><h2>Category Visibility</h2></div>
                <div class="form-section-content modal-custom">
                    <div ng-template="common/input/multiline-radio" ng-template-options="{ 'label' : 'Visibility' }">
                      <label ng-repeat="choice in editingStatusOptions"><input type="radio" ng-model="editingCategory.Visibility" ng-value="choice.value"/>{{choice.text}}</label>
                    </div>
                </div>
              </div>
            </div>
            <div class="category-footer col-xs-12">
              <span class="float-right">
                  <a class="link-btn-plain" data-dismiss="modal">Cancel</a>
                  <button type="submit" class="btn btn-blue btn-width-xl">Save</button>
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