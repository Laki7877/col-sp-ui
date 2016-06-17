<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller System'])?>

<?php $this->start('page-body') ?>
<div ng-controller="SellerStdReturnReportCtrl">
  <nc-alert nc-model="alert"></nc-alert>
  <nc-page-title nc-title="Seller Return Report" icon="fa-user">
    <!-- <a class="btn btn-blue btn-width-xxl" ng-click="exportCsv()">Export CSV</a> -->
  </nc-page-title>
  <div class="wrapper" style="margin-top:20px;">
    <div class="form-section">
      <div class="form-section-header">
        <h2>Advance Search</h2>
      </div>
      <div class="form-section-content">
        <form name="form" class="ah-form" novalidate="">
          <div nc-template="common/input/form-group-with-label" nc-label="Order Id" nc-template-form="form.OrderId">
            <input class="form-control width-field-large" name="OrderId" ng-model="formData.OrderId">
                    </div>
          <!--id-->
          <div nc-template="common/input/form-group-with-label" nc-label="PID" nc-template-form="form.Pids">
            <input class="form-control width-field-large" name="Pids" ng-model="formData.PID">
          </div>

          <!--SKU-->
          <div nc-template="common/input/form-group-with-label" nc-label="SKU" nc-template-form="form.SKU">
            <input class="form-control width-field-large" name="SKU" ng-model="formData.SKU">
          </div>

          <div nc-template="common/input/form-group-with-label" nc-label="Product Name" nc-template-form="form.ItemName">
            <input class="form-control width-field-large" name="ItemName" ng-model="formData.ItemName">
                    </div>


          <!--Item Status-->
          <div nc-template="common/input/form-group-with-label" nc-template-form="form.ItemStatus" nc-label="Item Status">
            <select ng-model="formData.ItemStatus" class="form-control" name="ItemStatus">
              <option selected="" value="-" disabled="">- Select Status Option -</option>
              <option value="Procressing">Procressing</option>
              <option value="Delivered">Delivered</option>
              <option value="New">New</option>
            </select>
          </div>
          <!--Time Of Order Date-->
          <div nc-template="common/input/form-group-with-label-multiple" nc-template-form="form.CreatedDate" nc-label="Time Of Order Date" nc-template-options-path="searchForm/CreatedDate">
            <div class="width-field-small-input">
              <div class="dropdown">
                <a class="dropdown-toggle" id="dropdown" role="button" data-toggle="dropdown" data-target="#" href="#">
                  <input readonly="" style="background-color:white" type="text" class="input-icon-calendar form-control" value="{{ formData.ReturnDateFrom | date: 'dd/MM/yy HH:mm' }}" />
                </a>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <datetimepicker name="CreatedDate" ng-date-before="{{formData.ReturnDateTo}}" data-ng-model="formData.ReturnDateFrom" data-datetimepicker-config="{ dropdownSelector: '#dropdown', minView: 'hour' }" />
                </ul>
              </div>
            </div>

            <div class="width-label-extend text-center">
              <label class="control-label">To</label>
            </div>
            <div class="width-field-small-input">
              <div class="dropdown">
                <a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" href="#">
                  <input readonly="" style="background-color:white" type="text" class="input-icon-calendar form-control" value="{{ formData.ReturnDateTo | date: 'dd/MM/yy HH:mm' }}" />
                </a>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <datetimepicker data-ng-model="formData.ReturnDateTo" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'hour' }" />
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
          <th nc-sort="OrderID">Order ID</th>
          <th nc-sort="Pid">Product ID</th>
          <th nc-sort="ProductNameEn">Product Name</th>
          <th nc-sort="ItemStatus">Item Status</th>
          <th nc-sort="SalePrice">Sale Price</th>
          <th nc-sort="Discount">Local Discount</th>
          <th nc-sort="RePrice">Return Price</th>
          <th nc-sort="ReFee">Return Fee</th>
          <th nc-sort="ReAmount">Return Amount</th>
          <th nc-sort="SKU">SKU</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="row in list.data">
          <!-- <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td> -->
          <td class="width_150">{{row.OrderId}}</td>
          <td class="width_150">{{row.PID}}</td>
          <td class="width_200">{{row.ItemName}}</td>
          <td class="width_150">{{row.ItemStatus}}</td>
          <td class="width_120">{{row.SalePrice}}</td>
          <td class="width_120">{{row.LocalDiscount}}</td>
          <td class="width_120">{{row.ReturnPrice}}</td>
          <td class="width_120">{{row.ReturnFee}}</td>
          <td class="width_120">{{row.ReturnAmount}}</td>
          <td class="width_120">{{row.SKU}}</td>
        </tr>
      </tbody>
    </table>
  </nc-table>
  <nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
</div>
<?php $this->stop() ?>
