/**
 * Validate if value is uppercase
 */
module.exports = function ($parse) {
    'ngInject';
    return {
      require: 'ngModel',
      link: function postLink(scope, element, attrs, modelCtrl) {
        var lowerize = function(inputValue) {
          if (!inputValue) { return inputValue; }
          var lowerized = inputValue.toUpperCase();
          if(lowerized !== inputValue) {
            modelCtrl.$setViewValue(lowerized);
            modelCtrl.$render();
          }         
          return lowerized;
        };

        var model = $parse(attrs.ngModel);
        modelCtrl.$parsers.push(lowerize);
        lowerize(model(scope));
      }
    };
};