/*
 Return dropdown[value] if input == dropdown[name]
 */
angular.module('nc')
	.filter('mapDropdown', function() {
		//Return property
		return function(input, collections, name) {
			if(_.isUndefined(collections)) {
				return input;
			}

			if(_.isUndefined(name)) {
				name = 'name';
			}

			var find = _.find(collections, function(o) {
				return o.value == input;
			}) 

			return _.isUndefined(find) ? input : find[name];
		}
	});