var angular = require('angular');
angular.module('nc')
    .directive('ncTemplate', function ($rootScope, $templateCache, $compile, $templateOptionsCache, KnownException,  $parse, KnownException) {
            return {
                restrict: 'A',
                transclude: true,
                replace: true,
                priority: 1010,
                scope: {
                    optionsPath: '@ncTemplateOptionsPath',
                    templateField: '&?ncTemplateForm',
                    viewBag: '=?ncViewBag',
                    label: '@ncLabel'
                },
                template: function (element, attrs) {
                    var templateHTML = $templateCache.get(attrs.ncTemplate);
                    if(!templateHTML){
                        throw new KnownException("Unable to load specified nc-template " + attrs.ncTemplate);
                    }
                    return templateHTML;
                },
                link: function (scope, element, attrs, ctrl, transclude) {


                    scope.isInvalid = function(form) {
                        if(angular.isDefined(form) &&
                            angular.isDefined(form.$invalid) &&
                            angular.isDefined(form.$dirty)) {
                            return form.$invalid && (form.$dirty || form.$$parentForm.$submitted);
                        }
                        return false;
                    };

                    var pathComp
                    var opt = {};
                    if(scope.optionsPath){
                        pathComp = scope.optionsPath.split('/');
                        opt = $templateOptionsCache[pathComp[0]][pathComp[1]];
                    }


                    if (!opt) {
                        throw new KnownException('Warning: nc-template cannot find ' + scope.optionsPath);
                        opt = {};
                    }

                    if(!('error' in opt)){
                        opt.error = {};
                    };

                    scope.options = opt;

                }
            };
        });
