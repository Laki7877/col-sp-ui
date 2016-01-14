var angular = require('angular');
module.exports = ['common', function(common) {
	return function() {
		this.type = 'red';
		this.show = false;
		this.close = function() {
			this.show = false;
		};
		this.open = function(success, msg) {
			this.type = success ? 'green' : 'red';
			this.message = success ? (msg ? msg : 'Your change has been saved.') : msg;
			this.show = true;
		};
		this.error = function(obj) {
			obj = common.getError(obj);
			this.open(false, obj);
		};
		this.success = function(obj) {
			this.open(true, obj);
		};
		this.message = '';
	};
}];