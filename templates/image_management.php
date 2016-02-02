<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Account ']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="ProductImageManagementCtrl">
   <!-- <? $this->insert('components/alert-text', ['close' => true, 'color' => 'green', 'text' => "Successfully save changes. However,your changes won't be online until you published your products." ]) ?>
     -->

    <div class="page-header with-border">
        <h1 class="float-left page-header-title">Image Management</h1>
        <span class="float-right page-header-action">
            <a class="btn btn-white btn-width-xl margin-right-10" data-toggle="modal" data-target="#image-guideline">
              <span class="">View Guideline</span>
            </a>
            <a href="#" class="btn btn-blue  btn-width-xl ">
              <span class="">Save</span>
            </a>
        </span>
    </div>

    <div class="row search-section-wrapper">
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search Product'"></nc-search>
    </div>


    <nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>

    <div>
      <div ng-show="loading" nc-loading="Loading Products.."></div>
      <form class="ah-form sticky-mainform-action" ng-show="!loading">
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
            <? $this->insert('partials/image-management-content') ?>
          </div>
          <div class="page-navigation">
             <nc-pagination nc-model="params" nc-pagination-total="response.total"></nc-pagination>
          </div>  
        </div>
        <div class="add-product-form-action main-form-action full-width-row">
          <div class="container-fluid">
            <div class="float-right">
              <a class="btn btn-white btn-width-xl" data-toggle="modal" data-target="#image-guideline">View Guideline</a>
              <button class="btn btn-blue btn-width-xl">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>

  </div>
 
<!-- data-toggle="modal" data-target="#import-product"' -->
  <? $this->insert('components/modal-guideline', ['id' => 'image-guideline', 'header' => 'Image Style Guideline']) ?>


<?php $this->stop() ?>