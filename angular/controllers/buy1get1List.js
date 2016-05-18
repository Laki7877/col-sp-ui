module.exports = ['$scope',  'Buy1Get1', 'util', 'Alert', '$window', '$rootScope', function

($scope, Buy1Get1, util, Alert, $window, $rootScope) {
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

    $scope.startExportBuy1Get1 = function () {
        $scope.exporter = {
            progress: 10,
            title: 'Exporting...'
        };

        $("#export-buy1get1").modal('show');
    };

    $scope.confirmExportBuy1Get1 = function () {
        $("#export-buy1get1").modal('hide');

        var arr = [];
        Object.keys($scope.checkBoxCache).forEach(function (m) {
            if (!$scope.checkBoxCache[m]) return;
            arr.push({
                PromotionBuy1Get1ItemId: Number(m)
            });
        });

        if (arr.length == 0) return;


        var fileName = 'Buy1Get1Export-' + moment(new Date(), 'MM-DD-YYYY-HHmm') + ".csv";
        var a = document.getElementById("export_download_btn");

        var error = function (r) {
            $(".modal").modal('hide');
            $scope.exporter.title = 'Error'
            $scope.alert.error('Unable to Export Buy 1 Get 1');
            $scope.reloadData();
        };

        $scope.exporter.progress = 15;
        var blobs = [];

        var chunks = _.chunk(arr, 3);


        chunks.forEach(function (chunk) {
            Buy1Get1.export(chunk).then(function (result) {

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
                            rObj = { PromotionBuy1Get1ItemId: -1 , CMSStatusFlowId: 5  };  
                    }else{
                            rObj = {
                            PromotionBuy1Get1ItemId: Number(id),
                            CMSStatusFlowId: 5 
                        };
                    }                   
                    return rObj ;
                });
    
                if (selList.length > 0) {
                       
                        var apiRequest = Buy1Get1.arrSerialize(selList);                         
                        Buy1Get1.deleteBulk(apiRequest).then(function () {
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
                            rObj = { PromotionBuy1Get1ItemId: -1 , Visibility: true  };  
                    }else{
                            rObj = {
                            PromotionBuy1Get1ItemId: Number(id) ,
                            Visibility : true 
                        };
                    }                   
                    return rObj ;
                });


                if (selList.length > 0) {
                     var apiRequest = Buy1Get1.arrSerialize(selList);
                        Buy1Get1.visible(apiRequest).then(function () {
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
                            rObj = { PromotionBuy1Get1ItemId: -1 , Visibility: false  };  
                    }else{
                            rObj = {
                            PromotionBuy1Get1ItemId: Number(id) ,
                            Visibility : false 
                        };
                    }                   
                    return rObj ;
                });

                if (selList.length > 0) {
                      var apiRequest = Buy1Get1.arrSerialize(selList);
                        Buy1Get1.visible(apiRequest).then(function () {
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
                            rObj = { PromotionBuy1Get1ItemId: -1 ,CMSStatusFlowId: 2  };  
                    }else{
                            rObj = {
                            PromotionBuy1Get1ItemId: Number(id) ,
                            CMSStatusFlowId: 2 
                        };
                    }                   
                    return rObj ;
                });

                if (selList.length == 0) return;

                    var apiRequest = Buy1Get1.arrSerialize(selList);
                Buy1Get1.bulkPublish(apiRequest).then(function () {
                     $scope.alert.success('Successfully published');
                     $scope.reloadData();
                }, function (r) {
                    $scope.alert.success('Unable to publish');
                     $scope.reloadData();
                });
            }
        }
    ];
    $scope.actions = {
        edit: function (row) {
            $window.location.href = "/buy1get1/" + row.PromotionBuy1Get1ItemId;
        },
        delete: function (row) {
            $scope.alert.close();
            Buy1Get1.deleteBulk([{ PromotionBuy1Get1ItemId: row.PromotionBuy1Get1ItemId ,CMSStatusFlowId:5 }]).then(function () {
                $scope.alert.success('You have successfully remove an entry.');
                $scope.reloadData();
            }, function (err) {
                $scope.alert.error(err);
            });
        },
        duplicate: function (row) {
            $scope.alert.close();
            Buy1Get1.duplicate(row.PromotionBuy1Get1ItemId).then(function () {
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
            Buy1Get1.visible([row]).then(function () {
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

    //Buy1Get1 List
    $scope.buy1get1List = [];
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
        return Math.ceil($scope.buy1get1Total / $scope.tableParams.pageSize);
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

    $scope.buy1get1Total = 0;
    //Populate Data Source
    $scope.reloadData = function () {
        console.log("reload data fire");
        $scope.buy1get1List = [];
        $scope.notReady = true;
        Buy1Get1.getAll($scope.tableParams).then(function (x) {
            $scope.buy1get1Total = x.total;
            $scope.buy1get1List = x.data;
            $scope.notReady = false;
        });
    };

    //Watch any change in table parameter, trigger reload
    $scope.$watch('tableParams', function () {
        $scope.reloadData();
        $scope.allChecked = false;
    }, true);

    

   
    $scope.checkAll = function(){
        var first = $scope.buy1get1List[0];
        var tval = !($scope.checkBoxCache[first.PromotionBuy1Get1ItemId] || false);
        $scope.buy1get1List.forEach(function (d) {
            $scope.checkBoxCache[d.PromotionBuy1Get1ItemId] = tval;
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
        $scope.buy1get1List.forEach(function(p){
            chkCount += ($scope.checkBoxCache[p.PromotionBuy1Get1ItemId] ? 1 : 0);
        });
        
        //Change selectAll checkbox state
        if(chkCount != $scope.buy1get1List.length){
            $scope.allChecked = false;
        }else{
            $scope.allChecked = true;
        }
        return m.length;
    }
}];
