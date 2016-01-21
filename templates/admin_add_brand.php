<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Brand']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller='AdminBrandAddCtrl' ng-init="init(<?=$params?>)">
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Brand/" . $title, 'link' => "admin/brands", 'class' => '{ disabled: form.$invalid  || uploader.isUploading || formData.BrandImages.length <= 0}']) ?>
    <div ng-show="alert.show" uib-alert template-url="common/alert" type="{{ alert.type }}" close="alert.close()"><span ng-bind-html="alert.message"></span></div>
    <div class="row margin-top-30">
      <div class="col-xs-12">
      <? $this->insert('components/modal-product-image', ['id' => 'product-image-zoom']) ?>
        <div ng-show="saving">
          <img src="/assets/img/loader.gif" width="40"> <small>Saving Brand..</small>
        </div>
        <form ng-show="!saving" class="ah-form sticky-mainform-action" name="form" novalidate>
            <div class="row">
              <div class="col-xs-12">
                <div class="form-section">
                  <div class="form-section-header">
                    <h2>Brand Information</h2>
                  </div>
                  <div class="form-section-content modal-custom">

                    <div ng-template="common/input/text"
                      ng-template-options="{
                        'label': 'Brand Name (English)',
                        'labelClass': 'required'
                      }">
                      <input
                        class="form-control"
                        name="BrandNameEn"
                        ng-model="formData.BrandNameEn"
                        ng-class="{ 'has-error' : $root.isInvalid(form.BrandNameEn) }"
                        required />
                    </div>

                    <div ng-template="common/input/text"
                      ng-template-options="{
                        'label': 'Brand Name (Thai)',
                        'labelClass': 'required'
                      }">
                      <input
                        class="form-control"
                        name="BrandNameTh"
                        ng-model="formData.BrandNameTh"
                        ng-class="{ 'has-error' : $root.isInvalid(form.BrandNameTh) }"
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
                         />
                    </div>
                    <div ng-template="common/input/text"
                      ng-template-options="{
                        'label': 'Meta Keywords'
                      }">
                      <input
                        class="form-control"
                        name="SEO.MetaKeywords"
                        ng-model="formData.SEO.MetaKeywords"
                        ng-class="{ 'has-error' : $root.isInvalid(form.SEO.MetaKeywords) }"
                         />
                    </div>
                    <div ng-template="common/input/text"
                      ng-template-options="{
                        'label': 'Brand URL Key (Thai)'
                      }">
                      <input
                        class="form-control"
                        name="SEO.ProductUrlKeyTh"
                        ng-model="formData.SEO.ProductUrlKeyTh"
                        ng-class="{ 'has-error' : $root.isInvalid(form.SEO.ProductUrlKeyTh) }"
                         />
                    </div>
                    <div ng-template="common/input/text"
                      ng-template-options="{
                        'label': 'Brand URL Key (English)'
                      }">
                      <input
                        class="form-control"
                        name="SEO.ProductUrlKeyEn"
                        ng-model="formData.SEO.ProductUrlKeyEn"
                        ng-class="{ 'has-error' : $root.isInvalid(form.SEO.ProductUrlKeyEn) }"
                         />
                    </div>
                  </div>
                </div>
              </div> <!-- end .col-xs-12 -->
            </div> <!-- end .row -->

            <div class="row">
              <div class="col-xs-12">
                <p class="text-align-right margin-bottom-30"><span class="color-red">*</span> - Required Field</p>
              </div>
            </div>

            <div class="main-form-action full-width-row">
              <div class="container-fluid">
                <div class="float-right">
                  <a href="#" class="link-btn-plain" ng-click="cancel()">Cancel</a>
                  <button class="btn btn-blue btn-width-xl" type="button" ng-click="save()" ng-class="{disabled: form.$invalid || uploader.isUploading || formData.BrandImages.length <= 0}">Save</button>
                </div>
              </div>
            </div>
        </form>
        <form id="success" action="/admin/brands" method="POST">
          <input type="hidden" name="success" value="true">
        </form>

      </div>
    </div>


<?php $this->stop() ?>