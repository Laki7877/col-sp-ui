module.exports = {
  "title": "Attribute Value Map Schema V3 Rev B",
  "type": "object",
  "properties": {
    "AttributeValueId": { "type": "integer" },
    "AttributeValue": require('./attributeValue'),
    "AttributeId": {"type": "integer"}
  }
};
