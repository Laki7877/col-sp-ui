/**
 * Generated by grunt-angular-templates 
 */
angular.module("umeSelect").run(function($templateCache) {  'use strict';

  $templateCache.put('ume/choicelist',
    "<div class=\"selectize-dropdown single demo-default\" style=\"width: 520px\"><div class=selectize-dropdown-content><div data-value=bolts data-selectable=\"\" class=option>China</div></div></div>"
  );


  $templateCache.put('ume/single',
    "<div class=\"selectize-control single\"><div class=\"selectize-input items has-options full has-items\" ng-class=\"{'ume-search' : !loading, 'ume-loading': loading, 'input-active': focused}\"><input ng-focus=focus() ume-focus=focusObtained autocomplete=off tabindex=\"\" ng-model=searchText placeholder=\"{{ placeholder }}\" ng-show=focused style=\"width: 100%\"> <button ng-show=!focused class=ume-btn ng-class=\"{'ume-placeholder': !model }\" aria-hidden=true ng-click=focus(true)>{{ model.ProductNameEn || placeholder }}</button></div><div class=\"selectize-dropdown single demo-default\" ng-show=\"searchText.length > 0 && focused\" style=\"width: 100%\"><div class=selectize-dropdown-content><div data-group=Climbing class=optgroup><div ng-click=pickItem(item) data-value=bolts data-selectable ng-repeat=\"item in choices\" class=option>{{ item.ProductNameEn }}</div><div ng-if=\"choices.length == 0 && notFound && !loading\" data-selectable class=option>No result for search term '{{ searchText }}'</div></div></div></div></div>"
  );


  $templateCache.put('ume/together',
    ""
  );
 });