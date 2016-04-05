var angular = require('angular');
angular.module('productDetail').
factory('AttributeOptions', function() {
    'ngInject';

    return {
      proto: function(){
        return [
          {
            Attribute: false,
            options: []
          },
          {
            Attribute: false,
            options: []
          }
        ];
      }
    }

});