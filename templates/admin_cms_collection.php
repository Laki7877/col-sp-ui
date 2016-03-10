<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminCMSCollectionController">

    <div class="page-header with-border">
      <h1 class="float-left page-header-title ah-breadcrumb">CMS Collection</h1>
      <div class="page-actions float-right">
      <button class="btn btn-blue btn-width-xxl" ng-click="addNewCollection()">Create Collcetion</button>
    </div>
  </div>

    <div class="add-product-body">
        <div class="row">
          <div class="col-xs-12">
            <div class="table-section">
              <table class="table table-curved">
                <thead>
                  <tr class="table-head">
                    <th>#</th>
                    <th>Collection Name</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ng-repeat="item in categorys">
                    <td>{{$index + 1}}</td>
                    <td>{{item.CategoryName}}</td>
                    <td>{{item.CategoryProducts.length}}</td>
                    <td>
                      <a class="action-gear" 
                            uib-popover-template="'myPopoverTemplate.html'" 
                            popover-placement="bottom" 
                            class="action-gear" 
                            popover-append-to-body="true"
                            popover-trigger="outsideClick">
                        <i class="fa fa-gear color-dark-grey icon-size-20"></i>
                        <i class="fa fa-caret-down color-dark-grey"></i>
                      </a>
              
                    </td>
                  </tr>
                </tbody>
              </table>
              <nc-pagination nc-model="params" nc-pagination-total="categorys.length"></nc-pagination>
          </div>
          </div>
        </div>

        <script type="text/ng-template" id="myPopoverTemplate.html">
          <div><a ng-click="detailCategory(item)">View / Detail</a></div>
          <div><a ng-click="editCategory(item)">Edit</a></div>
          <div><a ng-click="deleteCategoey(item)">Delete</a></div>
      </script>

    </div>

  </div>
<?php $this->stop() ?>