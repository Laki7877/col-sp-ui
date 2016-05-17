<<<<<<< HEAD
var angular = require('angular');
angular.module('productDetail')
    .directive('apVariationOption', function ($rootScope, 
        $templateCache, $compile, $templateOptionsCache, KnownException, util) {
        return {
            restrict: 'AE',
            scope: {
                variationFactorIndices: '=generator',
                formData: '=formData',
                dataset: '=dataset',
                controlFlags: '=?controlFlags',
                disabled: '&?ngDisabled'
            },
            replace: true,
            priority: 1010,
            template: function (element, attrs) {
                var templateHTML = $templateCache.get("ap/section-variation-option");
                return templateHTML;
            },
            link: function (scope, element, attrs, ctrl) {
                if(!scope.controlFlags){
                    scope.controlFlags = {
                        variation: 'enable'
                    }
                }
                
                var gmz = angular.copy(scope.formData.Variants);

                scope.variationFactorLocked = function(){
                  return  scope.formData.ProductId && (gmz.length > 0);
                }

                scope.isFreeTextInput = util.isFreeTextDataType;
                scope.isListInput = util.isListDataType;
                scope.isHtmlInput = util.isHtmlDataType;
                scope.isCheckboxInput = util.isCheckboxDataType;
                scope.tagTransform = function (newTag) {
                  return {
                    ValueEn: newTag
                  }
                };
            }
        };
    });
=======
var angular = require('angular');
angular.module('productDetail')
    .directive('apVariationOption', function ($rootScope, 
        $templateCache, $compile, $templateOptionsCache, KnownException, util) {
        return {
            restrict: 'AE',
            scope: {
                variationFactorIndices: '=generator',
                formData: '=formData',
                dataset: '=dataset',
                controlFlags: '=?controlFlags'
            },
            replace: true,
            priority: 1010,
            template: function (element, attrs) {
                var templateHTML = $templateCache.get("ap/section-variation-option");
                return templateHTML;
            },
            link: function (scope, element, attrs, ctrl) {
                if(!scope.controlFlags){
                    scope.controlFlags = {
                        variation: 'enable'
                    }
                }

                var gmz = angular.copy(scope.formData.Variants);

                scope.variationFactorLocked = function(){
                  return  scope.formData.ProductId && (gmz.length > 0);
                }

                scope.isFreeTextInput = util.isFreeTextDataType;
                scope.isListInput = util.isListDataType;
                scope.isHtmlInput = util.isHtmlDataType;
                scope.isCheckboxInput = util.isCheckboxDataType;
                scope.tagTransform = function (newTag) {
                  return {
                    ValueEn: newTag
                  }
                };
            }
        };
    });
>>>>>>> col-cms-dev
