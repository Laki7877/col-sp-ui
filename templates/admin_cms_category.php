<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminCMSCategoryController">

  	<div class="page-header with-border">
	    <h1 class="float-left page-header-title ah-breadcrumb">CMS Category</h1>
	    <div class="page-actions float-right">
			<button class="btn btn-blue btn-width-xxl" ng-click="addNewCategory()">Create Category</button>
		</div>
	</div>

    <div class="add-product-body">
	    <div class="row search-section-wrapper">
	        <nc-search nc-model="params.searchText" nc-search-placeholder="'Search Category'"></nc-search>
	    </div>
        <div class="row">
          <div class="col-xs-12">
          	<div class="table-section" ng-show="!loading && !isEmpty">
	          	<table class="table table-curved">
	              <thead>
	                <tr class="table-head">
	                  <th>#</th>
	                  <th>Category Name</th>
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

        <script type="text/ng-template" id="myPopoverTemplate.html">
	        <div><a ng-click="detailCategory(item)">View / Detail</a></div>
	        <div><a ng-click="editCategory(item)">Edit</a></div>
	        <div><a ng-click="deleteCategoey(item)">Delete</a></div>
	    </script>

    </div>

  </div>
<?php $this->stop() ?>