<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'Dashboard'])
?>

<?php $this->start('page-body') ?>

  <div id="dashboard_page" ng-controller="SellerDashboardCtrl">
    <div class="dashboard_column col-xs-8">
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
            <canvas id="canvas" height="280"></canvas>
          </div>
        </div>
        <div class="remark">Remark: The revenue does not count canceled and pending orders.</div>
      </div>

      <div class="space_column with_border">
        <div class="group_container">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-order.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">New Orders</span>
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
              <tr ng-repeat="order in newOrdersData | orderBy: 'date' | limitTo:maxNewOrders" ng-show="newOrdersData.length != 0">
                <td>
                  {{order.date | date:'MM/dd/yyyy'}}
                </td>
                <td>
                  {{order.id}}
                </td>
                <td>
                  {{order.amount}}
                </td>
                <td>
                  <span ng-class="getColorClass(order.status)">
                    <i class="fa" ng-class="getFaClass(order.status)"></i>
                    {{order.status}}
                  </span>
                </td>
                <td>
                  <button class="btn btn-white btn-width-default">View</button>
                </td>
              </tr>
              <tr ng-show="newOrdersData.length == 0">
                <td class="empty_data">- No New Orders -</td>
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
              <tr ng-repeat="product in lowStockAlertData | orderBy: 'Pid':true | limitTo:maxLowStockAlert" ng-show="lowStockAlertData.length != 0">
                <td>
                  {{product.Quantity}}
                </td>
                <td>
                  {{product.Pid}}
                </td>
                <td class="column-text-ellipsis">
                  {{product.ProductNameEn}}
                </td>
                <td>
                  <button class="btn btn-white btn-width-default">View</button>
                </td>
              </tr>
              <tr ng-show="lowStockAlertData.length == 0">
                <td class="empty_data">- No Low Stock Alert -</td>
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
            <span><a ng-click="linkToAllNewsletters()">View All</a></span>
          </span>
        </div>
        <div class="group_container">
          <table class="table table_dashboard table_newsletter">
            <tbody>
              <tr ng-repeat="letter in newsLettersData" ng-show="newsLettersData.length != 0">
                <td class="column-text-ellipsis">
                  <div>{{letter.Subject}}</div>
                  <div class="newsletter_date">Publish on {{letter.PublishedDt | date:"MM/dd/yyyy 'at' HH:mm"}}</div>
                </td>
                <td>
                  <button class="btn btn-white btn-width-default" ng-click="open(letter)">Read</button>
                </td>
              </tr>
              <tr ng-show="newsLettersData.length == 0">
                <td class="empty_data">- No Newsletter -</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <div class="dashboard_column col-xs-4">

      <div class="space_column with_border">
        <div class="group_container">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-revenue-summary.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Revenue Summary</span>
        </div>
        <div class="group_container small_field">
          <div class="display_inline_block width_100">Today</div>
          <div class="float-right font-size-20">1,123.00</div>
        </div>
        <div class="group_container small_field">
          <!-- <div class="row"> -->
          <div class="row_container">
            <div class="width_100">
              This Week
            </div>
            <div>10,535.00</div>
          </div>
          <div class="row_container">
            <div class="width_100">
              This Month
            </div>
            <div>200,934.00</div>
          </div>
          <div class="row_container">
            <div class="width_100">
              This Year
            </div>
            <div>1,210,535.00</div>
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
            <div ng-switch on="productRatingRank">
              <div class="font-size-16 color-green" ng-switch-when="green">{{productRatingScore}}</div>
              <div class="font-size-16 color-yellow" ng-switch-when="yellow">{{productRatingScore}}</div>
              <div class="font-size-16 color-red" ng-switch-when="red">{{productRatingScore}}</div>
              <div class="font-size-16" ng-switch-default>n/a</div>
            </div>
          </div>
        </div>
        <div class="group_container">
          <div class="row_container">
            <div class="width_150">
              Ontime Delivery
            </div>
            <!-- <div class="font-size-16 color-yellow">75%</div> -->
            <div ng-switch on="onTimeDeliveryRank">
              <div class="font-size-16 color-green" ng-switch-when="green">{{onTimeDeliveryScore}}</div>
              <div class="font-size-16 color-yellow" ng-switch-when="yellow">{{onTimeDeliveryScore}}</div>
              <div class="font-size-16 color-red" ng-switch-when="red">{{onTimeDeliveryScore}}</div>
              <div class="font-size-16" ng-switch-default>n/a</div>
            </div>
          </div>
        </div>
        <div class="group_container">
          <div class="row_container">
            <div class="width_150">
              Return Rate
            </div>
            <!-- <div class="font-size-16 color-green">0%</div> -->
            <div ng-switch on="returnRank">
              <div class="font-size-16 color-green" ng-switch-when="green">{{returnScore}}</div>
              <div class="font-size-16 color-yellow" ng-switch-when="yellow">{{returnScore}}</div>
              <div class="font-size-16 color-red" ng-switch-when="red">{{returnScore}}</div>
              <div class="font-size-16" ng-switch-default>n/a</div>
            </div>
          </div>
        </div>
      </div>

      <div class="space_column with_border">
        <div class="group_container top_selling_header">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-top-selling.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Top Selling This Month</span>
        </div>

        <div ng-repeat="product in topSellingItemsData  | limitTo:maxTopSellingItems" ng-show="topSellingItemsData.length != 0" class="group_container top_selling_field">
            <img class="logo-img" src="{{product.img_path}}" />
            <div class="column-text-ellipsis"><a href="#">{{product.name}}</a></div>
        </div>
        <div ng-show="topSellingItemsData.length == 0" class="group_container top_selling_field">
            <!-- <img class="logo-img" src="{{product.img_path}}" /> -->
            <div class="text-center">- No Top Selling Product -</div>
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
