angular.module('nc')
	.directive('ncImageGallery', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				model: '=ncModel',
			},
			template: $templateCache.get('common/ncImageGallery'),
			controller: function($scope) {
				this.getModel = function() {
					return $scope.model;
				}
			}
		};
	})
	.directive('ncImage', function($templateCache) {
		return {
			require: '^ncImageGallery',
			restrict: 'E',
			replace: true,
			scope: {
				model: 'ncModel',
				actions: 'ncImageActions',
				options: 'ncImageOptions'
			},
			link: function(scope, element, attrs, parent) {
				scope.parent = parent.getModel();
			}
		};
	})
	.directive('ncImageDropzoneInline', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				uploader: '=ncImageUploader',
				options: '=ncImageOptions'
			},
			template: $templateCache.get('common/ncImageDropzoneInline'),
			link: function(scope, element) {
				var input = element.find('input');
				scope.upload = function() {
					input.trigger('click');
				};
			}
		};
	});