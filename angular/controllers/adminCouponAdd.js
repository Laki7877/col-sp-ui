module.exports = function($scope, $controller, CouponService, config, Brand) {
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
          Type: null, Value: null
        }
      ],
      Include: [

      ],
      Exclude: [

      ]
    }
  };

  $scope.refreshBrands = function (q) {
      if (q == "" || !q || q == null) return;
      $scope.dataSet.Brands = [{
          BrandId: -1,
          BrandNameEn: "Searching..",
          disabled: true
      }];

      Brand.getAll({
          pageSize: 10,
          searchText: q
      }).then(function (ds) {
          $scope.dataSet.Brands = ds.data;
      });
  };

  $scope.dataSet = {
    criteria: [{ value: 'None', text: 'No filter' }, { value: 'PriceGT', text: 'The total price is more than..' }],
    filters: [{ value: 'None', text: 'No filter' },
    { text: 'Brand',  value: 'Brand' },
    { text: 'Global Category', value: 'GlobalCategory' },
    { text: 'Shop', value: 'Shop' },
    { text: 'Email', value: 'Email' }],
    Brands : []
  }

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
