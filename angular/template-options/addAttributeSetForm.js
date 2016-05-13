module.exports = {
	AttributeSetNameEn: {
	  'labelClass': 'required',
	  'inputSize': 'large',
	  'error' : {
	        'messages': {
	          'required': 'This is a required field',
	          'pattern': 'Only 0-9 a-z - _ are allowed (no spaces)'
	        }
	   }
	},
	LargeInput: {
		"inputSize": "large"
	},
	Tags: {
      'inputSize': 'large',
      'error' : {
        'messages': {
          'tagcount': 'Cannot exceed 100 tags',
          'taglength': 'Tag must contain 30 characters or less'        }
      }
    }
}