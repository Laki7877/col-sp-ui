<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Account ']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="ProductImageListCtrl">
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

    <? $this->insert('components/search-section-with-page-index', ['serach_placeholder' => 'Search for Admin Accounts', 'optional_class' => 'hide-component']) ?>
    <div class="filter-section">
      <div class="filter-container">
        <span>Filters:</span>
        <a class="filter-first-option filter-active">All</a>
        <a class="filter-seperator">Image Missing</a>
        <a class="filter-seperator">Approved</a>
        <a class="filter-seperator">Not Approved</a>
        <a class="filter-seperator">Wait Approval</a>
        <a class="filter-seperator">Draft</a>
      </div>
    </div>
    <div>
      <form class="ah-form sticky-mainform-action">
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
            <? $this->insert('partials/image-management-content') ?>
          </div>
          <div class="page-navigation">
            <span>
              <i class="fa fa-chevron-left grey-chevron"></i>
              <span> Page 1 of 1</span>
              <i class="fa fa-chevron-right padding-right-15 blue-chevron"></i>
              <span class="view-page-separator">View per page</span>
              <!-- Split button -->
              <div class="btn-group dropdown-btn">
                <button type="button" class="btn btn-default dropdown-text">5</button>
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="caret"></span>
                  <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="#">5</a></li>
                  <li><a href="#">10</a></li>
                  <li><a href="#">15</a></li>
                </ul>
              </div>
            </span>
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