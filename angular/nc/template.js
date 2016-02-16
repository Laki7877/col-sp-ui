/**
 * Generated by grunt-angular-templates 
 */
angular.module("nc").run(function($templateCache) {  'use strict';

  $templateCache.put('common/ncAction',
    "<a href=javascript:; uib-popover-template=\"'common/ncActionPopover'\" popover-placement=bottom popover-append-to-body=true popover-trigger=clickanystart nc-popover-any><i class=\"fa fa-gear color-dark-grey icon-size-20\"></i> <i class=\"fa fa-caret-down color-dark-grey\"></i></a>"
  );


  $templateCache.put('common/ncActionModal',
    "<div class=\"modal-header no-border\"><button type=button class=close aria-label=Close ng-click=no()><span class=padding-left-15 aria-hidden=true>&times;</span></button></div><div class=\"modal-body confirmation-modal no-margin\"><div class=row><div class=\"col-xs-12 margin-bottom-30\"><h2 class=\"font-size-20 text-centerx text-normal margin-bottom-20\">{{title}}</h2><div ng-bind-html=message></div></div><div class=\"confirmation-action no-margin\"><button class=\"btn btn-white\" ng-click=yes()>Yes</button> <button type=button class=\"btn btn-blue\" ng-click=no()>No</button></div></div></div>"
  );


  $templateCache.put('common/ncActionPopover',
    "<div ng-repeat=\"action in options\"><a ng-click=call(action)>{{action.name}}</a></div>"
  );


  $templateCache.put('common/ncAdvanceSearch',
    "<div class=row ng-show=open><div class=col-xs-12><div class=form-section><div class=form-section-header><h2>Advance Search</h2></div><div class=form-section-content><form name=form><div nc-template=common/input/form-group-with-label nc-template-form=form.ProductName nc-label=\"Product Name\" nc-template-options-path=searchForm/ProductName><input class=\"form-control width-field-large\" name=ProductName ng-model=formData.ProductName required></div><div nc-template=common/input/form-group-with-label nc-template-form=form nc-label=PID nc-template-options-path=searchForm/PID><input class=\"form-control width-field-large\" name=PID ng-model=formData.PID required></div><div nc-template=common/input/form-group-with-label nc-template-form=form nc-label=SKU nc-template-options-path=searchForm/SKU><input class=\"form-control width-field-large\" name=SKU ng-model=formData.SKU required></div><div nc-template=common/input/form-group-with-label nc-template-form=form nc-label=\"Brand Name / ID\" nc-template-options-path=searchForm/Brands><ui-select ng-model=formData.Brands name=Brands nc-tag-validator nc-max-tag-count=20 nc-max-tag-length=30 multiple tagging-tokens=,|ENTER tagging-label=\"\" nc-tag-field><ui-select-match placeholder=\"Separate tags with comma (or enter)\">{{$item}}</ui-select-match><ui-select-choices repeat=\"item in options.Brands\">{{item}}</ui-select-choices></ui-select></div><div nc-template=common/input/form-group-with-label nc-template-form=form nc-label=\"Global Category Name/ ID\" nc-template-options-path=searchForm/GlobalCategory><input class=\"form-control width-field-large\" name=GlobalCategory ng-model=formData.GlobalCategory required></div><div nc-template=common/input/form-group-with-label nc-template-form=form nc-label=\"Local Category Name/ ID\" nc-template-options-path=searchForm/LocalCategory><input class=\"form-control width-field-large\" name=LocalCategory ng-model=formData.LocalCategory required></div><div nc-template=common/input/form-group-with-label nc-template-form=form nc-label=\"Search Tag\" nc-template-options-path=searchForm/Tags><ui-select ng-model=formData.Brand name=Brand nc-tag-validator nc-max-tag-count=20 nc-max-tag-length=30 multiple tagging-tokens=,|ENTER tagging-label=\"\" nc-tag-field><ui-select-match placeholder=\"Separate tags with comma (or enter)\">{{$item}}</ui-select-match><ui-select-choices repeat=\"item in options.Tags\">{{item}}</ui-select-choices></ui-select></div><div nc-template=common/input/form-group-with-label-multiple nc-template-form=form nc-label=Price nc-template-options-path=searchForm/Price><div class=width-field-small-input><input name=UpdatedDt.From ng-model=\"formData.UpdatedDt.From\"></div><div class=width-label-extend>To</div><div class=width-field-small-input><input name=UpdatedDt.To ng-model=\"formData.UpdatedDt.To\"></div></div><div nc-template=common/input/form-group-with-label-multiple nc-template-form=form nc-label=\"\" nc-template-options-path=\"searchForm/\"><div class=width-field-small-input><input name=CreatedDt.From ng-model=\"formData.CreatedDt.From\"></div><div class=width-label-extend>To</div><div class=width-field-small-input><input name=CreatedDt.To ng-model=\"formData.CreatedDt.To\"></div></div><div nc-template=common/input/form-group-with-label-multiple nc-template-form=form nc-label=\"\" nc-template-options-path=\"searchForm/\"><div class=width-field-small-input><input name=UpdatedDt.From ng-model=\"formData.UpdatedDt.From\"></div><div class=width-label-extend>To</div><div class=width-field-small-input><input name=UpdatedDt.To ng-model=\"formData.UpdatedDt.To\"></div></div><div class=form-group><div class=width-label><label class=control-label></label></div><div class=button-size-normal><a class=\"button-size-normal btn btn-blue btn-width-xl\" ng-click=search()>Search</a></div><div class=button-size-normal><a class=\"button-size-normal margin-left-10 btn btn-white btn-width-xl\" ng-click=clear()>Clear</a></div></div></form></div></div></div></div>"
  );


  $templateCache.put('common/ncAdvanceSearchButton',
    "<div class=\"search-section advance-search\"><button class=\"btn btn-white-fluid border_blue\" type=button ng-click=toggle()>Advanced Search</button></div>"
  );


  $templateCache.put('common/ncAlert',
    "<div ng-show=alert.show uib-alert template-url=common/ncAlertTemplate type=\"{{ alert.type }}\" close=alert.close()><span ng-bind-html=alert.message></span></div>"
  );


  $templateCache.put('common/ncAlertTemplate',
    "<div class=alert ng-class=\"['alert-' + (type || 'warning')]\" class=\"alert alert-dismissable\" role=alert><span class=\"close color opacity-1\" ng-class=\"'color-' + (type || 'warning')\" aria-hidden=true ng-show=closeable ng-click=\"close({$event: $event})\">&times;</span><ng-transclude><ng-transclude></ng-transclude></div>"
  );


  $templateCache.put('common/ncBulk',
    "<div class=\"search-section section-action\"><div class=input-group><div class=input-group-btn uib-dropdown><button class=\"btn btn-default body-dropdown-button\" uib-dropdown-toggle><span class=\"dropdown-text margin-right-10 search-product-text\">{{ select.name }}</span> <span class=\"caret margin-left-10\"></span></button><ul uib-dropdown-menu role=menu class=search-product-dropdown><li ng-repeat=\"option in options\"><a ng-click=selectOption(option)>{{ option.name }}</a></li></ul></div><div class=input-group-btn><button class=\"btn-white-fluid btn\" ng-click=call()><span class=button-text-blue>Confirm ({{ model.length }})</span></button></div></div></div>"
  );


  $templateCache.put('common/ncBulkCheckbox',
    "<input type=checkbox ng-model=\"checkbox\">"
  );


  $templateCache.put('common/ncBulkModal',
    "<div class=\"modal-header no-border\"><button type=button class=close aria-label=Close ng-click=no()><span class=padding-left-15 aria-hidden=true>&times;</span></button></div><div class=\"modal-body confirmation-modal no-margin\"><div class=row><div class=\"col-xs-12 margin-bottom-30\"><h2 class=\"font-size-20 text-centerx text-normal margin-bottom-20\">{{title}}</h2><div ng-bind-html=message></div></div><div class=\"confirmation-action no-margin\"><button class=\"btn btn-white\" ng-click=yes()>Yes</button> <button type=button class=\"btn btn-blue\" ng-click=no()>No</button></div></div></div>"
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
    "<div class=filter-section><div class=filter-container><span>Filters:</span> <a class=filter-seperator ng-repeat=\"filter in filters\" ng-class=\"{'filter-active': model == filter.value }\" ng-click=select(filter.value)>{{ filter.name }}</a></div></div>"
  );


  $templateCache.put('common/ncImage',
    "<li class=list-item><div class=image-thumbs-actions><div class=image-thumbs-img-wrapper><img ng-src=\"{{ model.ImageUrlEn.length > 0 && model.ImageUrlEn  || '/assets/img/loader.gif' }}\"></div><div ng-if=\"actions.length > 0\" class=actions-wrapper ng-style=\"width: {{100 / actions.length}}%;\"><a ng-repeat=\"action in options.actions\" class=action ng-click=\"action.fn(model, parent, $index)\"><i class=fa ng-class={{action.icon}}></i></a></div></div></li>"
  );


  $templateCache.put('common/ncImageDropzone',
    "<div class=image-drop-wrapper><input nv-file-select=\"\" uploader=uploader type=file multiple><div nv-file-drop=\"\" uploader=uploader class=image-drop-zone><div class=image-drop-zone-text><p><i class=\"fa fa-image fa-3x color-theme\"></i></p><p>Drop images here</p><p><a ng-click=upload()>or select images</a></p></div></div></div>"
  );


  $templateCache.put('common/ncImageDropzoneInline',
    "<div class=drop-zone-container><div class=image-drop-wrapper><input type=\"file\"><div class=image-drop-zone><div class=image-drop-zone-text ng-bind-compile=content><? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management1\", 'texts' =>['<i class=\"fa fa-image fa-3x color-theme\"></i>', 'Drop images here', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management1\">or select images</a>']]) ?><? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class=\"fa fa-ban fa-3x color-dark-grey\"></i>', 'Cannot upload', 'Wait for Approval']]) ?><? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management3\", 'texts' =>['This product is already approved', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management3\">Click here to edit</a>']]) ?><? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management4\", 'texts' =>['<i class=\"fa fa-image fa-3x color-theme\"></i>', 'Drop images here', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management4\">or select images</a>']]) ?><? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class=\"fa fa-ban fa-3x color-dark-grey\"></i>', 'Cannot upload', 'Reach Max Photos']]) ?></div></div></div></div>"
  );


  $templateCache.put('common/ncImageDropzoneTemplate',
    "<div class=image-drop-wrapper><input nv-file-select uploader=uploader type=file multiple><div nv-file-drop uploader=uploader class=image-drop-zone><div class=image-drop-zone-text><p><i class=\"fa fa-image fa-3x color-theme\"></i></p><p>Drop images here</p><p><a ng-click=upload()>or select images</a></p></div></div></div>"
  );


  $templateCache.put('common/ncImageGallery',
    "<div class=margin-top-20><ul class=image-management-list><li class=list-item ng-repeat=\"image in images track by $index\"><div class=image-thumbs-actions><div class=image-thumbs-img-wrapper><img ng-src=\"{{ getSrc(image) }}\"></div><div class=actions-wrapper><a class=\"action {{image == null ? 'disabled' : ''}}\" ng-repeat=\"action in options.actions\" style=\"width: {{100 / options.actions.length }}%\" ng-click=\"call(action, image, model)\"><i class=\"fa {{action.icon}}\"></i></a></div></div></li></ul></div>"
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
    "<form ng-submit=callback() class=\"search-section section-search\"><div class=input-group><input class=\"form-control input-search-icon search-box\" ng-model=searchText placeholder={{placeholder}}> <span class=input-group-btn><button class=\"btn btn-white\">Search</button></span></div></form>"
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


  $templateCache.put('partials/page-title',
    "<div class=\"page-header with-border\"><h1 class=\"float-left page-header-title\">{{ option.title }}</h1><span class=\"float-right page-header-action\"><a ng-click=item.click ng-repeat=\"item in option.buttons\" class=\"btn margin-right-10\" ng-class=item.classes><span>{{ item.title }}</span></a></span></div>"
  );
 });