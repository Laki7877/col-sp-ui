
module.exports = function ($scope, $controller, StdReportOnHoldService, config, util) {
    'ngInject';
    $scope.formData = {
        PID: null,
        ItemName: null,
        OrderDateFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
        OrderDateTo: new Date()
    };

    var params = $scope.formData;

    $scope.search = function () {
        StdReportStockService.getStockReport(params)
        .then(function (data) {
            $scope.list.data = data;
        });

    };
    $scope.exportCsv = function () {
        StdReportOnHoldService.exportCsv(params)
        .then(function (data) {

            util.csv(data, 'STDOnHold.csv');

        })
    };

    $scope.resetSearch = function () {
        $scope.formData.PID = null;
        $scope.formData.ItemName = null;
        $scope.formData.OrderDateFrom = new Date(new Date().setDate(new Date().getDate() - 30));
        $scope.formData.OrderDateTo = new Date();

    };

    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/reports/std/onhold',
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
