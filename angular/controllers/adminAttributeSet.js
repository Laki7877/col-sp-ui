/**
 * Handle admin attribute set listing page
 */
module.exports = function($scope, $controller, AttributeSetService, util, config) {
	'ngInject';
	//inherit from listing ctrl
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/attributesets',
			service: AttributeSetService,
			item: 'Attribute Set',
			order: 'UpdatedDt',
			id: 'AttributeSetId',
			actions: ['View', 'Delete'],
			bulks: ['Delete'],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Visible", value: 'Visible'},
				{ name: "Not Visible", value: 'NotVisible'}
			]
		}
	});
}