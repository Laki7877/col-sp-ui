angular.module('nc')
	.directive('ncTextareas', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				source: '=',
				title: '@',
				letter: '@',
				size: '@'
			},
			template: $templateCache.get('common/ncTextareas'),
			link: function(scope) {
				scope.$watch('source', function() {
					if(!scope.source) {
						scope.source = _.defaults(scope.source, {
							Enabled: true
						})
					}
				})
				scope.$watch('size', function(d) {
					if(!_.isNil(d)) {
						scope.source.Texts = [];
						for (var i = 0; i < d; i++) {
							scope.source.Texts.push({});
						};
					}
				})
			}
		}
	})
	.directive('ncProductLayout', function($templateCache, Product) {
		return {
			restrict: 'E',
			scope: {
				source: '=',
				products: '=',
				refresh: '=',
				title: '@',
				letter: '@',
				letterx: '@?',
				subtitle: '@?'
			},
			template: $templateCache.get('common/ncProductLayout'),
			link: function(scope) {
				scope.$watch('source', function(n, o) {
					console.log(scope.source);
					if(!scope.source) {
						scope.source = _.defaults(scope.source, {
							Enabled: true
						})
					}
					else {
						if(scope.source.Products && scope.source.Products.length > 0) {
							_.remove(scope.source.Products, _.isEmpty);
							if(scope.source.Products.length > 0 && scope.source.Products[0]) {
								Product.advanceList({
									_limit: scope.source.Products.length,
									Pids: scope.source.Products
								}).then(function(data) {
									scope.source.Products = _.map(scope.source.Products, function(e) {
										e = _.find(data.data, function(d) {
											return d.Pid == e;
										});
										return e;
									});
									scope.source.Products = _.compact(scope.source.Products);
								});
							}
						}
					}
				})
			}
		}
	})
	.directive('ncTextLink', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				source: '=',
				title: '@',
				letter: '@',
				letterx: '@'
			},
			template: $templateCache.get('common/ncTextLink'),
			link: function(scope) {
				scope.$watch('source', function() {
					if(!scope.source) {
						scope.source = _.defaults(scope.source, {
							Enabled: true
						})
					}
				})
			}
		}
	})
	.directive('ncImageLinks', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				source: '=',
				title: '@',
				letter: '@',
				uploader: '=', //return promise
				fail: '=',
				size: '@',
				notitle: '@?',
				width: '=?',
				height: '=?',
				minWidth: '=?',
				accept: '=?'
			},
			template: $templateCache.get('common/ncImageLinks'),
			link: function(scope) {
				scope.$watch('source', function() {
					if(!scope.source) {
						scope.source = _.defaults(scope.source, {
							Enabled: true
						})
					}
				});
				scope.accept = scope.accept || '.jpg,.jpeg';
				scope.validate = function(f,w,h,i) {
					if(scope.minWidth && scope.minWidth.length > i) {
						return w > scope.minWidth;
					}
					else if(scope.width && scope.width.length > i) {
						return w == scope.width[i] && h == scope.height[i];
					} else {
						return true;
					}
				}
				scope.$watch('size', function(d) {
					if(!_.isNil(d)) {
						scope.source.Images = [];
						for (var i = 0; i < d; i++) {
							scope.source.Images.push({
								ImageEn: {},
								ImageTh: {}
							});
						};
					}
				})
				scope.upload = function($file, image, $index, $ifile) {
					if($ifile.length > 0) {
						if(!_.isNil(scope.minWidth)) {
							scope.fail('ondimension', null, minWidth[$index], true);
						}
						else {
							scope.fail('ondimension', null, [width[$index], height[$index]]);
						}
					} else {
						scope.uploader.upload($file).then(function(data) {
							image = _.extend(image, data.data);
						}, function(err) {
							scope.fail(err);
						});
					}
				}
			}
		}
	});