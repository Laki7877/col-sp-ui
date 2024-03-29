/**
 * Handle product images
 */
module.exports = function($scope, $controller, common, Product, util, $window, $rootScope, config, storage, $base64, $timeout) {
    'ngInject';
    // inherit from advance listing
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
                'Show', {
                    //publish product
                    name: 'Publish',
                    fn: function(arr, cb) {
                        $scope.alert.close();

                        if (arr.length == 0) {
                            $scope.alert.error('Unable to Publish. Please select Product for this action.');
                            return;
                        }
                        // send only pid
                        Product.bulkPublish(_.map(arr, function(e) {
                            return _.pick(e, ['ProductId']);
                        })).then(function() {
                            cb();
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
                        btnConfirm: 'Publish',
                        btnClass: 'btn-green'
                    }
                }, {
                    //Add tag to product
                    name: 'Add Tags',
                    fn: function(add, cb, r) {
                        $scope.alert.close();
                        Product.addTags(r).then(function() {
                            cb();
                            $scope.alert.success('Successfully add tags for ' + add.length + ' products')
                        }, function(resp) {
                            $scope.alert.error(common.getError(resp));
                        }).finally(function() {
                            $scope.reload();
                        });
                    },
                    //Add tags
                    modal: {
                        size: 'size-warning',
                        templateUrl: 'product/modalAddTags',
                        controller: function($scope, $uibModalInstance, data) {
                            $scope.model = {
                                tags: []
                            };
                            $scope.close = function() {
                                $uibModalInstance.close({
                                    Products: _.map(data, function(e) {
                                        return _.pick(e, ['ProductId']);
                                    }),
                                    Tags: $scope.model.tags
                                })
                            };
                        }
                    }
                }
            ],
            filters: [{
                name: "All",
                value: 'All'
            }, {
                name: "Approved",
                value: 'Approved'
            }, {
                name: 'Draft',
                value: 'Draft'
            }, {
                name: "Not Approved",
                value: 'NotApproved'
            }, {
                name: "Wait for Approval",
                value: 'WaitforApproval'
            }, {
                name: "Single",
                value: 'Single'
            }, {
                name: "Variant",
                value: 'Variant'
            }]
        }
    });
    // live status
    $scope.showOnOffStatus = {};
    $scope.showOnOffStatus.value = true;
    $scope.statusLookup = {};
    $scope.advanceSearchOptions.Admin = false; // not admin

    // product status hashmap
    config.PRODUCT_STATUS.forEach(function(object) {
        $scope.statusLookup[object.value] = object;
    });
        
    // export button
    $scope.startExportProducts = function() {
        
        $scope.exporter = {
            progress: 10,
            title: 'Exporting Product...'
        };

        $("#export-product").modal('show');
    };


    // on export
    $scope.confirmExportProducts = function() {
        $("#export-product").modal('hide');
        var arr = [];
        // get all products from checkbox
        Object.keys($scope.checkBoxCache).forEach(function(m) {
            if (!$scope.checkBoxCache[m]) return;
            arr.push({
                ProductId: Number(m)
            });
        });

        if (arr.length == 0) return;

        // create file
        var fileName = 'ProductExport-' + moment(new Date(), 'MM-DD-YYYY-HHmm') + ".csv";
        var a = document.getElementById("export_download_btn");

        // error exporting
        var error = function(r) {
            $(".modal").modal('hide');
            $scope.exporter.title = 'Error';
            $scope.alert.error('Unable to Export Product');
            $scope.reloadData();
        };

        $scope.exporter.progress = 15;
        var blobs = [];

        var chunks = _.chunk(arr, 3);

        //upload by chunk (this will call endpoints many time)
        chunks.forEach(function(chunk) {
            Product.export(chunk).then(function(result) {

                $scope.exporter.progress += (100 / chunks);
                blobs.push(result);

                var file = new Blob(blobs, {
                    type: 'application/csv'
                });
                var fileURL = URL.createObjectURL(file);

                $scope.exporter.href = fileURL;
                $scope.exporter.download = fileName;
                $scope.exporter.progress = 100;
                $scope.exporter.title = 'Export Complete'

                a.href = fileURL;

            }, error);
        });
    };
    // retrieve product status by name
    $scope.asStatus = function(ab) {
        return $scope.statusLookup[ab];
    };
    // get product tags as string
    $scope.getTag = function(tags) {
        return _.join(tags, ', ');
    }

    // export selected product in checkbox
    $scope.exportSelected = function() {
        $scope.alert.close();
        if ($scope.bulkContainer.length == 0) {
            return $scope.alert.error('Unable to Export. Please select Product for this action.');
        }
        document.getElementById('exportForm').submit();
    };

    $scope.searchCriteria = null;
    // export searched products
    $scope.exportSearchResult = function() {
        if(!$scope.advanceSearchParams){
            return $scope.alert.error("Unable to Export. There are no products in your search result.");
        }

        var K = _.extend({}, $scope.params, $scope.serializeAdvanceSearch($scope.advanceSearchParams));
        K._limit = 2147483647;
        $scope.searchCriteria = $base64.encode(JSON.stringify(K));

        $timeout(function() {
            console.log('searchCriteria', $scope.searchCriteria);
            document.getElementById('exportForm').submit();
        });
    }
    // if import successfully and redirected to this page, display msg
    var fromImport = storage.get('import.success');
    if (!_.isEmpty(fromImport)) {
        storage.remove('import.success');
        $scope.alert.success(fromImport);
    }
};