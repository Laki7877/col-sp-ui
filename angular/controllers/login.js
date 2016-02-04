module.exports = ['$scope', 'Alert', 'Credential', '$window', 'storage', function($scope, Alert, Credential, $window, storage) {
	$scope.$watch('username', function(){
		console.log($scope.username, 'object');
	});
	$scope.formData = {};
	$scope.alert = new Alert();
	$scope.doLogin = function(){
		$scope.loading = true;
		var user = $scope.loginForm.user.$viewValue;
		var pass = $scope.loginForm.pass.$viewValue;
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
			$scope.alert.error('Invalid Credential');
			$scope.loading = false;
		});
	}
}];
