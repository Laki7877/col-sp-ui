module.exports = {
    NameEn: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
                'pattern': 'Only English allowed'
            }
        }
    },
    NameTh: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field'
            }
        }
    },
    UrlKeyEn: {
        'error': {
            'messages': {
                'pattern': 'Only English letters, numbers,  &quot;- &quot;, and   &quot;_&quot;; allowed. Space is not allowed'
            },
        }
    },
    Commission: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
                'pattern': 'Only numbers and decimals (up to 2 digits) allowed',
                'minnumber': 'Please enter between 0% and 100%',
                'maxnumber': 'Please enter between 0% and 100%'
            }
        }
    },

}
