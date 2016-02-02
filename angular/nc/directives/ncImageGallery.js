angular.module('nc')
	.directive('ncImageGallery', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				options: '=ncImageGalleryOptions'
			},
			template: $templateCache.get('common/ncImageGallery'),
			link: function(scope) {
				scope.options = _.defaults(scope.options, {});
				scope.model = _.defaults(scope.model, []);
				var length = scope.model.length;
				for(var i = 0; i < 10 - (length || 0); i++){
					console.log(scope.model, i);
					scope.model.push({
						ImageUrlEn: '/assets/img/placeholder-no-image.png'
					})
				}
			}
		}
	})