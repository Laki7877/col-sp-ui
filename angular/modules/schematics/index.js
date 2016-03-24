var angular = require('angular');
var bulk = {};
angular.module('schematics', []).
run(function(){
  bulk = require('bulk-require')(__dirname, ['schema/*.js']);

}).
factory('JSONCache', function(){
  return {
    get: function(key){
      return bulk.schema[key];
    }
  }
});
