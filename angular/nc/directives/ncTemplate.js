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
                    templateField: '&ncTemplateForm',
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

                    var pathComp = scope.optionsPath.split('/');
                    var opt = $templateOptionsCache[pathComp[0]][pathComp[1]];
                    // console.log("Loading ", opt, scope.templateField());   
                    
                    if (!opt) {
                        throw new KnownException('cannot find ' + scope.optionsPath);
                    }
            
                    if(!('error' in opt)){
                        opt.error = {};
                    };
                  
                    scope.options = opt;
                    
                }
            };
        });