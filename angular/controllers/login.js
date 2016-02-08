module.exports = ['$scope', 'Alert', 'Credential', '$window', 'storage', function($scope, Alert, Credential, $window, storage) {
	$scope.uform = {}
	$scope.alert = new Alert();
	$scope.doLogin = function(){
		if(!$scope.loginForm.$valid) return;
		$scope.loading = true;
		var user = $scope.uform.user; //$scope.loginForm.user.$viewValue;
		var pass = $scope.uform.pass; //$scope.loginForm.pass.$viewValue;
		Credential.login(user, pass).then(function(r){
			$scope.alert.close();
			$scope.loading = false;

			var redir = storage.get('redirect');
			if(!redir){
				redir = "/";
			}else{
				storage.remove('redirect');
			}

			$window.location.href = redir;
		}, function(){
			storage.clear();
			$scope.alert.error('Incorrect user name or passsword');
			$scope.loading = false;
		});
	}
}];
