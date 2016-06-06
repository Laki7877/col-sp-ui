module.exports = function($scope, $controller, SumSKUNotEffectiveService, common, config) {
    'ngInject';
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/sum/skunoteffective',
            service: SumSKUNotEffectiveService,
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

        SumSKUNotEffectiveService.exportCsv(params)
        .then(function (data) {

            util.csv(data, 'SumSKUNotEffective.csv');

        })
    };
    
};