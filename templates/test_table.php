<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Attribute']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="TestCtrl">
    <!--div ng-show="alert.show" uib-alert template-url="common/alert" type="{{ alert.type }}" close="alert.close()">{{alert.message}}</div-->
    <!--div class="row search-section-wrapper">
      <form ng-submit="bulk.fn()" class="search-section section-action">
        <div class="input-group">
          <div class="input-group-btn">
            <div class="dropdown-btn">
              <button type="button" class="body-dropdown-button btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                  <span id="bulk" class="dropdown-text margin-right-10 search-product-text">- Choose Action -</span>
                  <span class="caret margin-left-10"></span>
              </button>
              <ul class="dropdown-menu search-product-dropdown">
                <li ng-repeat="option in bulkOptions"><a>{{option.name}}</a></li>
              </ul>
            </div>
          </div>
          <div class="input-group-btn">
            <button class="btn-white btn" type="submit">
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
    </div-->
    <div class="row search-section-wrapper">
      <nc-bulk nc-bulk-fn="bulks" nc-bulk-track-by="AttributeId"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search'"></nc-search>
    </div>
    <nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="params.searchText.length > 0" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="AttributeNameEn">Attribute Name</th>
            <th nc-sort="DisplayNameEn">Display Name</th>
            <th nc-sort="DateType">Field Type</th>
            <th>Variation</th>
            <th>Mapped Set</th>
            <th nc-sort="UpdateDt" class="modified-column">Modified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td class="column-text-ellipsis">
              {{row.AttributeNameEn}}
            </td>
            <td>{{row.DisplayNameEn}}</td>
            <td>{{row.DataType | mapDropdown:dataTypeOptions }}</td>
            <td>{{row.VariantStatus | mapDropdown:yesNoOptions }}</td>
            <td>{{row.AttributeSetCount}}</td>
            <td>{{row.UpdatedDt | dateTh}}</td>
            <td><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
<?php $this->stop() ?>