angular.module('colsp.core')
    .directive('ngTemplate', function ($templateCache, $compile) {
        var originalAttr = {};
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            priority: 1010,
            scope: {
                options: '=ngTemplateOptions'
            },
            template: function (element, attrs) {
                var templateHTML = $templateCache.get(attrs.ngTemplate);
                var templateElement = angular.element(templateHTML);
                return templateHTML;
            }
        };
    });