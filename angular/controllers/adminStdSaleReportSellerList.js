
module.exports = function ($scope, $controller, CMSGroupService, config) {
    'ngInject';
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/reports/std/saleforseller',
            service: CMSGroupService,
            item: 'SaleReportForSeller',
            order: 'OrderDate',
            id: 'OrderId',
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

};
