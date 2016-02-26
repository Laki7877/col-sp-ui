<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Brands']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminBrandAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Brands/{{title}}", 'urls' => ['/admin/brands']]) ?>
    <div ng-show="loading" nc-loading="Loading Brand.."></div>
    <div ng-show="saving" nc-loading="Saving Brand.."></div>
    <form ng-show="!saving && !loading" name="form" class="ah-form sticky-mainform-action" novalidate>
      <div class="row margin-top-30">
        <div class="col-xs-12">
          <div class="form-section">
            <div class="form-section-header">
              <h2>Brand Information</h2>
            </div>
            <div class="form-section-content modal-custom">
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Brand Name (English)',
                  'labelClass': 'required',
                  'error' : {
                        'messages': {
                          'required': 'This is a required field',
                          'pattern': 'Only English allowed'
                          },
                        'show': isInvalid(form.BrandNameEn),
                        'conditions' : form.BrandNameEn.$error
                   }
                }">
                <input
                  class="form-control"
                  name="BrandNameEn"
                  ng-model="formData.BrandNameEn"
                  ng-class="{ 'has-error' : isInvalid(form.BrandNameEn) }"
                  ng-pattern="/^[^ก-๙]+$/"
                  maxlength="100"
                  required />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Brand Name (ไทย)',
                  'labelClass': 'required',
                  'error' : {
                        'messages': {
                          'required': 'This is a required field',
                          },
                        'show': isInvalid(form.BrandNameTh),
                        'conditions' : form.BrandNameTh.$error
                   }
                }">
                <input
                  class="form-control"
                  name="BrandNameTh"
                  ng-model="formData.BrandNameTh"
                  ng-class="{ 'has-error' : isInvalid(form.BrandNameTh) }"
                  maxlength="100"
                  required />
              </div>
            </div>
          </div>
          <? $this->insert('components/forms/form-section-upload-new-product-image-single',
              ["uploader" => "uploader",
              "no_guideline" => true,
              "header" => "<label class='required'>Upload New Brand Image (512 x 512)</label>",
              "images" => "formData.BrandImages"])
          ?>
          <div class="form-section">
            <div class="form-section-header"><h2>SE0</h2></div>
            <div class="form-section-content">

              <div ng-template="common/input/text"
                ng-template-options="{
                  'label': 'Meta Title (English)'
                }">
                <input
                  class="form-control"
                  name="SEO.MetaTitleEn"
                  ng-model="formData.SEO.MetaTitleEn"
                  ng-class="{ 'has-error' : isInvalid(form.SEO.MetaTitleEn) }"
                  maxlength="60"
                   />
              </div>
              <div ng-template="common/input/text"
                ng-template-options="{
                  'label': 'Meta Title (ไทย)'
                }">
                <input
                  class="form-control"
                  name="SEO.MetaTitleTh"
                  ng-model="formData.SEO.MetaTitleTh"
                  ng-class="{ 'has-error' : isInvalid(form.SEO.MetaTitleTh) }"
                  maxlength="60"
                   />
              </div>
              <div ng-template="common/input/text"
                ng-template-options="{
                  'label': 'Meta Description (English)'
                }">
                <input
                  class="form-control"
                  name="SEO.MetaDescriptionEn"
                  ng-model="formData.SEO.MetaDescriptionEn"
                  ng-class="{ 'has-error' : isInvalid(form.SEO.MetaDescriptionEn) }"
                  maxlength="150"
                   />
              </div>
              <div ng-template="common/input/text"
                ng-template-options="{
                  'label': 'Meta Description (ไทย)'
                }">
                <input
                  class="form-control"
                  name="SEO.MetaDescriptionTh"
                  ng-model="formData.SEO.MetaDescriptionTh"
                  ng-class="{ 'has-error' : isInvalid(form.SEO.MetaDescriptionTh) }"
                  maxlength="150"
                   />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Meta Keywords (English)',
                  'error' : {
                        'messages': {
                          },
                        'show': isInvalid(form.MetaKeywordEn),
                        'conditions' : form.MetaKeywordEn.$error
                   }
                }">
                <input
                  class="form-control"
                  name="MetaKeywordEn"
                  ng-model="formData.MetaKeywordEn"
                  ng-class="{ 'has-error' : isInvalid(form.MetaKeywordEn) }"
                  maxlength="300"
                  placeholder="Keywords seperated by comma"
                  />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Meta Keywords (ไทย)',
                  'error' : {
                        'messages': {
                          },
                        'show': isInvalid(form.MetaKeywordTh),
                        'conditions' : form.MetaKeywordTh.$error
                   }
                }">
                <input
                  class="form-control"
                  name="MetaKeywordTh"
                  ng-model="formData.MetaKeywordTh"
                  ng-class="{ 'has-error' : isInvalid(form.MetaKeywordTh) }"
                  maxlength="300"
                  placeholder="Keywords seperated by comma"
                  />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Brand URL Key (English)',
                  'error' : {
                        'messages': {
                          'pattern': 'Only English letters, numbers,  &quot;- &quot;, and  &quot;_&quot; allowed. Space is not allowed'
                          },
                        'show': isInvalid(form.SEO_ProductUrlKeyEn),
                        'conditions' : form.SEO_ProductUrlKeyEn.$error
                   }
                }">
                <input
                  class="form-control"
                  name="SEO_ProductUrlKeyEn"
                  ng-model="formData.SEO.ProductUrlKeyEn"
                  ng-pattern="/^[A-Za-z0-9_\-]+$/"
                  ng-class="{ 'has-error' : isInvalid(form.SEO_ProductUrlKeyEn) }"
                  maxlength="300"
                  />
              </div>
            </div>
          </div>
        </div> <!-- end .col-xs-12 -->
      </div> <!-- end .row -->
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
    <? $this->insert('components/modal-product-image', ['id' => 'product-image-zoom']) ?>
  </div>
<?php $this->stop() ?>
