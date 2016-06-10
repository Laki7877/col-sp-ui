/**
 * Handle admin login page
 */
  module.exports = function ($scope, Credential, $window, NcAlert, $uibModal, storage, config) {
    'ngInject';
    // user form
    $scope.uform = {};
    $scope.loginForm = {}; //login form
    $scope.events = {};
    $scope.alert = new NcAlert();
    var redir = storage.get('redirect');
    storage.remove('redirect');
    
    // get stored profile, if any
    var profile = storage.getCurrentUserProfile();
    if (profile && profile.User.IsAdmin) {
      $window.location.href = Credential.getRedirPath(profile)
    }
    
    // see if this is a redirect due to session timeout
    if(storage.poke('session_timeout')) {
      $scope.alert.open(false, 'Your session has timed out', '');
    }

    // see if this is a redirect due to access deny
    if(storage.poke('access_denied')) {
      $scope.alert.error('Access denied');
    }
    
    // login action
    $scope.doLogin = function () {
      // form validate
      if ($scope.loginForm.$invalid) {
        if(_.isEmpty($scope.events)) {
          $scope.events.user = false;
          $scope.events.pass = false;
        }
        return;
      }

      $scope.loading = true;
      $scope.error = false;
      var user = $scope.uform.user;
      var pass = $scope.uform.pass;

      // call credential endpoint
      Credential.login(user, pass, true).then(function (r) {
        // if is not admin, do not allow pass
        if(!r.User.IsAdmin){
            storage.clear();
            $scope.error = true;
            $scope.loading = false;
            $scope.loginForm.$setPristine();
            return;
        }

        $scope.loading = false;
        //if there's redir, redirect to that page
        if (!redir || redir == '/') {
          redir = Credential.getRedirPath(r);
        }
        $window.location.href = redir;
      }, function (err) {
        //auth error
        storage.clear();
        $scope.error = true;
        $scope.loading = false;
        $scope.loginForm.$setPristine();
      });
    }
};
