module.exports = function ($scope, $controller, Buy1Get1Service, config, $rootScope) {
    'ngInject';
    // seller
    $scope.manageBuy1Get1SE = !$rootScope.permit(54);  
    // shop
    $scope.manageBuy1Get1SH = !$rootScope.permit(70);    
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/buy1get1',
            service: Buy1Get1Service,
            item: 'Buy 1 Get 1',
            order: 'UpdateDate',
            id: 'PromotionBuy1Get1ItemId',
            actions: ['View', 'Delete'],
            bulks: ['Delete'],
            filters: [
				{ name: "All", value: 'All' },
				{ name: "Approved", value: 'Approved' },
				{ name: "Not Approved", value: 'NotApproved' },
				{ name: "Wait For Approved", value: 'WaitForApproved' },
				{ name: "Draft", value: 'Draft' }
            ]
        }
    });
    //$scope.statusDropdown = config.PRODUCT_STATUS;

};