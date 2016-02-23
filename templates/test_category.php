<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>
<?php $this->start('page-body') ?>
{{treeSelectModel}}
<div ng-controller="TestCtrl">
<style>
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
</style>
	<!-- Nested node template -->
<script type="text/ng-template" id="nodes_renderer.html">

  <div ui-tree-handle class="tree-node tree-node-content">
    <a class="btn btn-success btn-xs" ng-if="node.nodes && node.nodes.length > 0" data-nodrag ng-click="toggle(this)"><span
        class="glyphicon"
        ng-class="{
          'glyphicon-chevron-right': collapsed,
          'glyphicon-chevron-down': !collapsed
        }"></span></a>
    {{node.NameEn}}
    <a class="pull-right btn btn-danger btn-xs" data-nodrag ng-click="remove(this)"><span
        class="glyphicon glyphicon-remove"></span></a>
    <a class="pull-right btn btn-primary btn-xs" data-nodrag ng-click="newSubItem(this)" style="margin-right: 8px;"><span
        class="glyphicon glyphicon-plus"></span></a>
  </div>
  <ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">
    <li ng-repeat="node in node.nodes track by $index" ui-tree-node ng-include="'nodes_renderer.html'">
    </li>
  </ol>

</script>

	<div class="row">
	  <div class="col-sm-12">
	    <h3>Basic Example</h3>

	    <button ng-click="expandAll()">Expand all</button>
	    <button ng-click="collapseAll()">Collapse all</button>
	  </div>
	</div>

	<div class="row">
	  <div class="col-sm-6">
	    <div ui-tree id="tree-root">
	      <ol ui-tree-nodes ng-model="data">
	        <li ng-repeat="node in data track by $index" ui-tree-node ng-include="'nodes_renderer.html'"></li>
	      </ol>
	    </div>
	  </div>
	</div>
</div>

<?php $this->stop() ?>