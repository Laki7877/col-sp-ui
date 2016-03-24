<!--<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminCMSCollectionController">

    <div class="page-header with-border">
      <h1 class="float-left page-header-title ah-breadcrumb">CMS Collection</h1>
      <div class="page-actions float-right">
      <button class="btn btn-blue btn-width-xxl" ng-click="addNewCollection()">Create Collcetion</button>
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

            --><!-- loading --><!--
            <div class="empty-section margin-top-20 margin-bottom-20" ng-show="loading">
              <span>
                <img class="loading-img" src="/assets/img/loader.gif" />
              </span>Loading...</span>
            </div>

            --><!-- empty --><!--
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

        --><!-- Actions --><!--
        <script type="text/ng-template" id="myPopoverTemplate.html">
          <div><a ng-click="detailCategory(item)">View / Detail</a></div>
          <div><a ng-click="editCategory(item)">Edit</a></div>
          <div><a ng-click="deleteCategoey(item)">Delete</a></div>
      </script>

    </div>

  </div>
<?php $this->stop() ?>-->




<?php
	    $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
<div ng-controller="AdminCMSCollectionListCtrl">
  <nc-page-title nc-title="All CMS Static & Collection">
    <a ng-href="/admin/cms/collection/create" class="btn margin-right-10 ng-scope btn-primary btn-width-xl">
      <span class="">Create</span>
    </a>
  </nc-page-title>
  <div class="row search-section-wrapper">
    <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="ProductId"></nc-bulk>
    <nc-search nc-model="params.searchText" nc-search-event="onSearch" nc-search-placeholder="'Search for Collection Name'"></nc-search>
    <nc-advance-search-button nc-model="searchAdvance"></nc-advance-search-button>
  </div>

  <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="params.searchText.length > 0">
    <table class="table table-curved">
      <thead>
        <tr class="table-head">
          <th class="checkbox-column">
            <nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox>
          </th>
          <th nc-sort="NameEn">Name </th>
          <th nc-sort="BankNameEN">Bank</th>
          <th nc-sort="DiscountType">Type</th>
          <th nc-sort="MinimumOrderAmount">Min Order Amount</th>
          <th nc-sort="MaximumDiscountAmount">Max Discount Amount</th>
          <th>Live</th>
          <th>Visible</th>
          <th nc-sort="UpdateDate" class="modified-column">Modified</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="row in list.data">
          <td class="checkbox-column">
            <nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox>
          </td>
          <td class="column-text-ellipsis" nc-link="/admin/cms/collection/{{row.OnTopCreditCardId}}">
            {{row.NameEN}}
          </td>
          <td>{{row.BankNameEN}}</td>
          <td>{{row.DiscountTypeText }}</td>
          <td>{{row.MinimumOrderAmount | number: 2 }}</td>
          <td>{{row.MaximumDiscountAmount | number: 2 }}</td>
          <td>
            <i class="fa fa-circle color-grey"></i>
          </td>
          <td>
            <nc-eye nc-model="row.Visibility" nc-eye-on-toggle="toggleEye(row)"></nc-eye>
          </td>
          <td>{{row.UpdateDate | dateTh}}</td>
          <td>
            <nc-action nc-model="row" nc-action-fn="actions"></nc-action>
          </td>
        </tr>
      </tbody>
    </table>
  </nc-table>
  <nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
</div>
<?php $this->stop() ?>