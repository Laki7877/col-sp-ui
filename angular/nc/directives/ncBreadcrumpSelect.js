angular.module('nc')
	.directive('ncBreadcrumbSelect', function($templateCache, $filter, $timeout) {
		var _globalOptions = {};
		var encodedSeparator = '>>>>';
		function constructBreadcrumbFromTree(tree, breadcrumb, parentObj) {
			if(_.isUndefined(breadcrumb)) {
				breadcrumb = [];
			}
			if(_.isArray(tree) && tree.length > 0) {
				_.forEach(tree, function(item) {
					var encodedName = $filter('escapeHtml')(item[_globalOptions.nameKey]);
					var name = _.isUndefined(parentObj) ? encodedName : parentObj.name + encodedSeparator + encodedName;
					var obj = {
						displayName: name,
						name: item[_globalOptions.nameKey],
						id: item[_globalOptions.idKey],
						item: item
					};
					breadcrumb.push(obj);
					breadcrumb 	= constructBreadcrumbFromTree(item[_globalOptions.childrenKey], breadcrumb, obj);
				});
			}
			return breadcrumb;		
		};
		return {
			restrict: 'E',
			scope: {
				originalModel: '=ncModel',
				tree: '=ncBreadcrumbSelectTree',
				options: '=?ncBreadcrumbSelectOptions',
				name: '@name'
			},
			template: $templateCache.get('common/ncBreadcrumbSelect'),
			link: function(scope) {
				scope.searchable = [];
				scope.model = {ptr: []};
				scope.options = _.defaults(scope.options, {
					nameKey: 'NameEn',
					childrenKey: 'nodes',
					idKey: 'CategoryId',
					placeholder: '',
					limit: 10,
					tagCount: 5,
					seperator: ' <span class="fa fa-angle-right"></span> '
				});
				_globalOptions = scope.options;
				scope.encodedSeparator = encodedSeparator;
				scope.$watchCollection('model.ptr', function(newObj, oldObj) {
					scope.originalModel = [];
					var newArr = _.compact(_.map(scope.model.ptr, 'item'));
					_.forEach(newArr, function(e) {
						scope.originalModel.push(e);
					});
				});
				scope.$watchCollection('originalModel', function(newObj, oldObj) {
					if(newObj == oldObj) return;
					if(_.isArray(newObj)) {
						scope.model.ptr = [];
						_.forEach(scope.originalModel, function(e) {
							var search = { item: {} };
							search['item'][scope.options.idKey] = e[scope.options.idKey];
							var found = _.find(scope.searchable, search);
							if(_.isObject(found)) {
								scope.model.ptr.push(found);
							}
						});
					}
				});
				scope.$watch('tree', function(newObj, oldObj) {
					if(newObj != oldObj) {
						scope.searchable = constructBreadcrumbFromTree(scope.tree, []);
					}
				});
			}
		};
	})