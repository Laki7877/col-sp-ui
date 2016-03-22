<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute Set']) ?>
<?php $this->start('page-body') ?>
  <div ng-controller="AdminAttributeSetAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="{{title}}" link="{{url}}" icon="fa-tag">
      <div class="page-header">
        <a class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</a>
        <button class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
      </div>
    </nc-page-title>
    <div ng-show="loading" nc-loading="{{loadingMessage}}"></div>
    <div ng-show="saving" nc-loading="{{savingMessage}}"></div>
    <form ng-show="!saving && !loading" class="ah-form sticky-mainform-action margin-top-30" name="form" novalidate>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Set Information</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Attribute Set Name',
                  'labelClass': 'required',
                  'inputSize': 'large',
                  'error' : {
                        'messages': {
                          'required': 'This is a required field',
                          'pattern': 'Only English letters and numbers allowed'
                        },
                        'show': $root.isInvalid(form.AttributeSetNameEn),
                        'conditions' : form.AttributeSetNameEn.$error
                   }
                }">
                <input
                  class="form-control"
                  name="AttributeSetNameEn"
                  ng-model="formData.AttributeSetNameEn"
                  ng-class="{ 'has-error' : $root.isInvalid(form.AttributeSetNameEn) }"
                  ng-pattern="/^[A-Za-z0-9_\-\s]+$/"
                  maxlength="100"
                  required />
              </div>
              <div ng-template="common/input/textarea"
                  ng-template-options="{
                    'label' : 'Attribute Set Description',
                    'inputSize': 'large'
                  }">
                  <textarea class="form-control" ng-model="formData.AttributeSetDescriptionEn" maxlength="500"></textarea>
              </div>
              <div ng-show="id != 0"
                  ng-template="common/input/label"
                  ng-template-options="{
                    'label' : 'Mapped Categories (ID)',
                    'inputSize': 'large'
                  }">{{formData.Categories}}</div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Mapping</h2></div>
            <div class="form-section-content">
                <nc-tradable-select nc-test="lockAttributeset" nc-model="formData.Attributes" on-search="onSearch" nc-select-options="attributeOptions" column-header="Attribute in this Attribute Set" search-placeholder="Search Attribute" nc-options="{ 'map' : { 'text': 'AttributeNameEn', 'value' : 'AttributeId'} }"></nc-tradable-select>
                <div class="row col-xs-12">
                  <p style="margin-left: 30px; margin-top:15px">* Changing attribute mapping may affect products under this attribute set</p>
                </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Suggested Search Tag</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Search Tag',
                  'inputSize': 'large',
                  'error' : {
                    'messages': {
                      'tagcount': 'Cannot exceed 100 tags',
                      'taglength': 'Tag must contain 30 characters or less',
                      'pattern': 'Only letters and numbers'
                    },
                    'show': true,
                    'conditions' :  keywordValidConditions
                  }
                }">
                  <ui-select
                  ng-model="formData.Tags"
                  on-select="onKeywordAdded($item, $model)"
                  multiple
                  nc-tag-validator
                  nc-tag-pattern="^[0-9a-zA-Z ]+$"
                  nc-max-tag-count="100"
                  nc-max-tag-length="30"
                  tagging="tagTransform"
                  tagging-tokens=",|ENTER"
                  tagging-label="">
                    <ui-select-match placeholder="Input tags">
                    {{$item.TagName}}
                    </ui-select-match>
                    <ui-select-choices repeat="item in tagOptions">
                    {{item.TagName}}
                    </ui-select-choices>
                  </ui-select>
              </div>
            </div>
          </div>
          <div class="col-xs-12">
            <p class="text-align-right"><span class="color-red"><i class="fa fa-asterisk"></i></span> - Required Field</p>
          </div>
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
