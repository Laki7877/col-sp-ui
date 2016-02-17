module.exports = function ($scope, Shop) {
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
        StockAlert: null
    };

    $scope.init = function(viewBag){
        $scope.formData.ShopId = viewBag.id;
        Shop.get(viewBag.id).then(function(data){
            console.log(data);
        });
    };
    
    $scope.save = function () {
        Shop.save($scope.formData).then(function(data){
            console.log(data);
        });
    };
};