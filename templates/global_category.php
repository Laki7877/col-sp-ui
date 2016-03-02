<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Global Category']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="ProductAddSelectCategoryCtrl" class="global-category-page">
		<? $this->insert('components/page-title-breadcrumb-border', ['text' => 'Products/Add Product', 'urls' => ['/products']]) ?>

		<div ng-show="loading">
			<img src="/assets/img/loader.gif" width="40"> <small>Loading Global Categories..</small>
		</div>
		<form ng-show="!loading" ng-submit="validate($event)" class="ah-form margin-top-30" method="POST" action="/products/add">
			<input type="hidden" name="category" ng-value="selected.CategoryId" />
<!--			<div class="global-category-radio-section ">
				<span>Type of upload</span>
				<div class="radio multiple-radio">
					<label><input type="radio" name="optradio" checked="checked">Single</label>
					<label><input type="radio" name="optradio">Bulk (via Excel)</label>
				</div>
			</div> -->
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
