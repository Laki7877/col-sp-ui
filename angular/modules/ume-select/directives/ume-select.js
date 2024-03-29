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
                groupBy: '@?groupBy',
                initialChoices: '=?initialChoices',
                hideIcon: '=?hideIcon',
                disabled: '&?ngDisabled',
                strictMode: '=?strictMode',
                required: '=?ncRequired',
                uniqueTag: '=?uniqueTag',
                blockDuplicateTag: '=?blockDuplicateTag'
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

                ngModel.$validators.required = function(modelValue, viewValue) {
                   // console.log(scope.required , 'scope.required');
                   //TODO: erm wtf
                   if(scope.required && (!modelValue || modelValue.BrandId == 0 || !modelValue.BrandId)){
                       return false;
                   }
                   return true;
                };

                attrs.$observe('required', function(val) {
                    ngModel.$validate();
                });

                //text user types in searchbox
                scope.searchText = "";
                //index of currently highlighted choice
                scope.highlightedIndex = 0;
                //choices
                scope.choices = [];
                if(!scope.model && (scope.inRelationship || scope.itsComplicated)){
                    scope.model = [];
                }

                //State variables
                //E_STATE is error state that is used by
                //customValidation events such as tag limiting
                //to notify $validator that there is an error
                //It is not conventional because, who knows.
                scope.E_STATE = null;
                var STATE_MAXTAGBLOCKED = 1;
                var STATE_MAXLENGTHBLOCK = 2;
                var STATE_DUPLICATE_BLOCKED = 3;

                scope.focused = false;
                scope.loading = false;

                //Don't reset model on error, I will handle this manually
                ngModel.$options = { allowInvalid: true }

                var initModel = false, initState = false;
                //Listen for any change in error state and model
                scope.$watch('model', function(value, oldValue){

                    //Update ng model

                    ngModel.$setViewValue(value);

                    if(!initModel || _.isEmpty(oldValue)){
                        initModel = true;
                        return;
                    }

                    console.log('model', value, oldValue);

                    ngModel.$setDirty();
                    ngModel.$validate();
                }, true);

                scope.$watch('E_STATE', function(value, oldValue){

                    if(!initState || _.isEmpty(oldValue)){
                        initState = true;
                        return;
                    }
                    console.log('E_STATE', value, oldValue);
                    ngModel.$setDirty();
                });

                //For error validations
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
                    if(scope.E_STATE == STATE_MAXTAGBLOCKED) return false;
                    return true;
                };

                ngModel.$validators.maxLengthPerTag = function(modelValue, viewValue) {
                    if(scope.E_STATE == STATE_MAXLENGTHBLOCK) return false;
                    return true;
                };

                ngModel.$validators.duplicateTagBlock = function(modelValue, viewValue){

                    if(scope.E_STATE == STATE_DUPLICATE_BLOCKED) return false;
                    return true;
                }


                //Watch change on input choices
                scope.$watchCollection('originalChoices()', function(data){
                    var sortedData = data;
                    var seenGroup = new Set();

                    //Create grouping if groupby is present
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
                            // console.log('rturning d', d);
                            return d;
                        });
                    }

                    // console.log('sortedData', sortedData);
                    if(scope.strictMode){
                        //strictly filter by search text
                        var searchObj = {};
                        searchObj[scope.displayBy] = scope.searchText;
                        sortedData = $filter('filter')(sortedData, searchObj)
                    }

                    scope.choices = sortedData;
                });


                //For debugging purpose I needed to know where event is firing from
                var _id = (new Date()).getTime()*Math.random() + "R";
                scope._id =  _id;

                //Delete item from tag list
                scope.breakUp = function(index){
                    if(!scope.inRelationship && !scope.itsComplicated) {
                        return;
                    }

                    scope.E_STATE = null;
                    scope.model.splice(index, 1);
                }

                //Focus on search field
                scope.forceFocus = function(){
                    scope.$emit('focusObtained', _id);
                }

                //Tokenize string into tag object
                scope.tagify = function(tagValue, draft){
                    var X = {};
                    if(draft){
                      X._draft = true;
                    }
                    if(!scope.displayBy) return tagValue;
                    _.set(X, scope.displayBy, tagValue);
                    return X;
                }

                //In complicated mode (multiple)
                if(scope.itsComplicated){
                    if(!scope.choices) scope.choices = [];
                    scope.choices.unshift(scope.tagify('New Tag'));
                }

                //Get true item display value
                scope.itemValue = function(item){
                    if(!scope.displayBy) return item;
                    return _.get(item, scope.displayBy);
                }

                //Watch keyboard events
                scope.keyDown = function(evt){
                    if(evt.code == "ArrowDown" || evt.keyCode == 40){
                        scope.highlightedIndex++;
                    }else if(evt.code == "ArrowUp" || evt.keyCode == 38){
                        scope.highlightedIndex--;
                    }else if(evt.code == "Enter" || evt.code == "Comma" || evt.keyCode == 13 || evt.keyCode == 188){
                        if(scope.searchText == "") return;

                        $timeout(function (){
                            scope.$emit('focusLost', _id);
                            // var K = $filter('filter')((scope.choices || []), scope.searchText);
                            var K = (scope.searchText.length > 0 ? (scope.choices || []) : scope.initialChoices);
                            var result= scope.pickItem(K[scope.highlightedIndex]);
                            if(!result){
                                scope.$emit('focusObtained', _id);
                            }
                        });

                    }else if(evt.code == "Backspace" || evt.keyCode == 8){
                        if(scope.searchText.length > 0) return;
                        //reset error state
                        scope.E_STATE = null;
                        if(_.isArray(scope.model) && scope.model.length > 0) scope.model.pop();
                    }

                    if(scope.highlightedIndex >= (scope.choices || []).length){
                        scope.highlightedIndex = (scope.choices || []).length - 1;
                    }

                    if(scope.highlightedIndex <= 0){
                        scope.highlightedIndex = 0;
                    }
                }

                scope.blur = function(){
                    //Note the 500ms delay is significant because
                    //mouse clicking on choice item will be < 1 second in duration
                    //but long enough to trigger a blur which deactivates choices
                    $timeout(function(){
                        scope.focused = false;
                        scope.searchText = "";
                    }, 350)
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
                //Debouncing var and etc
                var prevQ = {};
                var loadQ = [];
                scope.$watch('searchText', function () {

                    if(_.isEmpty(scope.searchText)) return;

                    if(!scope.itsComplicated) {
                        //when its complicated, you are out of options
                        scope.choices = [];
                    }

                    if(scope.itsComplicated){
                        if(!scope.choices) scope.choices = [];
                        scope.choices[0] = scope.tagify(scope.searchText, true);
                    }

                    scope.highlightedIndex = 0;


                    if(!scope.refresh) return;
                    if(scope.searchText == "" || !scope.searchText) {
                        scope.loading = false;
                        return;
                    }
                    if (scope.delay){
                        $timeout.cancel(scope.delay);
                    }

                    searchTextTimeout = $timeout(function() {
                        //If this is same as previous request, dont do it
                        var curDate = new Date();
                        var tooShort = ((curDate - prevQ.ts) < 3000);
                        var previousWasntEmpty = ((scope.choices || []).length > 0);
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
                                scope.notFound = ((scope.choices || []).length == 0);
                            });
                        }catch(ex){
                            //Ugh
                            console.log("ugh");
                            scope.loading = false;
                        }

                    }, 500); // delay 250 ms
                })

                scope.pickItem = function(item){

                    if(scope.blockDuplicateTag){
                        //check for dupe
                        var found = false;
                        if(scope.itsComplicated){
                            //check shallow
                            found =  _.find(scope.model, function(o) { return o == item; });

                        }else{
                            //check deep
                            found =  _.find(scope.model, function(o) { return o[scope.displayBy] == item[scope.displayBy]; });
                        }

                        if(found){
                            scope.E_STATE = STATE_DUPLICATE_BLOCKED;
                            ngModel.$setDirty();
                            ngModel.$validate();
                            return false;
                        }
                    }

                    //Action to perform when user select a choice
                    //if in love (such as in relationship or its-complicated)
                    var finishListModel = function(){
                        scope.focus(true);
                        scope.searchText = "";

                        if(!scope.itsComplicated){
                            scope.choices = [];
                        }
                    };

                    //same as above but for single people
                    var finishSingleModel = function(){
                        scope.focused = false;
                    }

                    if(!item) return false;
                    scope.E_STATE = null;
                    if(_.isArray(scope.model) && maxTagCount){

                        if(scope.model.length >= Number(maxTagCount)){
                            finishListModel();
                            scope.E_STATE = STATE_MAXTAGBLOCKED; //error state
                            ngModel.$setDirty();
                            ngModel.$validate();

                            //Clear error message after 3 seconds
                            $timeout(function(){
                                scope.E_STATE = null;
                                ngModel.$validate();
                            }, 3000);

                            return true;
                        }

                    }

                    if(maxLengthPerTag){
                        if(!_.isObject(item) && item.length > Number(maxLengthPerTag)){
                            finishListModel();
                            scope.E_STATE = STATE_MAXLENGTHBLOCK; //error state
                            ngModel.$setDirty();
                            ngModel.$validate();

                            $timeout(function(){
                                scope.E_STATE = null;
                                ngModel.$validate();
                            }, 3000);

                            return true;
                        }
                    }

                    scope.E_STATE = null;

                    //If in love, treat model as array
                    if(scope.inRelationship || scope.itsComplicated){
                        scope.model.push(item);
                        finishListModel();
                    }else{
                        //if lonely, its not array :(
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
