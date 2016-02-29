var angular = require('angular');

module.exports = [function() {
  return function(arr, other, trackBy) {

     return arr.filter(function(elem){
        if(other == null || other === undefined) return true;
        if(other instanceof Array){
        	//throw away if elem matches any of the given other list
        	var p = true;
        	for(var j = 0; j < other.length; j++){
                var k = (elem == ((other[j] || null ) || null));
        		if(angular.isDefined(trackBy)){
                    var deepOther = _.get(other[j], trackBy, null);
                    k = (_.get(elem, trackBy, null) == deepOther);
                }
        		//matched atleast one, stop and throw away
        		if(k){
        			p = false;
        			break;
        		}
        	}
        	return p;
        }else{
        	//return true to keep
        	if(!angular.isDefined(trackBy)){
                return elem != (other || null);
            }

            return elem[trackBy] != (other[trackBy] || null);
        }
     });
  }
}];