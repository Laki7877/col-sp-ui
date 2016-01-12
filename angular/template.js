/**
 * Generated by grunt-angular-templates 
 * Tue Jan 12 2016 17:30:19 GMT+0700 (Russia TZ 6 Standard Time)
 */
module.exports = ["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('common/alert',
    "<div class=alert ng-class=\"['alert-' + (type || 'warning')]\" role=alert><span class=\"close color opacity-1\" ng-class=\"'color-' + (type || 'warning')\" aria-hidden=true ng-show=closeable ng-click=\"close({$event: $event})\">&times;</span><ng-transclude><ng-transclude></ng-transclude></div>"
  );


  $templateCache.put('common/input/multiline-radio',
    "<div class=form-group class={{options.formGroupClass}}><div class=width-label><label class=control-label>{{ options.label }}</label></div><div class=width-field-normal><div class=\"radio multiple-radio multiline\"><ng-transclude></ng-transclude></div></div></div>"
  );


  $templateCache.put('common/input/text',
    "<div class=form-group><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\">{{options.label}}</label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\"><ng-transclude></ng-transclude><span class=input-unit ng-if=options.unit>{{ options.unit }}</span> <span class=help-block ng-if=options.hint ng-show=options.hint.show>{{options.hint.message}}</span> <span class=\"help-block color-red\" ng-if=options.error ng-show=options.error.show>{{options.error.message}}</span></div><div class=\"width-field-tooltip no-padding-left\"><i class=\"fa fa-2x fa-question-circle color-grey\" data-toggle=tooltip data-placement=right title=\"{{ options.tooltip }}\" ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div></div>"
  );


  $templateCache.put('common/input/tradable-select',
    "<div class=tradable-list><div class=left-column><div class=\"search-section section-search\"><div class=input-group><input class=\"form-control input-search-icon search-box\" placeholder=\"Search Attribute Set\" aria-describedby=basic-addon2> <span class=input-group-btn><button class=\"btn btn-white\" type=button>Search</button></span></div></div><div class=clickable-list><ul class=content-column><li>Attribute Set A</li><li class=active>Attribute Set B</li><li>Attribute Set C</li><li>Attribute Set D</li><li>Attribute Set E</li><li>Attribute Set F</li><li>Attribute Set G</li><li>Attribute Set H</li><li>Attribute Set J</li><li>Attribute Set K</li><li>Attribute Set G</li><li>Attribute Set H</li><li>Attribute Set J</li></ul></div></div><div class=center-column><div class=\"trade-button active\"><i class=\"fa fa-chevron-right\"></i></div><div class=trade-button><i class=\"fa fa-chevron-left\"></i></div></div><div class=right-column><div class=list-header><span class=column-1>Attribute Set in This Category</span></div><div class=clickable-list><ul class=content-column><li><span class=column-1>Attribute Set W</span></li><li class=active><span class=column-1>Attribute Set X</span></li><li><span class=column-1>Attribute Set Z</span></li></ul></div></div></div>"
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