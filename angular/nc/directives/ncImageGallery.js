angular.module('nc')
	.directive('ncImageGallery', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				option: '=ncImageGalleryOption'
			},
			template: $templateCache.get('common/ncImageGallery')
		}
	})