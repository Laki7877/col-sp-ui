
module.exports = function ($scope, $controller, CMSCollectionService, config) {
    'ngInject';
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/cms/collection',
            service: CMSCollectionService,
            item: 'CMSCollection',
            order: 'UpdateDate',
            id: 'CMSCollectionId',
            actions: ['View', 'Delete'],
            bulks: ['Delete', 'Show', 'Hide'],
            filters: [
				{ name: "All", value: 'All' },
				{ name: "Approved", value: 'Approved' },
				{ name: "Not Approved", value: 'NotApproved' },
				{ name: "Wait For Approved", value: 'WaitForApproved' },
				{ name: "Draft", value: 'Draft' }
            ]
        }
    });
    $scope.statusDropdown = config.PRODUCT_STATUS;
};
