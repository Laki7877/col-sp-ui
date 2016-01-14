var angular = require('angular');
module.exports = ['$templateCache', '$compile', function($templateCache, $compile) {
  var originalAttr = {};
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    priority: 1010, 
    scope: {
      options: '=ngTemplateOptions',
    },
    template: function(element, attrs) {
      var templateHTML = $templateCache.get(attrs.ngTemplate);
      var templateElement = angular.element(templateHTML);/*
      angular.forEach(templateElement[0].attributes, function(attr) {
        originalAttr[attr.name] = attr.value;
      });*/
      return templateHTML;
    },
    link: function(scope, element, attrs, ctrl, transclude) {
      /*angular.forEach(attrs.$attr, function(a) {
        element.removeAttr(a);
      });
      angular.forEach(originalAttr, function(value, a) {
        element.attr(a, value);
      });*/
      //element.find('ng-transclude').replaceWith(transclude());
    }
  };
}];