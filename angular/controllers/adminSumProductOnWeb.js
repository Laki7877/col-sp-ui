
module.exports = function ($scope, $controller, SumProductOnWebService, config, util) {
    'ngInject';
    $scope.formData = {
        category: null,
        seller: null,
        OrderDateFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
        OrderDateTo: new Date()
    };


    $scope.categorys = [];
    SumProductOnWebService.getAllCategory({})
                .then(function (data) {
                    $scope.categorys = data;
                });
    $scope.$watch('formData.GlobalCategoryId', function (newValue, oldValue) {
        if (newValue === undefined)
            return;
    });

    $scope.$watch('formData.SellerId', function (newValue, oldValue) {
        if (newValue === undefined)
            return;
    });

    var params = $scope.formData;

    $scope.search = function () {

        SumProductOnWebService.getProductOnWebReport(params)
        .then(function (data) {
            debugger;
            $scope.list = data
            //$scope.list.data.total($scope.list.data.length);
            $scope.list.reload();
        });

    };

    $scope.exportCsv = function () {
        //debugger;

        SumProductOnWebService.exportCsv(params)
        .then(function (data) {

            util.csv(data, 'SumProductOnWeb.csv');

        })
    };

    $scope.resetSearch = function () {
        $scope.categorys = [];
        $scope.formData.Seller = null;
        $scope.formData.OrderDateFrom = new Date(new Date().setDate(new Date().getDate() - 30));
        $scope.formData.OrderDateTo = new Date();
    };

    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/sum/ProductOnWeb',
            service: SumProductOnWebService,
            item: 'ProductOnWeb',
            order: 'Category',
            id: 'Category'


        }
    });


};
