<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal']) ?>

<?php $this->start('page-body') ?>
<div ng-controller="ProductListCtrl">
    <? $this->insert('components/page-title-with-buttons', ['text' => 'Products']) ?>
    <? $this->insert('components/search-section') ?>
    <div class="filter-section">
      <div class="filter-container">
        <span>Filters:</span>
        <a class="filter-seperator" ng-repeat="filter in filterOptions" ng-class="{'filter-active': tableParams.filter == filter.value }" ng-click="tableParams.filter = filter.value">{{ filter.name }}</a>
      </div>
    </div>
    <div class="table-section">
      <table class="table table-curved">
        <thead>
          <tr class="table-head" >
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input" ng-model="checkAll"> 
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
            <th class="live-column" ng-if="showOnOffStatus">Live</th>
            <th class="visible-column">Visible</th>
            <th class="modified-column">
              <span>Modified</span>
              <span class="caret"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in pList" >
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input" ng-model="row.checked"> 
            </td>
            <td class="display-column">
              <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
            </td>
            <td>{{ row.ProductName }}</td>
            <td class="price-column">{{ row.Price | currency: 2 }}</td>
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
            <td class="live-column" ng-if="showOnOffStatus">
              <i class="fa fa-circle color-green"></i>
            </td>
            <td class="visible-column">
              <i class="fa fa-eye color-drak-grey eye-icon"></i>
            </td>
            <td class="modified-column">
              14/12/15
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
