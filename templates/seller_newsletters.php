<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Newsletters']) ?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerNewsletterCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <? $this->insert('components/page-title-with-one-button', ['text' => 'Brands','button' => 'Add Brand', 'button_class' => 'btn-width-xxl', 'link' => '/admin/brands/add']) ?>
    <div class="row search-section-wrapper">
      <nc-bulk nc-model="bulkContainer" nc-bulk-fn="bulks" nc-bulk-track-by="BrandId"></nc-bulk>
      <nc-search nc-model="params.searchText" nc-search-placeholder="'Search for Brand Name'"></nc-search>
    </div>
    <nc-table nc-model="list" nc-table-params="params" nc-table-options="tableOptions" nc-is-loading="loading" nc-is-searching="isSearching()" >
      <table class="table table-curved">
        <thead>
          <tr class="table-head">
            <th class="checkbox-column"><nc-bulk-checkbox nc-model="list.data"></nc-bulk-checkbox></th>
            <th nc-sort="BrandId">Brand ID</th>
            <th nc-sort="BrandNameEn">Brand Name</th>
            <th nc-sort="UpdatedDt">Modified</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
          <tr ng-repeat="row in list.data">
            <td class="checkbox-column"><nc-bulk-checkbox nc-model="row"></nc-bulk-checkbox></td>
            <td class="width_100" nc-link="/admin/brands/{{row.BrandId}}">{{row.BrandId}}</td>
            <td nc-link="/admin/brands/{{row.BrandId}}">{{ row.BrandNameEn }}</td>
            <td class="width_100">{{row.UpdatedDt | dateTh}}</td>
            <td class="width_100"><nc-action nc-model="row" nc-action-fn="actions"></nc-action></td>
          </tr>
        </tbody>
      </table>
    </nc-table>
    <nc-pagination nc-model="params" nc-pagination-total="list.total" ></nc-pagination>
  </div>
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
              <button class="btn btn-white btn-width-default" data-toggle="modal" data-target="#seller_newsletter_detail_id">Read</button>
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

  <? $this->insert('components/modal_seller_newsletter_detail', ['id' => 'seller_newsletter_detail_id', 'header' => 'You take my money and run away', 'date' => 'Publish Date: 05/11/15', 'author' => 'By: Admin',
   'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique elit sit amet turpis imperdiet consectetur. Donec tincidunt lobortis arcu at condimentum. Sed ultricies lacus nisi, in imperdiet nulla tristique eu. Phasellus vel mauris condimentum magna iaculis sollicitudin vel a nulla. Morbi pharetra sed ligula ut suscipit. Aliquam in purus facilisis, mattis mauris ornare, lacinia neque. Aenean non maximus dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ligula enim, finibus et risus dignissim, vulputate congue massa. Duis leo libero, feugiat quis facilisis ac, mollis id purus. Phasellus tincidunt felis ac mi sodales imperdiet. Proin viverra augue at ultricies facilisis.

    Donec luctus dignissim consectetur. Pellentesque id hendrerit mauris, vitae dapibus nunc. Nulla sed consequat eros. Maecenas consequat justo nec porttitor feugiat. Nullam dapibus quam lacus, eget sodales est lacinia a. Donec ac ullamcorper turpis. Nulla at dolor sed sapien vulputate sollicitudin. Suspendisse sagittis libero at nisl efficitur rutrum.

    Vestibulum eu diam et ipsum volutpat pretium. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam tempus auctor elit, id volutpat leo posuere ut. Proin id aliquam risus, id ultrices nunc. Praesent tempor eros sit amet lectus lacinia, eget scelerisque leo dignissim. In felis magna, faucibus non urna in, rutrum congue quam. Sed vel hendrerit lacus, sit amet dapibus ligula. Aliquam sed enim tellus. Integer interdum dui ultricies feugiat sodales. Fusce imperdiet elementum facilisis. In imperdiet ex at nulla interdum faucibus a a mauris.']) ?>
 
<?php $this->stop() ?>