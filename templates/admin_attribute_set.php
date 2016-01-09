<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Attribute Set']) ?>

<?php $this->start('page-body') ?>
	<div>
    <? $this->insert('components/page-title-with-one-button', ['text' => 'Attribute Set','button' => 'Add Attribute Set', 'button_class' => 'btn-width-xxl', 'link' => '?p=admin_add_attribute_set']) ?>
    <? $this->insert('components/search-section-admin-attribute') ?>
    <div class="filter-section">
      <div class="filter-container">
        <span>Filters:</span>
        <a class="filter-first-option filter-active">All</a>
        <a class="filter-seperator">Visible</a>
        <a class="filter-seperator">Not Visible</a>
      </div>
    </div>
    <div class="table-section">
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input"> 
            </th>
            <th>
              <a class="header-link" href="#"><span>Attribute Set Name</span></a>
              <i class="fa fa-caret-down color-grey">
            </th>
            <th>
              <a class="header-link" href="#"><span>Attribute in Set</span></a>
              <i class="fa fa-caret-up color-grey">
            </th>
            <th>
              <a class="header-link" href="#"><span>Visible</span></a>
              <i class="fa fa-caret-up color-grey">
            </th>
            <th class="modified-column">
              <a class="header-link" href="#"><span>Modified</span></a>
              <i class="fa fa-caret-up">
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
            <td class="column-text-ellipsis">
              Shirt
            </td>
            <td>
              3
            </td>
            <td>
              <i class="fa fa-eye-slash color-grey eye-icon"></i>
            </td>
            <td class="modified-column">
              14/12/15
            </td>
            <td class="action-column">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<div>View / Edit</div> <div>Duplicate</div> <div>Delete</div>" data-original-title="" title=""></i>
            </td>
          </tr>

          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
            <td class="column-text-ellipsis">
              Dress
            </td>
            <td>
              5
            </td>
            <td>
              <i class="fa fa-eye color-dark-grey eye-icon"></i>
            </td>
            <td class="modified-column">
              14/12/15
            </td>
            <td class="action-column">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<div>View / Edit</div> <div>Duplicate</div> <div>Delete</div>" data-original-title="" title=""></i>
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