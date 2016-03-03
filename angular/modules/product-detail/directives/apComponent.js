var angular = require('angular');
angular.module('productDetail')
    .directive('apComponent', function ($rootScope, $templateCache, $compile, $templateOptionsCache, KnownException, $parse, Product, util) {
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            priority: 1010,
            scope: {
                formData: '=formData',
                breadcrumb: '=?breadcrumb',
                controlFlags: '=?controlFlags',
                dataset: '=dataset'
            },
            template: function (element, attrs) {
                var templateHTML = $templateCache.get(attrs.apComponent);
                if (!templateHTML) {
                    throw new KnownException("Unable to load specified tab template " + attrs.apComponent);
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

                scope.asStatus = Product.getStatus;
                scope.isFreeTextInput = util.isFreeTextDataType;
                scope.isListInput = util.isListDataType;
                scope.isHtmlInput = util.isHtmlDataType;

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
