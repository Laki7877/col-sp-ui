<?php
	$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminSumCreateAndApproveCtrl">
		<nc-page-title nc-title="Create and Approve Product Summary" icon="fa-user">
	    <!-- <a class="btn btn-blue btn-width-xxl" ng-click="exportCsv()">Export CSV</a> -->
	  </nc-page-title>

		<div class="wrapper" style="margin-top:20px;">
	  	 <div class="form-section">
	      <div class="form-section-header">
	        <h2>Search</h2>
	      </div>
	      <div class="form-section-content">
	        <form name="form" class="ah-form" novalidate="">
	        	<!--create date-->
	        	<div nc-template="common/input/form-group-with-label-multiple" nc-template-form="form.CreatedDate" nc-label="Created Date" nc-template-options-path="searchForm/CreatedDate">
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

	          <!--Category-->
	          <div nc-template="common/input/form-group-with-label" nc-label="Category"  id="form-category">
	            <ui-select ng-model="formData.GlobalCategoryId" >
								<ui-select-match placeholder="Select or search category...">{{$select.selected.NameEn}}</ui-select-match>
								<ui-select-choices repeat="opt in categorys | filter: $select.search">
									{{ opt.NameEn }}
								</ui-select-choices>
							 </ui-select>
	          </div>

						<!--seller-->
						<div nc-template="common/input/form-group-with-label" nc-label="Seller"  id="form-seller">
		          <ui-select multiple ng-model="formData.SellerId" >
		            <ui-select-match placeholder="Select or search seller...">{{$item.NameEn}}</ui-select-match>
		            <ui-select-choices repeat="opt in categorys  | filter: $select.search">
		              {{ opt.NameEn }}
		            </ui-select-choices>
		          </ui-select>
			      </div>
						
						<div class="form-group">
            <div class="width-label">
              <label class="control-label"></label>
            </div>
            <div class="button-size-normal">
              <button id="search"class="button-size-normal btn btn-blue btn-width-xl" ng-click="search(); isDisabled=false">Search</button>
            </div>
            <div class="button-size-normal">
              <button class="button-size-normal btn btn-green btn-width-xl" ng-click="exportCsv()" style="margin-left:5px;" ng-disabled="isDisabled" ng-init="isDisabled=true">Export Search</button>
            </div>
            <div class="button-size-normal">
              <!-- <a class="button-size-normal btn btn-white btn-width-xl" ng-click="clear()" style="margin-left:20px;">Clear</a> -->
              <input type="reset" class="button-size-normal btn btn-white btn-width-xl" value="Reset" style="margin-left:10px;" ng-click="resetSearch()" />
            </div>
          </div>
				</form>
       </div>
      </div>
		</div>

		<nc-table id="report-sum-tab-content" nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
    <table class="table table-curved">
      <thead>
        <tr class="table-head">
          <!-- <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th> -->
          <th nc-sort="Date">Date</th>
          <th nc-sort="CreatedDate">Created Date</th>
          <th nc-sort="Category">Category</th>
          <th nc-sort="Seller">Seller</th>
          <th nc-sort="FirstApproved">First Approved</th>

          <!-- <th class="action-column-lg">Action</th> -->
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="row in list.data" ng-show="list.data.length > '0'">
          <!-- <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td> -->
          <td class="width_200">{{row.Date}}</td>
          <td class="width_200">{{row.CreatedDate}}</td>
          <td class="width_200">{{row.Category}}</td>
          <td class="width_200">{{row.Seller}}</td>
          <td class="width_200">{{row.FirstApproved}}</td>

          <!-- <td class="action-column-lg"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td> -->
        </tr>
      </tbody>
    </table>
  </nc-table>
  <nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
</div>

	</div>
<?php $this->stop() ?>