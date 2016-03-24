<div id="create_cms_category_information">

    <div class="row">
        <div class="col-xs-12">
            <div class="form-section">
                <div class="form-section-header"><h2>Category Information</h2></div>
                <div class="form-section-content">
                    <div nc-template="common/input/form-group-with-label" nc-label="Category Name(TH)" nc-template-form="formData.CMSCategoryNameTH" nc-template-options-path="CMSCategoryForm/NameTH">
                        <input class="form-control width-field-large" name="CMSCategoryNameTH" ng-model="formData.CMSCategoryNameTH" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>

                    <div nc-template="common/input/form-group-with-label" nc-label="Category Name(EN)" nc-template-form="formData.CMSCategoryNameEN" nc-template-options-path="CMSCategoryForm/NameEN">
                        <input class="form-control width-field-large" name="CMSCategoryNameEN" ng-model="formData.CMSCategoryNameEN" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                    </div>
                  
                    <div nc-template="common/input/form-group-with-label" nc-label="Active">
                      <div class="ah-select2-dropdown">
                        <select ng-model="formData.IsActive" class="form-control width-field-large" required="">
                          <option value="true" ng-selected="formData.IsActive"> Active</option>
                          <option value="false" ng-selected="!formData.IsActive"> In Active</option>
                        </select>
                      </div>
                    </div>
                  
                </div>
            </div>

         
            <div class="form-section">
                <div class="form-section-header"><h2>Product Item in This Category</h2></div>
                <div class="form-section-content">

                  <div class="col-xs-12">

                    <button class="btn btn-blue btn-width-xxl" ng-click="addProductItem()">
                      Add Product Item
                    </button>
                    <br />
                    <br />

                    <table class="table table-curved">
                      <thead>
                        <tr>
                          <td>seq</td>
                          <td>name</td>
                        </tr>
                      </thead>

                      <tbody ui-sortable="sortableOptions" ng-model="formData.CategoryProductList">
                        <tr ng-repeat="item in formData.CategoryProductList">
                          <td>{{$index}}</td>
                          <td>{{item.ProductBoxBadge}}</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div class="table-section" style="margin-top: 0;" >

                      <!--<table class="table table-curved">
                        <thead>
                          <tr class="table-head">
                            <th>
                              <input type="checkbox"
                                      ng-model="isCheckedAll"
                                      ng-click="checkAll(isCheckedAll)" />
                            </th>
                            <th>Product Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody ui-sortable ng-model="formData.CategoryProductList">
                          <tr ng-repeat="item in formData.CategoryProductList">
                            <td>
                              <input type="checkbox"
                                      ng-model="item.IsChecked"
                                      ng-click="checkOnce(item, item.IsChecked)" />
                            </td>
                            <td>{{item.ProductBoxBadge}}</td>
                            <td>
                              <button class="btn btn-red btn-width-sm" ng-click="removeItem(item, $index)">
                                Remove
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>-->
                    </div>

                    <!-- loading -->
                    <div class="empty-section margin-top-20 margin-bottom-20" ng-show="loading">
                      <span>
                        <img class="loading-img" src="/assets/img/loader.gif" />
                      </span>Loading...</span>
                    </div>

                    <!-- empty -->
                    <div class="local-category-page margin-bottom-20" ng-show="formData.CategoryProductList.length == 0">
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

          <!--<script>
            $(function(){

            $('#cms_category_product_list_table').sortable();
            });
          </script>-->
          
        </div>
    </div>
</div>
