var angular = require('angular');

module.exports = [function() {
  return function(input, scope) {
  	if(angular.isNumber(input)) {
  		if(input % 10 == 1) input += 'st';
  		else if(input % 10 == 2) input += 'nd';
  		else if(input % 10 == 3) input += 'rd';
  		else {
  			input += 'th';
  		}
  	}
  	return input;
  }
}];