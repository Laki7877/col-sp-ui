angular.module('umeSelect')
.directive('umeFocus', function($timeout) {
  return {
    link: function(scope, elem, attr) {
      scope.$watch('trigger', function(value) {
        scope.$on(attr.umeFocus, function(e,data) {
            // console.log(attr.umeId, 'focus received');
            elem[0].focus();
        });
      });
    }
  };
})
.directive('umeBlur', function($timeout) {
  return {
    link: function(scope, elem, attr) {
      scope.$watch('trigger', function(value) {
        scope.$on(attr.umeBlur, function(e,data) {
            // console.log(attr.umeId, 'focus lost');
            elem[0].blur();
        });
      });
    }
  };
});
