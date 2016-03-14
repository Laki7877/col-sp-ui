module.exports = {
  "title": "Nth Attribute Schema V3 Rev B",
  "type": "object",
  "properties": {
    "ValueEn": {
      "type": "string"
    },
    "AttributeId": {
      "type": "integer"
    },
    "AttributeValues": {
      "type": "array",
      "items": require('./attributeValue')
    }
  }
}
