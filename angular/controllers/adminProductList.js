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
				{ name: "Draft", value: 'Draft'}
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
        document.getElementById('exportForm').submit();
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