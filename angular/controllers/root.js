module.exports = function($rootScope, $uibModal, $window, storage, Credential, route, config) {
	'ngInject';
	//Root controller of the application
	$rootScope._ = _;
	$rootScope.Profile = storage.getCurrentUserProfile();
  $rootScope.Imposter = storage.getImposterProfile();
  console.log($rootScope.Profile);
  if (!$rootScope.Profile && $window.location.pathname != "/login") {
    storage.put('redirect', $window.location.pathname);
    $window.location.href = "/login";
  }

  //Prevent image dragdrop on other elements
  $window.addEventListener("dragover", function(e) {
    e = e || event;
    e.preventDefault();
  }, false);
  $window.addEventListener("drop", function(e) {
    e = e || event;
    e.preventDefault();
  }, false);


  //Get Shop activity
  $rootScope.shopStatus = {};
  _.forEach(config.SHOP_STATUS, function(item) {
    $rootScope.shopStatus[item.value] = item;
  });
  console.log($rootScope);
  $rootScope.asShopStatus = function(status) {
    return _.isNil(status) ? config.SHOP_STATUS[0] : $rootScope.shopStatus[status];
  };

  //Create global logout function
  $rootScope.logout = function() {
    if ($rootScope.Imposter) {
      return Credential.logoutAs().then(function(R) {
        //return to normal flow
        if (R.User.IsAdmin) {
          $window.location.href = "/admin";
        } else {
          $window.location.href = "/products";
        }
      }, function() {
        alert("Fetal error while logging out.");
      });
    }

    Credential.logout();
    $window.location.href = "/login"
  };


  //Create generic form validator functions
  //This is now inside ncTemplate
  $rootScope.isInvalid = function(form) {
    if (angular.isDefined(form) &&
      angular.isDefined(form.$invalid) &&
      angular.isDefined(form.$dirty)) {
      return form.$invalid && (form.$dirty || form.$$parentForm.$submitted);
    }
    return false;
  };

  //new version of route magics
  $rootScope.menu = [];
  var escape = function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  $rootScope.initMenu = function(id) {
    $rootScope.menu = route[id];
  };
  var isActive = function(url) {
    var path = $window.location.pathname;
    if(path.startsWith(url) && url.length > 1) {
      var check = path.replace(url, '');
      if(check.length == 0 || check.charAt(0) === '/' || check.charAt(0) === '?') {
        if(check.charAt(0) === '/') {
          var id = check.replace('/', '');
          return _.isNaN(_.parseInt(id)) ? '' : 'active';  
        }
        return 'active';
      } else {
        return '';
      }
    }

    return '';
  };
  $rootScope.activeSubmenuItem = function(item) {
    if(item.urls.length == 0) {
      return isActive(item.url);
    } else {
      for (var i = 0; i < item.urls.length; i++) {
        if(isActive(item.urls[i]).length > 0) {
          return 'active';
        }
      }
      return '';
    }
  };
  $rootScope.activeMenuItem = function(item) {
    //Check if hover
    if(item.hover) {
      return 'active';
    }

    //Check if is one of the submenu url
    for (var i = 0; i < item.submenu.length; i++) {
      if($rootScope.activeSubmenuItem(item.submenu[i]).length > 0) {
        return 'active';
      }
    }
    return '';
  };

  //Handle change password
  $rootScope.changePassword = function() {
    var modal = $uibModal.open({
      size: 'change-password',
      windowClass: 'modal-custom',
      templateUrl: 'common/modalChangePassword',
      controller: function($scope, $uibModalInstance, NcAlert, Credential, common) {
        'ngInject';
        $scope.alert = new NcAlert();
        $scope.form = {};
        $scope.formData = {};
        $scope.saving = false;
        $scope.oldPassword = true;

        $scope.save = function() {
          if($scope.form.$valid) {
            $scope.saving = true;
            $scope.alert.close();
            Credential.changePassword(_.pick($scope.formData, ['Password', 'NewPassword']))
              .then(function() {
                $scope.alert.success('Successfully changed password');
                $scope.formData = {};
                $scope.formData.error = false;
                $scope.form.$setPristine();
              }, function(err) {
                $scope.alert.error(common.getError(err));
                $scope.formData.error = true;
                $scope.form.$setPristine();
              }).finally(function() {
                $scope.saving = false;
              })
          } else {
            $scope.alert.error(config.DEFAULT_ERROR_MESSAGE);
          }
        };
      }
    });
  };
};