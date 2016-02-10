var angular = require('angular');

module.exports = ['$scope', '$window', 'util', 'config', 'Product', 'Image', 'AttributeSet', 'Brand', 'Shop', 'GlobalCategory', 'Category', 'VariantPair', '$rootScope', '$q', 'KnownException', 'NcAlert',
    function ($scope, $window, util, config, Product, ImageService, AttributeSet, Brand, Shop, GlobalCategory, Category, VariantPair, $rootScope, $q, KnownException, NcAlert) {
        'use strict';

        $scope.alert = new NcAlert();
        
        var MAX_FILESIZE = 5000000; //5MB
        var QUEUE_LIMIT = 20;
        var QUEUE_LIMIT_360 = 60;
        var MAX_VARIANT = 100;
        
        $scope.dataSet = {};
        $scope.dataSet.AttributeSets = [];
        $scope.dataSet.GlobalCategories = [];
        $scope.dataSet.LocalCategories = [];
        $scope.dataSet.Brands = [];
        $scope.dataSet.SearchTags = [];
        $scope.dataSet.RelatedProducts = [];
        $scope.dataSet.StockTypes = ['Stock', 'Pre-Order'];
        $scope.dataSet.VariantDisplayOption = [
            { text: 'Show as group of variants', value: 'GROUP' },
            { text: 'Show as individual product', value: 'INDIVIDUAL' }
        ];

        $scope.dataSet.attributeOptions = {
            0: {
                Attribute: false,
                options: []
            },
            1: {
                Attribute: false,
                options: []
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
            alert("File Size must not exceed 5 MB");
        }
        var onImageUploadQueueLimit = function () { }
        $scope.asStatus = Product.getStatus;
        
        var watchVariantChanges = function () {
            $scope.$watch('dataSet.attributeOptions', function () {
                var vHashSet = {};
                var prevVariants = angular.copy($scope.formData.Variants);
                prevVariants.forEach(function (elem, index) {
                    vHashSet[elem.text] = prevVariants[index];
                });
                
                //Unset
                prevVariants = undefined;

                $scope.formData.Variants = [];

                var expand = function (A, B) {

                    if (A['AttributeValue']) {
                        A = A.AttributeValue.AttributeValueEn;
                    }

                    var BId = null;

                    if (angular.isDefined(B)) {
                        BId = $scope.dataSet.attributeOptions[1].Attribute.AttributeId;
                        if (B['AttributeValue']) {
                            B = B.AttributeValue.AttributeValueEn;
                        }
                    } else {
                        B = ''
                        BId = null;
                    }

                    var kpair = new VariantPair({
                        AttributeId: $scope.dataSet.attributeOptions[0].Attribute.AttributeId,
                        ValueEn: A
                    }, {
                            AttributeId: BId,
                            ValueEn: B
                        });

                    //Initialize
                    kpair.ProductNameEn = $scope.formData.MasterVariant.ProductNameEn;
                    kpair.ProductNameTh = $scope.formData.MasterVariant.ProductNameTh;
                    kpair.Display = $scope.dataSet.VariantDisplayOption[0].value;
                    kpair.Visibility = true;
                    kpair.DimensionUnit = "MM";
                    kpair.WeightUnit = "G";

                    if (kpair.text in vHashSet) {
                        //Replace with value from vHashSet
                        kpair = vHashSet[kpair.text];
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
            Brand: { id: null, BrandNameEn: "Search for Brand Name.." },
            MasterVariant: { DimensionUnit: "MM", WeightUnit: "G", StockType: "Stock" },
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
            SEO: { ProductBoostingWeight: 5000 },
            ControlFlags: [],
            Keywords: []
        };
    
        //Variation Factor (lhs) Indices are used as index
        //for ng-repeat in variation tab
        $scope.variationFactorIndices = {};
        $scope.variationFactorIndices.iterator = [0];
        $scope.variationFactorIndices.length = function () {
            return $scope.variationFactorIndices.iterator.length;
        }
        $scope.variationFactorIndices.popSecond = function () {
            $scope.variationFactorIndices.length() == 2 && $scope.variationFactorIndices.iterator.pop();
            $scope.dataSet.attributeOptions[1].options = [];
        }
        $scope.variationFactorIndices.pushSecond = function () {
            $scope.variationFactorIndices.length() < 2 && $scope.variationFactorIndices.iterator.push(1);
        }

   
        //TODO: Change _attrEnTh(t) to _attrEnTh(Name, t)
        $scope._attrEnTh = function (t) { return t.AttributeSetNameEn + " / " + t.AttributeSetNameTh; }
        $scope._isFreeTextInput = util.isFreeTextDataType;
        $scope._isListInput = util.isListDataType;

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

        //TODO: too Weird
        $scope.enableProductVariations = "disable";

        $scope.preview = function () {
            return console.log($scope.formData);
        };

        $scope.refreshRelatedProducts = function (q) {
            return Product.getAll({
                searchText: q
            }).then(function (ds) {
                $scope.dataSet.RelatedProducts = ds.data;
            });
        };

        $scope.refreshBrands = function (q) {
            if (q == "" || !q || q == null) return;
            Brand.getAll({
                pageSize: 10,
                searchText: q
            }).then(function (ds) {
                $scope.dataSet.Brands = ds.data;
            });
        };

        $scope.$watch('formData.MasterVariant.SalePrice', function () {
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
            var form = $scope.addProductForm;
            if (form.ExpireDate) form.ExpireDate.$setValidity("min", true);
            if ($scope.formData.ExpireDate < $scope.formData.EffectiveDate) {
                if (!form.ExpireDate) return;
                if (form.ExpireDate) form.ExpireDate.$setValidity("min", false);
                form.ExpireDate.$error['min'] = 'Effective date/time must come before expire date/time';
            }
        });

        var manualValidate = function () {
            var mat = [];
            if (!$scope.formData.MasterVariant.DescriptionFullTh || $scope.formData.MasterVariant.DescriptionFullTh == "") {
                mat.push("Missing Description (Thai)");
            }

            if (!$scope.formData.MasterVariant.DescriptionFullEn || $scope.formData.MasterVariant.DescriptionFullEn == "") {
                mat.push("Missing Description (English)");
            }

            if (!$scope.formData.Brand.BrandId) {
                mat.push("Brand is Missing");
            }

            return mat;
        };

        //TODO: Move elsewhere to $addProduct and perform dependency injection
        var setupDependencies = function (globalCatId, pageLoader, ivFormData) {

            if (!globalCatId) { throw new KnownException("Catalog Id not given in catReady") }

            var deferred = $q.defer();
            pageLoader.load('Downloading Attribute Sets..');

            AttributeSet.getByCategory(globalCatId)
                .then(function (data) {
                    //remove complex structure we dont need
                    $scope.dataSet.AttributeSets = data.map(function (aset) {
                        aset.AttributeSetTagMaps = aset.AttributeSetTagMaps.map(function (asti) {
                            return asti.Tag.TagName;
                        });
                        aset.AttributeSetMaps = aset.AttributeSetMaps.map(function (asetmapi) {
                            asetmapi.Attribute.AttributeValueMaps = asetmapi.Attribute.AttributeValueMaps.map(function (value) {
                                return value.AttributeValue.AttributeValueEn;
                            });
                            return asetmapi;
                        });
                        return aset;
                    });

                    if (ivFormData) {
                        pageLoader.load('Indexing AttributeSet');
                        $scope.formData.AttributeSet = $scope.dataSet.AttributeSets[$scope.dataSet.AttributeSets.map(function (o) {
                            return o.AttributeSetId
                        }).indexOf(ivFormData.AttributeSet.AttributeSetId)];
                        var parse = function (ivFormData, FullAttributeSet) {
                            pageLoader.load('Loading product data..');
                            var inverseResult = Product.deserialize(ivFormData, FullAttributeSet);
                            $scope.formData = inverseResult.formData;
                            console.log("After Inverse Transformation", $scope.formData);
                            if ($scope.formData.Variants.length > 0) {
                                $scope.enableProductVariations = "enable";
                            }
                            $scope.dataSet.attributeOptions = inverseResult.attributeOptions || $scope.dataSet.attributeOptions;
                            if ($scope.dataSet.attributeOptions[1].options.length > 0){
                                $scope.variationFactorIndices.pushSecond();
                            }
                            //Initialize Uploader
                            ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages, onImageUploadQueueLimit, onImageUploadFail);
                            ImageService.assignUploaderEvents($scope.uploader360, $scope.formData.MasterImages360, onImageUploadQueueLimit, onImageUploadFail);
                        };
                        parse(ivFormData, $scope.formData.AttributeSet);
                    }

                    pageLoader.load('Downloading Category Tree..');
                    //Load Global Cat
                    GlobalCategory.getAll().then(function (data) {
                        $scope.dataSet.GlobalCategories = GlobalCategory.getAllForSeller(Category.transformNestedSetToUITree(data));
                        $scope.formData.GlobalCategories[0] = Category.findByCatId(globalCatId, $scope.dataSet.GlobalCategories);
                        $scope.globalCategoryBreadcrumb = Category.createCatStringById(globalCatId, $scope.dataSet.GlobalCategories);

                        pageLoader.load('Preparing content..');
                        deferred.resolve();
                    });

                    watchVariantChanges();
                });

            return deferred.promise;
        };
            
        /*
         *  Publish (both Draft and WA)
         */
        $scope.publish = function (Status) {

            $scope.pageState.reset();
            $scope.pageState.load('Validating..');

            $scope.onPublishing = (Status == "WA");

            //On click validation
            var validateMat = manualValidate();
            if (validateMat.length > 0 && Status == 'WA') {
                $scope.pageState.reset();
                $scope.alert.error(validateMat);
                return;
            }
            
            if($scope.addProductForm.$invalid){
                $scope.pageState.reset();
                $scope.alert.error("Unable to save because you are missing required fields");
                return;
            }

            $scope.pageState.load('Publishing..');
            console.log("Publishing with Status = ", Status);
            //Error Handling too Messi
            try {
                var apiRequest = Product.serialize($scope.formData);
                Product.publish(apiRequest, Status).then(function (res) {
                    $scope.pageState.reset();
                    if (res.ProductId) {
                        $scope.overview = res;
                        $scope.alert.success('Your product has been saved successfully. <a href="/products/">View Product List</a>');
                        $scope.formData.ProductId = res.ProductId;
                        $scope.formData.MasterVariant.Pid = res.MasterVariant.Pid;
                        $scope.addProductForm.$setPristine(true)
                    } else {
                        $scope.alert.error('Unable to save because ' + (res.message || res.Message))
                        $scope.enableProductVariations = ($scope.formData.Variants.length > 0 ? 'enable' : 'disable');
                    }
                }, function (er) {
                    $scope.pageState.reset();
                    $scope.alert.error('Unable to save because ' + (er.message || er.Message))
                    $scope.enableProductVariations = ($scope.formData.Variants.length > 0 ? 'enable' : 'disable');

                });

            } catch (ex) {
                $scope.pageState.reset();
                $scope.alert.error('Unable to save because ' + (ex.message || ex.Message))
                $scope.enableProductVariations = ($scope.formData.Variants.length > 0 ? 'enable' : 'disable');

                console.log('publish failure', ex);
                return;
            }
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
            //TODO: Refactor, use better callback mechanism
            if (!angular.isObject(viewBag)) throw new KnownException("View bag is corrupted");

            var shopId = 1;  //TODO: Get from user 
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
                        setupDependencies(Number(inverseFormData.GlobalCategory), $scope.pageState, inverseFormData)
                            .then(function () {
                                $scope.formData.ProductId = Number(productId);
                                $scope.pageState.reset();
                            });
                    }, function (error) {
                        throw new KnownException("Unable to fetch product with id " + productId);
                    });

            } else if ("catId" in viewBag) {
                setupDependencies(Number(viewBag.catId), $scope.pageState)
                .then($scope.pageState.reset);
            }else{
                throw new KnownException("Invalid mode, viewBag garbage");
            }

            //Load Local Cat
            Shop.getLocalCategories(shopId).then(function (data) {
                $scope.dataSet.LocalCategories = Category.transformNestedSetToUITree(data);
            });

        }

        var tabPage = {};

        tabPage.images = {
            angular: function () {
                //Assign uploader images
                ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages, onImageUploadQueueLimit, onImageUploadFail);
                ImageService.assignUploaderEvents($scope.uploader360, $scope.formData.MasterImages360, onImageUploadQueueLimit, onImageUploadFail);

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
                    //Define if not defined
                    if (angular.isUndefined(pair.Images)) {
                        pair.Images = [];
                    }
                    if (angular.isUndefined(pair.queue)) {
                        pair.queue = [];
                    }
                    //Modal target (for viewing pair)
                    $scope.pairModal = angular.copy(pair);
                    $scope.pairIndex = index;
                    $scope.uploaderModal.queue = $scope.pairModal.queue;
                    ImageService.assignUploaderEvents($scope.uploaderModal, $scope.pairModal.Images, onImageUploadQueueLimit, onImageUploadFail);
                });
                $scope.$on('savePairModal', function (evt) {
                    $scope.formData.Variants[$scope.pairIndex] = $scope.pairModal;
                });
            }
        };




    }];
