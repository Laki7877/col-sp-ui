module.exports = function($scope, Shop, ImageService) {
  $scope.formData = {
    ShopId: null,
    ShopLogo: {},
    ShopNameEn: null,
    ShopDescriptionEn: null,
    ShopDescriptionTh: null,
    FloatMessageEn: null,
    FloatMessageTh: null,
    ShopAddress: null,
    BankAccountName: null,
    BankAccountNumber: null,
    Facebook: null,
    YouTube: null,
    Instagram: null,
    Pinterest: null,
    GiftWrap: null,
    TaxInvoice: null,
    StockAlert: null,
    Logo: {}
  };

  $scope.loading = true;
  $scope.uploadViewBag = {
    uploader: null,
    images: []
  };

  $scope.uploadViewBag.uploader = ImageService.getUploader('/ShopImages', {
    queueLimit: 1
  });

  ImageService.assignUploaderEvents($scope.uploadViewBag.uploader, $scope.uploadViewBag.images, 1, function() {
    //On Fail
    alert("Failed to upload image");
  });

  $scope.init = function() {

    Shop.getProfile().then(function(data) {
      $scope.formData = data;
      $scope.loading = false;
      if (data.Logo.url) $scope.uploadViewBag.images.push(data.Logo);
    });
  };

  $scope.save = function() {
    $scope.formData.Logo = $scope.uploadViewBag.images[0];
    Shop.saveProfile($scope.formData).then(function(data) {
      console.log(data);
    });
  };
};
