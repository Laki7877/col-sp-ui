module.exports = function ($scope, $controller, CMSMasterService, config, $uibModal, $timeout) {
    'ngInject';

    $scope.formData = {};

    $scope.Schedule = {
        EffectiveDate: null,
        ExpiryDate: null,
        CategoryList: []
    };

 
    var sortableEle;

    $scope.dragStart = function (e, ui) {
        ui.item.data('start', ui.item.index());
    }
    $scope.dragEnd = function (e, ui) {
        var start = ui.item.data('start'),
            end = ui.item.index();

         $scope.Schedule.CategoryList.splice(end, 0,
             $scope.Schedule.CategoryList.splice(start, 1)[0]);

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
         $scope.Schedule.CategoryList.splice(end, 0,
            $scope.Schedule.CategoryList.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    $scope.moveDown = function (start, end) {

        // swap object
         $scope.Schedule.CategoryList.splice(end, 0,
            $scope.Schedule.CategoryList.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    // update sequence
    function updateSequence() {

        var seq = 0;

        angular.forEach( $scope.Schedule.CategoryList, function (item) {
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
            angular.forEach( $scope.Schedule.CategoryList, function (item) {
                item.IsChecked = false;
            });
        }
        else {
            angular.forEach( $scope.Schedule.CategoryList, function (item) {
                item.IsChecked = true;
            });
        }

        $scope.sumCategorySelected();
    };

    // check once item
    $scope.checkOnce = function (item, isChecked) {

        if (!isChecked) {
            item.IsChecked = false;
        }
        else {
            item.IsChecked = true;
        }

        $scope.sumCategorySelected();
    };

    $scope.sumCategorySelected = function () {

        var sum = 0;

        angular.forEach( $scope.Schedule.CategoryList, function (item) {
            if (item.IsChecked) {
                sum++;
            }
        });

        return sum;
    };

    $('#add_cms_master_body ul.nav li').click(function () {

        var index = $('#add_cms_master_body ul.nav li').index(this);

        if (index != 1) {
            $('#collections').hide();
        }
        else {
            $('#collections').show();
        }
    });

    $scope.typeChanged = function (type) {

        if (type == 'ST') {
            $('#collections').hide();
            $('#add_cms_master_body ul.nav li:nth-child(2)').hide();
        }
        else {
            $('#add_cms_master_body ul.nav li:nth-child(2)').show();
        }
    };

    // add category to collection
    $scope.addCategoryItem = function () {

        $uibModal.open({
            templateUrl: 'templates/admin-cms-master-add-item.html',
            size: 'lg',
            controller: function ($scope, $uibModalInstance) {

                $scope.categories = [];

                $scope.isEmpty = true;
                $scope.loading = false;
                $scope.message = 'Empty list.';

                // Search
                $scope.search = function (searchText) {

                    $scope.loading = true;
                    $scope.isEmpty = false;

                    var params = {
                        SearchText: $scope.searchText
                    };

                    // search product
                    CMSMasterService.searchCMSCategory(params)
                    .then(function (data) {
                        console.log(data)
                        $scope.categories = data;
                        $scope.isEmpty = false;
                        $scope.loading = false;
                        $scope.message = '';
                    },
                    function (error) {
                        $scope.categories = [];
                        $scope.isEmpty = true;
                        $scope.loading = false;
                        $scope.message = 'Not Found CMS Category';
                    });

                };

                $scope.ok = function () {

                    var itemSelected = [];

                    angular.forEach($scope.categories, function (item) {
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
                        angular.forEach($scope.categories, function (item) {
                            item.IsChecked = false;
                        });
                    }
                    else {
                        angular.forEach($scope.categories, function (item) {
                            item.IsChecked = true;
                        });
                    }

                    $scope.sumCategorySelected();
                };

                // check once item
                $scope.checkOnce = function (item, isChecked) {

                    if (!isChecked) {
                        item.IsChecked = false;
                    }
                    else {
                        item.IsChecked = true;
                    }

                    $scope.sumCategorySelected();
                };

                $scope.sumCategorySelected = function () {

                    var sum = 0;

                    angular.forEach($scope.categories, function (item) {
                        if (item.IsChecked) {
                            sum++;
                        }
                    });

                    return sum;
                };
            }
        })
        .result.then(function (result) {

            if ( $scope.Schedule.CategoryList === undefined) {
                 $scope.Schedule.CategoryList = [];
            }

            if ($scope.formData.ScheduleList === undefined) {
                $scope.formData.ScheduleList = [];
            }

            angular.forEach(result, function (category) {
                if (!isDuplicateCategory(category.CMSCategoryId)) {
                    category.Sequence = getNewCategorySequence();
                     $scope.Schedule.CategoryList.push(category);
                }
            })

            $scope.formData.ScheduleList.push($scope.Schedule);
            console.log($scope.formData)
        });
    };

    // check product duplicate before add to list
    function isDuplicateCategory(cId) {
        var isDuplicate = false;
        angular.forEach( $scope.Schedule.CategoryList, function (category) {
            if (category.CMSCategoryId == cId)
                isDuplicate = true;
        });

        return isDuplicate;
    }

    // gen category seq
    function getNewCategorySequence() {
        return  $scope.Schedule.CategoryList.length + 1;
    }

    // remove product item
    $scope.removeOnceItem = function (index) {
         $scope.Schedule.CategoryList.splice(index, 1);
    }

    // remove multiple product
    $scope.removeMultiItem = function () {
        for (var i =  $scope.Schedule.CategoryList.length - 1; i >= 0; i--) {
            if ( $scope.Schedule.CategoryList[i].IsChecked) {
                 $scope.Schedule.CategoryList.splice(i, 1);
            }
        }

        $scope.isCheckedAll = false;
    }

    // get total product items
    $scope.getTotalItems = function () {
        return  $scope.Schedule.CategoryList === undefined ? 0 :  $scope.Schedule.CategoryList.length;
    };

    $controller('AbstractAddCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/cms/master',
            service: CMSMasterService,
            item: 'CMS Master',
            order: 'UpdateDate',
            id: 'CMSMasterId',
            init: function (scope) {
                
            },
            onLoad: function (scope, load) {
                $scope.Schedule = scope.formData.ScheduleList[0];
            },
            onSave: function (scope) {

            }
        }
    });
};
