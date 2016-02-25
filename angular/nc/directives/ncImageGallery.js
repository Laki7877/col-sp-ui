angular.module('nc')
	.directive('ncImageGallery', function($templateCache, $uibModal) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				model: '=ncModel',
				options: '=ncImageGalleryOptions',
				lock: '&?ncImageGalleryDisabled'
			},
			template: $templateCache.get('common/ncImageGallery'),
			link: function(scope) {
				scope.options = _.defaults(scope.options, {
					actions: [],
					size: 10, //max size of gallery
					urlKey: 'url', //image[urlKey] to get src
					loaderImg: '/assets/img/loader.gif', //when image[urlKey] = ''
					emptyImg: '/assets/img/placeholder-no-image-blank.png' //when image = null 
				});
				scope.lock = _.defaults(scope.lock, function() { return false; });
				scope.getSrc = function(image) {
					if(image == null) {
						//Empty
						return scope.options.emptyImg;
					} else if(image[scope.options.urlKey] == '') {
						return scope.options.loaderImg;
					} else {
						return image[scope.options.urlKey];
					}
				};
				scope.isDisabled = function(image) {
					return _.isNull(image) || scope.lock();
				};
				scope.call = function(action, image) {
					if(scope.isDisabled(image)) return;
					var index = scope.model.indexOf(image);
					
					if(action.confirmation) {
						var modal = $uibModal.open({
							size: 'size-warning',
							templateUrl: 'common/ncActionModal',
							controller: function($scope, $uibModalInstance, options, $interpolate) {
								$scope.title = options.title;
								$scope.message = $interpolate(options.message)(scope);
								$scope.yes = function() {
									$uibModalInstance.close();
								};
								$scope.no = function() {
									$uibModalInstance.dismiss();
								}
							},
							resolve: {
								options: function() {
									return {
										title: action.confirmation.title,
										message: action.confirmation.message
									}
								}
							}
						});

						modal.result.then(function() {
							action.fn(image, scope.model, index);
						})
					} else {
						action.fn(image, scope.model, index);
					}
				}
				var load = function() {
					scope.images = _.clone(scope.model);
					for (var i = 0; i < scope.options.size - scope.model.length; i++) {
						scope.images.push(null);
					};
				};
				scope.$watch('model', load, true);
			}
		};
	})
	.directive('ncImageDropzone', function($templateCache, $compile, FileUploader) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				originalUploader: '=ncImageUploader',
				options: '=?ncImageDropzoneOptions',
				onError: '&?ncImageDropzoneOnError',
				onSuccess: '&?ncImageDropzoneOnSuccess',
				template: '@ncImageTemplate'
			},
			link: function(scope, element) {
				scope.uploader = new FileUploader(scope.originalUploader);
				scope.template = scope.template || 'common/ncImageDropzoneTemplate';
				scope.options = _.defaults(scope.options, {
					urlKey: 'url',
					onQueueLimit: _.noop,
					onFail: _.noop,
					onResponse: function(item) { return item; },
					onUpload: function(item) {}
				});
				scope.onError = scope.onError || _.noop;
				scope.onSuccess = scope.onSuccess || _.noop;
				scope.update = function() {
					var html = $templateCache.get(scope.template);
					element.html(html);
					$compile(element.contents())(scope);
				};
	
				scope.upload = function() {
					element.find('input').trigger('click');
				};

				//Upload
				scope.uploader.onAfterAddingFile = function(item) {
					if(scope.uploader.queueLimit == scope.model.length) {
						if(scope.options.onQueueLimit) {
							scope.options.onQueueLimit(item, scope.model);
						}
						item.cancel();
						item.remove();
					} else {
						var obj = {};
						obj[scope.options.urlKey] = '';
						scope.model.push(obj);
						item.indx = scope.model.length-1;
					}
				};
				scope.uploader.onWhenAddingFileFailed = function(item) {
					if(scope.options.onFail) {
						scope.options.onFail(item, scope.model);
					}
				};

			    scope.uploader.onSuccessItem = function(item, response, status, headers) {
					scope.model[item.indx][scope.options.urlKey] = response[scope.options.urlKey];			    	
			    };
			    scope.uploader.onErrorItem = function(item, response, status, headers) {
			    	scope.model.splice(item.indx, 1);
			    	scope.onError({$response : response});
			    };

				scope.update();
				scope.$watch('template', scope.update);
			}
		};
	})