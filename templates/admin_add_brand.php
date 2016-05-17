<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Brands']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminBrandAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="{{title}}" link="{{url}}" icon="fa-tag">
      <div class="page-header">
        <a class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</a>
        <button class="btn btn-blue btn-width-xl margin-left-10" ng-click="save()">Save</button>
      </div>
    </nc-page-title>
    <div ng-show="loading" nc-loading="{{loadingMessage}}"></div>
    <div ng-show="saving" nc-loading="{{savingMessage}}"></div>
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
                  ng-pattern="/^[0-9a-z_]+$/"
                  ng-lowercase
                  maxlength="255"
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
                  ng-pattern-restrict="^[^<>]*$"
                  maxlength="255"
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
                  ng-pattern-restrict="^[^<>]*$"
                  maxlength="255"
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
                  ng-pattern="/^[a-z0-9\-]*$/"
                  ng-pattern-restrict="^[^\s_]$"
                  ng-lowercase
                  maxlength="100"
                  />
              </div>
              <div nc-template="common/input/form-group-with-label" 
                  nc-template-form="form.SortBy" 
                  nc-label="Default Sort By"
                  nc-template-options-path="addBrandForm/SortBy">
                  <ui-select ng-model="formData.SortBy" name="SortBy" search-enabled="false" required>
                      <ui-select-match placeholder="- Select Default Sort -">{{$select.selected.SortByName}}</ui-select-match>
                      <ui-select-choices repeat="item in sortBy">{{item.SortByName}}</ui-select-choices>
                  </ui-select>
              </div>
              <div nc-template="common/input/form-group-with-label" 
                  nc-template-form="form.Status" 
                  nc-label="Status" 
                  nc-template-options-path="addBrandForm/Status">
                  <ui-select ng-model="formData.Status" name="Status" search-enabled="false" required>
                      <ui-select-match>
                        <span ng-bind="$select.selected.name"></span>
                      </ui-select-match>
                      <ui-select-choices repeat="item.value as item in status">
                        <span ng-bind="item.name"></span>
                      </ui-select-choices>
                  </ui-select>
              </div>
            </div>
          </div>
          <!-- Logo -->
          <div class="form-section">
            <div class="form-section-header"><h2>Logo</h2></div>
            <div class="form-section-content">
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.BrandImage"
                nc-template-options-path="addBrandForm/BrandImage"
                nc-label="Logo File">
                  <button
                  type="button"
                  class="btn btn-default"
                  name="BrandImage"
                  ngf-accept="'.jpg,.jpeg'"
                  ngf-select="uploadLogo($file)"
                  ngf-dimensions="$width >= 500 && $width <= 1000 && $height >= 500 && $height <= 1000"
                  ngf-max-size="'5MB'"
                  ngf-ratio="1:1"
                  ng-model="formData.brandImage"
                  ng-class="{'has-error-btn' : isInvalid(form.BrandImage)}">Choose File</button>
              </div>
              <div ng-show="formData.BrandImage && formData.BrandImage.Url != ''"
                nc-template="common/input/form-group-with-label"
                nc-label="Logo Preview">
                  <img
                    ng-src="{{formData.BrandImage.Url}}"
                    width="160"
                    />
                  <a style="display:block;" class="margin-top-5" ng-click="formData.BrandImage=null"><i class="fa-trash fa"></i> Delete this image</a>
              </div>
            </div>
          </div>
          <nc-image-banner name="BrandBannerEn" options="bannerOptions" data-source="formData" data-key="BannerStatusEn" nc-model="formData.BrandBannerEn" title="Upload Banner (English)" uploader="bannerUploader" on-fail="uploadBannerFail" size="8">1920x1080</nc-image-banner>
          <nc-image-banner name="BrandBannerTh" options="bannerOptions" data-source="formData" data-key="BannerStatusTh" nc-model="formData.BrandBannerTh" title="Upload Banner (ไทย)" uploader="bannerUploader" on-fail="uploadBannerFail" size="8">1920x1080</nc-image-banner>
          <nc-image-banner name="BrandBannerEn" options="bannerSmOptions" data-source="formData" data-key="BannerSmallStatusEn" nc-model="formData.BrandSmallBannerEn" title="Upload Small Banner (English)" uploader="bannerSmUploader" on-fail="uploadBannerSmFail" size="8">1600x900</nc-image-banner>
          <nc-image-banner name="BrandBannerTh" options="bannerSmOptions" data-source="formData" data-key="BannerSmallStatusTh" nc-model="formData.BrandSmallBannerTh" title="Upload Small Banner (ไทย)" uploader="bannerSmUploader" on-fail="uploadBannerSmFail" size="8">1600x900</nc-image-banner>
          <!-- Description -->
          <div class="form-section">
            <div class="form-section-header">
                <h2>Description</h2></div>
              <div class="form-section-content">
                  <div class="two-columns">
                      <div class="row">
                          <div nc-template="common/input/div-with-label" nc-label="Description (English)" nc-template-options-path="genericForm/DescriptionFull"
                          nc-template-form="form.DescriptionFullEn">
                              <textarea ng-ckeditor="$root.ckOptions" class="form-control" maxlength="250000" ng-pattern-restrict="^[^<>]*$" name="DescriptionFullEn" ng-model="formData.DescriptionFullEn">
                              </textarea>
                          </div>
                          <div nc-template="common/input/div-with-label" nc-label="Description (ไทย)" nc-template-options-path="genericForm/DescriptionFull"
                          nc-template-form="form.DescriptionFullTh">
                              <textarea ng-ckeditor="$root.ckOptions" class="form-control" maxlength="250000" ng-pattern-restrict="^[^<>]*$" name="DescriptionFullTh" ng-model="formData.DescriptionFullTh">
                              </textarea>
                          </div>

                      </div>
                      <div class="row margin-top-30">
                          <div nc-template="common/input/div-with-label" nc-label="Mobile Description (English)" nc-template-options-path="genericForm/DescriptionMobile"
                          nc-template-form="form.DescriptionMobileEn">
                              <textarea ng-ckeditor="$root.ckOptions" class="form-control" maxlength="250000" ng-pattern-restrict="^[^<>]*$" name="DescriptionMobileEn" ng-model="formData.DescriptionMobileEn">
                              </textarea>
                          </div>
                          <div nc-template="common/input/div-with-label" nc-label="Mobile Description (ไทย)" nc-template-options-path="genericForm/DescriptionMobile"
                          nc-template-form="form.DescriptionMobileTh">
                              <textarea ng-ckeditor="$root.ckOptions" class="form-control" maxlength="250000" ng-pattern-restrict="^[^<>]*$" name="DescriptionMobileTh" ng-model="formData.DescriptionMobileTh">
                              </textarea>
                          </div>

                      </div>
                      <div class="row margin-top-30">
                          <div nc-template="common/input/div-with-label" nc-label="Short Description (English)" nc-template-options-path="genericForm/DescriptionShortEn"
                          nc-template-form="form.DescriptionShortEn">
                              <textarea ng-pattern="/^[^<>ก-๙]+$/" class="form-control" maxlength="500" name="DescriptionShortEn" ng-pattern-restrict="^[^<>]*$" ng-model="formData.DescriptionShortEn">
                              </textarea>
                          </div>
                          <div nc-template="common/input/div-with-label" nc-label="Short Description (ไทย)" nc-template-options-path="genericForm/DescriptionShortTh"
                          nc-template-form="form.DescriptionShortTh">
                              <textarea ng-pattern="/^[^<>]+$/" class="form-control" maxlength="500" name="DescriptionShortTh" ng-pattern-restrict="^[^<>]*$" ng-model="formData.DescriptionShortTh">
                              </textarea>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- Feature product -->
            <div class="form-section">
              <div class="form-section-header"><h2>Featured Products</h2></div>
              <div class="form-section-content">
                <div ng-if="availableProducts == 0  || id == 0">
                  <div nc-template="common/input/form-group-with-label"
                    nc-label="Featured Products">
                    <span class="form-text">will be available after adding product into this category</span>
                  </div>
                </div>
                <div ng-if="availableProducts > 0">
                  <div nc-template="common/input/form-group-with-label"
                    nc-template-options-path="genericForm/FeatureTitle"
                    nc-label="Featured Product Title">
                    <input type="text" class="form-control" ng-model="formData.FeatureTitle"/>
                  </div>
                  <div nc-template="common/input/form-group-with-label"
                    nc-label=""><input type="checkbox" ng-model="formData.TitleShowcase"/> Title = Showcase
                  </div>
                  <div nc-template="common/input/form-group-with-label"
                    nc-template-form="form.FeatureProducts"
                    nc-template-options-path="genericForm/FeatureProducts"
                    nc-label="Featured Product">
                    <ui-select name="FeatureProducts" multiple ng-model="formData.FeatureProducts" nc-tag-validator nc-max-tag-count="20">
                        <ui-select-match placeholder="Search for Product Name or PID">
                            {{ $item.ProductNameEn }}
                        </ui-select-match>
                        <ui-select-choices placeholder="Search result" refresh="getFeatureProduct($select.search)" refresh-delay="150" repeat="i in products">
                            {{ i.ProductNameEn }}
                        </ui-select-choices>
                    </ui-select>
                  </div>    
                  <div nc-template="common/input/form-group-with-label" nc-label="Feature Product Status">
                    <select ng-model="formData.FeatureProductStatus" class="form-control" ng-options="o.v as o.n for o in [{v: false, n: 'Disable'}, {v: true, n: 'Enable'}]"></select>
                  </div>
                </div>
              </div>
            </div>
          <!-- SEO -->
          <div class="form-section">
            <div class="form-section-header"><h2>SEO</h2></div>
            <div class="form-section-content">
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.SEO_En"
                nc-label="SEO (English)"
                >
                <textarea class="form-control"
                  name="SEO_En"
                  ng-model="formData.SEO.SeoEn"
                  ng-pattern-restrict="^[^<>]*$"
                  maxlength="1000">
                </textarea>
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.SEO_Th"
                nc-label="SEO (ไทย)"
                >
                <textarea class="form-control"
                  name="SEO_Th"
                  ng-model="formData.SEO.SeoTh"
                  ng-pattern-restrict="^[^<>]*$"
                  maxlength="1000">
                </textarea>
              </div>
              <div nc-template="common/input/form-group-with-label"
                nc-template-form="form.SEO_MetaTitleEn"
                nc-label="Meta Title (English)"
                >
                <input
                  class="form-control"
                  name="SEO_MetaTitleEn"
                  ng-model="formData.SEO.MetaTitleEn"
                  ng-pattern-restrict="^[^<>]*$"
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
                  ng-pattern-restrict="^[^<>]*$"
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
                  ng-pattern-restrict="^[^<>]*$"
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
                  ng-pattern-restrict="^[^<>]*$"
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
                  ng-pattern-restrict="^[^<>]*$"
                  maxlength="1000"
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
                  ng-pattern-restrict="^[^<>]*$"
                  maxlength="1000"
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
