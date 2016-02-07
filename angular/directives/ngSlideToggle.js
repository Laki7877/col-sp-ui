module.exports = function() {
    'ngInject';
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            var slideDuration = parseInt(attr.ngSlideToggleDuration, 10) || 200;
            scope.$watch(attr.ngSlideToggle, function (newVal, oldVal) {
                if (newVal) {
                    element.stop().slideDown(slideDuration);
                } else {
                    element.stop().slideUp(slideDuration);
                }
            });
        }
    };
};