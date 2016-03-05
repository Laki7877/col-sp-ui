module.exports = {
    BrandImage: {
        labelClass: 'required',
        error: {
            messages: {
                required: 'This is a required field',
            }
        }
    },
    BrandNameEn: {
      'labelClass': 'required',
      'error' : {
            'messages': {
              'required': 'This is a required field',
              'pattern': 'Only English allowed'
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
                'pattern': 'Only English letters, numbers,  &quot;- &quot;, and   &quot;_&quot;; allowed. Space is not allowed'
            },
        }
    }
};
