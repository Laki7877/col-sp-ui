module.exports = function(storage, Credential, $window) {
	'ngInject';
  var profile = storage.getCurrentUserProfile()
  if (profile && profile.User.IsAdmin) {
    $window.location.href = Credential.getRedirPath(profile);
  } else {
  	$window.location.href = '/login';
  }
}