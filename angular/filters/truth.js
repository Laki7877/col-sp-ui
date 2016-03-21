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
          var state = _.get(obj, value);

          if(state === true){
     	     i.push(obj);
          }
     });
     
     return i;
  }
}];