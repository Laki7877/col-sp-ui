/**
 * Generated by grunt-angular-templates 
 */
angular.module("nc").run(function($templateCache) {  'use strict';

  $templateCache.put('addProducts/inner-tab-breadcrumb',
    "<div><div class=\"alert alert-yellow\" ng-if=\"formData.Status == 'WA'\">This product is waiting for approval from the admin. You cannot edit it now.</div><div class=margin-bottom-20><span>Global Category:</span> <span>{{ breadcrumbs.globalCategory }}</span></div></div>"
  );


  $templateCache.put('common/ncAction',
    "<a class=action-gear href=javascript:; uib-popover-template=\"'common/ncActionPopover'\" popover-placement=bottom popover-append-to-body=true popover-trigger=outsideClick class=action-gear><i class=\"fa fa-gear color-dark-grey icon-size-20\"></i> <i class=\"fa fa-caret-down color-dark-grey\"></i></a>"
  );


  $templateCache.put('common/ncActionModal',
    "<div class=\"modal-header no-border\"><button type=button class=close aria-label=Close ng-click=no()><span class=padding-left-15 aria-hidden=true>&times;</span></button></div><div class=\"modal-body confirmation-modal no-margin\"><div class=row><div class=\"col-xs-12 margin-bottom-30\"><h2 class=\"font-size-20 text-centerx text-normal margin-bottom-20\">{{title}}</h2><div ng-bind-html=message></div></div><div class=\"confirmation-action no-margin\"><button type=button class=\"btn btn-white\" ng-click=no()>{{btnNo}}</button> <button type=button class=\"btn {{btnClass}}\" ng-click=yes()>{{btnYes}}</button></div></div></div>"
  );


  $templateCache.put('common/ncActionPopover',
    "<div ng-repeat=\"action in options\"><a ng-click=call(action)>{{action.name}}</a></div>"
  );


  $templateCache.put('common/ncAdvanceSearch',
    "<div class=\"row margin-top-30\" ng-show=open><div class=col-xs-12><div class=form-section><div class=form-section-header><h2>Advance Search</h2></div><div class=form-section-content><form name=form class=ah-form novalidate><div nc-template=common/input/form-group-with-label nc-template-form=form.ProductName nc-label=\"Product Name\" nc-template-options-path=searchForm/ProductName><input class=\"form-control width-field-normal\" name=ProductName ng-model=formData.ProductName required></div><div nc-template=common/input/form-group-with-label nc-template-form=form.Pid nc-label=PID nc-template-options-path=searchForm/Pid><input class=\"form-control width-field-normal\" name=Pid ng-model=formData.Pid required></div><div nc-template=common/input/form-group-with-label nc-template-form=form.Sku nc-label=SKU nc-template-options-path=searchForm/Sku><input class=\"form-control width-field-normal\" name=Sku ng-model=formData.Sku required></div><div nc-template=common/input/form-group-with-label nc-template-form=form.Brand nc-label=\"Brand Name\" nc-template-options-path=searchForm/Brands><ui-select ng-model=formData.Brands name=Brands nc-tag-validator multiple tagging-tokens=,|ENTER tagging-label=\"\" nc-tag-field><ui-select-match>{{$item.BrandNameEn}}</ui-select-match><ui-select-choices repeat=\"item in options.Brands | filter:{BrandNameEn: $select.search} track by $index\">{{item.BrandNameEn}}</ui-select-choices></ui-select></div><div nc-template=common/input/form-group-with-label nc-template-form=form.GlobalCategories nc-label=\"Global Category Name\" nc-template-options-path=searchForm/GlobalCategories><nc-breadcrumb-select name=GlobalCategories nc-model=formData.GlobalCategories nc-breadcrumb-select-tree=options.GlobalCategories></nc-breadcrumb-select></div><div nc-template=common/input/form-group-with-label nc-template-form=form.LocalCategories nc-label=\"Local Category Name\" nc-template-options-path=searchForm/LocalCategories ng-show=!options.Admin><nc-breadcrumb-select name=LocalCategories nc-model=formData.LocalCategories nc-breadcrumb-select-tree=options.LocalCategories></nc-breadcrumb-select></div><div nc-template=common/input/form-group-with-label nc-template-form=form.Tags nc-label=\"Search Tag\" nc-template-options-path=searchForm/Tags class=ui-select-dropdown-hide><ui-select ng-model=formData.Tags name=Tags nc-tag-validator tagging tagging-label=\"\" multiple nc-tag-field><ui-select-match>{{$item}}</ui-select-match><ui-select-choices repeat=\"item in options.Tags\">{{item}}</ui-select-choices></ui-select></div><div nc-template=common/input/form-group-with-label-multiple nc-template-form=form.Price nc-label=\"Sale Price\" nc-template-options-path=searchForm/Price><div class=width-field-small-input><input name=Price ng-maxnumber={{formData.PriceTo}} ng-model=formData.PriceFrom class=form-control ng-pattern-restrict=\"^[0-9]*(\\.[0-9]{0,2})?$\"></div><div class=\"width-label-extend text-center\"><label class=control-label>To</label></div><div class=width-field-small-input><input ng-model=formData.PriceTo class=form-control ng-pattern-restrict=\"^[0-9]*(\\.[0-9]{0,2})?$\"></div></div><div nc-template=common/input/form-group-with-label-multiple nc-template-form=form.CreatedDate nc-label=\"Created Date\" nc-template-options-path=searchForm/CreatedDate><div class=width-field-small-input><div class=dropdown><a class=dropdown-toggle id=dropdown role=button data-toggle=dropdown data-target=# href=#><input readonly style=background-color:white class=\"input-icon-calendar form-control\" value=\"{{ formData.CreatedDtFrom | date: 'dd/MM/yy HH:mm' }}\"></a><ul class=dropdown-menu role=menu aria-labelledby=dLabel><datetimepicker name=CreatedDate ng-date-before={{formData.CreatedDtTo}} data-ng-model=formData.CreatedDtFrom data-datetimepicker-config=\"{ dropdownSelector: '#dropdown', minView: 'hour' }\"></ul></div></div><div class=\"width-label-extend text-center\"><label class=control-label>To</label></div><div class=width-field-small-input><div class=dropdown><a class=dropdown-toggle id=dropdown2 role=button data-toggle=dropdown data-target=# href=#><input readonly style=background-color:white class=\"input-icon-calendar form-control\" value=\"{{ formData.CreatedDtTo | date: 'dd/MM/yy HH:mm' }}\"></a><ul class=dropdown-menu role=menu aria-labelledby=dLabel><datetimepicker data-ng-model=formData.CreatedDtTo data-datetimepicker-config=\"{ dropdownSelector: '#dropdown2', minView: 'hour' }\"></ul></div></div></div><div nc-template=common/input/form-group-with-label-multiple nc-template-form=form.ModifiedDate nc-label=\"Modified Date\" nc-template-options-path=searchForm/ModifiedDate><div class=width-field-small-input><div class=dropdown><a class=dropdown-toggle id=dropdown3 role=button data-toggle=dropdown data-target=# href=#><input readonly style=background-color:white class=\"input-icon-calendar form-control\" value=\"{{ formData.ModifyDtFrom | date: 'dd/MM/yy HH:mm' }}\"></a><ul class=dropdown-menu role=menu aria-labelledby=dLabel><datetimepicker data-ng-model=formData.ModifyDtFrom name=ModifiedDate ng-date-before={{formData.ModifiedDtTo}} data-datetimepicker-config=\"{ dropdownSelector: '#dropdown3', minView: 'hour' }\"></ul></div></div><div class=\"width-label-extend text-center\"><label class=control-label>To</label></div><div class=width-field-small-input><div class=dropdown><a class=dropdown-toggle id=dropdown4 role=button data-toggle=dropdown data-target=# href=#><input readonly style=background-color:white class=\"input-icon-calendar form-control\" value=\"{{ formData.ModifyDtTo | date: 'dd/MM/yy HH:mm' }}\"></a><ul class=dropdown-menu role=menu aria-labelledby=dLabel><datetimepicker data-ng-model=formData.ModifyDtTo data-datetimepicker-config=\"{ dropdownSelector: '#dropdown4', minView: 'hour' }\"></ul></div></div></div><div class=form-group><div class=width-label><label class=control-label></label></div><div class=button-size-normal><a class=\"button-size-normal btn btn-blue btn-width-xl\" ng-click=search()>Search</a></div><div class=button-size-normal><a class=\"button-size-normal margin-left-10 btn btn-white btn-width-xl\" ng-click=clear()>Clear</a></div></div></form></div></div></div></div>"
  );


  $templateCache.put('common/ncAdvanceSearchButton',
    "<div class=search-section-item><button class=\"btn btn-default btn-toggle {{model ? 'active' : ''}}\" type=button ng-click=toggle()>Advanced Search</button></div>"
  );


  $templateCache.put('common/ncAlert',
    "<div ng-show=alert.show uib-alert template-url=common/ncAlertTemplate type=\"{{ alert.type }}\" close=alert.close()><span ng-bind-html=alert.message></span></div>"
  );


  $templateCache.put('common/ncAlertTemplate',
    "<div class=alert ng-class=\"['alert-' + (type || 'warning')]\" class=\"alert alert-dismissable\" role=alert><span class=\"close color opacity-1\" ng-class=\"'color-' + (type || 'warning')\" aria-hidden=true ng-show=closeable ng-click=\"close({$event: $event})\">&times;</span><ng-transclude><ng-transclude></ng-transclude></div>"
  );


  $templateCache.put('common/ncBreadcrumbSelect',
    "<ui-select name={{name}} ng-model=model.ptr nc-tag-validator nc-max-tag-count={{options.tagCount}} multiple><ui-select-match><span ng-bind-html=$item.item[options.nameKey]></span></ui-select-match><ui-select-choices repeat=\"value in searchable | filter: { name: $select.search } | limitTo: options.limit track by $index\"><div ng-bind-html=\"value.displayName | highlight: $select.search | replace: encodedSeparator: options.seperator\"></div></ui-select-choices></ui-select>"
  );


  $templateCache.put('common/ncBulk',
    "<div class=\"btn-group search-section-item\" role=group><div class=btn-group role=group><button type=button class=\"btn btn-default dropdown-toggle bulk-action-dropdown\" data-toggle=dropdown aria-haspopup=true aria-expanded=false uib-dropdown-toggle><span>{{ select.name }}</span> <span class=caret></span></button><ul uib-dropdown-menu role=menu class=dropdown-menu><li ng-repeat=\"option in options\"><a ng-click=selectOption(option)>{{ option.name }}</a></li></ul></div><button type=button class=\"btn btn-default btn-action\" ng-click=call()>Confirm <span ng-show=\"model.length > 0\">({{ model.length }})</span></button></div>"
  );


  $templateCache.put('common/ncBulkCheckbox',
    "<input type=checkbox ng-model=\"checkbox\">"
  );


  $templateCache.put('common/ncBulkModal',
    "<div class=\"modal-header no-border\"><button type=button class=close aria-label=Close ng-click=no()><span class=padding-left-15 aria-hidden=true>&times;</span></button></div><div class=\"modal-body confirmation-modal no-margin\"><div class=row><div class=\"col-xs-12 margin-bottom-30\"><h2 class=\"font-size-20 text-centerx text-normal margin-bottom-20\">{{title}}</h2><div ng-bind-html=message></div></div><div class=\"confirmation-action no-margin\"><button type=button class=\"btn btn-white\" ng-click=no()>{{btnNo}}</button> <button type=button class=\"btn {{btnClass}}\" ng-click=yes()>{{btnYes}}</button></div></div></div>"
  );


  $templateCache.put('common/ncEmpty',
    "<div class=\"local-category-page margin-bottom-20\"><div class=\"local-category-empty-section margin-top-20\"><span><span class=zero-category-image></span></span> <span class=local-category-empty-text>{{ message }}</span></div></div>"
  );


  $templateCache.put('common/ncEye',
    "<a ng-click=_toggle()><i ng-class=\"{'fa fa-eye-slash color-grey eye-icon' : !model,\r" +
    "\n" +
    "                            'fa fa-eye color-dark-grey eye-icon' : model}\"></i></a>"
  );


  $templateCache.put('common/ncFilter',
    "<div class=filter-section><div class=filter-container><span>Filters:</span> <a class=filter-seperator ng-repeat=\"filter in filters\" ng-class=\"{'filter-active': model == filter.value }\" ng-click=select(filter.value)>{{ filter.name }}</a> <span ng-transclude></span></div></div>"
  );


  $templateCache.put('common/ncImage',
    "<li class=list-item><div class=image-thumbs-actions><div class=image-thumbs-img-wrapper><img ng-src=\"{{ model.ImageUrlEn.length > 0 && model.ImageUrlEn  || '/assets/img/loader.gif' }}\"></div><div ng-if=\"actions.length > 0\" class=actions-wrapper ng-style=\"width: {{100 / actions.length}}%;\"><a ng-repeat=\"action in options.actions\" class=action ng-click=\"action.fn(model, parent, $index)\"><i class=fa ng-class={{action.icon}}></i></a></div></div></li>"
  );


  $templateCache.put('common/ncImageDropzone',
    "<div class=image-drop-wrapper><input nv-file-select=\"\" uploader=uploader accept=\".png, .jpg, .jpeg\" type=file multiple><div nv-file-drop=\"\" uploader=uploader class=image-drop-zone><div class=image-drop-zone-text><p><i class=\"fa fa-image fa-3x color-theme\"></i></p><p>Drop images here</p><p><a ng-click=upload()>or select images</a></p></div></div></div>"
  );


  $templateCache.put('common/ncImageDropzoneInline',
    "<div class=drop-zone-container><div class=image-drop-wrapper><input type=\"file\"><div class=image-drop-zone><div class=image-drop-zone-text ng-bind-compile=content><? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management1\", 'texts' =>['<i class=\"fa fa-image fa-3x color-theme\"></i>', 'Drop images here', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management1\">or select images</a>']]) ?><? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class=\"fa fa-ban fa-3x color-dark-grey\"></i>', 'Cannot upload', 'Wait for Approval']]) ?><? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management3\", 'texts' =>['This product is already approved', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management3\">Click here to edit</a>']]) ?><? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management4\", 'texts' =>['<i class=\"fa fa-image fa-3x color-theme\"></i>', 'Drop images here', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management4\">or select images</a>']]) ?><? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class=\"fa fa-ban fa-3x color-dark-grey\"></i>', 'Cannot upload', 'Reach Max Photos']]) ?></div></div></div></div>"
  );


  $templateCache.put('common/ncImageDropzoneTemplate',
    "<div class=image-drop-wrapper><input nv-file-select uploader=uploader type=file multiple><div nv-file-drop uploader=uploader class=image-drop-zone><div class=image-drop-zone-text><p><i class=\"fa fa-image fa-3x color-theme\"></i></p><p>Drop images here</p><p><a ng-click=upload()>or select images</a></p></div></div></div>"
  );


  $templateCache.put('common/ncImageGallery',
    "<div><p class=featured-image-wrapper>Featured Image</p><ul class=image-management-list><li class=list-item ng-repeat=\"image in images track by $index\"><div class=image-thumbs-actions><div class=image-thumbs-img-wrapper><img ng-src=\"{{ getSrc(image) }}\"></div><div class=actions-wrapper><a class=\"action {{ isDisabled(image) ? 'disabled' : ''}}\" ng-repeat=\"action in options.actions\" style=\"width: {{100 / options.actions.length }}%\" ng-click=\"call(action, image, model)\"><i class=\"fa {{action.icon}}\"></i></a></div></div></li></ul></div>"
  );


  $templateCache.put('common/ncLoading',
    "<div class=\"empty-section margin-top-20 margin-bottom-20\"><span><img class=loading-img src=\"/assets/img/loader.gif\"></span>{{ message }}</div>"
  );


  $templateCache.put('common/ncLoadingSmall',
    "<img src=/assets/img/loader.gif width=40><small>{{ message }}</small>"
  );


  $templateCache.put('common/ncPagination',
    "<div class=page-navigation><span><a ng-click=nextPage(-1)><i class=\"fa fa-chevron-left\" ng-class=\"{'grey-chevron': page() <= 1, 'blue-chevron' : page() > 1}\"></i></a> <span>Page {{ page() }} of {{ totalPage() }}</span> <a ng-click=nextPage(1)><i class=\"fa fa-chevron-right padding-right-15\" ng-class=\"{'grey-chevron': page() >= totalPage(), 'blue-chevron' : page() < totalPage() }\"></i></a> <span class=\"view-page-separator margin-right-10\">View per page</span><div class=btn-group uib-dropdown><button type=button class=\"btn btn-default\">{{ pageSize() }}</button> <button type=button class=\"btn btn-default\" uib-dropdown-toggle><span class=caret></span> <span class=sr-only>Toggle Dropdown</span></button><ul uib-dropdown-menu role=menu class=dropdown-menu-right><li ng-repeat=\"size in paginationOptions\"><a ng-click=setPageSize(size)>{{size}}</a></li></ul></div></span></div>"
  );


  $templateCache.put('common/ncSearch',
    "<div class=\"input-group search-section-item\"><form ng-submit=callback()><div class=\"input-group search-box\"><input class=\"form-control input-search-icon\" ng-model=searchText placeholder={{placeholder}}> <span class=input-group-btn><button class=\"btn btn-default btn-action\">Search</button></span></div></form></div>"
  );


  $templateCache.put('common/ncTable',
    "<div class=table-section><div ng-show=\"!loading && model.data.length != 0\" ng-transclude></div><div nc-loading={{options.loadingMessage}} ng-show=loading></div><div nc-empty={{options.searchEmptyMessage}} ng-show=\"!loading && model.data.length == 0 && searching\"></div><div nc-empty={{options.emptyMessage}} ng-show=\"!loading && model.data.length == 0 && !searching\"></div></div>"
  );


  $templateCache.put('common/ncTableSort',
    "<a class=header-link ng-click=click()><span ng-class=\"{ 'active-underline' : isCurrent() }\" ng-transclude></span></a> <i class=fa ng-class=\"{ \r" +
    "\n" +
    "'fa fa-caret-down' : isCurrent() && direction, \r" +
    "\n" +
    "'fa fa-caret-up' : isCurrent() && !direction, \r" +
    "\n" +
    "'fa fa-caret-down color-grey' : !isCurrent() }\" ng-click=click()></i>"
  );


  $templateCache.put('common/ncTreeSelect',
    "<div class=category-section-border-box><div class=category-header>{{title}}</div><div class=\"category-content no-padding\"><ul ng-repeat=\"column in columns.list() track by $index\" ng-class=\"{'empty-column': column.list().length <= 0 }\" class=content-column><li ng-repeat=\"$item in column.list() track by $index\" ng-class=\"{'category-active' : $index == column.active() }\" ng-click=setModel($item)>{{getContent($item)}}</li></ul></div></div>"
  );


  $templateCache.put('components/date-range-inline',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\"><div class=width-label><label class=control-label ng-class=\"options.labelClass || {}\">{{ label }}</label></div><div><div ng-class=\"['width-field-' + (options.inputSize || 'small-input')]\" class=input-with-unit><div class=dropdown><a class=dropdown-toggle id=date_range_vertical_dropdown1 role=button data-toggle=dropdown data-target=# href=#><input readonly style=background-color:white ng-class=\"{'has-error': endDate <= startDate }\" placeholder=\"{{ startPlaceholder || 'Select start date' }}\" class=\"form-control width-field-large\" value=\"{{ startDate | date: 'dd/MM/yy HH:mm' }}\"></a><ul class=dropdown-menu role=menu aria-labelledby=dLabel><datetimepicker data-ng-model=startDate data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown1', minView: 'minute' }\"></ul></div></div><div class=\"width-label-extend text-center\"><label class=control-label>To</label></div><div ng-class=\"['width-field-' + (options.inputSize || 'small-input')]\" class=input-with-unit><div class=dropdown><a class=dropdown-toggle id=date_range_vertical_dropdown2 role=button data-toggle=dropdown data-target=# href=#><input readonly style=background-color:white ng-class=\"{'has-error': endDate <= startDate }\" placeholder=\"{{ endPlaceholder || 'Select end date' }}\" class=\"form-control width-field-large\" value=\"{{ endDate | date: 'dd/MM/yy HH:mm' }}\"></a><ul class=dropdown-menu role=menu aria-labelledby=dLabel2><datetimepicker data-ng-model=endDate data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown2', minView: 'minute' }\"></ul></div><div class=width-field-large><span class=\"help-block color-red\" ng-if=\"endDate <= startDate\"><span>{{ errorText || \"Start date/time must come before end date/time\" }}</span></span></div></div></div></div>"
  );


  $templateCache.put('components/date-range-vertical',
    "<div><div ng-class=\"['form-group ' + (options.formGroupClass || '')]\"><div class=width-label><label class=\"control-label ng-binding\" ng-class=\"options.labelClass || {}\">{{ startLabel }}</label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=input-with-unit><div class=dropdown><a class=dropdown-toggle id=date_range_vertical_dropdown1 role=button data-toggle=dropdown data-target=# href=#><input readonly style=background-color:white ng-class=\"{'has-error': endDate <= startDate }\" placeholder=\"{{ startPlaceholder || 'Select start date' }}\" class=\"form-control width-field-large\" value=\"{{ startDate | date: 'dd/MM/yy HH:mm' }}\"></a><ul class=dropdown-menu role=menu aria-labelledby=dLabel><datetimepicker data-ng-model=startDate data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown1', minView: 'minute' }\"></ul></div></div></div><div ng-class=\"['form-group ' + (options.formGroupClass || '')]\"><div class=width-label><label class=\"control-label ng-binding\" ng-class=\"options.labelClass || {}\">{{ endLabel }}</label></div><div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=input-with-unit><div class=dropdown><a class=dropdown-toggle id=date_range_vertical_dropdown2 role=button data-toggle=dropdown data-target=# href=#><input readonly style=background-color:white ng-class=\"{'has-error': endDate <= startDate }\" placeholder=\"{{ endPlaceholder || 'Select end date' }}\" class=\"form-control width-field-large\" value=\"{{ endDate | date: 'dd/MM/yy HH:mm' }}\"></a><ul class=dropdown-menu role=menu aria-labelledby=dLabel2><datetimepicker data-ng-model=endDate data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown2', minView: 'minute' }\"></ul></div><div class=width-field-large><span class=\"help-block color-red\" ng-if=\"endDate <= startDate\"><span>{{ errorText || \"Start date/time must come before end date/time\" }}</span></span></div></div></div></div>"
  );


  $templateCache.put('components/single-upload',
    "<div class=image-drop-wrapper style=width:320px><input nv-file-select uploader=viewBag.uploader type=file ng-delegatee=viewBag.uploader onclick=\"this.value = null\"><div nv-file-drop uploader=viewBag.uploader class=image-drop-zone style=\"width:320px; height:120px; overflow: hidden\"><div class=image-drop-zone-text><p><img ng-src=\"{{ viewBag.images[0].url }}\" style=\"width:100%; height: auto\"></p><span ng-if=\"!viewBag.images || viewBag.images.length == 0\">Drag &amp; drop your shop logo here</span><h3 ng-if=\"viewBag.uploader.progress > 0 && viewBag.uploader.progress < 100\" class=color-grey>{{ uploader.progress }} %</h3><h3 ng-if=\"viewBag.uploader.progress == 100 && !viewBag.images[0].url\" class=color-grey><img style=\"width:100%; height: auto\" src=\"/assets/img/loader.gif\"></h3></div></div><div ng-show=viewBag.uploader.isHTML5 class=image-select-alternative-text><span>Or</span> <a href=javascript:; ng-delegate=viewBag.uploader><span ng-if=\"viewBag.images.length === 0\">Select image from your computer</span> <span ng-if=\"viewBag.images.length > 0\">Upload new image</span></a></div></div>"
  );


  $templateCache.put('partials/page-title',
    "<div class=\"page-header with-border\"><h1 class=\"float-left page-header-title\">{{ title }}</h1><span class=\"float-right page-header-action\"><ng-transclude></ng-transclude></span></div>"
  );
 });