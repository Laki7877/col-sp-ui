<?php $this->layout('layouts/page-with-sidebar', ['title' => 'CMS Master - Select Type']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminCMSMasterAddSelectTypeCtrl" class="global-category-page">
		<nc-page-title nc-title="CMS Master/Select master type" link="/cms/master" icon="fa-tag"></nc-page-title>

		<div ng-show="loading" nc-loading="Loading CMS Master Type..."></div>
		<form ng-show="!loading" ng-submit="validate($event)" class="ah-form margin-top-30" method="POST" action="/admin/cms/master/create">
			<input type="hidden" name="category" ng-value="selected.CategoryId" />
			<div class="category-section column-2">
				<div class="category-section-border-box">
					<div class="category-header">
						<span>CMS Master Type</span>
					</div>
					<div class="category-content no-padding">
						<ul ng-repeat="column in columns track by $index" ng-class="{'empty-column': column.list.length <= 0 }" class="content-column">
							<li ng-repeat="row in column.list track by $index" ng-class="{'category-active' : $index == column.active }" ng-click="select(row, $index, $parent.$index)" ng-cloak>{{row.NameEn}}</li>
						</ul>
					</div>
				</div>
				<div class="category-footer no-padding">
					<span class="float-right">
						<a type="button" class="btn btn-link btn-width-xl" href="/admin/cms/master" >Cancel</a>
						<button type="submit" class="btn btn-blue btn-width-xl" ng-class="{'disabled' : !selected}">Select</button>
					</span>
				</div>
			</div>
		</form>
	</div>
<?php $this->stop() ?>
