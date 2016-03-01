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

        'error': {
            'messages': {
                'required': 'This is a required field',
                'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
            }
        }
    },
    MasterVariant_SalePrice: {
        'labelClass': 'required',
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
    },
    MasterVariant_DescriptionShortEn: {
        'inputSize': 'xxl',
        'formGroupClass': 'margin-top-30',
        'error': {
            'messages': {
                'pattern': 'Thai and Special characters are not allowed'
            }
        }
    },
    Keywords: {
        'inputSize': 'large',
        'tooltip': 'Search Tag will help your product easier to be discovered',
        'error': {
            'messages': {
                'maxtagcount': 'Cannot exceed 20 tags',
                'maxtaglength': 'Tag must contain 30 characters or less',
                'pattern': 'Only letters and numbers allowed'
            }
        }
    },
    MasterVariant_Quantity: {
        'hint': {
            'message': 'Example: 100',
            'show': true
        },
        'error': {
            'messages': {
                'pattern': 'Only numbers allowed'
            }
        }
    },
    MasterVariant_SafetyStock: {
        'hint': {
            'message': 'Example: 10',
            'show': true
        },
        'error': {
            'messages': {
                'pattern': 'Only numbers allowed'
            }
        },
        'tooltip': 'When your inventory gets lower than saftety stock, you will get a warning'
    },
    PrepareDay: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
                'pattern': 'Only numbers allowed'
            }
        },
        'unit': 'Day'
    },
    MasterVariant_Dimension: {
        'error': {
            'messages': {
                'required': 'This is a required field',
                'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
            }
        }
    },
    RelatedProducts: {
        'inputSize': 'xxl',
        'error': {
            'messages': {
                'maxtagcount': 'Cannot exceed 10 related products'
            }
        }
    },
    Nothing: {

    },
    SEO_BoostingWeight: {
        'error': {
            'messages': {
                'max': 'Only numbers from 1 to 10000 is allowed',
                'min': 'Only numbers from 1 to 10000 is allowed',
                'pattern': 'Only numbers from 1 to 10000 is allowed'
            }
        }
    },
    Remark: {
        'inputSize': 'normal',
        'formGroupClass': 'margin-top-30',
        'error': {
            'messages': {
                'pattern': 'Special characters are not allowed'
            }
        }
    }
}
