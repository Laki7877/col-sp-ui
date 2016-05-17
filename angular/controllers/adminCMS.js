module.exports = function($scope, $controller, CouponService, config, $uibModal) {
  $controller('AbstractListCtrl', {
    $scope: $scope,
    options: {
      url: '/admin/cms',
      service: CouponService,
      item: 'Coupon',
      order: 'ExpireDate',
      id: 'CouponId',
      actions: [{
        name: 'View Detail',
        fn: function(item) {
          console.log(item, 'view detail')
        }
      }],
      bulks: [],
      filters: []
    }
  });

  $controller('AbstractAddCtrl', {
    $scope: $scope,
    options: {
      id: 'CouponId',
      url: '/admin/cms/create',
      item: 'Coupon',
      service: CouponService,
      dateFields: ['StartDate', 'ExpireDate'],
      onLoad: function(){
        //map dropdonws
      },
      onSave: function(scope) {
        //hacky speed fix
        console.log($scope.formData)
        //scope.formData.Conditions.Order = [scope.formData.Conditions.Order["0"]];
      }
    }
  });


  $scope.formData = {};
  $scope.groupItemList = [];


  $scope.loadAllCMS = function() {
    
  };

  $scope.addNewGroup = function() {
     $uibModal.open({
      template: '<div class="modal-header">' +
                '  <h3 class="modal-title">Add New Group</h3>' +
                '</div>' +
                '<div class="modal-body">' +
                '  <form class="ah-form margin-top-20" name="form" novalidate>' +
                '    <div class="row">' +
                '      <div class="col-xs-12">' +
                '   <div class="form-section-content">' +
                '     <input type="text" class="form-control" ng-model="groupName" />' +
                '   </div>' +
                '        <div class="container-fluid no-padding margin-top-20">' +
                '            <div class="float-right">' +
                '              <a href="#" class="link-btn-plain" ng-click="$dismiss()">Cancel</a>' +
                '              <button class="btn btn-blue btn-width-xl" ng-click="save(groupName)"><span class="login-loading" ng-cloak ng-show="saving"><i class="fa fa-spinner fa-spin" ></i></span>Save</button>' +
                '            </div' +
                '        </div' +
                '      </div>' +
                '    </div>' +
                '  </form>' +
                '</div>',
      size: 'md',
      scope: $scope,
      controller: function($scope, $uibModalInstance) {


        $scope.save = function(groupName) {
          var group = {
            GroupName: groupName,
            GroupTotal: 0
          }
          $uibModalInstance.close(group)
        };

        
      }
    })
    .result.then(function(data) {
      console.log(data)
      $scope.groupItemList.push(data);
    });
  };

  $scope.AddToList = function() {
    console.log($scope.formData)
  };
}
