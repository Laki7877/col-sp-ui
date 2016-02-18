<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Newsletters']) ?>

<?php $this->start('page-body') ?>
  <div>
    <? $this->insert('components/page-title-with-buttons', ['text' => 'Newsletters',
        'buttons' => [
          ]
      ]) 
    ?>
    <div class="table-section">
      <table class="table table-curved table-border-none">
        <thead>
          <tr class="table-head">
            <th class="modified-column">
              <a class="header-link" href="#"><span class="active-underline">Date</span></a>
              <i class="fa fa-caret-down">
            </th>
            <th>
              <a class="header-link" href="#"><span>Subject	</span></a>
            </th>
            <th class="text-align-center">
              Action
            </th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="modified-column">
              14/12/15
            </td>
            <td>
              <a href="#">Harry Belafonte</a> 
            </td>
            <td class="action-column text-align-center">
              <button class="btn btn-white btn-width-default">Read</button>
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

  <? $this->insert('components/modal_admin_newsletter_detail', ['id' => 'image-guideline', 'header' => 'Add Newsletter']) ?>
 
<?php $this->stop() ?>