<script type="text/ng-template" id="node_actions.html">
	<div><a href="#" data-toggle="modal" data-target="#local-category-detail" ng-click="$emit('openEditLocalCategory', node)">View / Edit</a></div>
	<div><a href="#" ng-click="">View Products</a></div>
	<div><a href="#" ng-click="">Delete</a></div>
</script>
<script type="text/ng-template" id="nodes_renderer.html">
	<div class="category-content row no-margin">
		<div class="category-content-padding">
			<span class="col-xs-8 column-lc-name">
				<span class="lc-icon-name-warpper">
					<i 	class ="fa toggle-button"
						ng-if="node.nodes && node.nodes.length > 0"
						ng-class="{	'fa-chevron-down' : !collapsed,
									'fa-chevron-right' : collapsed }"
						ng-click="toggle(this)"></i>
					<i  class = "fa fa-level-up fa-rotate-90 caret-grey"
						ng-if="(!node.nodes || node.nodes.length == 0) && $parentNodesScope.depth() != 0"></i>
					<span class="no-children-row"
						ng-if="$parentNodesScope.depth() == 0"></span>
					<span class="inline-block">{{ node.NameEn }}</span>
				</span>
			</span>
			<span class="col-xs-1">{{ node.ProductCount }}</span>
			<span class="col-xs-1 text-align-center">
				<i ng-class="{	'fa fa-eye color-dark-grey icon-size-20' : node.Status == 'VI',
								'fa fa-eye-slash color-grey icon-size-20' : node.Status != 'VI' }"></i>
			</span>
			<span class="col-xs-1 text-align-center">
				<i class="fa fa-gear color-dark-grey icon-size-20"></i>
				<i class="fa fa-caret-down color-dark-grey" uib-popover-template="'node_actions.html'" popover-placement="bottom" popover-append-to-body="true" popover-any></i>	
			</span>
			<span class="col-xs-1 text-align-center" ui-tree-handle>
				<i class="fa fa-arrows color-dark-grey icon-size-20"></i>
			</span>
		</div>
	</div>
	<ol ui-tree-nodes ng-model="node.nodes" ng-slide-toggle="!collapsed">
		<li ng-repeat="node in node.nodes" ui-tree-node ng-include="'nodes_renderer.html'"></li>
	</ol>	
</script>
