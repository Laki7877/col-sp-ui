module.exports = function ($scope, $controller, OnTopCreditService, config, Brand, Shop, Product) {
    $scope.formData = {
        EffectiveDate: null,
        ExpireDate: null,
        NameTH: null,
        NameEN: null,
        BankNameTH: null,
        BankNameEN: null,
        PromotionCode: null,
        Status: null,
        Action: {
            Type: null,
            MinimumOrderAmount: 0,
            MaximumAmount: 0
        },
        ShortDescriptionTH: null,
        ShortDescriptionEN: null,
        IconURLTH: null,
        IconURLEN: null,
        Conditions: {
            Card: [{ Id: null, Type: null, Value: null}]
        }
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
    { text: 'Email', value: 'Email'}],
        Brands: [],
        Products: [],
        Shops: [],
        datascard: []
    }

    // Item List Arrays
    $scope.items = [];
    $scope.checked = [];

    // Add a Item to the list
    $scope.addItem = function () {
        switch ($scope.formData.Conditions.Card[0].Id) {
            case "15A":
                $scope.formData.Conditions.Card[0].Type = 'American Express - (15 digit)';
                break;
            case "14D":
                $scope.formData.Conditions.Card[0].Type = 'Diners Club - (14 digit)';
                break;
            case "14C":
                $scope.formData.Conditions.Card[0].Type = 'Carte Blanche - (14 digit)';
                break;
            case "16D":
                $scope.formData.Conditions.Card[0].Type = 'Discover - (16 digit)';
                break;
            case "15E":
                $scope.formData.Conditions.Card[0].Type = 'EnRoute - (15 digit)';
                break;
            case "16J":
                $scope.formData.Conditions.Card[0].Type = 'JCB - (16 digit)';
                break;
            case "15J":
                $scope.formData.Conditions.Card[0].Type = 'JCB - (15 digit)';
                break;
            case "16M":
                $scope.formData.Conditions.Card[0].Type = 'Master Card - (16 digit)';
                break;
            case "13V":
                $scope.formData.Conditions.Card[0].Type = 'Visa - (13 digit)';
                break;
            case "16V":
                $scope.formData.Conditions.Card[0].Type = 'Visa - (16 digit)';
                break;
        }
        $scope.items.push({
            Id: $scope.formData.Conditions.Card[0].Id,
            Type: $scope.formData.Conditions.Card[0].Type,
            Value: $scope.formData.Conditions.Card[0].Value
        });

        // Clear input fields after push
        $scope.formData.Conditions.Card[0].Id = "0";
        $scope.formData.Conditions.Card[0].Type = "";
        $scope.formData.Conditions.Card[0].Value = "";
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
            id: 'OnTopCreditCardId',
            url: '/admin/OnTopCreditCardId',
            item: 'OnTopCreditCard',
            service: OnTopCreditService,
            onLoad: function (scope, load) {

            },
            onSave: function (scope) {

            }
        }
    });
};
