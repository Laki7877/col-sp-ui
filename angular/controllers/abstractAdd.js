module.exports = function($scope, $window, NcAlert, util, common, options) {
	'ngInject';
	$scope.formData = {};
	$scope.form = {};
	$scope.alert = new NcAlert();
	$scope.saving = false; //prevent multiple saving
	$scope.loading = false;
	
	//Message
	$scope.loadingMessage = 'Loading ' + pluralize(options.item);
	$scope.savingMessage = 'Saving ' + pluralize(options.item);

	//Link
	$scope.url = options.url;

	//Custom pre-init function
	(options.preInit || _.noop)($scope);

	//Pop up javascript warning message on leave
	util.warningOnLeave(function() {
		return $scope.form.$dirty;
	});

	$scope.init = function(params) {
		//Fetch GET Params
		if(!_.isUndefined(params)) {
			$scope.id = _.isInteger(_.parseInt(params.id)) ? _.parseInt(params.id) : params.id;
		}
		//Custom init
		if(options.init) {
			options.init($scope)
		}

		//Edit mode
		if(!_.isUndefined($scope.id)) {
			$scope.loading = true;
			$scope.title = util.getTitle($scope.id,options.item);

			//Get by id
			options.service.get($scope.id)
				.then(function(data) {
					$scope.formData = options.service.deserialize(data);
					$scope.loading = false;
					(options.onLoad || _.noop)($scope, true);

					if(options.dateFields){
						options.dateFields.forEach(function(df){
								$scope.formData[df] = new Date($scope.formData[df]);
						});
					}

				}, function() {
					//Jump back
					$window.location.href = $scope.url;
				});
		} else {
			//Create mode
			$scope.id = 0;
			$scope.formData = options.service.generate();
			(options.onLoad || _.noop)($scope, false);
		}
	}
	$scope.cancel = function() {
		//Back to listing
		$window.location.href=options.url;
	};
	$scope.save = function() {
		//Already saving
		if($scope.saving) return;

		if(options.onSave && options.onSave($scope)) return;

		//Activate form submission
		$scope.form.$setSubmitted();

		//Form validation
		if($scope.form.$valid) {
			$scope.saving = true;
			$scope.alert.close();
			var data = options.service.serialize($scope.formData);
			var restoreDf = {};
			if(options.dateFields){
				options.dateFields.forEach(function(df){
						restoreDf[df] = angular.copy($scope.formData[df]);
						$scope.formData[df] = moment($scope.formData[df]).format('LLL');
				});
			}

			if($scope.id > 0) {
				//Edit mode
				options.service.update($scope.id, data)
					.then(function(result) {
						$scope.formData = options.service.deserialize(result);
						$scope.alert.success(options.success || util.saveAlertSuccess(options.successItem || options.item, options.url));
						$scope.form.$setPristine(true);
						(options.onAfterSave || _.noop)($scope, true);
					}, function(err) {
						$scope.alert.error(common.getError(err));
					})
					.finally(function() {
						$scope.saving = false;
						if(options.dateFields){
							options.dateFields.forEach(function(df){
									$scope.formData[df] = restoreDf[df];
							});
						}
					});
			} else {
				//Save mode
				options.service.create(data)
					.then(function(result) {
						//Set both id and formData[id]
						$scope.id = result[options.id];
						$scope.formData = options.service.deserialize(result);
						$scope.alert.success(options.success || util.saveAlertSuccess(options.successItem || options.item, options.url));
						$scope.form.$setPristine(true);
						(options.onAfterSave || _.noop)($scope, false);
					}, function(err) {
						$scope.alert.error(common.getError(err));
					})
					.finally(function() {
						$scope.saving = false;
						if(options.dateFields){
							options.dateFields.forEach(function(df){
								$scope.formData[df] = restoreDf[df];
							});
						}
					});
			}
		} else {
			//Form id
			$scope.alert.error(util.saveAlertError());
		}
	};

	$scope.$watch('id', function(val) {
		//Change title according to state
		$scope.title = util.getTitle(val,options.item);
	});
};
