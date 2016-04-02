var angular = require('angular');
angular.module('productDetail').
factory('$productAdd', function(Product, AttributeSet, AttributeSetService, ImageService, GlobalCategory, $q, Category, util) {
  'ngInject';
  var $productAdd = {};

  //TODO: One day, merge this into some other class that make sense
  /**
   *
   * Rebuild variations array from set of attribute options in dataset
   *
   * @param  {FormData} formData
   * @param  {DataSet} dataSet
   */
  $productAdd.generateVariants = function(formData, dataSet) {
    var deferred = $q.defer();

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

      var kpair = angular.copy(formData.MasterVariant);
      var firstAttribute = {
        AttributeId: !dataSet.attributeOptions[0].Attribute ? 0 : dataSet.attributeOptions[0].Attribute.AttributeId,
        AttributeValues: (!AVId ? [] : [{
          AttributeValueId: AVId
        }]),
        ValueEn: A.ValueEn || A
      };

      var secondAttribute = {
        AttributeId: !dataSet.attributeOptions[1].Attribute ? 0 : dataSet.attributeOptions[1].Attribute.AttributeId,
        AttributeValues: (!BVId ? [] : [{
          AttributeValueId: BVId
        }]),
        ValueEn: B.ValueEn || B
      };

      kpair.FirstAttribute = firstAttribute;
      kpair.SecondAttribute = secondAttribute;
      kpair.text = util.variant.toString(firstAttribute, secondAttribute);
      if(dataSet.VariantDisplayOption) kpair.Display = dataSet.VariantDisplayOption[0].value;
      kpair.Visibility = true;
      if(kpair.SEO) kpair.SEO.ProductUrlKeyEn = "";
      kpair.Sku = "";
      kpair.Pid = null;

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
    deferred.resolve();

    return deferred.promise;
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
   * @param  {function} checkSchema
   * @param  {Integer} globalCatId
   * @param  {AddProductPageLoader} pageLoader
   * @param  {DataSet} sharedDataSet
   * @param  {FormData} sharedFormData
   * @param  {object} breadcrumbs
   * @param  {object} controlFlags
   * @param  {object} variationFactorIndices
   * @param  {InverseFormData} ivFormData (Optional)
   */
  $productAdd.fill = function(checkSchema, globalCatId, pageLoader, sharedDataSet,
    sharedFormData, breadcrumbs, controlFlags, variationFactorIndices, ivFormData) {

    var deferred = $q.defer();
    pageLoader.load('Downloading Attribute Sets..');

    //TODO: Break dependencies
    AttributeSet.getByCategory(globalCatId).then(function(data) {
        pageLoader.load('Validating Schema..');
        if(data.length > 0) checkSchema(data[0], 'attributeSet');

        sharedDataSet.AttributeSets = data.map(function(aset) {
          aset._group = "Suggested Attribute Sets";
          aset.AttributeSetTagMaps = $productAdd.flatten.AttributeSetTagMap(aset.AttributeSetTagMaps);
          return aset;
        });

        sharedDataSet.CombinedAttributeSets = angular.copy(sharedDataSet.AttributeSets);

        var setupGlobalCat = function(){
          pageLoader.load('Downloading Category Tree..');
            //TODO: bad!
            //Load Global Cat
            GlobalCategory.getAll().then(function(data) {
              sharedDataSet.GlobalCategories = GlobalCategory.getAllForSeller(Category.transformNestedSetToUITree(data));
              console.log("Looking for ID ", globalCatId, sharedDataSet.GlobalCategories);
              sharedFormData.GlobalCategories[0] = Category.findByCatId(globalCatId, sharedDataSet.GlobalCategories);
              console.log("Got ", sharedFormData.GlobalCategories[0]);
              breadcrumbs.globalCategory = Category.createCatStringById(globalCatId, sharedDataSet.GlobalCategories);
              console.log(breadcrumbs, "breadcrumb");
              pageLoader.load('Preparing content..');
              deferred.resolve();
            });
        }

        if (ivFormData) {
          pageLoader.load('Indexing Attribute Set');

          //Search for Attribute Set from Attribute Set list that matches the Id
          //TODO: just let backend send entire thing

          // var kw = sharedDataSet.AttributeSets.map(function(o) {
          //   return o.AttributeSetId
          // }).indexOf(ivFormData.AttributeSet.AttributeSetId);
          // console.log("KW Found", kw);

          var parse = function(ivFormData, FullAttributeSet) {
            // pageLoader.load('Loading product data..');
            var inverseResult = Product.deserialize(ivFormData, FullAttributeSet);

            //copy it out
            Object.keys(inverseResult.formData).forEach(function(key) {
              sharedFormData[key] = inverseResult.formData[key];
            });

            console.log("After Inverse Transformation", sharedFormData, inverseResult);
            if (sharedFormData.Variants.length > 0) {
              controlFlags.variation = "enable";
            }

            sharedDataSet.attributeOptions = inverseResult.attributeOptions || sharedDataSet.attributeOptions;
            if (sharedDataSet.attributeOptions[1].options.length > 0) {
              variationFactorIndices.pushSecond();
            }
          };


          var ensureVariantPidness = function(){
            //Ensure that Variants that are multiplied
            //has pid, if not its  special case that are/
            //spawn from import
            $productAdd.generateVariants(sharedFormData, sharedDataSet).then(function(){
                for(var i = 0; i < sharedFormData.Variants.length; i++){
                  if(!sharedFormData.Variants[i].Pid) sharedFormData.Variants[i].Visibility = false;
                }
            });

          }
          
          AttributeSetService.get(ivFormData.AttributeSet.AttributeSetId).then(function(as){

            //Do hacky post-procesisng because this endpoint is not APEAP compliant
            var asComply = AttributeSetService.complyAPEAP(as);
            pageLoader.load('Validating Schema..');
            checkSchema(asComply, 'attributeSet');
            //Flatten Tag
            asComply.AttributeSetTagMaps = $productAdd.flatten.AttributeSetTagMap(asComply.AttributeSetTagMaps);
            sharedFormData.AttributeSet = asComply;

            
          }).finally(function(){
            parse(ivFormData, sharedFormData.AttributeSet);
            ensureVariantPidness();
            setupGlobalCat();
          });

          
          

        }else{
          setupGlobalCat();
        }

        


      });

    return deferred.promise;
  };

  return $productAdd;
});
