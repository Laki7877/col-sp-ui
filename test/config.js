function page(label, page) {
  return {
    "label": label,
    "url": "http://localhost:5000/?p=" + page,
    "hideSelectors": [],
    "removeSelectors": [],
    "selectors": [ "body" ],
    "readyEvent": null,
    "delay": 100,
    "misMatchThreshold" : 0.1,
    "onReadyScript": "onReady.js"
  };
}

function singlePage(pageName) {
  return page(pageName, pageName);
}

function pageWithModal(pageName, modalSelector) {
  var obj = page(pageName + " with modal " + modalSelector, pageName);
  obj.modalSelector = modalSelector;
  obj.onReadyScript = "openModal.js";
  return obj;
}


module.exports = {
  "viewports": [
    {
      "name": "desktop_1024",
      "width": 1024,
      "height": 768
    },
    {
      "name": "desktop_1200",
      "width": 1200,
      "height": 974
    },
    {
      "name": "desktop_1600",
      "width": 1600,
      "height": 1200
    }
  ],
  "scenarios": [
    pageWithModal("local_category", "#local-category-detail"),
    singlePage("index"),
    singlePage("local_category"),
    singlePage("local_category_empty"),
    singlePage("add_product"),
    singlePage("admin_add_attribute"),
    singlePage("admin_add_attribute_set"),
    singlePage("admin_add_brand"),
    singlePage("admin_attribute"),
    singlePage("admin_attribute_set"),
    singlePage("admin_brand"),
    singlePage("admin_category"),
    singlePage("global_category"),
    singlePage("view_product"),
    singlePage("admin_account"),
    singlePage("admin_add_account"),
    singlePage("admin_add_role"),
    singlePage("admin_add_shop_account"),
    singlePage("admin_add_shop_type"),
    singlePage("admin_role"),
    singlePage("admin_shop_account"),
    singlePage("admin_shop_type"),
    singlePage("import_product"),
    pageWithModal("import_product", '#local-category-detail'),
    singlePage("local_category_product"),
  ],
  "paths": {
    "bitmaps_reference": "../../backstop_data/bitmaps_reference",
    "bitmaps_test": "../../backstop_data/bitmaps_test",
    "compare_data": "../../backstop_data/bitmaps_test/compare.json",
    "casper_scripts": "../../backstop_data/casper_scripts"
  },
  "engine": "phantomjs",
  "report": ["CLI", "browser"],
  "cliExitOnFail": false,
  "casperFlags": [],
  "debug": false,
  "port": 3001
};