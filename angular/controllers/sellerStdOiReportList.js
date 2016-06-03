
module.exports = function ($scope, $controller, StdOiReportService, config, util, $rootScope) {
    'ngInject';

    $scope.formData = [];

    var params = $scope.formData;

    $scope.exportCsv = function () {
        StdOiReportService.exportCsv(params)
        .then(function (data) {

            util.csv(data, 'STDOi.csv');

        })
    };

    $controller('AbstractListCtrl', {
        $scope: $scope,
        options: {
            url: '/reports/std/oi',
            service: StdOiReportService,
            item: 'OiReport',
            order: 'CommissionBySale',
            id: 'CommissionBySale',
            actions: ['View'],
        }
    });

};
