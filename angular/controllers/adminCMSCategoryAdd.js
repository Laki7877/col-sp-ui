module.exports = function ($scope, $controller, CMSService, config, $uibModal, $timeout) {
    'ngInject';

    $scope.formData     = {};

    $scope.loading      = false;
    $scope.isEmpty      = true;
    $scope.products     = [];
    $scope.categorys    = [];

    // model for binding
    $scope.CMSRelProductCategory = {};
    $scope.CMSCategoryModel = {
        CMSRelProductCategory: []
    };

    $scope.dataSet = {
        criteria: [{ value: '0', text: 'Not Set' },
            { value: 'Brand', text: 'Brand' },
            { value: 'Tag', text: 'Tag' }
        ],
        filters: [{ value: 'None', text: 'No filter' },
            { text: 'Brand', value: 'Brand' },
            { text: 'Global Category', value: 'GlobalCategory' },
            { text: 'Shop', value: 'Shop' },
            { text: 'Email', value: 'Email' }
        ]
    };

    // Add a Item to the list
    $scope.addProductItem = function () {

        // open modal
        $uibModal.open({
            templateUrl: 'templates/admin-cms-category-manage-add-item.html',
            size: 'lg',
            //scope: $scope,
            controller: function ($scope, $uibModalInstance) {

                $scope.products = [];

                $scope.isEmpty = true;
                $scope.loading = false;
                $scope.message = 'You do not have any Product';
                $scope.categorys = [];
                $scope.brands   = [];
                $scope.tags     = [];

                // load category
                CMSService.getAllCategory()
                .then(function (data) {
                    console.log(data)
                    $scope.categorys = data;
                });

                // load category
                CMSService.getAllTag()
                .then(function (data) {
                    console.log(data)
                    $scope.tags = data;
                });


                $scope.search = function (searchProductInput) {

                    $scope.loading = true;
                    $scope.isEmpty = false;

                    console.log(searchProductInput)
                    

                    // search product
                    CMSService.searchProduct()
                    .then(function (data) {
                        $scope.products = data;
                        $scope.isEmpty = false;
                        $scope.loading = false;
                        $scope.message = '';
                    },
                    function (reason) {
                        console.log(reason)
                        $scope.isEmpty = true;
                        $scope.loading = false;
                        $scope.message = reason;
                    });

                };

                $scope.ok = function () {
                    $scope.loading = false;
                    $scope.isEmpty = false;
                    $uibModalInstance.close($scope.products)
                };


                
                /// Test
                $scope.category = {};
                $scope.brand    = {};
                $scope.tag      = {};

                $scope.$watch('category.selected', function (newValue, oldValue) {
                    if (newValue === undefined)
                        return;

                    // get brand by category id
                    CMSService.getBrand(newValue.CategoryId)
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
            $scope.products = result;
            $scope.loading = false;
            $scope.isEmpty = false;
        });
    };

    //Remove
    $scope.removeItem = function (item, index) {
        $scope.formData.CategoryProductList.splice(index, 1);
    }

    // Get Total Items
    $scope.getTotalItems = function () {
        return $scope.formData.CategoryProductList === undefined ? 0 : $scope.formData.CategoryProductList.length;
    };

    $controller('AbstractAddCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/cms/category',
            service: CMSService,
            item: 'CMS Category',
            order: 'UpdateDate',
            id: 'CMSCategoryId',
            init: function (scope) {

            },
            onLoad: function (scope, load) {
                
            },
            onSave: function (scope) {

            }
        }
    });

};
