<?php
if (!isset($actions)) {
  $actions = ['Action', 'Another action'];
}
if (!isset($serach_placeholder)) {
  $serach_placeholder = "Search for Product SKU, Name, ...";
}
?>
<div class="row search-section-wrapper">
  <div class="search-section section-search">
    <div class="input-group">
      <input type="text" class="form-control input-search-icon search-box" placeholder="<?= $serach_placeholder ?>" aria-describedby="basic-addon2">
      <span class="input-group-btn">
        <button class="btn btn-white" type="button">Search</button>
      </span>
    </div>
  </div>
  <div class="page-navigation margin-right-15">
    <span>
      <i class="fa fa-chevron-left grey-chevron"></i>
      <span> Page 1 of 1</span>
      <i class="fa fa-chevron-right padding-right-15 blue-chevron"></i>
      <span class="view-page-separator">View per page</span>
      <!-- Split button -->
      <div class="btn-group dropdown-btn">
        <button type="button" class="btn btn-default dropdown-text">5</button>
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">6</a></li>
          <li><a href="#">7</a></li>
          <li><a href="#">8</a></li>
          <li><a href="#">9</a></li>
        </ul>
      </div>
    </span>
  </div>

</div>
