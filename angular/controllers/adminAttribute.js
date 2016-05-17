module.exports = function($scope, $controller, AttributeService, config) {
	'ngInject';
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/attributes',
			service: AttributeService,
			item: 'Attribute',
			order: 'UpdatedDt',
			id: 'AttributeId',
			actions: ['View', 'Delete'],
			bulks: ['Delete'],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Free Text", value: 'FreeText'},
				{ name: "Dropdown", value: 'Dropdown'},
				{ name: "HTML Box", value: 'HTMLBox'},
				{ name: "Default Attribute", value: 'DefaultAttribute'},
				{ name: "Allow Variation", value: 'HasVariation'}
			]
		}
	});
	$scope.yesNoDropdown = config.DROPDOWN.YES_NO_DROPDOWN;
	$scope.dataTypeDropdown = config.DROPDOWN.DATA_TYPE_DROPDOWN;
}
