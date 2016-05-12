<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'Order Shipping List'])
?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerOrderShippingListCtrl">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Shipping List" print-section>
      <span class="float-right page-header-action">
        <h4 class="margin-top-10 margin-bottom-5">Total Order: {{orders.length}} | Date: {{dateNow | dateTh}}</h4>
      </span>
    </nc-page-title>
    <div>
    <!-- Order List -->
    <div class="table-section table_order" print-section>
      <table class="table table-curved product-list-table">
        <thead>
          <tr class="table-head">
            <th class="width_100">Order Date</th>
            <th class="width_100">Order ID</th>
            <th class="width_150">Customer Name</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="order in orders track by $index">
            <td>{{order.OrderDate | dateTh}}</td>
            <td>{{order.OrderId}}</td>
            <td>{{order.CustomerName}}</td>
            <td>{{order.Remark}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </form>
    <div class="add-product-body">
      <form class="ah-form sticky-mainform-action">
      <!-- Signature -->
      <div print-section>
        <div class="row">
          <div class="col-xs-4">
            <div class="signature-box">

            </div>
            <div class="signature-provider">Logistic Service Provider</div>
          </div>
          <div class="col-xs-4 col-xs-offset-4">
            <div class="signature-box">

            </div>
            <div class="signature-provider">Authorized Personnel</div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-4">
            <div class="signature-box">

            </div>
            <div class="signature-provider">Date</div>
          </div>
          <div class="col-xs-4 col-xs-offset-4">
            <div class="signature-box">

            </div>
            <div class="signature-provider">Date</div>
          </div>
        </div>
      </div>

      <!-- Bottom buttons -->
        <div class="add-product-form-action main-form-action full-width-row">
          <div class="container-fluid">
            <span class="float-right">
              <button class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</a>
              <button class="btn btn-blue btn-width-xl" print-btn>Print</button>
            </span>
          </div>
        </div>
      </form>
    </div>
    </div>
  </div>

<?php $this->stop() ?>
