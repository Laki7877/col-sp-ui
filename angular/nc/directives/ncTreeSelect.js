angular.module('nc')
	.directive('ncTreeSelect', function($interpolate, $templateCache) {
		/**
		 * Hold data for column object
		 */
		function Column() {
			this.__list = [];
			this.__active = -1;

			/**
			 * Get or set array of child object
			 *
			 * @param  {Array} list Set children to this if passed
			 * @return {Array}      Array of child
			 */
			this.list = function(list) {
				return _.isUndefined(list) ? this.__list : (this.__list = list);
			};

			/**
			 * Get or set active index for this column
			 *
			 * @param  {Number} active Set active index to this if passed
			 * @return {Number}        Active index, -1 if none
			 */
			this.active = function(active) {
				return _.isUndefined(active) ? this.__active : (this.__active = active);
			};
		};

		/**
		 * Collection of Column object
		 * @param {Array} tree Root nested tree
		 * @param {Number} size Number of columns
		 * @param {Object} options Extra params
		 */
		function Columns(tree, size, options) {
			/**
			 * Declare extra options for this class
			 */
			options = _.extend({
				childrenKey: 'nodes',
				parentKey: 'parent'
			}, options);

			var childrenKey = options.childrenKey;
			var parentKey = options.parentKey;

			/**
			 * Get columns as array of Column
			 *
			 * @return {Array} Array of Column object
			 */
			this.list = function() {
				return this.columns;
			};

			/**
			 * Clear all columns to default empty
			 *
			 * @param  {Boolean} activeOnly If only active flag is clear
			 */
			this.clear = function(activeOnly) {
				// Initialize empty
				for (var i = 0; i < this.columns.length; i++) {
					if(_.isUndefined(activeOnly) || !activeOnly) {
						this.columns[i].list([]);
					}
					this.columns[i].active(-1);
				};
			};

			/**
			 * Clear all columns and set first to tree
			 */
			this.clearToDefault = function() {
				this.clear();
				this.columns[0].list(this.__tree);
			};

			/**
			 * [select description]
			 * @param  {[type]} item [description]
			 * @return {[type]}      [description]
			 */
			this.select = function(item) {

				// Not an item or null
				if(_.isNil(item)) {
					// Select nothing
					this.clear(true);
					return;
				}

				/* Traverse and get all array of item to be pushed into display columns */
				var collection = [];
				var ctx = item;

				//Push leaf if any
				if(!_.isEmpty(ctx[childrenKey])) {
					collection.push({
						list: ctx[childrenKey],
						active: -1
					})
				}

				while(!_.isUndefined(ctx[parentKey])) {
					//Bubble up the tree
					collection.push({
						list: ctx[parentKey][childrenKey],
						active: _.indexOf(ctx[parentKey][childrenKey], ctx)
					});
					ctx = ctx[parentKey];
				}

				// Make sure this item is descendent of the tree
				var index = _.indexOf(this.__tree, ctx);

				if(index >= 0) {
					// Push root
					collection.push({
						list: this.__tree,
						active: index
					});

					// Assign to column
					for (var i = 0; i < this.__size; i++) {
						if(collection.length > 0) {
							// Assign collection to display list
							var col = collection.pop();
							this.columns[i].list(col.list);
							this.columns[i].active(col.active);
						} else {
							// No more children
							this.columns[i].list([]);
							this.columns[i].active(-1);
						}
					}
				} else {
					// Select nothing
					this.clearToDefault();
				}
			};


			/* Class main
			 ------------------------------- */
			this.columns = [];
			for (var i = 0; i < size; i++) {
			 	this.columns.push(new Column());
			};
			this.columns[0].list(tree);
			this.__tree = tree;
			this.__size = size;

		};

		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				tree: '=ncTreeSelectTree',
				title: '@ncTreeSelectTitle',
				options: '=?ncTreeSelectOptions'
			},
			template: $templateCache.get('common/ncTreeSelect'),
			link: function(scope, element, attrs) {
				// Directive options
				scope.options = _.defaults(scope.options, {
					columnSize: 4,
					contentTemplate: '{{$item.NameEn}}' //basic tree item
				});
				scope.columns = new Columns(scope.tree, scope.options.columnSize);

				// Watch for tree change
 				scope.$watch('tree', function(newObj, oldObj) {
 					var arr = newObj;
					if(_.isArray(arr)) {
						// Recreate container from arr
						scope.columns = new Columns(arr, scope.options.columnSize);
						scope.columns.select(scope.model);
					}
				});

				// Watch for model change
				scope.$watch('model', function(newObj, oldObj) {
					if(newObj != oldObj) {
						scope.columns.select(scope.model);
					}
				});

				scope.setModel = function(item) {
					scope.model = item;
				};

				scope.getContent = function(item) {
					return $interpolate(scope.options.contentTemplate)({$item: item});
				};
			},
			controller: function($scope) {
				this.setHeader = function(html) {
					$scope.header = html;
				};
				this.setFooter = function(html) {
					$scope.footer = html;
				};
			}
		};
	});
