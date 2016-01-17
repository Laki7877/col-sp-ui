<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute Set']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminAttributeSetAddCtrl" ng-init="init(<?=$params?>)">
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Attribute Set/" . $title, 'urls' => ['/admin/attributesets'], 'class' =>'{disabled : form.$invalid}']) ?>
    <div ng-show="alert.show" uib-alert template-url="common/alert" type="{{ alert.type }}" close="alert.close()">{{alert.message}}</div>
    <form class="ah-form sticky-mainform-action margin-top-30" name="form">
      <div class="row">
        <div class="col-xs-12">
          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Set Information</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/text"
                ng-template-options="{
                  'label': 'Attribute Set Name (Eng)',
                  'labelClass': 'required',
                }">
                <input
                  class="form-control"
                  name="AttributeSetNameEn"
                  ng-model="formData.AttributeSetNameEn"
                  ng-class="{ 'has-error' : $root.isInvalid(form.AttributeSetNameEn) }"
                  required />
              </div>
              <div ng-template="common/input/textarea"
                  ng-template-options="{
                    'label' : 'Attribute Set Description'
                  }">
                  <textarea class="form-control" ng-model="formData.AttributeSetDescriptionEn"></textarea>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Mapping</h2></div>
            <div class="form-section-content">
                <div nc-tradable-select nc-template="common/input/tradable-select2" nc-model="formData.Attributes" nc-select-options="attributeOptions" nc-options="{ 'map' : { 'text': 'AttributeNameEn', 'value' : 'AttributeId' } }"></div> 
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Suggested Search Tag</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Search Tag',
                  'size' : 'large',
                  'tooltip' : 'Search tag name'
                }">
                <ui-select ng-model="formData.Tags" tagging-tokens=",|ENTER" multiple tagging tagging-label="">
                  <ui-select-match placeholder="Separated by Pressing Enter">
                      {{ $item }}
                  </ui-select-match>
                  <ui-select-choices repeat="i in tagOptions">
                      {{ i }}
                  </ui-select-choices>
                </ui-select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Visibility</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Attribute Set Visibility'
                }">
                <ui-select ng-model="formData.Status" search-enabled="false">
                  <ui-select-match>
                      <span ng-bind="$select.selected.name"></span>
                  </ui-select-match>
                  <ui-select-choices repeat="item in visibleOptions">
                      <span ng-bind="item.name"></span>
                  </ui-select-choices>
                </ui-select>
              </div>
            </div>
          </div>
          <div class="col-xs-12">
            <p class="text-align-right margin-bottom-30"><span class="color-red">*</span> - Required Field</p>
          </div>
        </div>
      </div>
      <div class="main-form-action full-width-row">
        <div class="container-fluid">
          <div class="float-right">
            <a class="link-btn-plain" ng-click="cancel()">Cancel</a>
            <button type="button" class="btn btn-blue btn-width-xl" ng-click="save()" ng-class="{disabled : form.$invalid}">Save</button>
          </div>
        </div>
      </div>
  	</form>
  <form id="success" action="/admin/attributesets" method="POST">
    <input type="hidden" name="success" value="true">
  </form>

<?php $this->stop() ?>