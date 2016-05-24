<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attributes']) ?>

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
              <div  nc-template="common/input/form-group-with-label"
                nc-template-form="form.AttributeNameEn"
                nc-template-options-path="addAttributeForm/AttributeNameEn"
                nc-label="Attribute Name">
                <input
                  class="form-control"
                  name="AttributeNameEn"
                  ng-model="formData.AttributeNameEn"
                  ng-pattern="/^[a-z0-9_\-]+$/"
                  ng-pattern-restrict="^[^\s]*$"
                  ng-lowercase
                  maxlength="255"
                  required />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.DisplayNameEn"
                nc-template-options-path="addAttributeForm/DisplayNameEn"
                nc-label="Display Name (English)">
                <input
                  class="form-control"
                  name="DisplayNameEn"
                  ng-model="formData.DisplayNameEn"
                   
                  maxlength="255"
                  required />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.DisplayNameTh"
                nc-template-options-path="addAttributeForm/DisplayNameTh"
                nc-label="Display Name (ไทย)">
                <input
                  class="form-control"
                  name="DisplayNameTh"
                  ng-model="formData.DisplayNameTh"
                   
                  maxlength="255"
                  required />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.DescriptionEn"
                nc-template-options-path="addAttributeForm/DescriptionEn"
                nc-label="Description">
                <textarea class="form-control"
                  name="AttributeDescriptionEn"
                  ng-model="formData.AttributeDescriptionEn"
                  maxlength="255"></textarea>
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-label="Required">
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
              <div nc-template="common/input/form-group-with-label"
                nc-label="Default Attribute">
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
                  nc-template="common/input/form-group-with-label"
                nc-label="Visible To">
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
              <div nc-template="common/input/form-group-with-label"
                nc-label="Attribute Input Type">
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
                  <div nc-template="common/input/form-group-with-label"
                    nc-template-form="form.ST_DefaultValue"
                    nc-template-options-path="addAttributeForm/DefaultValue"
                    nc-label="If empty, value equals">
                    <input
                      class="form-control"
                      name="ST_DefaultValue"
                      ng-model="formData.ST.DefaultValue"
                       
                      maxlength="255"
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
                          <input name="ltChoiceEn{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueEn" placeholder="Option {{$index+1}} (English)" ng-class="{'has-error': isInvalid(form['ltChoiceEn' + $index])}" maxlength="100"   required/>
                          <!-- Required -->
                          <div class="help-block color-red" ng-show="isInvalid(form['ltChoiceEn' + $index]) || isInvalid(form['ltChoiceTh' + $index])">
                              <span ng-show="form['ltChoiceTh' + $index].$error.required || form['ltChoiceEn' + $index].$error.required">This is a required field</span>
                          </div>
                          <div class="help-block color-red" ng-show="isInvalid(form['ltChoiceImg' + $index])">
                               <span ng-show="form['ltChoiceImg' + $index].$error.dimensions">Image must be 100x100 pixels</span>
                          </div>
                        </div>
                        <div class="input-column input-xxl">
                          <input name="ltChoiceTh{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueTh" placeholder="Option {{$index+1}} (ไทย)" ng-class="{'has-error': isInvalid(form['ltChoiceTh' + $index])}" maxlength="100"   required/>
                        </div>
                        <div class="input-column input-l">
                          <input name="ltChoicePos{{$index}}" type="number" class="form-control" ng-model="choice.Position" placeholder="Position" ng-class="{'has-error': isInvalid(form['ltChoicePos' + $index])}"/>
                        </div>
                        <img class="image-wrapper"
                          ng-if="choice.Image.Url"
                          style="cursor: pointer;margin-top:-4px;"
                          ng-src="{{choice.Image.Url}}"
                          ng-click="preview(choice.Image.Url)"
                          width="34" />
                        <i uib-tooltip="Upload dropdown image"
                          name="ltChoiceImg{{$index}}"
                          tooltip-placement="top" 
                          tooltip-popup-delay="200"
                          tooltip-append-to-body="true"
                          ngf-select="upload($file, choice)"
                          ngf-accept="'.jpg,.jpeg'"
                          ngf-dimensions="$width == 100 && $height == 100"
                          ng-model="choice._dummy"
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
                  <!--div nc-template="common/input/form-group-with-label"
                    nc-template-form="form.LT_DefaultValue"
                    nc-template-options-path="addAttributeForm/DefaultValue"
                    nc-label="If empty, value equals">
                    <input
                      class="form-control"
                      name="LT_DefaultValue"
                      ng-model="formData.LT.DefaultValue"
                      ng-pattern="/^[ก-๙A-Za-z0-9\s]+$/"
                      maxlength="100"
                      />
                  </div-->
                </div>
                <div ng-switch-when="HB">
                  <div nc-template="common/input/form-group-with-label"
                    nc-template-options-path="addAttributeForm/DefaultValue"
                    nc-label="If empty, value equals">
                    <input
                      class="form-control"
                      name="HB_DefaultValue"
                      ng-model="formData.HB.DefaultValue"
                       
                      maxlength="255"
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
                          <input name="cbChoiceEn{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueEn" placeholder="Option {{$index+1}} (English)" ng-class="{'has-error': isInvalid(form['cbChoiceEn' + $index])}" maxlength="100"   required/>
                          <!-- Required -->
                          <div class="help-block color-red" ng-show="isInvalid(form['cbChoiceEn' + $index]) || isInvalid(form['cbChoiceTh' + $index])">
                              <span ng-show="form['cbChoiceTh' + $index].$error.required || form['cbChoiceEn' + $index].$error.required">This is a required field</span>
                          </div>
                        </div>
                        <div class="input-column input-xxl">
                          <input name="cbChoiceTh{{$index}}" type="text" class="form-control" ng-model="choice.AttributeValueTh" placeholder="Option {{$index+1}} (ไทย)" ng-class="{'has-error': isInvalid(form['cbChoiceTh' + $index])}" maxlength="100"   required/>
                        </div>
                        <div class="input-column input-l">
                          <input name="cbChoicePos{{$index}}" type="number" class="form-control" placeholder="Position" ng-model="choice.Position" ng-class="{'has-error': isInvalid(form['cbChoicePos' + $index])}"/>
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
                  <!--div nc-template="common/input/form-group-with-label"
                    nc-template-form="form.CB_DefaultValue"
                    nc-template-options-path="addAttributeForm/DefaultValue"
                    nc-label="If empty, value equals">
                    <input
                      class="form-control"
                      name="CB_DefaultValue"
                      ng-model="formData.CB.DefaultValue"
                      ng-pattern="/^[ก-๙A-Za-z0-9\s]+$/"
                      maxlength="100"
                      />
                  </div-->
                </div>
              </div>
            </div>
          </div>
          <div class="form-section" ng-if="formData.DataType != 'CB' && !formData.DefaultAttribute">
            <div class="form-section-header"><h2>Variation</h2></div>
            <div class="form-section-content">
              <div
                nc-template="common/input/form-group-with-label"
                nc-label="Set As Variation">
                <ui-select ng-model="formData.VariantStatus" search-enabled="false" ng-disabled="formData.DataType == 'HB'|| formData.DataType == 'ST' || alreadyVariant">
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
                nc-template="common/input/form-group-with-label"
                nc-label="Variant Display Type">
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
              <div class="two-lines-label" nc-template="common/input/form-group-with-label"
                nc-label="Use in Global <br> Advanced Search">
                <ui-select ng-model="formData.ShowGlobalSearchFlag" search-enabled="false">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item.value as item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>
              <div class="two-lines-label" nc-template="common/input/form-group-with-label"
                nc-label="Use in Local <br> Advanced Search">
                <ui-select ng-model="formData.ShowLocalSearchFlag" search-enabled="false">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item.value as item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
             </div>

			 <div ng-show="formData.Filterable" class="two-lines-label" nc-template="common/input/form-group-with-label"
                nc-label="Show Filter in <br> Global">
                <ui-select ng-model="formData.ShowGlobalFilterFlag" search-enabled="false">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item.value as item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>


			  <div  ng-show="formData.Filterable" class="two-lines-label" nc-template="common/input/form-group-with-label"
                nc-label="Show Filter in <br> Local">
                <ui-select ng-model="formData.ShowLocalFilterFlag" search-enabled="false">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item.value as item in boolOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>

              <div nc-template="common/input/form-group-with-label"
                nc-label="Filterable">
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
