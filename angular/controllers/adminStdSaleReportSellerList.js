
module.exports = function ($scope, $controller, StdReportSaleService, config, util) {
    'ngInject';
    $scope.formData = {
        PID: null,
        Brands: null,
        ItemStatus: null,
        GlobalCategoryId: 0,
        BrandId: 0,
        CreatedDtFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
        CreatedDtTo: new Date()
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
            $scope.list.data = data;
        });

    };


    $scope.exportCsv = function () {
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
        $scope.formData.CreatedDtFrom = new Date(new Date().setDate(new Date().getDate() - 30));
        $scope.formData.CreatedDtTo = new Date();

    };

    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/reports/std/saleforseller',
            service: StdReportSaleService,
            item: 'SaleReportForSeller',
            order: 'PID',
            id: 'PID'


        }
    });

};
