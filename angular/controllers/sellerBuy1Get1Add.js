module.exports = function ($scope, $controller, Buy1Get1Service, config, $uibModal, $timeout, $rootScope) {
    'ngInject';
    // seller
    $scope.manageBuy1Get1SE = !$rootScope.permit(54);  
    // shop
    $scope.manageBuy1Get1SH = !$rootScope.permit(70);  
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

        $scope.formData.CategoryProductListBuy.splice(end, 0,
            $scope.formData.CategoryProductListBuy.splice(start, 1)[0]);

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
        $scope.formData.CategoryProductListBuy.splice(end, 0,
           $scope.formData.CategoryProductListBuy.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    $scope.moveDown = function (start, end) {

        // swap object
        $scope.formData.CategoryProductListBuy.splice(end, 0,
        $scope.formData.CategoryProductListBuy.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    // update sequence
    function updateSequence() {

        var seq = 0;

        angular.forEach($scope.formData.CategoryProductListBuy, function (item) {
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
            angular.forEach($scope.formData.CategoryProductListBuy, function (item) {
                item.IsChecked = false;
            });
        }
        else {
            angular.forEach($scope.formData.CategoryProductListBuy, function (item) {
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

        angular.forEach($scope.formData.CategoryProductListBuy, function (item) {
            if (item.IsChecked) {
                sum++;
            }
        });

        return sum;
    };


    // Add Item to the list BUY
    $scope.addProductBuyItem = function () {

        // open modal
        $uibModal.open({
            templateUrl: 'templates/promotion-buy1get1-buy-item.html',
            size: 'lg',
            //scope: $scope,
            controller: function ($scope, $uibModalInstance) {

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
            if ($scope.formData.CategoryProductListBuy === undefined) {
                $scope.formData.CategoryProductListBuy = [];
            }

            angular.forEach(result, function (product) {
                if (!isDuplicateProduct(product.Pid)) {
                    var obj = angular.copy(product);
                    obj.Sequence = getNewProductSequence();
                    obj.ProductBoxBadge = product.ProductNameEn;
                    $scope.formData.CategoryProductListBuy.push(obj);
                }
            })
        });
    };

    // check product duplicate before add to list
    function isDuplicateProduct(pId) {
        var isDuplicate = false;
        angular.forEach($scope.formData.CategoryProductListBuy, function (product) {
            if (product.Pid == pId)
                isDuplicate = true;
        });

        return isDuplicate;
    }

    // gen product seq
    function getNewProductSequence() {
        return $scope.formData.CategoryProductListBuy.length + 1;
    }

    // remove product item
    $scope.removeOnceItem = function (index) {
        $scope.formData.CategoryProductListBuy.splice(index, 1);
    }

    // remove multiple product
    $scope.removeMultiItem = function () {
        for (var i = $scope.formData.CategoryProductListBuy.length - 1; i >= 0; i--) {
            if ($scope.formData.CategoryProductListBuy[i].IsChecked) {
                $scope.formData.CategoryProductListBuy.splice(i, 1);
            }
        }

        $scope.isCheckedAll = false;
    }

    // get total product items
    $scope.getTotalItems = function () {
        return $scope.formData.CategoryProductListBuy === undefined ? 0 : $scope.formData.CategoryProductListBuy.length;
    };


    //GET
    // Add Item to the list GET
    $scope.addProductGetItem = function () {

        // open modal
        $uibModal.open({
            templateUrl: 'templates/promotion-buy1get1-get-item.html',
            size: 'lg',
            //scope: $scope,
            controller: function ($scope, $uibModalInstance) {

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
            if ($scope.formData.CategoryProductListGet === undefined) {
                $scope.formData.CategoryProductListGet = [];
            }

            angular.forEach(result, function (product) {
                if (!isDuplicateProduct(product.Pid)) {
                    var obj = angular.copy(product);
                    obj.Sequence = getNewProductSequenceGet();
                    obj.ProductBoxBadge = product.ProductNameEn;
                    $scope.formData.CategoryProductListGet.push(obj);
                }
            })
        });
    };
    // check product duplicate before add to list
    function isDuplicateProduct(pId) {
        var isDuplicate = false;
        angular.forEach($scope.formData.CategoryProductListGet, function (product) {
            if (product.Pid == pId)
                isDuplicate = true;
        });

        return isDuplicate;
    }

    // gen product seq
    function getNewProductSequenceGet() {
        return $scope.formData.CategoryProductListGet.length + 1;
    }

    // remove product item
    $scope.removeOnceItem = function (index) {
        $scope.formData.CategoryProductListGet.splice(index, 1);
    }

    // remove multiple product
    $scope.removeMultiItem = function () {
        for (var i = $scope.formData.CategoryProductListGet.length - 1; i >= 0; i--) {
            if ($scope.formData.CategoryProductListGet[i].IsChecked) {
                $scope.formData.CategoryProductListGet.splice(i, 1);
            }
        }

        $scope.isCheckedAll = false;
    }

    // get total product items
    $scope.getTotalItems = function () {
        return $scope.formData.CategoryProductListGet === undefined ? 0 : $scope.formData.CategoryProductListGet.length;
    };
    $scope.dragStart = function (e, ui) {
        ui.item.data('start', ui.item.index());
    }
    $scope.dragEnd = function (e, ui) {
        var start = ui.item.data('start'),
            end = ui.item.index();

        $scope.formData.CategoryProductListGet.splice(end, 0,
            $scope.formData.CategoryProductListGet.splice(start, 1)[0]);

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
        $scope.formData.CategoryProductListGet.splice(end, 0,
           $scope.formData.CategoryProductListGet.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    $scope.moveDown = function (start, end) {

        // swap object
        $scope.formData.CategoryProductListGet.splice(end, 0,
        $scope.formData.CategoryProductListGet.splice(start, 1)[0]);

        // update seq
        $timeout(function () {
            updateSequence();
        }, 200);
    };

    // update sequence
    function updateSequence() {

        var seq = 0;

        angular.forEach($scope.formData.CategoryProductListGet, function (item) {
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
            angular.forEach($scope.formData.CategoryProductListGet, function (item) {
                item.IsChecked = false;
            });
        }
        else {
            angular.forEach($scope.formData.CategoryProductListGet, function (item) {
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

        angular.forEach($scope.formData.CategoryProductListGet, function (item) {
            if (item.IsChecked) {
                sum++;
            }
        });

        return sum;
    };

    $controller('AbstractAddCtrl', {
        $scope: $scope,
        options: {
            url: '/buy1get1/',
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
