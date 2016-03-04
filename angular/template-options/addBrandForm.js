module.exports = {
    BrandImage: {
        labelClass: 'required',
        error: {
            messages: {
                required: 'This is a required field',
            }
        }
    },
    FeaturedProducts: {
    	inputClass: 'large',
    	error: {
    		messages: {
    			maxtagcount: 'Only maximum of 20 feature products are allowed'
    		}
    	}
    },
    FeaturedProductSearch: {
    	inputClass: 'large'
    }
}
