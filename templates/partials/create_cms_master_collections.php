<div id="create_cms_collectons_tab_content">
  <div class="row">
    <div class="col-xs-12">
      <div class="form-section">
        <div class="form-section-header">
          <h2>CMS Collections</h2>
        </div>
        <div class="form-section-content">
          <div class="form-group">
            <div class="col-sm-12">
              <button ng-click="addCategoryItem()" class="btn btn-primary">Add Category Item</button>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-12">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <!--<th class="col-sm-1">
                      <input type="checkbox" ng-model="isCheckedAll" ng-click="checkAll(isCheckedAll)" />
                    </th>-->
                    <th class="col-sm-1">Seq</th>
                    <th class="col-sm-2">Name(English)</th>
                    <th class="col-sm-2">Name(ไทย)</th>
                    <th class="col-sm-1 text-center">Total Item</th>
                    <th class="col-sm-2">Actions</th>
                  </tr>
                </thead>
                <tbody id="sortable">
                  <tr ng-repeat="item in CategoryList | orderBy : 'Sequence'">
                    <!--<td>
                      <input type="checkbox" ng-model="item.IsChecked" ng-click="checkOnce(item, item.IsChecked)" />
                    </td>-->
                    <td>{{$index + 1}}</td>
                    <td>{{item.CMSCategoryNameEN}}</td>
                    <td>{{item.CMSCategoryNameTH}}</td>
                    <td class="text-center">{{item.Total}}</td>
                    <td>
                      <button class="btn btn-sm btn-default" ng-disabled="$index == 0 || (CategoryList.length == 0)"
                          ng-click="moveUp($index, $index - 1)">
                        <i class="fa fa-chevron-up"></i>
                      </button>
                      <button class="btn btn-sm btn-default" ng-disabled="$index == (CategoryList.length - 1) || (CategoryList.length == 0)"
                              ng-click="moveDown($index, $index + 1)">
                        <i class="fa fa-chevron-down"></i>
                      </button>
                      <button class="btn btn-sm btn-default" ng-click="removeOnceItem($index)">
                        <i class="fa fa-trash-o"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="5">
                      <h3>Total: {{getTotalItems()}}</h3>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Product -->
      <div class="form-section">
        <div class="form-section-header">
          <h2>Featured Products</h2>
        </div>
        <div class="form-section-content">

          <div class="form-group">
            <label class="col-md-2 text-right">Featured Product Title</label>
            <div class="col-md-6">
              <input type="text" class="form-control" ng-model="formData.FeatureTitle" />
            </div>
          </div>

          <div class="form-group" id="form-master">
            <label class="col-md-2 text-right">Featured Product</label>
            <div class="col-md-6">
              <ui-select multiple="" ng-model="product.selected" ng-disabled="disabled" style="min-width: 300px;">
                <ui-select-match placeholder="Select a product in the list">{{$item.ProductNameEn}}</ui-select-match>
                <ui-select-choices repeat="p in products | propsFilter: {ProductNameEn: $select.search, ProductNameTh: $select.search}">
                  <div ng-bind-html="p.ProductNameEn | highlight: $select.search"></div>
                </ui-select-choices>
              </ui-select>
            </div>
          </div>

          <div class="form-group">
            <label class="col-md-2 text-right">Visibility</label>
            <div class="col-md-6">
              <select ng-model="formData.TitleShowcase" class="form-control">
                <option value="true" ng-selected="formData.TitleShowcase == true">Visible</option>
                <option value="false"  ng-selected="formData.TitleShowcase == false">Not Visible</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

<!-- modal temaplate -->
<script type="text/ng-template" id="templates/admin-cms-master-add-item.html">

  <div class="modal-header" style="margin-bottom:10px;">
    <h3 class="modal-title">Add CMS Master Item</h3>
  </div>
  <div class="modal-body">

    <form class="form" name="form" novalidate="">

      <div class="row">
        <div class="col-md-6">

          <div class="form-section">
            <div class="form-section-header">
              <h2>Search CMS Category</h2>
            </div>
            <div class="form-section-content" style="padding: 10px; min-height: 400px;">

              <div class="form-group">
                <label>Search</label>
                <div class="input-group search-box" style="min-width: 300px;">
                  <input class="form-control input-search-icon" ng-model="searchText" placeholder="Search for CMS Category" />
                  <span class="input-group-btn">
                    <button class="btn btn-default btn-action" ng-click="search(searchText)">Search</button>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Table result -->
        <div class="col-md-6">
          <div class="form-section">
            <div class="form-section-header">
              <h2>Result</h2>
            </div>
            <div class="form-section-content" style="padding: 10px; min-height: 400px; overflow: auto;">

              <div class="table-section" style="margin-top: 0px;" ng-show="!loading && !isEmpty">
                <table class="table table-curved">
                  <thead>
                    <tr class="table-head">
                      <th class="col-sm-1">
                        <input type="checkbox" ng-model="isCheckedAll" ng-click="checkAll(isCheckedAll)" />
                      </th>
                      <th class="col-sm-4">Name</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr ng-repeat="item in categories">
                      <td>
                        <input type="checkbox" ng-model="item.IsChecked" ng-click="checkOnce(item, item.IsChecked)" />
                      </td>
                      <td>{{item.CMSCategoryNameEN}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- loading -->
              <div class="empty-section" ng-show="loading">
                <span>
                  <img class="loading-img" src="/assets/img/loader.gif" />
                </span>Loading...</span>
              </div>

              <!-- empty -->
              <div class="local-category-page" ng-show="isEmpty">
                <span>
                  <img src="/assets/img/graphic-zero-category.png" />
                </span>{{message}}</span>
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
              <button class="btn btn-blue btn-width-xl" ng-click="ok(categories)" ng-disabled="sumCategorySelected() == 0">
                <span class="login-loading" ng-cloak="" ng-show="saving">
                  <i class="fa fa-spinner fa-spin" ></i>
                </span> Add ({{sumCategorySelected() }})
              </button>
            </div>
          </div>
        </div>
      </div>

    </form>
  </div>
</script>