module.exports = function($scope, $controller, $uibModal, NewsletterService, ImageService) {
	'ngInject';
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/newsletters',
			service: NewsletterService,
			item: 'Newsletter',
			order: 'PublishedDt',
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
			controller: function($scope, $uibModalInstance, NcAlert, config, id, uploader) {
				'ngInject';
				$scope.formData = NewsletterService.generate();
				$scope.form = {};
				$scope.alert = new NcAlert();
				$scope.shopGroupOptions = config.DROPDOWN.SHOP_GROUP_DROPDOWN;

				//Load
				if(id == 0) {
					NewsletterService.get(id)
						.then(function(data) {
							$scope.formData = NewsletterService.deserialize(data);
						}, function() {
							$uibModalInstance.dismiss();
						});
				}

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
				},
				uploader: function() {
					return ImageService.getUploaderFn('/NewsletterImages');
				}
			}
		});
		modal.result.then(function(res) {
		});
	};
};