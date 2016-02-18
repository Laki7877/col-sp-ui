<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'Dashboard'])
?>

<?php $this->start('page-body') ?>

  <div id="dashboard_page">
    <div class="col-xs-8">
      <div class="space_column with_border">
        <div class="group_container">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-onboard-product.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Orders</span>
          <span class="float-right group_span_right">
            <span class="header-link" href="#"><a class="active-underline">Today (2)</a></span>
            <span><a href="#" class="color-grey">Pending (4)</a></span>
            <span><a href="#" class="color-grey">Complete (230)</a></span>
            <span><a href="#">View All</a></span>
          </span>
        </div>
        <div class="group_container">
          <div class="row">
            <div class="col-xs-3">
              <span class="color-grey">
                <i class="fa fa-check-circle-o"></i>
                Payment Confirmed
              </span>
            </div>
            <div class="col-xs-4 no-padding column-text-ellipsis">Order #123 - Natt Phenjati</div>
            <div class="col-xs-2 ">฿226</div>
            <div class="col-xs-3 text-align-right">13/12/2015 at 10:25</div>
          </div>
        </div>
        <div class="group_container">
          <div class="row">
            <div class="col-xs-3">
              <span class="color-green">
                <i class="fa fa-check-circle-o"></i>
                Delivered
              </span>
            </div>
            <div class="col-xs-4 no-padding column-text-ellipsis">Order #153 - Jatuporn Dummaaaaaaaqd</div>
            <div class="col-xs-2 ">฿1,326</div>
            <div class="col-xs-3 text-align-right">13/12/2015 at 10:25</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-4">
      <div class="space_column with_border">Widget 2</div>
    </div>    
  </div>

<?php $this->stop() ?>