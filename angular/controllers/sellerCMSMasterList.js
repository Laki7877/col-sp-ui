module.exports = function ($scope, $controller, common, CMSMasterService, util, $window, $rootScope, config, storage) {
    'ngInject';
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/cms/master',
            service: CMSMasterService,
            item: 'CMSMaster',
            order: 'CMSMasterId',
            id: 'CMSMasterId',
            actions: [
                'View',
                'Delete',
                'Approve'
            ],
            bulks: [
                'Delete',
                'Hide',
                'Show'
            ],
            filters: [
                { name: "All", value: 'All' },
                { name: "Approved", value: 'Approved' },
                { name: "Not Approved", value: 'NotApproved' },
                { name: "Wait for Approval", value: 'WaitforApproval' }
            ]
        }
    });
    $scope.showOnOffStatus = {};
    $scope.showOnOffStatus.value = true;
    $scope.statusLookup = {};
    $scope.advanceSearchOptions.Admin = false;

    config.PRODUCT_STATUS.forEach(function(object){
       $scope.statusLookup[object.value] = object;
    });

    $scope.asStatus = function (ab) {
        return $scope.statusLookup[ab];
    };
    $scope.getTag = function(tags) {
        return _.join(tags, ', ');
    }

    var fromImport = storage.get('import.success');

    if(!_.isEmpty(fromImport)) {
        storage.remove('import.success');
        $scope.alert.success(fromImport);
    }
};
