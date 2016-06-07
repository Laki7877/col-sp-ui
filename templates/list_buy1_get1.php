 <?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Buy 1 Get 1']) ?>

<?php $this->start('page-body') ?>
<div ng-controller="SellerBuy1Get1ListCtrl" ng-disabied="manageBuy1Get1SE || manageBuy1Get1SH">
  <nc-alert nc-model="alert"></nc-alert>
  <nc-page-title nc-title="Buy 1 Get 1" icon="fa-tag">
    <form id="exportForm" name="exportForm" action="/admin/buy1get1/export" method="post">
      <input type="hidden" name="selected_products[]" ng-repeat="item in bulkContainer" value="{{ item.PromotionBuy1Get1Id }}"/>
      <a href="/buy1get1/create" class="btn-blue btn btn-width-xl">
        <span class="">Create</span>
      </a>
    </form>
  </nc-page-title>
  <div class="row search-section-wrapper">
    <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="{{PromotionBuy1Get1Id}}"></nc-bulk>
    <nc-search nc-model="params.searchText" nc-search-event="onSearch" nc-search-placeholder="'Search for promotion name'"></nc-search>
  </div>
  </nc-filter>
  <nc-table id="inventory-tab-content" nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
    <table class="table table-curved">
      <thead>
        <tr class="table-head">
          <th class="checkbox-column">
            <nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox>
          </th>
          <th nc-sort="NameEN">Name(EN)</th>
          <th nc-sort="NameTH">Name(TH)</th>
          <th nc-sort="Status">Status</th>
          <th>Visible</th>
          <th nc-sort="UpdatedDt">Modified</th>
          <th class="action-column">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="row in list.data">
          <td class="checkbox-column">
            <nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox>
          </td>
          <td class="column-text-ellipsis" nc-link="/buy1get1/{{row.PromotionBuy1Get1ItemId}}">
            {{row.NameEN}}
          </td>
          <td class="column-text-ellipsis" nc-link="/buy1get1/{{row.PromotionBuy1Get1ItemId}}">
            {{row.NameTH}}
          </td>
          <td class="status-column">
              {{row.Status}}
          </td>
          <td class="visible-column">
            <nc-eye nc-model="row.Visibility" nc-eye-on-toggle="toggleEye(row)"></nc-eye>
          </td>
          <td class="modified-column">{{ row.UpdateDate | dateTh }}</td>
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
