
module.exports = function ($scope, $controller, CMSGroupService, config, $rootScope) {
    'ngInject';
    $scope.CMSview = !$rootScope.permit(61);  
    $scope.CMSadd = !$rootScope.permit(62);
    $scope.CMSedit = !$rootScope.permit(63);
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/cms/group',
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
