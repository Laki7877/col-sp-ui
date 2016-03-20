<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'Order Detail'])
?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerOrderAddCtrl" ng-init="init(<?= $params ?>)">
    <nc-page-title nc-title="{{title}}" link="{{url}}" icon="fa-inbox">
      <span class="float-right page-header-action">
        <button class="btn btn-white btn-width-xl" ng-click="cancel()">Close</a>
        <button ng-if="getState() == 2 || getState() == 3" class="btn-white btn-width-xxl" ng-click="printLabel">Print Shipping Label</button>
        <button ng-if="getState() == 1" class="btn btn-blue btn-width-xl" ng-click="acknowledge">Acknowledge</button>
        <button ng-if="getState() == 2" class="btn btn-blue btn-width-xxl" ng-click="readyShip()">Ready to Ship</button>
        <button ng-if="getState() >= 3" class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
      </span> 
    </nc-page-title>
    <!-- Order Info -->
    <div class="margin-top-30 field_seller">
      <div class="col-xs-12 with_border margin-bottom-30 no-padding">
        <div class="col-xs-6 no-padding">
          <div class="font-size-20">
            <span>Order ID {{formData.OrderId}}</span>
            <span class="color-dark-grey margin-left-10">
              [<i class="fa {{formData.Status | mapDropdown:status:'icon'}}"></i> {{formData.Status | mapDropdown:status}}]
            </span>
          </div>
          <div class="color-dark-grey margin-top-5">
            <div>Order Date: {{formData.OrderDate | dateTh}}</div>
            <div>Carrier: {{formData.ShippingType}}</div>
            <div>Tracking Number: {{getTrackingNumber()}}</div>
          </div>
        </div>
        <div ng-if="getState() >= 2" class="col-xs-6 no-padding text-align-right ">
          <form name="form" class="form-inline">
            <div class="form-group">
              <label class="font-size-20 padding-right-5" for="invoiceInput">Invoice #</label>
              <span class="width-field-small-input">
                <input type="text" name="InvoiceNumber" ng-class="{'has-error' : isInvalid(form.InvoiceNumber)" class="form-control width-field-small-input" placeholder="Invoice Number (Required)">
              </span>            
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Address -->
    <div class="margin-top-30 field_seller">
      <div class="col-xs-12 margin-bottom-30 no-padding">
        <div class="col-xs-4 no-padding">
          <div class="font-size-20">
            <span>Customer Name: {{formData.CustomerName}}</span>
          </div>
          <div class="margin-top-5">Shipping Address</div>
          <div class="color-dark-grey margin-top-5">
            <div>Mr. John Bravo</div>
            <div>268/23 A450 Riverline</div>
            <div>Riverview Street, Bangkok, 10234</div>
          </div>
        </div>
        <div class="col-xs-4 no-padding">
          <div class="font-size-20">
            <span>&nbsp;</span>
          </div>
          <div class="margin-top-5">Billing Address</div>
          <div class="color-dark-grey margin-top-5">
            <div>Mr. John Bravo</div>
            <div>268/23 A450 Riverline</div>
            <div>Riverview Street, Bangkok, 10234</div>
          </div>
        </div>
        <div class="col-xs-4 no-padding">
          <div class="font-size-20">
            <span>&nbsp;</span>
          </div>
          <div class="margin-top-5">Invoice Address</div>
          <div class="color-dark-grey margin-top-5">
            <div>Mr. John Bravo</div>
            <div>268/23 A450 Riverline</div>
            <div>Riverview Street, Bangkok, 10234</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Order Product List -->
    <div class="table-section table_order">
      <table class="table table-curved product-list-table">
        <thead>
          <tr class="table-head">
            <th>Product Name</th>
            <th class="width_100 ">Price / Unit</th>
            <th class="width_100 text-align-center">Order Qty</th>
            <th class="width_100 text-align-center">Shipping Qty</th>
            <th class="width_100 text-align-center">Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="product in formData.Products track by $index">
            <td class="column-text-ellipsis"><a ng-href="/products/{{product.ProductId}}">{{product.ProductNameEn}}</a></td>
            <td class="text-align-center">{{product.UnitPrice | currency:' ':2}}</td>
            <td class="text-align-center">{{product.Quantity}}</td>
            <td class="text-align-center">
              <span ng-if="formData.Status != 'PE'">{{product.ShipQuantity}}</span>
              <span ng-if="formData.Status == 'PE'">
                <input type="number" ng-model="product.ShipQuantity" min="0" max="{{product.Quantity}}" />
              </span>
            </td>
            <td class="text-align-right">{{(product.UnitPrice * product.Quantity) | currency:' ':2}}</td>
          </tr>
          <tr>
            <td>Sub Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td class="text-align-right">{{formData.TotalAmt | currency:' ':2}}</td>
          </tr>
          <tr ng-if="formData.OrdDiscAmt > 0" class="color-red">
            <td>Discount</td>
            <td></td>
            <td></td>
            <td></td>
            <td class="text-align-right">- {{formData.OrdDiscAmt | currency:' ':2}}</td>
          </tr>
          <tr class="background_light_yellow ">
            <td>Total Order Price</td>
            <td></td>
            <td></td>
            <td></td>
            <td class="text-align-right"><strong>{{formData.GrandTotalAmt | currency:' ':2}}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Cancel Order -->
    <div class="add-product-body">
      <form class="ah-form sticky-mainform-action">
        <div ng-if="getState() >= 0" class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
            <div class="row">
              <div class="col-xs-12">
                <div class="form-section">
                  <div class="form-section-header"><h2>Cancel Order</h2></div>
                  <div class="form-section-content">
                    <div class="form-group">
                        <div>
                          <p class="form-control-static">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <button class="btn btn-red btn-width-xl margin-top-20" ng-click="cancelOrder()">Cancel Order</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    <!-- Bottom buttons -->
        <div class="add-product-form-action main-form-action full-width-row">
          <div class="container-fluid">
            <span class="float-right">
              <button class="btn btn-white btn-width-xl" ng-click="cancel()">Close</a>
              <button ng-if="getState() == 2 || getState() == 3" class="btn-white btn-width-xxl" ng-click="printLabel">Print Shipping Label</button>
              <button ng-if="getState() == 1" class="btn btn-blue btn-width-xl" ng-click="acknowledge">Acknowledge</button>
              <button ng-if="getState() == 2" class="btn btn-blue btn-width-xxl" ng-click="readyShip()">Ready to Ship</button>
              <button ng-if="getState() >= 3" class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
            </span> 
          </div>
        </div>
      </form>
    </div>
  </div>

<?php $this->stop() ?>