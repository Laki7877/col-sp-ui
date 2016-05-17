<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Global Category']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="ProductAddSelectCategoryCtrl" class="global-category-page">
		<nc-page-title nc-title="Products/Add Product" link="/products" icon="fa-tag"></nc-page-title>

		<div ng-show="loading" nc-loading="Loading Global Categories..."></div>
		<form ng-show="!loading" ng-submit="validate($event)" class="ah-form margin-top-30" method="POST" action="/products/add">
			<input type="hidden" name="category" ng-value="selected.CategoryId" />
			<div class="category-section column-4">
				<div class="category-section-border-box">
					<div class="category-header">
						<span>Global Category</span>
					</div>
					<div class="category-content no-padding">
						<ul ng-repeat="column in columns track by $index" ng-class="{'empty-column': column.list.length <= 0 }" class="content-column">
							<li ng-repeat="row in column.list track by $index" ng-class="{'category-active' : $index == column.active }" ng-click="select(row, $index, $parent.$index)" ng-cloak>{{row.NameEn}}</li>
						</ul>
					</div>
				</div>
				<div class="category-footer no-padding">
					<span class="float-right">
						<a type="button" class="btn btn-link btn-width-xl" href="/products" >Cancel</a>
						<button type="submit" class="btn btn-blue btn-width-xl" ng-class="{'disabled' : !selected}">Select</button>
					</span>
				</div>
			</div>
		</form>
	</div>
<?php $this->stop() ?>
