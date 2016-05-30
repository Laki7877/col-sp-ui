module.exports = function($scope, $controller, AttributeSetService, AttributeService, config) {
	'ngInject';
	$scope.visibleOptions = config.DROPDOWN.VISIBLE_DROPDOWN;
	$scope.attributeOptions = [];
	$scope.tagOptions = [];
	$scope.lockAttributeset = function(i) {	
		return false;
	};
	$scope.tagTransform = function(newTag) {
		return {
			TagName: newTag,
			ValueEn: {
					match: function(i) {
					return newTag.match(i);
				}
			}
		};
	};
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'AttributeSetId',
			url: '/admin/attributesets',
			item: 'Attribute Set',
			service: AttributeSetService,
			init: function(scope) {
			}
		}
	});
	$scope.onSearch = function($search) {
		AttributeService.list({
			searchText: $search,
			_limit:  2147483647,
			_filter: 'NoDefaultAttribute'
		}).then(function(data) {
			$scope.attributeOptions = data.data;
		});
	}
}