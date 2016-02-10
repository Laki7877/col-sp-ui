module.exports = ['Product', 'Brand', 'AttributeSet', 'ImageService', 'GlobalCategory', '$q', 'Category',
    function (Product, Brand, AttributeSet, ImageService, GlobalCategory, $q, Category) {
        var $productAdd = {};
    
        $productAdd.fill = function (globalCatId, pageLoader, sharedDataSet,
            sharedFormData, globalCategoryBreadcrumb, controlFlags, variationFactorIndices, ivFormData) {


            var deferred = $q.defer();
            pageLoader.load('Downloading Attribute Sets..');

            AttributeSet.getByCategory(globalCatId)
                .then(function (data) {
                    sharedDataSet.AttributeSets = data.map(function (aset) {
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
                        sharedFormData.AttributeSet = sharedDataSet.AttributeSets[sharedDataSet.AttributeSets.map(function (o) {
                            return o.AttributeSetId
                        }).indexOf(ivFormData.AttributeSet.AttributeSetId)];
                        var parse = function (ivFormData, FullAttributeSet) {
                            pageLoader.load('Loading product data..');
                            var inverseResult = Product.deserialize(ivFormData, FullAttributeSet);
                            //copy it out
                            Object.keys(inverseResult.formData).forEach(function (key) {
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
                    GlobalCategory.getAll().then(function (data) {
                        sharedDataSet.GlobalCategories = GlobalCategory.getAllForSeller(Category.transformNestedSetToUITree(data));
                        sharedFormData.GlobalCategories[0] = Category.findByCatId(globalCatId, sharedDataSet.GlobalCategories);
                        globalCategoryBreadcrumb = Category.createCatStringById(globalCatId, sharedDataSet.GlobalCategories);
                        pageLoader.load('Preparing content..');
                        deferred.resolve();
                    });


                });

            return deferred.promise;
        };

        return $productAdd;
    }];