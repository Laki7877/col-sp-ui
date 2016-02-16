var angular = require('angular');
angular.module('nc')
    .directive('ncPageTitle', function ($rootScope, $templateCache, $compile, $templateOptionsCache, $parse, KnownException) {
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            priority: 1010,
            scope: {
                option: '=options'
            },
            template: function (element, attrs) {
                var templateHTML = $templateCache.get('partials/page-title');
                if (!templateHTML) {
                    throw new KnownException("Unable to load specified nc-page-title ");
                }
                return templateHTML;
            },
            link: function (scope, element, attrs, ctrl, transclude) {
            	   console.log("nc-page-title"); 
            }
        };
    });