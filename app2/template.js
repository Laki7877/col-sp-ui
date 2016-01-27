/**
 * Generated by grunt-angular-templates 
 * Thu Jan 28 2016 01:31:39 GMT+0700 (SE Asia Standard Time)
 */
angular.module('ng').run(function($templateCache) {  'use strict';

  $templateCache.put('common/ncAction',
    "<a href=javascript:; uib-popover-template=\"'common/ncActionPopover'\" popover-placement=bottom popover-append-to-body=true popover-any><i class=\"fa fa-gear color-dark-grey icon-size-20\"></i> <i class=\"fa fa-caret-down color-dark-grey\"></i></a>"
  );


  $templateCache.put('common/ncActionPopover',
    "<div ng-repeat=\"action in options\"><a ng-click=call(action)>{{action.name}}</a></div>"
  );


  $templateCache.put('common/ncBulk',
    "<div class=\"search-section section-action\"><div class=input-group><div class=input-group-btn uib-dropdown><button class=\"btn btn-default body-dropdown-button\" uib-dropdown-toggle>{{ select.name }}</button><ul uib-dropdown-menu role=menu class=dropdown-menu-right><li ng-repeat=\"option in options\"><a ng-click=\"select = option\">{{ option.name }}</a></li></ul></div><div class=input-group-btn><button class=\"btn-white btn\" ng-click=call()><span class=button-text-blue>Confirm</span></button></div></div></div>"
  );


  $templateCache.put('common/ncBulkCheckbox',
    "<input type=checkbox ng-model=\"checkbox\">"
  );


  $templateCache.put('common/ncEmpty',
    "<div class=\"local-category-page margin-bottom-20\"><div class=\"local-category-empty-section margin-top-20\"><span><span class=zero-category-image></span></span> <span class=local-category-empty-text>{{ message }}</span></div></div>"
  );


  $templateCache.put('common/ncFilter',
    "<div class=filter-section><div class=filter-container><span>Filters:</span> <a class=filter-seperator ng-repeat=\"filter in filters\" ng-class=\"{'filter-active': model == filter.value }\" ng-click=select(filter.value)>{{ filter.name }}</a></div></div>"
  );


  $templateCache.put('common/ncLoading',
    "<div class=\"empty-section margin-top-20 margin-bottom-20\"><span><img class=loading-img src=\"/assets/img/loader.gif\"></span>{{ message }}</div>"
  );


  $templateCache.put('common/ncPagination',
    "<div class=page-navigation><span><a ng-click=nextPage(-1)><i class=\"fa fa-chevron-left\" ng-class=\"{'grey-chevron': page() == 1, 'blue-chevron' : page() > 1}\"></i></a> <span>Page {{ page() }} of {{ totalPage() }}</span> <a ng-click=nextPage(1)><i class=\"fa fa-chevron-right padding-right-15\" ng-class=\"{'grey-chevron': page() == totalPage(), 'blue-chevron' : page() < totalPage() }\"></i></a> <span class=view-page-separator>View per page</span><div class=btn-group uib-dropdown><button type=button class=\"btn btn-default\">{{ pageSize() }}</button> <button type=button class=\"btn btn-default\" uib-dropdown-toggle><span class=caret></span> <span class=sr-only>Toggle Dropdown</span></button><ul uib-dropdown-menu role=menu class=dropdown-menu-right><li ng-repeat=\"size in paginationOptions\"><a ng-click=setPageSize(size)>{{size}}</a></li></ul></div></span></div>"
  );


  $templateCache.put('common/ncSearch',
    "<form ng-submit=callback() class=\"search-section section-search\"><div class=input-group><input class=\"form-control input-search-icon search-box\" ng-model=searchText ng-placeholder={{placeholder}}> <span class=input-group-btn><button class=\"btn btn-white\">Search</button></span></div></form>"
  );


  $templateCache.put('common/ncTable',
    "<div class=table-section><div ng-show=!loading ng-transclude></div><div nc-loading={{options.loadingMessage}} ng-show=loading></div><div nc-empty={{options.searchEmptyMessage}} ng-show=\"!loading && model.data.length == 0 && searching\"></div><div nc-empty={{options.emptyMessage}} ng-show=\"!loading && model.data.length == 0 && !searching\"></div></div>"
  );


  $templateCache.put('common/ncTableSort',
    "<a class=header-link ng-click=click()><span ng-class=\"{ 'active-underline' : isCurrent() }\" ng-transclude></span></a> <i class=fa ng-class=\"{ \r" +
    "\n" +
    "'fa fa-caret-down' : isCurrent() && direction, \r" +
    "\n" +
    "'fa fa-caret-up' : isCurrent() && !direction, \r" +
    "\n" +
    "'fa fa-caret-down color-grey' : !isCurrent() }\"></i>"
  );
 })