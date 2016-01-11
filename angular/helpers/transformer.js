var angular = require('angular');

module.exports = [function () {
    'use strict';
    var tra = {};

    tra.productTransform = function(fd){
	//TODO: REmove [A] from [A, B,C] Variant
	    /*
    		 * - Convert all category into single { CategoryId } Structure
    		 * - Add position to image {} request
    		 * - Multiply base attributes into each variants
    		 */

    		var hasVariants = (("Variants" in fd) && fd.Variants.length > 0);

    		//Cleaned data
    		var clean = {};

    		var objectMapper = {
    			VideoLinks: function(vlink){
    				var f = [];
    				Object.keys(vlink).forEach(function(key){
    					var value = vlink[key];
    					var obj = {
    						'Url': value
    					};

    					f.push(obj);
    				});
    				return f;
    			}
    		};
    		//Mapper functions
    		var mapper = {
    			Images: function(image, pos){
    					image.position = pos;
    					return image;
    			},
    			Variants: function(_variant){
    				var variant = angular.copy(_variant);
    				if("queue" in variant) delete variant.queue; //circular
    				variant.Images = variant.Images.map(mapper.Images);
    				variant.Images360 = []; //for future
    				variant.VideoLinks = objectMapper.VideoLinks(variant.VideoLinks);
    				return variant;
    			},
    			Categories: function(lcat){
    				if(lcat == null) return null;
    				return {
    					CategoryId: lcat.CategoryId
    				};
    			}
    		}

    		try{
    			clean.GlobalCategories = fd.GlobalCategories.map(mapper.Categories);
    			clean.LocalCategories = fd.LocalCategories.map(mapper.Categories);
    		}catch(ex){
    			console.warn("Cat Map",ex);
    		}

    		try{
    			clean.Keywords = (!fd.Keywords ? "" : fd.Keywords.join(','));
    		}catch(ex){
    			console.warn("Keyword join", ex);
    		}
    		try{
    			clean.AttributeSet = {
    				AttributeSetId: fd.AttributeSet.AttributeSetId
    			};
    		}catch(ex){
    			console.warn("Error while mapping setId", ex);
    		}

    		try{

    			clean.MasterAttribute = [];
    			Object.keys(fd.MasterAttribute).forEach(function(key){
    				clean.MasterAttribute.push({
    					AttributeId: key,
    					ValueEn:  fd.MasterAttribute[key]
    				});
    			});
    		}catch(ex){
    			console.warn("Master Attributes", ex);
    		}

        try{
          clean.Remark = fd.Remark;
          clean.Width = fd.Width || 0;
          clean.Length = fd.Length || 0;
          clean.Height = fd.Height || 0;
          clean.WeightUnit = fd.WeightUnit;
          clean.Weight = fd.Weight || 0;
          clean.DimensionUnit = fd.DimensionUnit;
          //TODO: PrepareDay is not getting through
          clean.PrepareDay = fd.PrepareDay || 0;
          clean.StockType = fd.StockType;
          clean.SafetyStock = fd.SafetyStock;
    			clean.SEO = fd.SEO;
    			clean.ControlFlags = fd.ControlFlags;
    			clean.Brand = fd.Brand;
    			clean.ShippingMethod = fd.ShippingMethod;
    			clean.EffectiveDate = fd.EffectiveDate;
    			clean.EffectiveTime = fd.EffectiveTime;
    			clean.ExpireDate = fd.ExpireDate;
    			clean.ExpireTime = fd.ExpireTime;
        }catch(ex){
          console.warn("One-To-One Fields", ex);
        }

	try{
		//Move first entry of Categories out into Category
		clean.GlobalCategory = clean.GlobalCategories[0].CategoryId;
		clean.LocalCategory = clean.LocalCategories[0].CategoryId;
		clean.GlobalCategories.shift();
		clean.LocalCategories.shift();
	}catch(ex){
		console.warn("Shifting Categories", ex);
	}

	try{
		clean.RelatedProducts = [];
		Object.keys(fd.RelatedProducts).forEach(function(key){
			clean.RelatedProducts.push(
				fd.RelatedProducts[key]
			);
		});
	}catch(ex){
		console.warn("Organizing Related Products", ex);
	}

	try{
		if(hasVariants){
			//TODO: Pop DefaultVariant out of Variant
			clean.DefaultVariant = mapper.Variants(fd.DefaultVariant);
			clean.Variants = fd.Variants.map(mapper.Variants);
		}else{

			//Move these into Variant Level Property
			var masterProps = ['ProductNameEn', 'ProductNameTh', 'Sku', 'Upc',
			    'ValueEn', 'ValueTh', 'Display', 'OriginalPrice', 'SalePrice', 'DescriptionFullTh',
			    'DescriptionFullEn', 'DescriptionShortEn', 'DescriptionShortTh',
			    'Quantity', 'Length', 'Height', 'Sku',
			    'OriginalPrice', 'SalePrice',
			  'Width', 'Weight', 'WeightUnit', 'DimensionUnit'];

			//We have to copy because `Variant` in UI is in top level
			//DefaultVariant is master
			clean.DefaultVariant = {};
			masterProps.forEach(function(k){
				clean.DefaultVariant[k] = fd[k];
			});

			clean.DefaultVariant.VideoLinks = objectMapper.VideoLinks(fd.VideoLinks);
			clean.DefaultVariant.Images360 = fd.MasterImages360.map(mapper.Images);
			clean.DefaultVariant.Images = fd.MasterImages.map(mapper.Images);
		}
	}catch(ex){
		console.warn("Variant Distribute", ex);
	}


	clean.SellerId = 1;
	clean.ShopId = 1;

	return clean;
    };

    tra.inverseProductTransform = function(){

    };

    return tra;
}];
