module.exports = {
  ProductName: {},
  Pid: {},
  Sku: {},
  Brands: {},
  GlobalCategories: {},
  LocalCategories: {},
  Tags: {},
  Price: {
    'error': {
      'messages': {
        'maxnumber': 'Minimum price should not be greater maximum price'
      }
    }
  },
  CreatedDate: {
    'error': {
      'messages': {
        'datebefore': 'Before date should not be greater after date'
      }
    }
  },
  ModifiedDate: {
    'error': {
      'messages': {
        'datebefore': 'Before date should not be greater after date'
      }
    }
  }
}
