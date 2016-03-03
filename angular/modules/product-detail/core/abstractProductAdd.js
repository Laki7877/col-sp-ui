var angular = require('angular');
angular.module('productDetail').
    controller('AbstractProductAddCtrl', function ($scope, $window, NcAlert, util, common, Product) {
        'ngInject';



        $window.onbeforeunload = function (e) {
            if (!$scope.addProductForm.$dirty) {
                //only warn when form is dirty
                return null;
            }
            var message = "Your changes will not be saved.",
                e = e || window.event;
            // For IE and Firefox
            if (e) {
                e.returnValue = message;
            }

            // For Safari
            return message;
        }; // end onbeforeunload

        $scope.formData = {
            overview: {},
            Brand: {
                id: null
            },
            MasterVariant: {
                DimensionUnit: "MM",
                WeightUnit: "G",
                StockType: "Stock"
            },
            ShippingMethod: "1",
            AttributeSet: {
                AttributeSetTagMaps: []
            },
            RelatedProducts: [],
            MasterImages: [],
            MasterImages360: [],
            VideoLinks: [],
            Variants: [],
            GlobalCategories: [null, null, null],
            LocalCategories: [null, null, null],
            SEO: {
                ProductBoostingWeight: 5000
            },
            ControlFlags: [],
            Keywords: []
        };

        $scope.asStatus = Product.getStatus;
        $scope.isFreeTextInput = util.isFreeTextDataType;
        $scope.isListInput = util.isListDataType;
        $scope.isHtmlInput = util.isHtmlDataType;
        $scope.enableVariation = function () {
            $scope.controlFlags.variation = 'enable';
        };
        $scope.alert = new NcAlert();

        //Variation Factor (lhs) Indices are used as index
        //for ng-repeat in variation tab
        $scope.variationFactorIndices = {
            iterator: [0],
            length: function () {
                return $scope.variationFactorIndices.iterator.length;
            },
            popSecond: function () {
                $scope.variationFactorIndices.length() == 2 && $scope.variationFactorIndices.iterator.pop();
                $scope.dataSet.attributeOptions[1].options = [];
                $scope.dataSet.attributeOptions[1].Attribute = null;
            },
            pushSecond: function () {
                $scope.variationFactorIndices.length() < 2 && $scope.variationFactorIndices.iterator.push(1);
            }
        };


        $scope.image_alert = new NcAlert();
        $scope.dataset = {};
        $scope.dataset.AttributeSets = [{
            AttributeSetId: null,
            disabled: true,
            AttributeSetNameEn: "No Attribute Set"
        }];
        $scope.dataset.GlobalCategories = [];
        $scope.dataset.LocalCategories = [];
        $scope.dataset.Brands = [{
            BrandId: null,
            BrandNameEn: "Input brand by name or ID...",
            disabled: true
        }];

        $scope.enableVariation = function () {
            $scope.controlFlags.variation = 'enable';
        };

        $scope.dataset.SearchTags = [];
        $scope.dataset.RelatedProducts = [];
        $scope.dataset.VariantDisplayOption = [{ text: 'Show as group of variants', value: 'GROUP' }, { text: 'Show as individual product', value: 'INDIVIDUAL' }];

    });