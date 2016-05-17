module.exports = {
  "title": "Attribute Value Map Schema V4",
  "type": "object",
  "properties": {
    "AttributeValueId": { "type": "integer" },
    "AttributeValue": require('./attributeValue'),
    "AttributeId": {"type": "integer"}
  }
};
