var angular = require('angular');

module.exports = ['util', 'LocalCategory', function (util, LocalCategory) {
    'use strict';
    var tra = {};


	/*
    * - Convert all category into single { CategoryId } Structure
    * - Add position to image {} request
    * - Multiply base attributes into each variants
    */
    tra.transform = function(fd){
    		var hasVariants = (("Variants" in fd) && fd.Variants.length > 0);

    		//Cleaned data
    		var clean = {};
    		clean.Variants = [];

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
					if(image.$id) delete image.$id;
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
	clean.MasterVariant.VideoLinks = [];
	if(fd.ProductId) clean.ProductId = fd.ProductId;

	try{
		 clean.MasterVariant.VideoLinks = objectMapper.VideoLinks(fd.VideoLinks);
	}catch(ex){
		console.warn("Video Link map error", ex);
	}

	clean.MasterVariant.Images360 = fd.MasterImages360.map(mapper.Images);
	clean.MasterVariant.Images = fd.MasterImages.map(mapper.Images);

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

    /* 
    *  Reverse serialization
    */
    tra.inverseTransform = function(invFd, FullAttributeSet){

    	console.log('FullAttributeSet', FullAttributeSet);

    	invFd.AttributeSet = FullAttributeSet;
    	invFd.PrepareDay = invFd.PrepareDay;

		var invMapper ={
			VideoLinks: function(m){
				return m.Url;
			},
			Variants: function(m){
				console.log(m);
				m.hash = util.variant.hash(m.FirstAttribute, m.SecondAttribute);
				m.text = util.variant.toString(m.FirstAttribute, m.SecondAttribute);
				return m;
			}
		};

		try{
			var DefaultVariantIndex = invFd.Variants.map(function(o){
				return o.DefaultVariant || false;
			}).indexOf(true);

			invFd.DefaultVariant = invFd.Variants[DefaultVariantIndex];
		}catch(er){
			console.warn("Unable to find DefaultVariant", er);
		}

		try{
			invFd.Variants = invFd.Variants.map(invMapper.Variants);
		}catch(er){
			console.warn("Variants Map Error", er);
		}

		var MasterAttribute = {};
		invFd.MasterAttribute.forEach(function(ma){
			MasterAttribute[ma.AttributeId]  = ma.ValueEn;
		});
		invFd.MasterAttribute = MasterAttribute;


		invFd.LocalCategories = invFd.LocalCategories || [null, null];

		if(invFd.LocalCategories[0] == null){
			invFd.LocalCategories.unshift(null);
		}else{
			LocalCategory.getOne(invFd.LocalCategory).then(function(locat){
				invFd.LocalCategories.unshift(locat);
			})
		}

		
		

		if(invFd.MasterVariant.VideoLinks){
			invFd.MasterVariant.VideoLinks = invFd.MasterVariant.VideoLinks.map(invMapper.VideoLinks);
		}else{
			invFd.MasterVariant.VideoLinks = [];
		}

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

		invFd.MasterVariant.WeightUnit = invFd.MasterVariant.WeightUnit.trim();
		invFd.MasterVariant.DimensionUnit = invFd.MasterVariant.DimensionUnit.trim();


		invFd.Keywords = invFd.Keywords.split(",");
		if(invFd.Variants.Length > 0) invFd.DefaultVariant = invFd.Variants[0]; //TODO: Hardcode

		var transformed = {
    		formData: invFd
    	};

    	if(invFd.Variants.length > 0){

 
    		//Generate attributeOptions
    		var map0_index = FullAttributeSet.AttributeSetMaps.map(function(a){
					return a.Attribute.AttributeId;
			}).indexOf(invFd.Variants[0].FirstAttribute.AttributeId);
    		
    		var map1_index = FullAttributeSet.AttributeSetMaps.map(function(a){
					return a.Attribute.AttributeId;
			}).indexOf(invFd.Variants[0].SecondAttribute.AttributeId);

    		var FirstArray = invFd.Variants.map(function(variant){
	   			return variant.FirstAttribute.ValueEn.trim();
			});

			var SecondArray = invFd.Variants.map(function(variant){
	   			return variant.SecondAttribute.ValueEn.trim();
			});


			console.log(FirstArray, SecondArray, "FSS");
			//Get updated map from invFd.AttributeSet
			//and load factorization array
			transformed.attributeOptions = [
				{
					Attribute: FullAttributeSet.AttributeSetMaps[map0_index].Attribute,
					options: FirstArray
				}, 
				{
					Attribute: FullAttributeSet.AttributeSetMaps[map1_index].Attribute,
					options: SecondArray
				}
			];


    	}

    	console.log('transformation array', transformed);

    	return transformed;	    
    };

    return tra;
}];
