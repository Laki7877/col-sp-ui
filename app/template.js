module.exports = ["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('admin/views/attributes.add.html',
    ""
  );


  $templateCache.put('admin/views/attributes.list.html',
    "<!-- Attribute listing -->\r" +
    "\n" +
    "<nc-alert nc-model=\"alert\"></nc-alert>\r" +
    "\n" +
    "<nc-page-title nc-title=\"Attributes\">\r" +
    "\n" +
    "  <a type=\"button\" class=\"btn-blue btn btn-width-xxl\" href=\"{{$route.get('admin.attribute.list')\">\r" +
    "\n" +
    "    <span class=\"\">Add Attributes</span>\r" +
    "\n" +
    "  </a>\r" +
    "\n" +
    "</nc-page-title>\r" +
    "\n" +
    "<div class=\"row search-section-wrapper\">\r" +
    "\n" +
    "  <nc-bulk nc-model=\"bulkContainer\" nc-bulk-fn=\"bulks\" nc-bulk-track-by=\"AttributeId\"></nc-bulk>\r" +
    "\n" +
    "  <nc-search nc-model=\"params.searchText\" nc-search-placeholder=\"'Search for Attribute Name'\"></nc-search>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<nc-filter nc-model=\"params._filter\" nc-filter-options=\"filterOptions\"></nc-filter>\r" +
    "\n" +
    "<nc-table nc-model=\"list\" nc-table-params=\"params\" nc-table-options=\"tableOptions\" nc-is-loading=\"loading\" nc-is-searching=\"isSearching()\" >\r" +
    "\n" +
    "  <table class=\"table table-curved\">\r" +
    "\n" +
    "    <thead>\r" +
    "\n" +
    "      <tr class=\"table-head\">\r" +
    "\n" +
    "        <th class=\"checkbox-column\"><nc-bulk-checkbox nc-model=\"list.data\"></nc-bulk-checkbox></th>\r" +
    "\n" +
    "        <th nc-sort=\"AttributeNameEn\">Attribute Name</th>\r" +
    "\n" +
    "        <th nc-sort=\"DisplayNameEn\">Display Name</th>\r" +
    "\n" +
    "        <th>Field Type</th>\r" +
    "\n" +
    "        <th>Variation</th>\r" +
    "\n" +
    "        <th>Mapped Set</th>\r" +
    "\n" +
    "        <th nc-sort=\"UpdatedDt\" class=\"modified-column\">Modified</th>\r" +
    "\n" +
    "        <th>Action</th>\r" +
    "\n" +
    "      </tr>\r" +
    "\n" +
    "    </thead>\r" +
    "\n" +
    "    <tbody>\r" +
    "\n" +
    "      <tr ng-repeat=\"row in list.data\">\r" +
    "\n" +
    "        <td class=\"checkbox-column\"><nc-bulk-checkbox nc-model=\"row\"></nc-bulk-checkbox></td>\r" +
    "\n" +
    "        <td class=\"column-text-ellipsis\" nc-link=\"/admin/attributes/{{row.AttributeId}}\">\r" +
    "\n" +
    "          {{row.AttributeNameEn}}\r" +
    "\n" +
    "        </td>\r" +
    "\n" +
    "        <td>{{row.DisplayNameEn}}</td>\r" +
    "\n" +
    "        <td>{{row.DataType | mapDropdown:dataTypeDropdown }}</td>\r" +
    "\n" +
    "        <td class=\"width_100\">{{row.VariantStatus | mapDropdown:yesNoDropdown }}</td>\r" +
    "\n" +
    "        <td class=\"width_100\">{{row.AttributeSetCount}}</td>\r" +
    "\n" +
    "        <td class=\"width_100\">{{row.UpdatedDt | dateTh}}</td>\r" +
    "\n" +
    "        <td class=\"width_100\"><nc-action nc-model=\"row\" nc-action-fn=\"actions\"></nc-action></td>\r" +
    "\n" +
    "      </tr>\r" +
    "\n" +
    "    </tbody>\r" +
    "\n" +
    "  </table>\r" +
    "\n" +
    "</nc-table>\r" +
    "\n" +
    "<nc-pagination nc-model=\"params\" nc-pagination-total=\"list.total\" ></nc-pagination>"
  );


  $templateCache.put('core/templates/form.html',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\">\r" +
    "\n" +
    "\t<div class=\"width-label\"><label class=\"control-label\" ng-class=\"options.labelClass || {}\" ng-bind-html=\"options.label\"></label></div>\r" +
    "\n" +
    "\t<div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "\t\t<ng-transclude></ng-transclude>\r" +
    "\n" +
    "\t\t<span class=\"input-unit\" ng-if=\"options.unit\">{{ options.unit }}</span>\r" +
    "\n" +
    "\t\t<span class=\"help-block\" ng-if=\"options.hint\" ng-show=\"options.hint.show\">{{options.hint.message}}</span>\r" +
    "\n" +
    "\t\t<span class=\"help-block color-red\" ng-if=\"options.error\" ng-show=\"options.error.show\" \r" +
    "\n" +
    "        ng-repeat=\"(key, prop) in (options.error.conditions) track by key\">\r" +
    "\n" +
    "\t\t\t<span ng-bind-html=\"options.error.messages[key]\"></span>\r" +
    "\n" +
    "\t\t</span>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div class=\"width-field-tooltip padding-left-30\"><i class=\"fa fa-2x fa-question-circle color-grey\" uib-tooltip-html=\"options.tooltip\" tooltip-trigger=\"mouseenter\" tooltip-placement=\"right\" ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('core/views/login.html',
    "<div class=\"login-page\">\r" +
    "\n" +
    "\t<div class=\"logo-img-wrapper\">\r" +
    "\n" +
    "\t\t<img class=\"logo-img\" src=\"/assets/img/seller_logo.png\" />\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<form ng-submit=\"doLogin()\" name=\"loginForm\" novalidate>\r" +
    "\n" +
    "\t\t<div class=\"form-login\" ng-cloak>\r" +
    "\n" +
    "\t\t\t<nc-alert nc-model=\"alert\"></nc-alert>\r" +
    "\n" +
    "\t\t\t<div ng-template=\"core/templates/form.html\"\r" +
    "\n" +
    "\t\t\t\tng-template-options=\"{\r" +
    "\n" +
    "\t\t\t\t\t'label': 'Email'\r" +
    "\n" +
    "\t\t\t\t}\">\r" +
    "\n" +
    "\t\t\t\t<input\r" +
    "\n" +
    "\t\t\t\tclass=\"form-control width-field-large\"\r" +
    "\n" +
    "\t\t\t\tname=\"user\"\r" +
    "\n" +
    "\t\t\t\tng-model=\"uform.user\"\r" +
    "\n" +
    "\t\t\t\tng-class=\"{ 'has-error' : (events.user === false && loginForm.user.$invalid) || (error && loginForm.$pristine) }\"\r" +
    "\n" +
    "\t\t\t\tmaxlength=\"300\"\r" +
    "\n" +
    "\t\t\t\tng-focus=\"events.user=true\"\r" +
    "\n" +
    "\t\t\t\tng-blur=\"events.user=false\"\r" +
    "\n" +
    "\t\t\t\trequired />\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t<div ng-template=\"core/templates/form.html\"\r" +
    "\n" +
    "\t\t\t\tng-template-options=\"{\r" +
    "\n" +
    "\t\t\t\t\t'label': 'Password'\r" +
    "\n" +
    "\t\t\t\t}\">\r" +
    "\n" +
    "\t\t\t\t<input\r" +
    "\n" +
    "\t\t\t\ttype=\"password\"\r" +
    "\n" +
    "\t\t\t\tclass=\"form-control width-field-large\"\r" +
    "\n" +
    "\t\t\t\tname=\"pass\"\r" +
    "\n" +
    "\t\t\t\tng-model=\"uform.pass\"\r" +
    "\n" +
    "\t\t\t\tng-class=\"{ 'has-error' : (events.pass === false && loginForm.pass.$invalid) || (error && loginForm.$pristine)  }\"\r" +
    "\n" +
    "\t\t\t\tmaxlength=\"300\"\r" +
    "\n" +
    "\t\t\t\tng-focus=\"events.pass=true\"\r" +
    "\n" +
    "\t\t\t\tng-blur=\"events.pass=false\"\r" +
    "\n" +
    "\t\t\t\trequired />\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t\t<div class=\"form-group\" ng-if=\"error && loginForm.$pristine\">\r" +
    "\n" +
    "\t\t\t\t<div class=\"width-label\"></div>\r" +
    "\n" +
    "\t\t\t\t<div class=\"width-field-normal\">\r" +
    "\n" +
    "\t\t\t\t\t<span class=\"help-block color-red text-center margin-bottom-0\">Invalid Email or Password</span>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t\t<fieldset class=\"form-group margin-top-30\">\r" +
    "\n" +
    "\t\t\t\t<button type=\"submit\" class=\"btn btn-blue btn-100\"><span class=\"login-loading\" ng-cloak ng-show=\"loading\"><i class=\"fa fa-spinner fa-spin\" ></i></span> Login</button>\r" +
    "\n" +
    "\t\t\t</fieldset>\r" +
    "\n" +
    "\t\t\t<fieldset class=\"form-group text-center\">\r" +
    "\n" +
    "\t\t\t\t<a href=\"\" data-toggle=\"modal\" data-target=\"#forget-password\">Forget password?</a>\r" +
    "\n" +
    "\t\t\t</fieldset>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</form>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncAction.html',
    "<a class=\"action-gear\" href=\"javascript:;\"  uib-popover-template=\"'common/ncActionPopover.html'\" popover-placement=\"bottom\" popover-append-to-body=\"true\" popover-trigger=\"outsideClick\" class=\"action-gear\">\r" +
    "\n" +
    "\t<i class=\"fa fa-gear color-dark-grey icon-size-20\"></i>\r" +
    "\n" +
    "\t<i class=\"fa fa-caret-down color-dark-grey\"></i>\r" +
    "\n" +
    "</a>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncActionModal.html',
    "<div class=\"modal-header no-border\">\r" +
    "\n" +
    "\t<button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"no()\"><span class=\"padding-left-15\" aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body confirmation-modal no-margin\">\r" +
    "\n" +
    "\t<div class=\"row\">\r" +
    "\n" +
    "\t\t<div class=\"col-xs-12 margin-bottom-30\">\r" +
    "\n" +
    "\t\t\t<h2 class=\"font-size-20 text-centerx text-normal margin-bottom-20\">{{title}}</h2>\r" +
    "\n" +
    "\t\t\t<div ng-bind-html=\"message\"></div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"confirmation-action no-margin\">\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn btn-white\" ng-click=\"no()\">{{btnNo}}</button>\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn {{btnClass}}\" ng-click=\"yes()\">{{btnYes}}</button>\r" +
    "\n" +
    "\t\t</div> <!-- end .col-xs-12 -->\r" +
    "\n" +
    "\t</div> <!-- end .row -->\r" +
    "\n" +
    "</div> <!-- end .modal-body -->\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncActionPopover.html',
    "<div ng-repeat=\"action in options\"><a ng-click=\"call(action)\" >{{action.name}}</a></div>"
  );


  $templateCache.put('nc/templates/common/ncAdvanceSearch.html',
    "<div class=\"row margin-top-30\" ng-show=\"open\">\r" +
    "\n" +
    "\t<div class=\"col-xs-12\">\r" +
    "\n" +
    "\t\t<div class=\"form-section\">\r" +
    "\n" +
    "\t\t\t<div class=\"form-section-header\"><h2>Advance Search</h2></div>\r" +
    "\n" +
    "\t\t\t<div class=\"form-section-content\">\r" +
    "\n" +
    "\t\t\t\t<form name=\"form\" class=\"ah-form\" novalidate>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.ProductName\" nc-label=\"Product Name\" nc-template-options-path=\"searchForm/ProductName\">\r" +
    "\n" +
    "\t\t                    <input class=\"form-control width-field-normal\" name=\"ProductName\" ng-model=\"formData.ProductName\" required />\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Pid\" nc-label=\"PID\" nc-template-options-path=\"searchForm/Pid\">\r" +
    "\n" +
    "\t\t                    <input class=\"form-control width-field-normal\" name=\"Pid\" ng-model=\"formData.Pid\" required />\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Sku\" nc-label=\"SKU\" nc-template-options-path=\"searchForm/Sku\">\r" +
    "\n" +
    "\t\t                    <input class=\"form-control width-field-normal\" name=\"Sku\" ng-model=\"formData.Sku\" required />\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Brand\" nc-label=\"Brand Name\" nc-template-options-path=\"searchForm/Brands\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t    <ui-select ng-model=\"formData.Brands\" name=\"Brands\" nc-tag-validator multiple tagging-tokens=\",|ENTER\" tagging-label=\"\" nc-tag-field>\r" +
    "\n" +
    "\t                                <ui-select-match>\r" +
    "\n" +
    "\t                                    {{$item.BrandNameEn}}\r" +
    "\n" +
    "\t                                </ui-select-match>\r" +
    "\n" +
    "\t                                <ui-select-choices repeat=\"item in options.Brands | filter:{BrandNameEn: $select.search} track by $index\">\r" +
    "\n" +
    "\t                                    {{item.BrandNameEn}}\r" +
    "\n" +
    "\t                                </ui-select-choices>\r" +
    "\n" +
    "\t                            </ui-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.GlobalCategories\" nc-label=\"Global Category Name\" nc-template-options-path=\"searchForm/GlobalCategories\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<nc-breadcrumb-select name=\"GlobalCategories\" nc-model=\"formData.GlobalCategories\" nc-breadcrumb-select-tree=\"options.GlobalCategories\"></nc-breadcrumb-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.LocalCategories\" nc-label=\"Local Category Name\" nc-template-options-path=\"searchForm/LocalCategories\" ng-show=\"!options.Admin\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<nc-breadcrumb-select name=\"LocalCategories\" nc-model=\"formData.LocalCategories\" nc-breadcrumb-select-tree=\"options.LocalCategories\"></nc-breadcrumb-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Tags\" nc-label=\"Search Tag\" nc-template-options-path=\"searchForm/Tags\" class=\"ui-select-dropdown-hide\" >\r" +
    "\n" +
    "\t\t\t\t\t\t\t    <ui-select ng-model=\"formData.Tags\" name=\"Tags\" nc-tag-validator tagging tagging-label=\"\" multiple nc-tag-field>\r" +
    "\n" +
    "\t                                <ui-select-match>\r" +
    "\n" +
    "\t                                    {{$item}}\r" +
    "\n" +
    "\t                                </ui-select-match>\r" +
    "\n" +
    "\t                                <ui-select-choices repeat=\"item in options.Tags\">\r" +
    "\n" +
    "\t                                \t{{item}}\r" +
    "\n" +
    "\t                                </ui-select-choices>\r" +
    "\n" +
    "\t                            </ui-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label-multiple\" nc-template-form=\"form.Price\" nc-label=\"Sale Price\" nc-template-options-path=\"searchForm/Price\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<input type=\"text\" name=\"Price\" ng-maxnumber=\"{{formData.PriceTo}}\" ng-model=\"formData.PriceFrom\" class=\"form-control\" ng-pattern-restrict=\"^[0-9]*(\\.[0-9]{0,2})?$\"/>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<input type=\"text\" ng-model=\"formData.PriceTo\" class=\"form-control\" ng-pattern-restrict=\"^[0-9]*(\\.[0-9]{0,2})?$\"/>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label-multiple\" nc-template-form=\"form.CreatedDate\" nc-label=\"Created Date\" nc-template-options-path=\"searchForm/CreatedDate\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.CreatedDtFrom | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker name=\"CreatedDate\" ng-date-before=\"{{formData.CreatedDtTo}}\" data-ng-model=\"formData.CreatedDtFrom\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown2\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.CreatedDtTo | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker data-ng-model=\"formData.CreatedDtTo\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown2', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label-multiple\" nc-template-form=\"form.ModifiedDate\" nc-label=\"Modified Date\" nc-template-options-path=\"searchForm/ModifiedDate\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown3\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.ModifyDtFrom | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker data-ng-model=\"formData.ModifyDtFrom\" name=\"ModifiedDate\" ng-date-before=\"{{formData.ModifiedDtTo}}\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown3', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown4\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.ModifyDtTo | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker data-ng-model=\"formData.ModifyDtTo\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown4', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label\"><label class=\"control-label\"></label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"button-size-normal\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<a class=\"button-size-normal btn btn-blue btn-width-xl\" ng-click=\"search()\">Search</a>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"button-size-normal\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<a class=\"button-size-normal margin-left-10 btn btn-white btn-width-xl\" ng-click=\"clear()\">Clear</a>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</form>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncAdvanceSearchButton.html',
    "<div class=\"search-section-item\">\r" +
    "\n" +
    "\t<button class=\"btn btn-default btn-toggle {{model ? 'active' : ''}}\" type=\"button\" ng-click=\"toggle()\">Advanced Search</button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncAlert.html',
    "<div ng-show=\"alert.show\" uib-alert template-url=\"common/ncAlertTemplate.html\" type=\"{{ alert.type }}\" close=\"alert.close()\"><span ng-bind-html=\"alert.message\"></span></div>"
  );


  $templateCache.put('nc/templates/common/ncAlertTemplate.html',
    "<div class=\"alert\" ng-class=\"['alert-' + (type || 'warning')]\" class=\"alert alert-dismissable\" role=\"alert\" >\r" +
    "\n" +
    "\t<span class=\"close color opacity-1\" ng-class=\"'color-' + (type || 'warning')\" aria-hidden=\"true\"  ng-show=\"closeable\" ng-click=\"close({$event: $event})\">&times;</span>\r" +
    "\n" +
    "    <ng-transclude><ng-transclude/>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncBreadcrumbSelect.html',
    "<ui-select name=\"{{name}}\" ng-model=\"model.ptr\" nc-tag-validator nc-max-tag-count=\"{{options.tagCount}}\" multiple>\r" +
    "\n" +
    "\t<ui-select-match><span ng-bind-html=\"$item.item[options.nameKey]\"></span></ui-select-match>\r" +
    "\n" +
    "\t<ui-select-choices repeat=\"value in searchable | filter: { name: $select.search } | limitTo: options.limit track by $index\">\r" +
    "\n" +
    "\t\t<div ng-bind-html=\"value.displayName | highlight: $select.search | replace: encodedSeparator: options.seperator\"></div>\r" +
    "\n" +
    "\t</ui-select-choices>\r" +
    "\n" +
    "</ui-select>"
  );


  $templateCache.put('nc/templates/common/ncBulk.html',
    "<div class=\"btn-group search-section-item\" role=\"group\">\r" +
    "\n" +
    "  <div class=\"btn-group\" role=\"group\">\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-default dropdown-toggle bulk-action-dropdown\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" uib-dropdown-toggle>\r" +
    "\n" +
    "      <span class=\"\">{{ select.name }}</span>\r" +
    "\n" +
    "      <span class=\"caret\"></span>\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "    <ul uib-dropdown-menu role=\"menu\" class=\"dropdown-menu\">\r" +
    "\n" +
    "      <li ng-repeat=\"option in options\" ><a ng-click=\"selectOption(option)\">{{ option.name }}</a></li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\t<button type=\"button\" class=\"btn btn-default btn-action\" ng-click=\"call()\">\r" +
    "\n" +
    "    Confirm <span ng-show=\"model.length > 0\">({{ model.length }})</span>\r" +
    "\n" +
    "  </button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncBulkCheckbox.html',
    "<input type=\"checkbox\" ng-model=\"checkbox\" />"
  );


  $templateCache.put('nc/templates/common/ncBulkModal.html',
    "<div class=\"modal-header no-border\">\r" +
    "\n" +
    "\t<button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"no()\"><span class=\"padding-left-15\" aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body confirmation-modal no-margin\">\r" +
    "\n" +
    "\t<div class=\"row\">\r" +
    "\n" +
    "\t\t<div class=\"col-xs-12 margin-bottom-30\">\r" +
    "\n" +
    "\t\t\t<h2 class=\"font-size-20 text-centerx text-normal margin-bottom-20\">{{title}}</h2>\r" +
    "\n" +
    "\t\t\t<div ng-bind-html=\"message\"></div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"confirmation-action no-margin\">\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn btn-white\" ng-click=\"no()\">{{btnNo}}</button>\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn {{btnClass}}\" ng-click=\"yes()\">{{btnYes}}</button>\r" +
    "\n" +
    "\t\t</div> <!-- end .col-xs-12 -->\r" +
    "\n" +
    "\t</div> <!-- end .row -->\r" +
    "\n" +
    "</div> <!-- end .modal-body -->\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncEmpty.html',
    "<div class=\"local-category-page margin-bottom-20\">\r" +
    "\n" +
    "  <div class=\"local-category-empty-section margin-top-20\">\r" +
    "\n" +
    "    <span class=\"\">\r" +
    "\n" +
    "      <span class=\"zero-category-image\">\r" +
    "\n" +
    "      </span>\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "    <span class=\"local-category-empty-text\">\r" +
    "\n" +
    "      {{ message }}\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncEye.html',
    "<a ng-click=\"_toggle()\">\r" +
    "\n" +
    "\t<i ng-class=\"{'fa fa-eye-slash color-grey eye-icon' : !model,\r" +
    "\n" +
    "                            'fa fa-eye color-dark-grey eye-icon' : model}\">\r" +
    "\n" +
    "    </i>\r" +
    "\n" +
    "</a>"
  );


  $templateCache.put('nc/templates/common/ncFilter.html',
    "<div class=\"filter-section\">\r" +
    "\n" +
    "  <div class=\"filter-container\">\r" +
    "\n" +
    "    <span>Filters:</span>\r" +
    "\n" +
    "    <a class=\"filter-seperator\" ng-repeat=\"filter in filters\" ng-class=\"{'filter-active': model == filter.value }\" ng-click=\"select(filter.value)\">{{ filter.name }}</a>\r" +
    "\n" +
    "  \t<span ng-transclude></span>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncImage.html',
    "<li class=\"list-item\">\r" +
    "\n" +
    "\t<div class=\"image-thumbs-actions\">\r" +
    "\n" +
    "\t\t<div class=\"image-thumbs-img-wrapper\">\r" +
    "\n" +
    "\t\t\t<img ng-src=\"{{ model.ImageUrlEn.length > 0 && model.ImageUrlEn  || '/assets/img/loader.gif' }}\" />\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div ng-if=\"actions.length > 0\" class=\"actions-wrapper\" ng-style=\"width: {{100 / actions.length}}%;\">\r" +
    "\n" +
    "\t\t\t<a ng-repeat=\"action in options.actions\" class=\"action\" \r" +
    "\n" +
    "\t\t\tng-click=\"action.fn(model, parent, $index)\"><i class=\"fa\" ng-class=\"{{action.icon}}\"></i></a>\r" +
    "\n" +
    "\t\t\t<!-- fa-search-icon fa-trash -->\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</li>"
  );


  $templateCache.put('nc/templates/common/ncImageDropzone.html',
    "<div class=\"image-drop-wrapper\">\r" +
    "\n" +
    "\t<input nv-file-select=\"\" uploader=\"uploader\" accept=\".png, .jpg, .jpeg\" type=\"file\" multiple/>\r" +
    "\n" +
    "\t<div nv-file-drop=\"\" uploader=\"uploader\" class=\"image-drop-zone\">\r" +
    "\n" +
    "\t\t<div class=\"image-drop-zone-text\">\r" +
    "\n" +
    "\t\t\t<p><i class=\"fa fa-image fa-3x color-theme\"></i></p>\r" +
    "\n" +
    "\t\t\t<p>Drop images here</p>\r" +
    "\n" +
    "\t\t\t<p><a ng-click=\"upload()\">or select images</a></p>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncImageDropzoneInline.html',
    "<div class=\"drop-zone-container\">\r" +
    "\n" +
    "\t<div class=\"image-drop-wrapper\">\r" +
    "\n" +
    "\t\t<input type=\"file\" />\r" +
    "\n" +
    "\t\t<div class=\"image-drop-zone\">\r" +
    "\n" +
    "\t\t\t<div class=\"image-drop-zone-text\" ng-bind-compile=\"content\">\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management1\", 'texts' =>['<i class=\"fa fa-image fa-3x color-theme\"></i>', 'Drop images here', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management1\">or select images</a>']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class=\"fa fa-ban fa-3x color-dark-grey\"></i>', 'Cannot upload', 'Wait for Approval']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management3\", 'texts' =>['This product is already approved', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management3\">Click here to edit</a>']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management4\", 'texts' =>['<i class=\"fa fa-image fa-3x color-theme\"></i>', 'Drop images here', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management4\">or select images</a>']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class=\"fa fa-ban fa-3x color-dark-grey\"></i>', 'Cannot upload', 'Reach Max Photos']]) ?>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncImageDropzoneTemplate.html',
    "<div class=\"image-drop-wrapper\">\r" +
    "\n" +
    "\t<input nv-file-select uploader=\"uploader\" type=\"file\" multiple/>\r" +
    "\n" +
    "\t<div nv-file-drop uploader=\"uploader\" class=\"image-drop-zone\">\r" +
    "\n" +
    "\t\t<div class=\"image-drop-zone-text\">\r" +
    "\n" +
    "\t\t\t<p><i class=\"fa fa-image fa-3x color-theme\"></i></p>\r" +
    "\n" +
    "\t\t\t<p>Drop images here</p>\r" +
    "\n" +
    "\t\t\t<p><a ng-click=\"upload()\">or select images</a></p>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncImageGallery.html',
    "<div>\r" +
    "\n" +
    "\t<p class=\"featured-image-wrapper\">Featured Image</p>\r" +
    "\n" +
    "\t<ul class=\"image-management-list\">\r" +
    "\n" +
    "\t\t<li class=\"list-item\" ng-repeat=\"image in images track by $index\">\r" +
    "\n" +
    "\t\t\t<div class=\"image-thumbs-actions\">\r" +
    "\n" +
    "\t\t\t\t<div class=\"image-thumbs-img-wrapper\">\r" +
    "\n" +
    "\t\t\t\t\t<img ng-src=\"{{ getSrc(image) }}\" />\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t<div class=\"actions-wrapper\" >\r" +
    "\n" +
    "\t\t\t\t\t<a class=\"action {{ isDisabled(image) ? 'disabled' : ''}}\" ng-repeat=\"action in options.actions\" style=\"width: {{100 / options.actions.length }}%;\" ng-click=\"call(action, image, model)\">\r" +
    "\n" +
    "\t\t\t\t\t\t<i class=\"fa {{action.icon}}\"></i>\r" +
    "\n" +
    "\t\t\t\t\t</a>\r" +
    "\n" +
    "\t\t\t\t\t<!-- fa-search-icon fa-trash -->\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</li>\r" +
    "\n" +
    "\t</ul>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncLoading.html',
    "<div class=\"empty-section margin-top-20 margin-bottom-20\">\r" +
    "\n" +
    "  <span>\r" +
    "\n" +
    "    <img class=\"loading-img\" src=\"/assets/img/loader.gif\" />\r" +
    "\n" +
    "  </span>{{ message }}</span>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncLoadingSmall.html',
    "<img src=\"/assets/img/loader.gif\" width=\"40\"><small>{{ message }}</small>"
  );


  $templateCache.put('nc/templates/common/ncPagination.html',
    "<div class=\"page-navigation\">\r" +
    "\n" +
    "  <span>\r" +
    "\n" +
    "    <!-- prev page button -->\r" +
    "\n" +
    "    <a ng-click=\"nextPage(-1)\">\r" +
    "\n" +
    "      <i class=\"fa fa-chevron-left\" ng-class=\"{'grey-chevron': page() <= 1, 'blue-chevron' : page() > 1}\">\r" +
    "\n" +
    "      </i>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <!-- pagination text -->\r" +
    "\n" +
    "    <span> Page {{ page() }} of {{ totalPage() }}</span>\r" +
    "\n" +
    "    <!-- next page button -->\r" +
    "\n" +
    "    <a ng-click=\"nextPage(1)\">\r" +
    "\n" +
    "      <i class=\"fa fa-chevron-right padding-right-15\" ng-class=\"{'grey-chevron': page() >= totalPage(), 'blue-chevron' : page() < totalPage() }\">\r" +
    "\n" +
    "      </i>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <span class=\"view-page-separator margin-right-10\">View per page</span>\r" +
    "\n" +
    "    <!-- Pagination dropdown -->\r" +
    "\n" +
    "    <div class=\"btn-group\" uib-dropdown>\r" +
    "\n" +
    "      <!-- Page size button -->\r" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn-default\">\r" +
    "\n" +
    "        {{ pageSize() }}\r" +
    "\n" +
    "      </button>\r" +
    "\n" +
    "      <!-- Caret -->\r" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn-default\" uib-dropdown-toggle>\r" +
    "\n" +
    "        <span class=\"caret\"></span>\r" +
    "\n" +
    "        <span class=\"sr-only\">Toggle Dropdown</span>\r" +
    "\n" +
    "      </button>\r" +
    "\n" +
    "      <!-- Dropdown -->\r" +
    "\n" +
    "      <ul uib-dropdown-menu role=\"menu\" class=\"dropdown-menu-right\">\r" +
    "\n" +
    "        <li ng-repeat=\"size in paginationOptions\" ><a ng-click=\"setPageSize(size)\">{{size}}</a></li>\r" +
    "\n" +
    "      </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </span>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncSearch.html',
    "<div class=\"input-group search-section-item\">\r" +
    "\n" +
    "\t<form ng-submit=\"callback()\">\r" +
    "\n" +
    "\t\t<div class=\"input-group search-box\">\r" +
    "\n" +
    "\t    <input type=\"text\" class=\"form-control input-search-icon\" ng-model=\"searchText\" placeholder=\"{{placeholder}}\">\r" +
    "\n" +
    "\t\t\t<span class=\"input-group-btn\">\r" +
    "\n" +
    "\t\t\t\t<button class=\"btn btn-default btn-action\">Search</button>\r" +
    "\n" +
    "\t\t\t</span>\r" +
    "\n" +
    "\t  </div>\r" +
    "\n" +
    "\t</form>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncTable.html',
    "<div class=\"table-section\">\r" +
    "\n" +
    "  <div ng-show=\"!loading && model.data.length != 0\" ng-transclude></div>\r" +
    "\n" +
    "  <div nc-loading=\"{{options.loadingMessage}}\" ng-show=\"loading\"></div>\r" +
    "\n" +
    "  <div nc-empty=\"{{options.searchEmptyMessage}}\" ng-show=\"!loading && model.data.length == 0 && searching\">\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div nc-empty=\"{{options.emptyMessage}}\" ng-show=\"!loading && model.data.length == 0 && !searching\"></div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncTableSort.html',
    "<a class=\"header-link\" ng-click=\"click()\"><span ng-class=\"{ 'active-underline' : isCurrent() }\" ng-transclude></span></a>\r" +
    "\n" +
    "<i class=\"fa\" ng-class=\"{ \r" +
    "\n" +
    "'fa fa-caret-down' : isCurrent() && direction, \r" +
    "\n" +
    "'fa fa-caret-up' : isCurrent() && !direction, \r" +
    "\n" +
    "'fa fa-caret-down color-grey' : !isCurrent() }\" ng-click=\"click()\">"
  );


  $templateCache.put('nc/templates/common/ncTreeSelect.html',
    "<div class=\"category-section-border-box\">\r" +
    "\n" +
    "\t<div class=\"category-header\">{{title}}</div>\r" +
    "\n" +
    "\t<div class=\"category-content no-padding\">\r" +
    "\n" +
    "\t\t<ul ng-repeat=\"column in columns.list() track by $index\" ng-class=\"{'empty-column': column.list().length <= 0 }\" class=\"content-column\">\r" +
    "\n" +
    "\t\t\t<li ng-repeat=\"$item in column.list() track by $index\" ng-class=\"{'category-active' : $index == column.active() }\" ng-click=\"setModel($item)\">{{getContent($item)}}</li>\r" +
    "\n" +
    "\t\t</ul>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/components/date-range-inline.html',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\">\r" +
    "\n" +
    "  <div class=\"width-label\"><label class=\"control-label\" ng-class=\"options.labelClass || {}\">{{ label }}</label></div>\r" +
    "\n" +
    "  <div>\r" +
    "\n" +
    "      <div ng-class=\"['width-field-' + (options.inputSize || 'small-input')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "        <div class=\"dropdown\">\r" +
    "\n" +
    "            <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown1\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                 ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "                 placeholder=\"{{ startPlaceholder || 'Select start date' }}\"\r" +
    "\n" +
    "                 class=\"form-control width-field-large\"\r" +
    "\n" +
    "                 value=\"{{ startDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                <datetimepicker data-ng-model=\"startDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown1', minView: 'minute' }\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "      <div ng-class=\"['width-field-' + (options.inputSize || 'small-input')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "        <div class=\"dropdown\">\r" +
    "\n" +
    "            <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown2\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                 ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "                 placeholder=\"{{ endPlaceholder || 'Select end date' }}\"\r" +
    "\n" +
    "                 class=\"form-control width-field-large\"\r" +
    "\n" +
    "                 value=\"{{ endDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel2\">\r" +
    "\n" +
    "                <datetimepicker data-ng-model=\"endDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown2', minView: 'minute' }\" />\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"width-field-large\">\r" +
    "\n" +
    "            <span class=\"help-block color-red\" ng-if=\"endDate <= startDate\">\r" +
    "\n" +
    "                <span>{{ errorText || \"Start date/time must come before end date/time\" }}</span>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/components/date-range-vertical.html',
    "<div>\r" +
    "\n" +
    "  <div ng-class=\"['form-group ' + (options.formGroupClass || '')]\">\r" +
    "\n" +
    "    <div class=\"width-label\">\r" +
    "\n" +
    "      <label class=\"control-label ng-binding\" ng-class=\"options.labelClass || {}\">{{ startLabel }}</label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "      <div class=\"dropdown\">\r" +
    "\n" +
    "          <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown1\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "              <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "               ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "               placeholder=\"{{ startPlaceholder || 'Select start date' }}\"\r" +
    "\n" +
    "               class=\"form-control width-field-large\"\r" +
    "\n" +
    "               value=\"{{ startDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "          </a>\r" +
    "\n" +
    "          <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "              <datetimepicker data-ng-model=\"startDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown1', minView: 'minute' }\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "          </ul>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div ng-class=\"['form-group ' + (options.formGroupClass || '')]\">\r" +
    "\n" +
    "    <div class=\"width-label\">\r" +
    "\n" +
    "      <label class=\"control-label ng-binding\" ng-class=\"options.labelClass || {}\">{{ endLabel }}</label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "      <div class=\"dropdown\">\r" +
    "\n" +
    "          <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown2\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "              <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "               ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "               placeholder=\"{{ endPlaceholder || 'Select end date' }}\"\r" +
    "\n" +
    "               class=\"form-control width-field-large\"\r" +
    "\n" +
    "               value=\"{{ endDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "          </a>\r" +
    "\n" +
    "          <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel2\">\r" +
    "\n" +
    "              <datetimepicker data-ng-model=\"endDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown2', minView: 'minute' }\" />\r" +
    "\n" +
    "          </ul>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"width-field-large\">\r" +
    "\n" +
    "          <span class=\"help-block color-red\" ng-if=\"endDate <= startDate\">\r" +
    "\n" +
    "              <span>{{ errorText || \"Start date/time must come before end date/time\" }}</span>\r" +
    "\n" +
    "          </span>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/components/single-upload.html',
    "<!-- Nc-Single-Upload -->\r" +
    "\n" +
    "<div class=\"image-drop-wrapper\" style=\"width:320px;\">\r" +
    "\n" +
    "  <input nv-file-select uploader=\"viewBag.uploader\" type=\"file\" ng-delegatee=\"viewBag.uploader\" onclick=\"this.value = null\"/>\r" +
    "\n" +
    "  <div nv-file-drop uploader=\"viewBag.uploader\" class=\"image-drop-zone\" style=\"width:320px; height:120px; overflow: hidden\">\r" +
    "\n" +
    "    <div class=\"image-drop-zone-text\">\r" +
    "\n" +
    "      <p><img ng-src=\"{{ viewBag.images[0].url }}\" style=\"width:100%; height: auto\"/></p>\r" +
    "\n" +
    "      <span ng-if=\"!viewBag.images || viewBag.images.length == 0\">Drag &amp; drop your shop logo here</span>\r" +
    "\n" +
    "      <h3 ng-if=\"viewBag.uploader.progress > 0 && viewBag.uploader.progress < 100\" class=\"color-grey\">{{ uploader.progress }} %</h3>\r" +
    "\n" +
    "      <h3 ng-if=\"viewBag.uploader.progress == 100 && !viewBag.images[0].url\" class=\"color-grey\"><img style=\"width:100%; height: auto\" src=\"/assets/img/loader.gif\"/></h3>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div ng-show=\"viewBag.uploader.isHTML5\" class=\"image-select-alternative-text\">\r" +
    "\n" +
    "    <span>Or</span>\r" +
    "\n" +
    "    <a href=\"javascript:;\" ng-delegate=\"viewBag.uploader\">\r" +
    "\n" +
    "      <span ng-if=\"viewBag.images.length === 0\">Select image from your computer</span>\r" +
    "\n" +
    "      <span ng-if=\"viewBag.images.length > 0\">Upload new image</span>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/partials/breadcrumb-title.html',
    "<div class=\"page-header\" ng-class=\"{{css}}\">\r" +
    "\n" +
    "    <h1 class=\"float-left page-header-title ah-breadcrumb\">\r" +
    "\n" +
    "    \t<a ng-repeat-start=\"t in title track by $index\" ng-href=\"{{link[$index]}}\" class=\"ah-breadcrumb-path\" ng-class=\"['ah-breadcrumb-idx-' + $index]\">{{t}}</a>\r" +
    "\n" +
    "    \t<span ng-if=\"!($index == 0 && title.length == 1)\" class=\"ah-breadcrumb-splitter\"></span>\r" +
    "\n" +
    "    </h1>\r" +
    "\n" +
    "    <div class=\"page-actions float-right\">\r" +
    "\n" +
    "    \t<ng-transclude></ng-transclude>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('nc/templates/partials/page-title.html',
    "<div class=\"page-header with-border\">\r" +
    "\n" +
    "    <h1 class=\"float-left page-header-title\" ng-bind-html=\"title\"></h1>\r" +
    "\n" +
    "    <span class=\"float-right page-header-action\" ng-transclude>\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "</div>"
  );
}]