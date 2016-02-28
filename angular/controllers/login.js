  module.exports = function ($scope, Credential, $window, storage, config) {
    'ngInject';
  $scope.uform = {};
  $scope.loginForm = {};
  $scope.events = {};

  var profile = storage.getCurrentUserProfile();
  if (profile && profile.User.IsAdmin) {
    $window.location.href = Credential.getRedirPath(profile)
  }
  $scope.doLogin = function () {
    if ($scope.loginForm.$invalid) {
      return;
    }
    $scope.loading = true;
    $scope.error = false;
    var user = $scope.uform.user;
    var pass = $scope.uform.pass;
    Credential.login(user, pass).then(function (r) {
      $scope.loading = false;
      var redir = storage.get('redirect');
      if (!redir) {
        redir = Credential.getRedirPath(r);
      } else {
        storage.remove('redirect');
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
