<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Coupons']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminGlobalCouponCtrl">
    <nc-page-title nc-title="Global Coupons" icon="fa-bookmark">
      <a class="btn btn-blue btn-width-xxl" ng-href="{{url}}/add">Add {{item}}</a>
    </nc-page-title>
    <div class="row search-section-wrapper">
        <nc-search nc-model="params.searchText" nc-search-placeholder="'Search by Coupon Code'"></nc-search>
    </div>
    <div class="table-section">
      <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
  		    <table class="table table-curved">
  		        <thead>
  		            <tr class="table-head">
  		                <th nc-sort="CouponCode">Coupon Code</th>
  		                <th nc-sort="CouponName">Coupon Name</th>
  		                <th class="width_150 text-align-center" nc-sort="MaximumUser">Remaining</th>
  		                <th nc-sort="StartDate">Start Date</th>
                      <th nc-sort="ExpireDate">Expire Date</th>
                      <th nc-sort="Status">Status</th>
                      <th class="action-column-lg">Action</th>
  		            </tr>
  		        </thead>
  		        <tbody>
  		            <tr ng-repeat="row in list.data">
  		                <td class="column-text-ellipsis width_200" nc-link="/admin/coupons/global/{{row.CouponId}}">
  		                    {{row.CouponCode}}
  		                </td>
  		                <td>{{row.CouponName}}</td>
                        <td class="width_150 text-align-center">{{row.Remaining}} / {{row.MaximumUser}}</td>
                      <td class="width_150">{{ row.StartDate | datetimeTh }}</td>
                      <td class="width_150">{{ row.ExpireDate | datetimeTh }}</td>
  		                <td class="width_100"> {{ row.Status | mapDropdown: statusDropdown }}</td>
                      <td class="action-column-lg"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
  		            </tr>
  		        </tbody>
  		    </table>
  		</nc-table>
  		<nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
    </div>
  </div>

<?php $this->stop() ?>
