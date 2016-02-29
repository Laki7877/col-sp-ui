<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Local Category']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="LocalCategoryCtrl" ng-init="init()" class="local-category-page">
		<div ng-show="alert.show" uib-alert template-url="common/alert" type="{{ alert.type }}" close="alert.close()">{{alert.message}}</div>
		<div class="page-header with-border">
		    <h1 class="float-left page-header-title">
		    	<span>Local Category</span>
		    	<span ng-show="!saving && pristine" class="margin-left-10"><small>All changes were saved</small></span>
				<span ng-show="saving && pristine" class="margin-left-10" nc-loading-small="Saving..." style="display: inline-block; margin-bottom: -20px; margin-top: -5px;"></span>
		    </h1>
		    <span class="float-right page-header-action">
		        <button type="button" class="btn-blue btn btn-width-xxl" ng-click="open()">
		          Add Category
		        </button>
		    </span>
		</div>
		<div ng-if="!loading && categories.length > 0" class="local-category-section">
			<div class="col-xs-12 category-header no-padding">
				<span class="col-xs-8">
					Category Name
				</span>
				<span class="col-xs-1 text-align-center">
					Products
				</span>
				<span class="col-xs-1 text-align-center">
					Visible
				</span>
				<span class="col-xs-1 text-align-center">
					Move
				</span>
				<span class="col-xs-1 text-align-center">
					Action
				</span>
			</div>
			<div class="col-xs-12 no-padding" ui-tree="treeOptions" max-depth="4">
				<ol class="sortable no-padding" ui-tree-nodes ng-model="categories">
					<li ng-repeat="node in categories" ui-tree-node ng-include="'local_category/nodes'" data-collapsed="{{::$index == 0 ? false : true}}"></li>
				</ol>
			</div>
		</div>
		<div ng-if="!loading && categories.length == 0" class="local-category-empty-section margin-top-20">
			<span class="">
				<span class="zero-category-image">
				</span>
			</span>
			<span class="local-category-empty-text">You have no category</span>
		</div>
      	<div ng-if="loading">
          <? $this->insert('components/table-loading', ['text' => 'Loading...']) ?>
      	</div>
	</div>
<?php $this->stop() ?>
