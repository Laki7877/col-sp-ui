/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Handles attribute listing
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.admin')
	.controller('AdminAttributeListCtrl', function($scope, $controller, AttributeService, config) {
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
					{ name: "Allow Variation", value: 'HasVariation'},
					{ name: "Do Not Allow Variation", value: 'NoVariation'}
				]
			}
		});
		console.log($scope);
		$scope.yesNoDropdown = config.DROPDOWN.YES_NO_DROPDOWN;
		$scope.dataTypeDropdown = config.DROPDOWN.DATA_TYPE_DROPDOWN;
	});