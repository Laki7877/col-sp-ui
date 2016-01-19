<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminAttributeAddCtrl" ng-init="init(<?=$params?>)">
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Attribute/" . $title, 'urls' => ['/admin/attributes'], 'class' => '{ disabled: form.$invalid}']) ?>
    <? $this->insert('components/modal-warning-leave-page', ['id' => 'leave-page-warning', 'exit' => 'cancel(blocker)', 'save' => 'save()']) ?>
    <div ng-show="alert.show" uib-alert template-url="common/alert" type="{{ alert.type }}" close="alert.close()">{{alert.message}}</div>
    <form name="form" class="ah-form sticky-mainform-action margin-top-30" novalidate>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Information</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/text"
                ng-template-options="{
                  'label': 'Attribute Name (English)',
                  'labelClass': 'required',
                  'inputSize': 'large'
                }">
                <input
                  class="form-control"
                  name="AttributeNameEn"
                  ng-model="formData.AttributeNameEn"
                  ng-class="{ 'has-error' : $root.isInvalid(form.AttributeNameEn) }"
                  required />
              </div>
              <div ng-template="common/input/text"
                ng-template-options="{
                  'label': 'Attribute Name (Thai)',
                  'labelClass': 'required',
                  'inputSize': 'large'
                }">
                <input
                  class="form-control"
                  name="AttributeNameTh"
                  ng-model="formData.AttributeNameTh"
                  ng-class="{ 'has-error' : $root.isInvalid(form.AttributeNameTh) }"
                  required />
              </div>
              <div ng-template="common/input/text"
                ng-template-options="{
                  'label': 'Display Name (English)',
                  'labelClass': 'required',
                  'inputSize': 'large'
                }">
                <input
                  class="form-control"
                  name="DisplayNameEn"
                  ng-model="formData.DisplayNameEn"
                  ng-class="{ 'has-error' : $root.isInvalid(form.DisplayNameEn) }"
                  required />
              </div>
              <div ng-template="common/input/text"
                ng-template-options="{
                  'label': 'Display Name (Thai)',
                  'labelClass': 'required',
                  'inputSize': 'large'
                }">
                <input
                  class="form-control"
                  name="DisplayNameTh"
                  ng-model="formData.DisplayNameTh"
                  ng-class="{ 'has-error' : $root.isInvalid(form.DisplayNameTh) }"
                  required />
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
                  <div ng-template="common/input/text"
                    ng-template-options="{
                      'label': 'Attribute Unit (Thai)'
                    }">
                    <input
                      class="form-control"
                      name="stAttributeUnitTh"
                      ng-model="formData.ST.AttributeUnitTh"
                      ng-class="{ 'has-error' : $root.isInvalid(form.stAttributeUnitTh) }"
                      />
                  </div>
                  <div ng-template="common/input/text"
                    ng-template-options="{
                      'label': 'Attribute Unit (English)'
                    }">
                    <input
                      class="form-control"
                      name="stAttributeUnitEn"
                      ng-model="formData.ST.AttributeUnitEn"
                      ng-class="{ 'has-error' : $root.isInvalid(form.stAttributeUnitEn) }"
                       />
                  </div>
                  <div ng-template="common/input/dropdown"
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
                  </div>
                  <div ng-template="common/input/text"
                    ng-template-options="{
                      'label': 'If empty, value equals'
                    }">
                    <input
                      class="form-control"
                      name="stDefault"
                      ng-model="formData.ST.DefaultValue"
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
                          <input name="ltChoiceTh{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueTh" placeholder="Option {{$index+1}} (Thai)" ng-class="{'has-error': $root.isInvalid('ltChoiceTh' + $index)}" required/>
                        </div>
                        <div class="input-column input-xxl">
                          <input name="ltChoiceEn{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueEn" placeholder="Option {{$index+1}} (English)" ng-class="{'has-error': $root.isInvalid('ltChoiceEn' + $index)}" required/>
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
                </div>
                <div ng-switch-when="HB">
                  <div ng-template="common/input/text"
                    ng-template-options="{
                      'label': 'If empty, value equals'
                    }">
                    <input
                      class="form-control"
                      name="stDefault"
                      ng-model="formData.ST.DefaultValue"
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div class="form-section">
          <div class="form-section-header"><h2>Variation</h2></div>
          <div class="form-section-content">
            <div ng-template="common/input/dropdown"
              ng-template-options="{
                'label' : 'Set as Variation'
              }">
              <ui-select ng-model="formData.VariantStatus" search-enabled="false">
                <ui-select-match>
                    <span ng-bind="$select.selected.name"></span>
                </ui-select-match>
                <ui-select-choices repeat="item in boolOptions">
                    <span ng-bind="item.name"></span>
                </ui-select-choices>
              </ui-select>
            </div>
            <div
              ng-show="formData.VariantStatus.value"
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
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <p class="text-align-right margin-bottom-30"><span class="color-red">*</span> - Required Field</p>
      </div>
    </div>
    <div class="main-form-action full-width-row">
      <div class="container-fluid">
        <div class="float-right">
          <a class="link-btn-plain" ng-click="cancel()">Cancel</a>
          <button type="button" class="btn btn-blue btn-width-xl" ng-click="save()" ng-class="{ disabled: form.$invalid }">Save</button>
        </div>
      </div>
    </div>
	</form>
  <form id="success" action="/admin/attributes" method="POST">
    <input type="hidden" name="success" value="true">
  </form>

<?php $this->stop() ?>