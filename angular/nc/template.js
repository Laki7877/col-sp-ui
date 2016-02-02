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


  $templateCache.put('common/ncAlert',
    "<div ng-show=alert.show uib-alert template-url=common/ncAlertTemplate type=\"{{ alert.type }}\" close=alert.close()><span ng-bind-html=alert.message></span></div>"
  );


  $templateCache.put('common/ncAlertTemplate',
    "<div id=alert class=alert ng-class=\"['alert-' + (type || 'warning')]\" class=\"alert alert-dismissable\" role=alert><span class=\"close color opacity-1\" ng-class=\"'color-' + (type || 'warning')\" aria-hidden=true ng-show=closeable ng-click=\"close({$event: $event})\">&times;</span><ng-transclude><ng-transclude></ng-transclude></div>"
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


  $templateCache.put('common/ncFilter',
    "<div class=filter-section><div class=filter-container><span>Filters:</span> <a class=filter-seperator ng-repeat=\"filter in filters\" ng-class=\"{'filter-active': model == filter.value }\" ng-click=select(filter.value)>{{ filter.name }}</a></div></div>"
  );


  $templateCache.put('common/ncImageGallery',
    "<ul class=image-management-list><li class=list-item ng-repeat=\"image in model track by $index\"><div><div class=image-thumbs-actions><div class=image-thumbs-img-wrapper><img ng-src=\"{{ image.ImageUrlEn.length > 0 && image.ImageUrlEn  || '/assets/img/loader.gif' }}\"></div><div ng-if=\"actions.length > 0\" class=actions-wrapper ng-style=\"width: {{100 / actions.length}}%;\"><a ng-repeat=\"action in options.actions\" class=action ng-click=\"action.fn(image, model, $index)\"><i class=fa ng-class={{action.iconClass}}></i></a></div></div></div></li></ul>"
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
    "<a class=header-link ng-click=click()><span ng-class=\"{ 'active-underline' : isCurrent() }\" ng-transclude></span></a> <i class=fa ng-class=\"{ \n" +
    "'fa fa-caret-down' : isCurrent() && direction, \n" +
    "'fa fa-caret-up' : isCurrent() && !direction, \n" +
    "'fa fa-caret-down color-grey' : !isCurrent() }\" ng-click=click()></i>"
  );
 });