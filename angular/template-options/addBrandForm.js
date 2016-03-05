module.exports = {
    BrandImage: {
        labelClass: 'required',
        error: {
            messages: {
                required: 'This is a required field',
            }
        }
    },
    // Description
    DescriptionFull: {
        'divClass': 'col-sm-6',
        'formGroupClass': 'margin-top-40',
        'labelClass': 'required',
        'inputSize': 'xxl'
    },
    DescriptionShortTh: {
        'divClass': 'col-sm-6',
        'inputSize': 'xxl',
        'formGroupClass': 'margin-top-30',
        'error': {
            'messages': {
                'pattern': 'Special characters are not allowed'
            }
        }
    },
    DescriptionShortEn: {
        'divClass': 'col-sm-6',
        'inputSize': 'xxl',
        'formGroupClass': 'margin-top-30',
        'error': {
            'messages': {
                'pattern': 'Thai and Special characters are not allowed'
            }
        }
    },
    // Feature products
    FeatureProducts: {
    	inputClass: 'large',
    	error: {
    		messages: {
    			maxtagcount: 'Only maximum of 20 feature products are allowed'
    		}
    	}
    },
    FeatureTitle: {
    	inputClass: 'large'
    }
    
}
