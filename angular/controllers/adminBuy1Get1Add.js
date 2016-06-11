module.exports = function ($scope, $controller, Buy1Get1Service, config, $uibModal, $timeout, $rootScope) {
    'ngInject';
    $scope.manageBuy1Get1AD = !$rootScope.permit(82); 
    $scope.formData     = {};

    $scope.loading      = false;
    $scope.isEmpty      = true;
    //$scope.products     = [];
    //$scope.categorys    = [];


    var sortableEle;

    $scope.dragStart = function (e, ui) {
        ui.item.data('start', ui.item.index());
    }
    $scope.dragEnd = function (e, ui) {
        var start = ui.item.data('start'),
            end = ui.item.index();

        $scope.formData.CategoryProductList.splice(end, 0,
            $scope.formData.CategoryProductList.splice(start, 1)[0]);

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
        $scope.formData.CategoryProductList.splice(end, 0,
           $scope.formData.CategoryProductList.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    $scope.moveDown = function (start, end) {

        // swap object
        $scope.formData.CategoryProductList.splice(end, 0,
           $scope.formData.CategoryProductList.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    // update sequence
    function updateSequence() {

        var seq = 0;

        angular.forEach($scope.formData.CategoryProductList, function (item) {
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
            angular.forEach($scope.formData.CategoryProductList, function (item) {
                item.IsChecked = false;
            });
        }
        else {
            angular.forEach($scope.formData.CategoryProductList, function (item) {
                item.IsChecked = true;
            });
        }

        $scope.sumProductSelected();
    };

    // check once item
    $scope.checkOnce = function (item, isChecked) {

        if (!isChecked) {
            item.IsChecked = false;
        }
        else {
            item.IsChecked = true;
        }

        $scope.sumProductSelected();
    };

    $scope.sumProductSelected = function () {

        var sum = 0;

        angular.forEach($scope.formData.CategoryProductList, function (item) {
            if (item.IsChecked) {
                sum++;
            }
        });

        return sum;
    };


    // Add Item to the list
    $scope.addProductItem = function () {

        // open modal
        $uibModal.open({
            templateUrl: 'templates/promotion-buy1get1-add-item.html',
            size: 'lg',
            //scope: $scope,
            controller: function ($scope, $uibModalInstance) {
                'ngInject';
                $scope.products = [];

                $scope.isEmpty = true;
                $scope.loading = false;
                $scope.message = 'Empty list.';
                $scope.categorys = [];
                $scope.brands   = [];
                $scope.tags     = [];


                // load category
                Buy1Get1Service.getAllCategory()
                .then(function (data) {
                    console.log(data)
                    $scope.categorys = data;
                });

                // load category
                Buy1Get1Service.getAllTag()
                .then(function (data) {
                    console.log(data)
                    $scope.tags = data;
                });

                // Search
                $scope.search = function (searchText) {

                    $scope.loading = true;
                    $scope.isEmpty = false;

                    var tags = '';

                    angular.forEach($scope.tag.selected, function (tag) {
                        tags += tag.Tag + ',';
                    });

                    var params = {
                        CategoryId: $scope.category.selected.CategoryId,
                        BrandId: $scope.brand.selected.BrandId,
                        Tag: tags,
                        SearchBy: $scope.searchBy,
                        SearchText: $scope.searchText
                    };

                    // search product
                    Buy1Get1Service.searchProduct(params)
                    .then(function (data) {
                        console.log(data)
                        $scope.products = data;
                        $scope.isEmpty = false;
                        $scope.loading = false;
                        $scope.message = '';
                    },
                    function (error) {
                        $scope.products = [];
                        $scope.isEmpty = true;
                        $scope.loading = false;
                        $scope.message = 'Not Found Product';
                    });

                };

                $scope.ok = function () {

                    var itemSelected = [];

                    angular.forEach($scope.products, function (item) {
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
                        angular.forEach($scope.products, function (item) {
                            item.IsChecked = false;
                        });
                    }
                    else {
                        angular.forEach($scope.products, function (item) {
                            item.IsChecked = true;
                        });
                    }

                    $scope.sumProductSelected();
                };

                // check once item
                $scope.checkOnce = function (item, isChecked) {

                    if (!isChecked) {
                        item.IsChecked = false;
                    }
                    else {
                        item.IsChecked = true;
                    }

                    $scope.sumProductSelected();
                };

                $scope.sumProductSelected = function () {

                    var sum = 0;

                    angular.forEach($scope.products, function (item) {
                        if (item.IsChecked) {
                            sum++;
                        }
                    });

                    return sum;
                };
                
                /// Test
                $scope.category = {};
                $scope.brand    = {};
                $scope.tag      = {};
                $scope.searchBy = 'ProductName';

                $scope.$watch('category.selected', function (newValue, oldValue) {
                    if (newValue === undefined)
                        return;

                    // get brand by category id
                    Buy1Get1Service.getBrand(newValue.CategoryId)
                    .then(function (data) {
                        $scope.brands = data;
                    });

                });

                $scope.$watch('brand.selected', function (newValue, oldValue) {
                    if (newValue === undefined)
                        return;

                });

                $scope.disabled = undefined;

                $scope.enable = function () {
                    $scope.disabled = false;
                };

                $scope.disable = function () {
                    $scope.disabled = true;
                };

                $scope.clear = function () {
                    $scope.category.selected = undefined;
                };

                $scope.category = {};

            }
        })
        .result.then(function (result) {
            if ($scope.formData.CategoryProductList === undefined) {
                $scope.formData.CategoryProductList = [];
            }

            angular.forEach(result, function (product) {
                if (!isDuplicateProduct(product.Pid)) {
                    var obj = angular.copy(product);
                    obj.Sequence = getNewProductSequence();
                    obj.ProductBoxBadge = product.ProductNameEn;
                    $scope.formData.CategoryProductList.push(obj);
                }
            })
        });
    };

    // check product duplicate before add to list
    function isDuplicateProduct(pId) {
        var isDuplicate = false;
        angular.forEach($scope.formData.CategoryProductList, function (product) {
            if (product.Pid == pId)
                isDuplicate = true;
        });

        return isDuplicate;
    }

    // gen product seq
    function getNewProductSequence() {
        return $scope.formData.CategoryProductList.length + 1;
    }

    // remove product item
    $scope.removeOnceItem = function (index) {
        $scope.formData.CategoryProductList.splice(index, 1);
    }

    // remove multiple product
    $scope.removeMultiItem = function () {
        for (var i = $scope.formData.CategoryProductList.length - 1; i >= 0; i--) {
            if ($scope.formData.CategoryProductList[i].IsChecked) {
                $scope.formData.CategoryProductList.splice(i, 1);
            }
        }

        $scope.isCheckedAll = false;
    }

    // get total product items
    $scope.getTotalItems = function () {
        return $scope.formData.CategoryProductList === undefined ? 0 : $scope.formData.CategoryProductList.length;
    };

    $controller('AbstractAddCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/buy1get1/create',
            service: Buy1Get1Service,
            item: 'buy 1 get 1',
            order: 'UpdateDate',
            id: 'PromotionBuy1Get1ItemId',
            init: function (scope) {

            },
            onLoad: function (scope, load) {
                
            },
            onSave: function (scope) {

            }
        }
    });

};
