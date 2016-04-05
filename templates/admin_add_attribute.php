<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminAttributeAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="{{title}}" link="{{url}}" icon="fa-tag">
      <div class="page-header">
        <a class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</a>
        <button class="btn btn-blue btn-width-xl margin-left-10" ng-click="save()">Save</button>
      </div>
    </nc-page-title>
    <div ng-show="loading" nc-loading="{{loadingMessage}}"></div>
    <div ng-show="saving" nc-loading="{{savingMessage}}"></div>
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
                  'label': 'Display Name (ไทย)',
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
                  'label' : 'Required'
                }">
                <ui-select ng-model="formData.Required" ng-disabled="formData.VisibleTo == 'AD'" search-enabled="false">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item.value as item in boolOptions">
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
                  'label' : 'Default Attribute'
                }">
                <ui-select ng-model="formData.DefaultAttribute" search-enabled="false" ng-disabled="alreadyDefault">
                  <ui-select-match placeholder="- Select Default Attribute -">
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item.value as item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>
              <div ng-show="formData.DefaultAttribute"
                ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Visible to'
                }">
                <ui-select ng-model="formData.VisibleTo" search-enabled="false">
                  <ui-select-match placeholder="- Select Visible to -">
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item.value as item in visibleToOptions">
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
                  <ui-select-choices repeat="item.value as item in dataTypeOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>
              <div ng-switch="formData.DataType">
                <div ng-switch-when="ST">
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
                          <input name="ltChoiceEn{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueEn" placeholder="Option {{$index+1}} (English)" ng-class="{'has-error': isInvalid(form['ltChoiceEn' + $index])}" maxlength="100" ng-pattern="/^[^ก-๙]+$/" required/>
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
                          <input name="ltChoiceTh{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueTh" placeholder="Option {{$index+1}} (ไทย)" ng-class="{'has-error': isInvalid(form['ltChoiceTh' + $index])}" maxlength="100" required/>
                        </div>
                        <img class="image-wrapper"
                          ng-if="choice.Image.url"
                          style="cursor: pointer;margin-top:-4px;"
                          ng-src="{{choice.Image.url}}"
                          ng-click="preview(choice.Image.url)"
                          width="34" />
                        <i uib-tooltip="Upload dropdown image"
                          tooltip-placement="top"
                          tooltip-popup-delay="200"
                          tooltip-append-to-body="true"
                          ngf-select="upload($file, choice)"
                          ngf-accept="'.png,.jpg,.jpeg'"
                          class="clickable fa fa-upload margin-left-10 color-dark-grey icon-size-20" ng-click="open(choice)"
                          style="margin-top:6px;"
                          ></i>
                        <i class="clickable fa fa-trash margin-left-10 color-dark-grey icon-size-20" ng-click="formData.LT.AttributeValues.splice($index,1)" style="margin-top:6px;"></i>
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
                <div ng-switch-when="CB">
                  <div ng-repeat="choice in formData.CB.AttributeValues track by $index" class="form-group">
                    <div class="width-label"><label class="control-label required" ng-if="$index == 0">
                      Checkbox Option</label>
                    </div>
                    <div class="width-field-xxl">
                      <div class="multiple-input">
                        <div class="input-column input-xxl">
                          <input name="cbChoiceEn{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueEn" placeholder="Option {{$index+1}} (English)" ng-class="{'has-error': isInvalid(form['cbChoiceEn' + $index])}" maxlength="100" ng-pattern="/^[^ก-๙]+$/" required/>
                          <!-- Required -->
                          <div class="help-block color-red" ng-show="isInvalid(form['cbChoiceEn' + $index]) || isInvalid(form['cbChoiceTh' + $index])">
                              <span ng-show="form['cbChoiceTh' + $index].$error.required || form['cbChoiceEn' + $index].$error.required">This is a required field</span>
                          </div>
                          <!-- Pattern -->
                          <div class="help-block color-red" ng-show="isInvalid(form['cbChoiceEn' + $index])">
                              <span ng-show="form['cbChoiceEn' + $index].$error.pattern">Only English allowed</span>
                          </div>
                        </div>
                        <div class="input-column input-xxl">
                          <input name="cbChoiceTh{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueTh" placeholder="Option {{$index+1}} (ไทย)" ng-class="{'has-error': isInvalid(form['cbChoiceTh' + $index])}" maxlength="100" required/>
                        </div>
                        <i class="clickable fa fa-trash margin-left-10 color-dark-grey icon-size-20" ng-click="formData.CB.AttributeValues.splice($index,1)" style="margin-top:6px;"></i>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="width-label"></div>
                    <div class="width-field-normal  margin-bottom-20">
                      <a class="like-text form-text" ng-click="formData.CB.AttributeValues.push({})">
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
                            'show': isInvalid(form.CB_DefaultValue),
                            'conditions' : form.CB_DefaultValue.$error
                       }
                    }">
                    <input
                      class="form-control"
                      name="CB_DefaultValue"
                      ng-model="formData.CB.DefaultValue"
                      ng-class="{ 'has-error' : isInvalid(form.CB_DefaultValue) }"
                      ng-pattern="/^[ก-๙A-Za-z0-9\s]+$/"
                      maxlength="100"
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-section" ng-if="formData.DataType != 'CB' && !formData.DefaultAttribute">
            <div class="form-section-header"><h2>Variation</h2></div>
            <div class="form-section-content">
              <div
                ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Set as Variation'
                }">
                <ui-select ng-model="formData.VariantStatus" search-enabled="false" ng-disabled="formData.DataType == 'HB'|| formData.DataType == 'ST'">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item.value as item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>
              <div
                ng-show="formData.VariantStatus && formData.DataType != 'HB'"
                ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Variant Display Type'
                }">
                <ui-select ng-model="formData.VariantDataType" search-enabled="false">
                  <ui-select-match placeholder="- Select Display Type -">
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item.value as item in variantOptions">
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
                  <ui-select-choices repeat="item.value as item in boolOptions">
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
                  <ui-select-choices repeat="item.value as item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
             </div>
              <div
                ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Filterable'
                }">
                <ui-select ng-model="formData.Filterable" search-enabled="false" ng-disabled="formData.DataType == 'HB'">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item.value as item in boolOptions">
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
