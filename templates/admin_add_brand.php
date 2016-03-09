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
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.BrandNameEn"
                nc-template-options-path="addBrandForm/BrandNameEn"
                nc-label="Brand Name" >
                <input
                  class="form-control"
                  name="BrandNameEn"
                  ng-model="formData.BrandNameEn"
                  ng-pattern="/^[^ก-๙]+$/"
                  maxlength="100"
                  required />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.DisplayNameEn"
                nc-template-options-path="addBrandForm/DisplayNameEn"
                nc-label="Display Name (English)" >
                <input
                  class="form-control"
                  name="DisplayNameEn"
                  ng-model="formData.DisplayNameEn"
                  maxlength="100"
                  required />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.DisplayNameTh"
                nc-template-options-path="addBrandForm/DisplayNameEn"
                nc-label="Display Name (ไทย)">
                <input
                  class="form-control"
                  name="DisplayNameTh"
                  ng-model="formData.DisplayNameTh"
                  maxlength="100"
                  required />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.SEO_ProductUrlKeyEn"
                nc-template-options-path="addBrandForm/UrlKeyEn"
                nc-label="URL (English)">
                <input
                  class="form-control"
                  name="SEO_ProductUrlKeyEn"
                  ng-model="formData.SEO.ProductUrlKeyEn"
                  ng-pattern="/^[A-Za-z0-9_\-]+$/"
                  maxlength="300"
                  />
              </div>
            </div>
          </div>
          <div class="form-section">
            <div class="form-section-header"><h2>Logo</h2></div>
            <div class="form-section-content">
              <div nc-template="common/input/form-group-with-label" 
                nc-template-form="form.BrandImage"
                nc-template-options-path="addBrandForm/BrandImage"
                nc-label="Logo File">
                  <button 
                  type="button"
                  name="BrandImage"
                  class="btn btn-default"
                  ngf-accept="'.png,.jpg,.jpeg'"
                  ngf-select="uploadLogo($file)"
                  ng-model="formData.brandImage"
                  ng-class="{'has-error-btn' : isInvalid(form.BrandImage)}"
                  required>Choose File</button>
              </div>
              <div ng-show="formData.BrandImage"
                nc-template="common/input/form-group-with-label" 
                nc-label="Logo Preview">
                  <img
                    ng-src="{{formData.BrandImage.url}}"
                    width="160"
                    />
                  <a style="display:block;" class="margin-top-5" ng-click="formData.BrandImage=null"><i class="fa-trash fa"></i> Delete this image</a>
              </div>
            </div>
          </div>
          <nc-image-banner name="BrandBannerEn" nc-model="formData.BrandBannerEn" title="Banner Upload (English)" uploader="bannerUploader" on-fail="uploadBannerFail" size="8"></nc-image-banner> 
          <nc-image-banner name="BrandBannerTh" nc-model="formData.BrandBannerTh" title="Banner Upload (ไทย)" uploader="bannerUploader" on-fail="uploadBannerFail" size="8"></nc-image-banner> 
          <!-- Description -->
          <div class="form-section">
            <div class="form-section-header">
                <h2>Description</h2></div>
            <div class="form-section-content">
                <div class="two-columns">
                    <div class="row">
                        <div nc-template="common/input/div-with-label" nc-label="Description (English)" nc-template-options-path="genericForm/DescriptionFull"
                        nc-template-form="form.DescriptionFullEn">
                            <textarea ng-ckeditor="$root.ckOptions" class="form-control" maxlength="500" name="DescriptionFullEn" ng-model="formData.DescriptionFullEn">
                            </textarea>
                        </div>
                        <div nc-template="common/input/div-with-label" nc-label="Description (ไทย)" nc-template-options-path="genericForm/DescriptionFull"
                        nc-template-form="form.DescriptionFullTh">
                            <textarea ng-ckeditor="$root.ckOptions" class="form-control" maxlength="500" name="DescriptionFullTh" ng-model="formData.DescriptionFullTh">
                            </textarea>
                        </div>

                    </div>
                    <div class="row margin-top-30">
                        <div nc-template="common/input/div-with-label" nc-label="Short Description (English)" nc-template-options-path="genericForm/DescriptionShortEn"
                        nc-template-form="form.DescriptionShortEn">
                            <textarea ng-pattern="/^[^<>ก-๙]+$/" class="form-control" maxlength="500" name="DescriptionShortEn" ng-model="formData.DescriptionShortEn">
                            </textarea>
                        </div>
                        <div nc-template="common/input/div-with-label" nc-label="Short Description (ไทย)" nc-template-options-path="genericForm/DescriptionShortTh"
                        nc-template-form="form.DescriptionShortTh">
                            <textarea ng-pattern="/^[^<>]+$/" class="form-control" maxlength="500" name="DescriptionShortTh" ng-model="formData.DescriptionShortTh">
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <!-- Feature product -->
          <div class="form-section">
            <div class="form-section-header"><h2>Feature Products</h2></div>
            <div class="form-section-content">
              <div ng-if="availableProducts == 0 || id == 0">
                <div nc-template="common/input/form-group-with-label"
                  nc-label="Feature Products">
                  <span class="form-text">There are no products in this brand</span>
                </div>
              </div>
              <div ng-if="availableProducts > 0">
                <div nc-template="common/input/form-group-with-label"
                  nc-template-options-path="genericForm/FeatureTitle"
                  nc-label="Featured Product Title">
                  <input type="text" class="form-control" ng-model="params.FeatureTitle"/>
                </div>
                <div nc-template="common/input/form-group-with-label"
                  nc-label=""><input type="checkbox" ng-model="TitleShowcase"/> Title = Showcase 
                </div>
                <div nc-template="common/input/form-group-with-label"
                  nc-template-form="form.FeatureProducts"
                  nc-label="Featured Product"
                  nc-template-options-path="genericForm/FeatureProducts">
                  <ui-select name="FeatureProducts" multiple ng-model="formData.FeatureProducts" nc-tag-validator nc-max-tag-count="20">
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
          <!-- SEO -->
          <div class="form-section">
            <div class="form-section-header"><h2>SEO</h2></div>
            <div class="form-section-content">
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.SEO_MetaTitleEn"
                nc-label="Meta Title (English)"
                >
                <input
                  class="form-control"
                  name="SEO_MetaTitleEn"
                  ng-model="formData.SEO.MetaTitleEn"
                  maxlength="60"
                   />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.SEO_MetaTitleTh"
                nc-label="Meta Title (ไทย)">
                <input
                  class="form-control"
                  name="SEO_MetaTitleTh"
                  ng-model="formData.SEO.MetaTitleTh"
                  maxlength="60"
                   />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.SEO_MetaDescriptionEn"
                nc-label="Meta Description (English)">
                <input
                  class="form-control"
                  name="SEO_MetaDescriptionEn"
                  ng-model="formData.SEO.MetaDescriptionEn"
                  maxlength="150"
                   />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.SEO_MetaDescriptionTh"
                nc-label="Meta Description (ไทย)">
                <input
                  class="form-control"
                  name="SEO_MetaDescriptionTh"
                  ng-model="formData.SEO.MetaDescriptionTh"
                  maxlength="150"
                   />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.SEO_MetaKeywordEn"
                nc-label="Meta Keywords (English)">
                <input
                  class="form-control"
                  name="SEO_MetaKeywordEn"
                  ng-model="formData.SEO.MetaKeywordEn"
                  maxlength="300"
                  placeholder="Keywords seperated by comma"
                  />
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.SEO_MetaKeywordTh"
                nc-label="Meta Keywords (ไทย)">
                <input
                  class="form-control"
                  name="SEO_MetaKeywordTh"
                  ng-model="formData.SEO.MetaKeywordTh"
                  maxlength="300"
                  placeholder="Keywords seperated by comma"
                  />
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
