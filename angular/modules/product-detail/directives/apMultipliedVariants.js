var angular = require('angular');
angular.module('productDetail')
    .directive('apMultipliedVariants', function ($rootScope, 
        $templateCache, $compile, $templateOptionsCache, KnownException, util) {
        return {
            restrict: 'AE',
            transclude: true,
            scope: false,
            replace: true,
            priority: 1010,
            template: function (element, attrs) {
                var templateHTML = $templateCache.get("ap/section-variant");
                return templateHTML;
            },
            link: function (scope, element, attrs, ctrl) {
                
            }
        };
    });
