<div id="create_cms_collection_item">

    <div class="row">
        <div class="col-xs-12">
            
            <div class="form-section">
                <div class="form-section-header"><h2>Category Item in This Collection</h2></div>
                <div class="form-section-content">

                  <div class="form-group">
                    <div class="col-xs-12">
                      <button class="btn btn-blue btn-width-xxl" ng-click="addProductItem()">
                        Add Category Item
                      </button>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-xs-12">
                      <div class="table-section" style="margin-top: 0;" ng-show="!loading && !isEmpty">
                        <table class="table table-curved">
                          <thead>
                            <tr class="table-head">
                              <th>
                                <input type="checkbox"
                                        ng-model="isCheckedAll"
                                        ng-click="checkAll(isCheckedAll)" />
                              </th>
                              <th>Category Name</th>
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
                            You do not have any Category
                          </span>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
            </div>
          
        </div>
    </div>
</div>
