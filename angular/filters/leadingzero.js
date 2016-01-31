module.exports = function() {
	return function(str, num) {
		if(_.isUndefined(str)) {
			return str;
		}
		if(_.isUndefined(num)) {
			num = 0;
		}
		var result = str;
		if(_.isInteger(str)) {
			result = _.toString(str);
		}
		for(var i = result.length - 1; i < num; i++) {
			result = '0' + result;
		}

		return result;
	}
};