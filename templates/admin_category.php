<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Category']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminCategoryCtrl" ng-init="init()" class="local-category-page">
		<nc-alert nc-model="alert"></nc-alert>
		<div class="page-header with-border">
		    <h1 class="float-left page-header-title">
		    	<span>Global Category</span>
		    	<span ng-show="!saving && pristine" class="margin-left-10"><small>All changes were saved</small></span>
				<span ng-show="saving && pristine" class="margin-left-10" nc-loading-small="Saving..." style="display: inline-block; margin-bottom: -20px; margin-top: -5px;"></span>
		    </h1>
		    <span class="float-right page-header-action">
		    	<button type="button" class="btn-white btn btn-width-xl margin-right-10">
		          <span class="">Export</span>
		        </button>
		        <button type="button" class="btn-blue btn btn-width-xxl" ng-click="open()">
		          Add Category
		        </button>
		    </span>
		</div>
		<div ng-show="!loading && categories.length > 0" class="local-category-section">
			<div class="col-xs-12 category-header no-padding">
				<span class="col-xs-5">
					Category Name
				</span>
				<span class="col-xs-1">
					ID
				</span>
				<span class="col-xs-1 text-align-center">
					Products
				</span>
				<span class="col-xs-2 text-align-center no-padding">
					Attribute Sets
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
			<div class="col-xs-12 no-padding margin-bottom-60" ui-tree="treeOptions" max-depth="4">
				<ol class="sortable no-padding" ui-tree-nodes ng-model="categories">
					<li ng-repeat="node in categories" ui-tree-node ng-include="'global_category/nodes'"></li>
				</ol>
			</div>
		</div>
		<div ng-show="!loading && categories.length == 0" class="local-category-empty-section margin-top-20">
			<span class="">
				<span class="zero-category-image">
				</span>
			</span>
			<span class="local-category-empty-text">You do not have any categories</span>
		</div>
      	<div ng-show="loading">
          <? $this->insert('components/table-loading', ['text' => 'Loading...']) ?>
      	</div>
	</div>

<?php $this->stop() ?>
