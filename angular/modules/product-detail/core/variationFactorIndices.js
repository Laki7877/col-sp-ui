var angular = require('angular');
angular.module('productDetail').
factory('VariationFactorIndices', function() {
  'ngInject';

   return function(dataset){
      this.iterator = [0];
      this.length = function() {
        return this.iterator.length
      };

      this.popSecond = function() {
        this.length() == 2 && this.iterator.pop();
        dataset.attributeOptions[1].options = []
        dataset.attributeOptions[1].Attribute = null
      };

      this.pushSecond = function() {
        this.length() < 2 && this.iterator.push(1)
      }
  };

});
