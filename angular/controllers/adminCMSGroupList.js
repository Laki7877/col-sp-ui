
module.exports = function ($scope, $controller, CMSGroupService, config) {
    'ngInject';
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/cms/group',
            service: CMSGroupService,
            item: 'CMSGroup',
            order: 'UpdateDate',
            id: 'CMSGroupId',
            actions: ['View', 'Delete'],
            bulks: ['Delete'],
            filters: [
				{ name: "All", value: 'All' },
				{ name: "Approved", value: 'Approved' },
				{ name: "Not Approved", value: 'NotApproved' },
				{ name: "Wait For Approved", value: 'WaitForApproved' },
				{ name: "Draft", value: 'Draft' }
            ]
        }
    });
    //$scope.statusDropdown = config.PRODUCT_STATUS;

};
