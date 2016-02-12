var angular = require('angular');
module.exports = ['$templateCache', '$compile', '$templateOptionsCache', 'KnownException', function ($templateCache, $compile, $templateOptionsCache, KnownException) {
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
            var templateElement = angular.element(templateHTML);/*
      angular.forEach(templateElement[0].attributes, function(attr) {
        originalAttr[attr.name] = attr.value;
      });*/
            return templateHTML;
        },
        link: function (scope, element, attrs, ctrl, transclude) {

            scope.log = function (o) {
                console.log(o);
            };
        }
    };
}];