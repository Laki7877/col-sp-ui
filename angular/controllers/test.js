module.exports = function($scope, Product) {
    'ngInject';

    $scope.querySearch = function(q) {
        console.log('querySearch', q);
        return Product.list({
            _order: 'ProductId',
            _limit: 5,
            searchText: q,
            _direction: 'asc',
            _filter: 'ALL',
            _offset: 0
        }).then(function(res) {
            $scope.choices = res.data;
            return res.data || [];
        });
    };
    $scope.cacheEnable = true;

    $scope.myModel = 1;

    $scope.choices = [];

    $scope.myConfig = {
        create: true,
        valueField: 'id',
        labelField: 'title',
        delimiter: '|',
        placeholder: 'Pick something',
        onInitialize: function(selectize) {
            // receives the selectize object as an argument
        }
        // maxItems: 1
    };

}
