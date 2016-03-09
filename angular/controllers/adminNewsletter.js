module.exports = function($scope, $controller, $uibModal, NewsletterService) {
	'ngInject';
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/newsletters',
			service: NewsletterService,
			item: 'Newsletter',
			order: 'CreatedDt',
			id: 'NewsletterId',
			actions: [{
				name: 'View / Edit',
				fn: function(item) {
					$scope.open(item);
				}
			}, 'Delete']
		}
	});
	$scope.open = function(item) {
		var modal = $uibModal.open({
			size: 'lg',
			templateUrl: 'newsletter/modalAdmin',
			controller: function($scope, $uibModalInstance, NcAlert, id) {
				'ngInject';
				$scope.formData = item;
				$scope.form = {};
				$scope.alert = new NcAlert();
				$scope.save = function() {
					if(id == 0) {
						//Create
						NewsletterService.create(NewsletterService.serialize(res))
							.then(function() {
								$uibModalInstance.close();
							}, function(err) {
								$scope.alert.error(common.getError(err));
							});
					} else {
						//Update
						NewsletterService.update(id, NewsletterService(serialize(res)))
							.then(function() {
								$uibModalInstance.close();
							}, function(err) {
								$scope.alert.error(common.getError(err));
							});
					}
				}
			},
			resolve: {
				id: function() {
					return _.isNil(item) ? 0 : item.NewsletterId;
				}
			}
		});
		modal.result.then(function(res) {
		});
	};
};