<?php $this->layout('layouts/page-with-sidebar', ['title' => 'User Profile']) ?>

<?php $this->start('page-body') ?>
	<div>
    <? $this->insert('components/page-title-breadcrumb-border', ['text' => 'Product Review']) ?>
    <? $this->insert('components/search-section', ['actions' =>['Approve', 'Unapprove'], 'optional_class' => 'hide-component']) ?>
    <div class="filter-section">
      <div class="filter-container">
        <span>Filters:</span>
        <a class="filter-first-option filter-active">All</a>
        <a class="filter-seperator">Approved</a>
        <a class="filter-seperator">Not Approved</a>
      </div>
    </div>
    <div class="table-section">
      <table class="table table-curved product-list-table">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input"> 
            </th>
            <th class="">
              <a class="header-link" href="#"><span class="active-underline">Date</span></a>
              <i class="fa fa-caret-down">
            </th>
            <th>
              <a class="header-link" href="#"><span class="">Rating</span></a>
              <i class="fa fa-caret-down">
            </th>
            <th>
              <a class="header-link" href="#"><span class="">PID</span></a>
              <i class="fa fa-caret-down">
            </th>
            <th>
              <a class="header-link" href="#"><span>Comment</span></a>
            </th>
            <th>
              <a class="header-link" href="#"><span>Customer</span></a>
            </th>            
            <th class="">
              <a class="header-link" href="#"><span>Status</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th class="text-center">
              <a class="header-link" href="#"><span>Approve</span></a>
            </th>            
            <th class="action-column"><a class="header-link" href="#"><span>Action</span></a></th> 
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
            <td class="display-column">
              14/12/15
            </td>
            <td>4.5/5.0</td>
            <td>1234567</td>
            <td class="column-text-ellipsis"><a href="#">Neleus Men's Slim Fit Long Sleave with Wing on the earth ground</a></td>
            <td>Harry Belafonte</td>
            <td class="">
              <span class="color-grey">
                Not Approved
              </span>
            </td>
            <td class="text-center"><button class="btn btn-white">Approve</button></td>
            <td class="action-column">
              <span class="text-align-center popover-gear">
                <i class="fa fa-gear color-dark-grey icon-size-20"></i>
                <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                  <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View Detail</a></div>
                  "></i>  
              </span>
            </td>
          </tr>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
            <td class="display-column">
              10/12/15
            </td>
            <td>4.0/5.0</td>
            <td>1234567</td>
            <td><a href="#">Jeansian Men's Slim Fit Long</a></td>
            <td>Erutan Nando</td>
            <td class="status-column">
              <span class="color-grey">
                Not Approved
              </span>
            </td>
            <td class="text-center"><button class="btn btn-white">Approve</button></td>
            <td class="action-column">
              <span class="text-align-center popover-gear">
                <i class="fa fa-gear color-dark-grey icon-size-20"></i>
                <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                  <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View Detail</a></div>
                  "></i>  
              </span>
            </td>
          </tr>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
            <td class="display-column">
              09/12/15
            </td>
            <td>3.5/5.0</td>
            <td>1234567</td>
            <td><a href="#">Power Bank MD Tech Model B02</a></td>
            <td>Harry Belafonte</td>
            <td class="">
              <span class="color-green">
                Approved
              </span>
            </td>
            <td class="text-center"><button class="btn btn-white">Approve</button></td>
            <td class="action-column">
              <span class="text-align-center popover-gear">
                <i class="fa fa-gear color-dark-grey icon-size-20"></i>
                <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                  <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View Detail</a></div>
                  "></i>  
              </span>
            </td>
          </tr>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
            <td class="display-column">
              09/12/15
            </td>
            <td>4.5/5.0</td>
            <td>1234567</td>
            <td><a href="#">Power Bank MD Tech Model B02</a></td>
            <td class="column-text-ellipsis">Transylvan Ssaasqsasas</td>
            <td class="">
              <span class="color-grey">
                Not Approved
              </span>
            </td>
            <td class="text-center"><button class="btn btn-white">Approve</button></td>
            <td class="action-column">
              <span class="text-align-center popover-gear">
                <i class="fa fa-gear color-dark-grey icon-size-20"></i>
                <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="
                  <div><a href='#' data-toggle='modal' data-target='#local-category-detail'>View Detail</a></div>
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

<?php $this->stop() ?>