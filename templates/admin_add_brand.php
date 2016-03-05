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
              <h2>Information</h2>
            </div>
            <div class="form-section-content modal-custom">
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Brand Name',
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
                  'label': 'Display Name (English)',
                  'labelClass': 'required',
                  'error' : {
                        'messages': {
                          'required': 'This is a required field',
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
                  maxlength="100"
                  required />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'Display Name (ไทย)',
                  'labelClass': 'required',
                  'error' : {
                        'messages': {
                          'required': 'This is a required field',
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
                  maxlength="100"
                  required />
              </div>
              <div ng-template="common/input/text2"
                ng-template-options="{
                  'label': 'URL (English)',
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
          <div class="form-section">
            <div class="form-section-header"><h2>Logo</h2></div>
            <div class="form-section-content">
              <div nc-template="common/input/form-group-with-label" 
                nc-label="Logo File" nc-template-options-path="addBrandForm/BrandImage">
                  <button 
                  type="button"
                  class="btn btn-default"
                  ngf-accept="'.png,.jpg,.jpeg'"
                  ngf-select="uploadLogo($file)"
                  >Choose File</button>
              </div>
              <div ng-show="formData.BrandImage"
                nc-template="common/input/form-group-with-label" 
                nc-label="Logo Preview">
                  <img
                    ng-src="{{formData.BrandImage.url}}"
                    width="160"
                    />
              </div>
            </div>
          </div>
          <pre>{{formData.BrandBannerEn | json}}</pre>
          <nc-image-banner nc-model="formData.BrandBannerEn" title="Banner Upload (English)" uploader="bannerUploader" on-fail="uploadBannerFail" size="8"></nc-image-banner> 
          <nc-image-banner nc-model="formData.BrandBannerTh" title="Banner Upload (ไทย)" uploader="bannerUploader" on-fail="uploadBannerFail" size="8"></nc-image-banner> 
          <div class="form-section" ng-if="id > 0">
            <div class="form-section-header"><h2>Feature Products</h2></div>
            <div class="form-section-content">
              <div ng-if="availableProducts == 0">
                <div nc-template="common/input/form-group-with-label"
                  nc-label="Feature Products">
                  <span class="form-text">Unfortunately, There is no product belonging to this brand.</span>
                </div>
              </div>
              <div ng-if="availableProducts > 0">
                <div nc-template="common/input/form-group-with-label"
                  nc-label="Featured Product Title"
                  nc-template-options-path="addBrandForm/FeaturedProductSearch">
                  <input type="text" class="form-control" ng-model="params.FeaturedProductTitle"/>
                </div>
                <div nc-template="common/input/form-group-with-label"
                  nc-label=""><input type="checkbox" ng-model="FeaturedProductShowcase"/> Title = Showcase </div>
                <div nc-template="common/input/form-group-with-label"
                  nc-label="Featured Product"
                  nc-template-options-path="addBrandForm/FeaturedProducts">
                  <ui-select multiple ng-model="formData.FeaturedProducts" nc-tag-validator nc-max-tag-count="20">
                      <ui-select-match placeholder="Search for Product name or PID">
                          {{ $item.ProductNameEn }}
                      </ui-select-match>
                      <ui-select-choices placeholder="Search result" refresh="getFeatureProduct($select.search)" refresh-delay="150" repeat="i in products">
                          {{ i.ProductNameEn }}
                      </ui-select-choices>
                  </ui-select>
                </div>
              </div>
            </div>
          </div>
          <div class="form-section">
            <div class="form-section-header"><h2>SEO</h2></div>
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
                        'show': isInvalid(form.SEO_MetaKeywordEn),
                        'conditions' : form.SEO_MetaKeywordEn.$error
                   }
                }">
                <input
                  class="form-control"
                  name="SEO_MetaKeywordEn"
                  ng-model="formData.SEO.MetaKeywordEn"
                  ng-class="{ 'has-error' : isInvalid(form.SEO_MetaKeywordEn) }"
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
                        'show': isInvalid(form.SEO_MetaKeywordTh),
                        'conditions' : form.SEO_MetaKeywordTh.$error
                   }
                }">
                <input
                  class="form-control"
                  name="SEO_MetaKeywordTh"
                  ng-model="formData.SEO.MetaKeywordTh"
                  ng-class="{ 'has-error' : isInvalid(form.SEO_MetaKeywordTh) }"
                  maxlength="300"
                  placeholder="Keywords seperated by comma"
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
