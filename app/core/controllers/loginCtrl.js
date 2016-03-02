/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Handle login page
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
  .controller('LoginCtrl', function ($scope, CredentialService, $window, NcAlert, $uibModal, storage, config) {
    $scope.uform = {};
    $scope.loginForm = {};
    $scope.events = {};
    $scope.alert = new NcAlert();
    var redir = storage.get('redirect');
    var profile = storage.getCurrentUserProfile();
    if (profile && profile.User.IsAdmin) {
      $window.location.href = CredentialService.getRedirPath(profile)
    }
    if(redir && redir != '/') {
      $scope.alert.open(false, 'Your session has timed out', '');
      storage.remove('redirect');
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
      CredentialService.login(user, pass).then(function (r) {
        $scope.loading = false;
        if (!redir) {
          redir = CredentialService.getRedirPath(r);
        }
        $window.location.href = redir;
      }, function (err) {
        storage.clear();
        $scope.error = true;
        $scope.loading = false;
        $scope.loginForm.$setPristine();
      });
    }
  });
