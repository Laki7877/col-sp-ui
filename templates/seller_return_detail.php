<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Return Requests'])
?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerReturnRequestAddCtrl" ng-init="init(<?= $params ?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="Return Requests/Return Detail" link="{{url}}" icon="fa-inbox">
      <div class="page-header">
        <a class="btn btn-white btn-width-xl" ng-click="cancel()">Close</a>
        <button ng-if="formData.Status != 'AP'"  class="btn btn-green btn-width-xl" ng-click="save()">Accept</button>
        <button ng-if="formData.Status == 'AP'" class="btn btn-green btn-width-xl" ng-click="update()">Save</button>
      </div>
    </nc-page-title>
    <div ng-show="loading" nc-loading="{{loadingMessage}}"></div>
    <div ng-show="saving" nc-loading="{{savingMessage}}"></div>
    <div ng-show="!saving && !loading" print-section>
      <!-- Return Info -->
      <div class="margin-top-30 field_seller">
        <div class="col-xs-12 margin-bottom-30 no-padding">
          <div class="col-xs-4 no-padding">
            <div class="font-size-20">
              <span>Return ID {{formData.ReturnId}}</span>
              <span class="color-dark-grey margin-left-10">
              </span>
            </div>
            <div class="color-dark-grey margin-top-5">
              <div>Request Date: {{formData.ReturnDate | dateTh}}</div>
              <div>Customer Name: {{formData.Order.CustomerName}}</div>
            </div>
          </div>
          <div class="col-xs-4 no-padding">
            <div>
              <span class="font-size-20">Order ID {{formData.Order.OrderId}}</span>
              <span class="margin-left-5" print-hide>
                <a ng-href="/orders/{{formData.Order.OrderId}}">View detail</a>
              </span>
            </div>
            <div class="color-dark-grey margin-top-5">
              <div>Order Date: {{formData.Order.OrderDate | dateTh}}</div>
              <div>Carrier: {{formData.Order.ShippingType}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Order Product List -->
      <div class="table-section table_order">
        <table class="table table-curved product-list-table">
          <thead>
            <tr class="table-head">
              <th class="width_100 ">PID</th>
              <th class="width_100 ">SKU</th>
              <th>Product Name</th>
              <th class="width_100 ">Price / Unit</th>
              <th class="width_100 text-align-center">Quantity</th>
              <th class="width_100 text-align-center">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="product in formData.Order.Products track by $index">
              <td>{{product.Pid}}</td>
              <td>{{product.Sku}}</td>
              <td class="column-text-ellipsis"><span print-only>{{product.ProductNameEn}}</span><a ng-href="/products/{{product.ProductId}}" print-hide>{{product.ProductNameEn}}</a></td>
              <td class="text-align-center">{{product.UnitPrice | currency:' ':2}}</td>
              <td class="text-align-center">{{product.Quantity}}</td>
              <td class="text-align-right">{{(product.UnitPrice * product.Quantity) | currency:' ':2}}</td>
            </tr>
            <tr>
              <td>Sub Total</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="text-align-right">{{formData.Order.TotalAmt | currency:' ':2}}</td>
            </tr>
            <tr ng-if="formData.Order.OrdDiscAmt > 0" class="color-red">
              <td>Discount</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="text-align-right">- {{formData.Order.OrdDiscAmt | currency:' ':2}}</td>
            </tr>
            <tr class="background_light_yellow ">
              <td>Total Order Price</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="text-align-right"><strong>{{formData.Order.GrandTotalAmt | currency:' ':2}}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Return Reason -->
      <div class="add-product-body">
        <form name="form" class="ah-form sticky-mainform-action">
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
              <div id="return_detail_information_tab_content">
                <div class="row">
                  <div class="col-xs-12">
                    <div class="form-section">
                      <div class="form-section-header"><h2>Return Detail</h2></div>
                      <div class="form-section-content">
                        <div nc-template="common/input/form-group-with-label" nc-label="Reason for Return" nc-template-options="{ inputSize: 'xxl' }">
                          <p class="form-control-static noPrintMargin">{{formData.ReasonForReturn}}</p>
                        </div>
                        <div nc-template="common/input/form-group-with-label" nc-template-form="form.CnNumber" nc-template-options="{ labelClass: 'required' }"nc-label="CN Number">
                          <label class="control-label" print-only>{{formData.CnNumber}}</label>
                          <input name="CnNumber" ng-model="formData.CnNumber" class="form-control" required print-hide/>
                        </div>
                        <div nc-template="common/input/form-group-with-label" nc-template-form="form.CnAmount" nc-template-options="{ labelClass: 'required' }"nc-label="CN Amount">
                          <label class="control-label" print-only>{{formData.CnAmount}}</label>
                          <input name="CnAmount" ng-model="formData.CnAmount" class="form-control" ng-pattern-restrict="[0-9]*" required print-hide/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="add-product-form-action main-form-action full-width-row" print-hide>
            <div class="container-fluid">
              <div class="float-right">
                <button class="btn btn-white btn-width-xl" ng-click="cancel()">Close</button>
                <button ng-if="formData.Status != 'AP'" class="btn btn-green btn-width-xl" ng-click="save()">Accept</button>
                <button ng-if="formData.Status == 'AP'" class="btn btn-green btn-width-xl" ng-click="update()">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

<?php $this->stop() ?>
