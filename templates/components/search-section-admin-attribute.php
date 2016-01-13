<div class="row search-section-wrapper">
  <div class="search-section section-action">
    <div class="input-group">
      <div class="input-group-btn">
        <div class="dropdown-btn">
          <button type="button" class="body-dropdown-button btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
              <span class="dropdown-text margin-right-10 search-prodcut-text">- Choose Action -</span>
              <span class="caret margin-left-10"></span>
          </button>
          <ul class="dropdown-menu search-product-dropdown">
            <li><a href="#">Delete</a></li>
          </ul>
        </div>
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
      <input type="text" class="form-control input-search-icon search-box" ng-model="searchText" placeholder="Search" aria-describedby="basic-addon2">
      <span class="input-group-btn">
        <button class="btn btn-white">Search</button>
      </span>
    </div>
  </form>
</div>