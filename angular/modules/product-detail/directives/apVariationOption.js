var angular = require('angular');
angular.module('productDetail')
    .directive('apVariationOption', function ($rootScope, $templateCache, $compile, $templateOptionsCache, KnownException, $parse, Product, util) {
        return {
            restrict: 'A',
            scope: {
                
            },
            replace: true,
            priority: 1010,
            template: function (element, attrs) {
                var templateHTML = $templateCache.get("ap/section-variation-option");
                return templateHTML;
            },
            link: function (scope, element, attrs, ctrl, transclude) {

            }
        };
    });
