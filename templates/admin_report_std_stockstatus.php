<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminStdStockReportCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Admin Standard Stock Report" icon="fa-user">
    </nc-page-title>
   
    <div class="wrapper" style="margin-top:20px;">
      <div class="form-section">
        <div class="form-section-header"><h2>Advance Search</h2></div>
        <div class="form-section-content">
          <form name="form" class="ah-form" novalidate>
            <!--id-->
            <div nc-template="common/input/form-group-with-label" nc-label="PID" nc-template-form="form.Pids">
              <input class="form-control width-field-large" name="Pids" ng-model="formData.Pid">
            </div>

            <div nc-template="common/input/form-group-with-label" nc-label="Product Name" nc-template-form="form.ProductName">
              <input class="form-control width-field-large" name="Brands" ng-model="formData.ProductName">
            </div>

            <div nc-template="common/input/form-group-with-label" nc-label="Variant" nc-template-form="form.Variant">
              <input class="form-control width-field-large" name="variant" ng-model="formData.variant">
            </div>

            <div nc-template="common/input/form-group-with-label-multiple" nc-template-form="form.CreatedDate" nc-label="Time Of Order Date" nc-template-options-path="searchForm/CreatedDate">
              <div class="width-field-small-input">
                <div class="dropdown">
                  <a class="dropdown-toggle" id="dropdown" role="button" data-toggle="dropdown" data-target="#" href="#">
                    <input readonly style="background-color:white" type="text" class="input-icon-calendar form-control" value="{{ formData.LastSoldDateFrom | date: 'dd/MM/yy HH:mm' }}" />
                  </a>
                  <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                    <datetimepicker name="CreatedDate" ng-date-before="{{formData.LastSoldDateTo}}" data-ng-model="formData.LastSoldDateFrom" data-datetimepicker-config="{ dropdownSelector: '#dropdown', minView: 'hour' }" />
                  </ul>
                </div>
              </div>

              <div class="width-label-extend text-center"><label class="control-label">To</label></div>
              <div class="width-field-small-input">
                <div class="dropdown">
                  <a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" href="#">
                    <input readonly style="background-color:white" type="text" class="input-icon-calendar form-control" value="{{ formData.LastSoldDateTo | date: 'dd/MM/yy HH:mm' }}" />
                  </a>
                  <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                    <datetimepicker data-ng-model="formData.LastSoldDateTo" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'hour' }" />
                  </ul>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="width-label"><label class="control-label"></label></div>
              <div class="button-size-normal">
                <button class="button-size-normal btn btn-blue btn-width-xl" ng-click="search()">Search</button>
              </div>
              <div class="button-size-normal">
                <button class="button-size-normal btn btn-green btn-width-xl" ng-click="exportCsv()" style="margin-left:10px;">Export Search</button>
              </div>
              <div class="button-size-normal">
                <input type="reset" class="button-size-normal btn btn-white btn-width-xl" value="Reset" style="margin-left:20px;"/>
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
            <th nc-sort="Pid">Product ID</th>
            <th nc-sort="ProductNameEn">Product Name</th>
            <th nc-sort="variant1">Variant1</th>
            <th nc-sort="variant2">Variant2</th>
            <th nc-sort="OnHand">OnHand</th>
            <th nc-sort="Reserve">Reserve</th>
            <th nc-sort="OnHold">OnHold</th>
            <th nc-sort="StockAvailable">Stock Available</th>
            <th nc-sort="Defect">Defect</th>
            <th nc-sort="FirstReceiveQTY">First Receive</th>
        </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="width_150">{{row.Pid}}</td>
            <td class="width_200">{{row.ProductNameEn}}</td>
            <td class="width_120">{{row.variant1}}</td>
            <td class="width_120">{{row.variant2}}</td>
            <td class="width_120">{{row.OnHand}}</td>
            <td class="width_120">{{row.Reserve}}</td>
            <td class="width_120">{{row.OnHold}}</td>
            <td class="width_120">{{row.StockAvailable}}</td>
            <td class="width_100">{{row.Defect}}</td>
            <td class="width_100">{{row.FirstReceiveQTY}}</td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
