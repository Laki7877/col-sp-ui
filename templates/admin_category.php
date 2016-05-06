<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Global Category']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminCategoryCtrl" ng-init="init()" class="local-category-page">
		<nc-alert nc-model="alert"></nc-alert>
		<div class="page-header with-border">
		    <h1 class="float-left page-header-title">
					<i class="fa fa-tag page-header-icon" style="font-size:22px;"></i>
		    	<span>Global Category</span>
					<small>
		    		<span ng-show="!saving && pristine" class="margin-left-10">All changes were saved</small>
						<span ng-show="saving && pristine" class="margin-left-10" nc-loading-small="Saving..." style="display: inline-block; margin-bottom: -20px; margin-top: -5px;"></span>
					</span>
				</h1>
		    <span class="float-right page-header-action">
					<button type="button" class="btn-white btn btn-width-xl margin-right-10" ng-click="expandAll()">
						Expand All
					</button>
					<button type="button" class="btn-white btn btn-width-xl margin-right-10" ng-click="collapseAll()">
						Collapse All
					</button>
	        <button type="button" class="btn-blue btn btn-width-xxl" ng-click="open()">
	          Add Category
	        </button>
		    </span>
		</div>
		<div ng-show="!loading && categories.length > 0" class="row">
			<div class="col-sm-12">
				<div class="category-column-header">
					Category Name
					<span class="pull-right category-column category-action-gear">
						Action
					</span>
					<span class="pull-right category-column">
						Visible
					</span>
					<span class="pull-right category-column">
						Attribute Sets
					</span>
					<span class="pull-right category-column">
						Products
					</span>
					<span class="pull-right category-column">
						ID
					</span>
				</div>
			</div>
		</div>

		<div ng-show="!loading && categories.length > 0" class="row">
		  <div class="col-sm-12">
		    <div ui-tree="treeOptions" max-depth="4">
		      <ol ui-tree-nodes ng-model="categories">
		        <li ng-repeat="node in categories" ui-tree-node ng-include="'global_category/nodes'"></li>
		      </ol>
		    </div>
		  </div>
		</div>
		<div ng-show="!loading && categories.length == 0" nc-empty="You do not have any categories" class="margin-top-20"></div>
      	<div ng-show="loading" nc-loading="Loading.."></div>
	</div>

<?php $this->stop() ?>
