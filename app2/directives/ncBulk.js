angular.module('app')
	.directive('ncBulk', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			template: $templateCache.get('common/ncBulk'),
			scope: {
				options: '=ncBulkOptions'
			},

		}
	})
	.directive('ncBulkCheckAll', function() {
		return {
			restrict: 'A',
			scope: ''
		}
	})
	.directive('ncBulkCheck', function() {
		return {
			restrict: 'A'

		}
	})