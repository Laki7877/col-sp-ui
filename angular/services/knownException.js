module.exports = [function() {
	'use strict';

	return function(msg){
        this.message = "Known Exception - " + msg;   
    };
}];