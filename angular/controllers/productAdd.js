var angular = require('angular');

module.exports = ['$scope', '$window', 'util', 'config', 'Product', 'ImageService', 'AttributeSet', 'Brand', 'Shop', 'LocalCategoryService', 'GlobalCategory', 'Category', 'VariantPair', '$rootScope', '$q', 'KnownException', 'NcAlert', '$productAdd',
  function($scope, $window, util, config, Product, ImageService, AttributeSet, Brand, Shop, LocalCategoryService, GlobalCategory, Category, VariantPair, $rootScope, $q, KnownException, NcAlert, $productAdd) {
    'use strict';

    $scope.alert = new NcAlert();

    var MAX_FILESIZE = 5000000; //5MB
    var QUEUE_LIMIT = 20;
    var QUEUE_LIMIT_360 = 60;
    var MAX_VARIANT = 100;

    $scope.dataSet = {};
    $scope.dataSet.AttributeSets = [{
      AttributeSetId: null,
      disabled: true,
      AttributeSetNameEn: "No Attribute Set"
    }];
    $scope.dataSet.GlobalCategories = [];
    $scope.dataSet.LocalCategories = [];
    $scope.dataSet.Brands = [{
      BrandId: null,
      BrandNameEn: "No match found",
      disabled: true
    }];
    $scope.dataSet.SearchTags = [];
    $scope.dataSet.RelatedProducts = [];
    $scope.dataSet.StockTypes = ['Stock', 'Pre-Order'];
    $scope.dataSet.VariantDisplayOption = [{
      text: 'Show as group of variants',
      value: 'GROUP'
    }, {
      text: 'Show as individual product',
      value: 'INDIVIDUAL'
    }];

    var protoAttributeOptions = {
      0: {
        Attribute: false,
        options: []
      },
      1: {
        Attribute: false,
        options: []
      }
    };
    $scope.dataSet.attributeOptions = angular.copy(protoAttributeOptions);
    $scope.controlFlags = {
      variation: 'disable',
      enableSections: {
        embedVideo: false,
        embed360: false
      }
    };

    $window.onbeforeunload = function(e) {
      if (!$scope.addProductForm.$dirty) {
        //only warn when form is dirty
        return null;
      }
      var message = "Your changes will not be saved.",
        e = e || window.event;
      // For IE and Firefox
      if (e) {
        e.returnValue = message;
      }

      // For Safari
      return message;
    }; // end onbeforeunload

    var onImageUploadFail = function(item, filter) {
      alert("Unable to upload image because validation error.");
    }
    var onImageUploadQueueLimit = function() {}
    $scope.asStatus = Product.getStatus;

    var watchVariantChanges = function() {
        $scope.$watch('dataSet.attributeOptions', function() {
          var vHashSet = {};
          var prevVariants = angular.copy($scope.formData.Variants);
          prevVariants.forEach(function(elem, index) {
            vHashSet[elem.text] = prevVariants[index];
          });

          var protoCheckState = {
            uploadProductImages: false,
            embedVideo: false,
            description: false,
            packageDetail: false
          };

          //Unset
          prevVariants = undefined;

          $scope.formData.Variants = [];

          var expand = function(A, B) {
            var AVId = null;
            if (_.has(A, 'AttributeValue')) {
              AVId = A.AttributeValue.AttributeValueId;
              A = A.AttributeValue.AttributeValueEn;
            }

            var BId = null;
            var BVId = null;

            if (angular.isDefined(B)) {
              BId = $scope.dataSet.attributeOptions[1].Attribute.AttributeId;
              if (B['AttributeValue']) {
                B = B.AttributeValue.AttributeValueEn;
              }
              if(_.has(B, 'AttributeValue.AttributeValueId')){
                BVId = B.AttributeValue.AttributeValueId;
              }
            } else {
              B = ''
              BId = null;
            }

            var kpair = new VariantPair({
              AttributeId: $scope.dataSet.attributeOptions[0].Attribute.AttributeId,
              AttributeValues: (!AVId ? [] : [{
                AttributeValueId: AVId
              }]),
              ValueEn: A
            }, {
              AttributeId: BId,
              AttributeValues: (!BVId ? [] : [{
                AttributeValueId: BVId
              }]),
              ValueEn: B
            });

            //Copy default value over from main variant
            kpair.ProductNameEn = $scope.formData.MasterVariant.ProductNameEn;
            kpair.ProductNameTh = $scope.formData.MasterVariant.ProductNameTh;
            kpair.Display = $scope.dataSet.VariantDisplayOption[0].value;
            kpair.Visibility = true;
            kpair.DimensionUnit = "MM";
            kpair.WeightUnit = "G";
            kpair.Sku = ($scope.formData.MasterVariant.Sku || "SKU") + "-" + (Number(($scope.formData.Variants || []).length) + 1);
            kpair.OriginalPrice = $scope.formData.MasterVariant.OriginalPrice;
            kpair.SalePrice = $scope.formData.MasterVariant.SalePrice;
            kpair.Quantity = $scope.formData.MasterVariant.Quantity;
            kpair._override = angular.copy(protoCheckState);

            if (kpair.text in vHashSet) {
              //Replace with value from vHashSet

              kpair = vHashSet[kpair.text];

              kpair._override = angular.copy(protoCheckState);
              kpair._override.uploadProductImages = ((kpair.Images || []).length > 0);
              kpair._override.embedVideo = ((kpair.VideoLinks || []).length > 0);
              kpair._override.description = (angular.isDefined(kpair.DescriptionFullEn) ||
                angular.isDefined(kpair.DescriptionFullTh) ||
                angular.isDefined(kpair.DescriptionShortEn) ||
                angular.isDefined(kpair.DescriptionShortTh));

              kpair._override.packageDetail = (angular.isDefined(kpair.Length) ||
                angular.isDefined(kpair.Height) ||
                angular.isDefined(kpair.Width) ||
                angular.isDefined(kpair.Weight));

            }

            //Only push new variant if don't exist
            $scope.formData.Variants.push(kpair);
          }


          console.log("Recalculating Factors", $scope.dataSet.attributeOptions);
          //Multiply out unmultiplied options
          if ($scope.dataSet.attributeOptions && Object.keys($scope.dataSet.attributeOptions).length > 0) {
            for (var aKey in $scope.dataSet.attributeOptions[0].options) {
              var A = $scope.dataSet.attributeOptions[0].options[aKey];

              if (angular.isDefined($scope.dataSet.attributeOptions[1]['options']) && $scope.dataSet.attributeOptions[1].options.length == 0) {
                console.log("expanding A");
                expand(A);
              }

              for (var bKey in $scope.dataSet.attributeOptions[1].options) {
                var B = $scope.dataSet.attributeOptions[1].options[bKey];
                console.log("Expanding A,B");
                expand(A, B);
              }
            }
          }

          $scope.formData.DefaultVariant = $scope.formData.Variants[0];
        }, true); //end of $watch

      } //end of watch func

    $scope.overview = {}

    $scope.formData = {
      Brand: {
        id: null
      },
      MasterVariant: {
        DimensionUnit: "MM",
        WeightUnit: "G",
        StockType: "Stock"
      },
      ShippingMethod: "1",
      AttributeSet: {
        AttributeSetTagMaps: []
      },
      RelatedProducts: [],
      MasterImages: [],
      MasterImages360: [],
      VideoLinks: [],
      Variants: [],
      GlobalCategories: [null, null, null],
      LocalCategories: [null, null, null],
      SEO: {
        ProductBoostingWeight: 5000
      },
      ControlFlags: [],
      Keywords: []
    };

    //Variation Factor (lhs) Indices are used as index
    //for ng-repeat in variation tab
    $scope.variationFactorIndices = {};
    $scope.variationFactorIndices.iterator = [0];
    $scope.variationFactorIndices.length = function() {
      return $scope.variationFactorIndices.iterator.length;
    }
    $scope.variationFactorIndices.popSecond = function() {
      $scope.variationFactorIndices.length() == 2 && $scope.variationFactorIndices.iterator.pop();
      $scope.dataSet.attributeOptions[1].options = [];
      $scope.dataSet.attributeOptions[1].Attribute = null;
    }
    $scope.variationFactorIndices.pushSecond = function() {
      $scope.variationFactorIndices.length() < 2 && $scope.variationFactorIndices.iterator.push(1);
    }

    //TODO: Change _attrEnTh(t) to _attrEnTh(Name, t)
    //$scope._attrEnTh = function (t) { return t.AttributeSetNameEn + " / " + t.AttributeSetNameTh; }
    $scope.isFreeTextInput = util.isFreeTextDataType;
    $scope.isListInput = util.isListDataType;
    $scope.isHtmlInput = util.isHtmlDataType;

    //CK editor options
    $scope.ckOptions = config.CK_DEFAULT_OPTIONS;

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

    $scope.breadcrumbs = {
      globalCategory: null
    };
    $scope.preview = function() {
      return console.log($scope.formData);
    };

    $scope.refreshRelatedProducts = function(q) {
      return Product.getAll({
        searchText: q,
        pageSize: 4
      }).then(function(ds) {
        $scope.dataSet.RelatedProducts = ds.data;
      });
    };

    $scope.refreshBrands = function(q) {
      if (q == "" || !q || q == null) return;
      $scope.dataSet.Brands = [{
        BrandId: -1,
        BrandNameEn: "Searching..",
        disabled: true
      }];

      Brand.getAll({
        pageSize: 10,
        searchText: q
      }).then(function(ds) {
        $scope.dataSet.Brands = ds.data;
      });
    };

    $scope.$watch('formData.MasterVariant.SalePrice', function() {
      var form = $scope.addProductForm;
      if (form.MasterVariant_SalePrice) form.MasterVariant_SalePrice.$setValidity("min", true);
      if (!form.MasterVariant_SalePrice) return;
      if ($scope.formData.MasterVariant.SalePrice == "") return;

      if (Number($scope.formData.MasterVariant.SalePrice) >= Number($scope.formData.MasterVariant.OriginalPrice)) {
        if (form.MasterVariant_SalePrice) form.MasterVariant_SalePrice.$setValidity("min", false);
        form.MasterVariant_SalePrice.$error["min"] = "Sale Price must not exceed Original Price";
      }
    });

    $scope.$watch('formData.ExpireDate', function() {
      var form = $scope.addProductForm;
      if (form.EffectiveDate == null) {
        return
      }
      if (form.ExpireDate) form.ExpireDate.$setValidity("min", true);
      if ($scope.formData.ExpireDate < $scope.formData.EffectiveDate) {
        if (!form.ExpireDate) return;
        if (form.ExpireDate) form.ExpireDate.$setValidity("min", false);
        form.ExpireDate.$error['min'] = 'Effective date/time must come before expire date/time';
      }
    });

    var manualValidate = function(Status) {
      var mat = [];

      if (Status == 'WA') {
        if (!$scope.formData.MasterVariant.DescriptionFullTh || $scope.formData.MasterVariant.DescriptionFullTh == "") {
          mat.push("Missing Description (Thai)");
        }

        if (!$scope.formData.MasterVariant.DescriptionFullEn || $scope.formData.MasterVariant.DescriptionFullEn == "") {
          mat.push("Missing Description (English)");
        }

        if (!$scope.formData.Brand.BrandId) {
          mat.push("Brand is Missing");
        }
      }

      var cnt = $scope.formData.Variants.reduce(function(total, x) {
        return x.Visibility ? total + 1 : total
      }, 0);

      if (cnt == 0 && $scope.formData.Variants.length > 0) {
        mat.push("At least one variant must be visible.");
      }

      if ($scope.formData.ExpireDate && $scope.formData.ExpireDate <= $scope.formData.EffectiveDate) {
        mat.push("Effective date/time must come before expire date/time.");
      }

      return mat;
    };


    /*
     *  Publish (both Draft and WA)
     */
    $scope.publish = function(Status) {

      $scope.pageState.reset();
      $scope.pageState.load('Validating..');

      $scope.onPublishing = (Status == "WA");
      //On click validation
      var validateMat = manualValidate(Status);
      if (validateMat.length > 0) {
        $scope.pageState.reset();
        $scope.alert.error(validateMat);
        return;
      }

      if ($scope.addProductForm.$invalid) {
        $scope.pageState.reset();
        var requiredMissing = ('required' in $scope.addProductForm.$error);
        if (Status == 'DF' && requiredMissing) {
          $scope.alert.error("Unable to save. Please make sure that Product Name (Thai), Product Name (English), and Original Price are filled correctly.");
        } else if (Status == 'WA' && requiredMissing) {
          $scope.alert.error("Unable to publish because you are missing required fields");
        } else {
          $scope.alert.error("Unable to save. Please make sure all fields have no error.");
        }
        return;
      }

      $scope.pageState.load('Publishing..');
      console.log("Publishing with Status = ", Status);

      var apiRequest = Product.serialize($scope.formData);
      Product.publish(apiRequest, Status).then(function(res) {
        $scope.pageState.reset();
        if (res.ProductId) {
          $scope.overview = res;
          $scope.dataSet.attributeOptions = angular.copy(protoAttributeOptions); //will trigger watchvariantchange
          var catId = Number(res.GlobalCategory);
          $productAdd.fill(catId, $scope.pageState, $scope.dataSet, $scope.formData, $scope.breadcrumbs.globalCategory, $scope.controlFlags, $scope.variationFactorIndices, res).then(function() {
            $scope.formData.ProductId = Number(res.ProductId);
            $scope.pageState.reset();
            $scope.alert.success('Your product has been saved successfully. <a href="/products/">View Product List</a>');
            ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages, onImageUploadQueueLimit, onImageUploadFail);
            ImageService.assignUploaderEvents($scope.uploader360, $scope.formData.MasterImages360, onImageUploadQueueLimit, onImageUploadFail);
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

    };

    $scope.uploader = ImageService.getUploader('/ProductImages', {
      queueLimit: QUEUE_LIMIT
    });

    $scope.uploader.filters.push({
      'name': 'enforceMaxFileSize',
      'fn': function(item) {
        return item.size <= MAX_FILESIZE;
      }
    });

    $scope.uploader360 = ImageService.getUploader('/ProductImages', {
      queueLimit: QUEUE_LIMIT_360
    });

    $scope.init = function(viewBag) {
      //TODO: Refactor, use better callback mechanism
      if (!angular.isObject(viewBag)) throw new KnownException("View bag is corrupted");

      var shopId = $rootScope.Profile.Shop.ShopId; //TODO: Get from user
      var _editMode = ("productId" in viewBag)
      for (var page in tabPage) {
        tabPage[page].angular();
      }

      if (_editMode) {
        var productId = viewBag.productId;
        $scope.pageState.load('Loading Product..');

        Product.getOne(productId)
          .then(function(inverseFormData) {
            $scope.overview = angular.copy(inverseFormData);
            var catId = Number(inverseFormData.GlobalCategory);
            $productAdd.fill(catId, $scope.pageState, $scope.dataSet, $scope.formData, $scope.breadcrumbs, $scope.controlFlags,
              $scope.variationFactorIndices, inverseFormData).then(function() {
              $scope.formData.ProductId = Number(productId);
              $scope.pageState.reset();
              watchVariantChanges();
              ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages, onImageUploadQueueLimit, onImageUploadFail);
              ImageService.assignUploaderEvents($scope.uploader360, $scope.formData.MasterImages360, onImageUploadQueueLimit, onImageUploadFail);
            });
          }, function(error) {
            throw new KnownException("Unable to fetch product with id " + productId);
          });

      } else if ('catId' in viewBag) {
        var catId = Number(viewBag.catId);
        $productAdd.fill(catId, $scope.pageState, $scope.dataSet, $scope.formData, $scope.breadcrumbs,
          $scope.controlFlags, $scope.variationFactorIndices).then(function() {
          $scope.pageState.reset();
          watchVariantChanges();
          ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages, onImageUploadQueueLimit, onImageUploadFail);
          ImageService.assignUploaderEvents($scope.uploader360, $scope.formData.MasterImages360, onImageUploadQueueLimit, onImageUploadFail);
        });
      } else {
        throw new KnownException("Invalid mode, viewBag garbage");
      }

      //Load Local Cat
      LocalCategoryService.list().then(function(data) {
        $scope.dataSet.LocalCategories = Category.transformNestedSetToUITree(data);
      });
    }

    var tabPage = {};

    tabPage.images = {
      angular: function() {

        /**
         * IMAGE THUMBNAIL EVENTS
         */
        $scope.$on('left', function(evt, item, array, index) {
          var to = index - 1;
          if (to < 0) to = array.length - 1;

          var tmp = array[to];
          array[to] = item;
          array[index] = tmp;
        });
        $scope.$on('right', function(evt, item, array, index) {
          var to = index + 1;
          if (to >= array.length) to = 0;

          var tmp = array[to];
          array[to] = item;
          array[index] = tmp;
        });
        $scope.$on('delete', function(evt, item, array, index) {
          array.splice(index, 1);
        });
        $scope.$on('zoom', function(evt, item, array, index) {
          //Should use angular way, but ok whatever
          $('#product-image-zoom img').attr('src', item.url);
          $('#product-image-zoom').modal('show');
        });
      }
    };

    tabPage.category = {
      angular: function() {
        //For viewing only
        $scope.viewCategoryColumns = [];
        $scope.viewCategorySelected = null;
        $scope.viewCategoryIndex = 0;
        $scope.selectCategory = angular.noop;

        //Events
        $scope.$on('openGlobalCat', function(evt, item, indx) {
          console.log('openGloCat', item, $scope.dataSet.GlobalCategories);
          $scope.viewCategoryColumns = Category.createColumns(item, $scope.dataSet.GlobalCategories);
          $scope.viewCategorySelected = item;
          $scope.viewCategoryIndex = indx;
          $scope.selectCategory = Category.createSelectFunc($scope.viewCategoryColumns, function(selectedItem) {
            $scope.viewCategorySelected = selectedItem;
          });
        });
        $scope.$on('deleteGlobalCat', function(evt, indx) {
          $scope.formData.GlobalCategories[indx] = null;
        });
        $scope.$on('selectGlobalCat', function(evt, row, indx, parentIndx) {
          $scope.selectCategory(row, indx, parentIndx);
        });
        $scope.$on('saveGlobalCat', function(evt) {
          $scope.formData.GlobalCategories[$scope.viewCategoryIndex] = $scope.viewCategorySelected;
        });

        //Events
        $scope.$on('openLocalCat', function(evt, item, indx) {
          console.log(item, $scope.dataSet.LocalCategories);
          $scope.viewCategoryColumns = Category.createColumns(item, $scope.dataSet.LocalCategories);
          $scope.viewCategorySelected = item;
          $scope.viewCategoryIndex = indx;
          $scope.selectCategory = Category.createSelectFunc($scope.viewCategoryColumns, function(selectedItem) {
            $scope.viewCategorySelected = selectedItem;
          });
        });
        $scope.$on('deleteLocalCat', function(evt, indx) {
          $scope.formData.LocalCategories[indx] = null;
        });
        $scope.$on('selectLocalCat', function(evt, row, indx, parentIndx) {
          $scope.selectCategory(row, indx, parentIndx);
        });
        $scope.$on('saveLocalCat', function(evt) {
          $scope.formData.LocalCategories[$scope.viewCategoryIndex] = $scope.viewCategorySelected;
        });
      }
    }

    tabPage.variation = {

      angular: function() {
        /**
         * This part handles when user click on More Detail and open pair form
         */

        $scope.uploaderModal = ImageService.getUploader('/ProductImages', {
          queueLimit: QUEUE_LIMIT
        });

        $scope.uploaderModal.filters.push({
          'name': 'enforceMaxFileSize',
          'fn': function(item) {
            return item.size <= MAX_FILESIZE;
          }
        });

        $scope.$on('openPairModal', function(evt, pair, array, index) {
          //Define if not defined

          if (angular.isUndefined(pair.Images)) {
            pair.Images = [];
          }
          if (angular.isUndefined(pair.queue)) {
            pair.queue = [];
          }
          //Modal target (for viewing pair)
          $scope.pairModal = angular.copy(pair);
          $scope.pairModal.alert = new NcAlert();
          $scope.pairIndex = index;
          $scope.uploaderModal.queue = $scope.pairModal.queue;
          ImageService.assignUploaderEvents($scope.uploaderModal, $scope.pairModal.Images, onImageUploadQueueLimit, onImageUploadFail);
        });

        $scope.$on('savePairModal', function(evt) {
          console.log("adform", $scope.addProductVariantForm.$invalid);

          if (!$scope.pairModal._override.uploadProductImages) {
            $scope.pairModal.Images = [];
          }

          if (!$scope.pairModal._override.embedVideo) {
            $scope.pairModal.VideoLinks = [];
          }

          if (!$scope.pairModal._override.description) {
            $scope.pairModal.DescriptionFullEn = null;
            $scope.pairModal.DescriptionFullTh = null;
            $scope.pairModal.ShortDescriptionEn = null;
            $scope.pairModal.ShortDescriptionTh = null;
          }

          if (!$scope.pairModal._override.packageDetail) {
            $scope.pairModal.Length = null;
            $scope.pairModal.Height = null;
            $scope.pairModal.Width = null;
            $scope.pairModal.Length = null;

          }

          $scope.formData.Variants[$scope.pairIndex] = $scope.pairModal;
        });
      }
    };




  }
];
