var angular = require('angular');

module.exports = [function() {
  return function(arr, other, trackBy) {

     console.log('arr', arr, 'other', other, trackBy);     
     return arr.filter(function(elem){
        return elem[trackBy] != (other[trackBy] || null);
     });
  }
}];