module.exports = function ($scope, $controller, Product, util, Alert, $window, $rootScope, config, storage) {
    'ngInject';
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/products',
            service: Product,
            item: 'Product',
            order: 'UpdatedDt',
            id: 'ProductId',
            actions: [
                'View',
                'Delete',
                'Duplicate'
            ],
            bulks: [
                'Delete',
                'Hide',
                'Show',
                {
                    name: 'Publish',
                    fn: function(arr) {
                        $scope.alert.close();
                        Product.bulkPublish(_.map(arr, function(e) {
                            return _.pick(e, ['ProductId']);
                        })).then(function() {
                            $scope.alert.success('Successfully published ' + arr.length + ' products')
                        }, function(resp) {
                            $scope.alert.error(common.getError(resp));
                        }).finally(function() {
                            $scope.reload();
                        });
                    },
                    confirmation: {
                        title: 'Confirm to publish',
                        message: 'Are you sure you want to publish {{model.length}} products?',
                        btnConfirm: 'Publish'
                    }
                }
            ],
            filters: [
                { name: "All", value: 'All' },
                { name: "Approved", value: 'Approved' },
                { name: 'Draft', value: 'Draft' },
                { name: "Not Approved", value: 'NotApproved' },
                { name: "Wait for Approval", value: 'WaitforApproval' }
            ]
        }
    });
    $scope.showOnOffStatus = {};
    $scope.showOnOffStatus.value = true;
    $scope.statusLookup = {};
    $scope.advanceSearchOptions.Admin = false;
    config.PRODUCT_STATUS.forEach(function(object){
       $scope.statusLookup[object.value] = object;
    });
    $scope.startExportProducts = function () {
        $scope.exporter = {
            progress: 10,
        	  title: 'Exporting...'
        };
        $("#export-product").modal('show');
    };
    $scope.confirmExportProducts = function(){
        $("#export-product").modal('hide');

        var arr = [];
        Object.keys($scope.checkBoxCache).forEach(function (m) {
            if (!$scope.checkBoxCache[m]) return;
            arr.push({
                ProductId: Number(m)
            });
        });

        if (arr.length == 0) return;


        var fileName = 'ProductExport-' + moment(new Date(), 'MM-DD-YYYY-HHmm') + ".csv";
        var a = document.getElementById("export_download_btn");

        var error = function (r) {
            $(".modal").modal('hide');
            $scope.exporter.title = 'Error'
            $scope.alert.error('Unable to Export Product');
            $scope.reloadData();
        };

        $scope.exporter.progress = 15;
        var blobs = [];

        var chunks = _.chunk(arr, 3);

        chunks.forEach(function(chunk){
            Product.export(chunk).then(function (result) {

                $scope.exporter.progress += (100/chunks);
                blobs.push(result);

                var file = new Blob(blobs, {type: 'application/csv'});
                var fileURL = URL.createObjectURL(file);

                $scope.exporter.href = fileURL;
                $scope.exporter.download = fileName;
                $scope.exporter.progress = 100;
                $scope.exporter.title = 'Export Complete'

                a.href = fileURL;

            }, error);
        });
    };
    $scope.asStatus = function (ab) {
        return $scope.statusLookup[ab];
    };
    $scope.exportSelected = function(){
      document.getElementById('exportForm').submit();
    };

    var fromImport = storage.get('import.success');
    if(!_.isNil(fromImport)) {
        storage.remove('import.success');
        $scope.alert.success(fromImport);
    }
};
