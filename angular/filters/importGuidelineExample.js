module.exports = function() {
	return function(input) {
		var result = '<ul>';
		var tokens = _.words(input, /(Acceptable: [\w]+)|(Unacceptable: [\w]+)/g);

		if(tokens.length == 0) {
			return input;
		}
		_.forEach(tokens, function(w) {
			result += '<li>' + w + '</li>';
		});

		result+='</ul>';
		return result;
	}
};