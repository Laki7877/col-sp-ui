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
                scope._apNavTabs  = [
                    {id: 'information' , name: 'Information', class: 'require active'},
                    {id: 'images', name: 'Images', class: 'require'},
                    {id: 'category', name: 'Category', class: ''},
                    {id: 'moreoption', name: 'More Options', class: ''},
                    {id: 'variation', name: 'Variation', class: ''}
                ];
                
            }
        };
    })
    .directive('apFieldsetUnlock', function($timeout){
         return {
            restrict: 'A',
            transclude: false,
            scope: { unlockList : '=apFieldsetUnlock', lockCondition: '&apFieldsetLockOn' },
            replace: true,
            priority: 1010,
            link: function (scope, elem, attrs, ctrl, transclude) {
                $timeout(function() {
                    console.log(scope.unlockList);
                    var inputSelectList = elem[0].querySelectorAll('input, select');                    
                    for(var i = 0; i < inputSelectList.length; i++){
                        // console.log('element', inputSelectList[i].name);
                        console.log(scope.lockCondition(), 'lockCondition');
                        if(scope.lockCondition() && !scope.unlockList.includes(inputSelectList[i].name)){
                            inputSelectList[i].disabled = true;
                        }
                    }
                });
            }
        };
    });