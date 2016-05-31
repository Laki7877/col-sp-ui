
module.exports = function ($scope,$rootScope, $controller, CMSGroupService, config) {
    'ngInject';
    $scope.adCMSview = !$rootScope.permit(23);  
    $scope.adCMSadd = !$rootScope.permit(24);
    $scope.adCMSedit = !$rootScope.permit(25);
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/cms/group',
            service: CMSGroupService,
            item: 'CMSGroup',
            order: 'UpdateOn',
            id: 'CMSGroupId',
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
    //$scope.statusDropdown = config.PRODUCT_STATUS;

};
