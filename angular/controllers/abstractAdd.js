module.exports = function($scope, $window, NcAlert, util, common, options) {
	'ngInject';
	$scope.formData = {};
	$scope.form = {};
	$scope.alert = new NcAlert();
	$scope.saving = false; //prevent multiple saving
	$scope.loading = false;

	util.warningOnLeave($scope, 'form');

	$scope.init = function(params) {
		//Fetch GET Params
		if(!_.isUndefined(params)) {
			$scope.id = _.isInteger(_.parseInt(params.id)) ? _.parseInt(params.id) : 0;
		}
		//Get all available roles
		if(options.init) {
			options.init($scope)
		}

		//Edit mode
		if($scope.id > 0) {
			$scope.loading = true;
			$scope.title = util.getTitle($scope.id,options.item);
			
			//Get by id
			options.service.get($scope.id)
				.then(function(data) {
					$scope.formData = options.service.deserialize(data);
					$scope.loading = false;
				}, function() {
					//Jump back
					util.page404();
				});
		} else {
			//Create mode
			$scope.formData = options.service.generate();
		}
	}
	$scope.cancel = function() {
		//Back to listing
		$window.location.href=options.url;
	};
	$scope.save = function() {
		//Already saving
		if($scope.saving) return;

		//Activate form submission
		$scope.form.$setSubmitted();

		//Form validation
		if($scope.form.$valid) {
			$scope.saving = true;
			$scope.alert.close();
			var data = options.service.serialize($scope.formData);

			if($scope.id > 0) {
				//Edit mode
				options.service.update($scope.id, data)
					.then(function(result) {
						$scope.alert.success(util.saveAlertSuccess(options.item, options.url));
						$scope.form.$setPristine(true);
					}, function(err) {
						$scope.alert.error(common.getError(err));
					})
					.finally(function() {
						$scope.saving = false;
					});
			} else {
				//Save mode
				options.service.create(data)
					.then(function(result) {
						$scope.id = result[options.id];
						$scope.formData[options.id] = result[options.id]; 
						$scope.alert.success(util.saveAlertSuccess(options.item, options.url));
						$scope.form.$setPristine(true);
					}, function(err) {
						$scope.alert.error(common.getError(err));
					})
					.finally(function() {
						$scope.saving = false;
					});	
			}
		} else {
			//Invalid save
			$scope.alert.error(util.saveAlertError());
		}
	};

	$scope.$watch('id', function(val) {
		$scope.title = util.getTitle(val,options.item);
	});
};