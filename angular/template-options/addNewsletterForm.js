module.exports = {
    Image: {
        'error': {
            'messages': {
                'maxSize': ' Image file size must not exceed 5MB',
            }
        }

    },
    Subject: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
            }
        }
    },
    Description: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
            }
        }
    },
    PublishedDt: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
            }
        }
    },
    ExpiredDt: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
            }
        }
    },
    VisibleShopGroup: {

    },
    IncludeShop: {
        'error': {
            'messages': {
                'maxtagcount': 'Cannot exceed 100 shops',
            }
        }

    },
    ExcludeShop: {
        'error': {
            'messages': {
                'maxtagcount': 'Cannot exceed 100 shops',
            }
        }

    }
}