<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Attribute']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminAttributeCtrl">
    <? $this->insert('components/page-title-with-one-button', ['text' => 'Attribute','button' => 'Add Attribute', 'button_class' => 'btn-width-xl', 'link' => '?p=admin_add_attribute']) ?>
    <? $this->insert('components/search-section-admin-attribute') ?>
    <div class="filter-section">
      <div class="filter-container">
        <span>Filters:</span>
        <a class="filter-seperator" ng-repeat="filter in filterOptions" ng-class="{'filter-active': tableParams.filter == filter.value }" ng-click="tableParams.filter = filter.value">{{ filter.name }}</a>
      </div>
    </div>
    <div class="table-section">
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input" ng-model="checkAll"> 
            </th>
            <th>
              <a class="header-link" href="#" ng-click="setOrderBy('AttributeNameEn')"><span>Attribute Name</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th>
              <a class="header-link" href="#" ng-click="setOrderBy('DisplayNameEn')"><span>Display Name</span></a>
              <i class="fa fa-caret-up color-grey">
            </th>
            <th>
              <a class="header-link" href="#" ng-click="setOrderBy('DataType')"><span>Field Type</span></a>
              <i class="fa fa-caret-up color-grey">
            </th>
            <th>
              <a class="header-link" href="#" ng-click="setOrderBy('Variation')"><span>Variation</span></a>
               <i class="fa fa-caret-up color-grey">
            </th>
            <th><a class="header-link" href="#"><span>Mapped Set</span></a></th>
            <th class="modified-column">
              <a class="header-link" href="#" ng-click="setOrderBy('UpdateDt')"><span>Modified</span></a>
              <i class="fa fa-caret-up">
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr ng-if="notReady"><td colspan="8"><center>Loading..</center></td></tr>
          <tr ng-repeat="row in attributeList">
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input" ng-model="row.checked"> 
            </td>
            <td class="column-text-ellipsis">
              <a href="#">{{row.AttributeNameEn}}</a>
            </td>
            <td>
              {{row.DisplayNameEn}}
            </td>
            <td>
              {{dataType[row.DataType]}}
            </td>
            <td>
              {{row.VariantStatus ? 'Yes' : 'No'}}
            </td>
            <td>
              {{row.AttributeSetCount}}
            </td>
            <td class="modified-column">
              {{ row.UpdatedDt | date:'shortDate':'+700' }}
            </td>
            <td class="action-column">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" uib-popover-template="'attribute/action'" popover-placement="bottom" popover-append-to-body="true" popover-any></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="page-navigation">
      <span>
        <!-- prev page button -->
        <a ng-click="nextPage(-1)">
          <i class="fa fa-chevron-left" ng-class="{'grey-chevron': tableParams.page == 0}"></i>
        </a>
        <span> Page {{ tableParams.page + 1 }} of {{ totalPage() }}</span>
        <!-- next page button -->
        <a ng-click="nextPage(1)"><i class="fa fa-chevron-right padding-right-15 blue-chevron" ></i></a>
        <span class="view-page-separator">View per page</span>
        <!-- Split button -->
        <div class="btn-group">
          <button type="button" class="btn btn-default">
          {{ tableParams.pageSize }}
          </button>
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-right">
            <li ng-repeat="size in [10,20,25,50]" ><a ng-click="setPageSize(size)">{{size}}</a></li>
          </ul>
        </div>
      </span>
    </div>
	</div>

  <a data-toggle="modal" data-target="#modal-loading">Loading Modal</a>

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