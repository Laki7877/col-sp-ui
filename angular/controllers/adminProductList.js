module.exports = function($scope, $controller, Product, common, config) {
	'ngInject';
	$controller('AbstractAdvanceListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/products',
			service: Product,
			item: 'Product',
			order: 'UpdatedDt',
			id: 'ProductId',
			actions: ['View'],
			bulks: ['Show', 'Hide',
            {
                name: 'Publish',
                fn: function(arr, cb) {
                    $scope.alert.close();

                    if(arr.length == 0) {
                        $scope.alert.error('Unable to Publish. Please select Product for this action.');
                        return;
                    }

                    Product.bulkPublish(_.map(arr, function(e) {
                        return _.pick(e, ['ProductId']);
                    })).then(function() {
                        cb();
                        $scope.alert.success('Successfully published ' + arr.length + ' products')
                    }, function(resp) {
                        $scope.alert.error(common.getError(resp));
                    }).finally(function() {
                        $scope.reload();
                    });
                },
                confirmation: {
                    title: 'Confirm to publish',
                    message: 'Are you sure you want to publish {{model.length}} products?',
                    btnConfirm: 'Publish',
                    btnClass: 'btn-green'
                }
            },
            {
		        name: 'Add Tags',
		        fn: function(add, cb, model) {
		            $scope.alert.close();
		            Product.addTags(model).then(function() {
		                cb();
		                $scope.alert.success('Successfully add tags for ' + add.length + ' products')
		            }, function(resp) {
		                $scope.alert.error(common.getError(resp));
		            }).finally(function() {
		                $scope.reload();
		            });
		        },
		        modal: {
		            size: 'size-warning',
		            templateUrl: 'product/modalAddTags',
		            controller: function($scope, $uibModalInstance, data) {
		                $scope.model = {
		                	tags: []
		                };
		                $scope.close = function() {
		                    $uibModalInstance.close({
		                        Products: _.map(data, function(e) {
		                            return _.pick(e, ['ProductId']);
		                        }),
		                        Tags: $scope.model.tags
		                    })
		                };
		            }
		        }
		    }],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Approved", value: 'Approved'},
				{ name: "Not Approved", value: 'NotApproved'},
				{ name: "Wait For Approval", value: 'WaitForApproval'},
				{ name: "Draft", value: 'Draft'},
                { name: "Master Product", value: 'MasterProduct'}
			]
		}
	});
    $scope.statusLookup = {};
	$scope.statusDropdown = config.PRODUCT_STATUS;    
	config.PRODUCT_STATUS.forEach(function(object){
       $scope.statusLookup[object.value] = object;
    });
    $scope.asStatus = function (ab) {
        return $scope.statusLookup[ab];
    };
    $scope.getTag = function(tags) {
        return _.join(tags, ', ');
    }
    $scope.exportSelected = function(){
        $scope.alert.close();
        if($scope.bulkContainer.length == 0) {
            $scope.alert.error('Unable to Export. Please select Product for this action.');
        }
        else {
        	document.getElementById('exportForm').submit();
    	}
    };
    $scope.exportSearchResult = function(){
        var K = _.extend({}, $scope.params, $scope.serializeAdvanceSearch($scope.advanceSearchParams));
        K._limit = 2147483647;
        $scope.searchCriteria = $base64.encode(JSON.stringify(K));
        
        $timeout(function(){
            console.log('searchCriteria', $scope.searchCriteria);
            document.getElementById('exportForm').submit();
        });
    }
};