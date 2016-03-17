<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminSellerCouponCtrl">
    <nc-page-title nc-title="All Seller Coupons"></nc-page-title>
    <div class="row search-section-wrapper">
        <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Coupon Code'"></nc-search>
    </div>
    <div class="table-section">
      <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
  		    <table class="table table-curved">
  		        <thead>
  		            <tr class="table-head">
  		                <th nc-sort="CouponCode">Coupon Code</th>
  		                <th nc-sort="CouponName">Coupon Name</th>
  		                <th nc-sort="Remaining">Remaining</th>
  		                <th nc-sort="StartDate">Start Date</th>
                      <th nc-sort="ExpireDate">Expire Date</th>
                      <th nc-sort="Status">Status</th>
                      <th>Action</th>
  		            </tr>
  		        </thead>
  		        <tbody>
  		            <tr ng-repeat="row in list.data">
  		                <td class="column-text-ellipsis width_200" nc-link="/admin/coupons/seller/{{row.CouponId}}">
  		                    {{row.CouponCode}}
  		                </td>
  		                <td>{{row.CouponName}}</td>
  		                <td class="width_120">{{row.Remaining | number: 2 }}</td>
  		                <td class="width_150">
  		                   {{ row.StartDate | datetimeTh }}
  		                </td>
  		                <td class="width_150">{{ row.ExpireDate | datetimeTh }}</td>
  		                <td class="width_100">
  		                    {{ row.Status | mapDropdown: statusDropdown}}
  		                </td>
                      <td class="width_100"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
  		            </tr>
  		        </tbody>
  		    </table>
  		</nc-table>
  		<nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
    </div>
  </div>

<?php $this->stop() ?>