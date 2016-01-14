<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute Set']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminAttributeSetCtrl">
    <? $this->insert('components/page-title-with-one-button', ['text' => 'Attribute Set','button' => 'Add Attribute Set', 'button_class' => 'btn-width-xxl', 'link' => '/admin/attributesets/add']) ?>
    <div class="row search-section-wrapper">
      <form ng-submit="bulk.fn()" class="search-section section-action">
        <div class="input-group">
          <div class="input-group-btn">
            <div class="dropdown-btn">
              <button type="button" class="body-dropdown-button btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                  <span class="dropdown-text margin-right-10 search-product-text">- Choose Action -</span>
                  <span class="caret margin-left-10"></span>
              </button>
              <ul class="dropdown-menu search-product-dropdown">
                <li ng-repeat="option in bulkOptions" ng-click="bulk=option"><a>{{option.name}}</a></li>
              </ul>
            </div>
          </div><!-- /btn-group -->
          <div class="input-group-btn">
            <button type="button" class="btn-white btn">
              <span class="button-text-blue">Confirm</span>
            </button>
          </div>
        </div>
      </form>
      <form ng-submit="applySearch()" class="search-section section-search">
        <div class="input-group">
          <input type="text" class="form-control input-search-icon search-box" ng-model="searchText" placeholder="Search" aria-describedby="basic-addon2">
          <span class="input-group-btn">
            <button class="btn btn-white">Search</button>
          </span>
        </div>
      </form>
    </div>
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
            <th ng-click="setOrderBy('AttributeSetNameEn')">
              <a class="header-link" href="#"><span>Attribute Set Name</span></a>
              <i ng-class="sort('AttributeSetNameEn')">
            </th>
            <th ng-click="setOrderBy('AttributeCount')">
              <a class="header-link" href="#"><span>Attribute in Set</span></a>
              <i ng-class="sort('AttributeCount')">
            </th>
            <th ng-click="setOrderBy('Status')">
              <a class="header-link" href="#" ><span>Visible</span></a>
              <i ng-class="sort('Status')">
            </th>
            <th class="modified-column" ng-click="setOrderBy('UpdatedDt')">
              <a class="header-link" href="#" ><span>Modified</span></a>
              <i ng-class="sort('UpdatedDt')">
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr ng-if="notReady"><td colspan="6"><center>Loading..</center></td></tr>
          <tr ng-repeat="row in attributeSetList">
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input" ng-model="row.checked"> 
            </td>
            <td class="column-text-ellipsis">
              <a ng-click="actions.edit(row)">{{ row.AttributeSetNameEn }}</a>
            </td>
            <td>{{ row.AttributeCount }}</td>
            <td>
              <i ng-class="{'fa fa-eye-slash color-grey eye-icon' : row.Status != 'VI',
                            'fa fa-eye color-dark-grey eye-icon' : row.Status == 'VI'}"></i>
            </td>
                  <td class="modified-column">{{ row.UpdatedDt | date:'shortDate':'+700' }}</td>
            <td class="action-column">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" uib-popover-template="'attribute_set/action'" popover-placement="bottom" popover-append-to-body="true" popover-any></i>
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
<?php $this->stop() ?>