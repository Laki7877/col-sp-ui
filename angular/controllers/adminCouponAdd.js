module.exports = function($scope, $controller, CouponService, config, Brand, Shop, Product) {
  $scope.formData = {
    ExpireDate:  null,
    StartDate: null,
    CouponName: null,
    CouponCode: null,
    StartDate: null,
    ExpireDate: null,
    Status: null,
    Action: {
      Type: null,
      DiscountAmount: 0,
      MaximumAmount: 0
    },
    UsagePerCustomer: 0,
    MaximumUsers: 0,
    Conditions: {
      Order: [{
          Type: null, Value: null
      }],
      FilterBy: [
        {
          Type: null, Value: []
        }
      ],
      Include: [

      ],
      Exclude: [

      ]
    }
  };

  $scope.dataSet = {
    criteria: [{ value: 'None', text: 'No filter' }, { value: 'PriceGT', text: 'The total price is more than..' }],
    filters: [{ value: 'None', text: 'No filter' },
    { text: 'Brand',  value: 'Brand' },
    { text: 'Global Category', value: 'GlobalCategory' },
    { text: 'Shop', value: 'Shop' },
    { text: 'Email', value: 'Email' }],
    Brands : [],
    Products: [],
    Shops: []
  }

  $scope.refreshProducts = function(q){
    Product.list({
        limit: 10,
        order: 'ProductId',
        offset: 0,
        direction: 'asc',
        searchText: (q || '')
    }).then(function (ds) {
        $scope.dataSet.Products = ds.data;
    });
  };

  $scope.refreshShops = function(q){
    Shop.list({
        limit: 10,
        order: 'ShopId',
        offset: 0,
        direction: 'asc',
        searchText: (q || '')
    }).then(function (ds) {
        $scope.dataSet.Shops = ds.data;
    });
  };

  $scope.refreshBrands = function (q) {
      Brand.getAll({
          pageSize: 10,
          searchText: (q || '')
      }).then(function (ds) {
          $scope.dataSet.Brands = ds.data;
      });
  };

  $scope.refreshShops();
  $scope.refreshBrands();
  $scope.refreshProducts();



  $controller('AbstractAddCtrl', {
    $scope: $scope,
    options: {
      id: 'CouponId',
      url: '/admin/coupons/admin',
      item: 'Coupon',
      service: CouponService,
      onLoad: function(scope, load) {

      },
      onSave: function(scope) {

      }
    }
  });

};
