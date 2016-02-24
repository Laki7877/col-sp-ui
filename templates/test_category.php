<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>
<?php $this->start('page-body') ?>
{{treeSelectModel}}
<div ng-controller="TestCtrl">
<style>
	/* Source */
	.angular-ui-tree {
	}

	.angular-ui-tree-empty {
		border: 1px dashed #bbb;
		min-height: 100px;
		background-color: #e5e5e5;
		background-image: -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);
		background-image: -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);
		background-image: linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);
		background-size: 60px 60px;
		background-position: 0 0, 30px 30px;
	}

	.angular-ui-tree-nodes {
		position: relative;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.angular-ui-tree-nodes .angular-ui-tree-nodes {
		padding-left: 20px;
	}

	.angular-ui-tree-node, .angular-ui-tree-placeholder {
		position: relative;
		margin: 0;
		padding: 0;
		min-height: 20px;
		line-height: 20px;
	}

	.angular-ui-tree-hidden {
		display: none;
	}

	.angular-ui-tree-placeholder {
		margin: 5px 0;
		padding: 0;
		min-height: 30px;
	}

	.angular-ui-tree-handle {
		cursor: move;
		text-decoration: none;
		font-weight: bold;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		min-height: 20px;
		line-height: 20px;
	}

	.angular-ui-tree-drag {
		position: absolute;
		pointer-events: none;
		z-index: 999;
		opacity: .8;
	}
	/* More Style */
	ol {
		list-style: none;
	}
	.btn {
	    margin-right: 8px;
	}

	.angular-ui-tree-handle {
	    background: #f8faff;
	    border: 1px solid #dae2ea;
	    color: #7c9eb2;
	    padding: 10px 10px;
	}

	.angular-ui-tree-handle:hover {
	    color: #438eb9;
	    background: #f4f6f7;
	    border-color: #dce2e8;
	}

	.angular-ui-tree-placeholder {
	    background: #f0f9ff;
	    border: 2px dashed #bed2db;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	}

	tr.angular-ui-tree-empty {
	    height:100px
	}

	.group-title {
	    background-color: #687074 !important;
	    color: #FFF !important;
	}


	/* --- Tree --- */
	.tree-node {
	    border: 1px solid #dae2ea;
	    background: #f8faff;
	    color: #7c9eb2;
	}

	.nodrop {
	    background-color: #f2dede;
	}

	.tree-node-content {
	    margin: 10px;
	}
	.tree-handle {
	    padding: 10px;
	    background: #428bca;
	    color: #FFF;
	    margin-right: 10px;
	}

	.angular-ui-tree-handle:hover {
	}

	.angular-ui-tree-placeholder {
	    background: #f0f9ff;
	    border: 2px dashed #bed2db;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	}

	 /*-- New Style --*/
	 .angular-ui-tree {
		 margin: 0px -10px;
	 }
	 .angular-ui-tree-nodes .angular-ui-tree-nodes {
    	padding-left: 40px;
	 }
	 .angular-ui-tree-handle{
		 padding: 5px 10px;
	 }
		.category-column-header{
			margin-top: 30px;
			padding: 5px 25px 5px 10px;
			background: #EDF2F9;
			border: 1px solid #BCC7D5;
			border-radius: 2px;
		}
	 .category-column{
		 text-align: center;
		 width: 100px;
	 }
	 .action-gear{
		 width: 40px;
	 }
	 .btn-collapse{
		 color: #4891d2;
		 margin-right: 3px;
	 }
	 .btn-collapse:hover{
		 color: #4891d2;
	 }
	 .tree-node {
		 	font-weight: normal;
    	border: 1px solid #EDF2F9;
			border-radius: 2px;
    	background: #ffffff;
    	color: #32343C;
		}
		.tree-node-content {
    	margin: 5px 10px;
		}
		.angular-ui-tree-drag {
			 border: 0px !important;
		 }
		.angular-ui-tree-drag .tree-node-content {
     	margin: 0px;
 		}

</style>
	<!-- Nested node template -->
<script type="text/ng-template" id="nodes_renderer.html">

  <div ui-tree-handle class="tree-node tree-node-content">
    <a class="btn-collapse" ng-if="node.nodes && node.nodes.length > 0" data-nodrag ng-click="toggle(this)">
			<span class="glyphicon" ng-class="{'glyphicon-chevron-right': collapsed,'glyphicon-chevron-down': !collapsed }"></span>
		</a>
    <a href="#">
			{{node.NameEn}}
		</a>
		<span class="pull-right category-column action-gear" data-nodrag="">
			<nc-action nc-model="$nodeScope" nc-action-fn="actions" class="ng-isolate-scope">
				<a href="javascript:;" uib-popover-template="'common/ncActionPopover'" popover-placement="bottom" popover-append-to-body="true" popover-trigger="outsideClick">
					<i class="fa fa-gear color-dark-grey icon-size-20"></i> <i class="fa fa-caret-down color-dark-grey"></i>
				</a>
			</nc-action>
		</span>
		<span class="pull-right category-column" data-nodrag="">
			<nc-eye nc-model="node.Visibility" nc-eye-on-toggle="toggleVisibility(node)" class="ng-isolate-scope">
				<a ng-click="_toggle()"><i ng-class="{'fa fa-eye-slash color-grey eye-icon' : !model,'fa fa-eye color-dark-grey eye-icon' : model}" class="fa fa-eye color-dark-grey eye-icon"></i></a>
			</nc-eye>
		</span>
		<span class="pull-right category-column ng-binding">2</span>
		<span class="pull-right category-column ng-binding">4</span>
		<span class="pull-right category-column ng-binding">LT</span>
  </div>
  <ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">
    <li ng-repeat="node in node.nodes track by $index" ui-tree-node ng-include="'nodes_renderer.html'">
    </li>
  </ol>

</script>


	<div class="page-header with-border">
			<h1 class="float-left page-header-title">
				<span>Global Category</span>
				<span ng-show="!saving &amp;&amp; pristine" class="margin-left-10 ng-hide"><small>All changes were saved</small></span>
			<span ng-show="saving &amp;&amp; pristine" class="margin-left-10 ng-isolate-scope ng-hide" nc-loading-small="Saving..." style="display: inline-block; margin-bottom: -20px; margin-top: -5px;"><img src="/assets/img/loader.gif" width="40"><small class="ng-binding">Saving...</small></span>
			</h1>
	</div>

	<!--
	<div class="row">
	  <div class="col-sm-12">
	    <h3>Global Category</h3>
	    <button ng-click="expandAll()">Expand all</button>
	    <button ng-click="collapseAll()">Collapse all</button>
	  </div>
		<hr>
	</div>
	-->
	<div class="row">
		<div class="col-sm-12">
			<div class="category-column-header">
				Category Name
				<span class="pull-right category-column action-gear">
					Action
				</span>
				<span class="pull-right category-column" data-nodrag="">
					Visible
				</span>
				<span class="pull-right category-column ng-binding">
					Attribute Sets
				</span>
				<span class="pull-right category-column ng-binding">
					Products
				</span>
				<span class="pull-right category-column ng-binding">
					ID
				</span>
			</div>
		</div>
	</div>

	<div class="row">
	  <div class="col-sm-12">
	    <div ui-tree id="tree-root">
	      <ol ui-tree-nodes ng-model="data">
	        <li ng-repeat="node in data track by $index" ui-tree-node ng-include="'nodes_renderer.html'"></li>
	      </ol>
	    </div>
	  </div>
	</div>
</div>

<?php $this->stop() ?>
