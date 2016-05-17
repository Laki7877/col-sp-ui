module.exports = {
  "title": "Nth Attribute Schema V9",
  "type": "object",
  "properties": {
    "ValueEn": {
      "type": "string"
    },
    "AttributeId": {
      "oneOf" : [
        {"type": "integer"},
        {"type": "null"}
      ]
    },
    "AttributeValues": {
      "type": "array",
      "items": require('./attributeValue')
    }
  },
  "required": ["ValueEn", "AttributeId", "AttributeValues"]
}
