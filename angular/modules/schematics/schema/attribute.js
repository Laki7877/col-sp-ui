module.exports = {
  "title": "Attribute Schema V3 Rev B",
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
    }
  },
  "required": ["AttributeValueMaps", "AttributeId", "DataType", "Required", "AttributeNameEn"]
};
