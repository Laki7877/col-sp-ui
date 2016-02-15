<script type="text/ng-template" id="nodes_renderer.html">
	<div class="category-content row no-margin">
		<div class="category-content-padding">
			<span class="col-xs-7 column-lc-name">
				<span class="lc-icon-name-warpper">
					<i 	class ="fa toggle-button"
						ng-if="node.nodes && node.nodes.length > 0"
						ng-class="{	'fa-chevron-down' : !collapsed,
									'fa-chevron-right' : collapsed }"
						ng-click="toggle(this)"></i>
					<i  class = "fa fa-chevron-right caret-grey"
						ng-if="(!node.nodes || node.nodes.length == 0) && $parentNodesScope.depth() != 0"></i>
					<span class="no-children-row"
						ng-if="$parentNodesScope.depth() == 0"></span>
					<span>{{ node.NameEn }}</span>
				</span>
			</span>
			<span class="col-xs-1">{{ node.CategoryId }}</span>
			<span class="col-xs-1">{{ node.ProductCount }}</span>
			<span class="col-xs-1 text-align-center">
				<i ng-class="{	'fa fa-eye color-dark-grey icon-size-20' : node.Status == 'VI',
								'fa fa-eye-slash color-grey icon-size-20' : node.Status != 'VI' }"></i>
			</span>
			<span class="col-xs-1 text-align-center">
				<i class="fa fa-gear color-dark-grey"></i>
				<i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
					<div><a href='#' data-toggle='modal' data-target='#modal-category-detail'>View / Edit</a></div>
					<div><a href='#'>View Products</a></div>
					<div><a href='#'>Delete</a></div>
					"></i>	
			</span>
			<span class="col-xs-1 text-align-center" ui-tree-handle>
				<i class="fa fa-arrows color-dark-grey"></i>
			</span>
		</div>
	</div>
	<ol ui-tree-nodes ng-model="node.nodes" ng-slide-toggle="!collapsed">
		<li ng-repeat="node in node.nodes" ui-tree-node ng-include="'nodes_renderer.html'"></li>
	</ol>	
</script>