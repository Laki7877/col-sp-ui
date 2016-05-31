module.exports = function ($scope, $controller,$rootScope, CMSGroupService, config, $uibModal, $timeout) {
    'ngInject'; 
    $scope.adCMSadd = !$rootScope.permit(24);
    $scope.formData     = {};

    $scope.loading      = false;
    $scope.isEmpty      = true;


    var sortableEle;

    $scope.dragStart = function (e, ui) {
        ui.item.data('start', ui.item.index());
    }
    $scope.dragEnd = function (e, ui) {
        var start = ui.item.data('start'),
            end = ui.item.index();

        $scope.formData.GroupMasterList.splice(end, 0,
            $scope.formData.GroupMasterList.splice(start, 1)[0]);

        $scope.$apply();

        $timeout(function () {
            updateSequence();
        }, 200);
        
    }

    sortableEle = $('#sortable').sortable({
        start: $scope.dragStart,
        update: $scope.dragEnd
    });

    $scope.moveUp = function (start, end) {

        // swap object
        $scope.formData.GroupMasterList.splice(end, 0,
           $scope.formData.GroupMasterList.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    $scope.moveDown = function (start, end) {

        // swap object
        $scope.formData.GroupMasterList.splice(end, 0,
           $scope.formData.GroupMasterList.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    // update sequence
    function updateSequence() {

        var seq = 0;

        angular.forEach($scope.formData.GroupMasterList, function (item) {
            seq++;
            item.Sequence = seq;
        });
    }

    $scope.selectOptionText = '- Choose Action -';
    $scope.selectOption = function (param) {
        $scope.selectOptionText = param;
    };

    // check all item
    $scope.checkAll = function (isChecked) {

        $scope.isCheckedAll != isChecked;

        if (!isChecked) {
            angular.forEach($scope.formData.GroupMasterList, function (item) {
                item.IsChecked = false;
            });
        }
        else {
            angular.forEach($scope.formData.GroupMasterList, function (item) {
                item.IsChecked = true;
            });
        }

        $scope.sumMasterSelected();
    };

    // check once item
    $scope.checkOnce = function (item, isChecked) {

        if (!isChecked) {
            item.IsChecked = false;
        }
        else {
            item.IsChecked = true;
        }

        $scope.sumMasterSelected();
    };

    $scope.sumMasterSelected = function () {

        var sum = 0;

        angular.forEach($scope.formData.GroupMasterList, function (item) {
            if (item.IsChecked) {
                sum++;
            }
        });

        return sum;
    };


    // Add Item to list
    $scope.addCMSMasterItem = function () {

        // open modal
        $uibModal.open({
            templateUrl: 'templates/admin-cms-group-add-item.html',
            size: 'lg',
            //scope: $scope,
            controller: function ($scope, $uibModalInstance) {
                'ngInject';
                $scope.masters = [];

                $scope.isEmpty = true;
                $scope.loading = false;
                $scope.message = 'Empty list.';

                // Search
                $scope.search = function (searchText) {

                    $scope.loading = true;
                    $scope.isEmpty = false;

                    var params = {
                        //SearchBy: $scope.searchBy,
                        SearchText: $scope.searchText
                    };

                    // search product
                    CMSGroupService.searchCMSMaster(params)
                    .then(function (data) {
                        console.log(data)
                        $scope.masters = data;
                        $scope.isEmpty = false;
                        $scope.loading = false;
                        $scope.message = '';
                    },
                    function (error) {
                        $scope.masters = [];
                        $scope.isEmpty = true;
                        $scope.loading = false;
                        $scope.message = 'Not Found CMS Master';
                    });

                };

                $scope.ok = function () {

                    var itemSelected = [];

                    angular.forEach($scope.masters, function (item) {
                        if (item.IsChecked) {
                            itemSelected.push(item);
                        }
                    });

                    $uibModalInstance.close(itemSelected);
                };

                // check all item
                $scope.checkAll = function (isChecked) {

                    $scope.isCheckedAll != isChecked;

                    if (!isChecked) {
                        angular.forEach($scope.masters, function (item) {
                            item.IsChecked = false;
                        });
                    }
                    else {
                        angular.forEach($scope.masters, function (item) {
                            item.IsChecked = true;
                        });
                    }

                    $scope.sumMasterSelected();
                };

                // check once item
                $scope.checkOnce = function (item, isChecked) {

                    if (!isChecked) {
                        item.IsChecked = false;
                    }
                    else {
                        item.IsChecked = true;
                    }

                    $scope.sumMasterSelected();
                };

                $scope.sumMasterSelected = function () {

                    var sum = 0;

                    angular.forEach($scope.masters, function (item) {
                        if (item.IsChecked) {
                            sum++;
                        }
                    });

                    return sum;
                };
                
            }
        })
        .result.then(function (result) {
            if ($scope.formData.GroupMasterList === undefined) {
                $scope.formData.GroupMasterList = [];
            }

            angular.forEach(result, function (master) {
                if (!isDuplicateMaster(master.CMSMasterId)) {
                    master.Sequence = getNewMasterSequence();
                    $scope.formData.GroupMasterList.push(master);
                }
            })
        });
    };

    // check product duplicate before add to list
    function isDuplicateMaster(mId) {
        var isDuplicate = false;
        angular.forEach($scope.formData.GroupMasterList, function (master) {
            if (master.CMSMasterId == mId)
                isDuplicate = true;
        });

        return isDuplicate;
    }

    // gen product seq
    function getNewMasterSequence() {
        return $scope.formData.GroupMasterList.length + 1;
    }

    // remove product item
    $scope.removeOnceItem = function (index) {
        $scope.formData.GroupMasterList.splice(index, 1);
    }

    // remove multiple product
    $scope.removeMultiItem = function () {
        for (var i = $scope.formData.GroupMasterList.length - 1; i >= 0; i--) {
            if ($scope.formData.GroupMasterList[i].IsChecked) {
                $scope.formData.GroupMasterList.splice(i, 1);
            }
        }

        $scope.isCheckedAll = false;
    }

    // get total product items
    $scope.getTotalItems = function () {
        return $scope.formData.GroupMasterList === undefined ? 0 : $scope.formData.GroupMasterList.length;
    };

    $controller('AbstractAddCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/cms/group',
            service: CMSGroupService,
            item: 'CMS Group',
            order: 'UpdateDate',
            id: 'CMSGroupId',
            init: function (scope) {

            },
            onLoad: function (scope, load) {
                
            },
            onSave: function (scope) {

            }
        }
    });

};
