module.exports = ['$scope', 'Product', 'util', 'Alert', '$window', function ($scope, Product, util, Alert, $window) {
    $scope.response = [];
    $scope.filterOptions = [
			{ name: "All", value: 'All'},
			{ name: "Image Missing", value: 'ImageMissing'},
			{ name: "Approved", value: 'Approved'},
			{ name: "Not Approved", value: 'NotApproved'},
			{ name: "Wait Approval", value: 'WaitApproval'}
	];

	$scope.params = {
			_order: 'ProductId',
			_limit: 10,
			_offset: 0,
			_direction: 'asc',
			_filter: 'All'
	};

	$scope.reload = function(){
		$scope.loading = true;
		Product.getAllVariants($scope.params).then(function(data){
			$scope.loading = false;
	        $scope.response = data;
	    });
	}
   
    $scope.$watch('params', $scope.reload, true);
}];
