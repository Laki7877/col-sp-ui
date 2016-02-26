<?php
if (!isset($actions)) {
  $actions = ['Action', 'Another action'];
}
if (!isset($serach_placeholder)) {
  $serach_placeholder = "Search for Product SKU, Name, ...";
}

if(!isset($optional_button_name)) {
  $optional_button_name = 'Advance Search';
}

?>
<div class="row search-section-wrapper">
  <div class="search-section section-action">
    <div class="input-group">
      <div class="input-group-btn">
        <div class="dropdown-btn">
          <button type="button" class="body-dropdown-button btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="dropdown-text margin-right-10 search-prodcut-text">- Choosen Action -</span>
              <span class="caret margin-left-10"></span>
          </button>
          <ul class="dropdown-menu search-product-dropdown">
            <? foreach ($actions as $action): ?>
              <li><a href="#"><?= $action ?></a></li>
            <? endforeach ?>
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
  <div class="search-section section-search">
    <div class="input-group">
      <input type="text" class="form-control input-search-icon search-box" placeholder="<?= $serach_placeholder ?>" aria-describedby="basic-addon2">
      <span class="input-group-btn">
        <button class="btn btn-white" type="button">Search</button>
      </span>
    </div>
  </div>
  <div class="search-section advance-search <?=$optional_class?>">
    <button class="btn btn-white <?=$button_optional_class?>" type="button"><?=$optional_button_name?></button>
  </div>
  <!-- <div class="search-section section-filter checkbox-wrapper <?=$optional_class?>">
    <input type="checkbox" name="checkboxG1" id="checkboxG1" class="css-checkbox" />
    <label for="checkboxG1" class="css-label">Show Online/Offline Status</label>
  </div> -->
</div>
