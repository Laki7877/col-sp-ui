<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminCouponsCtrl">
      <nc-page-title nc-title="Admin Coupons">
      	  <a ng-href="/admin/coupons/admin/create" class="btn margin-right-10 ng-scope btn-blue btn-width-xl">
          	  <span class="">Create Coupon</span>
          </a>
      </nc-page-title>

    <div class="row search-section-wrapper">
        <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Coupon Code'"></nc-search>
    </div>
    <div class="table-section">
      <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="params.searchText.length > 0">
  		    <table class="table table-curved">
  		        <thead>
  		            <tr class="table-head">
  		                <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
  		                <th nc-sort="CouponCode">Coupon Code</th>
  		                <th nc-sort="CouponName">Coupon Name</th>
  		                <th nc-sort="Remaining">Remaining</th>
  		                <th nc-sort="StartDate">Start Date</th>
                      <th nc-sort="ExpireDate">Expire Date</th>
                      <th nc-sort="Status">Status</th>
  		            </tr>
  		        </thead>
  		        <tbody>
  		            <tr ng-repeat="row in list.data">
  		                <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
  		                <td class="column-text-ellipsis" nc-link="/admin/coupons/admin/{{row.CouponCode}}">
  		                    {{row.CouponCode}}
  		                </td>
  		                <td>{{row.CouponName}}</td>
  		                <td>{{row.Remaining | number: 2 }}</td>
  		                <td>
  		                   {{ row.StartDate | date: 'dd/MM/yy HH:mm' }}
  		                </td>
  		                <td>{{ row.ExpireDate | date: 'dd/MM/yy HH:mm' }}</td>
  		                <td>
  		                    {{ row.Status }}
  		                </td>
  		            </tr>
  		        </tbody>
  		    </table>
  		</nc-table>
  		<nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
    </div>

  </div>

<!--   <a data-toggle="modal" data-target="#modal-loading">Loading Modal</a>
 -->
    <!-- Modal -->
  <div class="modal fade" tabindex="-1" role="dialog" id="modal-loading">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h3 class="modal-title margin-bottom-20">Processing...</h3>
          <div class="progress margin-0">
            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
            </div>
          </div>
        </div> <!-- end .modal-body -->
      </div> <!-- end .modal-content -->
    </div> <!-- end .modal-dialog -->
  </div> <!-- end .modal -->



<?php $this->stop() ?>
