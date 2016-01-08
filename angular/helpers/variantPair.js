module.exports = [function () {
	
	//Struct for Variant Pair
	var VariantPair = function(a,b){
		//Variant is a cross of First and Second Attribute
		this.FirstAttribute = a; 
		this.SecondAttribute = b;
		this.hash = (a.AttributeId + "-" +
		 a.ValueEn.trim() + "-" + b.AttributeId +
		  "-" + b.ValueEn.trim());
		this.text = (a.ValueEn.trim() + ", " + b.ValueEn.trim());
	};

	return VariantPair;
}];
