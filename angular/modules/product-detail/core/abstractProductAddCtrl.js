var angular = require('angular');

angular.module('productDetail').controller('AbstractProductAddCtrl',
  function($scope, $uibModal, $window, util, config, Product, ImageService, common,
    AttributeService, $timeout, AttributeSet, Brand, Shop, LocalCategoryService, GlobalCategory, Category, $rootScope,
    KnownException, NcAlert, $productAdd, options, AttributeSetService,
    AdminShopService, VariationFactorIndices, AttributeOptions, ShippingService, APExpireDateChangeEvent) {
    'ngInject';

    $scope.readOnly = options.readOnly;
    $scope.adminMode = options.adminMode;
    $scope.approveMode = options.approveMode;
    $scope.listingUrl = options.listingUrl;

    //Default attributes to be populated in UI
    $scope.defaultAttributes = [];
    //Form data to be posted and received
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
        IsNew: false,
        IsClearance: false,
        IsBestSeller: false,
        IsOnlineExclusive: false,
        IsOnlyAt: false
      },
      Brand: {
        BrandId: 0
      },
      TheOneCardEarn: 1,
      GiftWrap: 'N',
      AttributeSet: {},
      MasterAttribute: {},
      RelatedProducts: [],
      EffectiveDate: null,
      ExpireDate: null,
      LimitIndividualDay: false,
      MasterVariant: {
        IsHasExpiryDate: 'N',
        IsVat: 'Y',
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
        ShippingMethod: "1",
        VideoLinks: [],
        Visibility: true,
        SEO: {
          ProductBoostingWeight: 5000,
          MetaTitleEn: "",
          MetaTitleTh: "",
          MetaDescriptionEn: "",
          MetaDescriptionTh: "",
          MetaKeywordEn: "",
          MetaKeywordTh: "",
          SEO_ProductUrlKeyEn: ""
        }
      },
      Variants: []
    };

    //Breadcrumb Component
    $scope.breadcrumb = {
      globalCategory: null
    };
    //Approve panel component
    if ($scope.approveMode) {
      $scope.formData.AdminApprove = {
        Information: 'WA',
        Image: 'WA',
        Category: 'WA',
        Variation: 'WA',
        MoreOption: 'WA',
        RejectReason: ''
      }
    }

    //Data Set (will be populated)
    $scope.dataset = {
      CombinedAttributeSets: [],
      Brands: []
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
      _group: 'Search by Brand Name or Brand ID...',
      BrandNameEn: 'No Result',
      disabled: true
    }];
    $scope.dataset.Brands = [];
    $scope.dataset.attributeOptions = angular.copy(AttributeOptions.proto());


    //All the refresher functions
    $scope.refresher = {
      AttributeSets: function(q) {
        if (!q) return;
        return AttributeSetService.list({
          _order: 'AttributeSetId',
          _limit: 5,
          _offset: 0,
          _direction: 'asc',
          searchText: q
        }).then(function(ds) {

          var searchRes = ds.data.map(function(d) {
            d._group = 'Search Results';
            d.AttributeSetTagMaps = $productAdd.flatten.AttributeSetTagMap(d.AttributeSetTagMaps);
            return d;
          });

          $scope.dataset.CombinedAttributeSets = _.unionBy(searchRes, $scope.dataset.AttributeSets, 'AttributeSetId');
        })
      },
      RelatedProducts: function(q) {
        return Product.getAll({
          searchText: q,
          pageSize: 8
        }).then(function(ds) {
          $scope.dataset.RelatedProducts = ds.data;
        })
      },
      Brands: function(q) {
        if (!q) return;
        $scope.dataset.Brands = [];
        return Brand.getAll({
          pageSize: 10,
          searchText: q
        }).then(function(ds) {
          $scope.dataset.Brands = ds.data; // _.unionBy($scope.dataset.Brands, ds.data, 'BrandId');
          $scope.dataset.Brands = $scope.dataset.Brands.map(function(m) {
            m._group = "Search Results";
            return m;
          });
          // return $scope.dataset.Brands;
        });
      }
    };

    // CK editor options
    $scope.ckOptions = config.CK_DEFAULT_OPTIONS;


    //All the alert bar on the page
    $scope.adminAlert = new NcAlert();
    $scope.alert = new NcAlert();
    $scope.devAlert = new NcAlert();
    $scope.image_alert = new NcAlert();

    //Fields that will be exempt from locking (always editable fields)
    //See top level <fieldset> "ap-fieldset-lock-on" attribute
    $scope.unlockedFields = [];
    Product.getUnlockedFields().then(function(data) {
      $scope.unlockedFields = data;
    });


    //Image Upload Configs
    var QUEUE_LIMIT = (options.maxImageUploadQueueLimit || 20);
    //allow from 1500x1500 but no greater than 2000x2000
    var IMAGE_DIM_BOUND = [
      [1500, 1500],
      [2000, 2000]
    ];
    $scope.imageBlockOptions = {
      height: '150px',
      width: '150px',
      validateDimensionMin: IMAGE_DIM_BOUND[0],
      validateDimensionMax: IMAGE_DIM_BOUND[1],
      validateSquare: true,
      validateFileSize: 5000000
    };
    $scope.onImageUploadFail = function(kwd, data) {
      console.log(kwd, 'kwd');
      if (kwd == "onmaxsize") {
        $scope.image_alert.error('Cannot exceed ' + data + ' images for each product.');
      } else if (kwd == "ondimension") {
        $scope.image_alert.error('Image dimension must be between ' +
          IMAGE_DIM_BOUND[0][0] + 'x' +
          IMAGE_DIM_BOUND[0][1] + ' and ' +
          IMAGE_DIM_BOUND[1][0] + 'x' + IMAGE_DIM_BOUND[1][1] +
          '. <strong>Your Image Size is ' + data[0] + "x" + data[1] +
          '</strong>');
      } else if (kwd == "ondisable") {
        $scope.image_alert.error(
          'You do not have permission to upload images.');
      } else if (kwd == "onsquare") {
        $scope.image_alert.error('Image must be a square (1:1 ratio).');
      } else if (kwd == 'onfilesize') {
        $scope.image_alert.error('Each image file size must not exceed 5MB')
      } else {
        $scope.image_alert.error(common.getError(response.data));
      }
    }
    $scope.onImageUploadSuccess = function() {
      $scope.image_alert.close();
    }
    $scope.onImageUploadQueueLimit = _.noop;

    //Revision control
    $scope.TimeMachine = {
      active: false,
      preview: function(historyId, historyDate) {
        $scope.pageState.load("Loading Product Revision");
        Product.getRevision(historyId).then(function(res) {
          res.Status = 'DF';
          $scope.dataset.attributeOptions = angular.copy(AttributeOptions.proto()); // will trigger watchvariantchange
          var catId = Number(res.MainGlobalCategory.CategoryId);

          $productAdd.fill(catId, $scope.pageState,
            $scope.dataset, $scope.formData, $scope.breadcrumb.globalCategory,
            $scope.controlFlags, $scope.variationFactorIndices, res
          ).then(function() {
            $scope.formData.ProductId = Number(res.ProductId);
            $scope.pageState.reset();
            $scope.alert.success(
              'This is a preview of revision history on ' +
              moment(historyDate).format("d/MM/YY"));
            $scope.variantPtr = $scope.formData.MasterVariant;
            $scope.addProductForm.$setPristine(true);
            $scope.TimeMachine.active = true;
          });

          $scope.addProductForm.$setPristine(true);
        });
      }
    }


    //Adjust Limit Individual Day check box when
    //prepare days are non zero
    $scope.$watch('variantPtr.PrepareMon+variantPtr.PrepareTue+variantPtr.PrepareWed+variantPtr.PrepareThu+variantPtr.PrepareFri',
      function(value) {
        var variantPtr = $scope.variantPtr;
        var x = Number(variantPtr.PrepareMon) + Number(variantPtr.PrepareTue) +
          Number(variantPtr.PrepareWed) + Number(variantPtr.PrepareThu) +
          Number(variantPtr.PrepareFri);
        if (x > 0) {
          $scope.formData.LimitIndividualDay = true;
        }
    });

    //Initialize Pointers
    $scope.variantPtr = $scope.formData.MasterVariant;
    $scope.initializeVideoLink = function($index) {
      if ($scope.variantPtr.VideoLinks[$index]) return;
      $scope.variantPtr.VideoLinks[$index] = {
        Url: null
      }
    };


    //Open modal for cat selector
    $scope.openCategorySelectorModal = function(ith, key, title) {

      if ($scope.xspermit(41)) {
        return $scope.alert.error(
          'You have no permission to modify category (41).');
      }

      if (!key) {
        key = 'GlobalCategories';
      }

      var modalInstance = $uibModal.open({
        size: 'category-section modal-lg column-4',
        keyboard: false,
        templateUrl: 'product/modalCategorySelector',
        controller: function($scope, $uibModalInstance, tree, model,
          disable, exclude, imageBlockOptions) {
          'ngInject';
          $scope.imageBlockOptions = imageBlockOptions;
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
          imageBlockOptions: function() {
            return $scope.imageBlockOptions;
          },
          model: function() {
            return $scope.formData[key][ith];
          },
          tree: function() {
            return $scope.dataset[key];
          },
          disable: function() {
            return function(m) {
              if (m.nodes.length == 0) return false;
              return true;
            }
          },
          exclude: function() {
            // console.log('will exclude', $scope.formData[key])
            return $scope.formData[key];
          }
        }
      });

      modalInstance.result.then(function(data) {
        $scope.formData[key][ith] = data;
        if (key == 'GlobalCategories' && ith == 0) {
          //update category
          $scope.updateBreadcrumb(data.CategoryId);
          //Updated suggested attriubte set
          AttributeSet.getByCategory(data.CategoryId).then(function(
            data) {
            $productAdd.loadSuggestedAttributeSets($scope.dataset,
              data);
          });
        }
      });

    };



    var watchVariantFactorChanges = function() {
      $scope.$watch('dataset.attributeOptions', function() {
        $productAdd.generateVariants($scope.formData, $scope.dataset)
      }, true);
    };

    $scope.enableVariation = function() {
      if ($scope.uploader.isUploading) {
        return $scope.alert.error(
          '<strong>Please Wait</strong> - One or more image upload is in progress..'
        );
      }

      //check if there are options that can variate
      var count = $scope.formData.AttributeSet.AttributeSetMaps.reduce(
        function(previousValue, currentValue, currentIndex, array) {
          return previousValue + (array[currentIndex].Attribute.VariantStatus ?
            1 : 0);
        }, 0);

      // console.log('count', count);
      if (count == 0) {
        return $scope.alert.error(
          '<strong>Not allowed</strong> - Cannot create variation because selected attribute set does not have any variate-able option.'
        );
      }

      $scope.alert.close();
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


    $scope.updateBreadcrumb = function(globalCatId) {
      $scope.breadcrumb.globalCategory = Category.createCatStringById(
        globalCatId, $scope.dataset.GlobalCategories);
    };

    //Watches
    $scope.$watch('formData.ExpireDate', APExpireDateChangeEvent($scope));

    /**
     * Other additional validations
     * @param  {String} Status
     */
    var manualValidate = function(Status) {
      var mat = []
      if (Status == 'WA') {
        if (!$scope.formData.Brand.BrandId) mat.push('Brand');
        if ($scope.formData.MasterVariant.Images.length == 0) mat.push('At least one image');
        $scope.formData.Variants.forEach(function(variant) {
          if (!variant.Visibility) return;
          if (variant.Images.length == 0) {
            mat.push('At least one image for variation ' + "'" +
              variant.text + "'");
          }
        })
      }

      if ($scope.formData.ExpireDate && $scope.formData.ExpireDate <=
        $scope.formData.EffectiveDate) {
        mat.push('Effective date/time must come before expire date/time.')
      }

      return mat
    };

    /**
     * Edit Product Confirmation
     * Show dialog to ask if user really want to edit
     */
    $scope.preEditProduct = function() {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'product/modalConfirmEdit',
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
        resolve: {}
      });

      modalInstance.result.then(function(selectedItem) {
        if (selectedItem == 'yes') {
          $scope.publish('DF');
        }
      });

    }

    //When user presses cancel
    $scope.cancel = function() {
      $scope.addProductForm.$dirty = false;
      if (!$scope.adminMode) {
        $window.location.href = "/products";
      } else {
        $window.location.href = "/admin/products";
      }
    }

    /**
     * Publish Confirmation
     * Show dialog to ask if user really want to publish
     */
    $scope.prePublishWA = function() {
      $scope.onPublishing = true;
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
        resolve: {}
      })
      modalInstance.result.then(function(selectedItem) {
        // console.log(selectedItem)
        if (selectedItem == 'yes') {
          $scope.publish('WA')
        }
      });

    }

    /**
     * Publish (save as draft and publish)
     * @param  {String} Status (WA or DF or other enum sent to server)
     */
    $scope.publish = function(Status) {

      //Trigger red validation
      angular.forEach($scope.addProductForm.$error.required, function(field) {
        field.$setDirty();
      });

      $scope.pageState.reset();

      if ($scope.readOnly) {
        return $scope.alert.error('This view is read-only.');
      }

      if (Status == 'WA' && $scope.xspermit(45)) {
        return $scope.alert.error('You have no permission to publish (45).');
      }

      if ($scope.uploader.isUploading) {
        return $scope.alert.error(
          '<strong>Please Wait</strong> - One or more image upload is in progress..'
        );
      }

      $scope.pageState.load('Validating..');

      if ($scope.controlFlags.variation == 'enable' && $scope.formData.Variants
        .length == 0) {
        $scope.controlFlags.variation == 'disable';
      }

      if ($scope.controlFlags.variation == 'disable') {
        $scope.formData.Variants = [];
      }

      // On click validation
      var validateMat = manualValidate(Status);
      if (validateMat.length > 0) {
        $scope.pageState.reset();
        $scope.alert.error(validateMat.join(', ') + ' are required.');
        return;
      }

      function defaultOnEmpty(vari) {
        if (_.isEmpty(vari.SafetyStock)) {
          vari.SafetyStock = 0;
        }
        if (_.isEmpty(vari.UpdateAmount)) {
          vari.UpdateAmount = 0;
        }

        if (_.isEmpty(vari.PrepareMon)) {
          vari.PrepareMon = vari.PrepareDay;
        }

        if (_.isEmpty(vari.PrepareTue)) {
          vari.PrepareTue = vari.PrepareDay;
        }

        if (_.isEmpty(vari.PrepareWed)) {
          vari.PrepareWed = vari.PrepareDay;
        }

        if (_.isEmpty(vari.PrepareThu)) {
          vari.PrepareThu = vari.PrepareDay;
        }

        if (_.isEmpty(vari.PrepareFri)) {
          vari.PrepareFri = vari.PrepareDay;
        }

        if (_.isEmpty(vari.PrepareSat)) {
          vari.PrepareSat = vari.PrepareDay;
        }

        if (_.isEmpty(vari.PrepareSun)) {
          vari.PrepareSun = vari.PrepareDay;
        }

        if (_.isEmpty(vari.NewArrivalDate)) {
          vari.NewArrivalDate = $scope.formData.UpdateOn;
        }
      }
      //default values
      for (var vari in $scope.formData.Variants) {
        defaultOnEmpty(vari);
      }
      defaultOnEmpty($scope.formData.MasterVariant);


      var errorList = [];
      if (Status == 'WA') {
        if (!(Number($scope.formData.ShippingMethod) > 0)) {
          errorList.push('Shipping Method');
        }
      }

      //Tell user which fields are invalid
      if ($scope.addProductForm.$invalid) {
        $scope.pageState.reset();
        console.log($scope.addProductForm.$error);
        var requiredMissing = ('required' in $scope.addProductForm.$error);

        if (Status == 'DF' && requiredMissing) {

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

          if (_.get($scope.formData.Brand, 'BrandId') == null || _.get(
              $scope.formData.Brand, 'BrandId') == 0) {
            errorList.push('Brand');
          }

        } else if (Status == 'WA' && requiredMissing) {
          return $scope.alert.error('Unable to publish because required fields are missing or incorrect.');
        } else {
          return $scope.alert.error('Unable to save. Please make sure all fields have no error.');
        }

      }

      if (errorList.length > 0) {
        return $scope.alert.error('Unable to save because ' +
          errorList.join(' and ') + (errorList.length > 1 ? ' are ' :
            ' is ') + ' missing or incorrect.');
      }

      //TODO: move this to default value
      if (Number($scope.formData.MasterVariant.OriginalPrice) == 0 || _.isNaN(
          Number($scope.formData.MasterVariant.OriginalPrice))) {
        $scope.formData.MasterVariant.OriginalPrice = $scope.formData.MasterVariant.SalePrice;
      }


      $scope.pageState.load('Applying changes..');

      var apiRequest = Product.serialize($scope.formData);

      Product.publish(apiRequest, Status).then(function(res) {
        $scope.pageState.reset();

        if (res.ProductId) {
          // loadOverview(res);
          $scope.dataset.attributeOptions = angular.copy(AttributeOptions.proto()); // will trigger watchvariantchange
          var catId = Number(res.MainGlobalCategory.CategoryId);

          $productAdd.fill(catId, $scope.pageState, $scope
            .dataset, $scope.formData, $scope.breadcrumb.globalCategory,
            $scope.controlFlags, $scope.variationFactorIndices, res).then(
            function() {
              $scope.formData.ProductId = Number(res.ProductId);
              $scope.pageState.reset();
              var successText = 'Your product has been saved successfully.';
              if (Status == 'WA') {
                successText = 'Your product has been sent for approval. It will be published automatically if approved';
              }
              $scope.alert.success(successText + ' <a href="' + (options.listingUrl || '/products') + '">View Product List</a>');
              $scope.variantPtr = $scope.formData.MasterVariant;
              $scope.addProductForm.$setPristine(true);
            });

          $scope.addProductForm.$setPristine(true);

        } else {
          $scope.alert.error('Unable to save because ' + (res.message ||
            res.Message));
          $scope.controlFlags.variation = ($scope.formData.Variants.length >
            0 ? 'enable' : 'disable');
        }
      }, function(er) {
        $scope.pageState.reset();
        var emsg = 'Unable to save because ' + (er.message || er.Message);
        $scope.alert.error(emsg);

        $scope.controlFlags.variation = ($scope.formData.Variants.length >
          0 ? 'enable' : 'disable');
      });

    }

    /*
     * On controller initialize
     */
    $scope.init = function(viewBag) {
      if (!angular.isObject(viewBag)) throw new KnownException(
        'View bag is corrupted');

      $scope.onPublishing = false;

      var _editMode = ('productId' in viewBag);
      for (var page in tabPage) {
        tabPage[page].angular()
      }

      //Load default attributes to be displayed on page
      AttributeService.getDefaultAttributes().then(function(res) {
        $scope.defaultAttributes = res;
      });

      //Load shipping methods to be displayed on UI
      ShippingService.list().then(function(data) {
        $scope.dataset.ShippingList = data;
      });


      if (_editMode) {
        var productId = viewBag.productId;
        $scope.pageState.load('Loading Product..');

        Product.getOne(productId)
          .then(function(inverseFormData) {
            // loadOverview(angular.copy(inverseFormData));
            var catId = Number(inverseFormData.MainGlobalCategory.CategoryId);

            //Fill the page with data
            $productAdd.fill(catId,
                $scope.pageState, $scope.dataset,
                $scope.formData, $scope.breadcrumb, $scope.controlFlags,
                $scope.variationFactorIndices, inverseFormData)
              .then(function() {
                $scope.variantPtr = $scope.formData.MasterVariant;
                $scope.formData.ProductId = Number(productId);
                $scope.pageState.reset();
                watchVariantFactorChanges();

                if (!$scope.adminMode) {
                  LocalCategoryService.getAllByShopId($scope.formData.ShopId)
                    .then(function(data) {
                      $scope.dataset.LocalCategories = Category.transformNestedSetToUITree(
                        data);
                    });
                } else {
                  AdminShopService.getLocalCategories($scope.formData.ShopId)
                    .then(function(data) {
                      $scope.dataset.LocalCategories = Category.transformNestedSetToUITree(
                        data);
                    });
                }

                $scope.adminAlert.close();
                // console.log('adminMode', $scope.adminMode, $scope.formData.Status);
                if (!$scope.adminMode && $scope.formData.Status == 'RJ') {
                  //Show rejection from admin
                  $scope.adminAlert.error(
                    "<strong>This product has been rejected by Admin.</strong><br>" +
                    $scope.formData.AdminApprove.RejectReason);
                } else if (!$scope.adminMode && $scope.formData.Status ==
                  'AP') {
                  $scope.adminAlert.success("This product has been approved. Click 'Edit Product' to make changes.");
                } else if (!$scope.adminMode && $scope.formData.Status ==
                  'WA') {
                  $scope.adminAlert.open(false, "This product is waiting for approval for the admin. You cannot edit any product detail now.", "yellow");
                }


              });

          }, function(error) {
            throw new KnownException('Unable to fetch product with id ' +
              productId);
          })

      } else if ('catId' in viewBag) {
        if (viewBag.catId == null) window.location.href =
          '/products/select';
        if ($scope.adminMode) {
          //Admin mode cant do add product
          $scope.alert.error("Feature not available in admin mode.");
          $scope.pageState.halt = true;
        }

        LocalCategoryService.list().then(function(data) {
          $scope.dataset.LocalCategories = Category.transformNestedSetToUITree(
            data);
        });

        var catId = Number(viewBag.catId);
        $productAdd.fill(catId, $scope.pageState, $scope.dataset,
          $scope.formData, $scope.breadcrumb,
          $scope.controlFlags, $scope.variationFactorIndices).then(function() {
            $scope.pageState.reset();
            watchVariantFactorChanges();
          })
      } else {
        throw new KnownException('Invalid mode, viewBag garbage')
      }

    }


    //TODO: tagPage paradigm is outdated
    //change!
    var tabPage = {};
    tabPage.images = {
      angular: function() {
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
          $('#product-image-zoom img').attr('src', item.Url)
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

        $scope.toggleVisibility = function(p) {
          if ($scope.xspermit(44)) {
            return $scope.alert.error(
              'You have no permission to modify variation (44).');
          }
          p.Visibility = !p.Visibility
        }

        $scope.openVariantDetail = function(pair, array, index) {
          if ($scope.xspermit(44)) {
            return $scope.alert.error(
              'You have no permission to modify variation (44).');
          }

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
            backdrop: 'static',
            templateUrl: 'ap/modal-variant-detail',
            controller: function($scope, $uibModalInstance,
              $timeout, pair, dataset, uploader,
              imageBlockOptions) {
              'ngInject';
              $scope.pair = pair;
              $scope.imageBlockOptions = imageBlockOptions;
              $scope.dataset = dataset;
              $scope.variantPtr = pair;
              $scope.uploader = uploader;

              $scope.no = function() {
                if ($scope.form.$dirty) {
                  if (confirm("Your changes will not be saved, are you sure you want to close this modal?")) {
                    $uibModalInstance.close();
                  }
                } else {
                  $uibModalInstance.close();
                }

              }
              $scope.yes = function() {
                $uibModalInstance.close($scope.pair);
              }
            },
            size: 'xl',
            resolve: {
              imageBlockOptions: function() {
                return $scope.imageBlockOptions;
              },
              uploader: function() {
                return ImageService.getUploader('/ProductImages', {
                  queueLimit: QUEUE_LIMIT
                });
              },
              pair: function() {
                // console.log('resolving', $scope.pairModal)
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
            if (pairModal) {
              $scope.formData.Variants[$scope.pairIndex] =
                pairModal
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

    $scope.uploader = ImageService.getUploader('/ProductImages', {
      queueLimit: QUEUE_LIMIT
    });


    //Warning when page changes
    $window.onbeforeunload = function(e) {
      if (!$scope.addProductForm.$dirty) {
        // only warn when form is dirty
        return null;
      }
      console.log($scope.addProductForm);
      var message = 'Your changes will not be saved.',
        e = e || window.event
        // For IE and Firefox
      if (e) {
        e.returnValue = message
      }

      // For Safari
      return message
    }


    //Other UI helpers
    $scope.asStatus = Product.getStatus;
    $scope.isFreeTextInput = util.isFreeTextDataType;
    $scope.isListInput = util.isListDataType;
    $scope.isHtmlInput = util.isHtmlDataType;
    $scope.isCheckboxInput = util.isCheckboxDataType;
    //Show field if shop group matches
    $scope.ShopGroupPolicy = function(range) {
        return $scope.adminMode || $rootScope.ShopGroupPolicy(range);
      }
      //Show field if visibleTo matches
    $scope.isVisibleTo = function(abbrev) {
        if (abbrev == "AD" && $scope.adminMode) return true;
        if (abbrev == "ME") return true;
        return false;
      }
      //Seller permit function (inverted)
    $scope.xspermit = function(id) {
      if ($scope.adminMode) return false;
      return !$rootScope.hasPermission(id);
    };
    //Should installment field be disabled or not
    $scope.disableInstallment = function() {
      if (!$scope.variantPtr.SalePrice) return true;
      return (Number($scope.variantPtr.SalePrice) || 0) < 5000;
    }

    //UI Switches
    //Variables that control ng-show for some compoennts
    $scope.controlFlags = {
        variation: 'disable',
        enableSections: {
          embedVideo: false,
          embed360: false
        }
    };

    //Manage loading status and so on
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
        $scope.devAlert.close();
        $scope.adminAlert.close();
        $scope.pageState.loading.state = false;
        $scope.TimeMachine.active = false;
      }
    };

    // Variation Factor (lhs) Indices are used as index
    // for ng-repeat in variation tab
    $scope.variationFactorIndices = new VariationFactorIndices($scope.dataset);

    //Initialize form pointer
    $timeout(function() {
      $scope.form = $scope.addProductForm;
    });

  })
