module.exports = {
    MasterVariant_ProductNameEn: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
                'pattern': 'Special characters are not allowed'
            }
        }
    },
    MasterVariant_ProductNameTh: {
        'labelClass': 'required',
        'error': {
            'messages': {
                'required': 'This is a required field',
                'pattern': 'Only letters and numbers allowed'
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
                'pattern': 'Only english letters and numbers allowed'
            }
        }
    },
    MasterVariant_Pid: {
        'labelClass': 'required'
    }
}