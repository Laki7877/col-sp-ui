<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller System']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="SellerStdNonMoveReportCtrl">
		<nc-page-title nc-title="Non-Move Report" icon="fa-user">
		</nc-page-title>

    <!--category-->
    <div class="input-group">
      <div class="ah-select2-dropdown">
        <select ng-model="formData.GlobalCategoryId" class="form-control width-field-large" required="">
          <option ng-repeat="opt in categorys" value="{{ opt.CategoryId }}">
            {{ opt.NameEn }}
          </option>
        </select>
      </div>
      
      <div class="input-group-btn">
          <button class="btn btn-blue" ng-click="search(); isDisabled=false">Search</button>
          <button class="btn btn-green" ng-click="exportCsv()" ng-disabled="isDisabled" ng-init="isDisabled=true">Export</button>
      </div>
    </div>

		<nc-table id="report-std-tab-content" nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">

      <!--Report-->
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
          	<th nc-sort="CategoryName">Category Name</th>
          	<th nc-sort="PIDCount">PID Count</th>
          	<th nc-sort="PIDItemName">PID + Product Name</th>
          	<th nc-sort="Amount">Amount</th>
        </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <!-- <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td> -->
            <td class="width_200">{{row.CategoryName}}</td>
            <td class="width_200">{{row.PIDCount}}</td>
            <td class="width_200">{{row.PID}} {{row.ItemName}}</td>
            <td class="width_200">{{row.Amount}}</td>

          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>