module.exports = ['util', function (util) {
	
	//Struct for Variant Pair
	var VariantPair = function(a,b){
		//Variant is a cross of First and Second Attribute
		this.FirstAttribute = a; 
		this.SecondAttribute = b;
		this.hash = util.variant.hash(a,b); 
		this.text = util.variant.toString(a,b);
	};

	return VariantPair;
}];
