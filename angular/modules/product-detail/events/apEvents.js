var angular = require('angular');
angular.module('productDetail')
.factory('APImageUploadFailEvent', function(common){
  return function(image_alert, IMAGE_DIM_BOUND){
    return function(kwd, data){
      if (kwd == "onmaxsize") {
        image_alert.error('Cannot exceed ' + data + ' images for each product.');
      } else if (kwd == "ondimension") {
        image_alert.error('Image dimension must be between ' +
          IMAGE_DIM_BOUND[0][0] + 'x' +
          IMAGE_DIM_BOUND[0][1] + ' and ' +
          IMAGE_DIM_BOUND[1][0] + 'x' + IMAGE_DIM_BOUND[1][1] +
          '. <strong>Your Image Size is ' + data[0] + "x" + data[1] +
          '</strong>');
      } else if (kwd == "ondisable") {
        image_alert.error('You do not have permission to upload images.');
      } else if (kwd == "onsquare") {
        image_alert.error('Image must be a square (1:1 ratio).');
      } else if (kwd == 'onfilesize') {
        image_alert.error('Each image file size must not exceed 5MB')
      } else {
        image_alert.error(data);
      }
    };
  }

  return APEvent;
})
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
