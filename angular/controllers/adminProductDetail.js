/**
 * Handle admin product page
 */
module.exports = function ($scope, $controller) {
    'ngInject';
    //inherit from product add ctrl
    $controller('AbstractProductAddCtrl', {
        $scope: $scope,
        options: {
            maxImageUploadQueueLimit: 25,
            adminMode : true,
            listingUrl: '/admin/products'
        }
    });

};