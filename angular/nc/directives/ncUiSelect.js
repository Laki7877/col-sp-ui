angular.module('nc')
//This breaks stuff
/*	.directive('uiSelect', function() {
		return {
            priority: -1,
			require: 'ngModel',
			link: function(scope, elem, attrs, ngModel) {

                if(elem.find('ui-select-multiple').length > 0) {
                    //model -> view
                    ngModel.$parsers.push(function(input) {
                        return _.compact(input);
                    });
                    ngModel.$formatters.push(function(input) {
                        return _.compact(input);
                    });
                }
			}
		};
	})*/
    .directive('ncTagValidator', function () {
        return {
            restrict: 'A',
            require: ['ngModel', 'uiSelect'],
            link: function ($scope, element, attrs, ctrl) {
                var maxTagCount = 1000;
                var maxTagLength = 30;
                var tagPattern = false;

                var $select = ctrl[1];
                var $model = ctrl[0];

                $select.onSelectCallback = function () {
                    var array = ($model.$modelValue || []);
                    var item = (array[array.length - 1] || "");
                    var _pass = true;
                    $model.$error = {};

                    if (array.length > maxTagCount) {
                        $model.$error.maxtagcount = true;
                        _pass = false;
                    };

                    if (item.length > maxTagLength) {
                        $model.$error.maxtaglength = true;
                        _pass = false;
                    };

                    if (tagPattern && !item.match(tagPattern)) {
                        $model.$error.pattern = true;
                        _pass = false;
                    }

                    if (!_pass) {
                        $model.$modelValue.pop();
                        $model.$viewValue = $model.$modelValue;
                    }

                };

                attrs.$observe('ncMaxTagCount', function (val) {
                    if (!val) return;
                    maxTagCount = Number(val);
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