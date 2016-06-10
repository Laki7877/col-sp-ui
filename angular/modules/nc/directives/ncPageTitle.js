// template for rendering page title
var angular = require('angular');
angular.module('nc')
    .directive('ncPageTitle', function ($rootScope, $templateCache, $compile, $templateOptionsCache, $parse, KnownException) {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            priority: 1010,
            scope: {
                title: '@ncTitle',
                topLink: '@?link',
                ngTopLink: '&?ngLink',
                icon: '@icon'
            },
            template: function (element, attrs) {
                var templateHTML = $templateCache.get('partials/page-title');
                if (!templateHTML) {
                    throw new KnownException("Unable to load specified nc-page-title");
                }
                return templateHTML;
            },
            link: function (scope, element, attrs, ctrl, transclude) {
                //title with separator
                scope.breads = scope.title.split('/');
                scope.$watch('title', function(newVal) {
                    if(!_.isNil(newVal))
                        scope.breads = newVal.split('/');
                })
                scope.icon = attrs.icon;
            }
        };
    });
