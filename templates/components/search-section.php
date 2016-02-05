<?php
if (!isset($actions)) {
  $actions = ['Action', 'Another action'];
}
if (!isset($serach_placeholder)) {
  $serach_placeholder = "Search for Product SKU, Name, ...";
}
?>
<div class="row search-section-wrapper">
  <div class="search-section section-action">
    <div class="input-group">
      <div class="input-group-btn">
        <button type="button" class="body-dropdown-button btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="dropdown-text margin-right-10">- Choose Action -</span>
            <span class="caret margin-left-10"></span>
        </button>
        <ul class="dropdown-menu">
            <li><a ng-click="bulk.delete()">Delete </a></li>
            <li><a ng-click="bulk.hide()">Hide </a></li>
            <li><a ng-click="bulk.show()">Show </a></li>
        </ul>
      </div><!-- /btn-group -->
      <div class="input-group-btn">
        <button type="button" class="btn-white btn">
          <span class="button-text-blue">Confirm</span>
        </button>
      </div>
    </div>
  </div>
  <form ng-submit="applySearch()" class="search-section section-search">
    <div class="input-group">
        <input type="text" ng-model="searchText"
          class="form-control input-search-icon search-box" ng-model="searchText" placeholder="Search for Product SKU, Name, ..." aria-describedby="basic-addon2">
        <span class="input-group-btn">
          <button class="btn btn-white">Search</button>
        </span>
    </div>
  </form>
  <div class="search-section section-filter checkbox-wrapper">
    <input  ng-model="showOnOffStatus"type="checkbox" name="checkboxG1" id="checkboxG1" class="css-checkbox" />
    <label for="checkboxG1" class="css-label">
        Show Online/Offline Status
    </label>
  </div>
</div>
