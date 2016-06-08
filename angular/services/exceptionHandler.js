var angular = require('angular');

module.exports = ['$window', '$base64', 'config', function($window, $base64, config) {
    return function(exception, cause) {
        console.log("Exception handler", exception, cause);
        // if(exception.message && exception.message.length > 200){
        //     exception.message = exception.message.substring(0, 200);
        // }
        // var encMsg = $base64.encode(JSON.stringify({
        //     'message': exception.message
        // }));
        // $window.location = '/exception?e=' + encMsg;
        // Rollbar.error("Uncaught Exception", exception);
    };
}];
