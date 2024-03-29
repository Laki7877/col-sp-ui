<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller System'])?>

<?php $this->start('page-body') ?>
<div ng-controller="SellerStdSaleReportSellerCtrl">
  <nc-alert nc-model="alert"></nc-alert>
  <nc-page-title nc-title="Seller Standard Report" icon="fa-user">
    <!-- <a class="btn btn-blue btn-width-xxl" ng-click="exportCsv()">Export CSV</a> -->
  </nc-page-title>

  <div class="wrapper" style="margin-top:20px;">
    <div class="form-section">
      <div class="form-section-header">
        <h2>Advance Search</h2>
      </div>
      <div class="form-section-content">
        <form name="form" class="ah-form" novalidate="">
          <!--id-->
          <div nc-template="common/input/form-group-with-label" nc-label="PID" nc-template-form="form.Pids">
            <input class="form-control width-field-large" name="Pids" ng-model="formData.PID">
          </div>
          <!--SKU-->
          <div nc-template="common/input/form-group-with-label" nc-label="SKU" nc-template-form="form.SKU">
            <input class="form-control width-field-large" name="SKU" ng-model="formData.SKU">
          </div>
          <!-- Category -->
          <div nc-template="common/input/form-group-with-label" nc-label="Category"  id="form-category">

            <div class="ah-select2-dropdown">
              <select ng-model="formData.GlobalCategoryId" class="form-control width-field-large" required="">
                <option ng-repeat="opt in categorys" value="{{ opt.CategoryId }}">
                  {{ opt.NameEn }}
                </option>
              </select>
            </div>
          </div>

          <!-- Brand -->
          <div nc-template="common/input/form-group-with-label" nc-label="Brand" ng-show="formData.GlobalCategoryId >=0">
            <div class="ah-select2-dropdown">
              <select ng-model="formData.BrandId" class="form-control width-field-large" required="">
                <option ng-repeat="opt in brands" value="{{ opt.BrandId }}">
                  {{ opt.BrandNameEn }}
                </option>
              </select>
            </div>
          </div>
          <!--Item Status-->
          <div nc-template="common/input/form-group-with-label" nc-template-form="form.ItemStatus" nc-label="Item Status">
            <select ng-model="formData.ItemStatus" class="form-control" name="ItemStatus">
              <option selected="" value="-" disabled="">- Select Status Option -</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="New">New</option>
            </select>
          </div>


          <!--Time Of Order Date-->
          <div nc-template="common/input/form-group-with-label-multiple" nc-template-form="form.CreatedDate" nc-label="Time Of Order Date" nc-template-options-path="searchForm/CreatedDate">
            <div class="width-field-small-input">
              <div class="dropdown">
                <a class="dropdown-toggle" id="dropdown" role="button" data-toggle="dropdown" data-target="#" href="#">
                  <input readonly="" style="background-color:white" type="text" class="input-icon-calendar form-control" value="{{ formData.OrderDateFrom | date: 'dd/MM/yy HH:mm' }}" />
                </a>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <datetimepicker name="CreatedDate" ng-date-before="{{formData.OrderDateTo}}" data-ng-model="formData.OrderDateFrom" data-datetimepicker-config="{ dropdownSelector: '#dropdown', minView: 'hour' }" />
                </ul>
              </div>
            </div>

            <div class="width-label-extend text-center">
              <label class="control-label">To</label>
            </div>
            <div class="width-field-small-input">
              <div class="dropdown">
                <a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" href="#">
                  <input readonly="" style="background-color:white" type="text" class="input-icon-calendar form-control" value="{{ formData.OrderDateTo | date: 'dd/MM/yy HH:mm' }}" />
                </a>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <datetimepicker data-ng-model="formData.OrderDateTo" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'hour' }" />
                </ul>
              </div>
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
  </div>

  <nc-table id="report-std-tab-content" nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
    <table class="table table-curved">
      <thead>
        <tr class="table-head">
          <!-- <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th> -->
          <th nc-sort="OrderId">Order ID</th>
          <th nc-sort="OrderDate">Order Date</th>
          <th nc-sort="TimeOfOrderDate">Time of Order Date</th>
          <th nc-sort="ItemStatus">Item Status</th>
          <th nc-sort="PID">Product ID</th>
          <th nc-sort="ItemNameEN">Product Name</th>
          <th nc-sort="SKU">SKU</th>
          <th nc-sort="QTY">Qty</th>

          <!-- <th class="action-column-lg">Action</th> -->
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="row in list.data" ng-show="list.data.length > '0'">
          <!-- <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td> -->
          <td class="width_200">{{row.OrderId}}</td>
          <td class="width_150">{{row.OrderDate}}</td>
          <td class="width_200">{{row.TimeOfOrderDate}}</td>
          <td class="width_150">{{row.ItemStatus}}</td>
          <td class="width_120">{{row.PID}}</td>
          <td class="width_300">{{row.ItemNameEN}}</td>
          <td class="width_100">{{row.SKU}}</td>
          <td class="width_100">{{row.QTY}}</td>

          <!-- <td class="action-column-lg"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td> -->
        </tr>
      </tbody>
    </table>
  </nc-table>
  <nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
</div>
<?php $this->stop() ?>
