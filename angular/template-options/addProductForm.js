module.exports = {
  KillerPointTh: {
    divClass: 'col-xs-6',
    error: {
      messages: {
        required: 'This is a required field',
        pattern: 'Special characters are not allowed'
      }
    }
  },
  KillerPointEn: {
    'divClass': 'col-xs-6',
    'error': {
      'messages': {
        'required': 'This is a required field',
        'pattern': 'Thai and Special characters are not allowed'
      }
    }
  },
  TheOneCardEarn: {

  },
  Installment: {

  },
  NonRequiredSystemField: {

  },
  VideoLink: {
    'hint': {
      'show': true,
      'message': 'Example: https://www.youtube.com/watch?v=f78M4nKW1Ms'
    },
    'error': {
      'messages': {
        'url': 'Please enter valid URL'
      }
    }
  },
  ProductNameEn: {
    'labelClass': 'required',
    'error': {
      'messages': {
        'required': 'This is a required field',
        'pattern': 'Thai and Special characters are not allowed'
      }
    }
  },
  StockType: {},
  DescriptionFull: {
    'divClass': 'col-xs-6',
    'formGroupClass': 'margin-top-40',
    'labelClass': 'required',
    'inputSize': 'xxl'
  },
  ProductNameTh: {
    'labelClass': 'required',
    'error': {
      'messages': {
        'required': 'This is a required field',
        'pattern': 'Special characters are not allowed'
      }
    }
  },
  Sku: {
    'labelClass': 'required',
    'error': {
      'messages': {
        'pattern': 'Special characters are not allowed'
      }
    }
  },
  Upc: {
    'error': {
      'messages': {
        'pattern': 'Special characters are not allowed'
      }
    }
  },
  Pid: {
    'labelClass': 'required'
  },
  OriginalPrice: {
    'error': {
      'messages': {
        'required': 'This is a required field',
        'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
      }
    }
  },
  SalePrice: {
    'labelClass': 'required',
    'error': {
      'messages': {
        'min': 'Sale price must be lower than the original price',
        'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
      }
    }
  },
  DescriptionShortTh: {
    'divClass': 'col-xs-6',
    'inputSize': 'xxl',
    'formGroupClass': 'margin-top-30',
    'error': {
      'messages': {
        'pattern': 'Special characters are not allowed'
      }
    }
  },
  DescriptionShortEn: {
    'divClass': 'col-xs-6',
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
        'maxTagCount': 'Cannot exceed 20 tags',
        'maxtaglength': 'Tag must contain 30 characters or less',
        'pattern': 'Only letters and numbers allowed'
      }
    }
  },
  Quantity: {
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
  SafetyStock: {
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
  Dimension: {
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
