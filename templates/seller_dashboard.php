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
        <div class="dashboard_graph">
          <div>
            <canvas id="canvas"></canvas>
          </div>
        </div>

      </div>

      <div class="space_column with_border">
        <div class="group_container">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-order.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Recent Orders</span>
          <span class="float-right group_span_right">
            <span class="hide-component header-link" href="#"><a class="active-underline">Today (2)</a></span>
            <span class="hide-component"><a href="#" class="color-grey">Pending (4)</a></span>
            <span class="hide-component"><a href="#" class="color-grey">Complete (230)</a></span>
            <span><a href="#">View All</a></span>
          </span>
        </div>
        <div class="group_container no-padding">
          <table class="table table_dashboard table_recent_order">
            <tbody>
              <tr>
                <td>
                  <span class="color-grey">
                    <i class="fa fa-check-circle-o"></i>
                    Payment Confirmed
                  </span>
                </td>
                <td class="column-text-ellipsis">
                  Order #123 - Natt Phenjati
                </td>
                <td>
                  ฿226
                </td>
                <td class="width_100">
                  13/12/2015
                </td>
                <td>
                  <button class="btn btn-white btn-width-default">View</button>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="color-green">
                    <i class="fa fa-check-circle-o"></i>
                    Delivered
                  </span>
                </td>
                <td class="column-text-ellipsis">
                  Order #153 - Jatuporn Dumaaaaaaad
                <td>
                  ฿1,326
                </td>
                <td class="width_100">
                  13/12/2015
                </td>
                <td>
                  <button class="btn btn-white btn-width-default">View</button>
                </td>
              </tr>
            </tbody>
          </table>
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
          <table class="table table_dashboard table_lsa">
            <tbody>
              <tr>
                <td>
                  SKU:12353
                </td>
                <td class="column-text-ellipsis">
                  Nanyang Original Footwear T-model x10 Limited Edition for Thailand sale only
                </td>
                <td>
                  Inventory: 5
                </td>
                <td>
                  <button class="btn btn-white btn-width-default">View</button>
                </td>
              </tr>
              <tr>
                <td>
                  SKU:53233
                </td>
                <td class="column-text-ellipsis">
                  Jordan Nike Super Shoe
                <td>
                  Inventory: 5
                </td>
                <td>
                  <button class="btn btn-white btn-width-default">View</button>
                </td>
              </tr>
            </tbody>
          </table>
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
          <table class="table table_dashboard table_newsletter">
            <tbody>
              <tr>
                <td class="column-text-ellipsis">
                  <div>10/12/15 at 10:00</div>
                  Some thing happens in this world and no body knows about it becuase everyone is playing DotA 2. Damn that game need to be shut down.
                </td>
                <td>
                  <button class="btn btn-white btn-width-default">Read</button>
                </td>
              </tr>
              <tr>
                <td class="column-text-ellipsis">
                  <div>10/12/15 at 10:00</div>
                  Some thing happens in this world and no body knows about it becuase everyone is playing DotA 2. Damn that game need to be shut down.
                </td>
                <td>
                  <button class="btn btn-white btn-width-default">Read</button>
                </td>
              </tr>
              <tr>
                <td class="column-text-ellipsis">
                  <div>10/12/15 at 10:00</div>
                  Some thing happens in this world and no body knows about it becuase everyone is playing DotA 2. Damn that game need to be shut down.
                </td>
                <td>
                  <button class="btn btn-white btn-width-default">Read</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <div class="col-xs-4">

      <div class="space_column with_border">
        <div class="group_container">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-revenue-summary.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Revenue Summary</span>
        </div>
        <div class="group_container small_field">
          <div class="display_inline_block width_100">Today</div>
          <div class="float-right font-size-20">฿1,123.00</div>
        </div>
        <div class="group_container small_field">
          <!-- <div class="row"> -->
          <div class="row_container">
            <div class="width_100">
              This Week
            </div>
            <div>฿10,535.00</div>
          </div>
          <div class="row_container">
            <div class="width_100">
              This Month
            </div>
            <div>฿200,934.00</div>
          </div>
          <div class="row_container">
            <div class="width_100">
              This Year
            </div>
            <div>฿1,210,535.00</div>
          </div>
          <!-- </div> -->
        </div>
      </div>

      <div class="space_column with_border account_health">
        <div class="group_container">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-health.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Account Health </span>
        </div>
        <div class="group_container">
          <div class="row_container">
            <div class="width_150">
              Product Rating
            </div>
            <div class="font-size-16 color-red">2.0 / 5.0</div>
          </div>
        </div>
        <div class="group_container">
          <div class="row_container">
            <div class="width_150">
              Ontime Delivery
            </div>
            <div class="font-size-16 color-yellow">75%</div>
          </div>
        </div>
        <div class="group_container">
          <div class="row_container">
            <div class="width_150">
              Return Rate
            </div>
            <div class="font-size-16 color-green">0%</div>
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
            <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
            <div class="column-text-ellipsis">Chanel, the cheetah</`div></div>
        </div>
        <div class="group_container top_selling_field">
            <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
            <div class="column-text-ellipsis">French Connection, Sunday - high quality product</div>
        </div>
        <div class="group_container top_selling_field">
            <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
            <div class="column-text-ellipsis">French Connection, Sunday - high quality product</div>
        </div>
        <div class="group_container top_selling_field">
            <img class="logo-img" src="<?= $this->asset('/assets/img/img40.png') ?>" />
            <div class="column-text-ellipsis">French Connection, Sunday - high quality product</div>
        </div>


      </div>

    </div>
  </div>

  <script>
    var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
    var lineChartData = {
      labels : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      datasets : [
        {
          label: "My Second dataset",
          fillColor : "rgba(72,153,221,0.2)",
          strokeColor : "rgba(72,153,221,1)",
          pointColor : "rgba(72,153,221,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          // data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
          data : [10,40,65,12,8,30,98]
        }
      ]

    }


  window.onload = function(){
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx).Line(lineChartData, {
      bezierCurve : false,
      scaleShowVerticalLines: false,
      maintainAspectRatio: false,
      responsive: true
    });
  }


  </script>

<?php $this->stop() ?>
