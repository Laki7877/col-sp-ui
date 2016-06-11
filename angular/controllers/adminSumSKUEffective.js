module.exports = function($scope, $controller, SumSKUEffectiveService, common, config) {
    'ngInject';
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/sum/skueffective',
            service: SumSKUEffectiveService,
            item: 'SKU',
            order: 'Category',
            id: 'Category',
            filters: [
                { name: "All", value: 'All'},
                { name: "Stock", value: 'Stock'},
                { name: "Out Of Stock", value: 'OutOfStock'},
            ]
        }
    });
    $scope.export = function () {
        //debugger;

        SumSKUEffectiveService.exportCsv(params)
        .then(function (data) {

            util.csv(data, 'SumSKUEffective.csv');

        })
    };
    
};