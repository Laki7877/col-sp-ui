module.exports = function($rootScope, $uibModal, $window, storage, Credential, route, config, util) {
	'ngInject';
	//Root controller of the application
	$rootScope._ = _;
  $rootScope.Profile = storage.getCurrentUserProfile();
  $rootScope.Imposter = storage.getImposterProfile();

 
  /*
  *  range {array} - set of shop group that is permitted in the current shop group policy 
  */ 
  $rootScope.ShopGroupPolicy = function(range){
    var mySG = _.get($rootScope.Profile, 'Shop.ShopGroup');
    if(mySG == range) return true;
    
    return range.includes(mySG);
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

  //Handle route menu item active-ness
  var isActive = function(url, alt) {
    var path = alt;
    if(_.isNil(alt)) {
      path = $window.location.pathname;
    }
    if(path.startsWith(url) && url.length > 1) {
      var check = path.replace(url, '');
      if(check.length == 0 || check.charAt(0) === '/' || check.charAt(0) === '?') {
        if(check.charAt(0) === '/') {
          var id = check.replace('/', '');
          if(_.findIndex(route.reserve, function(o) { return o == id; }) >= 0) {
            return '';
          }
          return 'active';  
        }
        return 'active';
      } else {
        return '';
      }
    }

    return '';
  };

  //In case local storage expire before cookie
  if(!_.isNil(storage.getSessionToken())) {
    if(!_.isNil($rootScope.Profile)) {
      $rootScope.DisablePage = true;
      Credential.checkToken()
        .then(function() {
          $rootScope.DisablePage = false;
        }, function() {
          storage.put('session_timeout');
          storage.clear();
          $window.location.reload();
        });
    } else {
      $rootScope.DisablePage = true;
      Credential.loginWithToken(storage.getSessionToken(), true)
        .then(function(profile) {
          $rootScope.Profile = profile;
          $rootScope.DisablePage = false;
        }, function() {
          storage.put('session_timeout');
          storage.clear();
          $window.location.reload();
        });
    }
  }

  //No cookie
  if (_.isNil(storage.getSessionToken()) && $window.location.pathname.indexOf("/login") == -1) {
    storage.put('redirect', $window.location.pathname);
    storage.clear();

    $rootScope.DisablePage = true;
    if($window.location.pathname.startsWith('/admin'))
    {
      //Admin
      $window.location.href = '/admin/login';
    } else {
      //User
      $window.location.href = "/login";
    }
  } 

  $rootScope.hasPermission = function(id) {
    return _.findIndex($rootScope.Profile.Permission, function(item) {
      if(item.PermissionId == id) {
        if(item.OverrideParent > 0) {
          return (_.findIndex($rootScope.Profile.Permission, function(e) {
              return e.PermissionId === item.OverrideParent;
            }) >= 0);
        } else {
          return true;
        }
      }
      else {
        return false;
      }
    }) >= 0;
  }

  //Handle permission
  $rootScope.permit = function(id) {
    //return true;
    return $rootScope.hasPermission(id);
  };

  //Check url access permission
  $rootScope.permitUrl = function(url) {
    var result = true;
    return true;
    _.forEach(route.permission, function(v, k) {
      if(_.isArray(v)) {
        for (var i = 0; i < v.length; i++) {
          if(isActive(v[i], url) == 'active') {
            result = result && $rootScope.permit(k);
          }
        }
      } else if(isActive(v, url) == 'active') {
          result = result && $rootScope.permit(k);
      }
    });
    return result;
  };

  $rootScope.permitMenuItem = function(menuItem) {
    var result = false;
    return true;
    _.forEach(menuItem.submenu, function(u) {
      result = result || $rootScope.permitUrl(u.url);
    });
    return result;
  };

  //Check url acccess permission for this page
  if(!$rootScope.permitUrl($window.location.pathname) && $window.location.pathname.indexOf("/login") == -1) {
    $rootScope.DisablePage = true;
    util.page404();
  }

  //Get Shop activity
  $rootScope.shopStatus = {};
  _.forEach(config.SHOP_STATUS, function(item) {
    $rootScope.shopStatus[item.value] = item;
  });
  $rootScope.asShopStatus = function(status) {
    return _.isNil(status) ? config.SHOP_STATUS[0] : $rootScope.shopStatus[status];
  };

  //Load ck editor
  $rootScope.ckOptions = config.CK_DEFAULT_OPTIONS;

  //Create global logout function
  $rootScope.logout = function() {
    //console.log('Logging out of Profile', JSON.stringify($rootScope.Profile));

    var isAdmin = $rootScope.Profile.User.IsAdmin;

    //Logout-as
    if ($rootScope.Imposter) {
      return Credential.logoutAs().then(function(R) {
        //return to normal flow
        if (R.User.IsAdmin) {
          $window.location.href = "/admin";
        } else {
          $window.location.href = "/products";
        }
      }, function() {
        //alert("Fatal error while logging out.");
      });
    }
    else {  
      //Normal logout
        Credential.logout().finally(function() {
          $window.location.href = isAdmin ? "/admin/login" : "/login";
        });   
    }
  };

  //Handle change password
  $rootScope.changePassword = function() {
    var modal = $uibModal.open({
      size: 'change-password',
      windowClass: 'modal-custom',
      templateUrl: 'common/modalChangePassword',
      controller: function($rootScope, $scope, $uibModalInstance, NcAlert, Credential, common) {
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
              .then(function(r) {
                storage.storeSessionToken(r.User.Token, true);
                $scope.alert.success('Successfully changed password');
                $scope.formData = {};
                $scope.formData.error = false;
                $scope.form.$setPristine();
                $rootScope.$broadcast('change-password');
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

  //new version of route handler
  $rootScope.menu = [];
  $rootScope.initMenu = function(id) {
    var menu = route[id];
    $rootScope.menu = _.compact(_.map(menu, function(menuItem) {
      if($rootScope.permitMenuItem(menuItem)) {
        menuItem.submenu = _.compact(_.map(menuItem.submenu, function(submenuItem) {
          if($rootScope.permitUrl(submenuItem.url)) {
            return submenuItem;
          }
          return null;
        }));
        return menuItem;
      }
      return null; 
    }));
  };
  //Active class for sub menu
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
  //Active class for menu item
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

  //For permission navigator
  var traverseFalse = function(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
      arr[i].check = false;
      traverseFalse(arr[i].Children);
    };
  }
  $rootScope.checkRecursive = function(permObj, value) {
    if(value) {
      var parent = permObj.ParentNode;
      while(!_.isNil(parent)) {
        parent.check = true;
        parent = parent.ParentNode;
      }
    }
    else {
      if(permObj.Children.length > 0)
        traverseFalse(permObj.Children);
    }
  }
};