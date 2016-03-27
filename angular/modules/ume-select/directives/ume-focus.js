angular.module('umeSelect')
.directive('umeFocus', function($timeout) {
  return {
    link: function(scope, elem, attr) {
      scope.$watch('trigger', function(value) {
        scope.$on(attr.umeFocus, function(e) {
            elem[0].focus();
        });
      });
    }
  };
});
