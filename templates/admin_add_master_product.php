<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Master Products']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminMasterProductAddCtrl" ng-init="init(<?=$params?>)">
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
          <!-- Master product -->
          <div class="form-section">
            <div class="form-section-header">
              <h2>Master Product Information</h2>
            </div>
            <div class="form-section-content">
              <div nc-template="common/input/form-group-with-label"
              nc-template-options-path="addMasterProductForm/ChildProducts"
                nc-label="Select Master Product" >

                <you-me display-by="CustomName" placeholder="Search 'Approved' Product"
                        auto-clear-search="true"
                        ng-model="formData.MasterProduct" refresh="getProducts" choices="products"></you-me>

              </div>
            </div>
          </div>

          <!-- Child Product -->
          <div class="form-section">
            <div class="form-section-header"><h2>Child Product</h2></div>
            <div class="form-section-content">
              <div nc-template="common/input/form-group-with-label"
                nc-label="Select Child Products"
                nc-template-form="form.ChildProducts"
                nc-template-options-path="addMasterProductForm/ChildProducts">

             <you-me display-by="CustomName" placeholder="Search 'Approved' Product"
                        name="ChildProducts"
                        ng-model="formData.ChildProducts" refresh="getChildProducts" in-relationship="true"
                        choices="childProducts | exclude: formData.ChildProducts : 'ProductId' | exclude: formData.MasterProduct : 'ProductId' "></you-me>


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
