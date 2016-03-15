module.exports = {
  "title": "Attribute Value Map Schema V3 Rev C",
  "type": "object",
  "properties": {
    "AttributeValueId": { "type": "integer" },
    "AttributeValue": require('./attributeValue'),
    "AttributeId": {"type": "integer"}
  }
};
