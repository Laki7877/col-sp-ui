module.exports = {
  	AttributeNameEn: {
        'labelClass': 'required',
        'inputSize': 'large',
        'error' : {
              'messages': {
                'required': 'This is a required field',
                'pattern': 'Only 0-9 a-z - _ are allowed (no spaces)'
              }
         }		
  	},
  	DisplayNameEn: {
      'labelClass': 'required',
      'inputSize': 'large',
      'error' : {
            'messages': {
              'required': 'This is a required field',
            }
       }
    },
    DisplayNameTh: {
      'labelClass': 'required',
      'inputSize': 'large',
      'error' : {
            'messages': {
              'required': 'This is a required field',
            }
       }
    },
    DefaultValue: {
      'error' : {
            'messages': {
              'pattern': 'Only letters and numbers allowed'
            }
       }
   	},
    DescriptionEn: {
      'inputSize': 'large'
    },
    Tags: {
      error: {
        messages: {
          maxtagcount: 'Cannot exceed 100 tags',
          maxtaglength: 'Tag must contain 30 characters or less'
        }
      }
    }
    
};