module.exports = function($rootScope, $window, storage, Credential, route) {
	'ngInject';
	//Root controller of the application
	$rootScope._ = _;
	$rootScope.Profile = storage.getCurrentUserProfile();
  $rootScope.Imposter = storage.getImposterProfile();
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
  $rootScope.activeSubmenuItem = function(item) {
    var path = $window.location.pathname;
    var url = item.url;
    if(path.startsWith(item.url) && item.url.length > 1) {
      var check = path.replace(item.url, '');
      if(check.length == 0 || check.charAt(0) === '/' || check.charAt(0) === '?') {
        return 'active';
      } else {
        return '';
      }
    }

    return '';
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
};