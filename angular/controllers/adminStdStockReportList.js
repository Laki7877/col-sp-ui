
module.exports = function ($scope, $controller, StdReportStockService, config, util) {
    'ngInject';
    $scope.formData = {
        Pid: null,
        ProductName: null,
        variant: null,
        LastSoldDateFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
        LastSoldDateTo: new Date()
    };

    /*
    $scope.categorys = [];
    $scope.brands = [];
    StdReportSaleService.getAllCategory({})
                .then(function (data) {
                    $scope.categorys = data;
                });
    $scope.$watch('formData.GlobalCategoryId', function (newValue, oldValue) {
        if (newValue === undefined)
            return;
        // get brand by category id
        StdReportSaleService.getBrand(newValue)
                    .then(function (data) {
                        $scope.brands = data;
                    });

    });

    $scope.$watch('formData.BrandId', function (newValue, oldValue) {
        if (newValue === undefined)
            return;

    });
    */
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
