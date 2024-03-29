
<?php
	    $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminCMSCategoryListCtrl">
      <nc-alert nc-model="alert"></nc-alert>
       <nc-page-title nc-title="CMS Categories">
            <a ng-href="/admin/cms/category/create" class="btn margin-right-10 ng-scope btn-primary btn-width-xl" ng-disabled="adCMSview">
          	  <span class="">Create</span>
          </a>
       </nc-page-title>
	    <div class="row search-section-wrapper">
  			<nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="CMSCategoryId"></nc-bulk>
      		<nc-search nc-model="params.searchText" nc-search-event="onSearch" nc-search-placeholder="'Search for Category Name'"></nc-search>
		  	  <!--<nc-advance-search-button nc-model="searchAdvance"></nc-advance-search-button>-->
		</div>
    <nc-filter nc-model="params._filter" nc-filter-options="filterOptions">
    </nc-filter>
		<nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="params.searchText.length > 0">
		    <table class="table table-curved">
		        <thead>
		            <tr class="table-head">
		                <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
		                <th nc-sort="CMSCategoryNameEN">Name(English)</th>
		                <th nc-sort="CMSCategoryNameTH">Name(ไทย)</th>
                    	<th nc-sort="Status">Status</th>
                    	<th>Visible</th>
		                <th nc-sort="UpdateDate" class="modified-column">Modified</th>
		                <th ng-disabled="adCMSedit">Action</th>
		            </tr>
		        </thead>
		        <tbody>
		            <tr ng-repeat="row in list.data">
	                    <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
			                <td class="column-text-ellipsis" nc-link="/admin/cms/category/{{row.CMSCategoryId}}">
	                      {{row.CMSCategoryNameEN}}
	                    </td>
			                <td class="column-text-ellipsis" nc-link="/admin/cms/category/{{row.CMSCategoryId}}">
	                      {{row.CMSCategoryNameTH}}
	                    </td>
	                    <td class="status-column">
	                      {{row.Status | statusValue}}
	                    </td>
	                    <td class="visible-column">
	                      <nc-eye nc-model="row.Visibility" nc-eye-on-toggle="toggleEye(row)"></nc-eye>
	                    </td>
			            <td>{{row.UpdateOn | dateTh}}</td>
		                <td ng-disabled="adCMSedit">
		                    <nc-action nc-model="row" nc-action-fn="actions"></nc-action>
		                </td>
		            </tr>
		        </tbody>
		    </table>
		</nc-table>
		<nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
	</div>
<?php $this->stop() ?>
