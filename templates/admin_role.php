<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
  <div>
    <? $this->insert('components/page-title-with-one-button', ['text' => 'Admin Roles','button' => 'Create New Admin Role', 'button_class' => 'btn-width-xxxl', 'link' => '?p=admin_add_role']) ?>
    <? $this->insert('components/search-section-admin-attribute', ['searchPlaceHolder' => 'Search for Admin Accounts']) ?>
    <div class="table-section">
      <table class="table table-curved table-border-none">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input"> 
            </th>
            <th>
              <a class="header-link" href="#"><span>Role Name</span></a>
              <i class="fa fa-caret-up color-grey">
            </th>
            <th>
              Action
            </th>
            <th class="modified-column">
              <a class="header-link" href="#"><span class="active-underline">Modified</span></a>
              <i class="fa fa-caret-down">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
            <td>
              <a href="#">Super Admin</a>
            </td>
            <td class="action-column popover-gear">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<div>View / Edit</div> <div>Delete</div>" data-original-title="" title=""></i>
            </td>
            <td class="modified-column">
              14/12/15
            </td>
          </tr>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
            <td>
              <a href="#">Content Admin</a>
            </td>
            <td class="action-column popover-gear">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<div>View / Edit</div> <div>Delete</div>" data-original-title="" title=""></i>
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

<!--   <a data-toggle="modal" data-target="#modal-loading">Loading Modal</a>
 -->
    <!-- Modal -->
  <div class="modal fade" tabindex="-1" role="dialog" id="modal-loading">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h3 class="modal-title margin-bottom-20">Processing...</h3>
          <div class="progress margin-0">
            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
            </div>
          </div>
        </div> <!-- end .modal-body -->
      </div> <!-- end .modal-content -->
    </div> <!-- end .modal-dialog -->
  </div> <!-- end .modal -->


 
<?php $this->stop() ?>