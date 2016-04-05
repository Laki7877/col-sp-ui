angular.module('nc')
	.directive('ncBindCompile', function($compile, $templateCache) {
       return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.ncBindCompile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        };
	})
    .directive('ncBindTemplate', function($compile, $templateCache) {
       return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.ncBindTemplate);
                }, function (value) {
                    var content = $templateCache.get(value);
                    element.html(content);
                    $compile(element.contents())(scope);
                });
            }
        };
    });