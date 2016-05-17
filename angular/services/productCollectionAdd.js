module.exports = ['Product', 'Collection', 'Brand', 'AttributeSet', 'ImageService', 'GlobalCategory', '$q', 'Category',
    function (Product,  Collection, Brand, AttributeSet, ImageService, GlobalCategory, $q, Category) {
        var $productCollectionAdd = {};
        
        /*
        * Wraps around multiple services,
        * and solves dependencies needed for AddProduct Collection view variables
        * to be parsable
        */
        $productCollectionAdd.fill = function ( pageLoader, sharedDataSet,
            sharedFormData, controlFlags, variationFactorIndices, ivFormData) {


            var deferred = $q.defer();

              var parse = function (ivFormData) {
                            pageLoader.load('Loading product data..');
                            // var inverseResult = Product.deserialize(ivFormData, FullAttributeSet);
                            var inverseResult = Collection.deserialize(ivFormData);

                            //copy it out
                            Object.keys(inverseResult.formData).forEach(function (key) {
                                sharedFormData[key] = inverseResult.formData[key];
                            })
                        };
                        parse(ivFormData);

            return deferred.promise;
        };

        return $productCollectionAdd;
    }];