
module.exports = function ($scope, $controller, StdReportStockService, config, util) {
    'ngInject';
    $scope.formData = {
        Pid: null,
        ProductName: null,
        variant: null,
        LastSoldDateFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
        LastSoldDateTo: new Date()
    };


    var params = $scope.formData;

    $scope.search = function () {
        StdReportStockService.getStockReport(params)
        .then(function (data) {
            $scope.list.data = data;
        });

    };
    $scope.exportCsv = function () {
        debugger;
        StdReportStockService.exportCsv(params)
        .then(function (data) {

            util.csv(data, 'STDStock.csv');

        })
    };

    $scope.resetSearch = function () {
        $scope.formData.Pid = null;
        $scope.formData.ProductName = null;
        $scope.formData.variant = null;
        $scope.formData.LastSoldDateFrom = new Date(new Date().setDate(new Date().getDate() - 30));
        $scope.formData.LastSoldDateTo = new Date();
    };

    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/reports/std/stockstatus',
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
