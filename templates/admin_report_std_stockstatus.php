<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminStdStockReportCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Admin Standard Stock Report" icon="fa-user">
      <!-- <a class="btn btn-blue btn-width-xxl" ng-click="exportCsv()">Export CSV</a> -->
    </nc-page-title>
    <!-- <div class="row search-section-wrapper"> -->
      <!-- <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="{{id}}"></nc-bulk> -->
      <!-- <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Admin Name and Email'"></nc-search> -->
      <!-- <nc-advance-search-button nc-model="advanceSearch"></nc-advance-search-button> -->
      <!-- <button ng-click="filter_form = !filter_form" class="btn btn-default btn-toggle" type="button" style="margin-top:8px;margin-left:10px;color:#4899DD;">Advanced Search</button> -->
    <!-- </div> -->
  
    <!-- <nc-filter nc-model="params._filter" nc-filter-options="filterOptions">
    </nc-filter> -->

    <!-- <nc-advance-search nc-model="advanceSearchParams" nc-advance-search-toggle="advanceSearch" nc-advance-search-event="onAdvanceSearch" nc-advance-search-options="advanceSearchOptions"></nc-advance-search> -->
    <div class="wrapper" style="margin-top:20px;">
      <div class="form-section">
        <div class="form-section-header"><h2>Advance Search</h2></div>
        <div class="form-section-content">
          <form name="form" class="ah-form" novalidate>
            <!--id-->
            <div nc-template="common/input/form-group-with-label" nc-label="PID" nc-template-form="form.Pids">
              <input class="form-control width-field-large" name="Pids" ng-model="formData.PID">
            </div>
            <!--Brand Name-->
            <div nc-template="common/input/form-group-with-label" nc-label="Brand Name" nc-template-form="form.Brands">
              <input class="form-control width-field-large" name="Brands" ng-model="formData.Brands">
            </div>
            <!--Global Category Name-->
            <div nc-template="common/input/form-group-with-label" nc-label="Global Categories" nc-template-form="form.GlobalCategories">
              <input class="form-control width-field-large" name="GlobalCategories" ng-model="formData.GlobalCategories">
            </div>
            <!--Item Status-->
            <div nc-template="common/input/form-group-with-label" nc-template-form="form.ItemStatus" nc-label="Item Status">
              <select ng-model="formData.ItemStatus" class="form-control" name="ItemStatus">
                <option selected value="-" disabled>- Select Status Option -</option>
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
                    <input readonly style="background-color:white" type="text" class="input-icon-calendar form-control" value="{{ formData.CreatedDtFrom | date: 'dd/MM/yy HH:mm' }}" />
                  </a>
                  <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                    <datetimepicker name="CreatedDate" ng-date-before="{{formData.CreatedDtTo}}" data-ng-model="formData.CreatedDtFrom" data-datetimepicker-config="{ dropdownSelector: '#dropdown', minView: 'hour' }" />
                  </ul>
                </div>
              </div>

              <div class="width-label-extend text-center"><label class="control-label">To</label></div>
              <div class="width-field-small-input">
                <div class="dropdown">
                  <a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" href="#">
                    <input readonly style="background-color:white" type="text" class="input-icon-calendar form-control" value="{{ formData.CreatedDtTo | date: 'dd/MM/yy HH:mm' }}" />
                  </a>
                  <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                    <datetimepicker data-ng-model="formData.CreatedDtTo" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'hour' }" />
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
                <a class="button-size-normal btn btn-white btn-width-xl" ng-click="clear()" style="margin-left:20px;">Clear</a>
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
            <!-- <th nc-sort="NameEn">Admin Name</th>
            <th nc-sort="Email">Email</th>
            <th nc-sort="UserGroup.GroupNameEn">Role</th>
            <th nc-sort="UpdatedDt">Modified</th>
            <th class="action-column-lg">Action</th> -->
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
            <!-- <th class="action-column-lg">Action</th> -->
        </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <!-- <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td> -->
            <!-- <td nc-link="/admin/accounts/{{row.UserId}}">{{row.NameEn}}</td>
            <td class="width_200">{{row.Email}}</td>
            <td class="width_300">{{row.UserGroup[0].GroupNameEn}}</td>
            <td class="modified-column">{{row.UpdatedDt | dateTh}}</td>
            <td class="action-column-lg"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td> -->
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
            <!-- <td class="action-column-lg"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td> -->
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>
