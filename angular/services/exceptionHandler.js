var angular = require('angular');

module.exports = ['$window', '$base64', function($window, $base64) {
    return function(exception, cause) {
        console.log("Exception handler", exception, cause);
        if(exception.message.length > 500){
            exception.message = exception.message.substring(0, 500);
        }
        var encMsg = $base64.encode(JSON.stringify({
            'message': exception.message,
            'cause': cause
        }));
        $window.location = '/exception?e=' + encMsg;
    };
}];