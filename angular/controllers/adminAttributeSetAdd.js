/**
 * Handle admin attribute set adding page
 */
module.exports = function($scope, $controller, AttributeSetService, AttributeService, config) {
	'ngInject';
	// dropdown
	$scope.visibleOptions = config.DROPDOWN.VISIBLE_DROPDOWN;
	$scope.attributeOptions = [];
	$scope.tagOptions = [];

	// if attribute set should be lock
	$scope.lockAttributeset = function(i) {	
		return false;
	};
	// change tag structure after keying
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
	// inherit from add ctrl
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
	//fetch attribute
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