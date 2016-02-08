module.exports = ['$scope', 'Alert', 'Credential', '$window', 'storage', function($scope, Alert, Credential, $window, storage) {
	
	$scope.alert = new Alert();
	$scope.doLogin = function(){
		$scope.loading = true;

		Credential.login($scope.user, $scope.pass).then(function(r){
			
			console.log(r);
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