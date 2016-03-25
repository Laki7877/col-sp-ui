<!doctype html>
<html class="no-js" lang="" ng-app="colspApp">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><?=$title?></title>
    <meta http-equiv="expires" content="Sun, 01 Oct 2045 00:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="<?= $this->asset('/assets/favicon.ico') ?>">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="stylesheet" href="<?=$this->asset('/assets/css/screen.css')?>" />
    <link rel="stylesheet" href="<?=$this->asset('/assets/libs/angular-bootstrap-datetimepicker/datetimepicker.css')?>" />
    <script src="<?= $this->asset('/assets/js/jquery.min.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/jquery.rest.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/bundle.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/bootstrap.min.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/bootstrap-fixconflict.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/jquery-ui.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/jquery.ui.nestedSortable.js') ?>"></script>
    <script src="<?= $this->asset('/assets/js/custom-js.js') ?>"></script>
    <script src="/assets/libs/ckeditor/ckeditor.js"></script>
    <script src="/assets/libs/ckeditor/config.js"></script>
    <script src="/assets/libs/ckfinder/ckfinder.js"></script>


    <script src="/assets/libs/moment/moment.min.js"></script>
    <link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">
    <link rel="stylesheet" href="/assets/libs/select2/css/selectize.css">

    <script src="/assets/libs/datepicker/js/bootstrap-datetimepicker.min.js"></script>
      
</head>

<body class="ahpt" ng-cloak ng-controller="RootCtrl" ng-strict-di>
    <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <div ng-if="!$root.DisablePage">
    <div id="debug">
        <?= $this->section('debug') ?>
    </div>
    <div id="wrapper">
        <?= $this->section('content') ?>
    </div>
    </div>
    <link rel="stylesheet" type="text/css" href="/assets/libs/datepicker/css/bootstrap-datetimepicker.min.css">

    <!--<script src="/assets/libs/select2/js/select2.js"></script>-->
    <!--<link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">-->

    <!--<script src="/assets/libs/angular-select2/select.min.js"></script>-->
    <link rel="stylesheet" type="text/css" href="/assets/libs/angular-select2/select.css">
     
    <!-- Create By Col Dev (Natee) -->
    <!-- Category -->
    <script type="text/ng-template" id="templates/admin-cms-category-manage.html">
        <div class="modal-header">
            <h3 class="modal-title">{{title}}</h3>
        </div>
        <div class="modal-body">
            <form class="form-horizontal margin-top-20" name="form" novalidate>

                <!-- Infomation -->
                <div class="row">
                    <div class="col-xs-12">
                        <div class="form-section">
                            <div class="form-section-header"><h2>Category Infomation</h2></div>
                            <div class="form-section-content">
                        
                                <!-- Name Thai -->
                                <div class="form-group">
                                    <label class="control-label col-xs-3">Name (Thai)</label>
                                    <div class="col-xs-7">
                                        <input type="text" class="form-control" 
                                            ng-model="CMSCategoryModel.CMSCollectionCategoryNameTH"
                                            placeholder="Category Name Thai" />
                                    </div>
                                    
                                </div>

                                <!-- Name EN -->
                                <div class="form-group">
                                    <label class="control-label col-xs-3">Name (English)</label>
                                    <div class="col-xs-7">
                                        <input type="text" class="form-control" 
                                                ng-model="CMSCategoryModel.CMSCollectionCategoryNameEN"
                                                placeholder="Category Name English" />
                                    </div>
                                </div>

                                <!-- Effective Date -->
                                <div class="form-group">
                                    <label class="control-label col-xs-3">Effective Date</label>
                                    <div class="col-xs-7">
                                        <div class="dropdown">
                                          <a class="dropdown-toggle" id="categoryEffectiveDate" role="button" data-toggle="dropdown" data-target="#" href="#">
                                              <input readonly style="background-color:white; width: 100%;" type="text"
                                               ng-class="{'has-error': endDate <= startDate }"
                                               placeholder="{{ startPlaceholder || 'Select start date' }}"
                                               class="form-control width-field-large"
                                               value="{{ startDate | date: 'dd/MM/yy HH:mm' }}" />
                                          </a>
                                          <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                              <datetimepicker data-ng-model="CMSCategoryModel.EffectiveDate" data-datetimepicker-config="{ dropdownSelector: '#categoryEffectiveDate', minView: 'minute' }" />

                                          </ul>
                                        </div>
                                    </div>
                                </div>

                              

                                <!-- Expiry Date -->
                                <div class="form-group">
                                    <label class="control-label col-xs-3">Expiry Date</label>
                                    <div class="col-xs-7">
                                        <div class="dropdown">
                                          <a class="dropdown-toggle" id="categoryExpiryDate" role="button" data-toggle="dropdown" data-target="#" href="#">
                                              <input readonly style="background-color:white; width: 100%;" type="text"
                                               ng-class="{'has-error': endDate <= startDate }"
                                               placeholder="{{ startPlaceholder || 'Select start date' }}"
                                               class="form-control width-field-large"
                                               value="{{ startDate | date: 'dd/MM/yy HH:mm' }}" />
                                          </a>
                                          <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                              <datetimepicker data-ng-model="CMSCategoryModel.ExpiryDate" data-datetimepicker-config="{ dropdownSelector: '#categoryExpiryDate', minView: 'minute' }" />

                                          </ul>
                                        </div>
                                    </div>
                                </div>

                                <!-- Visibility -->
                                <div class="form-group">
                                    <label class="control-label col-xs-3">Visibility</label>
                                    <div class="col-xs-7">
                                        <select class="form-control" ng-model="CMSCategoryModel.Visibility">
                                            <option value="">-- Select Visibility --</option>
                                            <option value="1">Visible</option>
                                            <option value="0">Not Visible</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <!-- Products in Category -->
                <div class="row">
                    <div class="col-xs-12">
                        <div class="form-section">
                            <div class="form-section-header"><h2>Product Item in This Category</h2></div>
                            <div class="form-section-content">

                                <div class="col-xs-12">
                                    
                                    <button class="btn btn-blue btn-width-xxl" ng-click="addProductItem()">
                                        Add Product Item
                                    </button>
                                    <br /><br />

                                    <div class="table-section" style="margin-top: 0;" ng-show="!loading && !isEmpty">
                                        <table class="table table-curved">
                                            <thead>
                                                <tr class="table-head">
                                                    <th>
                                                        <input type="checkbox" 
                                                                ng-model="isCheckedAll" 
                                                                ng-click="checkAll(isCheckedAll)" />
                                                    </th>
                                                    <th>Product Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr ng-repeat="item in filterdItem = (products | filter: search)">
                                                    <td>
                                                        <input type="checkbox" 
                                                                ng-model="item.IsChecked"
                                                                ng-click="checkOnce(item, item.IsChecked)" />
                                                    </td>
                                                    <td>{{item.ProductName}}</td>
                                                    <td>
                                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- loading -->
                                    <div class="empty-section margin-top-20 margin-bottom-20" ng-show="loading">
                                      <span>
                                        <img class="loading-img" src="/assets/img/loader.gif" />
                                      </span>Loading...</span>
                                    </div>

                                    <!-- empty -->
                                    <div class="local-category-page margin-bottom-20" ng-show="isEmpty">
                                      <div class="local-category-empty-section margin-top-20">
                                        <span class="">
                                          <span class="zero-category-image">
                                          </span>
                                        </span>
                                        <span class="local-category-empty-text">
                                            You do not have any Category
                                        </span>
                                      </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-xs-12">
                        <div class="container-fluid no-padding margin-top-20">
                            <div class="float-right">
                              <a href="#" class="link-btn-plain" ng-click="$dismiss()">Cancel</a>
                                <button class="btn btn-blue btn-width-xl" ng-click="save(categoryName)">
                                <span class="login-loading" ng-cloak ng-show="saving">
                                        <i class="fa fa-spinner fa-spin" ></i></span>Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </script>

    <!-- Add Product To Category -->
    <script type="text/ng-template" id="templates/admin-cms-category-manage-add-item.html">
        <div class="modal-header">
            <h3 class="modal-title">Add Product Item</h3>
        </div>
        <div class="modal-body">
            <form class="form-horizontal margin-top-20" name="form" novalidate>

                <!-- Search Products -->
                <div class="row">
                    <div class="col-xs-12">
                        <div class="form-section">
                            <div class="form-section-header"><h2>Search Products</h2></div>
                            <div class="form-section-content">

                              <!-- Category -->
                              <div class="form-group">
                                <label class="control-label col-xs-3">Category</label>
                                <div class="col-xs-7">
                                  <ui-select ng-model="category.selected" ng-disabled="disabled" style="min-width: 300px;">
                                    <ui-select-match placeholder="Select a category in the list">{{$select.selected.NameEn}}</ui-select-match>
                                    <ui-select-choices repeat="cate in categorys | propsFilter: {NameEn: $select.search, NameTh: $select.search}">
                                      <div ng-bind-html="cate.NameEn | highlight: $select.search"></div>
                                    </ui-select-choices>
                                  </ui-select>
                                </div>
                              </div>

                              <!-- Brand -->
                              <div class="form-group">
                                  <label class="control-label col-xs-3">Brand</label>
                                  <div class="col-xs-7">
                                    <ui-select ng-model="brand.selected" ng-disabled="disabled" style="min-width: 300px;">
                                      <ui-select-match placeholder="Select a brand in the list">{{$select.selected.BrandNameEn}}</ui-select-match>
                                      <ui-select-choices repeat="b in brands | propsFilter: {BrandNameTh: $select.search, BrandNameTh: $select.search}">
                                        <div ng-bind-html="b.BrandNameEn | highlight: $select.search"></div>
                                      </ui-select-choices>
                                    </ui-select>
                                  </div>
                              </div>
                              
                              <!-- Tag -->
                              <div class="form-group">
                                  <label class="control-label col-xs-3">Tag</label>
                                  <div class="col-xs-7">
                                    
                                    <ui-select multiple ng-model="tag.selected" ng-disabled="disabled" style="min-width: 300px;">
                                      <ui-select-match placeholder="Select tags">{{$item.Tag}}</ui-select-match>
                                      <ui-select-choices repeat="t in tags | propsFilter: {Tag: $select.search}">
                                        <div ng-bind-html="t.Tag | highlight: $select.search"></div>
                                      </ui-select-choices>
                                    </ui-select>
                                  </div>
                              </div>
                              
                              <!-- Search By -->
                              <div class="form-group">
                                  <label class="control-label col-xs-3">Search By</label>
                                  <div class="col-xs-7">
                                    <select class="form-control" ng-model="searchBy">
                                      <option value="">Select Option</option>
                                      <option value="name">Name</option>
                                      <option value="sku">SKU</option>
                                      <option value="pid">PID</option>
                                    </select>
                                  </div>
                              </div>

                                <div class="form-group">
                                    <label class="control-label col-xs-3">Search Products</label>
                                    <div class="col-xs-7">
                                        <input type="text" class="form-control" 
                                            ng-model="searchProductInput"
                                            ng-enter="search(searchProductInput)"
                                            placeholder="Search Products..." />
                                    </div>
                                </div>

                                <div style="padding: 10px;">
                                    <div class="table-section" ng-show="!loading && !isEmpty">
                                        <table class="table table-curved">
                                            <thead>
                                                <tr class="table-head">
                                                    <th>
                                                        <input type="checkbox" 
                                                                ng-model="isCheckedAll" 
                                                                ng-click="checkAll(isCheckedAll)" />
                                                    </th>
                                                    <th>Product Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr ng-repeat="item in products">
                                                    <td>
                                                        <input type="checkbox" 
                                                                ng-model="item.IsChecked"
                                                                ng-click="checkOnce(item, item.IsChecked)" />
                                                    </td>
                                                    <td>{{item.ProductName}}</td>
                                                    <td>
                                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <!-- loading -->
                                    <div class="empty-section margin-top-20 margin-bottom-20" ng-show="loading">
                                      <span>
                                        <img class="loading-img" src="/assets/img/loader.gif" />
                                      </span>Loading...</span>
                                    </div>

                                    <!-- empty -->
                                    <div class="local-category-page margin-bottom-20" ng-show="isEmpty">
                                      <div class="local-category-empty-section margin-top-20">
                                        <span class="">
                                          <span class="zero-category-image">
                                          </span>
                                        </span>
                                        <span class="local-category-empty-text">
                                            {{message}}
                                        </span>
                                      </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <div class="container-fluid no-padding margin-top-20">
                            <div class="float-right">
                              <a href="#" class="link-btn-plain" ng-click="$dismiss()">Cancel</a>
                                <button class="btn btn-blue btn-width-xl" ng-click="ok(products)">
                                <span class="login-loading" ng-cloak ng-show="saving">
                                        <i class="fa fa-spinner fa-spin" ></i></span>Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </script>

    <!-- Collection -->
    <script type="text/ng-template" id="templates/admin-cms-collection-manage.html">
        <div class="modal-header">
            <h3 class="modal-title">Add New Collection</h3>
        </div>
        <div class="modal-body">
            <form class="form-horizontal" name="form" novalidate>

              <!-- Infomation -->
              <div class="row">
                <div class="col-xs-12">
                  <div class="form-section">
                    <div class="form-section-header">
                      <h2>Collection Infomation</h2>
                    </div>
                    <div class="form-section-content">

                      <!-- Name Thai -->
                      <div class="form-group">
                        <label class="control-label col-xs-3">Name (Thai)</label>
                        <div class="col-xs-7">
                          <input type="text" class="form-control"
                              ng-model="categoryNameThai"
                              placeholder="Category Name Thai" />
                        </div>

                      </div>

                      <!-- Name EN -->
                      <div class="form-group">
                        <label class="control-label col-xs-3">Name (English)</label>
                        <div class="col-xs-7">
                          <input type="text" class="form-control"
                                  ng-model="categoryNameEn"
                                  placeholder="Category Name English" />
                        </div>
                      </div>

                      <!-- Effective Date -->
                      <div class="form-group">
                        <label class="control-label col-xs-3">Effective Date</label>
                        <div class="col-xs-7">
                          <div class="dropdown">
                            <a class="dropdown-toggle" id="categoryEffectiveDate" role="button" data-toggle="dropdown" data-target="#" href="#">
                              <input readonly="" style="background-color:white; width: 100%;" type="text"
                               ng-class="{'has-error': endDate"<= startDate }"
                              placeholder="{{ startPlaceholder || 'Select start date' }}"
                              class="form-control width-field-large"
                              value="{{ startDate | date: 'dd/MM/yy HH:mm' }}" />
                            </a>
                            <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                              <datetimepicker data-ng-model="startDate" data-datetimepicker-config="{ dropdownSelector: '#categoryEffectiveDate', minView: 'minute' }" />

                            </ul>
                          </div>
                        </div>
                      </div>



                      <!-- Expiry Date -->
                      <div class="form-group">
                        <label class="control-label col-xs-3">Expiry Date</label>
                        <div class="col-xs-7">
                          <div class="dropdown">
                            <a class="dropdown-toggle" id="categoryExpiryDate" role="button" data-toggle="dropdown" data-target="#" href="#">
                              <input readonly="" style="background-color:white; width: 100%;" type="text"
                               ng-class="{'has-error': endDate"<= startDate }"
                              placeholder="{{ startPlaceholder || 'Select start date' }}"
                              class="form-control width-field-large"
                              value="{{ startDate | date: 'dd/MM/yy HH:mm' }}" />
                            </a>
                            <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                              <datetimepicker data-ng-model="startDate" data-datetimepicker-config="{ dropdownSelector: '#categoryExpiryDate', minView: 'minute' }" />

                            </ul>
                          </div>
                        </div>
                      </div>

                      <!-- URLKey -->
                      <div class="form-group">
                        <label class="control-label col-xs-3">URL Key</label>
                        <div class="col-xs-7">
                          <input type="text" class="form-control"
                              ng-model="categoryNameThai"
                              placeholder="URL Key" />
                        </div>
                      </div>

                      <!-- Visibility -->
                      <div class="form-group">
                        <label class="control-label col-xs-3">Visibility</label>
                        <div class="col-xs-7">
                          <select class="form-control">
                            <option value="">-- Select Visibility --</option>
                            <option value="1">Visible</option>
                            <option value="0">Not Visible</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <!-- Category in Collection -->
              <div class="row">
                <div class="col-xs-12">
                  <div class="form-section">
                    <div class="form-section-header">
                      <h2>Category Item in This Collection</h2>
                    </div>
                    <div class="form-section-content">

                      <div class="col-xs-12">

                        <button class="btn btn-blue btn-width-xxl" ng-click="addCategoryItem()">
                          Add Category Item
                        </button>
                        <br />
                        <br />

                        <div class="table-section" style="margin-top: 0;" ng-show="!loading && !isEmpty">
                          <table class="table table-curved">
                            <thead>
                              <tr class="table-head">
                                <th>
                                  <input type="checkbox"
                                          ng-model="isCheckedAll"
                                          ng-click="checkAll(isCheckedAll)" />
                                </th>
                                <th>Product Name</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr ng-repeat="item in filterdItem = (products | filter: search)">
                                <td>
                                  <input type="checkbox"
                                          ng-model="item.IsChecked"
                                          ng-click="checkOnce(item, item.IsChecked)" />
                                </td>
                                <td>{{item.ProductName}}</td>
                                <td>

                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <!-- loading -->
                        <div class="empty-section margin-top-20 margin-bottom-20" ng-show="loading">
                          <span>
                            <img class="loading-img" src="/assets/img/loader.gif" />
                          </span>Loading...</span>
                        </div>

                        <!-- empty -->
                        <div class="local-category-page margin-bottom-20" ng-show="isEmpty">
                          <div class="local-category-empty-section margin-top-20">
                            <span class="">
                              <span class="zero-category-image">
                              </span>
                            </span>
                            <span class="local-category-empty-text">
                              You do not have any Category
                            </span>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>


                <div class="row">
                    <div class="col-xs-12">
                        <div class="container-fluid no-padding margin-top-20">
                            <div class="float-right">
                              <a href="#" class="link-btn-plain" ng-click="$dismiss()">Cancel</a>
                                <button class="btn btn-blue btn-width-xl" ng-click="save(categoryName)">
                                <span class="login-loading" ng-cloak ng-show="saving">
                                        <i class="fa fa-spinner fa-spin" ></i></span>Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </script>

    <!-- Add Category To Collection -->
    <script type="text/ng-template" id="templates/admin-cms-collection-manage-add-item.html">
      <div class="modal-header">
        <h3 class="modal-title">Add Category Item</h3>
      </div>
      <div class="modal-body">
        <form class="form-horizontal margin-top-20" name="form" novalidate="">

          <!-- Search Category -->
          <div class="row">
            <div class="col-xs-12">
              <div class="form-section">
                <div class="form-section-header">
                  <h2>Search Products</h2>
                </div>
                <div class="form-section-content">

                  <!-- Search -->
                  <div class="form-group">
                    <label class="control-label col-xs-3">Search Products</label>
                    <div class="col-xs-7">
                      <select class="form-control">
                        <option value="">-- Search By Options --</option>
                        <option value="">Brand</option>
                        <option value="">Tag</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="control-label col-xs-3">Search Products</label>
                    <div class="col-xs-7">
                      <input type="text" class="form-control"
                          ng-model="searchProductModel"
                          ng-keyup="search()"
                          placeholder="Search Products..." />
                    </div>
                  </div>

                  <div style="padding: 10px;">
                    <div class="table-section" ng-show="!loading && !isEmpty">
                      <table class="table table-curved">
                        <thead>
                          <tr class="table-head">
                            <th>
                              <input type="checkbox"
                                      ng-model="isCheckedAll"
                                      ng-click="checkAll(isCheckedAll)" />
                            </th>
                            <th>Product Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr ng-repeat="item in filterdItem = (products | filter: search)">
                            <td>
                              <input type="checkbox"
                                      ng-model="item.IsChecked"
                                      ng-click="checkOnce(item, item.IsChecked)" />
                            </td>
                            <td>{{item.ProductName}}</td>
                            <td>

                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- loading -->
                    <div class="empty-section margin-top-20 margin-bottom-20" ng-show="loading">
                      <span>
                        <img class="loading-img" src="/assets/img/loader.gif" />
                      </span>Loading...</span>
                    </div>

                    <!-- empty -->
                    <div class="local-category-page margin-bottom-20" ng-show="isEmpty">
                      <div class="local-category-empty-section margin-top-20">
                        <span class="">
                          <span class="zero-category-image">
                          </span>
                        </span>
                        <span class="local-category-empty-text">
                          {{message}}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <div class="container-fluid no-padding margin-top-20">
                <div class="float-right">
                  <a href="#" class="link-btn-plain" ng-click="$dismiss()">Cancel</a>
                  <button class="btn btn-blue btn-width-xl" ng-click="ok(products)">
                    <span class="login-loading" ng-cloak="" ng-show="saving">
                      <i class="fa fa-spinner fa-spin" ></i>
                    </span>Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </script>

    <!-- Group -->
    <script type="text/ng-template" id="templates/admin-cms-group-manage.html">
        <div class="modal-header">
            <h3 class="modal-title">Add New Group</h3>
        </div>
        <div class="modal-body">
            <form class="ah-form margin-top-20" name="form" novalidate>

                <!-- Infomation -->
                <div class="row">
                    <div class="col-xs-12">
                        <div class="form-section">
                            <div class="form-section-header"><h2>Category Infomation</h2></div>
                            <div class="form-section-content">
                        
                                <!-- Name Thai -->
                                <div class="form-group">
                                    <label class="control-label">Name (Thai)</label>
                                    <input type="text" class="form-control" 
                                            ng-model="categoryNameThai"
                                            placeholder="Category Name Thai" />
                                </div>

                                <!-- Name EN -->
                                <div class="form-group">
                                    <label class="control-label">Name (English)</label>
                                    <input type="text" class="form-control" 
                                            ng-model="categoryNameEn"
                                            placeholder="Category Name English" />
                                </div>

                                <!-- Effective Date -->
                                <div class="form-group">
                                    <label class="control-label">Effective Date</label>
                                    <div class="dropdown">
                                      <a class="dropdown-toggle" id="categoryEffectiveDate" role="button" data-toggle="dropdown" data-target="#" href="#">
                                          <input readonly style="background-color:white; width: 100%;" type="text"
                                           ng-class="{'has-error': endDate <= startDate }"
                                           placeholder="{{ startPlaceholder || 'Select start date' }}"
                                           class="form-control width-field-large"
                                           value="{{ startDate | date: 'dd/MM/yy HH:mm' }}" />
                                      </a>
                                      <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                          <datetimepicker data-ng-model="startDate" data-datetimepicker-config="{ dropdownSelector: '#categoryEffectiveDate', minView: 'minute' }" />

                                      </ul>
                                    </div>
                                </div>

                              

                                <!-- Expiry Date -->
                                <div class="form-group">
                                    <label class="control-label">Expiry Date</label>
                                    <div class="dropdown">
                                      <a class="dropdown-toggle" id="categoryExpiryDate" role="button" data-toggle="dropdown" data-target="#" href="#">
                                          <input readonly style="background-color:white; width: 100%;" type="text"
                                           ng-class="{'has-error': endDate <= startDate }"
                                           placeholder="{{ startPlaceholder || 'Select start date' }}"
                                           class="form-control width-field-large"
                                           value="{{ startDate | date: 'dd/MM/yy HH:mm' }}" />
                                      </a>
                                      <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                          <datetimepicker data-ng-model="startDate" data-datetimepicker-config="{ dropdownSelector: '#categoryExpiryDate', minView: 'minute' }" />

                                      </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Effect & Expiry -->
                <div class="row">
                    <div class="col-xs-12">
                        <div class="form-section">
                            <div class="form-section-header"><h2>Category Prducts</h2></div>
                            <div class="form-section-content">

                                <!-- Search -->
                                <div class="form-group">
                                    <label class="control-label">Search Products</label>
                                </div>

                                <div class="form-group">
                                    <select class="form-control">
                                        <option value="">-- Search By Options --</option>
                                        <option value="">Brand</option>
                                        <option value="">Tag</option>
                                    </select>
                                    <br />
                                    <input type="text" class="form-control" 
                                            ng-model="search"
                                            placeholder="Search Products..." />
                                </div>

                                <div class="form-group">
                                    <div class="table-section">
                                    <label class="control-label">Result ({{filterdItem.length}}) item</label>
                                        <table class="table table-curved">
                                            <thead>
                                                <tr class="table-head">
                                                    <th>
                                                        <input type="checkbox" 
                                                                ng-model="isCheckedAll" 
                                                                ng-click="checkAll(isCheckedAll)" />
                                                    </th>
                                                    <th>Product Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr ng-repeat="item in filterdItem = (products | filter: search)">
                                                    <td>
                                                        <input type="checkbox" 
                                                                ng-model="item.IsChecked"
                                                                ng-click="checkOnce(item, item.IsChecked)" />
                                                    </td>
                                                    <td>{{item.ProductName}}</td>
                                                    <td>
                                                        
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-xs-12">
                        <div class="container-fluid no-padding margin-top-20">
                            <div class="float-right">
                              <a href="#" class="link-btn-plain" ng-click="$dismiss()">Cancel</a>
                                <button class="btn btn-blue btn-width-xl" ng-click="save(categoryName)">
                                <span class="login-loading" ng-cloak ng-show="saving">
                                        <i class="fa fa-spinner fa-spin" ></i></span>Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </script>

</body>

</html>
