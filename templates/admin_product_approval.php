<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>

<div ng-controller="AdminProductApprovalListCtrl">
   <nc-alert nc-model="alert"></nc-alert>
   <nc-page-title nc-title="Product Approval List" icon="fa-tag">
   </nc-page-title>
<div>
    <div class="row search-section-wrapper">
          <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="ProductId"></nc-bulk>
		  <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Product SKU, Name, ...'"></nc-search>
		  <nc-advance-search-button nc-model="advanceSearch"></nc-advance-search-button>
		</div>
		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<div id="add-product-approval-list-content">
						    <nc-advance-search nc-model="advanceSearchParams" nc-advance-search-toggle="advanceSearch" nc-advance-search-event="onAdvanceSearch" nc-advance-search-options="advanceSearchOptions"></nc-advance-search>
						    <div class="row">
						        <div class="col-xs-12">
						            <div class="form-section margin-bottom-0">
						                <div class="form-section-content margin-filter">
						                    <div nc-template="common/input/form-group-with-label" nc-label="Product Status" nc-template-form="addProductForm.Keywords">
						                        <div class="ah-select2-dropdown">
						                            <select ng-model="params._filter" class="form-control" ng-options="i.value as i.name for i in filterOptions" required>
						                            </select>
						                        </div>
						                    </div>

						                    <div class="form-group margin-bottom-0">
						                        <div class="filter-section filter-input">
						                            <div class="filter-container-input">
						                                <span>Filters:</span>
						                                <a ng-repeat="filter in filter2Options track by $index" class="{{ params._filter2 == filter.value ? 'filter-active' : '' }} {{$index == 0 ? 'filter-first-option first-label' : 'filter-seperator'}} " ng-click="params._filter2 = filter.value">{{filter.name}}</a>
						                            </div>
						                        </div>
						                        <!-- <nc-filter nc-model="params._filter" nc-filter-options="filterOptions"></nc-filter>-->
						                    </div>
						                </div>
						            </div>
						        </div>
						    </div>
						    <div class="table-section">
						        <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()">
						            <table class="table table-curved">
						                <thead>
						                    <tr class="table-head">
						                        <th class="checkbox-column">
						                            <nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox>
						                        </th>
						                        <th></th>
						                        <th nc-sort="ProductNameEn">Product Name </th>
						                        <th nc-sort="Shop">Shop</th>
						                        <th class="approve-column" nc-sort="InformationTabStatus">Info.</th>
						                        <th class="approve-column" nc-sort="ImageTabStatus">Img.</th>
						                        <th class="approve-column" nc-sort="CategoryTabStatus">Cat.</th>
						                        <th class="approve-column" nc-sort="VariationTabStatus">Var.</th>
						                        <th class="approve-column" nc-sort="MoreOptionTabStatus">More.</th>
						                        <th class="width_200" nc-sort="Status">Status</th>
						                        <th class="width_100" nc-sort="UpdatedDt" >Submitted</th>
						                        <th class="action-column">Action</th>
						                    </tr>
						                </thead>
						                <tbody>
						                    <tr ng-repeat="row in list.data">
						                        <td class="checkbox-column">
						                            <nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox>
						                        </td>
						                        <td class="display-column">
						                            <div class="img-holder">
						                                <img ng-if='!row.ImageUrl' class="logo-img" src="<?= $this->asset('/assets/img/placeholder-no-image.png') ?>" />
						                                <img ng-if='row.ImageUrl' class="logo-img" src="{{ row.ImageUrl }}" />
						                            </div>
						                        </td>
						                        <td class="column-text-ellipsis" nc-link="/admin/approve/{{row.ProductId}}">
						                            {{row.ProductNameEn}}
						                        </td>
						                        <td>{{row.Shop.ShopNameEn}}</td>
						                        <td class="approve-column"> <span class="{{ asStatus(row.InformationTabStatus).color }}"><i class="fa fa-circle"></i></span></td>
						                        <td class="approve-column">
						                            <span class="{{ asStatus(row.ImageTabStatus).color }}"><i class="fa fa-circle"></i></span>
						                        </td>
						                        <td class="approve-column"> <span class="{{ asStatus(row.CategoryTabStatus).color }}"><i class="fa fa-circle"></i></span> </td>
						                        <td class="approve-column">
						                            <span class="{{ asStatus(row.VariantTabStatus).color }}"><i class="fa fa-circle"></i></span>
						                        </td>
						                        <td class="approve-column"> <span class="{{ asStatus(row.MoreOptionTabStatus).color }}"><i class="fa fa-circle"></i></span> </td>
						                        <td>
						                            <span class="{{ asStatus(row.Status).color }}"><i class="fa" ng-class="asStatus(row.Status).icon "></i> {{ asStatus(row.Status).name }} </span>
						                        </td>
						                        <td>{{row.UpdatedDt | dateTh }}</td>
						                        <td class="action-column"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
						                    </tr>
						                </tbody>
						            </table>
						        </nc-table>
						        <nc-pagination nc-model="params" nc-pagination-total="list.total"></nc-pagination>
						    </div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<?php $this->stop() ?>
