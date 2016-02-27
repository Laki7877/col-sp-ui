module.exports = function() {
	'ngInject';
	return function(value) {
		return _.join(_.map(value, function(e) {
			return e.Value; 
		}), ' / ');
	};
};