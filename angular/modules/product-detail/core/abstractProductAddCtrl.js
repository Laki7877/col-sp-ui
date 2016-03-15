var angular = require('angular')

angular.module('productDetail').controller('AbstractProductAddCtrl',
  function($scope, $uibModal, $window, util, config, Product, ImageService,
    AttributeSet, Brand, Shop, LocalCategoryService, GlobalCategory, Category, $rootScope,
    KnownException, NcAlert, $productAdd, options, AttributeSetService, JSONCache, skeemas) {
    'ngInject';

    var MAX_FILESIZE = (options.maxImageUploadSize || 5000000);
    var QUEUE_LIMIT = (options.maxImageUploadQueueLimit || 20);

    $scope.adminMode = options.adminMode;
    $scope.overview = {};
    $scope.formData = {
      Status: 'DF',
      ShopId: null,
      Visibility: true,
      GlobalCategories: [null, null, null],
      LocalCategories: [null, null, null],
      MainGlobalCategory: null,
      MainLocalCategory: null,
      Tags: [],
      ControlFlags: {
        Flag1: false,
        Flag2: false,
        Flag3: false
      },
      Brand: {
        id: null
      },
      TheOneCardEarn: 1,
      GiftWrap: 'N',
      AttributeSet: {
        AttributeSetTagMaps: []
      },
      MasterAttribute: {},
      RelatedProducts: [],
      EffectiveDate: null,
      ExpireDate: null,
      LimitIndividualDay: false,
      MasterVariant: {
        Display: 'GROUP',
        ProductNameEn: '',
        ProductNameTh: '',
        Sku: '',
        DescriptionFullEn: '',
        DescriptionShortEn: '',
        DescriptionShortTh: '',
        DescriptionFullTh: '',
        DimensionUnit: 'MM',
        WeightUnit: 'G',
        StockType: 'Stock',
        Images: [],
        Installment: 'N',
        ShippingMethod: '1',
        VideoLinks: [],
        SEO: {
          ProductBoostingWeight: 5000
        }
      },
      Variants: []
    };

    //Initialize Pointers
    $scope.variantPtr = $scope.formData.MasterVariant;

    var checkSchema = function(data, schemaName, code){
      //Perform schema check
      var schema = JSONCache.get(schemaName || 'productStages');
      if(!code) code = "(RX)";
      var validation = skeemas.validate(data, schema);
      console.log("Schema validation result: ", validation);
      if(!validation.valid){
        $scope.devAlert.error('<strong>Warning ' + code + '</strong> Automated API structure pre-check procedure failed. ' +
        'Format does not comply with the <strong>Ahancer Product Add Exchange Protocol (A-PAEP)</strong> V3 Rev C. ' +
        'For more detail, look for <i>schema validation result</i> in your js console.');
      }
    };

    //Open modal for cat selector
    $scope.openCategorySelectorModal = function(ith, key, title) {
      if(!key){
        key= 'GlobalCategories';
      }

      var modalInstance = $uibModal.open({
        size: 'category-section modal-lg column-4',
        keyboard: false,
        templateUrl: 'product/modalCategorySelector',
        controller: function($scope, $uibModalInstance, tree, model, disable, exclude) {
          'ngInject';
          $scope.model = model;
          $scope.exclude = exclude;
          $scope.tree = tree;
          $scope.title = 'Select Category';
          $scope.categoryHeaderText = title;
          $scope.disabledOn = disable;

          $scope.select = function() {
            $uibModalInstance.close($scope.model);
          };
        },
        resolve: {
          model: function() {
            return $scope.formData[key][ith];
          },
          tree: function() {
            return $scope.dataset[key];
          },
          disable: function(){
            return function(m){
              if(m.nodes.length == 0) return false;
              return true;
            }
          },
          exclude: function(){
            console.log('will exclude', $scope.formData[key])
            return $scope.formData[key];
          }
        }
      });

      modalInstance.result.then(function(data) {
        $scope.formData[key][ith] = data;
      });

    };

    $scope.onImageUploadFail = function(item, filter) {
      $scope.image_alert.error(item.Message || 'Maximum ' + filter + ' images can be uploaded.');
    }

    $scope.onImageUploadSuccess = function() {
      $scope.image_alert.close();
    }

    $scope.onImageUploadQueueLimit = function() {
      //nop
    };
    $scope.asStatus = Product.getStatus;
    $scope.refresher = {};

    var watchVariantFactorChanges = function() {
      $scope.$watch('dataset.attributeOptions', function() {
        $productAdd.generateVariants($scope.formData, $scope.dataset)
      }, true);
    };

    // CK editor options
    $scope.ckOptions = config.CK_DEFAULT_OPTIONS;
    $scope.dataset = {
      CombinedAttributeSets: []
    };
    $scope.dataset.AttributeSets = [{
      AttributeSetId: null,
      disabled: true,
      AttributeSetNameEn: 'No Attribute Set'
    }];
    $scope.dataset.GlobalCategories = [];
    $scope.dataset.LocalCategories = [];
    $scope.dataset.BrandsEmpty = [{
      BrandId: null,
      _group: 'No Result',
      BrandNameEn: 'Search by brand by name or Brand id...',
      disabled: true
    }];
    $scope.dataset.Brands = [];
    $scope.enableVariation = function() {
      $scope.controlFlags.variation = 'enable';
    }

    $scope.dataset.SearchTags = [];
    $scope.dataset.RelatedProducts = [];
    $scope.dataset.VariantDisplayOption = [{
      text: 'Show as group of variants',
      value: 'GROUP'
    }, {
      text: 'Show as individual product',
      value: 'INDIVIDUAL'
    }];

    $scope.pageState = {
      loading: {
        state: true,
        message: 'Loading..'
      },
      load: function(msg) {
        $scope.pageState.loading.message = msg;
        $scope.pageState.loading.state = true;
      },
      reset: function() {
        $scope.alert.close();
        $scope.pageState.loading.state = false;
      }
    };

    $scope.breadcrumb = {
      globalCategory: null
    };

    $scope.preview = function() {
      console.log("Before Serialization", $scope.formData);
      var serialized = Product.serialize($scope.formData);
      console.log("After Serialization", serialized);
      checkSchema(serialized);
    };

    $scope.$watch('formData.MasterVariant.OriginalPrice+formData.MasterVariant.SalePrice', function() {
      var form = $scope.addProductForm;
      if (form.SalePrice) form.SalePrice.$setValidity('min', true);
      if (!form.SalePrice) return;
      if ($scope.formData.MasterVariant.SalePrice == '') return;

      if (Number($scope.formData.MasterVariant.SalePrice) >= Number($scope.formData.MasterVariant.OriginalPrice)) {
        if (form.SalePrice) form.SalePrice.$setValidity('min', false)
        form.SalePrice.$error['min'] = 'Sale Price must not exceed Original Price'
      }
    });

    $scope.$watch('formData.ExpireDate', function() {
      // TODO: refactor use nctemplate
      var form = $scope.addProductForm;
      if (form.EffectiveDate == null) {
        return
      }
      if (form.ExpireDate) form.ExpireDate.$setValidity('min', true)
      if ($scope.formData.ExpireDate < $scope.formData.EffectiveDate) {
        if (!form.ExpireDate) return;
        if (form.ExpireDate) form.ExpireDate.$setValidity('min', false);
        form.ExpireDate.$error['min'] = 'Effective date/time must come before expire date/time';
      }
    });

    /**
     * Other additional validations
     * @param  {String} Status
     */
    var manualValidate = function(Status) {
      var mat = []

      if (Status == 'WA') {
        if (!$scope.formData.MasterVariant.DescriptionFullTh || $scope.formData.MasterVariant.DescriptionFullTh == '') {
          mat.push('Description (Thai)');
        }

        if (!$scope.formData.MasterVariant.DescriptionFullEn || $scope.formData.MasterVariant.DescriptionFullEn == '') {
          mat.push('Description (English)');
        }

        if (!$scope.formData.Brand.BrandId) {
          mat.push('Brand');
        }

        if ($scope.formData.MasterVariant.Images.length == 0) {
          mat.push('At least one image');
        }

        $scope.formData.Variants.forEach(function(variant) {
          if (variant.Images.length == 0) {
            mat.push('At least one image for variation ' + "'" + variant.text + "'");
          }
        })

      }

      var cnt = $scope.formData.Variants.reduce(function(total, x) {
        return x.Visibility ? total + 1 : total
      }, 0)

      if (cnt == 0 && $scope.formData.Variants.length > 0) {
        mat.push('At least one variant must be visible.')
      }

      if ($scope.formData.ExpireDate && $scope.formData.ExpireDate <= $scope.formData.EffectiveDate) {
        mat.push('Effective date/time must come before expire date/time.')
      }

      return mat
    };

    /**
     * Publish Confirmation
     * Show dialog to ask if user really want to publish
     */
    $scope.prePublishWA = function() {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'product/modalConfirmPublish',
        controller: function($scope, $uibModalInstance, $timeout) {
          'ngInject'
          $scope.no = function() {
            $uibModalInstance.close('no')
          }

          $scope.yes = function() {
            $uibModalInstance.close('yes')
          }
        },
        size: 'size-warning',
        resolve: {

        }
      })
      modalInstance.result.then(function(selectedItem) {
        console.log(selectedItem)
        if (selectedItem == 'yes') {
          $scope.publish('WA')
        }
      }, function() {
        console.log('Modal dismissed at: ' + new Date())
      })

    }

    /**
     * Publish (save as draft and publish)
     * @param  {String} Status (WA or DF or other enum sent to server)
     */
    $scope.publish = function(Status) {
      $scope.pageState.reset();
      $scope.pageState.load('Validating..');

      if ($scope.controlFlags.variation == 'enable' && $scope.formData.Variants.length == 0) {
        $scope.controlFlags.variation == 'disable';
      }

      if ($scope.controlFlags.variation == 'disable') {
        $scope.formData.Variants = [];
      }

      $scope.onPublishing = (Status == 'WA');
        // On click validation
      var validateMat = manualValidate(Status);
      if (validateMat.length > 0) {
        $scope.pageState.reset();
        $scope.alert.error(validateMat.join(', ') + ' are required.');
        return;
      }

      if ($scope.addProductForm.$invalid) {
        $scope.pageState.reset();
        console.log($scope.addProductForm.$error);
        var requiredMissing = ('required' in $scope.addProductForm.$error);
        if (Status == 'DF' && requiredMissing) {
          var errorList = []
          if ($scope.addProductForm.ProductNameEn.$invalid) {
            errorList.push('Product Name (English)');
          }
          // Product Name (Thai), Product Name (English), and Sale Price,
          if ($scope.addProductForm.ProductNameTh.$invalid) {
            errorList.push('Product Name (Thai)');
          }

          if ($scope.addProductForm.SalePrice.$invalid) {
            errorList.push('Sale Price');
          }
          errorList.push('Master Attributes')

          $scope.alert.error('Unable to save. Please make sure that ' + errorList.join(' and ') + ' are filled correctly.')
        } else if (Status == 'WA' && requiredMissing) {
          $scope.alert.error('Unable to publish because you are missing required fields')
        } else {
          console.warn($scope.addProductForm.$error)
          $scope.alert.error('Unable to save. Please make sure all fields have no error.')
        }
        return
      }

      $scope.pageState.load('Saving..');

      var apiRequest = Product.serialize($scope.formData);
      checkSchema(apiRequest, 'productStages', '(TX)');

      Product.publish(apiRequest, Status).then(function(res) {
        $scope.pageState.reset();
        if (res.ProductId) {
          $scope.overview = res;
          $scope.dataset.attributeOptions = angular.copy($scope.protoAttributeOptions); // will trigger watchvariantchange
          var catId = Number(res.MainGlobalCategory.CategoryId);

          $productAdd.fill(checkSchema, catId, $scope.pageState, $scope.dataset, $scope.formData, $scope.breadcrumb.globalCategory, $scope.controlFlags, $scope.variationFactorIndices, res).then(function() {
            $scope.formData.ProductId = Number(res.ProductId);
            $scope.pageState.reset();
            $scope.alert.success('Your product has been saved successfully. <a href="/products/">View Product List</a>');
          });

          $scope.addProductForm.$setPristine(true);
        } else {
          $scope.alert.error('Unable to save because ' + (res.message || res.Message));
          $scope.controlFlags.variation = ($scope.formData.Variants.length > 0 ? 'enable' : 'disable');
        }
      }, function(er) {
        $scope.pageState.reset();
        $scope.alert.error('Unable to save because ' + (er.message || er.Message));
        $scope.controlFlags.variation = ($scope.formData.Variants.length > 0 ? 'enable' : 'disable');
      });

    }



    $scope.init = function(viewBag) {
      if (!angular.isObject(viewBag)) throw new KnownException('View bag is corrupted');

      var _editMode = ('productId' in viewBag);
      for (var page in tabPage) {
        tabPage[page].angular()
      }

      if (_editMode) {
        var productId = viewBag.productId;
        $scope.pageState.load('Loading Product..');

        Product.getOne(productId)
          .then(function(inverseFormData) {
            $scope.overview = angular.copy(inverseFormData);
            var catId = Number(inverseFormData.MainGlobalCategory.CategoryId);



            //Fill the page with data
            $productAdd.fill(checkSchema, catId,
              $scope.pageState, $scope.dataset,
              $scope.formData, $scope.breadcrumb, $scope.controlFlags,
              $scope.variationFactorIndices, inverseFormData)
							.then(function() {
								$scope.variantPtr = $scope.formData.MasterVariant;
	              $scope.formData.ProductId = Number(productId);
	              $scope.pageState.reset();
	              watchVariantFactorChanges();

	              LocalCategoryService.getAllByShopId($scope.formData.ShopId).then(function(data) {
	                $scope.dataset.LocalCategories = Category.transformNestedSetToUITree(data);
	              });

                checkSchema(inverseFormData);

            });

          }, function(error) {
            throw new KnownException('Unable to fetch product with id ' + productId);
          })

      } else if ('catId' in viewBag) {
        if (viewBag.catId == null) window.location.href = '/products/select';
        LocalCategoryService.list().then(function(data) {
          $scope.dataset.LocalCategories = Category.transformNestedSetToUITree(data);
        })
        var catId = Number(viewBag.catId);
        $productAdd.fill(checkSchema, catId, $scope.pageState, $scope.dataset, $scope.formData, $scope.breadcrumb,
          $scope.controlFlags, $scope.variationFactorIndices).then(function() {
          $scope.pageState.reset();
          watchVariantFactorChanges();
          // ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages, onImageUploadQueueLimit, onImageUploadFail, onImageUploadSuccess)
        })
      } else {
        throw new KnownException('Invalid mode, viewBag garbage')
      }


    }

    var tabPage = {}

    tabPage.images = {
      angular: function() {
        /**
         * IMAGE THUMBNAIL EVENTS
         */
        $scope.$on('left', function(evt, item, array, index) {
          var to = index - 1
          if (to < 0) to = array.length - 1

          var tmp = array[to]
          array[to] = item
          array[index] = tmp
        })
        $scope.$on('right', function(evt, item, array, index) {
          var to = index + 1
          if (to >= array.length) to = 0

          var tmp = array[to]
          array[to] = item
          array[index] = tmp
        })
        $scope.$on('delete', function(evt, item, array, index) {
          array.splice(index, 1)
        })
        $scope.$on('zoom', function(evt, item, array, index) {
          // Should use angular way, but ok whatever
          $('#product-image-zoom img').attr('src', item.url)
          $('#product-image-zoom').modal('show')
        })
      }
    }

    tabPage.category = {
      angular: function() {
        // Events
        $scope.$on('deleteGlobalCat', function(evt, indx) {
          $scope.formData.GlobalCategories[indx] = null;
        })

        $scope.$on('deleteLocalCat', function(evt, indx) {
          $scope.formData.LocalCategories[indx] = null;
        })
      }
    }

    tabPage.variation = {
      angular: function() {
        $scope.uploaderModal = ImageService.getUploader('/ProductImages', {
          queueLimit: QUEUE_LIMIT
        });

        $scope.uploaderModal.filters.push({
          'name': 'enforceMaxFileSize',
          'fn': function(item) {
            return item.size <= MAX_FILESIZE
          }
        });

        $scope.openVariantDetail = function(pair, array, index) {
          if (angular.isUndefined(pair.Images)) {
            pair.Images = [];
          }

          if (angular.isUndefined(pair.queue)) {
            pair.queue = [];
          }

          // Modal target (for viewing pair)
          $scope.pairModal = angular.copy(pair);
          $scope.pairModal.alert = new NcAlert();
          $scope.pairIndex = index;

          $scope.uploaderModal.queue = $scope.pairModal.queue;

          var variantModal = $uibModal.open({
            animation: false,
            templateUrl: 'ap/modal-variant-detail',
            controller: function($scope, $uibModalInstance, $timeout, pair, dataset, formData, uploader) {
              'ngInject';
              $scope.pair = pair;
              $scope.dataset = dataset;
              $scope.variantPtr = pair;
              $scope.uploader = uploader;
              $scope.no = function() {
                $uibModalInstance.close();
              }
              $scope.yes = function() {
                $uibModalInstance.close($scope.pair);
              }
            },
            size: 'xl',
            resolve: {
              uploader: function() {
                return ImageService.getUploader('/ProductImages', {
                  queueLimit: QUEUE_LIMIT
                });
              },
              formData: function() {
                return $scope.formData
              },
              pair: function() {
                console.log('resolving', $scope.pairModal)
                return $scope.pairModal
              },
              ckOptions: function() {
                return $scope.ckOptions
              },
              dataset: function() {
                return $scope.dataset
              }
            }
          })

          variantModal.result.then(function(pairModal) {
            console.log(pairModal);
            if (pairModal) {
              $scope.formData.Variants[$scope.pairIndex] = pairModal
            }

            // Restore pointers
            $scope.form = $scope.addProductForm;
            $scope.variantPtr = $scope.formData.MasterVariant;

          }, function() {
            console.log('Modal dismissed at: ' + new Date());
          })

        }

      }
    }

    $scope.protoAttributeOptions = {
      0: {
        Attribute: false,
        options: []
      },
      1: {
        Attribute: false,
        options: []
      }
    };

    $scope.uploader = ImageService.getUploader('/ProductImages', {
      queueLimit: QUEUE_LIMIT
    });

    $scope.uploader.filters.push({
      'name': 'enforceMaxFileSize',
      'fn': function(item) {
        return item.size <= MAX_FILESIZE
      }
    });

    $scope.dataset.attributeOptions = angular.copy($scope.protoAttributeOptions);

    $scope.refresher.AttributeSetsLoading = false;
    $scope.refresher.AttributeSets = function(q) {
      if (!q) return;
      $scope.refresher.AttributeSetsLoading = true;
      return AttributeSetService.list({
        _order: 'AttributeSetId',
        _limit: 5,
        _offset: 0,
        _direction: 'asc',
        searchText: q
      }).then(function(ds) {
        $scope.refresher.AttributeSetsLoading = false;
        var searchRes = ds.data.map(function(d) {
          d._group = 'Search Results';
          d.AttributeSetTagMaps = $productAdd.flatten.AttributeSetTagMap(d.AttributeSetTagMaps);
          return d;
        });
        $scope.dataset.CombinedAttributeSets = _.unionBy(searchRes, $scope.dataset.AttributeSets, 'AttributeSetId');
      })
    };


    /**
     * Refresh Related Product Data
     * @param  {String} q
     */
    $scope.refresher.RelatedProducts = function(q) {
      return Product.getAll({
        searchText: q,
        pageSize: 8
      }).then(function(ds) {
        $scope.dataset.RelatedProducts = ds.data;
      })
    }

    $scope.controlFlags = {
      variation: 'disable',
      enableSections: {
        embedVideo: false,
        embed360: false
      }
    };

    /**
     * Refresh Brand Data Set used for searching
     * @param  {String} q
     */

    $scope.refresher.BrandLoading = false;
    $scope.refresher.Brands = function(q) {
      // TODO: too slow
      if (!q) return

      $scope.refresher.BrandLoading = true;

      Brand.getAll({
        pageSize: 10,
        searchText: q
      }).then(function(ds) {
        $scope.refresher.BrandLoading = false;
        $scope.dataset.Brands = ds.data; // _.unionBy($scope.dataset.Brands, ds.data, 'BrandId');
        $scope.dataset.Brands.map(function(m) {
          m._group = "Search Results";
          return m;
        });
      });


    }

    $window.onbeforeunload = function(e) {
        if (!$scope.addProductForm.$dirty) {
          // only warn when form is dirty
          return null;
        }
        var message = 'Your changes will not be saved.',
          e = e || window.event
          // For IE and Firefox
        if (e) {
          e.returnValue = message
        }

        // For Safari
        return message
      } // end onbeforeunload

    $scope.asStatus = Product.getStatus;
    $scope.isFreeTextInput = util.isFreeTextDataType;
    $scope.isListInput = util.isListDataType;
    $scope.isHtmlInput = util.isHtmlDataType;
    $scope.isCheckboxInput = util.isCheckboxDataType;

    $scope.alert = new NcAlert();
    $scope.devAlert = new NcAlert();
    $scope.image_alert = new NcAlert();

    // Variation Factor (lhs) Indices are used as index
    // for ng-repeat in variation tab
    $scope.variationFactorIndices = {
      iterator: [0],
      length: function() {
        return $scope.variationFactorIndices.iterator.length
      },
      popSecond: function() {
        $scope.variationFactorIndices.length() == 2 && $scope.variationFactorIndices.iterator.pop()
        $scope.dataSet.attributeOptions[1].options = []
        $scope.dataSet.attributeOptions[1].Attribute = null
      },
      pushSecond: function() {
        $scope.variationFactorIndices.length() < 2 && $scope.variationFactorIndices.iterator.push(1)
      }
    };


  })
