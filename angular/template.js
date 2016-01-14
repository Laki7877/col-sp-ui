/**
 * Generated by grunt-angular-templates 
 * Thu Jan 14 2016 22:19:23 GMT+0700 (Russia TZ 6 Standard Time)
 */
module.exports = ["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('attribute/action',
    "<div><a ng-click=\"actions.edit(row, true)\">View / Edit</a></div><div><a ng-click=\"actions.duplicate(row, true)\">Duplicate</a></div><div><a ng-click=\"actions.delete(row, true)\">Delete</a></div>"
  );


  $templateCache.put('attribute_set/action',
    "<div><a ng-click=\"actions.edit(row, true)\">View / Edit</a></div><div><a ng-click=\"actions.duplicate(row, true)\">Duplicate</a></div><div><a ng-click=\"actions.delete(row, true)\">Delete</a></div>"
  );


  $templateCache.put('common/alert',
    "<div class=alert ng-class=\"['alert-' + (type || 'warning')]\" role=alert><span class=\"close color opacity-1\" ng-class=\"'color-' + (type || 'warning')\" aria-hidden=true ng-show=closeable ng-click=\"close({$event: $event})\">&times;</span><ng-transclude><ng-transclude></ng-transclude></div>"
  );


  $templateCache.put('common/breadcrumb/normal',
    ""
  );


  $templateCache.put('common/input/dropdown',
    "<div class=form-group><div class=width-label><label class=control-label ng-class=options.labelClass ng-bind-html=options.label></label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\"><ng-transclude></ng-transclude></div><div ng-if=options.tooltip class=\"width-field-tooltip no-padding-left\"><i class=\"fa fa-2x fa-question-circle color-grey\" data-toggle=tooltip data-placement=right title={{options.tooltip}}></i></div></div>"
  );


  $templateCache.put('common/input/multiline-radio',
    "<div class=form-group class={{options.formGroupClass}}><div class=width-label><label class=control-label>{{ options.label }}</label></div><div class=width-field-normal><div class=\"radio multiple-radio multiline\" ng-transclude></div></div></div>"
  );


  $templateCache.put('common/input/text',
    "<div class=form-group><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\" ng-bind-html=options.label></label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\"><ng-transclude></ng-transclude><span class=input-unit ng-if=options.unit>{{ options.unit }}</span> <span class=help-block ng-if=options.hint ng-show=options.hint.show>{{options.hint.message}}</span> <span class=\"help-block color-red\" ng-if=options.error ng-show=options.error.show>{{options.error.message}}</span></div><div class=\"width-field-tooltip no-padding-left\"><i class=\"fa fa-2x fa-question-circle color-grey\" uib-tooltip-html=options.tooltip tooltip-trigger=mouseenter tooltip-placement=right ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div></div>"
  );


  $templateCache.put('common/input/textarea',
    "<div class=form-group><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\" ng-bind-html=options.label></label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" ng-transclude></div><div class=\"width-field-tooltip no-padding-left\"><i class=\"fa fa-2x fa-question-circle color-grey\" uib-tooltip-html=options.tooltip tooltip-trigger=mouseenter tooltip-placement=right ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div></div>"
  );


  $templateCache.put('common/input/tradable-select',
    "<div class=tradable-list><div class=left-column><div class=\"search-section section-search\"><div class=input-group><input ng-model=search[options.map.text] class=\"form-control input-search-icon search-box\" placeholder=\"Search Attribute Set\" aria-describedby=basic-addon2> <span class=input-group-btn><button class=\"btn btn-white\" type=button>Search</button></span></div></div><div class=clickable-list><ul class=content-column><li ng-repeat=\"item in selectable | filter:search:strict track by $index\" ng-class=\"{ 'active' : activeLeft == $index }\" ng-click=\"select($index, true)\" ng-if=!contain(item)>{{ options.map.text == null ? item : item[options.map.text] }}</li></ul></div></div><div class=center-column><div class=trade-button ng-class=\"{'active' : activeLeft >= 0}\" ng-click=transfer(true)><i class=\"fa fa-chevron-right\"></i></div><div class=trade-button ng-class=\"{'active' : activeRight >= 0}\" ng-click=transfer(false)><i class=\"fa fa-chevron-left\"></i></div></div><div class=right-column><div class=list-header><span class=column-1>Attribute Set in This Category</span></div><div class=clickable-list><ul class=content-column><li ng-repeat=\"item in model track by $index\" ng-class=\"{ 'active' : activeRight == $index }\" ng-click=\"select($index, false)\">{{ options.map.text == null ? item : item[options.map.text] }}</li></ul></div></div></div>"
  );


  $templateCache.put('common/input/tradable-select2',
    "<div class=tradable-list><div class=left-column><div class=\"search-section section-search\"><input ng-model=search[options.map.text] class=\"form-control input-search-icon search-box\" placeholder=\"Search Attribute Set\" aria-describedby=basic-addon2></div><div class=clickable-list><ul class=content-column><li ng-repeat=\"item in selectable | filter:search:strict track by $index\" ng-class=\"{ 'active' : activeLeft == $index }\" ng-click=\"select($index, true)\" ng-if=!contain(item)>{{ options.map.text == null ? item : item[options.map.text] }}</li></ul></div></div><div class=center-column><div class=trade-button ng-class=\"{'active' : activeLeft >= 0}\" ng-click=transfer(true)><i class=\"fa fa-chevron-right\"></i></div><div class=trade-button ng-class=\"{'active' : activeRight >= 0}\" ng-click=transfer(false)><i class=\"fa fa-chevron-left\"></i></div></div><div class=right-column><div class=list-header><span class=column-1>Attribute</span> <span class=column-2>Required?</span> <span class=column-3>Filterable?</span></div><div class=clickable-list><ul class=content-column><li ng-repeat=\"item in model track by $index\" ng-class=\"{ 'active' : activeRight == $index }\" ng-click=\"select($index, false)\"><div class=row><div class=column-1>{{ options.map.text == null ? item : item[options.map.text] }}</div><div class=column-2><input type=checkbox ng-model=item.Required aria-label=\"Checkbox for following text input\"></div><div class=column-3><input type=checkbox ng-model=item.Filterable aria-label=\"Checkbox for following text input\"></div></div></li></ul></div></div></div>"
  );


  $templateCache.put('global_category/nodes',
    "<div class=\"category-content row no-margin\"><div class=category-content-padding><span class=\"col-xs-7 column-lc-name\"><span class=lc-icon-name-warpper><i class=\"fa toggle-button\" ng-if=\"node.nodes && node.nodes.length > 0\" ng-class=\"{\t'fa-chevron-down' : !collapsed,\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t'fa-chevron-right' : collapsed }\" ng-click=toggle(this)></i> <i class=\"fa fa-level-up fa-rotate-90 caret-grey\" ng-if=\"(!node.nodes || node.nodes.length == 0) && $parentNodesScope.depth() != 0\"></i> <span class=no-children-row ng-if=\"$parentNodesScope.depth() == 0\"></span> <span class=inline-block>{{ node.NameEn }}</span></span></span> <span class=col-xs-1>{{ node.CategoryAbbreviation }}</span> <span class=col-xs-1>{{ node.ProductCount }}</span> <span class=\"col-xs-1 text-align-center\"><i ng-class=\"{\t'fa fa-eye color-dark-grey icon-size-20' : node.Status == 'AT',\r" +
    "\n" +
    "\t\t\t\t\t\t\t'fa fa-eye-slash color-grey icon-size-20' : node.Status != 'AT' }\"></i></span> <span class=\"col-xs-1 text-align-center\"><i class=\"fa fa-gear color-dark-grey icon-size-20\"></i> <i class=\"fa fa-caret-down color-dark-grey\" uib-popover-template=\"'global_category/nodes_action'\" popover-placement=bottom popover-append-to-body=true popover-any></i></span> <span class=\"col-xs-1 text-align-center\" ui-tree-handle><i class=\"fa fa-arrows color-dark-grey icon-size-20\"></i></span></div></div><ol ui-tree-nodes ng-model=node.nodes ng-slide-toggle=!collapsed><li ng-repeat=\"node in node.nodes\" ui-tree-node ng-include=\"'global_category/nodes'\"></li></ol>"
  );


  $templateCache.put('global_category/nodes_action',
    "<div><a href=# data-toggle=modal data-target=#modal-category-detail ng-click=\"$emit('openEditGlobalCategory', node)\">View / Edit</a></div><div><a href=# ng-click=\"$emit('viewGlobalCategory', node)\">View Products</a></div><div><a href=# ng-click=remove()>Delete</a></div>"
  );


  $templateCache.put('local_category/nodes',
    "<div class=\"category-content row no-margin\"><div class=category-content-padding><span class=\"col-xs-8 column-lc-name\"><span class=lc-icon-name-warpper><i class=\"fa toggle-button\" ng-if=\"node.nodes && node.nodes.length > 0\" ng-class=\"{\t'fa-chevron-down' : !collapsed,\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t'fa-chevron-right' : collapsed }\" ng-click=toggle(this)></i> <i class=\"fa fa-level-up fa-rotate-90 caret-grey\" ng-if=\"(!node.nodes || node.nodes.length == 0) && $parentNodesScope.depth() != 0\"></i> <span class=no-children-row ng-if=\"$parentNodesScope.depth() == 0\"></span> <span class=inline-block>{{ node.NameEn }}</span></span></span> <span class=col-xs-1>{{ node.ProductCount }}</span> <span class=\"col-xs-1 text-align-center\"><i ng-class=\"{\t'fa fa-eye color-dark-grey icon-size-20' : node.Status == 'AT',\r" +
    "\n" +
    "\t\t\t\t\t\t\t'fa fa-eye-slash color-grey icon-size-20' : node.Status != 'AT' }\"></i></span> <span class=\"col-xs-1 text-align-center\"><i class=\"fa fa-gear color-dark-grey icon-size-20\"></i> <i class=\"fa fa-caret-down color-dark-grey\" uib-popover-template=\"'local_category/nodes_action'\" popover-placement=bottom popover-append-to-body=true popover-any></i></span> <span class=\"col-xs-1 text-align-center\" ui-tree-handle><i class=\"fa fa-arrows color-dark-grey icon-size-20\"></i></span></div></div><ol ui-tree-nodes ng-model=node.nodes ng-slide-toggle=!collapsed><li ng-repeat=\"node in node.nodes\" ui-tree-node ng-include=\"'local_category/nodes'\"></li></ol>"
  );


  $templateCache.put('local_category/nodes_action',
    "<div><a href=# data-toggle=modal data-target=#local-category-detail ng-click=\"$emit('openEditLocalCategory', node)\">View / Edit</a></div><div><a href=# ng-click=\"$emit('viewLocalCategory', node)\">View Products</a></div><div><a href=# ng-click=remove()>Delete</a></div>"
  );
 }];