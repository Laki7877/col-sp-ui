angular.module('nc')
	.directive('ncImageBanner', function($uibModal, $templateCache, FileItem) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				images: '=ncModel',
				onfail: '=ncImageBannerFail',
				uploader: '=ncImageBannerUploader',
				title: '=ncImageBannerTitle'
			},
			template: $templateCache.get('common/ncImageBanner'),
			link: function(scope) {
				scope.upload = function(file) {
					var obj = {};
					scope.images.push(obj);
					var f = new FileItem(scope.uploader, file, {
						onSuccess: function(response) {
							obj = response;
						},
						onError: function(response, status, headers) {
							scope.onfail(response, status, headers);
							_.remove(scope.images, function(n) {
								return n === obj;
							});
						}
					});
				};
				scope.call = function(image, index, action) {
					if(!_.isNil(action.confirmation)) {
						var modal = $uibModal.open ({
							size: 'size-warning',
							templateUrl: 'common/ncActionModal',
							controller: function($scope, $uibModalInstance, options, $interpolate) {
								$scope.title = options.title;
								$scope.message = $interpolate(options.message)(scope);
								$scope.btnNo = options.btnNo || 'Cancel';
								$scope.btnYes = options.btnYes || 'Confirm';
								$scope.btnClass = options.btnClass || 'btn-blue';
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
										message: action.confirmation.message,
										btnYes: action.confirmation.btnConfirm,
										btnClass: action.confirmation.btnClass
									}
								}
							}
						});

						modal.result.then(function() {
							action.fn(image, scope.images, index);
						});
					} else {
						action.fn(image, scope.images, index);
					}
				};
				scope.actions = [
					{
						//Zoom
						fn: function(item, array, index) {
							$uibModal.open({
								size: 'product-image',
								template: '<img ng-src="{{url}}" alt=""/>'
								controller: function($scope, url) {
									$scope.url = url;
								},
								resolve: {
									url: function() {
										return item.url;
									}
								}
							});
						},
						icon: 'fa-zoom-in'
					},
					{
						//Trash
						fn: function(item, array, index) {
							array.splice(index, 1);
						},
						icon: 'fa-trash',
						confirmation: {
							title: 'Confirm to delete',
							message: 'Are you sure you want to delete the image?',
							btnConfirm: 'Delete',
							btnCancel: 'Cancel',
							btnClass: 'btn-red'
						}
					},
					{
						//Left
						fn: function(item, array, index) {
							//console.log(item, array, index);
						    var to = index - 1;
						    if (to < 0) return;

						    var tmp = array[to];
						    array[to] = item;
						    array[index] = tmp;
						},
						icon: 'fa-arrow-left'
					},
					{
						//Right
						fn: function(item, array, index) {
							//console.log(item, array, index);
						    var to = index + 1;
						    if (to >= array.length) return;

						    var tmp = array[to];
						    array[to] = item;
						    array[index] = tmp;
						},
						icon: 'fa-arrow-right'
					}
				];
			}
		}
	})
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
								$scope.btnNo = options.btnNo || 'Cancel';
								$scope.btnYes = options.btnYes || 'Confirm';
								$scope.btnClass = options.btnClass || 'btn-blue';
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
										message: action.confirmation.message,
										btnYes: action.confirmation.btnConfirm,
										btnClass: action.confirmation.btnClass
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
				onEvent: '&?ncImageDropzoneOnEvent',
				onError: '&?ncImageDropzoneOnError',
				onSuccess: '&?ncImageDropzoneOnSuccess',
				isUploading: '=?isUploading',
				template: '@ncImageTemplate'
			},
			link: function(scope, element) {
				scope.uploader = new FileUploader(scope.originalUploader);
				scope.template = scope.template || 'common/ncImageDropzoneTemplate';
				scope.options = _.defaults(scope.options, {
					urlKey: 'url',
					onQueueLimit: _.noop,
					onEvent: _.noop,
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

				scope.triggerEvent = function(eventName) {
					scope.onEvent({$eventName: eventName});
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
						item.obj = obj;
						item.indx = scope.model.length-1;
					}
				};
				scope.uploader.onWhenAddingFileFailed = function(item, filter) {
			    	scope.onError({$response : filter});
				};
			    scope.uploader.onSuccessItem = function(item, response, status, headers) {
					scope.model[item.indx][scope.options.urlKey] = response[scope.options.urlKey];			    	
			    };
			    scope.uploader.onErrorItem = function(item, response, status, headers) {
			    	scope.model.splice(scope.model.indexOf(item.obj), 1);
			    	scope.onError({$response : response});
			    };

				scope.update();
				scope.$watch('template', scope.update);
				scope.$watch('uploader.isUploading', function(val) {
					scope.isUploading = val;
				});
			}
		};
	})