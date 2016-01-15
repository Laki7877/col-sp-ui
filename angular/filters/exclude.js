var angular = require('angular');

module.exports = [function() {
  return function(arr, other, trackBy) {

     return arr.filter(function(elem){
        return elem[trackBy] != (other[trackBy] || null);
     });
  }
}];