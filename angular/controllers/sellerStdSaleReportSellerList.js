
module.exports = function ($scope, $controller, StdReportSaleService, config, util) {
    'ngInject';
    $scope.formData = {
        PID: null,
        Brands: null,
        ItemStatus: null,
        GlobalCategoryId: null,
        BrandId: null,
        OrderDateFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
        OrderDateTo: new Date()
    };


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

    var params = $scope.formData;

    $scope.search = function () {
        StdReportSaleService.getSaleReport(params)
        .then(function (data) {
            debugger;
            $scope.list = data
            //$scope.list.data.total($scope.list.data.length);
            $scope.list.reload();
        });

    };


    $scope.exportCsv = function () {
        //debugger;

        StdReportSaleService.exportCsv(params)
        .then(function (data) {

            util.csv(data, 'STDSale.csv');

        })
    };

    $scope.resetSearch = function () {
        $scope.categorys = [];
        $scope.brands = [];
        $scope.formData.PID = null;
        $scope.formData.Brands = null;
        $scope.formData.ItemStatus = null;
        $scope.formData.OrderDateFrom = new Date(new Date().setDate(new Date().getDate() - 30));
        $scope.formData.OrderDateTo = new Date();

    };

    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/reports/std/saleforseller',
            service: StdReportSaleService,
            item: 'SaleReportForSeller',
            order: 'PID',
            id: 'PID'


        }
    });

};
