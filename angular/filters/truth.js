var angular = require('angular');

/*
*
* find truth of property nested in each
* object in array
*/
module.exports = [function() {
  return function(arr, value) {
  	 var i = [];

  	 //TODO: use map
     arr.forEach(function(obj){
          var path = value.split('.');

          var state = angular.copy(obj);
          for(var j = 0; j < path.length; j++){
          	 state = state[path[j]];
          }

          if(state === true){
     	     i.push(obj);
          }
     });
     return i;
  }
}];