
module.exports = function ($scope, $controller, StdReportStockService, config, util) {
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

            util.csv(data,'STDStock.csv');

        })
    };
        
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/reports/std/stockstatus',
            service: StdReportStockService,
            item: 'StockStatusReport',
            order: 'PID',
            id: 'PID',
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
