var angular = require('angular');

module.exports = ['util', function (util) {
    'use strict';
    var tra = {};

    tra.productTransform = function(fd){
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
		  //TODO: PrepareDay is not getting through
		  clean.PrepareDay = fd.PrepareDay || 0;
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

	//MasterVariant
	clean.MasterVariant = fd.MasterVariant;
	clean.MasterVariant.VideoLinks = objectMapper.VideoLinks(fd.VideoLinks);
	clean.MasterVariant.Images360 = fd.MasterImages360.map(mapper.Images);
	clean.MasterVariant.Images = fd.MasterImages.map(mapper.Images);

	//clean.MasterVariant.StockType = fd.StockType;
	//clean.MasterVariant.Quantity = fd.Quantity || 0;
 	//clean.MasterVariant.SafetyStock = fd.SafetyStock || 0;

	try{
		if(hasVariants){
			var masterProps = [];
			clean.Variants = fd.Variants.map(mapper.Variants);
			//Find DefaultVariant
			var targetHash = fd.DefaultVariant.hash;
			clean.Variants.forEach(function(vari, index){
				vari.SafetyStock = 0; //Placeholder, no UI yet
				vari.StockType = 0;  //Placeholder
				vari.DefaultVariant = false;
				if(vari.hash == targetHash){
					clean.Variants[index].DefaultVariant = true;
				}
			});

		}
	}catch(ex){
		console.warn("Variant Distribute", ex);
	}

	//HardCoD
	clean.SellerId = 1;
	clean.ShopId = 1;

	return clean;
    };

    tra.inverseProductTransform = function(invFd){

	var invMapper ={
		VideoLinks: function(m){
			return m.Url;
		},
		Variants: function(m){
			m.hash = util.variant.hash(m.FirstAttribute, m.SecondAttribute);
			m.text = util.variant.toString(m.FirstAttribute, m.SecondAttribute);
			return m;
		}
	};

	//invFd.Variants = invFd.Variants.map(invMapper.Variants);

	var MasterAttribute = {};
	invFd.MasterAttribute.forEach(function(ma){
		MasterAttribute[ma.AttributeId]  = ma.ValueEn;
	});
	invFd.MasterAttribute = MasterAttribute;
	invFd.LocalCategories.unshift({
		CategoryId: invFd.LocalCategory
	});
	if(invFd.MasterVariant.VideoLinks) invFd.MasterVariant.VideoLinks = invFd.MasterVariant.VideoLinks.map(invMapper.VideoLinks);
	invFd.Variants.forEach(function(variant, index){
		variant.VideoLinks = variant.VideoLinks.map(invMapper.VideoLinks);
	});

	//TODO: This should fetch entire Object
	invFd.GlobalCategories.unshift({
		CategoryId: invFd.GlobalCategory
	});
	delete invFd.GlobalCategory;
	delete invFd.LocalCategory;

	//TODO: Just change ngmodel to bind to MasterVariant.MasterImages Directly
	invFd.MasterImages = invFd.MasterVariant.Images;
	delete invFd.MasterVariant.Images;
	invFd.MasterImages360 = invFd.MasterVariant.Images360;
	delete invFd.MasterVariant.Images360;

	invFd.Keywords = invFd.Keywords.split(",");
	if(invFd.Variants.Length > 0) invFd.DefaultVariant = invFd.Variants[0]; //TODO: Hardcode

    	return invFd;	    
    };

    return tra;
}];
