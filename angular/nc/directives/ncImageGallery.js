angular.module('nc')
	.directive('ncImageGallery', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				model: '=ncModel',
				options: '=ncImageGalleryOptions'
			},
			template: $templateCache.get('common/ncImageGallery'),
			link: function(scope) {
				scope.options = _.defaults(scope.options, {
					actions: [],
					size: 10, //max size of gallery
					urlKey: 'url', //image[urlKey] to get src
					loaderImg: '/assets/img/loader.gif', //when image[urlKey] = ''
					emptyImg: '/assets/img/placeholder-no-image.png' //when image = null 
				});
				scope.getSrc = function(image) {
					if(_.isNull(image) || _.isUndefined(image) || _.isUndefined(image[scope.options.urlKey])) {
						//Empty
						return scope.options.emptyImg;
					} else if(image[scope.options.urlKey] && image[scope.options.urlKey].length == 0) {
						//Loading
					return scope.options.loaderImg;
					} else {
						return image[scope.options.urlKey];
					}
				};
				scope.call = function(action, image) {
					if(_.isNull(image)) return;
					var index = scope.model.indexOf(image);
					action.fn(image, scope.model, index);
				}
				scope.load = function() {
					scope.images = _.clone(scope.model);
					for (var i = 0; i < scope.options.size - scope.model.length; i++) {
						scope.images.push(null);
					};
				};
				scope.load();
				scope.$watch('model', scope.load);
			}
		};
	})
	.directive('ncImageDropzone', function($templateCache, $compile, FileUploader) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				uploader: '=ncImageUploader',
				options: '=ncImageOptions',
				template: '@ncImageTemplate'
			},
			link: function(scope, element) {
				scope.uploader = new FileUploader();
				scope.template = scope.template || 'common/ncImageDropzoneTemplate';

				scope.update = function() {
					console.log(scope.template);
					var html = $templateCache.get(scope.template);
					scope.input = element.find('input');
					element.html(html);
					$compile(element.contents())(scope);
				}
	
				scope.upload = function() {
					scope.input.trigger('click');
				};

				scope.update();
				scope.$watch('template', scope.update);
			}
		};
	})