var angular = require('angular');
angular.module('umeSelect')
    .directive('youMe', function ($rootScope, $templateCache, $compile, $timeout) {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                model: '=ngModel',
                placeholder: '@?placeholder',
                choices: '=choices',
                delay: '@?delay',
                autoClearSearch: '=?autoClearSearch',
                refresh: '=refresh',
                inRelationship: '=inRelationship'
            },
            replace: true,
            priority: 1010,
            template: function (element, attrs) {
                var tmpl = 'ume/single';
                if(attrs.inRelationship){
                    tmpl = 'ume/relationship';
                }
                var templateHTML = $templateCache.get(tmpl);
                return templateHTML;
            },
            link: function (scope, element, attrs, ctrl, transclude) {
                scope.focused = false;
                scope.loading = false;
                scope.searchText = "";
                scope.highlightedIndex = 0;

                var _id = (new Date()).getTime()*Math.random() + "R";
                scope._id =  _id;

                scope.breakUp = function(index){
                    if(!scope.inRelationship) {
                        //You can only break up when you re in relationship
                        return;
                    }

                    scope.model.splice(index, 1);
                }

                scope.keyDown = function(evt){
                    if(evt.code == "ArrowDown"){
                        scope.highlightedIndex++;
                    }else if(evt.code == "ArrowUp"){
                        scope.highlightedIndex--;
                    }else if(evt.code == "Enter"){
                        console.log("Keydown on id", scope._id);
                        if(scope.searchText == "") return;
                        $timeout(function (){
                            scope.$emit('focusLost', _id);
                            scope.pickItem(scope.choices[scope.highlightedIndex]);
                        }, 250);
                    }else if(evt.code == "Backspace"){

                        if(scope.searchText.length > 0) return;

                        if(scope.model.length > 0) scope.model.pop();
                    }

                    if(scope.highlightedIndex >= scope.choices.length){
                        scope.highlightedIndex = scope.choices.length - 1;
                    }

                    if(scope.highlightedIndex <= 0){
                        scope.highlightedIndex = 0;
                    }
                }

                scope.blur = function(){
                    scope.focused = false;
                }

                scope.focus = function(broadcast){
                    scope.focused=true;
                    if(broadcast){
                        $timeout(function (){
                            scope.$emit('focusObtained', _id);
                        }, 250);
                    }
                }

                if(!scope.delay){
                    scope.delay = 500;
                }

                scope.delay = Number(scope.delay);
                scope.notFound = false;

                var effectiveText = '', searchTextTimeout;
                var prevQ = {};
                scope.$watch('searchText', function () {
                    if(scope.searchText == "" || !scope.searchText) return;
                    if (scope.delay){
                        $timeout.cancel(scope.delay);
                    }

                    searchTextTimeout = $timeout(function() {                        
                        //If this is same as previous request, dont do it
                        var curDate = new Date();
                        var tooShort = ((curDate - prevQ.ts) < 3000);
                        var previousWasntEmpty = (scope.choices.length > 0);
                        if(prevQ.searchText == scope.searchText 
                            && tooShort && previousWasntEmpty) return; 

                        //execute search
                        scope.loading = true;

                        prevQ.ts = new Date();
                        prevQ.searchText = scope.searchText;
                        scope.refresh(scope.searchText).then(function(){
                            scope.loading = false;
                            scope.notFound = (scope.choices.length == 0);
                        });

                    }, 500); // delay 250 ms
                })

                scope.pickItem = function(item){
                    if(!item) return;
                    if(scope.inRelationship){
                        scope.model.push(item);
                        scope.focus(true);
                        scope.searchText = "";
                        scope.choices = [];
                    }else{
                        scope.model = item;
                        scope.focused = false;
                    }
                    

                    if(scope.autoClearSearch){
                        scope.searchText = "";
                        //TODO: Note this will not work well with
                        //hardcoded list
                        scope.choices = [];
                    }
                }

                if(!scope.placeholder) scope.placeholder = "Select one..";
            }
        };
    });
