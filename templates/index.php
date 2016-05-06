<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Products']) ?>

<?php $this->start('page-body') ?>
	<div>

    <div class="page-header with-border">
        <h1 class="float-left page-header-title">Products</h1>
        <span class="float-right page-header-action">
            <a href="/?p=seller_export_products" class="btn margin-left-10 btn-white btn-width-xl">
              <span class="">Export All</span>
            </a>

            <div class="btn-group margin-left-10">
              <button type="button" class="btn btn-white dropdown-toggle btn-width-xl" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Import <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li><a href="/?p=seller_import_products">Add New Products</a></li>
                <li><a href="/?p=seller_update_products">Update Existing Products</a></li>
              </ul>
            </div>
            <a href="/?p=global_category" data-toggle="modal" class="btn margin-left-10 btn-blue btn-width-xl">
              <span class="">Add Product</span>
            </a>
        </span>
    </div>

    <? $this->insert('components/search-section', ['actions' => ['Export Products', 'Delete Products', 'Hide Products', 'Show Products', 'Publish Products']]) ?>
    <div class="filter-section">
      <div class="filter-container">
        <span>Filters:</span>
        <a class="filter-first-option filter-active">All</a>
        <a class="filter-seperator">Approved</a>
        <a class="filter-seperator">Not Approved</a>
        <a class="filter-seperator">Wait for Approval</a>
        <a class="filter-seperator">Not Approved</a>

        <div class="filter-checkbox">
          <input type="checkbox" aria-label="Checkbox for following text input">
          Show Online/Offline Status
        </div>

      </div>
    </div>
    <div class="table-section">
      <table class="table table-curved product-list-table">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input">
            </th>
            <th class="display-column"></th>
            <th>
              <a class="header-link" href="#"><span>Product Nam  e</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th class="price-column">
              <a class="header-link" href="#"><span>Price</span></a>
              <i class="fa fa-caret-up color-grey">
            </th>
            <th><a class="header-link" href="#"><span>Info.</span></a></th>
            <th><a class="header-link" href="#"><span>Image</span></a></th>
            <th class="status-column">
              <a class="header-link" href="#"><span>Status</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th class="visible-column"><a class="header-link" href="#"><span>Visible</span></a></th>
            <th class="action-column"><a class="header-link" href="#"><span>Action</span></a></th>
            <th class="modified-column">
              <a class="header-link" href="#"><span class="active-underline">Modified</span></a>
              <i class="fa fa-caret-up">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input">
            </td>
            <td class="display-column">
              <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
            </td>
            <td class="column-text-ellipsis"><a href="#">Neleus Men's Slim Fit Long Sleave with Wing on the earth ground</a></td>
            <td class="price-column">9,000,000</td>
            <td class="info-column">
              <i class="fa fa-check color-green icon-size-18px"></i>
            </td>
            <td class="image-column">
              <i class="fa fa-check color-green icon-size-18px"></i>
            </td>
            <td class="status-column">
              <span class="color-red">
                <i class="fa fa-ban"></i>
                Not Approved
              </span>
            </td>
            <td class="visible-column">
              <i class="fa fa-eye-slash color-grey eye-icon"></i>
            </td>
            <td class="action-column">
              <span class="text-align-center popover-gear">
                <i class="fa fa-gear color-dark-grey icon-size-20"></i>
                <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                  <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View / Edit</a></div>
                  <div><a href='#'>View Products</a></div>
                  <div><a href='#'>Delete</a></div>
                  "></i>
              </span>
            </td>
            <td class="modified-column">
              14/12/15
            </td>
          </tr>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input">
            </td>
            <td class="display-column">
              <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
            </td>
            <td><a href="#">Jeansian Men's Slim Fit Long</a></td>
            <td class="price-column">
              <div>8,999.99-9,999.99</div>
              <div>(99 variants)</div>
            </td>
            <td class="info-column">
              <i class="fa fa-check color-green icon-size-18px"></i>
            </td>
            <td class="image-column">
              <i class="fa fa-check color-green icon-size-18px"></i>
            </td>
            <td class="status-column">
              <span class="color-yellow">
                <i class="fa fa-clock-o"></i>
                  Wait for Approval
              </span>
            </td>
            <td class="visible-column">
              <i class="fa fa-eye color-dark-grey eye-icon"></i>
            </td>
            <td class="action-column">
              <span class="text-align-center popover-gear">
                <i class="fa fa-gear color-dark-grey icon-size-20"></i>
                <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                  <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View / Edit</a></div>
                  <div><a href='#'>View Products</a></div>
                  <div><a href='#'>Delete</a></div>
                  "></i>
              </span>
            </td>
            <td class="modified-column">
              14/12/15
            </td>
          </tr>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input">
            </td>
            <td class="display-column">
              <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
            </td>
            <td><a href="#">Power Bank MD Tech Model B02</a></td>
            <td class="price-column">9,000,000</td>
            <td class="info-column">
              <i class="fa fa-check color-green icon-size-18px"></i>
            </td>
            <td class="image-column">
              <i class="fa fa-check color-green icon-size-18px"></i>
            </td>
            <td class="status-column">
              <span class="color-green">
                <i class="fa fa-check-circle-o"></i>
                Approved
              </span>
            </td>
            <td class="visible-column">
              <i class="fa fa-eye color-dark-grey eye-icon"></i>
            </td>
            <td class="action-column">
              <span class="text-align-center popover-gear">
                <i class="fa fa-gear color-dark-grey icon-size-20"></i>
                <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                  <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View / Edit</a></div>
                  <div><a href='#'>View Products</a></div>
                  <div><a href='#'>Delete</a></div>
                  "></i>
              </span>
            </td>
            <td class="modified-column">
              09/12/15
            </td>
          </tr>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input">
            </td>
            <td class="display-column">
              <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
            </td>
            <td><a href="#">Power Bank MD Tech Model B02</a></td>
            <td class="price-column">1,000</td>
            <td class="info-column">
              <i class="fa fa-minus color-grey icon-size-18px"></i>
            </td>
            <td class="image-column">
              <i class="fa fa-check color-green icon-size-18px"></i>
            </td>
            <td class="status-column">
              <span class="color-grey">
                <i class="fa fa-circle-o"></i>
                Draft
              </span>
            </td>
            <td class="visible-column">
              <i class="fa fa-eye color-dark-grey eye-icon"></i>
            </td>
            <td class="action-column">
              <span class="text-align-center popover-gear">
                <i class="fa fa-gear color-dark-grey icon-size-20"></i>
                <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                  <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View / Edit</a></div>
                  <div><a href='#'>View Products</a></div>
                  <div><a href='#'>Delete</a></div>
                  "></i>
              </span>
            </td>
            <td class="modified-column">
              09/12/15
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



<?php $this->stop() ?>
