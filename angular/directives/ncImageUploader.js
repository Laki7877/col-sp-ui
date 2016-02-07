module.exports = ['FileUploader', '$templateCache', function(FileUploader, $templateCache) {
	return {
		restrict: 'EA',
		scope: {
			uploader: '=ncUploader',
			images: '=ncModel',
			options: '=ncOptions'
		},
		template: function(element, attr) {
			return $templateCache.get(attrs.ncTemplate);
		},
		link: function(scope, element, attrs) {
			//Default options
			scope.options = angular.extend({}, scope.options);

			if(angular.isUndefined(scope.uploader) && !(scope.uploader instanceof FileUploader)) {
				throw new TypeError('"uploader" must exist and is type of FileUploader.');
			}

			//Make sure to add or remove event for each images gallery
			var addEvents = function(scope) {
				scope.uploader.onAfterAddingFile = function(item) {
					var obj = { url: '' };
					scope.images.push(obj);
					item.indx = scope.images.length-1;
				};
				scope.uploader.onSuccessItem = function(item, response, status, headers) {
					scope.images[item.indx] = response;
				};
				scope.uploader.onErrorItem = function(item, response, status, headers) {
					scope.images.splice(item.indx, 1);
				};
			}
			var removeEvents = function(scope) {
				scope.uploader.onAfterAddingFile = null;
				scope.uploader.onSuccessItem = null;
				scope.uploader.onErrorItem = null;
			}
			//Watch for changes
			scope.$watch('images', function(val) {
				//Flush uploader object
				removeEvents(scope);
				scope.uploader.clearQueue();
				scope.uploader.cancelAll();
				addEvents(scope);
			});
		}
	}
}];