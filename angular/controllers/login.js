module.exports = ['$scope', 'storage', '$base64', 'Alert', 'Credential', '$window', function($scope, storage, $base64, Alert, Credential, $window) {
	
	$scope.alert = new Alert();
	$scope.doLogin = function(){
		$scope.loading = true;
		storage.storeSessionToken($base64.encode($scope.user + ":" + $scope.pass));
		Credential.getPermissions().then(function(r){
			storage.storeCurrentUserProfile(r, false);
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