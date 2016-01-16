var angular = require('angular');

module.exports = [function() {
  return function(arr, other, trackBy) {

     return arr.filter(function(elem){
        if(other instanceof Array){
        	//throw away if elem matches any of the given other list
        	var p = true;
        	for(var j = 0; j < other.length; j++){
        		var k = (elem[trackBy] == ((other[j] || {trackBy: null} )[trackBy] || null));
        		//matched atleast one, stop and throw away
        		if(k){
        			p = false;
        			break;
        		}
        	}
        	return p;
        }else{
        	//return true to keep
        	return elem[trackBy] != (other[trackBy] || null);
        }
     });
  }
}];