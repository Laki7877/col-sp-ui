module.exports = {
  "title": "Product Stage Schema V3 Rev B",
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
      "oneOf": [{
        "$ref": "#/defs/Category"
      }]
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
      "$ref": "#/defs/Attribute"
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
      "type": "string"
    },
    "ExpireDate": {
      "type": "string"
    },
    "Visibility": {
      "type": "boolean"
    }
  },
  "required": [],
  "defs": {
    "AttributeValueObject": {
        "type": "object",
        "properties": {
          "AttributeValueEn": {
            "type": "string"
          },
          "AttributeValueId": {
            "type": "integer"
          },
          "Status": {
            "type": "string"
          }
        },
        "required":  ["AttributeValueEn", "AttributeValueId", "Status"]
    },
    "Attribute": require('./attribute'),
    "ProductVariant": {
      "properties": {
        "Length": {
          "type": "number"
        },
        "Width": {
          "type": "number"
        },
        "Height": {
          "type": "number"
        },
        "Weight": {
          "type": "number"
        },
        "ProductNameEn": {
          "type": "string"
        },
        "ProductNameTh": {
          "type": "string"
        },
        "Pid": {
          "type": "string"
        },
        "Sku": {
          "type": "string"
        },
        "DescriptionShortTh": {
          "type": "string"
        },
        "DescriptionShortEn": {
          "type": "string"
        },
        "DescriptionFullTh": {
          "type": "string"
        },
        "DescriptionFullEn": {
          "type": "string"
        },
        "OriginalPrice": {
          "type": "number"
        },
        "SalePrice": {
          "type": "number"
        },
        "Quantity": {
          "type": "integer"
        },
        "PrepareDay": {
          "type": "integer"
        },
        "PrepareMon": {
          "type": "integer"
        },
        "PrepareTue": {
          "type": "integer"
        },
        "PrepareWed": {
          "type": "integer"
        },
        "PrepareThu": {
          "type": "integer"
        },
        "PrepareFri": {
          "type": "integer"
        },
        "PrepareSat": {
          "type": "integer"
        },
        "PrepareSun": {
          "type": "integer"
        },
        "KillerPoint1En": {
          "type": "string"
        },
        "KillerPoint2En": {
          "type": "string"
        },
        "KillerPoint3En": {
          "type": "string"
        },
        "KillerPoint1Th": {
          "type": "string"
        },
        "KillerPoint2Th": {
          "type": "string"
        },
        "KillerPoint3Th": {
          "type": "string"
        },
        "DimensionUnit": {
          "enum": ["MM", "CM", "M"]
        },
        "WeightUnit": {
          "enum": ["G", "KG"]
        },
        "StockType": {
          "enum": ["Stock", "Pre-Order", ""]
        },
        "SafetyStock": {
          "type": "number"
        },
        "Images": {
          "$ref": "#/defs/Image"
        },
        "Installment": {
          "enum": ["Y", "N"]
        },
        "ShippingMethod": {
          "type": "integer",
          "enum": [0, 1]
        },
        "VideoLinks": {},
        "SEO": {},
        "DefaultVariant": {},
        "LimitIndividualDay": {
          "type": "boolean"
        },
        "Upc": {
          "type": "string"
        },
        "FirstAttribute": {},
        "SecondAttribute": {},
        "Display": {},
        "Visibility": {},
        "DefaultVariant": {}
      },
      "required": ["ShippingMethod", "ProductNameEn", "ProductNameTh",
        "StockType", "DimensionUnit", "SEO", "VideoLinks", "DefaultVariant", "Images",
        "Installment", "PrepareDay", "LimitIndividualDay"
      ]
    },
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
