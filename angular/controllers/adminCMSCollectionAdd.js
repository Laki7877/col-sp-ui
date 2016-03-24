module.exports = function ($scope, $controller, OnTopCredit, config, $uibModal, $timeout) {

    $scope.formData = {
        
    };

    $scope.loading = false;
    $scope.isEmpty = true;
    $scope.products = [];

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

                $scope.search = function () {

                    $scope.loading = false;
                    $scope.isEmpty = false;

                    $scope.products = [
                        { ProductName: 'P1' }
                    ];
                    $scope.message = '';
                };

                $scope.ok = function () {
                    $scope.loading = false;
                    $scope.isEmpty = false;
                    $uibModalInstance.close($scope.products)
                };
            }
        })
        .result.then(function (result) {
            $scope.products = result;
            $scope.loading = false;
            $scope.isEmpty = false;
        });
    };

    //Remove
    $scope.removeItems = function (item, index) {
        debugger;
        $scope.formData.CardItemList.splice(index, 1);
    }

    // Get Total Items
    $scope.getTotalItems = function () {
        return $scope.formData.CardItemList === undefined ? 0 : $scope.formData.CardItemList.length;
    };

    $controller('AbstractAddCtrl', {
        $scope: $scope,
        options: {
            id: 'OnTopCreditCardId',
            url: '/admin/cms/collection',
            item: 'OnTopCreditCard',
            service: OnTopCredit,
            init: function (scope) { },
            onLoad: function (scope, load) {

            },
            onSave: function (scope) {

            }
        }
    });
};
