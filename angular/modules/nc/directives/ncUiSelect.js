/**
 * Tag validator
 */
angular.module('nc')
    .directive('ncTagValidator', function () {
        return {
            restrict: 'A',
            require: ['ngModel', 'uiSelect'],
            link: function ($scope, element, attrs, ctrl) {
                var maxTagCount = undefined;
                var maxTagLength = undefined;
                var tagPattern = false;
                var maxTagLengthKey;

                var $select = ctrl[1];
                var $model = ctrl[0];
                
                $select.onSelectCallback = function () {
                    var array = $model.$modelValue || [];
                    var item = (array[array.length - 1] || "");
                    var _pass = true;
                    $model.$error = {};
                    
                    // check tag key string length
                    if(maxTagLengthKey && _.isPlainObject(item)) {
                        item = item[maxTagLengthKey] || "";
                    }

                    // check num of tag
                    if (maxTagCount && array.length > maxTagCount) {
                        //$model.$error.maxtagcount = true;
                        _pass = false;
                    }
                    // check tag string length
                    if (maxTagLength && item.length > maxTagLength) {
                        //$model.$error.maxtaglength = true;
                        _pass = false;
                    }
                    
                    if (tagPattern && !item.ValueEn.match(tagPattern)) {
                        //$model.$error.pattern = true;
                        _pass = false;
                    }

                    if (!_pass) {
                        $model.$modelValue.pop();
                        $model.$viewValue = $model.$modelValue;
                    }
                };
                attrs.$observe('ngModel', function(val) {
                    $scope.$watch(val, function(o) {
                        $select.onSelectCallback();
                    });
                });

                attrs.$observe('ncMaxTagCount', function (val) {
                    if (!val) return;
                    maxTagCount = Number(val);
                });

                attrs.$observe('ncMaxTagLengthKey', function (val) {
                    if (!val) return;
                    maxTagLengthKey = val;
                });
                attrs.$observe('ncTagPattern', function (val) {
                    if (!val) return;
                    tagPattern = val;
                });

                attrs.$observe('ncMaxTagLength', function (val) {
                    if (!val) return;
                    maxTagLength = Number(val);
                });

            }
        }
    });

