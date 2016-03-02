angular.module('nc')
    .directive('ncPageTitle', function ($templateCache) {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            priority: 1010,
            scope: {
                title: '@ncTitle'
            },
            template: function (element, attrs) {
                var templateHTML = $templateCache.get('partials/page-title.html');
                return templateHTML;
            }
        };
    });