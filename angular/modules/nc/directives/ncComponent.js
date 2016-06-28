/**
 * Shop appearance components
 */
angular.module('nc')
	//text area component
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
					if(_.isEmpty(scope.source)) {
						scope.source = _.defaults(scope.source, {
							Enabled: true
						})
					}
				})
				// num of text area
				scope.$watch('size', function(d) {
					if(scope.source && !scope.source.Texts) {
						scope.source.Texts = [];
						for (var i = 0; i < d; i++) {
							scope.source.Texts.push({});
						};
					}
				})
			}
		}
	})
	//product layout component
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
				scope.src = {};
				scope.loading = false;
				//update product list
				scope.$watch('src.model', function(n, o) {
					if(_.isEmpty(scope.source)) {
						scope.source = _.defaults(scope.source, {
							Enabled: true,
						});		
					}
					if(!_.isNil(n)) {
						scope.source.Products = _.map(scope.src.model, function(e) {
							return e.Pid;
						});
					}
					console.log('products', scope.source.Products);
				}, true);
				//changed product list naming by querying endpoint
				scope.$watch('source', function(n, o) {
					if(_.isNil(scope.source)) {
						scope.source = _.defaults(scope.source, {
							Enabled: true
						});
					}
					if(scope.source.Products && scope.source.Products.length > 0) {
						if(scope.source.Products.length > 0) {
							scope.loading = true;
							Product.advanceList({
								_limit: scope.source.Products.length,
								Pids: scope.source.Products
							}).then(function(data) {
								scope.loading = false;
								scope.src.model = data.data;
							});
						}
					}
				});
			}
		}
	})
	// text with link components
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
					if(_.isEmpty(scope.source)) {
						scope.source = _.defaults(scope.source, {
							Enabled: true
						})
					}
				})
			}
		}
	})
	// image with links components
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
					if(_.isEmpty(scope.source)) {
						scope.source = _.defaults(scope.source, {
							Enabled: true
						})
					}
				});
				// acceptable file ext
				scope.accept = scope.accept || '.jpg,.jpeg';
				// validate by width height
				scope.validate = function(f,w,h,i) {
					if(scope.minWidth && scope.minWidth.length > i) {
						return w == scope.minWidth[i];
					}
					else if(scope.width && scope.width.length > i) {
						return w == scope.width[i] && h == scope.height[i];
					} else {
						return true;
					}
				}
				// num of images
				scope.$watch('size', function(d) {
					if(scope.source && !scope.source.Images) {
						scope.source.Images = [];
						for (var i = 0; i < d; i++) {
							scope.source.Images.push({
								ImageEn: {},
								ImageTh: {}
							});
						};
					}
				})
				// on upload
				scope.upload = function($file, image, $index, $ifile) {
					if($ifile.length > 0) {
						// check min width
						if(!_.isNil(scope.minWidth)) {
							scope.fail('ondimension', null, minWidth[$index], true);
						}
						else {
							scope.fail('ondimension', null, [width[$index], height[$index]]);
						}
					} else {
						//upload
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