module.exports = function($scope, $controller, AttributeService, ImageService, config, util, common) {
	'ngInject';
	$scope.dataTypeOptions = config.DROPDOWN.DATA_TYPE_DROPDOWN;
	$scope.variantOptions = config.DROPDOWN.VARIANT_DROPDOWN;
	$scope.boolOptions = config.DROPDOWN.YES_NO_DROPDOWN;
	$scope.validationOptions = config.DROPDOWN.VALIDATION_DROPDOWN;
	$scope.visibleToOptions = config.DROPDOWN.DEFAULT_ATTRIBUTE_VISIBLE_DROPDOWN;

	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'AttributeId',
			url: '/admin/attributes',
			item: 'Attribute',
			service: AttributeService,
			init: function(scope) {	},
			onLoad: function(scope, flag) {
				if(flag) {
					scope.alreadyDefault = scope.formData.DefaultAttribute;
				}
			},
			onAfterSave: function(scope) {
				scope.alreadyDefault = scope.formData.DefaultAttribute;
			}
		}
	});

	var uploader = ImageService.getUploaderFn('/AttributeValueImages');
 	
 	//Preview image
 	$scope.preview = util.previewImage;

 	//Brand image
 	$scope.upload = function($file, choice) {
 		$scope.alert.close();
 		choice.Image = {
 			url: '/assets/img/placeholder-no-image-blank.png'
 		};
 		uploader.upload($file).then(function(response) {
 			choice.Image = response.data;
 		}, function(response) {
 			_.unset(choice, ['Image']);
 			$scope.alert.error(common.getError(response.data));
 		})
 	};

	$scope.$watch('formData.DataType', function() {
		if($scope.formData.DataType == 'HB' ||
			$scope.formData.DataType == 'ST') {
			$scope.formData.VariantStatus = false;
		}
		if($scope.formData.DataType == 'LT') {
			$scope.variantOptions = config.DROPDOWN.VARIANT2_DROPDOWN;
		} else {
			$scope.variantOptions = config.DROPDOWN.VARIANT_DROPDOWN;
		}
	}, true);

	$scope.$watch('formData.VisibleTo', function() {
		$scope.formData.Required = false;
	});
};