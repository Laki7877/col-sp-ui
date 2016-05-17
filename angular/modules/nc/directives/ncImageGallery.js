angular.module('nc')
	.directive('ncImageBannerIcon', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				onFail: '=fail',
				uploader: '=',
				size: '@',
				title: '@',
				source: '=',
				height: '@',
				width: '@',
				letter: '@',
				letterx: '@',
				subtitle: '@?'
			},
			template: $templateCache.get('common/ncImageBanner6'),
			link: function(scope) {
				var update = function() {
					scope.options = {
						height: 256 * (scope.height/scope.width),
						width: 256,
						validateDimensionMin: [scope.width, scope.height],
						validateDimensionMax: [scope.width, scope.height]
					};
				}
				var updateSource = function() {
					var m = scope.source.ImageEn.length;
					var len = scope.source.Links.length;
					if(len > m ) {
						for (var i = 0; i < len - m; i++) {
							scope.source.Links.pop();
						};
					} else if(len < m) {
						for (var i = 0; i < m - len; i++) {
							scope.source.Links.push({});
						};
					}
				}
				update();
				scope.$watch('width', update);
				scope.$watch('height', update);
				scope.$watch('source', function() {
					scope.source = _.defaults(scope.source, { 
						Enabled: true,
						ImageEn: [],
						Links:[] 
					});
				});
				scope.$watch('source.ImageEn', updateSource, true);
			}
		};
	})
	.directive('ncImageBannerVideo', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				onFail: '=fail',
				uploader: '=',
				size: '@',
				title: '@',
				source: '=',
				height: '@',
				width: '@',
				letter: '@',
				letterx: '@',
				subtitle: '@?',
				linktitle: '@?'
			},
			template: $templateCache.get('common/ncImageBanner5'),
			link: function(scope) {
				var update = function() {
					scope.options = {
						height: 256 * (scope.height/scope.width),
						width: 256,
						validateDimensionMin: [scope.width, scope.height],
						validateDimensionMax: [scope.width, scope.height]
					};
				}
				var updateSource = function() {
					var m = _.max([scope.source.ImageEn.length, scope.source.ImageTh.length]);
					var len = scope.source.Videos.length;
					if(len > m ) {
						for (var i = 0; i < len - m; i++) {
							scope.source.Videos.pop();
						};
					} else if(len < m) {
						for (var i = 0; i < m - len; i++) {
							scope.source.Videos.push({});
						};
					}
				}
				update();
				scope.$watch('width', update);
				scope.$watch('height', update);
				scope.$watch('source', function() {
					scope.source = _.defaults(scope.source, { 
						ShowPopup: false,
						Enabled: true,
						ImageEn:[], 
						ImageTh:[], 
						Videos:[] 
					});
				});
				scope.$watch('source.ImageEn', updateSource, true);
				scope.$watch('source.ImageTh', updateSource, true);
			}
		};
	})
	.directive('ncImageBannerLink', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				onFail: '=fail',
				uploader: '=',
				size: '@',
				title: '@',
				source: '=',
				height: '@',
				width: '@',
				letter: '@',
				letterx: '@',
				noauto: '@?',
				subtitle: '@?',
				heading: '@?'
			},
			template: $templateCache.get('common/ncImageBanner4'),
			link: function(scope) {
				var update = function() {
					scope.options = {
						height: 256 * (scope.height/scope.width),
						width: 256,
						validateDimensionMin: [scope.width, scope.height],
						validateDimensionMax: [scope.width, scope.height]
					};
				}
				var updateSource = function() {
					var m = _.max([scope.source.ImageEn.length, scope.source.ImageTh.length]);
					var len = scope.source.Links.length;
					console.log(len, m);
					if(len > m) {
						for (var i = 0; i < len - m; i++) {
							scope.source.Links.pop();
						};
					} else if(len < m) {
						for (var i = 0; i < m - len; i++) {
							scope.source.Links.push('');
						};
					}
				}

				update();
				scope.$watch('source.Links', function() {
					console.log(scope.Links);
				})
				scope.$watch('width', update);
				scope.$watch('height', update);
				scope.$watch('source', function() {
					scope.source = _.defaults(scope.source, { 
						AutoPlay: true,
						Enabled: true,
						SlideDuration: 5,
						ImageEn:[], 
						ImageTh:[], 
						Links: [] 
					});
				});
				scope.$watchCollection('source.ImageEn', updateSource);
				scope.$watchCollection('source.ImageTh', updateSource);
			}
		};
	})
	.directive('ncImageBanner', function() {
		return {
			restrict: 'E',
			scope: {
				ncModel: '=',
				onFail: '=',
				uploader: '=',
				options: '=?',
				size: '@',
				title: '@',
				source: '=',
				key: '@'
			},
			transclude: true,
			template: '<nc-image-block template="common/ncImageBanner3" data-source="source" data-key="{{key}}" nc-model="ncModel" on-fail="onFail" uploader="uploader" options="options" size="{{size}}" title="{{title}}"><h4>Banner style guideline</h4><p>Choose images that are clear, information-rich, and attractive. Images must meet the following requirements</p><ul><li>Maximum {{size}} images</li><li>Image size <span ng-transclude></span></li></ul></nc-image-block>',
			link: function(scope) {
				scope.options = _.defaults(scope.options, {
					height: '144px',
					width: '256px',
					validateFileSize: 5000000
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
			template: '<nc-image-block template="common/ncImageBanner2" data-source="source" nc-model="ncModel" on-fail="onFail" uploader="uploader" options="options" size="{{size.Count}}" title="{{title}}"><h4>Banner style guideline</h4><p>Choose images that are clear, information-rich, and attractive. Images must meet the following requirements</p><ul><li>Maximum {{size.Count}} images</li><li>The width must be {{size.Width}}px</li><li>The height must be {{size.Height}}px</li></ul></nc-image-block>',
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
				source: '=?',
				key: '@?',
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
				scope.$watch('options', function() {
					if(!scope.options) {
						return;
					}
					if(!scope.options.height) {
						scope.options.height = '150px'
					}
					if(!scope.options.width) {
						scope.options.width = '150px'
					}
				});

				scope.images = scope.images || [];

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
									var ratio = scope.options.validateRatio;

									var minW = Number(minDim[0]);
									var minH = Number(minDim[1]);
									var maxW = Number(maxDim[0]);
									var maxH = Number(maxDim[1]);

									if (scope.options.validateDimensionMin && (img.width < minW || img.height < minH)) {
										//min width error
										scope.onfail('ondimension', [img.width, img.height], [minW, minH]);
										return;
									}

									if (scope.options.validateDimensionMax && (img.width > maxW || img.height > maxH)) {
										//min width error
										scope.onfail('ondimension', [img.width, img.height], [maxW, maxH]);
										return;
									}

									if (scope.options.validateRatio && img.width != ratio * img.height) {
										//ratio error
										scope.onfail('onratio', [img.width, img.height]);
										return;
									}

									if (img.width != img.height && scope.options.validateSquare) {
										//square error
										scope.onfail('onsquare', [img.width, img.height]);
										return;
									}

									//max size
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
							var url = URL.createObjectURL(file);
							var img = new Image;

							img.onload = function() {
								var minDim = scope.options.validateDimensionMin;
								var maxDim = scope.options.validateDimensionMax;
								var ratio = scope.options.validateRatio;

								var minW = Number(minDim[0]);
								var minH = Number(minDim[1]);
								var maxW = Number(maxDim[0]);
								var maxH = Number(maxDim[1]);

								if (scope.options.validateDimensionMin && (img.width < minW || img.height < minH)) {
									//min width error
									scope.onfail('ondimension', [img.width, img.height], [minW, minH]);
									console.log(img.width, img.height, minW, minH);
									return;
								}

								if (scope.options.validateDimensionMax && (img.width > maxW || img.height > maxH)) {
									//min width error
									scope.onfail('ondimension', [img.width, img.height], [maxW, maxH]);
									console.log(img.width, img.height, maxW, maxH);
									return;
								}

								if (scope.options.validateRatio && img.width != ratio * img.height) {
									//ratio error
									scope.onfail('onratio', [img.width, img.height]);
									return;
								}

								if (img.width != img.height && scope.options.validateSquare) {
									//square error
									scope.onfail('onsquare', [img.width, img.height]);
									return;
								}

								//max size
								if (scope.images.length >= _.toInteger(scope.size)) {
									scope.onfail('onmaxsize', scope.images.length);
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
							};

							img.src = url;

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
				template: '@ncImageTemplate',
				size: '@'
			},
			link: function(scope, element) {
				scope.uploader = new FileUploader(scope.originalUploader);
				scope.template = scope.template || 'common/ncImageDropzoneTemplate';
				scope.options = _.defaults(scope.options, {
					urlKey: 'Url',
					onEvent: _.noop,
					onResponse: function(item) {
						return item;
					},
					onUpload: function(item) {},
					ratio:1,
					min:[1500, 1500],
					max:[2000, 2000]
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
					var url = URL.createObjectURL(item._file);
					var img = new Image;

					img.onload = function() {
						var minDim = scope.options.min;
						var maxDim = scope.options.max;
						var ratio = scope.options.ratio;

						var minW = Number(minDim[0]);
						var minH = Number(minDim[1]);
						var maxW = Number(maxDim[0]);
						var maxH = Number(maxDim[1]);

						if (minDim && (img.width < minW || img.height < minH) ) {
							//min width error
							item.remove();
							item.cancel();
							scope.onError({
								$response: {name: 'dimensionFilter'}
							});
							return;
						}

						if (maxDim && (img.width > maxW || img.height > maxH)) {
							//min width error
							item.remove();
							item.cancel();
							scope.onError({
								$response: {name:'dimensionFilter'}
							});
							return;
						}

						if (ratio && img.width != ratio * img.height) {
							//min width error
							item.remove();
							item.cancel();
							scope.onError({
								$response: {name: 'ratioFilter'}
							});
							return;
						}
						if (scope.size == scope.model.length) {
							item.cancel();
							item.remove();
							scope.onError({$response: { name: 'queueFilter' }});
							return;
						}

						var obj = {};
						obj[scope.options.urlKey] = '';
						scope.model.push(obj);
						item.obj = obj;
						item.indx = scope.model.length - 1;
						item.onProgress = function(progress) {
							obj.progress = progress;
						};
					};

					img.src = url;
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
					console.log(val);
					scope.isUploading = val;
				});
			}
		};
	})