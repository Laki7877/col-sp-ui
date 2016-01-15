module.exports = ['$window', function($window) {
	return function(fn, close) {
		var vm = this;
		vm.close = close;
		vm.originalHashValue = location.hash;
		vm.originalHref = '';
		vm.block = function() {
			var location = $window.document.location;
		    $window.addEventListener('beforeunload', this.preventNavigation, false);
		    $window.addEventListener('unload', this.preventNavigation, false);
		};      
		vm.preventNavigation = function () {
	        vm.originalHashValue = location.hash;
	        vm.href = location.href;
	        $window.setTimeout(function () {
	            location.hash = 'preventNavigation' + ~~ (9999 * Math.random());
	            location.hash = vm.originalHashValue;
	        }, 0);
	        fn(location);
	    };      
		vm.preventNavigation2 = function () {
	        vm.originalHashValue = location.hash;
	        $window.setTimeout(function () {
	            location.hash = 'preventNavigation' + ~~ (9999 * Math.random());
	            location.hash = vm.originalHashValue;
	        }, 0);
	        fn(location);
	    };
		vm.allow = function() {
			vm.close()
		    $window.removeEventListener('beforeunload', this.preventNavigation, false);
		    $window.removeEventListener('unload', this.preventNavigation2, false);
		};
	};
}];