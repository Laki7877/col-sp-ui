<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="AdminCMSCtrl">
      <!-- <nc-page-title nc-title="CMS">
      	  <a ng-href="/admin/cms/create" class="btn ng-scope btn-blue btn-width-xxl">
          	  Create CMS
          </a>
      </nc-page-title> -->

    <div>
        <? $this->insert('components/page-title-breadcrumb-border', ['text' => "CMS", 'border_class' => 'no-padding']) ?>
    </div>

    <div class="row search-section-wrapper">
        <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Collection Name..'"></nc-search>
    </div>
    <div class="table-section">
      <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
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
  		                <td class="column-text-ellipsis width_200" nc-link="/admin/coupons/admin/{{row.CouponId}}">
  		                    {{row.CouponCode}}
  		                </td>
  		                <td>{{row.CouponName}}</td>
  		                <td class="width_120">{{row.Remaining | number: 2 }}</td>
  		                <td class="width_150">
  		                   {{ row.StartDate | date: 'dd/MM/yy HH:mm' }}
  		                </td>
  		                <td class="width_150">{{ row.ExpireDate | date: 'dd/MM/yy HH:mm' }}</td>
  		                <td class="width_100">
  		                    {{ row.Status }}
  		                </td>
  		            </tr>
  		        </tbody>
  		    </table>

      <!-- <table class="table table-curved">
        <thead>
          <tr class="table-head" >
      
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input" ng-click="checkAll()" ng-model="allChecked" >
            </th>            
            <th  ng-click="setOrderBy('CMSNameEN')">
              <a class="header-link" ><span ng-class="sort('CMSNameEN', true)">Collection Name</span></a>
              <i class="fa" ng-class="sort('CMSNameEN')">
            </th>
            <th  ng-click="setOrderBy('URLKey')">
              <a class="header-link" ><span ng-class="sort('URLKey', true)">URLKey</span></a>
              <i class="fa" ng-class="sort('URLKey')">
            </th>
       <th  ng-click="setOrderBy('ShortDescriptionEN')">
              <a class="header-link" ><span ng-class="sort('ShortDescriptionEN', true)">ShortDescription</span></a>
              <i class="fa" ng-class="sort('ShortDescriptionEN')">
            </th>
       <th class="eff-exp-column" ng-click="setOrderBy('EffectiveDate')"  >
              <a class="header-link" ><span ng-class="sort('EffectiveDate', true)">EffectiveDate</span></a>
              <i class="fa" ng-class="sort('EffectiveDate')">
            </th>
       <th class="eff-exp-column" ng-click="setOrderBy('ExpiryDate')"  >
              <a class="header-link" ><span ng-class="sort('ExpiryDate', true)">ExpiryDate</span></a>
              <i class="fa" ng-class="sort('ExpiryDate')">
            </th>
            <th class="status-column">
              Status
            </th>
            <th class="visible-column">Visible</th>
            <th class="modified-column" ng-click="setOrderBy('UpdateDate')">
              <a class="header-link" ><span ng-class="sort('UpdateDate', true)">Modified</span></a>
              <i class="fa" ng-class="sort('UpdateDate')">
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
         
          <tr ng-repeat="row in list.data" >      
                  <td class="checkbox-column">                   
                    <input type="checkbox" aria-label="Checkbox for following text input" ng-model="checkBoxCache[row.CMSId]" />                    
                    <input type="hidden" ng-init="hidCMSTypeId[row.CMSId] = row.CMSTypeId" ng-model="hidCMSTypeId[row.CMSId]" />
                  </td>                  
          <td class="column-text-ellipsis"><a href="/collections/{{ row.CMSId }}">{{ row.CMSNameEN || '(Untitled Collection)' }}</a></td>
                 
         <td class="column-text-ellipsis">{{ row.URLKey || '(Untitled Collection)' }}</td>
         <td class="column-text-ellipsis">{{ row.ShortDescriptionEN || '(Untitled ShortDescriptionEN)' }}</td>
         <td class="modified-column">{{ row.EffectiveDate | date:'shortDate':'+700' }}</td>
         <td class="modified-column">{{ row.ExpiryDate | date:'shortDate':'+700' }}</td>

                  <td class="status-column">
                    <span class="{{ asStatus(row.CMSStatus).Color }}">
                      <i class="fa {{ asStatus(row.CMSStatus).Class }}"></i>
                       {{ asStatus(row.CMSStatusFlowId).Text }}
                    </span>
                  </td>
                  <td class="visible-column">
                          <a ng-click="actions.toggle(row)"><i ng-class="{'fa fa-eye-slash color-grey eye-icon' : !row.Visibility,
                            'fa fa-eye color-dark-grey eye-icon' : row.Visibility}"></i></a>
                  </td>
                  <td class="modified-column">{{ row.UpdateDate | date:'shortDate':'+700' }}</td>
                  <td class="action-column">
                    <a class="fa fa-gear color-dark-grey icon-size-20"  uib-popover-template="'product/action'" popover-placement="bottom" popover-append-to-body="true" popover-any>
                       <i class="fa fa-caret-down color-dark-grey"></i>
                    </a>
                  </td>
          </tr>
        </tbody>
      </table> -->

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
