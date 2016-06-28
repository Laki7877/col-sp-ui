var angular = require('angular');

angular.module('widget').controller('AbstractWidgetCtrl', function ($scope, $builder, $validator, $templateCache) {

    $builder.registerComponent('grid6-6', {
        group: 'Default',
        label: 'Grid 6-6 system',
        required: false,
        arrayToText: true,
        imgL: 'http://dummyimage.com/500x600/000/fff.png',
        imgR: 'http://dummyimage.com/500x600/000/fff.png',
        imgPIDL: 'http://dummyimage.com/500x600/000/626be0.png',
        imgPIDR: 'http://dummyimage.com/500x600/000/626be0.png',
        paddingFBLR: '1',
        template: $templateCache.get('wg/template_6-6'),
        popoverTemplate: $templateCache.get('po/popoverTemplate_6-6')
    });

    $scope.form = $builder.forms['default'];
  
    return $scope.submit = function () {
        return $validator.validate($scope, 'default').success(function () {
            return console.log('success');
        }).error(function () {
            return console.log('error');
        });
    };
});