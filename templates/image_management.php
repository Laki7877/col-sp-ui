<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Image Management']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="ProductImageManagementCtrl">
    <nc-alert nc-model="alert"></nc-alert>
   <!-- <? $this->insert('components/alert-text', ['close' => true, 'color' => 'green', 'text' => "Successfully save changes. However,your changes won't be online until you published your products." ]) ?>
     -->
    <nc-page-title nc-title="Image Management" icon="fa-tag">
      <span class="float-right page-header-action">
          <a class="btn btn-white btn-width-xl margin-right-10" data-toggle="modal" data-target="#image-guideline">
            <span class="">View Guideline</span>
          </a>
          <button ng-click="save()" class="btn btn-blue btn-width-xl">
            <span class="login-loading" ng-cloak ng-show="saving">
              <i class="fa fa-spinner fa-spin" ></i>
            </span>Save
          </button>
      </span>
    </nc-page-title>

    <div class="row search-section-wrapper">
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Product Name and PID'" nc-search-event="onUnsave"></nc-search>
      <nc-pagination class="margin-top-10 float-right" nc-model="params" nc-pagination-total="list.total" nc-pagination-event="onUnsave" nc-pagination-sizes="paginationSize"></nc-pagination>
    </div>
    <nc-filter nc-model="params._filter" nc-filter-options="filterOptions" nc-filter-event="onUnsave"></nc-filter>
    <div>
      <div nc-empty="You have no product" ng-show="!isSearching() && !loading && list.data.length <= 0"></div>
      <div nc-empty="No Search Result" ng-show="isSearching() && !loading && list.data.length <= 0"></div>
      <div ng-show="loading" nc-loading="Loading Products.."></div>
      <form ng-show="!loading" class="ah-form sticky-mainform-action">
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-20 active">
            <div id="image-management-content-page">
              <div class="row" ng-repeat="product in list.data">
                <div class="col-xs-12">
                  <div class="form-section image-management">
                    <div class="alert-wrapper">
                      <nc-alert nc-model="product.alert"></nc-alert>
                    </div>
                    <div class="form-section-content">
                      <div class="content-text">
                        <div>
                          <h4><a ng-href="/products/{{product.ProductId}}">{{ product.ProductNameEn }}</a></h4>
                          <span ng-if="product.IsVariant">{{ product.VariantAttribute | variantValue }}</span>
                          <span ng-if="product.VariantCount > 0">Parent Product</span>
                        </div>
                        <hr/>
                        <div class="margin-top-5">PID: {{ product.Pid }}</div>
                        <div class="margin-top-5">Status:</div>
                        <div class="{{product.Status | mapDropdown:productStatus:'color'}}"><i class="fa padding-right-5 {{ product.Status | mapDropdown:productStatus:'icon' }}"></i>{{ product.Status | mapDropdown:productStatus}}</div>
                      </div>
                        <div class="picture-container">
                          <div class="col-xs-12 padding-left-0">
                            <nc-image-gallery ng-if="product.IsVariant" 
                                nc-model="product.VariantImg" 
                                nc-image-gallery-options="imageGalleryOptions"
                                nc-image-gallery-disabled="isDisabled(product)"></nc-image-gallery>
                            <nc-image-gallery ng-if="!product.IsVariant" 
                                nc-model="product.MasterImg" 
                                nc-image-gallery-options="imageGalleryOptions"
                                nc-image-gallery-disabled="isDisabled(product)"></nc-image-gallery>
                          </div>
                        </div>
                        <div class="drop-zone-container {{ getContainer(product) }}">
                          <nc-image-dropzone
                            ng-if="product.IsVariant"
                            nc-model="product.VariantImg"
                            nc-image-template="{{getTemplate(product)}}"
                            nc-image-uploader="uploader"
                            nc-image-dropzone-options="imageDropzoneOptions"
                            nc-image-dropzone-on-error="onError(product, $response)"
                            nc-image-dropzone-on-event="onEvent(product, $eventName)"
                            size="10"
                            is-uploading="product.isUploading"
                            ></nc-image-dropzone>
                          <nc-image-dropzone
                            ng-if="!product.IsVariant"
                            nc-model="product.MasterImg"
                            nc-image-template="{{getTemplate(product)}}"
                            nc-image-uploader="uploader"
                            nc-image-dropzone-options="imageDropzoneOptions"
                            nc-image-dropzone-on-error="onError(product, $response)"
                            nc-image-dropzone-on-event="onEvent(product, $eventName)"
                            size="10"
                            is-uploading="product.isUploading"
                            ></nc-image-dropzone>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="page-navigation">
             <nc-pagination nc-model="params" nc-pagination-total="list.total" nc-pagination-event="onUnsave" nc-pagination-sizes="paginationSize"></nc-pagination>
          </div>
        </div>
        <div class="add-product-form-action main-form-action full-width-row">
          <div class="container-fluid">
            <div class="float-right">
              <a class="btn btn-white btn-width-xl" data-toggle="modal" data-target="#image-guideline">View Guideline</a>
              <button ng-click="save()" class="btn btn-blue btn-width-xl">
                <span class="login-loading" ng-cloak ng-show="saving">
                  <i class="fa fa-spinner fa-spin" ></i>
                </span>Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

  </div>

<!-- data-toggle="modal" data-target="#import-product"' -->
  <? $this->insert('components/modal-guideline', ['id' => 'image-guideline', 'header' => 'Image Style Guideline']) ?>


<?php $this->stop() ?>
