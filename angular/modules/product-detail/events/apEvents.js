var angular = require('angular');
angular.module('productDetail')
.factory('APOriginalPriceChangeEvent', function() {
  return function($scope){
    return function(){
      var form = $scope.form;
      if (form.OriginalPrice) form.OriginalPrice.$setValidity('min', true);
      if ($scope.variantPtr.SalePrice == '') return;
      if ($scope.variantPtr.OriginalPrice == '') return;
      if (Number($scope.variantPtr.SalePrice) > Number($scope.variantPtr.OriginalPrice)) {
        if (form.OriginalPrice) form.OriginalPrice.$setValidity('min', false)
        form.OriginalPrice.$error['min'] = 'Original Price must be higher than Sale Price';
        form.OriginalPrice.$setDirty(true);
      }
    }
  }
})
.factory('APPromotionalPriceChangeEvent', function(){
  return function($scope){
    return function() {
      var form = $scope.form;
      if (form.PromotionPrice) {
        form.PromotionPrice.$setValidity('max', true);
      }
      if (!form.PromotionPrice) return;

      if (Number($scope.variantPtr.SalePrice) <= Number($scope.variantPtr
          .PromotionPrice)) {
        if (form.PromotionPrice) {
          form.PromotionPrice.$setValidity('max', false)
        }
        form.PromotionPrice.$error['max'] = 'Promotion Price must be lower than Sale Price'
      }
    }
  }
})
.factory('APExpireDateChangeEvent', function(){
  return function($scope){
    return function() {
      // TODO: refactor use nctemplate
      var form = $scope.addProductForm;
      if (form.EffectiveDate == null) {
        return
      }
      if (form.ExpireDate) form.ExpireDate.$setValidity('min', true)
      if ($scope.formData.ExpireDate < $scope.formData.EffectiveDate) {
        if (!form.ExpireDate) return;
        if (form.ExpireDate) form.ExpireDate.$setValidity('min', false);
        form.ExpireDate.$error['min'] =
          'Effective date/time must come before expire date/time';
      }
    };
  }
})
