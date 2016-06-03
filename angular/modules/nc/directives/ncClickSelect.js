angular.module('nc')
.directive('ncClickSelect', function () {
    return {
        restrict: 'A',
        scope: { 
            ctrlFn: '&',
            ngModel: '=ngModel'
        },
        require : '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.bind('click', function () {
                var json = angular.fromJson(attrs.value);
                scope.ctrlFn({arg1: json});
            });
        }
    };
});