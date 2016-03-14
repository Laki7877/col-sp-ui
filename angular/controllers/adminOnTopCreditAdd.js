module.exports = function ($scope, $controller, OnTopCredit, config) {
    $scope.formData = {
        OnTopCreditCardId: null,
        NameTH: null,
        NameEN: null,
        EffectiveDate: null,
        ExpiryDate: null,
        BankNameTH: null,
        BankNameEN: null,
        PromotionCode: null,
        PaymentId: null,
        Status: null,
        DiscountType: null,
        DiscountValue: 0,
        MinimumOrderAmount: 0,
        MaximumDiscountAmount: 0,
        FreeShipping: null,
        ShortDescriptionTH: null,
        ShortDescriptionEN: null,
        IconURLTH: null,
        IconURLEN: null,
        Sequence: null,
        Visibility: null,
        CreateIP: null,
        CardItemList: []
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
        { text: 'Email', value: 'Email' }]
    }


    // Add a Item to the list
    $scope.addItem = function () {
        switch ($scope.formData.CardItemList.CreditCardTypeCode) {
            case "15A":
                $scope.formData.CardItemList.CreditCardTypeText = 'American Express - (15 digit)';
                $scope.formData.CardItemList.Digit = 15;
                break;
            case "14D":
                $scope.formData.CardItemList.CreditCardTypeText = 'Diners Club - (14 digit)';
                $scope.formData.CardItemList.Digit = 14;
                break;
            case "14C":
                $scope.formData.CardItemList.CreditCardTypeText = 'Carte Blanche - (14 digit)';
                $scope.formData.CardItemList.Digit = 14;
                break;
            case "16D":
                $scope.formData.CardItemList.CreditCardTypeText = 'Discover - (16 digit)';
                $scope.formData.CardItemList.Digit = 16;
                break;
            case "15E":
                $scope.formData.CardItemList.CreditCardTypeText = 'EnRoute - (15 digit)';
                $scope.formData.CardItemList.Digit = 15;
                break;
            case "16J":
                $scope.formData.CardItemList.CreditCardTypeText = 'JCB - (16 digit)';
                $scope.formData.CardItemList.Digit = 16;
                break;
            case "15J":
                $scope.formData.CardItemList.CreditCardTypeText = 'JCB - (15 digit)';
                $scope.formData.CardItemList.Digit = 15;
                break;
            case "16M":
                $scope.formData.CardItemList.CreditCardTypeText = 'Master Card - (16 digit)';
                $scope.formData.CardItemList.Digit = 16;
                break;
            case "13V":
                $scope.formData.CardItemList.CreditCardTypeText = 'Visa - (13 digit)';
                $scope.formData.CardItemList.Digit = 13;
                break;
            case "16V":
                $scope.formData.CardItemList.CreditCardTypeText = 'Visa - (16 digit)';
                $scope.formData.CardItemList.Digit = 16;
                break;
        }
        $scope.formData.CardItemList.push({
            CreditCardTypeCode: $scope.formData.CardItemList.CreditCardTypeCode,
            CreditCardTypeText: $scope.formData.CardItemList.CreditCardTypeText,
            CreditNumberFormat: $scope.formData.CardItemList.CreditNumberFormat,
            Digit: $scope.formData.CardItemList.Digit,
            Visibility: 1,
            Status: true
        });
        // Clear input fields after push
        $scope.formData.CardItemList.CreditCardTypeCode = "0";
        $scope.formData.CardItemList.CreditCardTypeText = "";
        $scope.formData.CardItemList.CreditNumberFormat = "";

    };

    //Remove
    $scope.removeItems = function (item, index) {
        debugger;
        $scope.formData.CardItemList.splice(index, 1);
    }

    // Get Total Items
    $scope.getTotalItems = function () {
        return $scope.formData.CardItemList.length;
    };



    $controller('AbstractAddCtrl', {
        $scope: $scope,
        options: {
            id: 'OnTopCreditCardId',
            url: '/admin/ontopcredit',
            item: 'OnTopCreditCard',
            service: OnTopCredit,
            init: function (scope) { },
            onLoad: function (scope, load) {

            },
            onSave: function (scope) {

            }
        }
    });
};
