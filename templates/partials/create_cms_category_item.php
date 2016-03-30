<div id="create_cms_collection_item">

  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-sm btn-primary" ng-click="addProductItem()">
        <i class="fa fa-plus-circle"></i>
      </button>
    </div>
  </div>
  <br />
  <div class="row">
    <div class="col-md-12">
      
      <div class="form-section">
        <div class="form-section-header">
          <h2>List Product in This Category</h2>
        </div>
        <div class="form-section-content" style="padding-left: 10px; padding-right: 10px;">

          <div class="btn-group search-section-item" role="group">
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-default dropdown-toggle bulk-action-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" uib-dropdown-toggle="">
                <span class="ng-binding">{{selectOptionText}}</span>
                <span class="caret"></span>
              </button>
              <ul uib-dropdown-menu="" role="menu" class="dropdown-menu">
                <li class="ng-scope">
                  <a ng-click="selectOption('- Choose Action -')" class="ng-binding">- Choose Action -</a>
                </li>
                <li class="ng-scope">
                  <a ng-click="selectOption('Delete')" class="ng-binding">Delete</a>
                </li>
              </ul>
            </div>
            <button type="button" class="btn btn-default btn-action" ng-click="removeMultiItem()">
              Confirm
              <span ng-show="formData.CategoryProductList.length > 0">({{sumProductSelected()}})</span>
            </button>
          </div>
          
          <br />
          <br />
          
          <table class="table table-curved">
            <thead class="table-head bg-info">
              <tr>
                <th class="col-sm-1">
                  <input type="checkbox" ng-model="isCheckedAll" ng-click="checkAll(isCheckedAll)" />
                </th>
                <th class="col-sm-1">Seq</th>
                <th class="col-sm-7">Name</th>
                <th class="col-sm-2">Actions</th>
              </tr>
            </thead>

            <tbody id="sortable">
              <tr ng-repeat="item in formData.CategoryProductList | orderBy : 'Sequence'">
                <td>
                  <input type="checkbox" ng-model="item.IsChecked" ng-click="checkOnce(item, item.IsChecked)" />
                </td>
                <td>{{item.Sequence}}</td>
                <td>{{item.ProductBoxBadge}}</td>
                <td>
                  <button class="btn btn-sm btn-default" ng-disabled="$index == 0 || (formData.CategoryProductList.length == 0)" 
                          ng-click="moveUp($index, $index - 1)">
                    <i class="fa fa-chevron-up"></i>
                  </button>
                  <button class="btn btn-sm btn-default" ng-disabled="$index == (formData.CategoryProductList.length - 1) || (formData.CategoryProductList.length == 0)" 
                          ng-click="moveDown($index, $index + 1)">
                    <i class="fa fa-chevron-down"></i>
                  </button>
                  <button class="btn btn-sm btn-default" ng-click="removeOnceItem($index)">
                    <i class="fa fa-trash-o"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
         
        </div>
      </div>
    </div>
  </div>
</div>

<!-- modal temaplate -->
<script type="text/ng-template" id="templates/admin-cms-category-manage-add-item.html">
  
  <div class="modal-header">
    <h3 class="modal-title">Add Category Item</h3>
  </div>
  <div class="modal-body">
    <form class="form-horizontal margin-top-20" name="form" novalidate="">

      <div class="row">
        <div class="col-md-6">

          <div class="form-section">
            <div class="form-section-header">
              <h2>Search Product</h2>
            </div>
            <div class="form-section-content" style="padding: 10px; min-height: 300px;">
              
              <!-- Category -->
              <div class="form-group">
                <!--<label class="control-label col-xs-3">Category</label>-->
                <div class="col-xs-12">
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
                <!--<label class="control-label col-xs-3">Brand</label>-->
                <div class="col-xs-12">
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
                <!--<label class="control-label col-xs-3">Tag</label>-->
                <div class="col-xs-12">

                  <ui-select multiple="" ng-model="tag.selected" ng-disabled="disabled" style="min-width: 300px;">
                    <ui-select-match placeholder="Select tags">{{$item.Tag}}</ui-select-match>
                    <ui-select-choices repeat="t in tags | propsFilter: {Tag: $select.search}">
                      <div ng-bind-html="t.Tag | highlight: $select.search"></div>
                    </ui-select-choices>
                  </ui-select>
                </div>
              </div>

              <!-- Search By -->
              <div class="form-group">
                <!--<label class="control-label col-xs-3">Search By</label>-->
                <div class="col-xs-12">
                  <select class="form-control" ng-model="searchBy" style="min-width: 300px;">
                    <option value="ProductName">Name</option>
                    <option value="SKU">SKU</option>
                    <option value="PID">PID</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <!--<label class="control-label col-xs-3">Search</label>-->
                <div class="col-xs-12">
                  <div class="input-group search-box" style="min-width: 300px;">
                    <input class="form-control input-search-icon" ng-model="searchText" placeholder="Search for Product" />
                    <span class="input-group-btn">
                      <button class="btn btn-default btn-action" ng-click="search(searchText)">Search</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-section">
            <div class="form-section-header">
              <h2>Result</h2>
            </div>
            <div class="form-section-content" style="padding: 10px; min-height: 300px; overflow: auto;">
              <table class="table">
                <tr>
                  <th class="col-sm-1">
                    <input type="checkbox" ng-model="item.IsChecked" ng-click="checkOnce(item, item.IsChecked)" />
                  </th>
                  <th class="col-sm-8">Name</th>
                  <th class="col-sm-2">Actions</th>
                </tr>

                <tr ng-repeat="item in products">
                  <td>
                    <input type="checkbox" ng-model="item.IsChecked" ng-click="checkOnce(item, item.IsChecked)" />
                  </td>
                  <td>{{item.ProductNameEn}}</td>
                  <td>
                    <button class="btn btn-sm btn-default">
                      <i class="fa fa-chevron-right"></i>
                    </button>
                  </td>
                </tr>
              </table>
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
                </span> Add
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </form>
  </div>
</script>
