angular.module('nc')
	.directive('ncImageBanner', function() {
		return {
			restrict: 'E',
			scope: {
				ncModel: '=',
				onFail: '=',
				uploader: '=',
				options: '=?',
				size: '@',
				title: '@'
			},
			template: '<nc-image-block nc-model="ncModel" on-fail="onFail" uploader="uploader" options="options" size="{{size}}" title="{{title}}"><h4>Banner style guideline</h4><p>Choose images that are clear, information-rich, and attractive. Images must meet the following requirements</p><ul><li>Maximum {{size}} images</li><li>Image ratio 16:9</li></ul></nc-image-block>',
			link: function(scope) {
				scope.options = _.defaults(scope.options, {
					height: '144px',
					width: '256px'
				});
			}
		}
	})
	.directive('ncImageBanner2', function() {
		return {
			restrict: 'E',
			scope: {
				ncModel: '=',
				onFail: '=',
				uploader: '=',
				options: '=?',
				source: '=',
				size: '=',
				title: '@'
			},
			template: '<nc-image-block template="common/ncImageBanner2" source="source" nc-model="ncModel" on-fail="onFail" uploader="uploader" options="options" size="{{size.Count}}" title="{{title}}"><h4>Banner style guideline</h4><p>Choose images that are clear, information-rich, and attractive. Images must meet the following requirements</p><ul><li>Maximum {{size.Count}} images</li><li>The width must be {{size.Width}}px</li><li>The height must be {{size.Height}}px</li></ul></nc-image-block>',
			link: function(scope) {
				scope.options = _.defaults(scope.options, {
					height: '144px',
					width: '256px'
				});
				scope.$watch('size', function(data) {
					scope.options.height = (data.Height/data.Width)*256 + 'px';
					scope.options.width =  '256px';
				});
			}
		}
	})
	.directive('ncImageBlock', function($uibModal, $templateCache, FileItem, FileUploader) {
		return {
			restrict: 'E',
			require: '?^^form',
			replace: true,
			transclude: true,
			scope: {
				images: '=ncModel',
				onfail: '=onFail',
				uploader: '=uploader',
				options: '=?options',
				source: '=?source',
				size: '@size',
				title: '@title'
			},
			template: function(elem, attrs) {
				if (attrs.template) {
					return $templateCache.get(attrs.template);
				} else {
					return $templateCache.get('common/ncImageBanner');
				}
			},
			link: function(scope, element, attrs, form) {
				var fileUploader = false;

				scope.options = _.defaults(scope.options, {
					height: '150px',
					width: '150px'
				});

				scope.$watch('uploader', function(val) {
					if (val instanceof FileUploader) {
						fileUploader = true;
					} else {
						fileUploader = false;
					}
				});
				scope.upload = function(files) {
					if (!_.isNil(form) && !_.isNil(attrs.name)) {
						form.$setDirty();
					}
					if (fileUploader) {
						_.forEach(files, function(file) {

							var url = URL.createObjectURL(file);
							var img = new Image;

							img.onload = function() {
								var minDim = scope.options.validateDimensionMin;
								var maxDim = scope.options.validateDimensionMax;

								var minW = Number(minDim[0]);
								var minH = Number(minDim[1]);
								var maxW = Number(maxDim[0]);
								var maxH = Number(maxDim[1]);

								if (img.width < minW || img.height < minH) {
									//min width error
									scope.onfail('ondimension', [img.width, img.height]);
									return;
								}

								if (img.width > maxW || img.height > maxH) {
									//min width error
									scope.onfail('ondimension', [img.width, img.height]);
									return;
								}

								if (img.width != img.height && scope.options.validateSquare) {
									//square error
									scope.onfail('onsquare', [img.width, img.height]);
									return;
								}

								//max size
								console.log(scope.size, scope.images.length);
								if (scope.images.length >= _.toInteger(scope.size)) {
									scope.onfail('onmaxsize', scope.images.length);
									return;
								}

								var obj = {
									progress: 0,
									SlideDuration: 1
								};
								scope.images.push(obj);
								var f = new FileItem(scope.uploader, file, {
									onSuccess: function(response) {
										_.extend(obj, response);
									},
									onError: function(response, status, headers) {
										scope.onfail('onerror', response, status, headers);
										_.remove(scope.images, function(n) {
											return n === obj;
										});
									},
									onProgress: function(progress) {
										obj.progress = progress;
									}
								});
								scope.uploader.queue.push(f);
								f.upload();

							};

							img.src = url;

						});
					} else {
						//newer version
						_.forEach(files, function(file) {
							//max size
							if (scope.images.length >= _.toInteger(scope.size)) {
								scope.onfail('onmaxsize', scope.size);
								return;
							}
							var obj = {
								progress: 0,
								SlideDuration: 1
							};
							scope.images.push(obj);
							scope.uploader.upload(file)
								.then(function(response) {
									_.extend(obj, response.data);
								}, function(response) {
									scope.onfail('onerror', response);
									_.remove(scope.images, function(n) {
										return n === obj;
									});
								}, function(evt) {
									obj.progress = _.parseInt(100.0 * evt.loaded / evt.total);
								});
						});
					}
				};
				scope.call = function(image, index, action) {
					if (!_.isNil(action.confirmation)) {
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
							if (!_.isNil(form) && !_.isNil(attrs.name)) {
								form.$setDirty();
							}
							action.fn(image, scope.images, index);
						});
					} else {
						if (!_.isNil(form) && !_.isNil(attrs.name)) {
							form.$setDirty();
						}
						action.fn(image, scope.images, index);
					}
				};
				scope.getSrc = function(image) {
					return image.Url || null;
				};
				scope.getProgress = function(image) {
					return image.progress || 0;
				};
				scope.actions = [{
					//Zoom
					fn: function(item, array, index) {
						$uibModal.open({
							size: 'product-image',
							template: '<img ng-src="{{url}}" alt=""/>',
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
					icon: 'fa-search-plus'
				}, {
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
				}, {
					//Left
					fn: function(item, array, index) {
						var to = index - 1;
						if (to < 0) return;
						var tmp = array[to];
						array[to] = item;
						array[index] = tmp;
					},
					icon: 'fa-arrow-left'
				}, {
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
				}];
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
					urlKey: 'Url', //image[urlKey] to get src
					loaderImg: '/assets/img/loader.gif', //when image[urlKey] = ''
					emptyImg: '/assets/img/placeholder-no-image-blank.png' //when image = null 
				});
				scope.lock = _.defaults(scope.lock, function() {
					return false;
				});
				scope.getSrc = function(image) {
					if (image == null) {
						//Empty
						return scope.options.emptyImg;
					} else if (image[scope.options.urlKey] == '') {
						return null;
					} else {
						return image[scope.options.urlKey];
					}
				};
				scope.getProgress = function(image) {
					if (image == null)
						return 0;
					return image.progress || 0;
				};
				scope.isDisabled = function(image) {
					return _.isNull(image) || scope.lock();
				};
				scope.call = function(action, image) {
					if (scope.isDisabled(image)) return;
					var index = scope.model.indexOf(image);

					if (action.confirmation) {
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
					urlKey: 'Url',
					onQueueLimit: _.noop,
					onEvent: _.noop,
					onResponse: function(item) {
						return item;
					},
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
					scope.onEvent({
						$eventName: eventName
					});
				};

				//Upload
				scope.uploader.onAfterAddingFile = function(item) {
					if (scope.uploader.queueLimit == scope.model.length) {
						if (scope.options.onQueueLimit) {
							scope.options.onQueueLimit(item, scope.model);
						}
						item.cancel();
						item.remove();
					} else {
						var obj = {};
						obj[scope.options.urlKey] = '';
						scope.model.push(obj);
						item.obj = obj;
						item.indx = scope.model.length - 1;
						item.onProgress = function(progress) {
							obj.progress = progress;
						};
					}
				};
				scope.uploader.onWhenAddingFileFailed = function(item, filter) {
					scope.onError({
						$response: filter
					});
				};
				scope.uploader.onSuccessItem = function(item, response, status, headers) {
					scope.model[item.indx][scope.options.urlKey] = response[scope.options.urlKey];
				};
				scope.uploader.onErrorItem = function(item, response, status, headers) {
					scope.model.splice(scope.model.indexOf(item.obj), 1);
					scope.onError({
						$response: response
					});
				};

				scope.update();
				scope.$watch('template', scope.update);
				scope.$watch('uploader.isUploading', function(val) {
					scope.isUploading = val;
				});
			}
		};
	})