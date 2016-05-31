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
			controller: function($scope, $uibModalInstance, AdminShopService, NcAlert, config, common, id, uploader, util) {
				'ngInject';
				$scope.formData = {};
				$scope.form = {};
				$scope.loading = false;
				$scope.saving = false;
				$scope.alert = new NcAlert();
				$scope.shopGroupOptions = config.DROPDOWN.SHOP_GROUP_DROPDOWN;
				$scope.shops = {
					include: {
						data: [],
						loading: false
					},
					exclude: {
						data: [],
						loading: false
					}
				};

				//Load
				if(id != 0) {
					$scope.loading = true;
					NewsletterService.get(id)
						.then(function(data) {
							$scope.formData = NewsletterService.deserialize(data);
						}, function() {
							$uibModalInstance.dismiss();
						})
						.finally(function() {
							$scope.loading = false;
						});
				} else {
					$scope.formData = NewsletterService.generate();
				}
				$scope.getShops = function(search, key) {
					$scope.shops[key].loading = true;
					AdminShopService.list({
							searchText: search,
							_limit: 8
						})
						.then(function(data) {
							$scope.shops[key].data = data.data;
						})
						.finally(function() {
							$scope.shops[key].loading = false;
						})
				};
				$scope.upload = function($file) {
					if(_.isNil($file)) {
						return;
					}
					$scope.formData.Image = {
						Url: '/assets/img/loader.gif'
					};
					uploader.upload($file)
						.then(function(response) {
							$scope.formData.Image = response.data;
						}, function(err) {
							$scope.formData.Image = null;
							$scope.alert.error(common.getError(err.data));
						});
				};
				$scope.save = function() {
					$scope.alert.close();
					if($scope.form.$invalid) {
						$scope.alert.error(util.saveAlertError());
						return;
					}
					$scope.saving = true;
					if(id == 0) {
						//Create
						NewsletterService.create(NewsletterService.serialize($scope.formData))
							.then(function() {
								$uibModalInstance.close();
							}, function(err) {
								$scope.alert.error(common.getError(err));
							})
							.finally(function() {
								$scope.saving = false;
							});
					} else {
						//Update
						NewsletterService.update(id, NewsletterService.serialize($scope.formData))
							.then(function() {
								$scope.alert.success('Successfully Saved');
							}, function(err) {
								$scope.alert.error(common.getError(err));
							})
							.finally(function() {
								$scope.saving = false;
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
			$scope.reload();
			$scope.alert.success('Successfully created.')
		});
	};
};