module.exports = ['$scope', 'Product', 'Collection', 'util', 'Alert', '$window', '$rootScope', function

($scope, Product,Collection, util, Alert, $window, $rootScope) {
    //UI binding variables    

    $scope.checkBoxCache = {};
    $scope.hidCMSTypeId = {};    
    $scope.showOnOffStatus = true;
    $scope.allChecked = false;
    $scope.alert = new Alert();
    $scope.filterOptions = [
        { name: "All", value: 'All' },
        { name: "Approved", value: 'Approved' },
        { name: 'Draft', value: 'Draft' },
        { name: "Not Approved", value: 'NotApproved' },
        { name: "Wait for Approval", value: 'WaitforApproval' },
    ];

    $scope.startExportProductCollection = function () {
        $scope.exporter = {
            progress: 10,
            title: 'Exporting...'
        };

        $("#export-product-collection").modal('show');
    };

    $scope.confirmExportProductCollection = function () {
        $("#export-product-collection").modal('hide');

        var arr = [];
        Object.keys($scope.checkBoxCache).forEach(function (m) {
            if (!$scope.checkBoxCache[m]) return;
            arr.push({
                CMSId: Number(m)
            });
        });

        if (arr.length == 0) return;


        var fileName = 'ProductCollectionExport-' + moment(new Date(), 'MM-DD-YYYY-HHmm') + ".csv";
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


        chunks.forEach(function (chunk) {
            Collection.export(chunk).then(function (result) {

                $scope.exporter.progress += (100 / chunks);
                blobs.push(result);

                var file = new Blob(blobs, { type: 'application/csv' });
                var fileURL = URL.createObjectURL(file);

                $scope.exporter.href = fileURL;
                $scope.exporter.download = fileName;
                $scope.exporter.progress = 100;
                $scope.exporter.title = 'Export Complete'

                a.href = fileURL;

            }, error);
        });
    }


    $scope.setPageSize = function (p) {
        $scope.tableParams.pageSize = p;
    }

    $scope.bulk = {
        fn: function () {
            var bulk = $scope.bulkOptions.find(function (item) {
                return item.name == $('#bulk').html();
            });
            if (bulk) {
                bulk.fn();
            }
            $scope.allChecked = false;
        }
    };

    $scope.bulkOptions = [
        {
            name: 'Delete',
            value: 'delete',
            fn: function () {
                $scope.alert.close();
             


             var selList = Object.keys($scope.checkBoxCache).map(function (id) {
                    var rObj = {};

                    if (!$scope.checkBoxCache[id]) { 
                            rObj = { CMSId: -1 , CMSStatusFlowId: 5 , CMSTypeId : -1 };  
                    }else{
                            rObj = {
                            CMSId: Number(id),
                            CMSStatusFlowId: 5 ,
                            CMSTypeId: $scope.hidCMSTypeId[id]
                        };
                    }                   
                    return rObj ;
                });
    
                if (selList.length > 0) {
                       
                        var apiRequest = Collection.arrSerialize(selList);                         
                        Collection.deleteBulk(apiRequest).then(function () {
                        $scope.alert.success('Successfully deleted');
                        $scope.reloadData();
                    }, function (result) {
                        $scope.alert.error('Unable to Delete');
                        $scope.reloadData();
                    });
                }
            }
        },
        {
            name: 'Show',
            value: 'show',
            fn: function () {

        var selList = Object.keys($scope.checkBoxCache).map(function (id) {
                    var rObj = {};
                    if (!$scope.checkBoxCache[id]) { 
                            rObj = { CMSId: -1 , Visibility: true ,CMSTypeId :-1 };  
                    }else{
                            rObj = {
                            CMSId: Number(id) ,
                            Visibility : true ,
                            CMSTypeId: $scope.hidCMSTypeId[id]
                        };
                    }                   
                    return rObj ;
                });


                if (selList.length > 0) {
                     var apiRequest = Collection.arrSerialize(selList);
                        Collection.visible(apiRequest).then(function () {
                        $scope.alert.success('Successfully changed');
                        $scope.reloadData();
                    }, function () {
                        $scope.alert.error('Unable to Show');
                        $scope.reloadData();
                    });
                }
            }
        },
        {
            name: 'Hide',
            value: 'hide',
            fn: function () {
               
                 var selList = Object.keys($scope.checkBoxCache).map(function (id) {
                    var rObj = {};
                    if (!$scope.checkBoxCache[id]) { 
                            rObj = { CMSId: -1 , Visibility: false ,CMSTypeId :-1 };  
                    }else{
                            rObj = {
                            CMSId: Number(id) ,
                            Visibility : false ,
                            CMSTypeId: $scope.hidCMSTypeId[id]
                        };
                    }                   
                    return rObj ;
                });

                if (selList.length > 0) {
                      var apiRequest = Collection.arrSerialize(selList);
                        Collection.visible(apiRequest).then(function () {
                        $scope.alert.success('Successfully changed');
                        $scope.reloadData();
                    }, function () {
                        $scope.alert.error('Unable to Hide');
                        $scope.reloadData();
                    });
                }
            }
        },
        {
            name: 'Publish',
            value: 'publish',
            fn: function () {
              
                 var selList = Object.keys($scope.checkBoxCache).map(function (id) {
                    var rObj = {};
                    if (!$scope.checkBoxCache[id]) { 
                            rObj = { CMSId: -1 ,CMSStatusFlowId: 2 , CMSTypeId :-1 };  
                    }else{
                            rObj = {
                            CMSId: Number(id) ,
                            CMSStatusFlowId: 2 ,
                            CMSTypeId: $scope.hidCMSTypeId[id]
                        };
                    }                   
                    return rObj ;
                });

                if (selList.length == 0) return;

                    var apiRequest = Collection.arrSerialize(selList);
                Collection.bulkPublish(apiRequest).then(function () {
                    // $scope.alert.success("Successfully published " + arr.length + " items");
                    // $scope.reloadData();
                     $scope.alert.success('Successfully published');
                     $scope.reloadData();
                }, function (r) {
                    //$scope.alert.error('Unable to publish because ' + r.message);
                    $scope.alert.success('Unable to publish');
                     $scope.reloadData();
                });
            }
        }
    ];
    $scope.actions = {
        edit: function (row) {
            $window.location.href = "/collections/" + row.CMSId;
        },
        delete: function (row) {
            $scope.alert.close();
            Collection.deleteBulk([{ CMSId: row.CMSId ,CMSTypeId : row.CMSTypeId,CMSStatusFlowId:5 }]).then(function () {
                $scope.alert.success('You have successfully remove an entry.');
                $scope.reloadData();
            }, function (err) {
                $scope.alert.error(err);
            });
        },
        duplicate: function (row) {
            $scope.alert.close();
            Collection.duplicate(row.CMSId).then(function () {
                $scope.alert.success();
                $scope.reloadData();
            }, function (err) {
                $scope.alert.error(err);
            });
        },
        toggle: function (row) {
            $scope.alert.close();
            row.Visibility = !row.Visibility;
            console.log("[row]");
            console.log([row]);
            Collection.visible([row]).then(function () {
            }, function (err) {
                $scope.alert.error(err);
                $scope.reloadData();
            });
        }
    };
    $scope.sort = util.tableSortClass($scope);
    var StatusLookup = {

        '1': {
            Class: 'fa-circle-o',
            Text: 'Draft',
            Color: 'color-grey'
        },
        '2': {
            Class: 'fa-check-square-o',
            Text: 'Approve',
            Color: 'color-green'
        },
        '3': {
            Class: 'fa-circle-o',
            Text: 'Not approve',
            Color: 'color-orange'
        },
        '4': {
            Class: 'fa-clock-o',
            Text: 'Wait for approval',
            Color: 'color-yellow'
        },
       '5': {
            Class: 'fa-clock-o',
            Text: 'Junk',
            Color: 'color-red'
        }
    }
    $scope.init = function (params) {
        if (angular.isDefined(params)) {
            if (angular.isDefined(params.success) && params.success != null) {
                $scope.alert.success();
            }
        }
    };
    $scope.asStatus = function (ab) {
        return StatusLookup[ab];
    };

    //Product List
    $scope.productList = [];
    //Default parameters
    $scope.tableParams = {
        filter: 'All',
        searchText: null,
        orderBy: 'UpdateDate',
        direction: 'desc',
        page: 0,
        pageSize: 10,
        shopID :0
    };

    $scope.notReady = true;

    $scope.applySearch = function () {
        $scope.tableParams.searchText = $scope.searchText;
    };

    $scope.totalPage = function (x) {
        return Math.ceil($scope.productTotal / $scope.tableParams.pageSize);
    };

    $scope.nextPage = function (m) {
        if ($scope.tableParams.page + m >= $scope.totalPage() ||
            $scope.tableParams.page + m < 0)
            return;

        $scope.tableParams.page += m;
    };


    $scope.setOrderBy = function (nextOrderBy) {
        if ($scope.tableParams.orderBy == nextOrderBy) {
            $scope.tableParams.direction = ($scope.tableParams.direction == 'asc' ? 'desc' :

'asc');
        }
        $scope.tableParams.orderBy = nextOrderBy;
    };

    $scope.productTotal = 0;
    //Populate Data Source
    $scope.reloadData = function () {
        $scope.productList = [];
        $scope.notReady = true;
        Collection.getAll($scope.tableParams).then(function (x) {
            $scope.productTotal = x.total;
            $scope.productList = x.data;
            $scope.notReady = false;
        });
    };

    //Watch any change in table parameter, trigger reload
    $scope.$watch('tableParams', function () {
        $scope.reloadData();
        $scope.allChecked = false;
    }, true);

    

   
    $scope.checkAll = function(){
        var first = $scope.productList[0];
        var tval = !($scope.checkBoxCache[first.CMSId] || false);
        $scope.productList.forEach(function (d) {
            $scope.checkBoxCache[d.CMSId] = tval;
        });
    }


    

    $scope.checkBoxCount = function () {
        var m = [];
        Object.keys($scope.checkBoxCache).forEach(function (key) {
            if ($scope.checkBoxCache[key]) m.push($scope.checkBoxCache[key]);
        });
      
        //Count checked checkbox (on this page only)
        //TODO: I don't like this solution, I'd rather trade space for time
        //note: can't just count checkboxcache because checkboxcache is global across
        //all pages. 
        var chkCount = 0;
        $scope.productList.forEach(function(p){
            chkCount += ($scope.checkBoxCache[p.CMSId] ? 1 : 0);
        });
        
        //Change selectAll checkbox state
        if(chkCount != $scope.productList.length){
            $scope.allChecked = false;
        }else{
            $scope.allChecked = true;
        }
        return m.length;
    }
}];
