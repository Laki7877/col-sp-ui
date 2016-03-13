module.exports = {
  "title": "Attribute Schema V3 Rev B",
  "type": "object",
  "properties": {
    "AttributeValues": {
      "type": "array",
      "items": {"$ref": "#/defs/AttributeValueObject"}
    },
    "ValueEn": {
      "type": "string"
    },
    "AttributeId": {
      "type": "integer"
    }
  },
  "required": ["AttributeValues", "ValueEn", "AttributeId"],
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
    }
  }
};
