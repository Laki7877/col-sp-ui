module.exports = {
  "title": "Attribute Set Schema V3 Rev B",
  "type": "object",
  "properties": {
    "AttributeSetId": { "type": "integer" },
    "AttributeSetNameEn": { "type": "string" },
    "AttributeSetTagMaps": {
      "type": "array",
      "items": {
        "$ref" : "#/defs/TagMap"
      }
    },
    "AttributeSetMaps": {
      "type": "array",
      "items": {
        "$ref" : "#/defs/AttributeMap"
      }
     }
  },
  "required": ["AttributeSetId", "AttributeSetNameEn", "AttributeSetTagMaps", "AttributeSetMaps"],
  "defs": {
    "Attribute": require('./attribute'),
    "AttributeMap": {
      "type": "object",
      "properties": {
        "Attribute": { "$ref": "#/defs/Attribute" },
        "AttributeId": { "type": "integer" },
        "AttributeSetId": { "type": "integer" }
      }
    },
    "TagMap" : {
      "type": "object",
      "properties": {
        "AttributeSetId": {"type": "integer"},
        "TagId": {"type":"integer"},
        "Tag": {
          "type": "object",
          "properties": {
            "TagId": { "type": "integer" },
            "TagName": { "type" : "string" }
          }
        }
      }
    }
  }
};
