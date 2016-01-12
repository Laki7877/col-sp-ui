<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Global Category']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="ProductAddSelectCategoryCtrl" class="global-category-page">
		<? $this->insert('components/page-title-breadcrumb-border', ['text' => 'Products/Add Product']) ?>
		<form class="ah-form" method="POST" action="/products/add">
			<input type="hidden" name="category" ng-value="selected.CategoryId" />
			<div class="global-category-radio-section ">
				<span>Type of upload</span>
				<div class="radio multiple-radio">
					<label><input type="radio" name="optradio" checked="checked">Single</label>
					<label><input type="radio" name="optradio">Bulk (via Excel)</label>
				</div>
			</div>	
			<div class="category-section column-4">
				<div class="category-section-border-box">
					<div class="category-header">
						<span class="required">Global Category</span>
					</div>
					<div class="category-content no-padding">
						<ul ng-repeat="column in columns track by $index" ng-class="{'empty-column': column.list.length <= 0 }" class="content-column">
							<li ng-repeat="row in column.list track by $index" ng-class="{'category-active' : $index == column.active }" ng-click="select(row, $index, $parent.$index)" ng-cloak>{{row.NameEn}}</li>
						</ul>
					</div>
				</div>
				<div class="category-footer no-padding">
					<span>Only shown categories that are allowed for this store.</span>
					<span class="float-right">
						<button type="button" class="btn btn-link btn-width-xl">Cancel</button>
						<button type="submit" class="btn btn-blue btn-width-xl" ng-class="{'disabled' : !selected}">Select</button>
					</span>
				</div>
			</div>
		</form>
	</div>
<?php $this->stop() ?>