<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'Dashboard'])
?>

<?php $this->start('page-body') ?>

  <div id="dashboard_page">
    <div class="col-xs-8">
      <div class="space_column with_border">
        <div class="group_container no_border">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-revenue.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Revenue</span>
          <span class="float-right group_span_right">
            <span><a href="#" class="color-grey">Today</a></span>
            <span class="header-link" href="#"><a class="active-underline">This Week</a></span>
            <span><a href="#" class="color-grey">This Month</a></span>
            <span><a href="#" class="color-grey">This Year</a></span>
          </span>
        </div>
        <img width="100%" class="" src="<?= $this->asset('/assets/img/graph_mock.png') ?>" />
      </div>

      <div class="space_column with_border">
        <div class="group_container">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-order.png') ?>" />
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

      <div class="space_column with_border">
        <div class="group_container">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-low-stock.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Low Stock Alert</span>
          <span class="float-right group_span_right">
            <span><a href="#">View All</a></span>
          </span>
        </div>
        <div class="group_container">
          <div class="row">
            <div class="col-xs-2">
              <span class="">
                SKU:12353
              </span>
            </div>
            <div class="col-xs-5 no-padding column-text-ellipsis">Nanyang Original Footwear T-model x10 Limited Edition for Thailand sale only</div>
            <div class="col-xs-3 ">Stock Level: 5</div>
            <div class="col-xs-2 text-align-right"><button class="btn btn-white btn-width-default">View</button></div>
          </div>
        </div>
        <div class="group_container">
          <div class="row">
            <div class="col-xs-2">
              <span class="">
                SKU:53233
              </span>
            </div>
            <div class="col-xs-5 no-padding column-text-ellipsis">Jordan Nike Super Shoe</div>
            <div class="col-xs-3 ">Stock Level: 5</div>
            <div class="col-xs-2 text-align-right"><button class="btn btn-white btn-width-default">View</button></div>
          </div>
        </div>
      </div>

      <div class="space_column with_border">
        <div class="group_container">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-newsletters.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Newsletters</span>
          <span class="float-right group_span_right">
            <span><a href="?p=seller_newsletters">View All</a></span>
          </span>
        </div>
        <div class="group_container">
          <div class="row">
            <div class="col-xs-10">
              <span class="">
                <div>10/12/15 at 10:00</div>
                <div class="column-text-ellipsis ">Some thing happens in this world and no body knows about it becuase everyone is playing DotA 2. Damn that game need to be shut down.</div>
              </span>
            </div>
            <div class="col-xs-2 text-align-right margin-top-10 "><button class="btn btn-white btn-width-default">Read</button></div>
          </div>
        </div>
        <div class="group_container">
          <div class="row">
            <div class="col-xs-10">
              <span class="">
                <div>10/12/15 at 10:00</div>
                <div class="column-text-ellipsis ">Some thing happens in this world and no body knows about it becuase everyone is playing DotA 2. Damn that game need to be shut down.</div>
              </span>
            </div>
            <div class="col-xs-2 text-align-right margin-top-10 "><button class="btn btn-white btn-width-default">Read</button></div>
          </div>
        </div>
        <div class="group_container">
          <div class="row">
            <div class="col-xs-10">
              <span class="">
                <div>10/12/15 at 10:00</div>
                <div class="column-text-ellipsis ">Some thing happens in this world and no body knows about it becuase everyone is playing DotA 2. Damn that game need to be shut down.</div>
              </span>
            </div>
            <div class="col-xs-2 text-align-right margin-top-10 "><button class="btn btn-white btn-width-default">Read</button></div>
          </div>
        </div>
      </div>

    </div>
    <div class="col-xs-4">

      <div class="space_column with_border">
        <div class="group_container">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-onboard-launch.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Revenue Summary</span>
        </div>
        <div class="group_container small_field">
          <div class="row">
            <div class="col-xs-4">
              <span>Today</span>
            </div>
            <div class="col-xs-8 text-align-right"><span class="font-size-38">฿1,123.00</span></div>
          </div>
        </div>
        <div class="group_container small_field">
          <div class="row">
            <div class="col-xs-4">
              This Week
            </div>
            <div class="col-xs-8 text-align-right ">฿10,535.00</div>
            <div class="col-xs-4">
              This Month
            </div>
            <div class="col-xs-8 text-align-right ">฿200,934.00</div>
            <div class="col-xs-4">
              This Year
            </div>
            <div class="col-xs-8 text-align-right ">฿1,210,535.00</div>
          </div>
        </div>
      </div>

      <div class="space_column with_border">
        <div class="group_container">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-health.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Account Health </span>
        </div>
        <div class="group_container">
          <div class="row">
            <div class="col-xs-5">
              <span>Product Rating</span>
            </div>
            <div class="col-xs-7 text-align-right"><span class="font-size-27 color-red">2.0 / 5.0</span></div>
          </div>
        </div>
        <div class="group_container">
          <div class="row">
            <div class="col-xs-5">
              <span>Ontime Delivery</span>
            </div>
            <div class="col-xs-7 text-align-right"><span class="font-size-27 color-yellow">75%</span></div>
          </div>
        </div>
        <div class="group_container">
          <div class="row">
            <div class="col-xs-5">
              <span>Return Rate</span>
            </div>
            <div class="col-xs-7 text-align-right"><span class="font-size-27 color-green">0%</span></div>
          </div>
        </div>
      </div>

      <div class="space_column with_border">
        <div class="group_container top_selling_header">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-top-selling.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Top Selling Items </span>
        </div>

        <div class="group_container top_selling_field">
          <div class="row">
            <div class="col-xs-3">
              <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
            </div>
            <div class="col-xs-9 text-align-left column-text-ellipsis">Chanel, the cheetah</div>
          </div>
        </div>
        <div class="group_container top_selling_field">
          <div class="row">
            <div class="col-xs-3">
              <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
            </div>
            <div class="col-xs-9 text-align-left column-text-ellipsis">French Connection, Sunday - high quality product</div>
          </div>
        </div>

      </div>

    </div>    
  </div>

<?php $this->stop() ?>