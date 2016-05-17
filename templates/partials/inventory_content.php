<div id="inventory-tab-content">

	<div class="row">
    <div class="col-xs-12">
      <div class="form-section">
        <div class="form-section-header"><h2>Advanced Search</h2></div>
        <div class="form-section-content">
          <? $this->insert('components/forms/input-text-with-label', ["label" => "Product Name", ]) ?>
          <? $this->insert('components/forms/input-text-with-label', ["label" => "PID" ]) ?>
          <? $this->insert('components/forms/dropdown_tags', ["label" => "Brand Name", "default_choices" => ["Gulp", "Adico"], "choices" => ["Gulp", "Adico","Pascal"] ]) ?>
          <? $this->insert('components/forms/input-text-with-label', ["label" => "Global Category Name" ]) ?>
          <? $this->insert('components/forms/input-text-with-label', ["label" => "Local Cateogory Name" ]) ?>
          <? $this->insert('components/forms/input_tags', ["label" => "Search Tag", "default_choices" => ["Gulp", "Adico"], "choices" => ["Gulp", "Adico","Pascal"] ]) ?>
          <? $this->insert('components/forms/input_from_to', ["label" => "Price", "label_extend" => "To" ]) ?>
          <? $this->insert('components/forms/input_from_to', ["label" => "Created Date", "input_class" => "input-icon-calendar", "label_extend" => "To" ]) ?>
          <? $this->insert('components/forms/input_from_to', ["label" => "Modified Date", "input_class" => "input-icon-calendar", "label_extend" => "To" ]) ?>
          <div class="form-group">
            <div class="width-label"><label class="control-label"></label></div>
            <div class="button-size-normal">
              <a class="button-size-normal btn btn-blue btn-width-xl">Search</a>
            </div>
            <div class="button-size-normal">
              <a class="button-size-normal margin-left-10 btn btn-white btn-width-xl">Clear</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="filter-section">
    <div class="filter-container">
      <span>Filters:</span>
      <a class="filter-first-option filter-active">All</a>
      <a class="filter-seperator">Normal Stock</a>
      <a class="filter-seperator">Low Stock</a>
      <a class="filter-seperator">Out of Stock</a>
    </div>
  </div>

  <div class="table-section">
    <table class="table table-curved product-list-table">
      <thead>
        <tr class="table-head">
          <th class="display-column"></th>
          <th>
            <a class="header-link" href="#"><span>Product Name</span></a>
            <i class="fa fa-caret-down color-grey">
          </th>
          <th class="width_150">
            <a class="header-link" href="#"><span class="active-underline">Product ID</span></a>
            <i class="fa fa-caret-down color-grey">
          </th>
          <th class="width_150">
            <a class="header-link" href="#"><span>SKU</span></a>
            <i class="fa fa-caret-down color-grey">
          </th>
          <th class="text-right width_150">
            <a class="header-link" href="#"><span>Available</span></a>
            <i class="fa fa-caret-down color-grey">
          </th>
          <th class="width_150">
            <a class="header-link margin-left-10" href="#"><span>Status</span></a>
            <i class="fa fa-caret-down color-grey">
          </th>
          <th class="action-column text-center"><a class="header-link" href="#"><span>Action</span></a></th>
        </tr>

      </thead>
      <tbody>
        <tr>
          <td class="display-column">
            <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
          </td>
          <td class="column-text-ellipsis"><a href="#">Neleus Men's Slim Fit Long Sleave with Wing on the earth ground</a></td>
          <td class="">
            <div>IV002321</div>
          </td>
          <td class="">SX002321</td>
          <td class="text-right">
            <span class="">
              <span>2</span>
              <span class='popover-markup'>
                <i  class='trigger fa fa-caret-down color-dark-grey'></i>
                <div class="content hide">
                    <span class='col-xs-6 padding-left-0 margin-bottom-15 margin-top-10'>In Stock</span><input class='margin-top-10 text-right col-xs-6' placeholder="17" />
                    <span class='col-xs-8 padding-left-0 margin-bottom-15'>Defect</span><span class='text-right col-xs-4'>5</span>
                      <div><span class='col-xs-8 padding-left-0 margin-bottom-15'>On Hold</span><span class='text-right col-xs-4'>7</span></div>
                      <div><span class='col-xs-8 padding-left-0 margin-bottom-15 border_modal'>Reserved</span><span class='text-right col-xs-4 border_modal'>2</span></div>
                      <div><span class='col-xs-8 padding-left-0 available_inventory'>Available</span><span class='text-right col-xs-4 available_inventory '>3</span></div>
                      <div class='text-center'>
                      <button class='btn btn-blue btn-width-100 text-center'>Save</button>
                    </div>
                </div>
              </span>
            </span>
          </td>
          <td>
            <span class="margin-left-10">
              Normal Stock
            </span>
          </td>
          <td class="text-center">
            <span class="popover-gear">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View / Edit</a></div>
                "></i>
            </span>
          </td>
        </tr>
        <tr>
          <td class="display-column">
            <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
          </td>
          <td class="column-text-ellipsis">
            <a href="#">Neleus Men's Slim Fit Long Sleave with Wing on the earth ground</a>
            <div class="color-dark-grey font-size-12">Blue / Small</div>
          </td>
          <td class="">
            <div>IV002321</div>
          </td>
          <td class="">SX002321</td>
          <td class="text-right">
            <span class="">
              <span class="color-red">2</span>
              <span class='popover-markup'>
                <i  class='trigger fa fa-caret-down color-dark-grey'></i>
                <div class="content hide">
                    <span class='col-xs-6 padding-left-0 margin-bottom-15 margin-top-10'>In Stock</span><input class='margin-top-10 text-right col-xs-6' placeholder="17" />
                    <span class='col-xs-8 padding-left-0 margin-bottom-15'>Defect</span><span class='text-right col-xs-4'>5</span>
                      <div><span class='col-xs-8 padding-left-0 margin-bottom-15'>On Hold</span><span class='text-right col-xs-4'>7</span></div>
                      <div><span class='col-xs-8 padding-left-0 margin-bottom-15 border_modal'>Reserved</span><span class='text-right col-xs-4 border_modal'>2</span></div>
                      <div><span class='col-xs-8 padding-left-0 available_inventory'>Available</span><span class='text-right col-xs-4 available_inventory '>3</span></div>
                      <div class='text-center'>
                      <button class='btn btn-blue btn-width-100 text-center'>Save</button>
                    </div>
                </div>
              </span>
            </span>
          </td>
          <td>
            <span class="margin-left-10 color-red">
              Low Stock
            </span>
          </td>
          <td class="action-column">
            <span class="popover-gear">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View / Edit</a></div>
                "></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="page-navigation">
    <span>
      <i class="fa fa-chevron-left grey-chevron"></i>
      <span> Page 1 of 1</span>
      <i class="fa fa-chevron-right padding-right-15 blue-chevron"></i>
      <span class="view-page-separator">View per page</span>
      <!-- Split button -->
      <div class="btn-group dropdown-btn">
        <button type="button" class="btn btn-default dropdown-text">20</button>
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">21</a></li>
          <li><a href="#">22</a></li>
          <li><a href="#">23</a></li>
          <li><a href="#">24</a></li>
        </ul>
      </div>
    </span>
  </div>

</div>


<script type="text/javascript">
  $('.popover-markup>.trigger').popover({
    html: true,
    placement: "right",
    title: function () {
        return $(this).parent().find('.head').html();
    },
    content: function () {
        return $(this).parent().find('.content').html();
    }
  });
</script>
