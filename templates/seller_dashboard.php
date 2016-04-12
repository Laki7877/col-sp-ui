<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'Dashboard'])
?>

<?php $this->start('page-body') ?>

  <div id="dashboard_page" ng-controller="SellerDashboardCtrl">
    <div class="dashboard_column col-xs-8">
      <div class="space_column with_border revenue_pannel">
        <div class="group_container no_border">
          <span class="image-thumbs-img-wrapper">
            <img class="" src="<?= $this->asset('/assets/img/icon-dashboard-revenue.png') ?>" />
          </span>
          <span class="font-size-18 header_name_space">Revenue</span>
          <span class="float-right group_span_right">
            <span ng-class="{'header-link': todayFlag}" ng-click="setGraphData('today')"><a ng-class="{'active-underline': todayFlag, 'color-grey': !todayFlag}">Today</a></span>
            <span ng-class="{'header-link': thisWeekFlag}" ng-click="setGraphData('week')"><a ng-class="{'active-underline': thisWeekFlag, 'color-grey': !thisWeekFlag}">This Week</a></span>
            <span ng-class="{'header-link': thisMonthFlag}" ng-click="setGraphData('month')"><a ng-class="{'active-underline': thisMonthFlag, 'color-grey': !thisMonthFlag}">This Month</a></span>
            <span ng-class="{'header-link': thisYearFlag}" ng-click="setGraphData('year')"><a ng-class="{'active-underline': thisYearFlag, 'color-grey': !thisYearFlag}">This Year</a></span>
          </span>
        </div>
        <div class="dashboard_graph">
          <div class="canvas-holder">
            <!-- <canvas id="canvas" height="280"></canvas> -->
            <canvas id="line" class="chart chart-line" chart-data="data"
              chart-labels="labels" chart-legend="false" chart-series="line"
              chart-click="onClick" chart-options='{maintainAspectRatio: true, bezierCurve : false, scaleBeginAtZero: true
              ,tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> ฿"}'>
            </canvas>
          </div>
        </div>
        <div class="remark">Remark: The revenue does not count canceled and pending orders</div>
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
            <span><a ng-click="linkToOrdersPage()">View All ({{totalOrders}})</a></span>
          </span>
        </div>
        <div class="group_container no-padding">
          <table class="table table_dashboard table_recent_order">
            <tbody>
              <tr ng-click="linkToOrder(order.OrderId)" ng-repeat="order in newOrdersData | orderBy: 'date' | limitTo:maxNewOrders" ng-show="newOrdersData.length != 0">
                <td>
                  {{order.OrderIdText}}
                </td>
                <td>
                  Total Price: {{order.TotalAmt | currency: ' ': 2}}
                </td>
                <td>
                  <span ng-class="getColorClass(order.Status)">
                    <i class="fa" ng-class="getFaClass(order.Status)"></i>
                    <span ng-show="order.Status=='PC'">Payment Confirmed</span>
                  </span>
                </td>
                <td>
                  {{order.OrderDate | date:'MM/dd/yyyy'}}
                </td>
              </tr>
              <tr ng-show="newOrdersData.length == 0">
                <td class="empty_data">- No New Order -</td>
              </tr>
            </tbody>
          </table>
          <div class="loading_text loading_row" ng-show="newOrdersData==undefined">
            <i class="fa fa-spinner fa-spin color-theme margin-right-10"></i>
            Loading...
          </div>
          <div class="view_all_row" ng-show="newOrdersData.length == 10">
            <a ng-click="linkToOrdersPage()">View All ({{totalOrders}})</a>
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
            <span><a ng-click="linkToLowStock()">View All ({{totalLowStockAlert + totalOutStockAlert}})</a></span>
          </span>
        </div>
        <div class="group_container">
          <table class="table table_dashboard table_lsa">
            <tbody>
              <tr ng-click="linkToProduct(product.ProductId)" ng-repeat="product in lowStockAlertData | orderBy: 'Quantity' | limitTo:maxLowStockAlert" ng-show="lowStockAlertData.length != 0">
                <td>
                  {{product.PidText}}
                </td>
                <td class="column-text-ellipsis">
                  {{product.ProductNameEn}}
                </td>
                <td>
                  {{product.QuantityText}}
                </td>
                <!-- <td>
                  <button class="btn btn-white btn-width-default" ng-click="linkToProduct(product.ProductId)">View</button>
                </td> -->
              </tr>

              <tr ng-show="lowStockAlertData.length == 0">
                <td class="empty_data">- No Low Stock Alert -</td>
              </tr>
            </tbody>
          </table>
          <div class="loading_text loading_row" ng-show="lowStockAlertData==undefined">
            <i class="fa fa-spinner fa-spin color-theme margin-right-10"></i>
            Loading...
          </div>
          <div class="view_all_row" ng-show="lowStockAlertData.length == 10">
            <a ng-click="linkToLowStock()">View All ({{totalLowStockAlert + totalOutStockAlert}})</a>
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
            <span><a ng-click="linkToAllNewsletters()">View All ({{totalNews}})</a></span>
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
          <div class="loading_text loading_row" ng-show="newsLettersData==undefined">
            <i class="fa fa-spinner fa-spin color-theme margin-right-10"></i>
            Loading...
          </div>
          <div class="view_all_row" ng-show="newsLettersData.length == 10">
            <a ng-click="linkToAllNewsletters()">View All ({{totalNews}})</a>
          </div>
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
          <div class="float-right font-size-20">{{sumTodayRevenue | number:2 }}</div>
        </div>
        <div class="group_container small_field">
          <!-- <div class="row"> -->
          <div class="row_container">
            <div class="width_100">
              This Week
            </div>
            <div>{{sumWeekRevenue | number:2 }}</div>
          </div>
          <div class="row_container">
            <div class="width_100">
              This Month
            </div>
            <div>{{sumMonthRevenue | number:2 }}</div>
          </div>
          <div class="row_container">
            <div class="width_100">
              This Year
            </div>
            <div>{{sumYearRevenue | number:2 }}</div>
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
            <div class="width_150">Delivery Speed</div>
            <div ng-bind-html="rating.DeliverySpeed"></div>
          </div>
        </div>
        <div class="group_container">
          <div class="row_container">
            <div class="width_150">Product Content</div>
            <div ng-bind-html="rating.ProductContent"></div>
          </div>
        </div>
        <div class="group_container">
          <div class="row_container">
            <div class="width_150">Product Validity</div>
            <div ng-bind-html="rating.ProductValidity"></div>
          </div>
        </div>
        <div class="group_container">
          <div class="row_container">
            <div class="width_150">Packaging</div>
            <div ng-bind-html="rating.Packaging"></div>
          </div>
        </div>
        <!-- <div class="group_container">
          <div class="row_container">
            <div class="width_150">
              Ontime Delivery
            </div>
            <div ng-switch on="onTimeDeliveryRank">
              <div class="font-size-16 color-green" ng-switch-when="green">{{onTimeDeliveryScore}}</div>
              <div class="font-size-16 color-yellow" ng-switch-when="yellow">{{onTimeDeliveryScore}}</div>
              <div class="font-size-16 color-red" ng-switch-when="red">{{onTimeDeliveryScore}}</div>
              <div class="font-size-16 " ng-switch-default>N/A</div>
            </div>
          </div>
        </div> -->
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
              <div class="font-size-16 color-grey" ng-switch-default>N/A</div>
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

        <div ng-repeat="product in topSellingItemsData  | limitTo:maxTopSellingItems" ng-show="topSellingItemsData != 'N/A'" class="group_container top_selling_field">
            <img ng-show="product.FeatureImgUrl ==''" class="logo-img" src="<?= $this->asset('/assets/img/placeholder-no-image.png') ?>" />
            <img class="logo-img" src="{{product.FeatureImgUrl}}" />
            <div class="column-text-ellipsis"><a ng-click="linkToProduct(product.ProductId)">{{product.ProductNameEn}}</a></div>
        </div>
        <div class="loading_text loading_row" ng-show="topSellingItemsData==undefined">
          <i class="fa fa-spinner fa-spin color-theme margin-right-10"></i>
          Loading...
        </div>
        <div ng-show="topSellingItemsData == 'N/A'" class="group_container top_selling_field">
            <div class="text-center">- No Top Selling Product This Month -</div>
        </div>
      </div>

    </div>
  </div>

<?php $this->stop() ?>
