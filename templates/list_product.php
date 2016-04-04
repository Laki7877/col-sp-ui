<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product']) ?>

<?php $this->start('page-body') ?>
<div ng-controller="ProductListCtrl">
   <nc-alert nc-model="alert"></nc-alert>
   <nc-page-title nc-title="Products" icon="fa-tag">
      <form id="exportForm" name="exportForm" action="/products/export" method="post">
          <input type="hidden" name="selected_products[]" ng-repeat="item in bulkContainer" value="{{ item.ProductId }}"/>
          <input type="hidden" name="search_criteria"  value="{{ searchCriteria }}"/>

          <div class="btn-group margin-right-10">
            <button type="button" class="btn btn-white dropdown-toggle btn-width-lg" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Export <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="/products/export">Export All Products</a></li>
              <li><a ng-click="exportSelected()">Export Selected Products</a></li>
              <li><a ng-click="exportSearchResult()">Export By Search Result</a></li>
            </ul>
          </div>
          <div class="btn-group margin-right-10">
            <button type="button" class="btn btn-white dropdown-toggle btn-width-lg" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Import <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="/products/import">Add New Products</a></li>
              <li><a href="/products/update">Update Existing Products</a></li>
            </ul>
          </div>
        <a href="/products/select" class="btn-blue btn btn-width-xl">
          <span class="">Add Product</span>
        </a>
      </form>
   </nc-page-title>
  <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="{{id}}"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-event="onSearch" nc-search-placeholder="'Search for Product Name or Tag'"></nc-search>
      <nc-advance-search-button nc-model="advanceSearch"></nc-advance-search-button>
      <!-- <div class="search-section-item pull-right">
        <div class="filter-checkbox">
          <input ng-model="showOnOffStatus.value"type="checkbox" />
          Show Online/Offline Status
        </div>
      </div> -->
  </div>
  <nc-advance-search nc-model="advanceSearchParams" nc-advance-search-toggle="advanceSearch" nc-advance-search-event="onAdvanceSearch" nc-advance-search-options="advanceSearchOptions"></nc-advance-search>
  <nc-filter nc-model="params._filter" nc-filter-options="filterOptions">
  </nc-filter>
  <nc-table id="inventory-tab-content" nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
      <table class="table table-curved">
          <thead>
              <tr class="table-head">
                  <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
                  <th class="display-column"></th>
                  <th nc-sort="ProductNameEn">Product Name</th>
                  <th>Tag</th>
                  <th class="price-column" nc-sort="SalePrice">Sale Price</th>
                  <th class="info-column"><span>Info</span></th>
                  <th class="image-column"><span>Image</span></th>
                  <th class="status-column" nc-sort="Status">Status</th>
                  <th class="live-column" ng-if="showOnOffStatus.value">Live</th>
                  <th class="visible-column">Visible</th>
                  <th class="modified-column" nc-sort="UpdatedDt">Modified</th>
                  <th class="action-column">Action</th>
              </tr>
          </thead>
          <tbody>
              <tr ng-repeat="row in list.data">
                  <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
                  <td class="display-column">
                    <div class="img-holder">
                      <img ng-if='!row.ImageUrl' class="logo-img" src="<?= $this->asset('/assets/img/placeholder-no-image.png') ?>" />
                      <img ng-if='row.ImageUrl' class="logo-img" src="{{ row.ImageUrl }}" />
                    </div>
                  </td>
                  <td class="column-text-ellipsis">
                    <div><a href="/products/{{ row.ProductId }}">{{ row.ProductNameEn || '(Untitled Product)' }}</a></div>
                    <div class="color-grey" ng-if="row.VariantCount > 0">({{row.VariantCount}} variants)</div>
                  </td>
                  <td class="tag-column column-text-ellipsis">
                    {{getTag(row.Tags)}}
                  </td>
                  <td class="price-column">
                    <div>{{ row.SalePrice | currency: ' ' : 2 }}</div>
                  </td>
                  <td class="info-column">
                    <i ng-if="!row.InfoFlag" class="fa fa-minus color-grey icon-size-18px"></i>
                    <i ng-if="row.InfoFlag" class="fa fa-check color-green icon-size-18px"></i>
                  </td>
                  <td class="image-column">
                    <i ng-if="!row.ImageFlag" class="fa fa-minus color-grey icon-size-18px"></i>
                    <i ng-if="row.ImageFlag" class="fa fa-check color-green icon-size-18px"></i>
                  </td>
                  <td class="status-column">
                    <span class="{{ asStatus(row.Status).color }}">
                      <i class="fa {{ asStatus(row.Status).icon }}"></i>
                      {{ asStatus(row.Status).name }}
                    </span>
                  </td>
                  <td class="live-column" ng-if="showOnOffStatus.value">
                    <i class="fa fa-circle color-grey"></i>
                  </td>
                  <td class="visible-column">
                    <nc-eye nc-model="row.Visibility" nc-eye-on-toggle="toggleEye(row)"></nc-eye>
                  </td>
                  <td class="modified-column">{{ row.UpdatedDt | dateTh }}</td>
                  <td class="action-column">
                      <nc-action nc-model="row" nc-action-fn="actions"></nc-action>
                  </td>
              </tr>
          </tbody>
      </table>
  </nc-table>
  <nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
</div>
<?php $this->stop() ?>
