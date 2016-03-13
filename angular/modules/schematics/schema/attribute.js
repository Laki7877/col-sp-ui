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
  "required": []
};
