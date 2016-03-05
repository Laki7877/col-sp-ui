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

                scope.isInvalid = function (form) {
                    if (angular.isDefined(form) &&
                        angular.isDefined(form.$invalid) &&
                        angular.isDefined(form.$dirty)) {
                        return form.$invalid && (form.$dirty || form.$$parentForm.$submitted);
                    }
                    return false;
                };

               

                var pathComp;
                var opt = {};
                if (scope.optionsPath) {
                    pathComp = scope.optionsPath.split('/');
                    opt = $templateOptionsCache[pathComp[0]][pathComp[1]];
                }

                if (!opt) {
                    throw new KnownException('Warning: cannot find tab ' + scope.optionsPath);
                    opt = {};
                }

                if (!('error' in opt)) {
                    opt.error = {};
                };

                scope.options = opt;

            }
        };
    });
