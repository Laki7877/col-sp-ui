<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller System']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="SellerStdNonMoveReportCtrl">
		<nc-page-title nc-title="Non-Move Report" icon="fa-user">
		</nc-page-title>
    <div class="wrapper" style="margin-top:20px;">
    <div class="form-section">
      <div class="form-section-header">
        <h2>Advance Search</h2>
      </div>
      <div class="form-section-content">
        <form name="form" class="ah-form" novalidate="">
          <!--SKU-->
          <div nc-template="common/input/form-group-with-label" nc-label="SKU" nc-template-form="form.SKU">
            <input class="form-control width-field-large" name="SKU" ng-model="formData.SKU">
          </div>
          <!--category-->
          <div nc-template="common/input/form-group-with-label" nc-label="Category"  id="form-category">
            <div class="ah-select2-dropdown">
              <select ng-model="formData.GlobalCategoryId" class="form-control width-field-large" required="">
                <option ng-repeat="opt in categorys" value="{{ opt.CategoryId }}">
                  {{ opt.NameEn }}
                </option>
              </select>
            </div>
          </div>
      
          <div class="form-group">
            <div class="width-label">
              <label class="control-label"></label>
            </div>
            <div class="button-size-normal">
              <button id="search"class="button-size-normal btn btn-blue btn-width-xl" ng-click="search(); isDisabled=false">Search</button>
            </div>
            <div class="button-size-normal">
              <button class="button-size-normal btn btn-green btn-width-xl" ng-click="exportCsv()" style="margin-left:10px;" ng-disabled="isDisabled" ng-init="isDisabled=true">Export Search</button>
            </div>
            <div class="button-size-normal">
              <!-- <a class="button-size-normal btn btn-white btn-width-xl" ng-click="clear()" style="margin-left:20px;">Clear</a> -->
              <input type="reset" class="button-size-normal btn btn-white btn-width-xl" value="Reset" style="margin-left:20px;" ng-click="resetSearch()" />
            </div>
          </div>
        </form>
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
            <th nc-sort="SKU">SKU</th>
        </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <!-- <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td> -->
            <td class="width_200">{{row.CategoryName}}</td>
            <td class="width_200">{{row.PIDCount}}</td>
            <td class="width_200">{{row.PID}} {{row.ItemName}}</td>
            <td class="width_200">{{row.Amount}}</td>
            <td class="width_200">{{row.SKU}}</td>

          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>