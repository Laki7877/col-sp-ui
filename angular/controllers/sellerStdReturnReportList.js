
module.exports = function ($scope, $controller, StdReportReturnService, config, util) {
    'ngInject';
    $scope.formData = {
        OrderId: null,
        PID: null,
        ItemName: null,
        ItemStatus: null,
        ReturnDateFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
        ReturnDateTo: new Date()
    };
    var params = $scope.formData;

    $scope.exportCsv = function () {
        StdReportReturnService.exportCsv(params)
        .then(function (data) {

            util.csv(data, 'STDReturn.csv');

        })
    };

    $scope.search = function () {
        StdReportSaleService.getReturnReport(params)
        .then(function (data) {
            $scope.list.data = data;
        });

    };


    $scope.resetSearch = function () {

        $scope.formData.OrderId = null;
        $scope.formData.PID = null;
        $scope.formData.ItemName = null;
        $scope.formData.ItemStatus = null;
        $scope.formData.ReturnDateFrom = new Date(new Date().setDate(new Date().getDate() - 30));
        $scope.formData.ReturnDateTo = new Date();

    };
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/reports/std/return',
            service: StdReportReturnService,
            item: 'ReturnReport',
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
