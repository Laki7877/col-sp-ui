var angular = require('angular');
angular.module('umeSelect')
    .directive('youMe', function ($rootScope, $templateCache, $compile, $timeout, $filter) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            transclude: true,
            scope: {
                model: '=ngModel',
                placeholder: '@?placeholder',
                originalChoices: '&choices',
                delay: '@?delay',
                autoClearSearch: '=?autoClearSearch',
                refresh: '=refresh',
                inRelationship: '=?inRelationship',
                itsComplicated: '=?itsComplicated',
                displayBy: '@displayBy',
                freedomOfSpeech: '=freedomOfSpeech',
                groupBy: '@?groupBy',
                initialChoices: '=?initialChoices',
                hideIcon: '=?hideIcon',
                disabled: '&?ngDisabled'
            },
            replace: true,
            priority: 1010,
            template: function (element, attrs) {
                var tmpl = 'ume/single';
                if(attrs.inRelationship || attrs.itsComplicated){
                    tmpl = 'ume/multiple';
                }
                var templateHTML = $templateCache.get(tmpl);
                return templateHTML;
            },
            link: function (scope, element, attrs, ngModel, transclude) {
                
                //text user types in searchbox
                scope.searchText = "";
                //index of currently highlighted choice
                scope.highlightedIndex = 0;
                //choices
                scope.choices = [];

                //State variables
                scope.E_STATE = null;
                var STATE_MAXTAGBLOCKED = 1;
                scope.focused = false;
                scope.loading = false;

                //Don't reset model on error, I will handle this manually
                ngModel.$options = { allowInvalid: true }

                //Listen for any change in error state
                scope.$watch('[model, E_STATE]', function(value){
                    ngModel.$setViewValue(value[0]);
                    ngModel.$setDirty();
                    ngModel.$validate();
                }, true);

                var maxTagCount = undefined;
                var maxLengthPerTag = undefined;
                var tagPattern = undefined;

                attrs.$observe('maxTagCount', function(val) {
                    maxTagCount = val;
                    ngModel.$validate();
                });

                attrs.$observe('maxLengthPerTag', function(val) {
                    maxLengthPerTag = val;
                    ngModel.$validate();
                });

                attrs.$observe('tagPattern', function(val) {
                    tagPattern = val;
                    ngModel.$validate();
                });

                ngModel.$validators.maxTagCount = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    if(scope.E_STATE == STATE_MAXTAGBLOCKED) return false;
                    return !maxTagCount || !value || (value.length <= maxTagCount);
                };

                scope.$watchCollection('originalChoices()', function(data){
                    var sortedData = data;
                    var seenGroup = new Set();

                    if(scope.groupBy){
                        seenGroup.clear();
                        sortedData = _.sortBy(data, function(o) { return _.get(o, scope.groupBy); });
                        sortedData = sortedData.map(function(d){
                            var groupName = _.get(d, scope.groupBy);
                            if(!seenGroup.has(groupName)){
                                seenGroup.add(groupName);
                            }else{
                                delete d[scope.groupBy];
                            }

                            return d;
                        });
                    }
                    
                    scope.choices = sortedData;
                });

                var _id = (new Date()).getTime()*Math.random() + "R";
                scope._id =  _id;

                scope.breakUp = function(index){
                    if(!scope.inRelationship && !scope.itsComplicated) {
                        //You can only break up when you re in relationship
                        console.log('You can only break up when you re in relationship or when its complicated')
                        return;
                    }

                    scope.model.splice(index, 1);
                }

                scope.forceFocus = function(){
                    scope.$emit('focusObtained', _id);
                }

                scope.tagify = function(tagValue){
                    var X = {};
                    if(!scope.displayBy) return tagValue;
                    _.set(X, scope.displayBy, tagValue);
                    return X;
                }

                if(scope.itsComplicated){
                    scope.choices.unshift(scope.tagify('New Tag'));
                }

                scope.itemValue = function(item){
                    if(!scope.displayBy) return item;
                    return _.get(item, scope.displayBy);
                }

                scope.keyDown = function(evt){

                    if(evt.code == "ArrowDown" || evt.keyCode == 40){
                        scope.highlightedIndex++;
                    }else if(evt.code == "ArrowUp" || evt.keyCode == 38){
                        scope.highlightedIndex--;
                    }else if(evt.code == "Enter" || evt.code == "Comma" || evt.keyCode == 13 || evt.keyCode == 188){
                        // console.log("Keydown on id", scope._id);
                        if(scope.searchText == "") return;

                        $timeout(function (){
                            scope.$emit('focusLost', _id);
                            var K = $filter('filter')(scope.choices, scope.searchText);
                            var result= scope.pickItem(K[scope.highlightedIndex]);
                            if(!result){
                                scope.$emit('focusObtained', _id);
                            }
                        });

                    }else if(evt.code == "Backspace" || evt.keyCode == 8){
                        if(scope.searchText.length > 0) return;
                        scope.E_STATE = null;
                        if(_.isArray(scope.model) && scope.model.length > 0) scope.model.pop();
                    }

                    if(scope.highlightedIndex >= scope.choices.length){
                        scope.highlightedIndex = scope.choices.length - 1;
                    }

                    if(scope.highlightedIndex <= 0){
                        scope.highlightedIndex = 0;
                    }
                }

                scope.blur = function(){
                    $timeout(function(){
                        scope.focused = false;
                    }, 500)
                }

                scope.focus = function(broadcast){
                    scope.focused=true;
                    if(broadcast){
                        $timeout(function (){
                            scope.$emit('focusObtained', _id);
                        });
                    }
                }

                if(!scope.delay){
                    scope.delay = 500;
                }

                scope.delay = Number(scope.delay);
                scope.notFound = false;

                var effectiveText = '', searchTextTimeout;
                var prevQ = {};
                var loadQ = [];
                scope.$watch('searchText', function () {

                    if(!scope.itsComplicated) {
                        //when its complicated, you are out of options
                        scope.choices = []; 
                    }

                    if(scope.itsComplicated && scope.freedomOfSpeech){
                        scope.choices[0] = scope.tagify(scope.searchText);
                    }
                    
                    scope.highlightedIndex = 0;


                    if(!scope.refresh) return;
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
                        try{
                            scope.refresh(scope.searchText).then(function(){
                                loadQ.pop();
                                scope.loading = false;
                                scope.notFound = (scope.choices.length == 0);
                            });
                        }catch(ex){
                            //Ugh
                        }

                    }, 500); // delay 250 ms
                })

                scope.pickItem = function(item){

                    var finishListModel = function(){
                        scope.focus(true);
                        scope.searchText = "";

                        if(!scope.itsComplicated){
                            scope.choices = [];
                        }
                    };

                    var finishSingleModel = function(){
                        scope.focused = false;
                    }

                    if(!item) return false;
                    if(_.isArray(scope.model) && maxTagCount){
                        if(scope.model.length >= maxTagCount){
                            finishListModel();
                            scope.E_STATE = STATE_MAXTAGBLOCKED; //error state
                            console.log('scope.E_STATE', scope.E_STATE);
                            return true;
                        }
                    }

                    scope.E_STATE = null;

                    if(scope.inRelationship || scope.itsComplicated){
                        scope.model.push(item);
                        finishListModel();
                    }else{
                        scope.model = item;
                        finishSingleModel();
                    }
                    

                    if(scope.autoClearSearch){
                        scope.searchText = "";
                        scope.choices = [];
                    }

                    scope.highlightedIndex = 0;
                    return true;
                }

                if(!scope.placeholder) scope.placeholder = "Select one..";
                return false; 
            }
        };
    });
