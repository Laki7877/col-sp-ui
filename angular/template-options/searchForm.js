module.exports = {
  ProductName: {},
  Pid: {},
  Sku: {},
  Brands: {},
  GlobalCategories: {},
  LocalCategories: {},
  Shops: {},
  Tags: {
    error: {
      messages: {
        maxtagcount: 'Tag must contain 30 characters or less',
        maxtaglength: 'Cannot exceed 20 tags'
      }
    }
  },
  Price: {
    'error': {
      'messages': {
        'maxnumber': 'Please enter a valid price range'
      }
    }
  },
  CreatedDate: {
    'error': {
      'messages': {
        'datebefore': 'Please enter a valid date/time range'
      }
    }
  },
  ModifiedDate: {
    'error': {
      'messages': {
        'datebefore': 'Please enter a valid date/time range'
      }
    }
  }
}
