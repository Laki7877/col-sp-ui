module.exports =  {
  "title": "Variant Schema V4",
  "type": "object",
  "properties": {
    "IsHasExpiryDate":{
      "enum": ["Y", "N"]
    },
    "MinimumAllowedInCart":{
      "type": "number"
    },
    "MaximumAllowedInCart": {
      "type": "number"
    },
    "MaximumAllowedPreOrder": {
      "type": "number"
    },
    "Pid": {
      "type": "number"
    },
    "IsVat":{
       "enum": ["Y", "N"]
    },
    "Sku": {
      "type": "string"
    },
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
    "ProdTDNameEn":{
       "type": "string"
    },
    "ProdTDNameTh":{
       "type": "string"
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
    "PromotionPrice":{
      "type": "number"
    },
    "PromotionEffectiveDate":{
      "type": "string"
    },
    "PromotionExpireDate":{
      "type": "string"
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
    "PurchasePrice": {
      "type": "number"
    },
    "UnitPrice": {
      "type": "number"
    },
    "SaleUnitTh": {
      "type": "string"
    },
    "SaleUnitEn": {
      "type": "string"
    },
    "ExpressDelivery":{
      "enum": ["Y", "N"]
    },
    "DeliveryFee":{
      "type": "number"
    },
    "Installment": {
      "enum": ["Y", "N"]
    },
    "ShippingMethod": {
      "type": "integer",
      "enum": [1,2]
    },
    "VideoLinks": {
      "type" : "array",
      "items": {
        "required" : ["Url"]
      }
    },
    "SEO": require('./seo'),
    "LimitIndividualDay": {
      "type": "boolean"
    },
    "Upc": {
      "type": "string"
    },
    "FirstAttribute": require('./nthAttribute'),
    "SecondAttribute": require('./nthAttribute'),
    "Display": {
      "enum": ['GROUP', 'INDIVIDUAL']
    },
    "Visibility": {
      "type": "boolean"
    },
    "IsVariant": {
      "type": "boolean"
    },
    "DefaultVariant": {
      "type": "boolean"
    }
  },
  "required": ["ShippingMethod", "ProductNameEn", "ProductNameTh",
    "StockType", "DimensionUnit", "SEO", "VideoLinks", "Images", "GiftWrap",
    "FirstAttribute", "SecondAttribute", "DefaultVariant",
    "Installment", "PrepareDay", "LimitIndividualDay", "Display"]
};
