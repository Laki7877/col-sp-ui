<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute Sets']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminAttributeSetAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="{{title}}" link="{{url}}" icon="fa-tag">
      <div class="page-header">
        <a class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</a>
        <button class="btn btn-blue btn-width-xl margin-left-10" ng-click="save()">Save</button>
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
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.AttributeSetNameEn"
                nc-template-options-path="addAttributeSetForm/AttributeSetNameEn"
                nc-label="Attribute Set Name">
                <input
                  class="form-control"
                  name="AttributeSetNameEn"
                  ng-model="formData.AttributeSetNameEn"
                  ng-pattern="/^[0-9a-z_\-]+$/"
                  ng-pattern-restrict="^[^\s]*$"
                  ng-lowercase
                  maxlength="255"
                  required />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-options-path="addAttributeSetForm/LargeInput"
                nc-label="Attribute Set Description">
                  <textarea class="form-control" ng-model="formData.AttributeSetDescriptionEn"   maxlength="1000"></textarea>
              </div>
              <div ng-show="id != 0"
                  nc-template="common/input/form-group-with-label"
                nc-template-options-path="addAttributeSetForm/LargeInput"
                nc-label="Mapped Category (ID)">
                <div class="text-result">{{formData.Categories}}</div></div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Mapping</h2></div>
            <div class="form-section-content">
                <nc-tradable-select nc-test="lockAttributeset"
                  nc-model="formData.Attributes"
                  on-search="onSearch" 
                  nc-select-options="attributeOptions"
                  column-header="Attribute in this Attribute Set"
                  search-placeholder="Search Attribute"
                  nc-id="AttributeId"
                  nc-text="AttributeNameEn"></nc-tradable-select>
                <div class="row col-xs-12">
                  <p style="margin-left: 30px; margin-top:20px;">
                    * Changing attribute mapping may affect products under this attribute set
                  </p>
                  <p style="margin-left: 30px;">
                    ** You can change order of attribute in this attribute set by dragging it.
                  </p>
                </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Suggested Search Tag</h2></div>
            <div class="form-section-content">
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.Tags"
                nc-template-options-path="addAttributeSetForm/Tags"
                nc-label="Search Tag">
                  <ui-select
                  name="Tags"
                  ng-model="formData.Tags"
                  multiple
                  nc-tag-validator
                  nc-max-tag-length-key="TagName"
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
