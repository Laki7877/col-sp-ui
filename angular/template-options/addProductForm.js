module.exports = {
    MasterVariant_ProductNameEn: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
                'pattern': 'Thai and Special characters are not allowed'
            }
        }
    },
    MasterVariant_ProductNameTh: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
                'pattern': 'Special characters are not allowed'
            }
        }
    },
    MasterVariant_Sku: {
        'error': {
            'messages': {
                'pattern': 'Special characters are not allowed'
            }
        }
    },
    MasterVariant_Upc: {
        'error': {
            'messages': {
                'pattern': 'Special characters are not allowed'
            }
        }
    },
    MasterVariant_Pid: {
        'labelClass': 'required'
    },
    MasterVariant_OriginalPrice: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
                'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
            }
        }
    },
    MasterVariant_SalePrice: {
        'error': {
            'messages': {
                'min': 'Sale price must be lower than the original price',
                'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
            }
        }
    },
    MasterVariant_DescriptionShortTh: {
        'inputSize': 'xxl',
        'formGroupClass': 'margin-top-30',
        'error': {
            'messages': {
                'pattern': 'Special characters are not allowed'
            }
        }
    }
}