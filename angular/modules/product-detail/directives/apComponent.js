var angular = require('angular');
angular.module('productDetail')
    .directive('apComponent', function ($rootScope, $templateCache, $compile, $templateOptionsCache, KnownException, $parse, Product, util) {
        return {
            restrict: 'A',
            transclude: true,
            scope: false,
            replace: true,
            priority: 1010,
            template: function (element, attrs) {
                var templateHTML = $templateCache.get(attrs.apComponent);
                if (!templateHTML) {
                    throw new KnownException("Unable to load specified ap component " + attrs.apComponent);
                }
                return templateHTML;
            },
            link: function (scope, element, attrs, ctrl, transclude) {

            }
        };
    });
