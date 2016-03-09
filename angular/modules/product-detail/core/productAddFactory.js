var angular = require('angular');
angular.module('productDetail').
    factory('$productAdd', function(Product, Brand, AttributeSet, ImageService, GlobalCategory, $q, Category, util) {
        'ngInject';
        var $productAdd = {};

        /**
         * 
         * Rebuild variations array from set of attribute options in dataset
         * 
         * @param  {FormData} formData
         * @param  {DataSet} dataSet
         */
        $productAdd.generateVariants = function(formData, dataSet) {
            var vHashSet = {};
            var prevVariants = angular.copy(formData.Variants);
            prevVariants.forEach(function(elem, index) {
                vHashSet[elem.text] = prevVariants[index];
            });

            //Unset
            prevVariants = undefined;

            formData.Variants = [];
            var trackVariant = new Set();

            var VARIANT_DUMMY_FACTOR = '';
            var expand = function(A0, B0) {

                var AVId = null;
                var BVId = null;
                var B = B0;
                var A = A0;

                if (_.has(A0, 'AttributeValue.AttributeValueId')) {
                    AVId = A0.AttributeValue.AttributeValueId;
                    A = A0.AttributeValue.AttributeValueEn;
                }

                if (angular.isDefined(B0)) {
                    if (_.has(B0, 'AttributeValue.AttributeValueId')) {
                        BVId = B0.AttributeValue.AttributeValueId;
                        B = B0.AttributeValue.AttributeValueEn;
                    }
                } else {
                    //B is not defined
                    B = VARIANT_DUMMY_FACTOR;
                }

                var kpair = {};
                var firstAttribute = {
                    AttributeId: !dataSet.attributeOptions[0].Attribute ? null : dataSet.attributeOptions[0].Attribute.AttributeId,
                    AttributeValues: (!AVId ? [] : [{
                        AttributeValueId: AVId
                    }]),
                    ValueEn: A
                };

                var secondAttribute = {
                    AttributeId: !dataSet.attributeOptions[1].Attribute ? null : dataSet.attributeOptions[1].Attribute.AttributeId,
                    AttributeValues: (!BVId ? [] : [{
                        AttributeValueId: BVId
                    }]),
                    ValueEn: B
                };

                kpair.FirstAttribute = firstAttribute;
                kpair.SecondAttribute = secondAttribute;
                kpair.text = util.variant.toString(firstAttribute, secondAttribute);
                //Copy default value over from main variant
                kpair.ProductNameEn = formData.MasterVariant.ProductNameEn;
                kpair.ProductNameTh = formData.MasterVariant.ProductNameTh;
                kpair.Display = dataSet.VariantDisplayOption[0].value;
                kpair.Visibility = true;
                kpair.DimensionUnit = "MM";
                kpair.WeightUnit = "G";
                kpair.Sku = (formData.MasterVariant.Sku || "SKU") + "-" + (Number((formData.Variants || []).length) + 1);
                kpair.OriginalPrice = formData.MasterVariant.OriginalPrice;
                kpair.SalePrice = formData.MasterVariant.SalePrice;
                kpair.Quantity = formData.MasterVariant.Quantity;
                kpair.Length = formData.Length;
                kpair.Width = formData.Width;
                kpair.Height = formData.Height;
                kpair.Upc = formData.MasterVariant.Upc;
                kpair.Weight = formData.Weight;
                kpair.DescriptionFullEn = formData.MasterVariant.DescriptionFullEn;
                kpair.DescriptionFullTh = formData.MasterVariant.DescriptionFullTh;
                kpair.DescriptionShortEn = formData.MasterVariant.DescriptionShortEn;
                kpair.DescriptionShortTh = formData.MasterVariant.DescriptionShortTh;
                kpair.Images = angular.copy(formData.MasterImages);
                kpair.VideoLinks = angular.copy(formData.VideoLinks);
                kpair.PrepareDay = formData.PrepareDay;
                kpair.PrepareSun = formData.PrepareSun;
                kpair.PrepareSat = formData.PrepareSat;
                kpair.PrepareFri = formData.PrepareFri;
                kpair.PrepareThu = formData.PrepareThu;
                kpair.PrepareWed = formData.PrepareWed;
                kpair.PrepareTue = formData.PrepareTue;
                kpair.PrepareMon = formData.PrepareMon;
                kpair.SEO = angular.copy(formData.SEO || {});
                kpair.SEO.ProductUrlKeyEn = "";

                if (kpair.text in vHashSet) {
                    //Replace with value from vHashSet
                    kpair = vHashSet[kpair.text];
                }

                var hashNew = (util.variant.toString(kpair.FirstAttribute, kpair.SecondAttribute));
                if (!trackVariant.has(hashNew)) {
                    //Only push new variant if don't exist

                    formData.Variants.push(kpair);
                    trackVariant.add(hashNew);
                }

            }

            //Multiply out unmultiplied options
            if (dataSet.attributeOptions && Object.keys(dataSet.attributeOptions).length > 0) {
                for (var aKey in dataSet.attributeOptions[0].options) {
                    var A = dataSet.attributeOptions[0].options[aKey];

                    if (angular.isDefined(dataSet.attributeOptions[1]['options']) && dataSet.attributeOptions[1].options.length == 0) {
                        expand(A);
                    }

                    for (var bKey in dataSet.attributeOptions[1].options) {
                        var B = dataSet.attributeOptions[1].options[bKey];
                        expand(A, B);
                    }
                }
            }

            formData.DefaultVariant = formData.Variants[0];
        };


        $productAdd.flatten = {
            'AttributeSetTagMap': function(AttributeSetTagMap) {
                return AttributeSetTagMap.map(function(asti) {
                    return asti.Tag.TagName;
                });
            }
        };

        /**
         * 
         * Fill product add page with data of related dependencies
         * 
         * @param  {Integer} globalCatId
         * @param  {AddProductPageLoader} pageLoader
         * @param  {DataSet} sharedDataSet
         * @param  {FormData} sharedFormData
         * @param  {object} breadcrumbs
         * @param  {object} controlFlags
         * @param  {object} variationFactorIndices
         * @param  {InverseFormData} ivFormData (Optional)
         */
        $productAdd.fill = function(globalCatId, pageLoader, sharedDataSet,
            sharedFormData, breadcrumbs, controlFlags, variationFactorIndices, ivFormData) {


            var deferred = $q.defer();
            pageLoader.load('Downloading Attribute Sets..');

            AttributeSet.getByCategory(globalCatId)
                .then(function(data) {
                    sharedDataSet.AttributeSets = data.map(function(aset) {
                        aset._group = "Suggested Attribute Sets";
                        aset.AttributeSetTagMaps = $productAdd.flatten.AttributeSetTagMap(aset.AttributeSetTagMaps);
                        return aset;
                    });

                    sharedDataSet.CombinedAttributeSets = angular.copy(sharedDataSet.AttributeSets);
                    
                    if (ivFormData) {
                        pageLoader.load('Indexing AttributeSet');
                        sharedFormData.AttributeSet = sharedDataSet.AttributeSets[sharedDataSet.AttributeSets.map(function(o) {
                            return o.AttributeSetId
                        }).indexOf(ivFormData.AttributeSet.AttributeSetId)];

                        var parse = function(ivFormData, FullAttributeSet) {
                            pageLoader.load('Loading product data..');
                            var inverseResult = Product.deserialize(ivFormData, FullAttributeSet);

                            //copy it out
                            Object.keys(inverseResult.formData).forEach(function(key) {
                                sharedFormData[key] = inverseResult.formData[key];
                            })

                            console.log("After Inverse Transformation", sharedFormData);
                            if (sharedFormData.Variants.length > 0) {
                                controlFlags.variation = "enable";
                            }
                            sharedDataSet.attributeOptions = inverseResult.attributeOptions || sharedDataSet.attributeOptions;
                            if (sharedDataSet.attributeOptions[1].options.length > 0) {
                                variationFactorIndices.pushSecond();
                            }
                        };
                        parse(ivFormData, sharedFormData.AttributeSet);
                    }

                    pageLoader.load('Downloading Category Tree..');
                    //Load Global Cat
                    GlobalCategory.getAll().then(function(data) {
                        sharedDataSet.GlobalCategories = GlobalCategory.getAllForSeller(Category.transformNestedSetToUITree(data));
                        sharedFormData.GlobalCategories[0] = Category.findByCatId(globalCatId, sharedDataSet.GlobalCategories);
                        breadcrumbs.globalCategory = Category.createCatStringById(globalCatId, sharedDataSet.GlobalCategories);
                        console.log(breadcrumbs, "breadcrumb");
                        pageLoader.load('Preparing content..');
                        deferred.resolve();
                    });


                });

            return deferred.promise;
        };

        return $productAdd;
    });