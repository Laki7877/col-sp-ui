module.exports = function($scope, $controller, AttributeSetService, AttributeService, config) {
	'ngInject';
	$scope.visibleOptions = config.DROPDOWN.VISIBLE_DROPDOWN;
	$scope.attributeOptions = [];
	$scope.tagOptions = [];
    $scope.onKeywordAdded = function(item, model){
		$scope.keywordValidConditions = {};
		if(!item) return $scope.formData.Tags.pop();

		if($scope.formData.Tags.length > 100){
			$scope.keywordValidConditions['tagcount'] = true;
		}

		if(item.length > 30){
			$scope.keywordValidConditions['taglength'] = true;
		}

		if(!item.match(/^[a-zA-Z0-9ก-ฮ\s\-]+$/)){
			$scope.keywordValidConditions['pattern'] = true;
		}

		if(Object.keys($scope.keywordValidConditions).length > 0){
			//if there is error, revert
			$scope.formData.Tags.pop();
		}
	};
	$scope.lockAttributeset = function(i) {	
		return false;
	};
	$scope.tagTransform = function(newTag) {
		return {
			TagName: newTag,
			match: function(i) {
				return this.TagName.match(i);
			}
		};
	};
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'AttributeSetId',
			url: '/admin/attributesets',
			item: 'Attribute Set',
			service: AttributeSetService,
			init: function(scope) {		
				//Get all available roles
				AttributeService.listAll()
					.then(function(data) {
						scope.attributeOptions = data;
					});
			}
		}
	});
}