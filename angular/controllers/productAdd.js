var angular = require('angular');

module.exports = function ($scope, $uibModal, $window, util, config, Product, ImageService,
    AttributeSet, Brand, Shop, LocalCategoryService, GlobalCategory, Category, VariantPair, $rootScope, $q,
    KnownException, NcAlert, $productAdd) {
    'ngInject';

    $scope.alert = new NcAlert();

    var MAX_FILESIZE = 5000000; //5MB
    var QUEUE_LIMIT = 20;
    var QUEUE_LIMIT_360 = 60;

    $scope.image_alert = new NcAlert();
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
        BrandNameEn: "Input brand by name or ID...",
        disabled: true
    }];
    $scope.enableVariation = function () {
        $scope.controlFlags.variation = 'enable';
    };
    $scope.dataSet.SearchTags = [];
    $scope.dataSet.RelatedProducts = [];
    $scope.dataSet.StockTypes = ['Stock', 'Pre-Order'];
    $scope.dataSet.VariantDisplayOption = [{ text: 'Show as group of variants', value: 'GROUP' }, { text: 'Show as individual product', value: 'INDIVIDUAL' }];

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

    $window.onbeforeunload = function (e) {
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

    var onImageUploadFail = function (item, filter) {
        $scope.image_alert.error(item.Message || 'Your image does not meet guideline. Images must be smaller than 5 MB, with square size larger than 1500x1500.');
    }

    var onImageUploadSuccess = function () {
        $scope.image_alert.close();
    }

    var onImageUploadQueueLimit = function () { }
    $scope.asStatus = Product.getStatus;

    $scope.overview = {};

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


    var watchVariantFactorChanges = function () {
        $scope.$watch('dataSet.attributeOptions', function () {
            $productAdd.generateVariants($scope.formData, $scope.dataSet);
        }, true);
    };

    //Variation Factor (lhs) Indices are used as index
    //for ng-repeat in variation tab
    $scope.variationFactorIndices = {
        iterator: [0],
        length: function () {
            return $scope.variationFactorIndices.iterator.length;
        },
        popSecond: function () {
            $scope.variationFactorIndices.length() == 2 && $scope.variationFactorIndices.iterator.pop();
            $scope.dataSet.attributeOptions[1].options = [];
            $scope.dataSet.attributeOptions[1].Attribute = null;
        },
        pushSecond: function () {
            $scope.variationFactorIndices.length() < 2 && $scope.variationFactorIndices.iterator.push(1);
        }
    };

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
        load: function (msg) {
            $scope.pageState.loading.message = msg;
            $scope.pageState.loading.state = true;
        },
        reset: function () {
            $scope.alert.close();
            $scope.pageState.loading.state = false;
        }
    };

    $scope.breadcrumbs = {
        globalCategory: null
    };


    $scope.preview = function () {
        return console.log($scope.formData);
    };
    
    /**
     * Refresh Related Product Data 
     * @param  {String} q
     */
    $scope.refreshRelatedProducts = function (q) {
        return Product.getAll({
            searchText: q,
            pageSize: 4
        }).then(function (ds) {
            $scope.dataSet.RelatedProducts = ds.data;
        });
    };
    
    /**
     * Refresh Brand Data Set used for searching 
     * @param  {String} q
     */
    $scope.refreshBrands = function (q) {
        if (q == "" || !q || q == null) return;
        $scope.dataSet.Brands = [{
            BrandId: -1,
            BrandNameEn: "Searching..",
            disabled: true
        }];

        Brand.getAll({
            pageSize: 10,
            searchText: q
        }).then(function (ds) {
            $scope.dataSet.Brands = ds.data;
        });
    };

    $scope.$watch('formData.MasterVariant.OriginalPrice+formData.MasterVariant.SalePrice', function () {
        var form = $scope.addProductForm;
        if (form.MasterVariant_SalePrice) form.MasterVariant_SalePrice.$setValidity("min", true);
        if (!form.MasterVariant_SalePrice) return;
        if ($scope.formData.MasterVariant.SalePrice == "") return;

        if (Number($scope.formData.MasterVariant.SalePrice) >= Number($scope.formData.MasterVariant.OriginalPrice)) {
            if (form.MasterVariant_SalePrice) form.MasterVariant_SalePrice.$setValidity("min", false);
            form.MasterVariant_SalePrice.$error["min"] = "Sale Price must not exceed Original Price";
        }
    });

    $scope.$watch('formData.ExpireDate', function () {
        //TODO: refactor use nctemplate
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
    
    /**
     * Other additional validations
     * @param  {String} Status
     */
    var manualValidate = function (Status) {
        var mat = [];

        if (Status == 'WA') {
            if (!$scope.formData.MasterVariant.DescriptionFullTh || $scope.formData.MasterVariant.DescriptionFullTh == "") {
                mat.push("Description (Thai)");
            }

            if (!$scope.formData.MasterVariant.DescriptionFullEn || $scope.formData.MasterVariant.DescriptionFullEn == "") {
                mat.push("Description (English)");
            }

            if (!$scope.formData.Brand.BrandId) {
                mat.push("Brand");
            }

            if ($scope.formData.MasterImages.length == 0) {
                mat.push("At least one image");
            }

            $scope.formData.Variants.forEach(function (variant) {
                if (variant.Images.length == 0) {
                    mat.push("At least one image for variation " + "'" + variant.text + "'");
                }
            });

        }

        var cnt = $scope.formData.Variants.reduce(function (total, x) {
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
    
    /**
     * Publish Confirmation
     * Show dialog to ask if user really want to publish
     */
    $scope.prePublishWA = function () {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'product/modalConfirmPublish',
            controller: function ($scope, $uibModalInstance, $timeout) {
                'ngInject';
                $scope.no = function () {
                    $uibModalInstance.close('no');
                }

                $scope.yes = function () {
                    $uibModalInstance.close('yes');
                }
            },
            size: 'size-warning',
            resolve: {

            }
        });
        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
            if (selectedItem == 'yes') {
                $scope.publish('WA');
            }
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });

    }
    
    /**
     * Publish (save as draft and publish)
     * @param  {String} Status (WA or DF or other enum sent to server)
     */
    $scope.publish = function (Status) {

        $scope.pageState.reset();
        $scope.pageState.load('Validating..');


        if ($scope.controlFlags.variation == 'enable' && $scope.formData.Variants.length == 0) {
            $scope.controlFlags.variation == 'disable';
        }

        if ($scope.controlFlags.variation == 'disable') {
            $scope.formData.Variants = [];
        }


        $scope.onPublishing = (Status == "WA");
        //On click validation
        var validateMat = manualValidate(Status);
        if (validateMat.length > 0) {
            $scope.pageState.reset();
            $scope.alert.error(validateMat.join(", "));
            return;
        }

        if ($scope.addProductForm.$invalid) {
            $scope.pageState.reset();
            var requiredMissing = ('required' in $scope.addProductForm.$error);
            if (Status == 'DF' && requiredMissing) {
                var errorList = [];
                if ($scope.addProductForm.MasterVariant_ProductNameEn.$invalid) {
                    errorList.push('Product Name (English)');
                }
                //Product Name (Thai), Product Name (English), and Sale Price,
                if ($scope.addProductForm.MasterVariant_ProductNameTh.$invalid) {
                    errorList.push('Product Name (Thai)');
                }

                if ($scope.addProductForm.MasterVariant_SalePrice.$invalid) {
                    errorList.push('Sale Price');
                }
                errorList.push('Master Attributes');

                $scope.alert.error("Unable to save. Please make sure that " + errorList.join(" and ") + " are filled correctly.");
            } else if (Status == 'WA' && requiredMissing) {
                $scope.alert.error("Unable to publish because you are missing required fields");
            } else {
                console.warn($scope.addProductForm.$error)
                $scope.alert.error("Unable to save. Please make sure all fields have no error.");
            }
            return;
        }

        $scope.pageState.load('Saving..');

        var apiRequest = Product.serialize($scope.formData);
        Product.publish(apiRequest, Status).then(function (res) {
            $scope.pageState.reset();
            if (res.ProductId) {
                $scope.overview = res;
                $scope.dataSet.attributeOptions = angular.copy(protoAttributeOptions); //will trigger watchvariantchange
                var catId = Number(res.GlobalCategory);
                $productAdd.fill(catId, $scope.pageState, $scope.dataSet, $scope.formData, $scope.breadcrumbs.globalCategory, $scope.controlFlags, $scope.variationFactorIndices, res).then(function () {
                    $scope.formData.ProductId = Number(res.ProductId);
                    $scope.pageState.reset();
                    $scope.alert.success('Your product has been saved successfully. <a href="/products/">View Product List</a>');
                    ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages, onImageUploadQueueLimit, onImageUploadFail, onImageUploadSuccess);
                });
                $scope.addProductForm.$setPristine(true);
            } else {
                $scope.alert.error('Unable to save because ' + (res.message || res.Message));
                $scope.controlFlags.variation = ($scope.formData.Variants.length > 0 ? 'enable' : 'disable');
            }
        }, function (er) {
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
        'fn': function (item) {
            return item.size <= MAX_FILESIZE;
        }
    });

    $scope.uploader360 = ImageService.getUploader('/ProductImages', {
        queueLimit: QUEUE_LIMIT_360
    });

    $scope.init = function (viewBag) {

        if (!angular.isObject(viewBag)) throw new KnownException("View bag is corrupted");

        var _editMode = ("productId" in viewBag)
        for (var page in tabPage) {
            tabPage[page].angular();
        }

        if (_editMode) {
            var productId = viewBag.productId;
            $scope.pageState.load('Loading Product..');

            Product.getOne(productId)
                .then(function (inverseFormData) {
                    $scope.overview = angular.copy(inverseFormData);
                    var catId = Number(inverseFormData.GlobalCategory);
                    $productAdd.fill(catId, $scope.pageState, $scope.dataSet, $scope.formData, $scope.breadcrumbs, $scope.controlFlags,
                        $scope.variationFactorIndices, inverseFormData).then(function () {
                            $scope.formData.ProductId = Number(productId);
                            $scope.pageState.reset();
                            watchVariantFactorChanges();
                            ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages, onImageUploadQueueLimit, onImageUploadFail, onImageUploadSuccess);
                        });
                }, function (error) {
                    throw new KnownException("Unable to fetch product with id " + productId);
                });

        } else if ('catId' in viewBag) {
            if (viewBag.catId == null) window.location.href = "/products/select";

            var catId = Number(viewBag.catId);
            $productAdd.fill(catId, $scope.pageState, $scope.dataSet, $scope.formData, $scope.breadcrumbs,
                $scope.controlFlags, $scope.variationFactorIndices).then(function () {
                    $scope.pageState.reset();
                    watchVariantFactorChanges();
                    ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages, onImageUploadQueueLimit, onImageUploadFail, onImageUploadSuccess);
                });
        } else {

            throw new KnownException("Invalid mode, viewBag garbage");
        }

        //Load Local Cat
        LocalCategoryService.list().then(function (data) {
            $scope.dataSet.LocalCategories = Category.transformNestedSetToUITree(data);
        });
    }

    var tabPage = {};

    tabPage.images = {
        angular: function () {

            /**
             * IMAGE THUMBNAIL EVENTS
             */
            $scope.$on('left', function (evt, item, array, index) {
                var to = index - 1;
                if (to < 0) to = array.length - 1;

                var tmp = array[to];
                array[to] = item;
                array[index] = tmp;
            });
            $scope.$on('right', function (evt, item, array, index) {
                var to = index + 1;
                if (to >= array.length) to = 0;

                var tmp = array[to];
                array[to] = item;
                array[index] = tmp;
            });
            $scope.$on('delete', function (evt, item, array, index) {
                array.splice(index, 1);
            });
            $scope.$on('zoom', function (evt, item, array, index) {
                //Should use angular way, but ok whatever
                $('#product-image-zoom img').attr('src', item.url);
                $('#product-image-zoom').modal('show');
            });
        }
    };

    tabPage.category = {
        angular: function () {
            //For viewing only
            $scope.viewCategoryColumns = [];
            $scope.viewCategorySelected = null;
            $scope.viewCategoryIndex = 0;
            $scope.selectCategory = angular.noop;

            //Events
            $scope.$on('openGlobalCat', function (evt, item, indx) {
                console.log('openGloCat', item, $scope.dataSet.GlobalCategories);
                $scope.viewCategoryColumns = Category.createColumns(item, $scope.dataSet.GlobalCategories);
                $scope.viewCategorySelected = item;
                $scope.viewCategoryIndex = indx;
                $scope.selectCategory = Category.createSelectFunc($scope.viewCategoryColumns, function (selectedItem) {
                    $scope.viewCategorySelected = selectedItem;
                });
            });
            $scope.$on('deleteGlobalCat', function (evt, indx) {
                $scope.formData.GlobalCategories[indx] = null;
            });
            $scope.$on('selectGlobalCat', function (evt, row, indx, parentIndx) {
                $scope.selectCategory(row, indx, parentIndx);
            });
            $scope.$on('saveGlobalCat', function (evt) {
                $scope.formData.GlobalCategories[$scope.viewCategoryIndex] = $scope.viewCategorySelected;
            });

            //Events
            $scope.$on('openLocalCat', function (evt, item, indx) {
                console.log(item, $scope.dataSet.LocalCategories);
                $scope.viewCategoryColumns = Category.createColumns(item, $scope.dataSet.LocalCategories);
                $scope.viewCategorySelected = item;
                $scope.viewCategoryIndex = indx;
                $scope.selectCategory = Category.createSelectFunc($scope.viewCategoryColumns, function (selectedItem) {
                    $scope.viewCategorySelected = selectedItem;
                });
            });
            $scope.$on('deleteLocalCat', function (evt, indx) {
                $scope.formData.LocalCategories[indx] = null;
            });
            $scope.$on('selectLocalCat', function (evt, row, indx, parentIndx) {
                $scope.selectCategory(row, indx, parentIndx);
            });
            $scope.$on('saveLocalCat', function (evt) {
                $scope.formData.LocalCategories[$scope.viewCategoryIndex] = $scope.viewCategorySelected;
            });
        }
    }

    tabPage.variation = {

        angular: function () {
            /**
             * This part handles when user click on More Detail and open pair form
             */

            $scope.uploaderModal = ImageService.getUploader('/ProductImages', {
                queueLimit: QUEUE_LIMIT
            });

            $scope.uploaderModal.filters.push({
                'name': 'enforceMaxFileSize',
                'fn': function (item) {
                    return item.size <= MAX_FILESIZE;
                }
            });

            $scope.$on('openPairModal', function (evt, pair, array, index) {

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
                ImageService.assignUploaderEvents($scope.uploaderModal, $scope.pairModal.Images, onImageUploadQueueLimit, onImageUploadFail, onImageUploadSuccess);
            });

            $scope.$on('savePairModal', function (evt) {
                $scope.formData.Variants[$scope.pairIndex] = $scope.pairModal;
            });
        }
    };




};
