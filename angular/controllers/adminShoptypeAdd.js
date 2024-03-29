/**
 * Handle admin shop type add
 */
module.exports = function($scope, $controller, AdminShoptypeService, ShippingService, ShopPermissionService, ShopAppearanceService, PermissionService, util, $q) {
	'ngInject';
	//decode theme
	var deserializeTheme = function(load) {
		if(load) {
			var themes = $scope.formData.Themes;
			$scope.formData.Themes = [];
			
			//get theme checked according to formData
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
			//get all themes and checked to false
			$scope.formData.Themes = $scope.themes;
			_.forEach($scope.formData.Themes, function(t) {
				t.check = false;
			});
		}
	}

	// get shipping permissions
	var deserializeShip = function(load) {
		if(load) {
			var shippings = $scope.formData.Shippings;
			$scope.formData.Shippings = [];
			_.forEach($scope.shippings, function(t) {
				if(_.findIndex(shippings, function(e) {
					return t.ShippingId == e.ShippingId;
				}) >= 0) {
					t.check = true;
				} else {
					t.check = false;
				}
				$scope.formData.Shippings.push(t);
			});
		} else {
			$scope.formData.Shippings = $scope.shippings;
			_.forEach($scope.formData.Shippings, function(t) {
				t.check = false;
			});
		}
	}
	//selectall parent obj
	$scope.obj = {};

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

				// list permissions, then list shop, then list theme
				// results (array) is given in res
				$q.all([ShopPermissionService.listAll(), ShopAppearanceService.getThemes(), ShippingService.listAll()]).then(function(res) {
					var data = res[0]
					$scope.permissions = data;
					if(load) {
						$scope.formData.Permissions = PermissionService.deserialize($scope.formData.Permission, $scope.permissions);
					} else {
						$scope.formData.Permissions = PermissionService.generate($scope.permissions);
					}

					$scope.obj.selectAll = true;
					_.forOwn($scope.formData.Permissions, function(v,k) {
						util.traverse(v, 'Children', function(e) {
							$scope.obj.selectAll = $scope.obj.selectAll && e.check;
						});
					});

					//All theme
					$scope.themes = res[1];
					deserializeTheme(load);

					_.forEach($scope.formData.Themes, function(e) {
						$scope.obj.selectAll = $scope.obj.selectAll && e.check;
					})

					//All shippings
					$scope.shippings = res[2];
					deserializeShip(load);

					_.forEach($scope.formData.Shippings, function(e) {
						$scope.obj.selectAll = $scope.obj.selectAll && e.check;
					})

				}).finally(function() {
					$scope.loading = false;
				});
			},
			onSave: function(scope) {
				//serialize permission
				scope.formData.Permission = PermissionService.serialize(scope.formData.Permissions);
				//get only themes with check true
				scope.formData.Themes = _.compact(_.map(scope.formData.Themes, function(e){
					var check = e.check;
					_.unset(e, ['check']);
					if(check) {
						return e;
					} else {
						return null;
					}
				}));
				//get only ships with check true
				scope.formData.Shippings = _.compact(_.map(scope.formData.Shippings, function(e){
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
				//deserialize permission for show
				scope.formData.Permissions = PermissionService.deserialize(scope.formData.Permission, scope.permissions);
				$scope.obj.selectAll = true;

				//get select all flag
				_.forOwn($scope.formData.Permissions, function(v,k) {
					util.traverse(v, 'Children', function(e) {
						$scope.obj.selectAll = $scope.obj.selectAll && e.check;
					});
				});
				deserializeTheme(true);
				_.forEach($scope.formData.Themes, function(e) {
					$scope.obj.selectAll = $scope.obj.selectAll && e.check;
				});
				deserializeShip(true);
				_.forEach($scope.formData.Shippings, function(e) {
					$scope.obj.selectAll = $scope.obj.selectAll && e.check;
				});
			}
		}
	});
	
	//circular json stringify
	var cj = require('circular-json');

	// get select all flag
	$scope.$watch(function() {
		return cj.stringify($scope.formData);
	}, function() {
		$scope.obj.selectAll = true;
		_.forOwn($scope.formData.Permissions, function(v,k) {
			util.traverse(v, 'Children', function(e) {
				$scope.obj.selectAll = $scope.obj.selectAll && e.check;
			});
		});
		_.forEach($scope.formData.Themes, function(e) {
			$scope.obj.selectAll = $scope.obj.selectAll && e.check;
		});
		_.forEach($scope.formData.Shippings, function(e) {
			$scope.obj.selectAll = $scope.obj.selectAll && e.check;
		});
	});
	//list of permission group
	$scope.group = ['Dashboard', 'Products', 'Promotion', 'Report', 'Local Category', 'Local Brand', 'CMS'];
	//check all fn
	$scope.checkAll = function(val) {
		_.forOwn($scope.formData.Permissions, function(v,k) {
			util.traverse(v, 'Children', function(e) {
				e.check = val;
			});
		});
		_.forEach($scope.formData.Themes, function(e) {
			e.check = val;
		});
		_.forEach($scope.formData.Shippings, function(e) {
			e.check = val;
		});
	};
};
