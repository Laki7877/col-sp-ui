
module.exports = function ($scope, $controller, CMSCategoryService, config, util) {
    'ngInject';
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/cms/category',
            service: CMSCategoryService,
            item: 'CMSCategory',
            order: 'UpdateOn',
            id: 'CMSCategoryId',
            actions: ['View', 'Delete'],
            bulks: [
                'Delete',
                'Show',
                'Hide'
            ],
            filters: [
				{ name: "All", value: 'All' },
                { name: "Approved", value: 'Approved' },
                { name: "Not Approved", value: 'NotApproved' },
                { name: "Wait for Approval", value: 'WaitforApproval' }
            ]
        }
    });
    //$scope.statusDropdown = config.PRODUCT_STATUS;

};
