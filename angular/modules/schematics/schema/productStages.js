module.exports = {
  "title": "Product Stage Schema V3 Rev C",
  "type": "object",
  "properties": {
    "ProductId": {
      "type": "integer"
    },
    "MasterVariant": {
      "$ref": "#/defs/ProductVariant"
    },
    "Variants": {
      "type": "array",
      "items": {
        "$ref": "#/defs/ProductVariant"
      }
    },
    "Status": {
      "enum": ["DF", "WA"]
    },
    "ShopId": {
      "type": "integer"
    },
    "Visibility": {
      "type": "boolean"
    },
    "GlobalCategories": {
      "type": "array",
      "items": {
        "$ref": "#/defs/Category"
      }
    },
    "LocalCategories": {
      "$ref": "#/defs/Category"
    },
    "MainGlobalCategory": {
      "$ref": "#/defs/Category"
    },
    "MainLocalCategory": {
      "$ref": "#/defs/Category"
    },
    "Tags": {
      "type": "array"
    },
    "ControlFlags": {
      "$ref": "#/defs/ControlFlags"
    },
    "Brands": {
      "type": "object",
      "properties": {
        "BrandId": {
          "type": "integer"
        }
      }
    },
    "TheOneCardEarn": {
      "type": "integer"
    },
    "Remark": {
      "type": "string"
    },
    "MasterAttribute": {
      "type": "array",
      "items": {
        "$ref": "#/defs/Attribute"
      }
    },
    "RelatedProducts": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "ProductId": {
            "type": "integer"
          }
        },
        "required": ["ProductId"]
      }
    },
    "EffectiveDate": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ]
    },
    "ExpireDate": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "null"
        }
      ]
    },
    "GiftWrap": {
      "type": "string",
      "enum": ["Y", "N"]
    },
    "Visibility": {
      "type": "boolean"
    }
  },
  "required": ["GiftWrap"],
  "defs": {
    "Attribute": require('./attribute'),
    "ProductVariant": require('./variant'),
    "Image": {
      "properties": {
        "position": {
          "type": "integer"
        }
      }
    },
    "Category": {
      "properties": {
        "CategoryId": {
          "type": "integer"
        },
        "required": ["CategoryId"]
      }
    },
    "ControlFlags": {
      "properties": {
        "required": ["Flag1", "Flag2", "Flag3"],
        "Flag1": {
          "type": "boolean"
        },
        "Flag2": {
          "type": "boolean"
        },
        "Flag3": {
          "type": "boolean"
        }
      }
    }
  }
};
