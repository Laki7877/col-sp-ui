module.exports = function ($scope, $rootScope, $controller, $uibModal, $window, NcAlert, SellerCouponService, LocalCategoryService, Category, Product, config) {
    'ngInject';
    $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
    $scope.criteria = config.DROPDOWN.COUPON_CRITERIA;
    $scope.filters = config.DROPDOWN.COUPON_SELLER_FILTER;
    $scope.discount = config.DROPDOWN.COUPON_DISCOUNT;
    $scope.manageable = !$rootScope.permit(53);
    $scope.alert = new NcAlert();


    $scope.categories   = [];
    $scope.formData     = SellerCouponService.generate();

    // load local categories
    LocalCategoryService.list()
    .then(function (data) {
        $scope.categories = data;
    });

    // load product in shop
    Product.list({ SearchText : '' })
    .then(function (res) {
        $scope.products = res.data;
    });

    // exclde product
    $scope.exclude = function (categoryId) {
        
        var category = categoryId; //$scope.getCategory(categoryId);
        console.log(category)

        $uibModal.open({
            templateUrl: 'templates/coupon-include-or-exclude.html',
            size: 'lg',
            //scope: $scope,
            controller: function ($scope, $uibModalInstance) {

                $scope.products = [];
                $scope.includes = [];
                $scope.excludes = [];
                $scope.empty    = true;

                if (category.Include !== undefined && category.Include.length > 0) {
                    $scope.includes = category.Include;
                }
                if (category.Exclude !== undefined && category.Exclude.length > 0) {
                    $scope.excludes = category.Exclude;
                }

                // remove include
                $scope.removeInclude = function (item) {
                    var index = $scope.includes.indexOf(item);
                    if (index > -1) {
                        $scope.includes.splice(index, 1);
                    }
                };

                // remove exclude
                $scope.removeExclude = function (item) {
                    var index = $scope.excludes.indexOf(item);
                    if (index > -1) {
                        $scope.excludes.splice(index, 1);
                    }
                };

                // remove product
                $scope.removeProduct = function (item) {
                    var index = $scope.products.indexOf(item);
                    if (index > -1) {
                        $scope.products.splice(index, 1);
                    }
                };

                // check product item
                $scope.isItemSelected = function (pid) {
                    var excludeIndex = $scope.excludes.map(function (i) {
                        return i.Pid;
                    }).indexOf(pid);

                    return excludeIndex > -1;
                };

                // move item
                $scope.moveTo = function (from, to, item) {
                    if (from == 'product') {
                        if ($scope.isItemSelected(item.Pid))
                            return;

                        $scope.excludes.push(item);
                    }
                };

                // search product
                $scope.searchProduct = function (searchText) {

                    $scope.products = [];
                    $scope.loading  = true;
                    $scope.empty    = false;

                    Product.list({ SearchText: searchText })
                    .then(function (res) {
                        $scope.products = [];
                        angular.forEach(res.data, function (p) {
                            var transformed = {
                                Pid: p.Pid,
                                ProductNameEn: p.ProductNameEn
                            };
                            $scope.products.push(transformed);
                        });
                        $scope.loading = false;

                        if ($scope.products.length > 0)
                            $scope.empty = false;
                    });
                };

                $scope.ok = function () {

                    category.Exclude = [];

                    angular.forEach($scope.excludes, function (i) {
                        category.Exclude.push(i);
                    });

                    $uibModalInstance.close(category);
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
            }
        })
        .result.then(function (data) {
            
            var index = $scope.formData.Conditions.FilterBy.LocalCategories.map(function (i) {
                return i.CategoryId;
            }).indexOf(data.CategoryId);

            // update
            if (index > -1) {
                $scope.formData.Conditions.FilterBy.LocalCategories[index] = data;
            }

            // add new
            else {
                $scope.formData.Conditions.FilterBy.LocalCategories.push(data);
            }

            console.log($scope.formData)

        });
    };

    // search product
    $scope.searchProduct = function (searchText) {

        $scope.products = [];

        Product.list({ SearchText: searchText })
        .then(function (res) {
            $scope.products = [];
            angular.forEach(res.data, function (p) {
                var transformed = {
                    Pid: p.Pid,
                    ProductNameEn: p.ProductNameEn
                };
                $scope.products.push(transformed);
            });
        });
    };

    $scope.getCategory = function (id) {
        var category = null;
        angular.forEach($scope.categories, function (item) {
            if (item.CategoryId === id)
                category = item;
        });
        return category;
    };
    
    //Abstract Add Ctrl
    $controller('AbstractAddCtrl', {
        $scope: $scope,
        options: {
            id: 'CouponId',
            url: '/coupons',
            item: 'Coupon',
            service: SellerCouponService,
            dateFields: ['StartDate', 'ExpireDate'],
            onLoad: function (scope, load) {
                //TODO: Check Hit Weapon
                LocalCategoryService.list()
                .then(function(data) {
                    $scope.categories = Category.transformNestedSetToUITree(data);
                });
            },
            onSave: function (scope) {
                
            }
        }
    });

};