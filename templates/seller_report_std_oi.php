<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller System']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="SellerStdOiReportCtrl">
		<nc-page-title nc-title="OI Report" icon="fa-user">
			<div class="button-size-normal">
      <button class="button-size-normal btn btn-green btn-width-xl" ng-click="exportCsv()" style="margin-left:10px;">Export File</button>
    </div>
		</nc-page-title>

		<nc-table id="report-std-tab-content" nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
          	<th nc-sort="CommissionBySale">Commission by Sale</th>
          	<th nc-sort="PaymentFeeBySale">Payment Fee by Sale</th>
          	<th nc-sort="LogisticsFee">Logistics Fee</th>
          	<th nc-sort="ReturnFee">Return Fee</th>
            <th nc-sort="RentalFee">Rental Fee</th>
            <th nc-sort="ServiceFee">Service Fee</th>
            <th nc-sort="SKU">SKU</th>
        </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <!-- <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td> -->
            <td class="width_150">{{row.CommissionFeeBySale}}</td>
            <td class="width_150">{{row.PaymentFeeBySale}}</td>
            <td class="width_150">{{row.LogisticsFee}}</td>
            <td class="width_150">{{row.ReturnFee}}</td>
            <td class="width_150">{{row.RentalFee}}</td>
            <td class="width_150">{{row.ServiceFee}}</td>
            <td class="width_150">{{row.SKU}}</td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>