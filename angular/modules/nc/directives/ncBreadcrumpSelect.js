/**
 * Breadcrumb select
 */
angular.module('nc')
	.directive('ncBreadcrumbSelect', function($templateCache, $filter, $timeout) {
		var _globalOptions = {};
		var encodedSeparator = '>>>>';
		//Construct list of selectable from tree structure
		function constructBreadcrumbFromTree(tree, breadcrumb, parentObj) {
			if(_.isUndefined(breadcrumb)) {
				breadcrumb = [];
			}
			if(_.isArray(tree) && tree.length > 0) {
				//each node children
				_.forEach(tree, function(item) {
					// html escape the name
					var encodedName = $filter('escapeHtml')(item[_globalOptions.nameKey]);
					// name with (id)
					var name = _.isUndefined(parentObj) ? encodedName + ' (' + (item[_globalOptions.idKey]) + ')' : parentObj.name + encodedSeparator + encodedName;
					// list obj
					var obj = {
						displayName: name,
						name: item[_globalOptions.nameKey],
						id: item[_globalOptions.idKey],
						item: item
					};
					breadcrumb.push(obj);
					//recursive processing
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
				name: '@name',
				placeholder: '@',
				disabled: '=ngDisabled',
				ngRequired: '='
			},
			template: $templateCache.get('common/ncBreadcrumbSelect'),
			link: function(scope, elem, attrs) {
				//searchable list
				scope.searchable = [];
				scope.model = {ptr: []}; //use ptr
				
				//available options
				scope.options = _.defaults(scope.options, {
					nameKey: 'NameEn',
					childrenKey: 'nodes',
					idKey: 'CategoryId',
					placeholder: '',
					limit: 10,
					tagCount: 5,
					seperator: ' <span class="fa fa-angle-right"></span> '
				});

				scope.$watch('options', function() {
					scope.options = _.defaults(scope.options, {
						nameKey: 'NameEn',
						childrenKey: 'nodes',
						idKey: 'CategoryId',
						placeholder: '',
						limit: 10,
						tagCount: 5,
						seperator: ' <span class="fa fa-angle-right"></span> '
					});
				})
				_globalOptions = scope.options;
				scope.encodedSeparator = encodedSeparator;

				// if list change, reorganize model
				scope.$watchCollection('model.ptr', function(newObj, oldObj) {
					scope.originalModel = [];

					// new list as model
					var newArr = _.compact(_.map(scope.model.ptr, 'item'));
					_.forEach(newArr, function(e) {
						scope.originalModel.push(e);
					});
				});

				// if model change, reorganize list
				scope.$watchCollection('originalModel', function(newObj, oldObj) {
					if(_.isUndefined(newObj)) {
						scope.originalModel = [];
					}
					if(_.isArray(scope.originalModel)) {
						scope.model.ptr = [];
						// new list by searching list for id
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

				// if original tree change, should reparse
				scope.$watchCollection('tree', function(newObj, oldObj) {
					//reparse tree
					scope.searchable = constructBreadcrumbFromTree(scope.tree, []);
					
					// make sure to fill list with model after parse
					if(_.isArray(scope.originalModel)) {
						scope.model.ptr = [];
						//recursive search
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
			}
		};
	})