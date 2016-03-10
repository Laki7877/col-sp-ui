<!doctype html>
<html class="no-js" lang="" ng-app="colspApp">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>
        <?=$title?>
    </title>
    <meta http-equiv="expires" content="Sun, 01 Oct 2016 00:00:00 GMT" />
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

    <script src="/assets/libs/datepicker/js/bootstrap-datetimepicker.min.js"></script>
</head>

<body class="ahpt" ng-cloak ng-controller="RootCtrl">
    <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <!-- Modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="modal-loading">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h3 class="modal-title margin-bottom-20">Processing...</h3>
                    <div class="progress margin-0">
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                        </div>
                    </div>
                </div>
                <!-- end .modal-body -->
            </div>
            <!-- end .modal-content -->
        </div>
        <!-- end .modal-dialog -->
    </div>
    <!-- end .modal -->

    <div id="debug">
        <?= $this->section('debug') ?>
    </div>
    <div id="wrapper">
        <?= $this->section('content') ?>
    </div>
    <link rel="stylesheet" type="text/css" href="/assets/libs/datepicker/css/bootstrap-datetimepicker.min.css">

    <!--<script src="/assets/libs/select2/js/select2.js"></script>-->
    <!--<link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">-->

    <!--<script src="/assets/libs/angular-select2/select.min.js"></script>-->
    <link rel="stylesheet" type="text/css" href="/assets/libs/angular-select2/select.css">

    <!-- Create By Col Dev (Natee) -->
    <script type="text/ng-template" id="templates/admin-cms-category-manage.html">
        <div class="modal-header">
            <h3 class="modal-title">Add New Category</h3>
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
                                              <datetimepicker data-ng-model="startDate" data-datetimepicker-config="{ dropdownSelector: '#categoryExpiryDate', minView: 'minute' }" />

                                          </ul>
                                        </div>
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

    <script type="text/ng-template" id="templates/admin-cms-collection-manage.html">
        <div class="modal-header">
            <h3 class="modal-title">Add New Collection</h3>
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
