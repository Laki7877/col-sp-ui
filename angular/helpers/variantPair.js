module.exports = [function () {
	
	//Struct for Variant Pair
	var VariantPair = function(a,b){
		//Variant is a cross of First and Second Attribute
		this.FirstAttribute = a; 
		this.SecondAttribute = b;
		this.hash = (a.AttributeKey.AttributeId + "-" +
		 a.AttributeValue.trim() + "-" + b.AttributeKey.AttributeId +
		  "-" + b.AttributeValue.trim());
		this.text = (a.AttributeValue.trim() + ", " + b.AttributeValue.trim());
	};

	return VariantPair;
}];
