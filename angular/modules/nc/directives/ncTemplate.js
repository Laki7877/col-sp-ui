/**
 * Template object
 */
var angular = require('angular');
angular.module('nc')
    .directive('ncTemplate', function ($rootScope, $templateCache, $compile, $templateOptionsCache, KnownException,  $parse) {
            return {
                restrict: 'A',
                transclude: true,
                replace: true,
                priority: 1010,
                scope: {
                    optionsPath: '@ncTemplateOptionsPath',
                    options: '=?ncTemplateOptions',
                    templateField: '&ncTemplateForm',
                    viewBag: '=?ncViewBag',
                    label: '@ncLabel'
                },
                template: function (element, attrs) {
                    // render template from html attributes
                    var templateHTML = $templateCache.get(attrs.ncTemplate);
                    if(!templateHTML){
                        throw new KnownException("Unable to load specified nc-template " + attrs.ncTemplate);
                    }
                    return templateHTML;
                },
                link: function (scope, element, attrs, ctrl, transclude) {
                    // check form validator
                    scope.isInvalid = function(form) {
                        if(angular.isDefined(form) && form.$error.required && form.$dirty) return true;
                        if(angular.isDefined(form) &&
                            angular.isDefined(form.$invalid) &&
                            angular.isDefined(form.$dirty)) {
                            return form.$invalid && (form.$dirty  || form.$$parentForm.$submitted);
                        }
                        return false;
                    };

                    var pathComp
                    var opt = {};

                    // get options from .json
                    if(scope.optionsPath){
                        pathComp = scope.optionsPath.split('/');
                        opt = $templateOptionsCache[pathComp[0]][pathComp[1]];
                    } else if(scope.options) {
                        opt = scope.options;
                    }


                    if (!opt) {
                        throw new KnownException('Warning: nc-template cannot find ' + scope.optionsPath);
                        opt = {};
                    }

                    // console.log('opt', scope.optionsPath, opt)
                    if(!('error' in opt)){
                        opt.error = {};
                    };

                    if(scope.optionsPath == 'searchForm/Price') {
                        console.log(scope.templateField());
                    }

                    scope.options = opt;

                }
            };
        });
