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
					if(_.isNull(image) || _isUndefined(image) || _isUndefined(image[scope.options.urlKey])) {
						//Empty
						return scope.options.emptyImg;
					} else if(image[scope.options.urlKey] && image[scope.options.urlKey].length == 0) {
						//Loading
						return scope.options.loaderImg;
					} else {
						return image[scope.options.urlKey];
					}
				};
				scope.call = function(action, image, model, $index) {
					if(_.isNull(image)) return;
					var index = model.indexOf(image);
					action.fn(image, model, index);
				}
				scope.load = function() {
					scope.images = _.clone(scope.model);
					for (var i = 0; i < size - scope.model.length; i++) {
						scope.images.push(null);
					};
				};
				scope.load();
				scope.$watch('model', scope.load);
			}
		};
	})
	.directive('ncImageDropzone', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				uploader: '=ncImageUploader',
				options: '=ncImageOptions',
				template: '=ncImageTemplate'
			},
			template: $templateCache.get('common/ncImageDropzone'),
			link: function(scope, element) {
				scope.template = _.defaults(scope.template, 'common/ncImageDropzoneTemplate');
				var input = element.find('input');
				scope.upload = function() {
					input.trigger('click');
				};
			}
		};
	})