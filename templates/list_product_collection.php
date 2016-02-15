<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product']) ?>

<?php $this->start('page-body') ?>
<!--<div ng-controller="ProductListCtrl" ng-init="init(<?= $params ?>)">-->
<div ng-controller="ProductCollectionListCtrl" ng-init="init(<?= $params ?>)">
    <? $this->insert('components/modal-export-product-collection', ['id' => 'export-product-collection', 'newProductNum' => '1,500']) ?>
    <? $this->insert('components/modal-export-product-collection-progressing', ['id' => 'export-product-collection-progressing', 'percent' => '60']) ?>

    <? $this->insert('components/page-title-product-collection-with-buttons', ['text' => 'Product Collection']) ?>
    <div ng-show="alert.show" uib-alert template-url="common/alert" type="{{alert.type}}" close="alert.close()">{{alert.message}}</div>
    <div class="row search-section-wrapper">
      <form ng-submit="bulk.fn()" class="search-section section-action">
        <div class="input-group">
          <div class="input-group-btn">
            <div class="dropdown-btn">
              <button type="button" class="body-dropdown-button btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                  <span id="bulk" class="dropdown-text margin-right-10 search-product-text">
			            Choose Action 
		              </span>
                  <span class="caret margin-left-10"></span>
              </button>
              <ul class="dropdown-menu search-product-dropdown">
                <li ng-repeat="option in bulkOptions"><a>{{option.name}}</a></li>
              </ul>
            </div>
          </div><!-- /btn-group -->
          <div class="input-group-btn">
            <button class="btn-white-fluid btn">
              <span class="button-text-blue">Confirm <strong ng-show="checkBoxCount() > 0">({{ checkBoxCount() }})</strong></span>
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

      <table ng-show="productList.length > 0" class="table table-curved">
        <thead>
          <tr class="table-head" >
		  
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input" ng-click="checkAll()" ng-model="checkAll" >
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
			 <th class="eff-exp-column" ng-click="setOrderBy('EffectiveDate')">
              <a class="header-link" ><span ng-class="sort('EffectiveDate', true)">EffectiveDate</span></a>
              <i class="fa" ng-class="sort('EffectiveDate')">
            </th>
			 <th class="eff-exp-column" ng-click="setOrderBy('ExpiryDate')">
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
      	  <tr ng-repeat="row in productList" >		  
                  <td class="checkbox-column">
                    <input type="checkbox" aria-label="Checkbox for following text input" ng-model="checkBoxCache[row.CMSId]">
                  </td>                  
				  <td class="column-text-ellipsis"><a href="/collections/{{ row.CMSId }}">{{ row.CMSNameEN || '(Untitled Collection)' }}</a></td>
                 
				 <td class="column-text-ellipsis">{{ row.URLKey || '(Untitled Collection)' }}</td>
				 <td class="column-text-ellipsis">{{ row.ShortDescriptionEN || '(Untitled ShortDescriptionEN)' }}</td>
				 <td class="modified-column">{{ row.EffectiveDate | date:'shortDate':'+700' }}</td>
				 <td class="modified-column">{{ row.ExpiryDate | date:'shortDate':'+700' }}</td>

                  <td class="status-column">
                    <span class="{{ asStatus(row.CMSStatusId).Color }}">
                      <i class="fa {{ asStatus(row.CMSStatusId).Class }}"></i>
                       {{ asStatus(row.CMSStatusId).Text }}
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
      </table>
	  
      <div ng-show="notReady">
          <? $this->insert('components/table-loading', ['text' => 'Loading...']) ?>
      </div>
      <div ng-show="!notReady && productList.length == 0 && tableParams.searchText.length > 0">
          <div class="local-category-page margin-bottom-20">
            <? $this->insert('components/local-category-empty-content', ['text' => 'No Search Result']) ?>      
          </div>
      </div>
      <div ng-show="!notReady && productList.length == 0 && tableParams.searchText.length <= 0">
          <div class="local-category-page margin-bottom-20">
            <? $this->insert('components/local-category-empty-content', ['text' => 'You do not have a Product']) ?>      
          </div>
      </div>
    </div>

    <div class="page-navigation">
      <span>
        <!-- prev page button -->
        <a ng-click="nextPage(-1)">
          <i class="fa fa-chevron-left" ng-class="{'grey-chevron': tableParams.page == 0, 'blue-chevron' : tableParams.page > 0}"></i>
        </a>
        <span> Page {{ tableParams.page + 1 }} of {{ totalPage() }}</span>
        <!-- next page button -->
        <a ng-click="nextPage(1)">
          <i class="fa fa-chevron-right padding-right-15" ng-class="{'grey-chevron': tableParams.page == totalPage() - 1, 'blue-chevron' : tableParams.page < totalPage() - 1}"></i></a>
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
            <li ng-repeat="size in [20,50,100]" ><a ng-click="setPageSize(size)">{{size}}</a></li>
          </ul>
        </div>
      </span>
    </div>
	</div>
    


<?php $this->stop() ?>
