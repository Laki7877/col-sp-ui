module.exports = ['$scope', 'NcAlert', 'Credential', '$window', 'storage', function($scope, NcAlert, Credential, $window, storage) {
	$scope.uform = {}
	$scope.alert = new NcAlert();
	$scope.doLogin = function(){
		if(!$scope.loginForm.$valid) return;
		$scope.loading = true;
		var user = $scope.uform.user;
		var pass = $scope.uform.pass;
		Credential.login(user, pass).then(function(r){
			$scope.alert.close();
			$scope.loading = false;
            console.log(r);
            
			var redir = storage.get('redirect');
			if(!redir){
				redir = "/products/";
                if(r.User.IsAdmin){
                    redir = "/admin/";
                }
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
