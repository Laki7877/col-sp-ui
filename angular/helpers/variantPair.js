//DEPRECATED
module.exports = ['util', function (util) {
	
	//Struct for Variant Pair
	var VariantPair = function(a,b){
		//Variant is a cross of First and Second Attribute
		this.FirstAttribute = a; 
		this.SecondAttribute = b;
		this.text = util.variant.asString(a,b);
	};

	return VariantPair;
}];