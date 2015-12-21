<?php $this->layout('layouts/page-with-sidebar', ['title' => 'User Profile']) ?>

<?php $this->start('page-body') ?>
	<div>
    <?= $this->section('page-body-header', $this->fetch('components/page-body-header')); ?>
    <?= $this->section('search-section', $this->fetch('components/search-section')); ?>
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
      <table class="table">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input"> 
            </th>
            <th class="display-column"></th>
            <th>
              <span>Product Name</span>
              <span class="caret caret-grey"></span>
            </th>
            <th class="price-column">
              <span>Price</span>
              <span class="caret caret-grey"></span>
            </th>
            <th>Info.</th>
            <th>Image</th>
            <th class="status-column">
              <span>Status</span>
              <span class="caret caret-grey"></span>
            </th>
            <th class="live-column">Live</th>
            <th class="visible-column">Visible</th>
            <th class="modified-column">
              <span>Modified</span>
              <span class="caret"></span>
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
            <td>After all this years</td>
            <td class="price-column">9,000,000</td>
            <td class="info-column">
              <i class="fa fa-check check-green"></i>
            </td>
            <td class="image-column">
              <i class="fa fa-check check-green"></i>
            </td>
            <td class="status-column">
              <span class="red-message">
                <i class="fa fa-ban"></i>
                Not Approved
              </span>
            </td>
            <td class="live-column">
              <i class="fa fa-circle color-green"></i>
            </td>
            <td class="visible-column">
              <i class="fa fa-eye color-drak-grey eye-icon"></i>
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
            <td>After all this years</td>
            <td class="price-column">
              8,999.99-9,999.99<br>
              (99 variants)
            </td>
            <td class="info-column">
              <i class="fa fa-check check-green"></i>
            </td>
            <td class="image-column">
              <i class="fa fa-check check-green"></i> 
            </td>
            <td class="status-column"></td>
            <td class="live-column"></td>
            <td class="visible-column"></td>
            <td class="modified-column"></td>
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
        <div class="btn-group">
          <button type="button" class="btn btn-default">20</button>
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