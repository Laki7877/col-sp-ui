module.exports = function($scope, $controller, AdminShoptypeService, ShopPermissionService, ShopAppearanceService, PermissionService, util, $q) {
	'ngInject';

	var deserializeTheme = function(load) {
		if(load) {
			var themes = $scope.formData.Themes;
			$scope.formData.Themes = [];
			_.forEach($scope.themes, function(t) {
				if(_.findIndex(themes, function(e) {
					return t.ThemeId == e.ThemeId;
				}) >= 0) {
					t.check = true;
				} else {
					t.check = false;
				}
				$scope.formData.Themes.push(t);
			});
		} else {
			$scope.formData.Themes = $scope.themes;
			_.forEach($scope.formData.Themes, function(t) {
				t.check = false;
			});
		}
	}
	//Inherit from parent
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'ShopTypeId',
			url: '/admin/shoptypes',
			item: 'Shop Type',
			service: AdminShoptypeService,
			onLoad: function(scope, load) {
				$scope.loading = true;

				$q.all([ShopPermissionService.listAll(), ShopAppearanceService.getThemes()]).then(function(res) {
					var data = res[0]
					$scope.permissions = data;
					if(load) {
						$scope.formData.Permissions = PermissionService.deserialize($scope.formData.Permission, $scope.permissions);
					} else {
						$scope.formData.Permissions = PermissionService.generate($scope.permissions);
					}

					$scope.selectAll = true;
					_.forOwn($scope.formData.Permissions, function(v,k) {
						util.traverse(v, 'Children', function(e) {
							$scope.selectAll = $scope.selectAll && e.check;
						});
					});

					//All theme
					$scope.themes = res[1];
					deserializeTheme(load);

					_.forEach($scope.formData.Themes, function(e) {
						$scope.selectAll = $scope.selectAll && e.check;
					})

				}).finally(function() {
					$scope.loading = false;
				});
			},
			onSave: function(scope) {
				scope.formData.Permission = PermissionService.serialize(scope.formData.Permissions);
				scope.formData.Themes = _.compact(_.map(scope.formData.Themes, function(e){
					var check = e.check;
					_.unset(e, ['check']);
					if(check) {
						return e;
					} else {
						return null;
					}
				}));
			},
			onAfterSave: function(scope) {
				scope.formData.Permissions = PermissionService.deserialize(scope.formData.Permission, scope.permissions);
				$scope.selectAll = true;
				_.forOwn($scope.formData.Permissions, function(v,k) {
					util.traverse(v, 'Children', function(e) {
						$scope.selectAll = $scope.selectAll && e.check;
					});
				});
				deserializeTheme(true);
				_.forEach($scope.formData.Themes, function(e) {
					$scope.selectAll = $scope.selectAll && e.check;
				})
			}
		}
	});
	$scope.group = ['Dashboard', 'Products', 'Promotion', 'Report', 'Local Category', 'Local Brand', 'CMS'];
	$scope.checkAll = function(val) {
		_.forOwn($scope.formData.Permissions, function(v,k) {
			util.traverse(v, 'Children', function(e) {
				e.check = val;
			});
		});
		_.forEach($scope.formData.Themes, function(e) {
			e.check = val;
		})
	};
};
