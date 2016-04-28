module.exports = {
  "title": "SEO Schema V4",
  "type": "object",
  "properties": {
    "MetaTitleEn": {"type": "string"},
    "MetaTitleTh": {"type": "string"},
    "MetaDescriptionEn": {"type": "string"},
    "MetaDescriptionTh": {"type": "string"},
    "MetaKeywordEn": {"type": "string"},
    "MetaKeywordTh": {"type": "string"},
    "ProductUrlKeyEn": {
      "type": "string"
    },
    "ProductBoostingWeight": {
      "type": "integer"
    },
    "GlobalProductBoostingWeight": {
      "type": "integer"
    }
  },
  "required": ["MetaTitleTh", "MetaTitleEn",
  "MetaDescriptionTh", "MetaDescriptionEn",
   "MetaKeywordEn", "MetaKeywordTh", "ProductUrlKeyEn", "ProductBoostingWeight", "GlobalProductBoostingWeight"]
}
