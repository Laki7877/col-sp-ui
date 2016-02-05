angular.module('nc')
	.filter('mapDropdown', function() {
		//Return property
		return function(input, collections) {
			if(_.isUndefined(collections)) {
				return input;
			}

			var find = _.find(collections, function(o) {
				return o.value == input;
			}) 

			return _.isUndefined(find) ? input : find.name;
		}
	});