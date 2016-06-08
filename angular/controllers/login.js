/**
 * Handle login page
 */
module.exports = function ($scope, Credential, $window, NcAlert, $uibModal, storage, config) {
    'ngInject';
  $scope.uform = {}; //user validation form
  $scope.loginForm = {}; //login form
  $scope.events = {};
  $scope.alert = new NcAlert();

  //get redirect
  var redir = storage.get('redirect');
  storage.remove('redirect');
  
  //get profile from session
  var profile = storage.getCurrentUserProfile();

  //profile admin
  if (profile && !profile.User.IsAdmin) {
        Credential.checkToken()
        .then(function() {
          $window.location.href = Credential.getRedirPath(profile)
        }, function() {
          storage.clear();
        });
  }
  
  //get session timeout from storage
  if(storage.poke('session_timeout')) {
    $scope.alert.open(false, 'Your session has expired', '');
  }

  //get access deny from storage
  if(storage.poke('access_denied')) {
    $scope.alert.error('Access denied');
  }

  //login action
  $scope.doLogin = function () {
    //check if login is valid
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

    //call login endpoint
    Credential.login(user, pass, false).then(function (r) {
      //allow pass only if login user is admin
      if(r.User.IsAdmin){
          storage.clear();
          $scope.error = true;
          $scope.loading = false;
          $scope.loginForm.$setPristine();
          return;
      }

      $scope.loading = false;

      //redirect
      if (!redir || redir == '/') {
        redir = Credential.getRedirPath(r);
      }

      //login flag
      storage.put('login', true);

      $window.location.href = redir;
    }, function (err) {
      storage.clear();
      $scope.error = true;
      $scope.loading = false;
      $scope.loginForm.$setPristine();
    });
  }
};