<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute']) ?>

<?php $this->start('page-body') ?>  
  <div ng-controller="AdminAttributeAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Attribute/{{title}}", 'urls' => ['/admin/attributes']]) ?>
    <div ng-show="loading" nc-loading="Loading Attribute.."></div>
    <div ng-show="saving" nc-loading="Saving Attribute.."></div>
    <form ng-show="!saving && !loading" name="form" class="ah-form sticky-mainform-action margin-top-30" novalidate>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Information</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Attribute Name',
                  'labelClass': 'required',
                  'inputSize': 'large',
                  'error' : {
                        'messages': {
                          'required': 'This is a required field',
                          'pattern': 'Only English letters and numbers allowed'
                        },
                        'show': isInvalid(form.AttributeNameEn),
                        'conditions' : form.AttributeNameEn.$error
                   }
                }">
                <input
                  class="form-control"
                  name="AttributeNameEn"
                  ng-model="formData.AttributeNameEn"
                  ng-class="{ 'has-error' : isInvalid(form.AttributeNameEn) }"
                  ng-pattern="/^[A-Za-z0-9_\-\s]+$/"
                  maxlength="100"
                  required />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Display Name (English)',
                  'labelClass': 'required',
                  'inputSize': 'large',
                  'error' : {
                        'messages': {
                          'required': 'This is a required field',
                          'pattern': 'Only English letters and numbers allowed'
                        },
                        'show': isInvalid(form.DisplayNameEn),
                        'conditions' : form.DisplayNameEn.$error
                   }
                }">
                <input
                  class="form-control"
                  name="DisplayNameEn"
                  ng-model="formData.DisplayNameEn"
                  ng-class="{ 'has-error' : isInvalid(form.DisplayNameEn) }"
                  ng-pattern="/^[A-Za-z0-9_\-\(\)\*\s\.]+$/"
                  maxlength="100"
                  required />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Display Name (Thai)',
                  'labelClass': 'required',
                  'inputSize': 'large',
                  'error' : {
                        'messages': {
                          'required': 'This is a required field',
                          'pattern': 'Only letters and numbers allowed'
                        },
                        'show': isInvalid(form.DisplayNameTh),
                        'conditions' : form.DisplayNameTh.$error
                   }
                }">
                <input
                  class="form-control"
                  name="DisplayNameTh"
                  ng-model="formData.DisplayNameTh"
                  ng-class="{ 'has-error' : isInvalid(form.DisplayNameTh) }"
                  ng-pattern="/^[ก-๙A-Za-z0-9_\-\(\)\*\s\.]+$/"
                  maxlength="100"
                  required />
              </div>
              <div 
                ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Is Required'
                }">
                <ui-select ng-model="formData.IsRequired" search-enabled="false" ng-disabled="formData.DataType.value == 'HB'">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>
            </div>
          </div>
          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Input</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Attribute Input Type'
                }">
                <ui-select ng-model="formData.DataType" search-enabled="false">
                  <ui-select-match placeholder="- Select Input Type -">
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item in dataTypeOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>
              <div ng-switch="formData.DataType.value">
                <div ng-switch-when="ST">
                  <!--div 
                    ng-template="common/input/dropdown"
                    ng-template-options="{
                      'label' : 'Input Validation'
                    }">
                    <ui-select ng-model="formData.ST.DataValidation" search-enabled="false">
                      <ui-select-match>
                          <span ng-bind="$select.selected.name"></span>
                      </ui-select-match>
                      <ui-select-choices repeat="item in validationOptions">
                          <span ng-bind="item.name"></span>
                      </ui-select-choices>
                    </ui-select>
                  </div-->
                  <div ng-template="common/input/text2"
                    ng-template-options="{
                      'label': 'If empty, value equals',
                      'error' : {
                            'messages': {
                              'pattern': 'Only letters and numbers allowed'
                            },
                            'show': isInvalid(form.ST_DefaultValue),
                            'conditions' : form.ST_DefaultValue.$error
                       }
                    }">
                    <input
                      class="form-control"
                      name="ST_DefaultValue"
                      ng-model="formData.ST.DefaultValue"
                      ng-class="{ 'has-error' : isInvalid(form.ST_DefaultValue) }"
                      ng-pattern="/^[ก-๙A-Za-z0-9\s]+$/"
                      maxlength="100"
                      />
                  </div>
                </div>
                <div ng-switch-when="LT">
                  <div ng-repeat="choice in formData.LT.AttributeValues track by $index" class="form-group">
                    <div class="width-label"><label class="control-label required" ng-if="$index == 0">
                      Dropdown Choice</label>
                    </div>
                    <div class="width-field-xxl">
                      <div class="multiple-input">
                        <div class="input-column input-xxl">
                          <input name="ltChoiceTh{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueTh" placeholder="Option {{$index+1}} (Thai)" ng-class="{'has-error': isInvalid(form['ltChoiceTh' + $index])}" maxlength="100" required/>
                          <!-- Required -->
                          <div class="help-block color-red" ng-show="isInvalid(form['ltChoiceEn' + $index]) || isInvalid(form['ltChoiceTh' + $index])">
                              <span ng-show="form['ltChoiceTh' + $index].$error.required || form['ltChoiceEn' + $index].$error.required">This is a required field</span>
                          </div>
                          <!-- Pattern -->
                          <div class="help-block color-red" ng-show="isInvalid(form['ltChoiceEn' + $index])">
                              <span ng-show="form['ltChoiceEn' + $index].$error.pattern">Only English allowed</span>
                          </div>
                        </div>
                        <div class="input-column input-xxl">
                          <input name="ltChoiceEn{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueEn" placeholder="Option {{$index+1}} (English)" ng-class="{'has-error': isInvalid(form['ltChoiceEn' + $index])}" maxlength="100" ng-pattern="/^[^ก-๙]+$/" required/>
                        </div>
                        <i ng-if="$index > 0" class="clickable fa fa-trash fa-2x margin-left-10 color-grey margin-top-5" ng-click="formData.LT.AttributeValues.splice($index,1)"></i>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="width-label"></div>
                    <div class="width-field-normal  margin-bottom-20">
                      <a class="like-text form-text" ng-click="formData.LT.AttributeValues.push({})">
                        <i class="fa fa-plus-circle color-theme"></i>
                        Add more option
                      </a>
                    </div>
                  </div>
                  <div ng-template="common/input/text2"
                    ng-template-options="{
                      'label': 'If empty, value equals',
                      'error' : {
                            'messages': {
                              'pattern': 'Only letters and numbers allowed'
                            },
                            'show': isInvalid(form.LT_DefaultValue),
                            'conditions' : form.LT_DefaultValue.$error
                       }
                    }">
                    <input
                      class="form-control"
                      name="LT_DefaultValue"
                      ng-model="formData.LT.DefaultValue"
                      ng-class="{ 'has-error' : isInvalid(form.LT_DefaultValue) }"
                      ng-pattern="/^[ก-๙A-Za-z0-9\s]+$/"
                      maxlength="100"
                      />
                  </div>
                </div>
                <div ng-switch-when="HB">
                  <div ng-template="common/input/text2"
                    ng-template-options="{
                      'label': 'If empty, value equals',
                      'error' : {
                            'messages': {
                              'pattern': 'Only letters and numbers allowed'
                            },
                            'show': isInvalid(form.HB_DefaultValue),
                            'conditions' : form.HB_DefaultValue.$error
                       }
                    }">
                    <input
                      class="form-control"
                      name="HB_DefaultValue"
                      ng-model="formData.HB.DefaultValue"
                      ng-class="{ 'has-error' : isInvalid(form.HB_DefaultValue) }"
                      ng-pattern="/^[ก-๙A-Za-z0-9\s]+$/"
                      maxlength="100"
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-section">
            <div class="form-section-header"><h2>Variation</h2></div>
            <div class="form-section-content">
              <div 
                ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Set as Variation'
                }">
                <ui-select ng-model="formData.VariantStatus" search-enabled="false" ng-disabled="formData.DataType.value == 'HB'">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>
              <div
                ng-show="formData.VariantStatus.value && formData.DataType.value != 'HB'"
                ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Variant Display Type'
                }">
                <ui-select ng-model="formData.VariantDataType" search-enabled="false">
                  <ui-select-match placeholder="- Select Display Type -">
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item in variantOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>
            </div>
          </div>
          <div class="form-section">
            <div class="form-section-header"><h2>Search Property</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Use in Global <br> Advanced Search'
                }">
                <ui-select ng-model="formData.ShowGlobalSearchFlag" search-enabled="false">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>
              <div ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Use in Local <br> Advanced Search'
                }">
                <ui-select ng-model="formData.ShowLocalSearchFlag" search-enabled="false">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
             </div>
              <div 
                ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Filterable'
                }">
                <ui-select ng-model="formData.Filterable" search-enabled="false" ng-disabled="formData.DataType.value == 'HB'">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
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
      <div class="main-form-action full-width-row">
        <div class="container-fluid">
          <div class="float-right">
            <a class="link-btn-plain" ng-click="cancel()">Cancel</a>
            <button type="button" class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
          </div>
        </div>
      </div>
    </form>
  </div>

<?php $this->stop() ?>