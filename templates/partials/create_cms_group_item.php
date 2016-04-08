<div id="create_cms_group_item">

  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-sm btn-primary" ng-click="addCMSMasterItem()">
        <i class="fa fa-plus-circle"></i>
      </button>
    </div>
  </div>
  <br />
  <div class="row">
    <div class="col-md-12">
      
      <div class="form-section">
        <div class="form-section-header">
          <h2>List Collection in This Group</h2>
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
              <span ng-show="formData.GroupMasterList.length > 0">({{sumMasterSelected()}})</span>
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
                <th class="col-sm-2">Name(EN)</th>
                <th class="col-sm-2">Name(TH)</th>
                <th class="col-sm-2">ExpiryDate</th>
                <th class="col-sm-2">Actions</th>
              </tr>
            </thead>

            <tbody id="sortable">
              <tr ng-repeat="item in formData.GroupMasterList | orderBy : 'Sequence'">
                <td>
                  <input type="checkbox" ng-model="item.IsChecked" ng-click="checkOnce(item, item.IsChecked)" />
                </td>
                <td>{{item.Sequence}}</td>
                <td>{{item.CMSMasterNameEN}}</td>
                <td>{{item.CMSMasterNameTH}}</td>
                <td>{{item.CMSMasterExpiryDate | dateTh}}</td>
                <td>
                  <button class="btn btn-sm btn-default" ng-disabled="$index == 0 || (formData.GroupMasterList.length == 0)" 
                          ng-click="moveUp($index, $index - 1)">
                    <i class="fa fa-chevron-up"></i>
                  </button>
                  <button class="btn btn-sm btn-default" ng-disabled="$index == (formData.GroupMasterList.length - 1) || (formData.GroupMasterList.length == 0)" 
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
<script type="text/ng-template" id="templates/admin-cms-group-add-item.html">
  
  <div class="modal-header">
    <h3 class="modal-title">Add CMS Master Item</h3>
  </div>
  <div class="modal-body">
    
    <form class="form" name="form" novalidate="">

      <div class="row">
        <div class="col-md-6">

          <div class="form-section">
            <div class="form-section-header">
              <h2>Search Product</h2>
            </div>
            <div class="form-section-content" style="padding: 10px; min-height: 400px;">

              <div class="form-group">
                <label>Search</label>
                  <div class="input-group search-box" style="min-width: 300px;">
                    <input class="form-control input-search-icon" ng-model="searchText" placeholder="Search for CMS Master" />
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
                    <tr ng-repeat="item in masters">
                      <td>
                        <input type="checkbox" ng-model="item.IsChecked" ng-click="checkOnce(item, item.IsChecked)" />
                      </td>
                      <td>{{item.CMSMasterNameEN}}</td>
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
              <button class="btn btn-blue btn-width-xl" ng-click="ok(masters)" ng-disabled="sumMasterSelected() == 0">
                <span class="login-loading" ng-cloak="" ng-show="saving">
                  <i class="fa fa-spinner fa-spin" ></i>
                </span> Add ({{sumMasterSelected() }})
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </form>
  </div>
</script>
