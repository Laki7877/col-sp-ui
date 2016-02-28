module.exports = function($rootScope, $scope, Shop, ImageService, NcAlert, config, storage) {
  $scope.alert = new NcAlert();

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
    GiftWrap: 'NotAvailable',
    TaxInvoice: 'NotAvailable',
    StockAlert: null,
    Logo: {}
  };

  $scope.loading = true;
  $scope.uploadViewBag = {
    uploader: null,
    images: []
  };
  $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;

  $scope.uploadViewBag.uploader = ImageService.getUploader('/ShopImages', {
    queueLimit: 1
  });

  ImageService.assignUploaderEvents($scope.uploadViewBag.uploader, $scope.uploadViewBag.images, 1, function() {
    //On Fail
    alert("Failed to upload image");
  });

  $scope.init = function() {

    Shop.getProfile().then(function(data) {
      console.log(data);
      $scope.formData = Shop.deserialize(data);
      $scope.loading = false;
      if (data.Logo.url) $scope.uploadViewBag.images.push(data.Logo);
    });
  };

  $scope.save = function() {
    $scope.formData.Logo = $scope.uploadViewBag.images[0];
    $scope.alert.close();
    Shop.saveProfile(Shop.serialize($scope.formData)).then(function(data) {
      $scope.formData = Shop.deserialize(data); 
      if (data.Logo.url) {
        $scope.uploadViewBag.images.pop();
        $scope.uploadViewBag.images.push(data.Logo);
      }
      $scope.alert.success('Saved Profile Successfully');
      $rootScope.Profile.Shop.Status = data.Status;
      storage.storeCurrentUserProfile($rootScope.Profile, true);
    }, function(err) {
      $scope.alert.error(common.getError(err));
    });
  };
};
