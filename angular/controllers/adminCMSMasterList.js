module.exports = function ($scope,$rootScope, $controller, common, CMSMasterService, util, $window, $rootScope, config, storage) {
    'ngInject';
    $scope.adCMSview = !$rootScope.permit(23);  
    $scope.adCMSadd = !$rootScope.permit(24);
    $scope.adCMSedit = !$rootScope.permit(25);
    $controller('AbstractAdvanceListCtrl', {
        $scope: $scope,
        options: {
            url: '/admin/cms/master',
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
                'Show',
                util.bulkTemplate('Force Approve', CMSMasterService.approve, 'CMSMasterId', 'CMSMaster', {
                    btnConfirm: 'Approve',
                    btnClass: 'btn-green'
                }),
				util.bulkTemplate('Reject', CMSMasterService.reject, 'CMSMasterId', 'CMSMaster', {
				    btnConfirm: 'Reject',
				    btnClass: 'btn-red'
				}),
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
