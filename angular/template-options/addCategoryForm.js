module.exports = {
    NameEn: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
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
                'pattern': 'Only 0-9 a-z - are allowed (no spaces or underscores)'
            }
        }
    },
    Commission: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
                'minnumber': 'Please enter between 0% and 100%',
                'maxnumber': 'Please enter between 0% and 100%'
            }
        }
    },
    SortBy: {
        'labelClass': 'required'
    }
}
