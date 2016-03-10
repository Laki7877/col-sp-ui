var angular = require('angular');

module.exports = function ($scope, $controller, storage) {
    'ngInject';
    
    $controller('AbstractProductAddCtrl', {
        $scope: $scope,
        options: {
            maxImageUploadQueueLimit: 25
        }
    });

    $scope._debugLoad = function(){

	    var checkpoint = prompt("Enter checkpoint name you want to load from");
	    $scope.formData = JSON.parse(storage.get('save-fd-' + checkpoint));
	    $scope.dataset = JSON.parse(storage.get('save-ds-' + checkpoint));
	    $scope.variationFactorIndices.iterator = JSON.parse(storage.get('save-it-' + checkpoint));
	    $scope.controlFlags = JSON.parse(storage.get('save-cf-' + checkpoint));

	    console.log($scope.formData, "loaded");
	    $scope.variantPtr = $scope.formData.MasterVariant;
	    $scope.imagesPtr = $scope.formData.MasterVariant.Images;
    }

    $scope._debugSave = function(){

	    var checkpoint = prompt("Enter checkpoint name, you will need to enter this name when you want to load..");
	    $scope.formData.GlobalCategories.forEach(function(gc){
	    	if(gc == null) return;
		delete gc.nodes;
		delete gc.parent;
	    });
	     
	    delete $scope.dataset.GlobalCategories;
	    delete $scope.dataset.LocalCategories; 
	    console.log($scope.dataset, $scope.variationFactorIndices);
 
	    storage.put('save-cf-' + checkpoint, JSON.stringify($scope.controlFlags));
	    storage.put('save-fd-' + checkpoint, JSON.stringify($scope.formData));
	    storage.put('save-ds-' + checkpoint, JSON.stringify($scope.dataset));
	    storage.put('save-it-' + checkpoint, JSON.stringify($scope.variationFactorIndices.iterator));
    }; 

};
