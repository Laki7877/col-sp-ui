<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Account ']) ?>

<?php $this->start('page-body') ?>
  <div>
    <? $this->insert('components/page-title-with-buttons', ['text' => 'Image Management'
      , 'buttons' => [
        ['link' => '#', 'class' => 'btn-white btn-width-xl', 'attributes' => '', 'name' => 'View Guideline'],
        ['link' => '#', 'class' => 'btn-blue', 'attributes' => '', 'name' => 'Save']
        ]
        ]) ?>
    <? $this->insert('components/search-section-with-page-index', ['serach_placeholder' => 'Search for Admin Accounts', 'optional_class' => 'hide-component']) ?>
    <div class="filter-section">
      <div class="filter-container">
        <span>Filters:</span>
        <a class="filter-first-option filter-active">All</a>
        <a class="filter-seperator">Image Missing</a>
        <a class="filter-seperator">Approved</a>
        <a class="filter-seperator">Not Approved</a>
        <a class="filter-seperator">Wait Approval</a>
        <a class="filter-seperator">Draft</a>
      </div>
    </div>
    <div class="table-section">
      <table class="table table-curved table-border-none">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input"> 
            </th>
            <th>
              <a class="header-link" href="#"><span class="active-underline">ID</span></a>
              <i class="fa fa-caret-down color-black">
            </th>
            <th>
              <a class="header-link" href="#"><span>Admin Name</span></a>
              <!-- <i class="fa fa-caret-up color-grey"> -->
            </th>
            <th>
              <a class="header-link" href="#"><span>Email</span></a>
              <!-- <i class="fa fa-caret-up color-grey"> -->
            </th>
            <th>
              <a class="header-link" href="#"><span>Role</span></a>
               <!-- <i class="fa fa-caret-up color-grey"> -->
            </th>
            <th>
              Status
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
            <td>
              001
            </td>
            <td>
              Harry Belafonte
            </td>
            <td>
              someone@lara.co.th
            </td>
            <td>
              Shop Owner
            </td>
            <td>
              Active
            </td>
            <td class="action-column popover-gear">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<div>View / Edit</div> <div>Delete</div>" data-original-title="" title=""></i>
            </td>
          </tr>
          <tr>
            <td class="checkbox-column">
              <input type="checkbox" aria-label="Checkbox for following text input"> 
            </td>
            <td>
              002
            </td>
            <td>
              Erutan Nando
            </td>
            <td>
              someone2@lara.co.th
            </td>
            <td>
              Content Team
            </td>
            <td>
              Inactive
            </td>
            <td class="action-column popover-gear">
              <i class="fa fa-gear color-dark-grey icon-size-20"></i>
              <i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<div>View / Edit</div> <div>Delete</div>" data-original-title="" title=""></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

 
<?php $this->stop() ?>