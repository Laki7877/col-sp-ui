/**
 * Generated by grunt-angular-templates 
 * Fri Feb 26 2016 19:25:00 GMT+0700 (Russia TZ 6 Standard Time)
 */
module.exports = ["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('attribute/action',
    "<div><a ng-click=\"actions.edit(row, true)\">View / Edit</a></div><div><a ng-click=\"actions.duplicate(row, true)\">Duplicate</a></div><div><a ng-click=\"actions.delete(row, true)\">Delete</a></div>"
  );


  $templateCache.put('attribute_set/action',
    "<div><a ng-click=\"actions.edit(row, true)\">View / Edit</a></div><div><a ng-click=\"actions.duplicate(row, true)\">Duplicate</a></div><div><a ng-click=\"actions.delete(row, true)\">Delete</a></div>"
  );


  $templateCache.put('brand/action',
    "<div><a ng-click=\"actions.edit(row, true)\">View / Edit</a></div><div><a ng-click=\"actions.delete(row, true)\">Delete</a></div>"
  );


  $templateCache.put('common/alert',
    "<div id=alert class=alert ng-class=\"['alert-' + (type || 'warning')]\" role=alert><span class=\"close color opacity-1\" ng-class=\"'color-' + (type || 'warning')\" aria-hidden=true ng-show=closeable ng-click=\"close({$event: $event})\">&times;</span><ng-transclude><ng-transclude></ng-transclude></div>"
  );


  $templateCache.put('common/breadcrumb/normal',
    ""
  );


  $templateCache.put('common/input/dropdown',
    "<div class=form-group><div class=width-label><label class=control-label ng-class=options.labelClass ng-bind-html=options.label></label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\"><ng-transclude ng-class=\"{ 'has-error-parent' : options.error.show }\"></ng-transclude><span class=\"help-block color-red\" ng-if=options.error ng-show=options.error.show ng-repeat=\"(key, prop) in options.error.conditions\"><span ng-bind-html=options.error.messages[key]></span></span></div><div ng-if=options.tooltip class=\"width-field-tooltip no-padding-left\"><i class=\"fa fa-2x fa-question-circle color-grey\" data-toggle=tooltip data-placement=right title={{options.tooltip}}></i></div></div>"
  );


  $templateCache.put('common/input/fg-ml-checkbox',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\"><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\">{{ label }}</label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=input-with-unit><ng-transclude class=\"checkbox multiple-checkbox multiline\" ng-class=\"{ 'has-error' : isInvalid(templateField()) }\"></ng-transclude></div></div>"
  );


  $templateCache.put('common/input/form-group-with-label-multiple',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\"><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\">{{ label }}</label></div><ng-transclude></ng-transclude><div class=\"help-block color-red\" ng-show=root.isInvalid(templateField()) ng-repeat=\"(key, prop) in (templateField().$error) track by key\"><span ng-bind-html=options.error.messages[key]></span></div></div>"
  );


  $templateCache.put('common/input/form-group-with-label',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\"><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\">{{ label }}</label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class={{options.inputClass}}><ng-transclude class=\"{{ options.transcludeClasses }}\" ng-class=\"{ 'has-error' : isInvalid(templateField()) }\"></ng-transclude><span class=input-unit ng-if=options.unit>{{ options.unit }}</span> <span class=help-block ng-if=options.hint ng-show=options.hint.show>{{options.hint.message}}</span> <span class=\"help-block color-red\" ng-if=isInvalid(templateField()) ng-repeat=\"(key, prop) in (templateField().$error) track by key\"><span ng-bind-html=options.error.messages[key]></span></span></div><div class=\"width-field-tooltip padding-left-30\"><i class=\"fa fa-2x fa-question-circle color-grey\" uib-tooltip-html=options.tooltip tooltip-trigger=mouseenter tooltip-placement=right ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div></div>"
  );


  $templateCache.put('common/input/label',
    "<div class=form-group ng-class=\"options.formGroupClass || {}\"><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\">{{options.label}}</label></div><div ng-class=\"{ 'width-field-normal' : options.fieldSize == 'normal',\r" +
    "\n" +
    "    \t\t\t\t 'width-field-xxl' : options.fieldSize != 'normal' }\"><p class=form-control-static><ng-transclude></ng-transclude></p></div></div>"
  );


  $templateCache.put('common/input/multiline-checkbox',
    "<div class=form-group ng-class=\"options.formGroupClass || {}\"><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\">{{options.label}}</label></div><div class=width-field-normal><div class=\"checkbox multiple-checkbox multiline\" ng-transclude></div></div></div>"
  );


  $templateCache.put('common/input/multiline-radio',
    "<div class=form-group class={{options.formGroupClass}}><div class=width-label><label class=control-label>{{ options.label }}</label></div><div class=width-field-normal><div class=\"radio multiple-radio multiline\" ng-transclude></div></div></div>"
  );


  $templateCache.put('common/input/password',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\" ng-init=\"inputType='password'\"><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\" ng-bind-html=options.label></label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\"><div class=input-password><ng-transclude></ng-transclude><a ng-click=\"inputType = (inputType == 'password' ? 'text' : 'password')\"><i class=\"fa fa-eye fa-lg input-password-eye pointer\" ng-class=\"{'active' : inputType == 'text' }\"></i></a></div><span class=help-block ng-if=options.hint ng-show=options.hint.show>{{options.hint.message}}</span> <span class=\"help-block color-red\" ng-if=options.error ng-show=options.error.show ng-repeat=\"(key, prop) in options.error.conditions\"><span ng-bind-html=options.error.messages[key]></span></span></div><div class=\"width-field-tooltip padding-left-30\"><i class=\"fa fa-2x fa-question-circle color-grey\" uib-tooltip-html=options.tooltip tooltip-trigger=mouseenter tooltip-placement=right ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div></div>"
  );


  $templateCache.put('common/input/text-column',
    "<div class=input-column><ng-transclude></ng-transclude><span class=\"help-block color-red\" ng-if=options.error ng-show=options.error.show ng-repeat=\"(key, prop) in options.error.conditions\">{{ options.error.messages[key] }}</span></div>"
  );


  $templateCache.put('common/input/text-td',
    "<td><ng-transclude></ng-transclude><span class=\"help-block color-red\" ng-if=options.error ng-show=options.error.show ng-repeat=\"(key, prop) in options.error.conditions\">{{ options.error.messages[key] }}</span></td>"
  );


  $templateCache.put('common/input/text',
    "<div class=form-group><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\" ng-bind-html=options.label></label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\"><ng-transclude></ng-transclude><span class=input-unit ng-if=options.unit>{{ options.unit }}</span> <span class=help-block ng-if=options.hint ng-show=options.hint.show>{{options.hint.message}}</span> <span class=\"help-block color-red\" ng-if=options.error ng-show=options.error.show>{{options.error.message}}</span></div><div class=\"width-field-tooltip no-padding-left\"><i class=\"fa fa-2x fa-question-circle color-grey\" uib-tooltip-html=options.tooltip tooltip-trigger=mouseenter tooltip-placement=right ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div></div>"
  );


  $templateCache.put('common/input/text2',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\"><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\" ng-bind-html=options.label></label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=input-with-unit><ng-transclude></ng-transclude><span class=input-unit ng-if=options.unit>{{ options.unit }}</span> <span class=help-block ng-if=options.hint ng-show=options.hint.show>{{options.hint.message}}</span> <span class=\"help-block color-red\" ng-if=options.error ng-show=options.error.show ng-repeat=\"(key, prop) in (options.error.conditions) track by key\"><span ng-bind-html=options.error.messages[key]></span></span></div><div class=\"width-field-tooltip padding-left-30\"><i class=\"fa fa-2x fa-question-circle color-grey\" uib-tooltip-html=options.tooltip tooltip-trigger=mouseenter tooltip-placement=right ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div></div>"
  );


  $templateCache.put('common/input/text2b',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\"><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\" ng-bind-html=options.label></label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=input-with-unit><ng-transclude></ng-transclude><span class=input-unit ng-if=options.unit>{{ options.unit }}</span> <span class=help-block ng-if=options.hint ng-show=options.hint.show>{{options.hint.message}}</span> {{form}} <span class=\"help-block color-red\" ng-if=options.error ng-show=$root.isInvalid(form) ng-repeat=\"(key, prop) in (form.$error) track by key\"><span ng-bind-html=options.error.messages[key]></span></span></div><div class=\"width-field-tooltip padding-left-30\"><i class=\"fa fa-2x fa-question-circle color-grey\" uib-tooltip-html=options.tooltip tooltip-trigger=mouseenter tooltip-placement=right ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div></div>"
  );


  $templateCache.put('common/input/text3',
    "<div><label ng-class=\"options.labelClass || {}\" ng-bind-html=options.label></label><ng-transclude></ng-transclude><span class=\"help-block color-red\" ng-if=options.error ng-show=options.error.show ng-repeat=\"(key, prop) in (options.error.conditions) track by key\">{{ options.error.messages[key] }}</span></div>"
  );


  $templateCache.put('common/input/textarea',
    "<div class=form-group><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\" ng-bind-html=options.label></label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" ng-transclude></div><div class=\"width-field-tooltip no-padding-left\"><i class=\"fa fa-2x fa-question-circle color-grey\" uib-tooltip-html=options.tooltip tooltip-trigger=mouseenter tooltip-placement=right ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div></div>"
  );


  $templateCache.put('common/input/textarea2',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\"><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\" ng-bind-html=options.label></label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\"><ng-transclude></ng-transclude><span class=\"help-block color-red\" ng-if=options.error ng-show=options.error.show ng-repeat=\"(key, prop) in options.error.conditions\"><span ng-bind-html=options.error.messages[key]></span></span></div><div class=\"width-field-tooltip no-padding-left\"><i class=\"fa fa-2x fa-question-circle color-grey\" uib-tooltip-html=options.tooltip tooltip-trigger=mouseenter tooltip-placement=right ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div></div>"
  );


  $templateCache.put('common/input/tradable-select',
    "<div class=tradable-list><div class=left-column><div class=\"search-section section-search\"><input ng-model=search[options.map.text] class=\"form-control input-search-icon search-box\" placeholder=\"Search Attribute Set\" aria-describedby=basic-addon2></div><div class=clickable-list><ul class=content-column><li ng-repeat=\"item in selectable | filter:search:strict track by $index\" ng-class=\"{ 'active' : activeLeft == selectable.indexOf(item) }\" ng-click=\"select(selectable.indexOf(item), true)\" ng-if=!contain(item)>{{ options.map.text == null ? item : item[options.map.text] }}</li></ul></div></div><div class=center-column><div class=trade-button ng-class=active(false) ng-click=transfer(true)><i class=\"fa fa-chevron-right\"></i></div><div class=trade-button ng-class=active(true) ng-click=transfer(false)><i class=\"fa fa-chevron-left\"></i></div></div><div class=right-column><div class=list-header><span class=column-1>Attribute Set in This Category</span></div><div class=clickable-list><ul class=content-column><li ng-repeat=\"item in model track by $index\" ng-class=\"{ 'active' : activeRight == model.indexOf(item), 'disabled' : test(item) }\" ng-click=\"select(model.indexOf(item), false)\">{{ options.map.text == null ? item : item[options.map.text] }}</li></ul></div></div></div>"
  );


  $templateCache.put('common/input/tradable-select2',
    "<div class=tradable-list><div class=left-column><div class=\"search-section section-search\"><input ng-model=search[options.map.text] class=\"form-control input-search-icon search-box\" placeholder=\"Search Attribute Set\" aria-describedby=basic-addon2></div><div class=clickable-list><ul class=content-column><li ng-repeat=\"item in selectable | filter:search:strict track by $index\" ng-class=\"{ 'active' : activeLeft == selectable.indexOf(item) }\" ng-click=\"select(selectable.indexOf(item), true)\" ng-if=!contain(item)>{{ options.map.text == null ? item : item[options.map.text] }}</li></ul></div></div><div class=center-column><div class=trade-button ng-class=active(false) ng-click=transfer(true)><i class=\"fa fa-chevron-right\"></i></div><div class=trade-button ng-class=active(true) ng-click=transfer(false)><i class=\"fa fa-chevron-left\"></i></div></div><div class=right-column><div class=list-header><span class=column-1>Attribute</span> <span class=column-2>Required?</span> <span class=column-3>Filterable?</span></div><div class=clickable-list><ul class=content-column><li ng-repeat=\"item in model track by $index\" ng-class=\"{ 'active' : activeRight == model.indexOf(item), 'disabled' : !test(item) }\" ng-click=\"select(model.indexOf(item), false)\" ng-disabled=!test(item)><div class=row><div class=column-1>{{ options.map.text == null ? item : item[options.map.text] }}</div><div class=column-2><input type=checkbox ng-model=item.Required aria-label=\"Checkbox for following text input\"></div><div class=column-3><input type=checkbox ng-model=item.Filterable aria-label=\"Checkbox for following text input\"></div></div></li></ul></div></div></div>"
  );


  $templateCache.put('common/input/width-field-large',
    "<div class=width-field-large><label ng-class=\"options.labelClass || {}\" ng-if=options.label ng-bind-html=options.label></label><ng-transclude></ng-transclude><span class=\"help-block color-red\" ng-if=options.error ng-show=options.error.show ng-repeat=\"(key, prop) in options.error.conditions\">{{ options.error.messages[key] }}</span></div>"
  );


  $templateCache.put('common/link',
    "<div class=\"form-group form-group-closer form-group-link-action\"><div class=width-label></div><div class=width-field-normal><a class=form-text ng-href={{options.link}} ng-transclude></a></div></div>"
  );


  $templateCache.put('global_category/modal',
    "<nc-alert nc-model=alert></nc-alert><div class=modal-header><span class=float-right><a class=link-btn-plain ng-click=$dismiss()>Cancel</a> <button class=\"btn btn-blue btn-width-xl\" ng-click=save()>Save</button></span><h3 class=modal-title>Global Category Detail</h3></div><div class=\"modal-body margin-top-20\" ng-cloak><form ng-show=\"!saving && !loading\" class=ah-form name=form novalidate><div class=row><div class=col-xs-12><div class=form-section><div class=form-section-header><h2>Global Category Information</h2></div><div class=\"form-section-content modal-custom\"><div ng-template=common/input/text2 ng-template-options=\"{\r" +
    "\n" +
    "\t\t\t                  'label': 'Category Name (English)',\r" +
    "\n" +
    "\t\t\t                  'labelClass': 'required',\r" +
    "\n" +
    "\t\t\t                  'error' : {\r" +
    "\n" +
    "\t\t\t                        'messages': {\r" +
    "\n" +
    "\t\t\t                          'required': 'This is a required field',\r" +
    "\n" +
    "\t\t\t                          'pattern': 'Only English allowed'\r" +
    "\n" +
    "\t\t\t                        },\r" +
    "\n" +
    "\t\t\t                        'show': isInvalid(form.NameEn),\r" +
    "\n" +
    "\t\t\t                        'conditions' : form.NameEn.$error\r" +
    "\n" +
    "\t\t\t                   }\r" +
    "\n" +
    "\t\t\t                }\"><input class=form-control name=NameEn ng-model=formData.NameEn ng-class=\"{ 'has-error' : isInvalid(form.NameEn) }\" ng-pattern=\"/^[^ก-๙]+$/\" maxlength=100 required></div><div ng-template=common/input/text2 ng-template-options=\"{\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t'label': 'Category Name (ไทย)',\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t'labelClass': 'required',\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t'error' : {\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'messages': {\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'required': 'This is a required field'\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'show': isInvalid(form.NameTh),\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'conditions' : form.NameTh.$error\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t }\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t}\"><input class=form-control name=NameTh ng-model=formData.NameTh ng-class=\"{ 'has-error' : isInvalid(form.NameTh) }\" maxlength=100 required></div><div ng-template=common/input/text2 ng-template-options=\"{\r" +
    "\n" +
    "\t                        'label': 'URL (English)',\r" +
    "\n" +
    "\t                        'error' : {\r" +
    "\n" +
    "\t                              'messages': {\r" +
    "\n" +
    "\t                                'pattern': 'Only English letters, numbers,  &quot;- &quot;, and   &quot;_&quot;; allowed. Space is not allowed'\r" +
    "\n" +
    "\t                                },\r" +
    "\n" +
    "\t                              'show': isInvalid(form.UrlKeyEn),\r" +
    "\n" +
    "\t                              'conditions' : form.UrlKeyEn.$error\r" +
    "\n" +
    "\t                         }\r" +
    "\n" +
    "\t                      }\"><input class=form-control name=UrlKeyEn ng-model=formData.UrlKeyEn ng-pattern=\"/^[A-Za-z0-9_\\-]+$/\" ng-class=\"{ 'has-error' : isInvalid(form.UrlKeyEn) }\" maxlength=\"300\"></div><div ng-template=common/input/text2 ng-template-options=\"{\r" +
    "\n" +
    "\t\t\t\t\t\t\t'label': 'Commission (%)',\r" +
    "\n" +
    "\t\t\t\t\t\t\t'labelClass': 'required',\r" +
    "\n" +
    "\t\t\t\t\t\t\t'error' : {\r" +
    "\n" +
    "\t\t\t\t\t\t\t'messages': {\r" +
    "\n" +
    "\t\t\t                    'required': 'This is a required field',\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t'pattern': 'Only numbers and decimals (up to 2 digits) allowed',\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t'minnumber': 'Please enter between 0% and 100%',\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t'maxnumber': 'Please enter between 0% and 100%'\r" +
    "\n" +
    "\t\t\t\t\t\t\t},\r" +
    "\n" +
    "\t\t\t\t\t\t\t'show': isInvalid(form.Commission),\r" +
    "\n" +
    "\t\t\t\t\t\t\t'conditions' : form.Commission.$error\r" +
    "\n" +
    "\t\t\t\t\t\t\t}\r" +
    "\n" +
    "\t\t\t\t\t\t\t}\"><input class=form-control name=Commission ng-model=formData.Commission ng-pattern=\"/^[\\w]+(\\.\\w{0,2})?$/\" ng-pattern-restrict=^[0-9]*(\\.[0-9]*)?$ ng-class=\"{ 'has-error' : isInvalid(form.Commission) }\" maxlength=20 ng-maxnumber=100 ng-minnumber=0 required></div></div></div><div class=form-section><div class=form-section-header><h2>Map Attribute Set</h2></div><div class=\"form-section-content modal-custom\"><div nc-tradable-select nc-test=lockAttributeset nc-model=formData.AttributeSets nc-select-options=attributeSetOptions nc-options=\"{ 'map' : { 'text': 'AttributeSetNameEn', 'value' : 'AttributeSetId' } }\"></div><div class=\"row col-xs-12\"><p style=\"margin-left: 30px; margin-top:15px\"><span class=color-red>*</span> Changing attribute set mapping may affect products under this category</p></div></div></div><div class=form-section><div class=form-section-header><h2>Category Visibility</h2></div><div class=\"form-section-content modal-custom\"><div ng-template=common/input/multiline-radio ng-template-options=\"{ 'label' : 'Visibility' }\"><label ng-repeat=\"choice in statusOptions\"><input type=radio ng-model=formData.Visibility ng-value=\"choice.value\">{{choice.name}}</label></div></div></div></div><div class=col-xs-12><span class=float-right><a class=link-btn-plain ng-click=$dismiss()>Cancel</a> <button class=\"btn btn-blue btn-width-xl\" ng-click=save()>Save</button></span></div></div></form><div ng-show=saving nc-loading=Saving..></div><div ng-show=loading nc-loading=Loading..></div></div>"
  );


  $templateCache.put('global_category/nodes',
    "<div class=\"category-content row no-margin\" ui-tree-handle style=\"cursor: pointer\"><div class=category-content-padding><span class=\"col-xs-5 column-lc-name\"><span class=lc-icon-name-warpper><i class=\"fa toggle-button\" ng-if=\"node.nodes && node.nodes.length > 0\" ng-class=\"{\t'fa-chevron-down' : !collapsed,\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t'fa-chevron-right' : collapsed }\" ng-click=toggle(this) data-nodrag></i> <i class=\"fa fa-chevron-right caret-grey\" ng-if=\"(!node.nodes || node.nodes.length == 0) && $parentNodesScope.depth() != 0\" data-nodrag></i> <span class=no-children-row ng-if=\"$parentNodesScope.depth() == 0\" data-nodrag></span> <a class=inline-block ng-click=open(node) data-nodrag>{{ node.NameEn }}</a></span></span> <span class=col-xs-1>{{ node.CategoryAbbreviation }}</span> <span class=\"col-xs-1 text-align-center\">{{ node.ProductCount }}</span> <span class=\"col-xs-2 text-align-center\">{{ node.AttributeSetCount }}</span> <span class=\"col-xs-1 text-align-center\" data-nodrag><nc-eye nc-model=node.Visibility nc-eye-on-toggle=toggleVisibility(node)></nc-eye></span> <span class=\"col-xs-1 text-align-center\"><i class=\"fa fa-arrows color-dark-grey icon-size-20\"></i></span> <span class=\"col-xs-1 text-align-center\" data-nodrag><nc-action nc-model=$nodeScope nc-action-fn=actions></nc-action></span></div></div><ol ui-tree-nodes ng-model=node.nodes ng-slide-toggle=!collapsed><li ng-repeat=\"node in node.nodes\" ui-tree-node ng-include=\"'global_category/nodes'\"></li></ol>"
  );


  $templateCache.put('global_category/nodes_action',
    "<div><a href=# data-toggle=modal data-target=#modal-category-detail ng-click=\"$emit('openEditGlobalCategory', node)\">View / Edit</a></div><div><a href=# ng-click=\"$emit('viewGlobalCategory', node)\">View Products</a></div><div><a href=# ng-click=\"remove(); $emit('delete', node);\">Delete</a></div>"
  );


  $templateCache.put('inventory/stockPopover',
    "<div class=content><span class=\"col-xs-6 padding-left-0 margin-bottom-15 margin-top-10\">In Stock</span> <input class=\"margin-top-10 text-right col-xs-6\" ng-model=\"popoverItem.Quantity\"> <span class=\"col-xs-8 padding-left-0 margin-bottom-15\">Defect</span> <span class=\"text-right col-xs-4\">{{popoverItem.Defect || '0'}}</span><div><span class=\"col-xs-8 padding-left-0 margin-bottom-15\">On Hold</span> <span class=\"text-right col-xs-4\">{{popoverItem.OnHold || '0'}}</span></div><div><span class=\"col-xs-8 padding-left-0 margin-bottom-15 border_modal\">Reserved</span> <span class=\"text-right col-xs-4 border_modal\">{{popoverItem.Reserve || '0'}}</span></div><div><span class=\"col-xs-8 padding-left-0 available_inventory\">Available</span><span class=\"text-right col-xs-4 available_inventory\">{{ getAvailableStock(popoverItem) }}</span></div><div class=text-center><button class=\"btn btn-blue btn-width-100 text-center\" ng-click=updateStock(popoverItem)>Save</button></div></div>"
  );


  $templateCache.put('local_category/modal',
    "<nc-alert nc-model=alert></nc-alert><div class=modal-header><span class=float-right><a class=link-btn-plain ng-click=$dismiss()>Cancel</a> <button class=\"btn btn-blue btn-width-xl\" ng-click=save()>Save</button></span><h3 class=modal-title>Local Category Detail</h3></div><div class=\"modal-body margin-top-20\" ng-cloak><form ng-show=\"!saving && !loading\" class=ah-form name=form novalidate><div class=row><div class=col-xs-12><div class=form-section><div class=form-section-header><h2>Local Category Information</h2></div><div class=\"form-section-content modal-custom\"><div ng-template=common/input/text2 ng-template-options=\"{\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t'label': 'Category Name (English)',\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t'labelClass': 'required',\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t'error' : {\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'messages': {\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'required': 'This is a required field',\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'pattern': 'Only English allowed'\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'show': isInvalid(form.NameEn),\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'conditions' : form.NameEn.$error\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t }\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t}\"><input class=form-control name=NameEn ng-model=formData.NameEn ng-class=\"{ 'has-error' : isInvalid(form.NameEn) }\" ng-pattern=\"/^[^ก-๙]+$/\" maxlength=100 required></div><div ng-template=common/input/text2 ng-template-options=\"{\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t'label': 'Category Name (ไทย)',\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t'labelClass': 'required',\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t'error' : {\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'messages': {\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'required': 'This is a required field'\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'show': isInvalid(form.NameTh),\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'conditions' : form.NameTh.$error\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t\t }\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t\t}\"><input class=form-control name=NameTh ng-model=formData.NameTh ng-class=\"{ 'has-error' : isInvalid(form.NameTh) }\" maxlength=100 required></div><div ng-template=common/input/text2 ng-template-options=\"{\r" +
    "\n" +
    "\t                        'label': 'URL (English)',\r" +
    "\n" +
    "\t                        'error' : {\r" +
    "\n" +
    "\t                              'messages': {\r" +
    "\n" +
    "\t                                'pattern': 'Only English letters, numbers,  &quot;- &quot;, and   &quot;_&quot;; allowed. Space is not allowed'\r" +
    "\n" +
    "\t                                },\r" +
    "\n" +
    "\t                              'show': isInvalid(form.UrlKeyEn),\r" +
    "\n" +
    "\t                              'conditions' : form.UrlKeyEn.$error\r" +
    "\n" +
    "\t                         }\r" +
    "\n" +
    "\t                      }\"><input class=form-control name=UrlKeyEn ng-model=formData.UrlKeyEn ng-pattern=\"/^[A-Za-z0-9_\\-]+$/\" ng-class=\"{ 'has-error' : isInvalid(form.UrlKeyEn) }\" maxlength=\"300\"></div></div></div><div class=form-section><div class=form-section-header><h2>Category Visibility</h2></div><div class=\"form-section-content modal-custom\"><div ng-template=common/input/multiline-radio ng-template-options=\"{ 'label' : 'Visibility' }\"><label ng-repeat=\"choice in statusOptions\"><input type=radio ng-model=formData.Visibility ng-value=\"choice.value\">{{choice.name}}</label></div></div></div></div><div class=col-xs-12><span class=float-right><a class=link-btn-plain ng-click=$dismiss()>Cancel</a> <button class=\"btn btn-blue btn-width-xl\" ng-click=save()>Save</button></span></div></div></form><div ng-show=saving nc-loading=Saving..></div><div ng-show=loading nc-loading=Loading..></div></div>"
  );


  $templateCache.put('local_category/nodes',
    "<div class=\"category-content row no-margin\" ui-tree-handle style=\"cursor: pointer\"><div class=category-content-padding><span class=\"col-xs-8 column-lc-name\"><span class=lc-icon-name-warpper><i class=\"fa toggle-button\" ng-if=\"node.nodes && node.nodes.length > 0\" ng-class=\"{\t'fa-chevron-down' : !collapsed,\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t'fa-chevron-right' : collapsed }\" ng-click=toggle(this) data-nodrag></i> <i class=\"fa fa-chevron-right caret-grey\" ng-if=\"(!node.nodes || node.nodes.length == 0) && $parentNodesScope.depth() != 0\" data-nodrag></i> <span class=no-children-row ng-if=\"$parentNodesScope.depth() == 0\" data-nodrag></span> <a class=inline-block ng-click=open(node) data-nodrag>{{ node.NameEn }}</a></span></span> <span class=\"col-xs-1 text-align-center\">{{ node.ProductCount }}</span> <span class=\"col-xs-1 text-align-center\" data-nodrag><nc-eye nc-model=node.Visibility nc-eye-on-toggle=toggleVisibility(node)></nc-eye></span> <span class=\"col-xs-1 text-align-center\"><i class=\"fa fa-arrows color-dark-grey icon-size-20\"></i></span> <span class=\"col-xs-1 text-align-center\" data-nodrag><nc-action nc-model=$nodeScope nc-action-fn=actions></nc-action></span></div></div><ol ui-tree-nodes ng-model=node.nodes ng-slide-toggle=!collapsed><li ng-repeat=\"node in node.nodes\" ui-tree-node ng-include=\"'local_category/nodes'\"></li></ol>"
  );


  $templateCache.put('local_category/nodes_action',
    "<div><a href=# data-toggle=modal data-target=#local-category-detail ng-click=\"$emit('openEditLocalCategory', node)\">View / Edit</a></div><div><a href=# ng-click=\"$emit('viewLocalCategory', node)\">View Products</a></div><div><a href=# ng-click=\"remove(); $emit('saveLocalCategory');\">Delete</a></div>"
  );


  $templateCache.put('product/action',
    "<div><a ng-click=\"actions.edit(row, true)\">View / Edit</a></div><div><a ng-click=actions.duplicate(row)>Duplicate</a></div><div><a ng-click=\"actions.delete(row, true)\">Delete</a></div>"
  );


  $templateCache.put('product/dropzone/approved',
    "<div class=image-drop-wrapper><div class=image-drop-zone><div class=image-drop-zone-text><p>This product is already approved</p><p><a ng-click=\"triggerEvent('edit')\">Click here to edit</a></p></div></div></div>"
  );


  $templateCache.put('product/dropzone/normal',
    "<div class=image-drop-wrapper><input nv-file-select=\"\" uploader=uploader type=file multiple><div nv-file-drop=\"\" uploader=uploader class=image-drop-zone><div class=image-drop-zone-text><p><i class=\"fa fa-image fa-3x color-theme\"></i></p><p>Drop images here</p><p><a ng-click=upload()>or select images</a></p></div></div></div>"
  );


  $templateCache.put('product/dropzone/reachMax',
    "<div class=image-drop-wrapper><input nv-file-select uploader=uploader type=file multiple><div nv-file-drop uploader=uploader class=image-drop-zone><div class=image-drop-zone-text><p><i class=\"fa fa-ban fa-3x color-dark-grey\"></i></p><p>Cannot upload</p><p>Reach Max Photos</p></div></div></div>"
  );


  $templateCache.put('product/dropzone/waitForApproval',
    "<div class=image-drop-wrapper><div class=image-drop-zone><div class=image-drop-zone-text><p><i class=\"fa fa-ban fa-3x color-dark-grey\"></i></p><p>Cannot upload</p><p>Wait for Approval</p></div></div></div>"
  );


  $templateCache.put('product/modalCategorySelector',
    "<div class=modal-header><button type=button class=close ng-click=$dismiss()><span aria-hidden=true>&times;</span></button><h3 class=modal-title>{{title}}</h3></div><div class=modal-body style=\"padding-top: 15px\"><div class=\"category-section column-4\"><nc-tree-select nc-model=model nc-tree-select-tree=tree nc-tree-select-title=\"Choose Global Category\"></nc-tree-select><div class=\"category-footer no-padding\"><span class=float-right><button ng-click=select() class=\"btn btn-blue btn-width-xl\" ng-disabled=\"model == null\">Select</button></span></div></div></div>"
  );


  $templateCache.put('product/productReviewModal',
    "<div class=modal-header><button type=button class=close aria-label=Close ng-click=$dismiss()><span aria-hidden=true>&times;</span></button><h3 class=modal-title>Review Detail</h3></div><div class=modal-body><form class=\"ah-form margin-top-20\"><div class=row><div class=col-xs-12><div class=form-section><div class=form-section-header><h2>Review Detail</h2></div><div class=\"form-section-content modal-custom\"><div nc-template=common/input/form-group-with-label nc-label=\"Date & Time :\"><p class=form-control-static>{{UpdatedDt | dateTh}} at {{UpdatedDt | timeTh}}</p></div><div nc-template=common/input/form-group-with-label nc-label=\"Customer :\"><p class=form-control-static>{{Customer}}</p></div><div nc-template=common/input/form-group-with-label nc-label=\"Comment :\"><p class=form-control-static>{{Comment}}</p></div></div></div><div class=form-section><div class=form-section-header><h2>Product Information</h2></div><div class=\"form-section-content modal-custom\"><div nc-template=common/input/form-group-with-label nc-label=\"PID :\"><p class=form-control-static>{{Pid}}</p></div><div nc-template=common/input/form-group-with-label nc-label=\"Product Name (English) :\"><p class=form-control-static>{{ProductNameEn}}</p></div><div nc-template=common/input/form-group-with-label nc-label=\"Product Name (ไทย) :\"><p class=form-control-static>{{ProductNameTh}}</p></div><div nc-template=common/input/form-group-with-label nc-label=\"Brand :\"><p class=form-control-static>{{BrandNameEn}}</p></div></div></div></div></div></form></div>"
  );


  $templateCache.put('product/typeahead',
    "<a><span ng-bind-html=\"match.label.HeaderName | uibTypeaheadHighlight:query\"></span></a>"
  );
 }];