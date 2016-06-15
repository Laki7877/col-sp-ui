angular.module('umeSelect')
.directive('umeFocus', function($timeout) {
  //Broadcast this event if you need focus on binded element
  return {
    link: function(scope, elem, attr) {
      scope.$watch('trigger', function(value) {
        scope.$on(attr.umeFocus, function(e,data) {
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
            elem[0].blur();
        });
      });
    }
  };
});
