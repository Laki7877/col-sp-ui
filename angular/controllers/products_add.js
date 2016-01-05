module.exports = ['$scope', '$http', 'Product', 'Image', 'FileUploader',  function($scope, $http, Product, Image, FileUploader){
		$scope.uploader = Image.getUploader();
}];
