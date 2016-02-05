/*
 * Get slice or subarray of array
 */
module.exports = [function() {
  return function(arr, from, to) {
  	if(_.isUndefined(to)) {
  		if(_.isUndefined(arr)) {
  			to = from;
  		} else {
  			to = arr.length;
  		}
  	}
    return _.slice(arr, from, to);
  }
}];