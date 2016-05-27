
module.exports = function ($scope, $controller, StdReportReturnService, config, util) {
    'ngInject';
    $scope.formData = {
        PID: null,
        Brands: null,
        ItemStatus: null,
        CreatedDtFrom: new Date(new Date().setDate(new Date().getDate() - 30)),
        CreatedDtTo: new Date()
        };

    $scope.exportCsv = function() { 
        debugger;

        var params = $scope.formData;
        StdReportReturnService.exportCsv(params)
        .then(function(data){

            util.csv(data,'STDReturn.csv');

        })
    };

    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/reports/std/return',
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
