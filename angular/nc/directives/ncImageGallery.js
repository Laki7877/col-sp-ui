angular.module('nc')
	.directive('ncImageGallery', function($templateCache, $uibModal) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				model: '=ncModel',
				options: '=ncImageGalleryOptions'
			},
			template: $templateCache.get('common/ncImageGallery'),
			link: function(scope) {
				scope.options = _.defaults(scope.options, {
					actions: [],
					size: 10, //max size of gallery
					urlKey: 'url', //image[urlKey] to get src
					loaderImg: '/assets/img/loader.gif', //when image[urlKey] = ''
					emptyImg: '/assets/img/placeholder-no-image.png' //when image = null 
				});
				scope.getSrc = function(image) {
					if(_.isNull(image) || _.isUndefined(image) || _.isUndefined(image[scope.options.urlKey])) {
						//Empty
						return scope.options.emptyImg;
					} else if(image[scope.options.urlKey] && image[scope.options.urlKey].length == 0) {
						//Loading
					return scope.options.loaderImg;
					} else {
						return image[scope.options.urlKey];
					}
				};
				scope.call = function(action, image) {
					if(_.isNull(image)) return;
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
				options: '=ncImageOptions',
				template: '@ncImageTemplate'
			},
			link: function(scope, element) {
				scope.uploader = new FileUploader(scope.originalUploader);
				scope.template = scope.template || 'common/ncImageDropzoneTemplate';
				scope.options = _.defaults(scope.options, {
					onQueueLimit: _.noop,
					onFail: _.noop,
					onResponse: function(item) { return item; },
					item: {
						url: ''
					}
				});
				scope.update = function() {
					scope.input = element.find('input');
					var html = $templateCache.get(scope.template);
					element.html(html);
					$compile(element.contents())(scope);
				};
	
				scope.upload = function() {
					scope.input.trigger('click');
				};

				//Upload
				scope.uploader.onAfterAddingFile = function(item) {
					if(uploader.queueLimit == scope.model.length) {
						if(scope.options.onQueueLimit) {
							scope.options.onQueueLimit(item, scope.model);
						} else {
							scope.model.push(_.clone(scope.options.item));
							item.indx = scope.model.length-1;
						}
					}
				};
				//Upload
				scope.uploader.onWhenAddingFileFailed = function(item) {
					if(scope.options.onFail) {
						scope.options.onFail(item, scope.model);
					}
				};

			    scope.uploader.onSuccessItem = function(item, response, status, headers) {
			    	scope.model[item.indx] = onResponse(response);
			
			    };
			    scope.uploader.onErrorItem = function(item, response, status, headers) {
			    	scope.model.splice(item.indx, 1);
			    };

				scope.update();
				scope.$watch('template', scope.update);
			}
		};
	})