  module.exports = function ($scope, Credential, $window, NcAlert, $uibModal, storage, config) {
    'ngInject';
  $scope.uform = {};
  $scope.loginForm = {};
  $scope.events = {};
  $scope.alert = new NcAlert();
  var redir = storage.get('redirect');
  storage.remove('redirect');
  
  var profile = storage.getCurrentUserProfile();
  if (profile) {
    $window.location.href = Credential.getRedirPath(profile)
  }
  
  if(redir && redir != '/') {
    $scope.alert.open(false, 'Your session has timed out', '');
  }

  $scope.doLogin = function () {
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

    Credential.login(user, pass, true).then(function (r) {
      if(!r.User.IsAdmin){
          storage.clear();
          $scope.error = true;
          $scope.loading = false;
          $scope.loginForm.$setPristine();
          return;
      }

      $scope.loading = false;
      if (!redir || redir == '/') {
        redir = Credential.getRedirPath(r);
      }
      $window.location.href = redir;
    }, function (err) {
      storage.clear();
      $scope.error = true;
      $scope.loading = false;
      $scope.loginForm.$setPristine();
    });
  }
};