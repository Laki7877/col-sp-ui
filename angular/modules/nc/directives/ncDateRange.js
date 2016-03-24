var angular = require('angular');
angular.module('nc')
    .directive('ncDateRange', function ($rootScope, $templateCache, $compile, $templateOptionsCache, KnownException, $parse) {
            return {
                restrict: 'A',
                replace: true,
                priority: 1010,
                scope: {
                    optionsPath: '@ncTemplateOptionsPath',
                    templateField: '&ncTemplateForm',
                    startLabel: '@?ncStartLabel',
                    startDate: '=ncModelStart',
                    endLabel: '@?ncEndLabel',
                    label: '@?ncLabel',
                    endDate: '=ncModelEnd',
                    startMinView: '@ncStartMinView',
                    endMinView: '@ncEndMinView',
                    errorText: '@ncErrorText'
                },
                template: function (element, attrs) {
                    var templateHTML = $templateCache.get(attrs.ncDateRange);
                    if(!templateHTML){
                        throw new KnownException("Unable to load specified nc-daterange template " + attrs.ncDateRange);
                    }
                    return templateHTML;
                },
                link: function (scope, element, attrs, ctrl, transclude) {
                    var pathComp
                    var opt = {};
                    scope.disabled = false;
                    if(!_.isNil(attrs.disabled)) {
                        scope.disabled = true;
                    }
                    if(scope.optionsPath){
                        pathComp = scope.optionsPath.split('/');
                        opt = $templateOptionsCache[pathComp[0]][pathComp[1]];
                    }

                    if (!opt) {
                        throw new KnownException('Warning: nc-date-range cannot find ' + scope.optionsPath);
                        opt = {};
                    }

                    if(!('error' in opt)){
                        opt.error = {};
                    };
                    scope.isInvalid = function(form) {
                        if(angular.isDefined(form) &&
                            angular.isDefined(form.$invalid) &&
                            angular.isDefined(form.$dirty)) {
                            return form.$invalid && (form.$dirty || form.$$parentForm.$submitted);
                        }
                        return false;
                    };                    
                    scope.options = opt;
                    scope.config1 = { dropdownSelector: '#date_range_vertical_dropdown1', minView: (scope.startMinView || 'hour') }
                    scope.config2 = { dropdownSelector: '#date_range_vertical_dropdown2', minView: (scope.endMinView || 'hour') }
                }
            };
        });
