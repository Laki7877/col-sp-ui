<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Brand']) ?>

<?php $this->start('page-body') ?>  
  <div ng-controller="AdminBrandAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Brand/{{title}}", 'urls' => ['/admin/brands']]) ?>
    <div ng-show="loading" nc-loading="Loading Brand.."></div>
    <div ng-show="saving" nc-loading="Saving Brand.."></div>
    <form ng-show="!saving && !loading" name="form" class="ah-form sticky-mainform-action" novalidate>
      <div class="row">
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
                          },
                        'show': $root.isInvalid(form.BrandNameEn),
                        'conditions' : form.BrandNameEn.$error
                   }
                }">
                <input
                  class="form-control"
                  name="BrandNameEn"
                  ng-model="formData.BrandNameEn"
                  ng-class="{ 'has-error' : $root.isInvalid(form.BrandNameEn) }"
                  maxlength="100"
                  required />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Brand Name (Thai)',
                  'labelClass': 'required',
                  'error' : {
                        'messages': {
                          'required': 'This is a required field',
                          },
                        'show': $root.isInvalid(form.BrandNameTh),
                        'conditions' : form.BrandNameTh.$error
                   }
                }">
                <input
                  class="form-control"
                  name="BrandNameTh"
                  ng-model="formData.BrandNameTh"
                  ng-class="{ 'has-error' : $root.isInvalid(form.BrandNameTh) }"
                  maxlength="100"
                  required />
              </div>
            </div>
          </div>
          <? $this->insert('components/forms/form-section-upload-new-product-image-single',
              ["uploader" => "uploader", 
              "no_guideline" => true,
              "header" => "Upload New Brand Image (512 x 512)",
              "images" => "formData.BrandImages"]) 
          ?>
          <div class="form-section">
            <div class="form-section-header"><h2>SEO</h2></div>
            <div class="form-section-content">

              <div ng-template="common/input/text"
                ng-template-options="{
                  'label': 'Meta Title'
                }">
                <input
                  class="form-control"
                  name="SEO.MetaTitle"
                  ng-model="formData.SEO.MetaTitle"
                  ng-class="{ 'has-error' : $root.isInvalid(form.SEO.MetaTitle) }"
                  maxlength="60"
                   />
              </div>
              <div ng-template="common/input/text"
                ng-template-options="{
                  'label': 'Meta Description'
                }">
                <input
                  class="form-control"
                  name="SEO.MetaDescription"
                  ng-model="formData.SEO.MetaDescription"
                  ng-class="{ 'has-error' : $root.isInvalid(form.SEO.MetaDescription) }"
                  maxlength="150"
                   />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Meta Keywords',
                  'error' : {
                        'messages': {
                          'pattern': 'Only letters and numbers allowed'
                          },
                        'show': $root.isInvalid(form.MetaKeywords),
                        'conditions' : form.MetaKeywords.$error
                   }
                }">
                <input
                  class="form-control"
                  name="MetaKeywords"
                  ng-model="formData.MetaKeywords"
                  ng-pattern="/^[A-Za-z0-9\s]+$/"
                  ng-class="{ 'has-error' : $root.isInvalid(form.MetaKeywords) }"
                  maxlength="300"
                  />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Brand URL Key (Thai)',
                  'error' : {
                        'messages': {
                          'pattern': 'Only letters, numbers,  &quot;- &quot;, and   &quot;_&quot;; allowed. Space is not allowed'
                          },
                        'show': $root.isInvalid(form.SEO_ProductUrlKeyTh),
                        'conditions' : form.SEO_ProductUrlKeyTh.$error
                   }
                }">
                <input
                  class="form-control"
                  name="SEO_ProductUrlKeyTh"
                  ng-model="formData.SEO.ProductUrlKeyTh"
                  ng-pattern="/^[A-Za-z0-9_\-]+$/"
                  ng-class="{ 'has-error' : $root.isInvalid(form.SEO_ProductUrlKeyTh) }"
                  maxlength="300"
                  />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Brand URL Key (English)',
                  'error' : {
                        'messages': {
                          'pattern': 'Only letters, numbers,  &quot;- &quot;, and  &quot;_&quot; allowed. Space is not allowed'
                          },
                        'show': $root.isInvalid(form.SEO_ProductUrlKeyEn),
                        'conditions' : form.SEO_ProductUrlKeyEn.$error
                   }
                }">
                <input
                  class="form-control"
                  name="SEO_ProductUrlKeyEn"
                  ng-model="formData.SEO.ProductUrlKeyEn"
                  ng-pattern="/^[A-Za-z0-9_\-]+$/"
                  ng-class="{ 'has-error' : $root.isInvalid(form.SEO_ProductUrlKeyEn) }"
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