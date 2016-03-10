<div class="row search-section-wrapper">     
      <form ng-submit="applySearch()" class="search-section section-search">
        <div class="input-group">
          <input type="text" class="form-control input-search-icon search-box" 
          ng-model="searchText" placeholder="Search for Product Name, PID, SKU" aria-describedby="basic-addon2">
          <span class="input-group-btn">
            <button class="btn btn-white">Search</button>
          </span>
        </div>
      </form>
    </div>  
    <div class="table-section">
      <table ng-show="productList.length > 0" class="table table-curved">
        <thead>
          <tr class="table-head" >
            <th class="checkbox-column">
               <!--  <input type="checkbox" aria-label="Checkbox for following text input" ng-click="checkAll()" ng-model="allChecked"> -->
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
            <th><span>Info</span></th>
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
            <!-- <th>
              Action
            </th> -->
          </tr>
        </thead>
        <tbody>
      	  <tr ng-repeat="row in productList" >
                  <td class="checkbox-column">
                    <!-- <input type="radio" name="chb_product"  aria-label="Checkbox for following text input"  value="{{row.ProductId}},{{ row.ProductNameEn || '(Untitled Product)' }}" > -->
                    <input type="radio" name="<?= $chb_target ?>"  aria-label="Checkbox for following text input"  value="{{row}}" >
                  </td>
                  <td class="display-column">
                    <div class="img-holder">
                      <img ng-if='!row.ImageUrl' class="logo-img" src="<?= $this->asset('/assets/img/placeholder-no-image.png') ?>" />
                      <img ng-if='row.ImageUrl' class="logo-img" src="{{ row.ImageUrl }}"/>
                    </div>
                  </td>
                  <td class="column-text-ellipsis"><a target="_blank" href="/products/{{ row.ProductId }}">{{ row.ProductNameEn || '(Untitled Product)' }}</a></td>
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
                    <!-- <span class="{{ asStatus(row.Status).color }}">
                      <i class="fa {{ asStatus(row.Status).icon }}"></i> -->
                      <!-- {{ asStatus(row.Status).name }} -->
                      <span>
                      {{ asStatus(row.Status).name }}
                      </span>
                  </td>
                  <td class="live-column" ng-if="showOnOffStatus">
                    <i class="fa fa-circle color-grey"></i>
                  </td>
                  <td class="visible-column">
                          <i ng-class="{'fa fa-eye-slash color-grey eye-icon' : !row.Visibility,
                            'fa fa-eye color-dark-grey eye-icon' : row.Visibility}"></i>
                  </td>
                  <td class="modified-column">{{ row.UpdatedDt | dateTh }}</td>
                  <!-- <td class="action-column">
                    <a class="fa fa-gear color-dark-grey icon-size-20"  uib-popover-template="'product/action'" popover-placement="bottom" popover-append-to-body="true" popover-any>
                       <i class="fa fa-caret-down color-dark-grey"></i>
                    </a>
                   
                  </td> -->
          </tr>
        </tbody>
      </table>
      <div ng-show="notReady">
          <?php $this->insert('components/table-loading', ['text' => 'Loading...']) ?>
      </div>
      <div ng-show="!notReady && productList.length == 0 && defaultProductModalParam.searchText.length > 0">
          <div class="local-category-page margin-bottom-20">
            <?php $this->insert('components/local-category-empty-content', ['text' => 'No Search Result']) ?>      
          </div>
      </div>
      <div ng-show="!notReady && productList.length == 0 && defaultProductModalParam.searchText.length <= 0">
          <div class="local-category-page margin-bottom-20">
            <?php $this->insert('components/local-category-empty-content', ['text' => 'You do not have a Product']) ?>      
          </div>
      </div>
    </div>

    <div class="page-navigation">
      <span>
        <!-- prev page button -->
        <a ng-click="nextPage(-1)">
          <i class="fa fa-chevron-left" ng-class="{'grey-chevron': defaultProductModalParam.page == 0, 'blue-chevron' : defaultProductModalParam.page > 0}"></i>
        </a>
        <span> Page {{ defaultProductModalParam.page + 1 }} of {{ totalPage() }}</span>
        <!-- next page button -->
        <a ng-click="nextPage(1)">
          <i class="fa fa-chevron-right padding-right-15" ng-class="{'grey-chevron': defaultProductModalParam.page == totalPage() - 1, 'blue-chevron' : defaultProductModalParam.page < totalPage() - 1}"></i></a>
        <span class="view-page-separator">View per page</span>
        <!-- Split button -->
        <div class="btn-group">
          <button type="button" class="btn btn-default">
          {{ defaultProductModalParam.pageSize }}
          </button>
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-right">
            <li ng-repeat="size in [5,10,20]" ><a ng-click="setPageSize(size)">{{size}}</a></li>
          </ul>
        </div>
      </span>
    </div>