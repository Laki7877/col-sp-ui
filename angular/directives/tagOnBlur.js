module.exports = ['$timeout', function($timeout) {
        return {
            require: 'uiSelect',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.searchInput.on('blur', function() {
                    if ((ctrl.items.length > 0 || ctrl.tagging.isActivated)) {
                        $timeout(function() {
                            ctrl.searchInput.triggerHandler('tagged');
                            var newItem = ctrl.search;
                            if ( ctrl.tagging.fct ) {
                                newItem = ctrl.tagging.fct( newItem );
                            }
                            if (newItem) ctrl.select(newItem, true);
                        });
                    }
                });
            }
        };
}];