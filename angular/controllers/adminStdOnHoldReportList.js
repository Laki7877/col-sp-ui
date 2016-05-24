
module.exports = function ($scope, $controller, StdReportOnHoldService, config, util) {
    'ngInject';
    $scope.formData = {
        PID: null,
        Brands: null,
        ItemStatus: null,
        CreatedDtFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
        CreatedDtTo: new Date()
        };

    $scope.exportCsv = function() { 
        debugger;

        var params = $scope.formData;
        StdReportStockService.exportCsv(params)
        .then(function(data){

            util.csv(data,'STDOnHold.csv');

        })
    };

    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/reports/std/onhold',
            service: StdReportOnHoldService,
            item: 'OnHoldReport',
            order: 'OrderId',
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
