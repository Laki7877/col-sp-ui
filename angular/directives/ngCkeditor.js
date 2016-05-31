module.exports = [function () {
    return {
        priority: 1010,
        require: '?ngModel',
        link: function ($scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0], attr.ngCkeditor || {});
            CKFinder.setupCKEditor(ck, '../')
            ck.on('pasteState', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            var changeCount = 0;

            ck.on('mode', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });


            ck.on('instanceReady', function () {
                ck.setData(ngModel.$modelValue);
            });

            ngModel.$render = function (value) {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
}];
