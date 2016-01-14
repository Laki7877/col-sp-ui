<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Local Category']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="LocalCategoryCtrl" ng-init="init()" class="local-category-page">
		<div ng-show="alert.show" uib-alert template-url="common/alert" type="{{ alert.type }}" close="alert.close()">{{alert.message}}</div>
		<div class="page-header with-border">
		    <h1 class="float-left page-header-title">Local Category</h1>
		    <span class="float-right page-header-action">
		        <button type="button" class="btn-white btn margin-right-10" data-toggle="modal" data-target="#local-category-detail" ng-click="$emit('openEditLocalCategory')">
		          <span class="">Create Local Category</span>
		        </button>
		        <button type="button" class="btn-blue btn btn-width-xl" ng-click="$emit('saveLocalCategory')">
		          <span class="">Save Changes</span>
		        </button>
		    </span>
		</div>
		<div ng-if="categories.length > 0" class="local-category-section">
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
					Action	
				</span>
				<span class="col-xs-1 text-align-center">
					Move
				</span>
			</div>
			<div class="col-xs-12 no-padding" ui-tree max-depth="5">
				<ol class="sortable no-padding" ui-tree-nodes ng-model="categories">
					<li ng-repeat="node in categories" ui-tree-node ng-include="'local_category/nodes'"></li>
				</ol>	
			</div>
		</div>
		<div ng-if="categories.length == 0" class="local-category-empty-section margin-top-20">
			<span class="">
				<span class="zero-category-image">
				</span>
			</span>
			<span class="local-category-empty-text">You do not have local category</span>
		</div>
	<? $this->insert('components/modal-local-category', ['id' => 'local-category-detail', 'ng_model' => 'editingCategory']) ?>
	</div>
<?php $this->stop() ?>
