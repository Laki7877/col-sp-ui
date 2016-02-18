<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Return']) ?>

<?php $this->start('page-body') ?>
	<div>
    <? $this->insert('components/page-title-with-buttons', ['text' => 'Return Requests',
        'buttons' => [
          ]
      ]) 
    ?>

    <? $this->insert('components/search-section', ['serach_placeholder' => 'Search for Return ID, Order ID' , 'actions' => ['Export Products', 'Delete Products', 'Hide Products', 'Show Products', 'Publish Products'], 'optional_class' => 'hide-component']) ?>
    <div class="filter-section">
      <div class="filter-container">
        <span>Filters:</span>
        <a class="filter-first-option filter-active">All</a>
        <a class="filter-seperator">Accepted</a>
        <a class="filter-seperator">Waiting</a>
      </div>
    </div>
    <div class="table-section">
      <table class="table table-curved product-list-table">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input"> 
            </th>
            <th class="modified-column">
              <a class="header-link" href="#"><span class="active-underline">Date</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th class="modified-column">
              <a class="header-link" href="#"><span>Return ID</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th class="modified-column">
              <a class="header-link" href="#"><span>Order ID</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th>
              <a class="header-link" href="#"><span>Customer Name</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th class="width_100">
              <a class="header-link" href="#"><span>Total Price</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th class="width_100">
              <a class="header-link" href="#">
                <span>Carrier</span>
              </a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th class="width_100">
              <a class="header-link" href="#"><span>Status</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th class="width_100 text-align-center">
              <a class="header-link" href="#">
                <span>Approve</span>
              </a>
            </th>
            <th class="action-column">
              <a class="header-link" href="#">
                <span>Action</span>
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
            <td class="modified-column">
              14/12/15
            </td>
            <td class="modified-column"><a href="">IV002321</a></td>
            <td class="modified-column">XN002321</td>
            <td class="column-text-ellipsis ">John Bravo</td>
            <td class="width_100">฿400.00</td>
            <td class="width_100">Kerry</td>
            <td class="width_100">
              <span class="color-grey">
                Waiting
              </span>
            </td>
            <td class="width_100 text-align-center">
                <button class="btn btn-white btn-width-xl">Approve</button>
            </td>
            <td class="action-column">
              <span class="text-align-center popover-gear">
               <i class="fa fa-gear color-dark-grey icon-size-20"></i>
               <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View / Edit</a></div>
                <div><a href='#'>View Products</a></div>
                <div><a href='#'>Delete</a></div>
                ">
               </i>  
              </span>
            </td>
          </tr>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
            <td class="modified-column">
              14/12/15
            </td>
            <td class="modified-column"><a href="">IV002321</a></td>
            <td class="modified-column">XN002321</td>
            <td class="column-text-ellipsis ">John Bravo</td>
            <td class="width_100">฿400.00</td>
            <td class="width_100">Kerry</td>
            <td class="width_100">
              <span class="color-green">
                Approve
              </span>
            </td>
            <td class="width_100 text-align-center">
                <button disabled class="btn btn-white btn-width-xl">Approve</button>
            </td>
            <td class="action-column">
              <span class="text-align-center popover-gear">
               <i class="fa fa-gear color-dark-grey icon-size-20"></i>
               <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View / Edit</a></div>
                <div><a href='#'>View Products</a></div>
                <div><a href='#'>Delete</a></div>
                ">
               </i>  
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



<?php $this->stop() ?>