angular.module('nc')
.directive('ncImageIntegrity', function() {
    //Only show if image loaded by <img> integrity is OK (100% finished loading)
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    if(element.naturalWidth !== 0){
                        element.css('display', 'inherit');
                    }
                    
                });
                element.bind('error', function(){
                    element.css('display', 'inherit');
                    console.error("Unable to load image - integrity check failed", element); //should retry
                });
            }
        };
    })