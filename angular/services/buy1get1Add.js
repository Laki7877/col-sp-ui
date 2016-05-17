module.exports = ['Product', 'Collection', 'Buy1Get1','Brand', 'AttributeSet', 'ImageService', 'GlobalCategory', '$q', 'Category',
    function (Product,  Collection, Buy1Get1 , Brand, AttributeSet, ImageService, GlobalCategory, $q, Category) {
        var $buy1get1Add = {};
        
        /*
        * Wraps around multiple services,
        * and solves dependencies needed for AddProduct Collection view variables
        * to be parsable
        */
        $buy1get1Add.fill = function ( pageLoader, sharedDataSet,
            sharedFormData, controlFlags, variationFactorIndices, ivFormData) {


            var deferred = $q.defer();

              var parse = function (ivFormData) {
                            pageLoader.load('Loading product data..');
                            // var inverseResult = Product.deserialize(ivFormData, FullAttributeSet);
                            var inverseResult = Buy1Get1.deserialize(ivFormData);

                            //copy it out
                            Object.keys(inverseResult.formData).forEach(function (key) {
                                sharedFormData[key] = inverseResult.formData[key];
                            })
                        };
                        parse(ivFormData);

            return deferred.promise;
        };

        return $buy1get1Add;
    }];