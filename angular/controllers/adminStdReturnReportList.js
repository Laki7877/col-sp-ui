
module.exports = function ($scope, $controller, StdReportReturnService, config) {
    'ngInject';

    $scope.exportCsv = function() { 
        debugger;
        var params = {};
        StdReportReturnService.exportCsv(params)
        .then(function(data){

            var csv = '';
            var headers = data.split('\n')[0];
            csv += headers;

            for (var i = 1; i < data.split('\n').length; i++) {
                var row = data.split('\n')[i];
                csv += row;
            }

            var filename, link;

            filename = 'STDReturn.csv';

            link = document.createElement('a');
            link.setAttribute('href', 'data:attachment/csv,' + encodeURIComponent(csv));
            link.setAttribute('download', filename);
            link.click();

            //debugger;
            // var blob = new Blob([document.getElementById('report-std-tab-content').innerHTML], {
            //     type: "vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            // });
            // saveAs(blob, "Report.xls");
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
