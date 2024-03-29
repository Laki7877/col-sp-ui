<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Local Category']) ?>
<?php $this->start('page-body') ?>
<div ng-controller="ProductListLocalCategoryCtrl" ng-init="init(<?= $catid ?>)" ng-cloak>
	<? $this->insert('components/page-title-breadcrumb-local-category', ['text' => "Products/Add Product"]) ?>
	<? $this->insert('components/search-section', ['optional_class' => 'hide-component']) ?>
	<div ng-if="productList.length > 0 || notReady">
		<div class="filter-section">
			<div class="filter-container">
				<span>Filters:</span>
				<a class="filter-seperator" ng-repeat="filter in filterOptions" ng-class="{'filter-active': tableParams.filter == filter.value }" ng-click="tableParams.filter = filter.value">{{ filter.name }}</a>
			</div>
		</div>
		<div class="table-section">
			<table class="table table-curved">
				<thead>
					<tr class="table-head" >
						<th class="checkbox-column">
						<input type="checkbox" aria-label="Checkbox for following text input" ng-model="checkAll">
						</th>
						<th class="display-column"></th>
						<th>
							<a ng-click="setOrderBy('ProductNameEn')"><span>Product Name</span></a>
							<span class="caret caret-grey"></span>
						</th>
						<th class="price-column">
							<a ng-click="setOrderBy('SalePrice')"><span>Sale Price</span></a>
							<span class="caret caret-grey"></span>
						</th>
						<th><a class="header-link" href="#"><span>Info.</span></a></th>
						<th><a class="header-link" href="#"><span>Image</span></a></th>
						<th class="status-column">
							<a ng-click="setOrderBy('Status')">
								Status<span>
								<span class="caret caret-grey"></span>
						</th>
						<th class="live-column" ng-if="showOnOffStatus">Live</th>
						<th class="visible-column">Visible</th>
						<th class="modified-column">
						<a ng-click="setOrderBy('UpdatedDt')">Modified<span>
						<span class="caret"></span>
						</th>
					</tr>
				</thead>
				<tbody>
				<tr ng-if="notReady"><td colspan="9"><center>Loading..</center></td></tr>
				<tr ng-if="!notReady" ng-repeat="row in productList" >
				<td class="checkbox-column">
				<input type="checkbox" aria-label="Checkbox for following text input" ng-model="row.checked">
				</td>
				<td class="display-column">
				<img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
				</td>
				<td>{{ row.ProductNameEn }}</td>
				<td class="price-column">{{ row.SalePrice | currency: ' ' : 2 }}</td>
				<td class="info-column">
				<i class="fa fa-check color-green icon-size-18px"></i>
				</td>
				<td class="image-column">
				<i class="fa fa-check color-green icon-size-18px"></i>
				</td>
				<td class="status-column">
				<span class="color-red">
				<i class="fa fa-ban"></i>
				Not Approved
				</span>
				</td>
				<td class="live-column" ng-if="showOnOffStatus">
				<i class="fa fa-circle color-green"></i>
				</td>
				<td class="visible-column">
				<i class="fa fa-eye-slash color-grey eye-icon"></i>
				</td>
				<td class="modified-column">
				14/12/15
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
			<li ng-repeat="size in [4,8,16,20]"><a ng-click="setPageSize(size)">{{size}}</a></li>
		</ul>
		</div>
		</span>
		</div>
	</div>
	<div ng-if="productList.length <= 0 && !notReady" class="local-category-page margin-bottom-20">
		<? $this->insert('components/local-category-empty-content', ['text' => 'You do not have any product in this category']) ?>
	</div>
</div>
<?php $this->stop() ?>
