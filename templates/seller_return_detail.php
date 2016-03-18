<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'Return Detail'])
?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerReturnRequestCtrl">
    <div>
      <nc-page-title nc-title="Return Requests/Return Detail" link="{{url}}" icon="fa-inbox">
        <div class="page-header">
          <a class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</a>
          <button class="btn btn-green btn-width-xl" ng-click="save()">Save</button>
        </div>
      </nc-page-title>
    </div>
    <div class="margin-top-30 field_seller">
      <div class="col-xs-12 margin-bottom-30 no-padding">
        <div class="col-xs-4 no-padding">
          <div class="font-size-20">
            <span>Return ID IV002321</span>
            <span class="color-dark-grey margin-left-10">
            </span>
          </div>
          <div class="color-dark-grey margin-top-5">
            <div>Request Date: 05/11/15</div>
            <div>Customer Name: John Bravo</div>
          </div>
        </div>
        <div class="col-xs-4 no-padding">
          <div>
            <span class="font-size-20">Order ID IV002321</span>
            <span class="margin-left-5">
              <a href="">View detail</a>
            </span>
          </div>
          <div class="color-dark-grey margin-top-5">
            <div>Order Date: 05/11/15</div>
            <div>Carrier: Kerry</div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-section table_order">
      <table class="table table-curved product-list-table">
        <thead>
          <tr class="table-head">
            <th>
              <a class="header-link" href="#"><span>Product Name</span></a>
            </th>
            <th class="width_100 ">
              <a class="header-link" href="#"><span>Price / Unit</span></a>
            </th>
            <th class="width_100 text-align-center">
              <a class="header-link" href="#"><span>Quantity</span></a>
            </th>
            <th class="width_100 text-align-center">
              <a class="header-link" href="#"><span>Total Price</span></a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="column-text-ellipsis"><a href="#">Neleus Men's Slim Fit Long Sleave with Wing on the earth ground</a></td>
            <td class="width_100 ">฿400.00</td>
            <td class="width_100 text-align-center">3</td>
            <td class="width_100 text-align-center">฿1,200.00</td>
          </tr>
          <tr class="background_light_yellow ">
            <td class="">Total Order Price</td>
            <td class="width_100 "></td>
            <td class="width_100 text-align-center"></td>
            <td class="width_100 text-align-center">฿1,200.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="add-product-body">
      <form class="ah-form sticky-mainform-action">
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
            <? $this->insert('partials/seller_return_detail_info') ?>
          </div>
        </div>
        <div class="add-product-form-action main-form-action full-width-row">
          <div class="container-fluid">
            <div class="float-right">
              <button class="btn btn-white btn-width-xl">Cancel</button>
              <button class="btn btn-green btn-width-xl">Accept</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

<?php $this->stop() ?>
