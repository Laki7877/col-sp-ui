module.exports = function ($scope, $controller, CMSMasterService, config) {
    $scope.formData = {
        CMSMasterNameEN: null
      ,CMSMasterNameTH: null
      ,CMSMasterURLKey: null
      ,CMSType: null
      ,CMSMasterEffectiveDate: null
      ,CMSMasterEffectiveTime: null
      ,CMSMasterExpiryDate: null
      ,CMSMasterExpiryTime: null
      ,CMSMasterTotal: null
      ,ShortDescriptionTH: null
      ,LongDescriptionTH: null
      ,ShortDescriptionEN: null
      ,LongDescriptionEN: null
      ,Sequence: null
      ,CMSMasterStatusId: null
      ,LinkToOutside: null
      ,IsCampaign: null
      ,CategoryId: null
      ,Brand: null
      ,MinPrice: 0
      ,MaxPrice: 0
      ,Status: null
      ,Visibility: null
      ,CreateBy: null
      ,Createdate: null
      ,UpdateBy: null
      ,UpdateDate: null
      ,CreateIP: null
      ,UpdateIP: null
    };
  
    /*
    '*CARD TYPES            *PREFIX           *WIDTH
    'American Express       34, 37            15
    'Diners Club            300 to 305, 36    14
    'Carte Blanche          38                14
    'Discover               6011              16
    'EnRoute                2014, 2149        15
    'JCB                    3                 16
    'JCB                    2131, 1800        15
    'Master Card            51 to 55          16
    'Visa                   4                 13, 16
    */
    $scope.dataSet = {
        criteria: [{ value: '0', text: 'Not Set' },
    { value: '15A', text: 'American Express - (15 digit)' },
    { value: '14D', text: 'Diners Club - (14 digit)' },
    { value: '14C', text: 'Carte Blanche - (14 digit)' },
    { value: '16D', text: 'Discover - (16 digit)' },
    { value: '15E', text: 'EnRoute - (15 digit)' },
    { value: '16J', text: 'JCB - (16 digit)' },
    { value: '15J', text: 'JCB - (15 digit)' },
    { value: '16M', text: 'Master Card - (16 digit)' },
    { value: '13V', text: 'Visa - (13 digit)' },
    { value: '16V', text: 'Visa - (16 digit)' },
        ],
        filters: [{ value: 'None', text: 'No filter' },
    { text: 'Brand', value: 'Brand' },
    { text: 'Global Category', value: 'GlobalCategory' },
    { text: 'Shop', value: 'Shop' },
    { text: 'Email', value: 'Email'}]
    }

    // Item List Arrays
    $scope.items = [{
        CreditCardTypeCode: null,
        CreditCardTypeText: null,
        CreditNumberFormat: null,
        Digit: null,
        Visibility: 1,
        Status: true
    }];
    // Add a Item to the list
    $scope.addItem = function () {
        switch ($scope.items.CreditCardTypeCode) {
            case "15A":
                $scope.items.CreditCardTypeText = 'American Express - (15 digit)';
                $scope.items.Digit = 15;
                break;
            case "14D":
                $scope.items.CreditCardTypeText = 'Diners Club - (14 digit)';
                $scope.items.Digit = 14;
                break;
            case "14C":
                $scope.items.CreditCardTypeText = 'Carte Blanche - (14 digit)';
                $scope.items.Digit = 14;
                break;
            case "16D":
                $scope.items.CreditCardTypeText = 'Discover - (16 digit)';
                $scope.items.Digit = 16;
                break;
            case "15E":
                $scope.items.CreditCardTypeText = 'EnRoute - (15 digit)';
                $scope.items.Digit = 15;
                break;
            case "16J":
                $scope.items.CreditCardTypeText = 'JCB - (16 digit)';
                $scope.items.Digit = 16;
                break;
            case "15J":
                $scope.items.CreditCardTypeText = 'JCB - (15 digit)';
                $scope.items.Digit = 15;
                break;
            case "16M":
                $scope.items.CreditCardTypeText = 'Master Card - (16 digit)';
                $scope.items.Digit = 16;
                break;
            case "13V":
                $scope.items.CreditCardTypeText = 'Visa - (13 digit)';
                $scope.items.Digit = 13;
                break;
            case "16V":
                $scope.items.CreditCardTypeText = 'Visa - (16 digit)';
                $scope.items.Digit = 16;
                break;
        }
        $scope.items.push({
            CreditCardTypeCode: $scope.items.CreditCardTypeCode,
            CreditCardTypeText: $scope.items.CreditCardTypeText,
            CreditNumberFormat: $scope.items.CreditNumberFormat,
            Digit: $scope.items.Digit,
            Visibility: 1,
            Status: true
        });
        $scope.formData.CardItemList = $scope.items;
        // Clear input fields after push
        $scope.items.CreditCardTypeCode = "0";
        $scope.items.CreditCardTypeText = "";
        $scope.items.CreditNumberFormat = "";

        
    };

    //Remove
    $scope.removeItems = function (item, index) {
        debugger;
        $scope.items.splice(index, 1);
    }

    // Get Total Items
    $scope.getTotalItems = function () {
        return $scope.items.length;
    };



    $controller('AbstractAddCtrl', {
        $scope: $scope,
        options: {
            id: 'CMSMasterId',
            url: '/admin/cms/master/',
            item: 'CMS Master',
            service: CMSMasterService,
            init: function(scope) {	},
            onLoad: function (scope, load) {

            },
            onSave: function (scope) {

            }
        }
    });
};
