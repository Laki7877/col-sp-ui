<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute Set']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminAttributeSetAddCtrl" ng-init="init(<?=$params?>)">
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Attribute Set/" . $title, 'urls' => ['/admin/attributesets'], 'class' =>'{disabled : form.$invalid}']) ?>
    <div ng-show="alert.show" uib-alert template-url="common/alert" type="{{ alert.type }}" close="alert.close()"><span ng-bind-html="alert.message"></span></div>
    <div ng-show="saving">
      <img src="/assets/img/loader.gif" width="40"> <small>Saving Attribute Set..</small>
    </div>
    <form ng-show="!saving" class="ah-form sticky-mainform-action margin-top-30" name="form" novalidate>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Set Information</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Attribute Set Name (English)',
                  'labelClass': 'required',
                  'inputSize': 'large',
                  'error' : {
                        'messages': {
                          'required': 'This is a required field',
                          'pattern': 'Only letters and numbers allowed'
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
                    'label' : 'Attribute Set Description'
                  }">
                  <textarea class="form-control" ng-model="formData.AttributeSetDescriptionEn" maxlength="500"></textarea>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Mapping</h2></div>
            <div class="form-section-content">
                <div nc-tradable-select nc-test="test" nc-template="common/input/tradable-select2" nc-model="formData.Attributes" nc-select-options="attributeOptions" nc-options="{ 'map' : { 'text': 'AttributeNameEn', 'value' : 'AttributeId' } }"></div> 
                <div class="row col-xs-12">
                  <p style="margin-left: 30px; margin-top:15px"><span class="color-red">*</span> If attribute set is mapped to a product, attribute mapping cannot be changed</p>
                </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Suggested Search Tag</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/dropdown"
                ng-template-options="{
                  'label' : 'Search Tag',
                  'size' : 'large'
                 }">
                <ui-select ng-model="formData.Tags" tagging-tokens=",|ENTER" limit="100" multiple tagging tagging-label="" ui-select-maxlength="30">
                  <ui-select-match placeholder="Tags separated with a comma">
                      {{ $item }}
                  </ui-select-match>
                  <ui-select-choices repeat="i in tagOptions | exclude:formData.Tags">
                      {{ i }}
                  </ui-select-choices>
                </ui-select>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Visibility</h2></div>
            <div class="form-section-content">
              <div ng-template="common/input/multiline-radio" ng-template-options="{ 'label' : 'Attribute Set Visibility' }">
                <label ng-repeat="choice in visibleOptions"><input type="radio" ng-model="formData.Visibility" ng-value="choice.value"/>{{choice.name}}</label>
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
            <button type="button" class="btn btn-blue btn-width-xl" ng-click="save()" ng-class="{disabled : form.$invalid}">Save</button>
          </div>
        </div>
      </div>
  	</form>
  <form id="success" action="/admin/attributesets" method="POST">
    <input type="hidden" name="success" value="true">
  </form>

<?php $this->stop() ?>