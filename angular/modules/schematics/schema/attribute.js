module.exports = {
  "title": "Attribute Schema V9",
  "type": "object",
  "properties": {
    "AttributeValueMaps": {
      "type": "array",
      "items": require('./attributeValueMap')
    },
    "AttributeId": {
      "type": "integer"
    },
    "AttributeNameEn": {
      "type": "string"
    },
    "DataType": {
      "type": "string"
    },
    "Required": {
      "type": "boolean"
    },
    "AttributeValues": {
      "type": "array",
      "items": require('./attributeValue')
    }
  },
  "anyOf": [
    {"required": ["AttributeValues", "AttributeId", "DataType", "Required", "AttributeNameEn"]},
    {"required": ["AttributeValueMaps", "AttributeId", "DataType", "Required", "AttributeNameEn"]},
    {"required": ["AttributeValues", "AttributeId", "ValueEn"]}
  ]
};
