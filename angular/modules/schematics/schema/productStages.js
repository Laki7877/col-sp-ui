module.exports = {
  "title": "Product Stage Schema V9",
  "type": "object",
  "properties": {
    "ProductId": {
      "type": "integer"
    },
    "Revisions": {
      "type": "array",
      "item": require("./revisionObject") 
    },
    "MasterVariant": require('./variant'),
    "Variants": {
      "type": "array",
      "items": require('./variant')
    },
    "Status": {
      "enum": ["DF", "WA", "RJ", "AP"]
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
      "items": require('./attribute')
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
        "required": ["IsNew", "IsClearance", "IsBestSeller", "IsOnlineExclusive", "IsOnlyAt"],
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
