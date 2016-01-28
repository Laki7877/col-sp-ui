<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product']) ?>

<?php $this->start('page-body') ?>
<div ng-controller="ProductListCtrl" ng-init="init(<?= $params ?>)">
    <? $this->insert('components/modal-export-product', ['id' => 'export-product', 'newProductNum' => '1,500']) ?>
    <? $this->insert('components/modal-export-product-progressing', ['id' => 'export-product-progressing', 'percent' => '60']) ?>

    <? $this->insert('components/page-title-with-buttons', ['text' => 'Products']) ?>
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
              <span class="button-text-blue">Confirm ({{ checkBoxCount() }})</span>
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
       <div class="search-section section-filter checkbox-wrapper">
          <input ng-model="showOnOffStatus"type="checkbox" name="checkboxG1" id="checkboxG1" class="css-checkbox" />
          <label for="checkboxG1" class="css-label">
              Show Online/Offline Status
          </label>
        </div>
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
                <input type="checkbox" aria-label="Checkbox for following text input" ng-model="checkAll">
            </th>
            <th class="display-column"></th>
            <th ng-click="setOrderBy('ProductNameEn')">
              <a class="header-link" ><span ng-class="sort('ProductNameEn', true)">Product Name</span></a>
              <i class="fa" ng-class="sort('ProductNameEn')">
            </th>
            <th class="price-column" ng-click="setOrderBy('OriginalPrice')">
              <a class="header-link" ><span ng-class="sort('OriginalPrice', true)">Price</span></a>
              <i class="fa" ng-class="sort('OriginalPrice')">
            </th>
            <th><span>Info.</span></th>
            <th><span>Image</span></th>
            <th class="status-column">
              Status
            </th>
            <th class="live-column" ng-if="showOnOffStatus">Live</th>
            <th class="visible-column">Visible</th>
            <th class="modified-column" ng-click="setOrderBy('UpdatedDt')">
              <a class="header-link" ><span ng-class="sort('UpdatedDt', true)">Modified</span></a>
              <i class="fa" ng-class="sort('UpdatedDt')">
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
      	  <tr ng-repeat="row in productList" >
                  <td class="checkbox-column">
                    <input type="checkbox" aria-label="Checkbox for following text input" ng-model="checkBoxCache[row.ProductId]">
                  </td>
                  <td class="display-column">
                    <div class="img-holder">
                      <img ng-if='!row.ImageUrl' class="logo-img" src="<?= $this->asset('/assets/img/placeholder-no-image.png') ?>" />
                      <img ng-if='row.ImageUrl' class="logo-img" src="{{ row.ImageUrl }}"/>
                    </div>
                  </td>
                  <td class="column-text-ellipsis"><a href="/products/{{ row.ProductId }}">{{ row.ProductNameEn || '(Untitled Product)' }}</a></td>
                  <td class="price-column">
                    <div>{{ row.OriginalPrice | currency: ' ' : 2 }}</div>
                    <div ng-if="row.VariantCount > 0">({{row.VariantCount}} variants)</div></td>
                  <td class="info-column">
                    <i ng-if="!row.InfoFlag" class="fa fa-minus color-grey icon-size-18px"></i>
                    <i ng-if="row.InfoFlag" class="fa fa-check color-green icon-size-18px"></i>
                  </td>
                  <td class="image-column">
                    <i ng-if="!row.ImageFlag" class="fa fa-minus color-grey icon-size-18px"></i>
                    <i ng-if="row.ImageFlag" class="fa fa-check color-green icon-size-18px"></i>
                  </td>
                  <td class="status-column">
                    <span class="{{ asStatus(row.Status).Color }}">
                      <i class="fa {{ asStatus(row.Status).Class }}"></i>
                      {{ asStatus(row.Status).Text }}
                    </span>
                  </td>
                  <td class="live-column" ng-if="showOnOffStatus">
                    <i class="fa fa-circle color-grey"></i>
                  </td>
                  <td class="visible-column">
                          <a ng-click="actions.toggle(row)"><i ng-class="{'fa fa-eye-slash color-grey eye-icon' : !row.Visibility,
                            'fa fa-eye color-dark-grey eye-icon' : row.Visibility}"></i></a>
                  </td>
                  <td class="modified-column">{{ row.UpdatedDt | date:'shortDate':'+700' }}</td>
                  <td class="action-column">
                    <i class="fa fa-gear color-dark-grey icon-size-20"  uib-popover-template="'product/action'" popover-placement="bottom" popover-append-to-body="true" popover-any>
                       <i class="fa fa-caret-down color-dark-grey"></i>
                    </i>
                   
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
