module.exports = {
    BrandImage: {
    },
    BrandNameEn: {
      'labelClass': 'required',
      'error' : {
            'messages': {
              'required': 'This is a required field',
              'pattern': 'Only 0-9 a-z _ are allowed (no spaces)'
              }
       }
    },
    DisplayNameEn: {
        'labelClass': 'required',
        'error' : {
              'messages': {
                'required': 'This is a required field',
                }
        }
    },
    UrlKeyEn: {
        'error': {
            'messages': {
                'pattern': 'Only 0-9 a-z - are allowed (no spaces or underscores)'
            }
        }
    },
    SortBy: {
      'labelClass': 'required'
    },
    Status: {
      
    },
    BrandImage: {
      error: {
        messages: {
          dimensions: 'Image must be between 500x500 to 1000x1000 pixels',
          ratio: 'Image must be a square (1:1 ratio)'
        }
      }
    }
};
