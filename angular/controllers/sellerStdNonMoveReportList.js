
module.exports = function ($scope, $controller, StdNonMoveReportService, config, util, $rootScope) {
    'ngInject';

    $scope.formData = {
        GlobalCategoryId: null,
    };

    $scope.categorys = [];
    StdNonMoveReportService.getAllCategory({})
      .then(function (data) {
        $scope.categorys = data;
    });
    $scope.$watch('formData.GlobalCategoryId', function (newValue, oldValue) {
      if (newValue === undefined)
        return;
    });

    var params = $scope.formData;

    $scope.search = function () {
        StdNonMoveReportService.getNonMoveReport(params)
        .then(function (data) {
            // debugger;
            $scope.list = data
            //$scope.list.data.total($scope.list.data.length);
            $scope.list.reload();
        });

    };

    $scope.exportCsv = function () {
      StdOiReportService.exportCsv(params)
      .then(function (data) {

        util.csv(data, 'STDNonMove.csv');

      })
    };

    $controller('AbstractListCtrl', {
        $scope: $scope,
        options: {
            url: '/reports/std/nonmove',
            service: StdNonMoveReportService,
            item: 'NonMoveReport',
            order: 'CategoryName',
            id: 'CategoryName',
            actions: ['View'],
        }
    });

};
