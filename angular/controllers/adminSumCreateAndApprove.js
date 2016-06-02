
module.exports = function ($scope, $controller, SumCreateAndApproveService, config, util) {
    'ngInject';
    $scope.formData = {
        category: null,
        seller: null,
        OrderDateFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
        OrderDateTo: new Date()
    };


    $scope.categorys = [];
    SumCreateAndApproveService.getAllCategory({})
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

        SumCreateAndApproveService.getCreateAndApproveReport(params)
        .then(function (data) {
            debugger;
            $scope.list = data
            //$scope.list.data.total($scope.list.data.length);
            $scope.list.reload();
        });

    };

    $scope.exportCsv = function () {
        //debugger;

        SumCreateAndApproveService.exportCsv(params)
        .then(function (data) {

            util.csv(data, 'SumCreateAndApprove.csv');

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
            url: '/admin/sum/createandapprove',
            service: SumCreateAndApproveService,
            item: 'CreateAndApprove',
            order: 'Category',
            id: 'Category'


        }
    });


};
