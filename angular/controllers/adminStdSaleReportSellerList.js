
module.exports = function ($scope, $controller, StdReportSaleService, config) {
    'ngInject';
   $scope.formData = {
        PID: null,
        Brands: null,
        ItemStatus: null,
        CreatedDtFrom: null,
        CreatedDtTo: null
        };
    $scope.exportCsv = function() { 
        debugger;
        var params = $scope.formData;
        StdReportSaleService.exportCsv(params)
        .then(function(data){

            var csv = '';
            var headers = data.split('\n')[0];
            csv += headers;

            for (var i = 1; i < data.split('\n').length; i++) {
                var row = data.split('\n')[i];
                csv += row;
            }

            var filename, link;

            filename = 'STDSale.csv';

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
            url: '/admin/reports/std/saleforseller',
            service: StdReportSaleService,
            item: 'SaleReportForSeller',
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
