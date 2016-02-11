var angular = require('angular');

module.exports = ['$window', '$base64', 'config', function($window, $base64, config) {
    return function(exception, cause) {
        console.log("Exception handler", exception, cause);
        if(exception.message.length > 500){
            exception.message = exception.message.substring(0, 500);
        }
        var encMsg = $base64.encode(JSON.stringify({
            'message': exception.message,
            'cause': cause
        }));
        
        if(config.HANDLE_EXCEPTION) $window.location = '/exception?e=' + encMsg;
    };
}];