var angular = require('angular');
angular.module('umeSelect')
    .directive('umeSingle', function ($rootScope, $templateCache, $compile, $timeout) {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                model: '=ngModel',
                placeholder: '@?placeholder',
                choices: '=choices',
                delay: '@?delay',
                refresh: '=refresh'
            },
            replace: true,
            priority: 1010,
            template: function (element, attrs) {
                var templateHTML = $templateCache.get('ume/single');
                return templateHTML;
            },
            link: function (scope, element, attrs, ctrl, transclude) {

                scope.loading = false;

                if(!scope.delay){
                    scope.delay = 500;
                }

                scope.delay = Number(scope.delay);
                scope.notFound = false;

                var effectiveText = '', searchTextTimeout;
                var prevQ = '';
                scope.$watch('searchText', function () {
                    if(scope.searchText == "" || !scope.searchText) return;
                    if (scope.delay){
                        $timeout.cancel(scope.delay);
                    }
                    console.log("Loading..", scope.searchText);

                    searchTextTimeout = $timeout(function() {                        
                        //If this is same as previous request, dont do it
                        if(prevQ == scope.searchText) return; 

                        //execute search
                        scope.loading = true;

                        prevQ = scope.searchText;
                        scope.refresh(scope.searchText).then(function(){
                            scope.loading = false;
                            scope.notFound = (scope.choices.length == 0);
                        });

                    }, 500); // delay 250 ms
                })

                scope.state = {
                    open : false,
                    disabled: true 
                };

                if(!scope.placeholder) scope.placeholder = "Select one..";
                scope.open = function(){
                    scope.state.open = true;
                }
            }
        };
    });
