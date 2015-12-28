<?php $this->layout('layouts/page-with-sidebar', ['title' => 'User Profile']) ?>

<?php $this->start('page-body') ?>
	<div>
    <? $this->insert('components/page-title-with-buttons', ['text' => 'Products']) ?>
    <? $this->insert('components/search-section') ?>
    <div class="filter-section">
      <div class="filter-container">
        <span>Filters:</span>
        <a class="filter-first-option filter-active">All</a>
        <a class="filter-seperator">Approved</a>
        <a class="filter-seperator">Not Approved</a>
        <a class="filter-seperator">Wait for Approval</a>
        <a class="filter-seperator">Not Approved</a>            
      </div>
    </div>
    <div class="table-section">
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input"> 
            </th>
            <th class="display-column"></th>
            <th>
              <a class="header-link" href="#"><span>Product Name</span></a>
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
            <th class="live-column"><a class="header-link" href="#"><span>Live</span></a></th>
            <th class="visible-column"><a class="header-link" href="#"><span>Visible</span></a></th>
            <th class="modified-column">
              <a class="header-link" href="#"><span>Modified</span></a>
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
            <td class="column-text-ellipsis">Neleus Men's Slim Fit Long Sleave with Wing on the earth ground</td>
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
            <td class="live-column">
              <i class="fa fa-circle color-green"></i>
            </td>
            <td class="visible-column">
              <i class="fa fa-eye-slash color-grey eye-icon"></i>
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
            <td>Jeansian Men's Slim Fit Long</td>
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
            <td class="live-column">
              <i class="fa fa-circle color-red"></i>
            </td>
            <td class="visible-column">
              <i class="fa fa-eye color-dark-grey eye-icon"></i>
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
            <td>Power Bank MD Tech Model B02</td>
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
            <td class="live-column">
              <i class="fa fa-circle color-green"></i>
            </td>
            <td class="visible-column">
              <i class="fa fa-eye color-dark-grey eye-icon"></i>
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
            <td>Power Bank MD Tech Model B02</td>
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
            <td class="live-column">
              <i class="fa fa-circle color-red"></i>
            </td>
            <td class="visible-column">
              <i class="fa fa-eye color-dark-grey eye-icon"></i>
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