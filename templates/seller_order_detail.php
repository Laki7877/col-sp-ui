<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Orders'])
?>

<?php $this->start('page-body') ?>
  <div ng-controller="SellerOrderAddCtrl" ng-init="init(<?= $params ?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <nc-page-title nc-title="{{title}}" link="{{url}}" icon="fa-inbox">
      <span class="float-right page-header-action">
        <button class="btn btn-white btn-width-xl" ng-click="cancel()">Close</a>
        <button ng-if="getState() == 2 || getState() == 3" class="btn btn-white btn-width-xxl  margin-left-10" print-btn>Print Shipping Label</button>
        <button ng-if="$root.permit(31) && getState() == 1" class="btn btn-blue btn-width-xl margin-left-10" ng-click="acknowledge()">Acknowledge</button>
        <button ng-if="$root.permit(31) && getState() == 2" class="btn btn-blue btn-width-xxl margin-left-10" ng-click="readyShip()">Ready to Ship</button>
        <button ng-if="$root.permit(31) && getState() >= 3" class="btn btn-blue btn-width-xl margin-left-10" ng-click="save()">Save</button>
        <button ng-if="$root.permit(31) && getState() == 3 && merchantFleet()" class="btn btn-blue btn-width-xl margin-left-10" ng-click="delivered()">Delivered</button>
      </span>
    </nc-page-title>
    <div>
    <div ng-show="loading" nc-loading="{{loadingMessage}}"></div>
    <div ng-show="saving" nc-loading="{{savingMessage}}"></div>
    <div ng-show="!loading && !saving">
    <!-- Order Info -->
    <form name="form" class="form-inline noPrintMargin" no-validate print-section>
    <div class="margin-top-30 field_seller">
      <div class="col-xs-12 with_border margin-bottom-30 no-padding">
        <div class="col-xs-6 no-padding">
          <div class="font-size-20">
            <span>Order ID {{formData.OrderId}}</span>
            <span print-hide>
            <span class="margin-left-10 {{formData.Status | mapDropdown:status:'color'}}">
              [<i class="fa {{formData.Status | mapDropdown:status:'icon'}}"></i> {{formData.Status | mapDropdown:status}}]
            </span>
            </span>
          </div>
          <div class="color-dark-grey margin-top-5">
            <div>Order Date: {{formData.OrderDate | dateTh}}</div>
            <div>Shipping Type: {{formData.ShippingType}}</div>
            <div>Payment Type: {{formData.Payment}}</div>
            <div>Carrier: 
              <span ng-if="!(getState() >= 3 && merchantFleet())">{{formData.Carrier}}</span>
              <input ng-if="getState() >= 3 && merchantFleet()" class="form-control margin-top-5 margin-bottom-5 width-input-small" type="text" ng-model="formData.Carrier" />
            </div>
            <div>Tracking Number: 
              <span ng-if="!(getState() >= 3 && merchantFleet())">{{formData.TrackingNumber}}</span>
              <input ng-if="getState() >= 3 && merchantFleet()" class="form-control margin-top-5 margin-bottom-5 width-input-small" type="text" ng-model="formData.TrackingNumber" />
            </div>
          </div>       
        </div>
        <div ng-if="getState() >= 2" class="col-xs-6 no-padding text-align-right ">
            <div class="form-group">
              <label class="font-size-20 padding-right-5" for="invoiceInput">Invoice #<span print-only>{{formData.InvoiceNumber}}</span></label>
              <span class="width-field-small-input" print-hide>
                <input type="text" name="InvoiceNumber" ng-model="formData.InvoiceNumber" ng-class="{'has-error' : isInvalid(form.InvoiceNumber)}" class="form-control width-field-small-input" ng-placeholder="{{getInvoiceState() ? '' : 'Invoice Number (Required)'}}" ng-disabled="!getInvoiceState()" ng-required="getInvoiceState()">
              </span>
            </div>
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
            <div>{{formData.ShipContactor}}</div>
            <div ng-repeat="i in addressIter">{{formData['ShipAddress' + i]}}</div>
          </div>
        </div>
        <div class="col-xs-4 no-padding">
          <div class="font-size-20">
            <span>&nbsp;</span>
          </div>
          <div class="margin-top-5">Billing Address</div>
          <div class="color-dark-grey margin-top-5">
            <div>{{formData.CustomerName}}</div>
            <div ng-repeat="i in addressIter">{{formData['BillAddress' + i]}}</div>
          </div>
        </div>
        <div class="col-xs-4 no-padding">
          <div class="font-size-20">
            <span>&nbsp;</span>
          </div>
          <div class="margin-top-5">Invoice Address</div>
          <div class="color-dark-grey margin-top-5">
            <div>{{formData.CustomerName}}</div>
            <div ng-repeat="i in addressIter">{{formData['InvoiceAddress' + i]}}</div>
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
            <th class="width_100 text-align-center">Order Qty</th>
            <th class="width_100 text-align-center" ng-if="getState() >= 2 ">Shipping Qty</th>
            <th class="width_100 text-align-center">Total Price</th>
          </tr>
        </thead>
        <tbody>
          <!-- ng-if="(getState() >= 3 && product.ShipQuantity != 0) || (getState() < 3)" -->
          <tr ng-repeat="product in formData.Products track by $index">
            <td>{{product.Pid}}</td>
            <td>{{product.Sku}}</td>
            <td class="column-text-ellipsis">
              <span print-only>{{product.ProductNameEn}}</span><a ng-href="/products/{{product.ProductId}}" print-hide>{{product.ProductNameEn}}</a>
            </td>
            <td ng-class="getRedText(product)" class="text-align-center">{{product.UnitPrice | currency:' ':2}}</td>
            <td ng-class="getRedText(product)" class="text-align-center">{{product.Quantity}}</td>
            <td ng-class="getRedText(product)" class="text-align-center" ng-if="getState() >= 2">
              <span ng-if="formData.Status != 'PE'">{{product.ShipQuantity}}</span>
              <span ng-if="formData.Status == 'PE'">
                <input type="number" class="form-control" ng-model="product.ShipQuantity" min="0" max="{{product.Quantity}}" ng-blur="checkQuantity(product)"/>
              </span>
            </td>
            <td ng-class="getRedText(product)" class="text-align-right">{{getPrice(product) | currency:' ':2}}</td>
          </tr>
          <tr>
            <td>Sub Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td ng-if="getState() >= 2 "></td>
            <td class="text-align-right">{{getSubtotal() | currency:' ':2}}</td>
          </tr>
          <tr ng-if="getDiscount() > 0" class="color-red">
            <td>Discount</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td ng-if="getState() >= 2 "></td>
            <td class="text-align-right">- {{getDiscount() | currency:' ':2}}</td>
          </tr>
          <tr class="background_light_yellow ">
            <td>Total Order Price</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td  ng-if="getState() >= 2 "></td>
            <td class="text-align-right"><strong>{{getTotal() | currency:' ':2}}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    </form>

    <!-- New Print Form -->
    <style>
      table.tbType td{
        padding:3px;
      }
      table.tbContent{
        font-size: 12px;
        width: 100%;
        text-align: center;
        border: 1px solid #000;
      }
      table.tbContent td{
        padding: 3px;
      }
    </style>
    <div id="printSectionId" ng-hide="!printSectionId">
      <!-- <img src="img/logo.png" width="35%" class="imgLogo"> -->
      <div class="row" id="row_head">
          <div class="col-lg-7 col-7">
              <div id="boxLeft_1" style="padding: 15px;border: 1px solid #000;height: 255px;">
                  <h4>Name : คุณปวันรัตน์ เผียะผาบ</h4>
                  <h4>Address : </h4>
                  <p>อาคารอุ่นใจ ชั้น 7 เลขที่ 24 ซอยอ่อนนุช 66/1 ถนน
                  สุขุมวิท 77 แขวงสวนหลวง เขตสวนหลวง กรุงเทพฯ
                  10250<br><br></p>
                  <h5>Order Type : Normal</h5>

                  <div class="col-lg-3 col-3"><h5>สินค้าบรรจุ : </h5></div>
                  <div class="col-lg-1 col-1">6</div>
                  <div class="col-lg-2 col-2">กล่อง</div>
                  <div class="col-lg-1 col-1">2</div>
                  <div class="col-lg-2 col-2">ถุง</div>
                  <div class="col-lg-1 col-1">5</div>
                  <div class="col-lg-2 col-2">สินค้า*</div>

                  <div class="col-lg-1 col-1">6</div>
                  <div class="col-lg-4 col-4">กล่องโซนพิเศษ</div>
                  <div class="col-lg-1 col-1">2</div>
                  <div class="col-lg-3 col-3">ถุงโซนพิเศษ</div>
              </div>
              <div  id="boxLeft_2" style="font-size: 11px;margin-top: 10px;padding: 15px;border: 1px solid #000;">
                  <p><b>เงื่อนไขการรับประกันสินค้า :</b> โทรศัพท์มือถือ, แท็บเล็ต และเครื่องใช้ไฟฟ้ า</p>
                  <ol>
                      <li>กรุณาตรวจรับสินค้าทันที เมื่อได้รับสินค้าจากพนังงานส่งสินค้า</li>
                      <li>เซ็นทรัล ออนไลน์ สงวนสิทธิ์ ในการรับคืนสินค้าในทุกกรณี หากลูกค้าไม่ตรวจรับสินค้าทันที หรือกล่องสินค้าถูกเปิ ดในภายหลัง</li>
                      <li>กรณีสินค้าชํารุดจากการผลิต เซ็นทรัล ออนไลน์ จะดําเนินการส่งเคลมที่ศูนย์รับประกัน ภายใต้เงื่อนไขของผู้ผลิตเท่านั้น</li>
                  </ol>
                  <p>E-mail : contact@central.co.th Tel : 02-739-5555 Fax : 02-763-5555</p>
              </div>
          </div>
          <div class="col-lg-5 col-5">
              <div>
                  <h4>Order ID.</h4>
                  <h2 class="margin_left-15">{{formData.OrderId}}</h2>
                  <h4>Delivery ID. / Sub Order ID.</h4>
                  <svg id="code128" class="margin_left-10"></svg>
              </div>
              <div id="boxRight_1" style="padding: 15px;border: 1px solid #000;height: 220px;"></div> 
          </div>

          <hr style="border-style: dotted;border-width: 2px;border-color: black; width: 100%;margin-left: auto;margin-right: auto;">

          <div class="col-lg-12">
              <table class="tbContent" border="1">
                  <thead>
                      <tr>
                          <td>ลำดับ</td>
                          <td>รหัสสินค้า</td>
                          <td>รายการ</td>
                          <td>จำนวน</td>
                          <td>หน่วย</td>
                          <td>ราคาต่อหน่วย</td>
                          <td>จำนวนเงินสุทธิ</td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>1</td>
                          <td>O003116</td>
                          <td class="text-align-left">PIGEON ANTI MOSQUITO WIPES 12 แผ่น PG1172301 </td>
                          <td class="text-align-right">2</td>
                          <td>แพ็ค</td>
                          <td class="text-align-right">55.00</td>
                          <td class="text-align-right">110.00</td>
                      </tr>
                       <tr>
                          <td>2</td>
                          <td>O003117</td>
                          <td class="text-align-left">PIGEON เบบี้ไวพส์คาโมมายล์ 82 ชิ้น แพ็ค 3 3PG1058103CT</td>
                          <td class="text-align-right">2</td>
                          <td>แพ็ค</td>
                          <td class="text-align-right">329.00</td>
                          <td class="text-align-right">658.00</td>
                      </tr>
                      <tr>
                          <td colspan="3" style="border-style: solid solid hidden hidden"></td>
                          <td colspan="3" class="text-align-right">จำนวนเงินทั้งหมด</td>
                          <td class="text-align-right">768.00</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>

    <!-- Cancel Order -->
    <div class="add-product-body">
      <form class="ah-form sticky-mainform-action">
        <div ng-if="getState() >= 0 && $root.permit(31)" class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
            <div class="row">
              <div class="col-xs-12">
                <div class="form-section">
                  <div class="form-section-header"><h2>Cancel Order</h2></div>
                  <div class="form-section-content">
                    <div class="form-group">
                        <div>
                          <p class="form-control-static">Please note that you will be penalized for canceling order. Contact Central Online for more detail.</p>
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
              <!-- <button ng-if="getState() == 2 || getState() == 3" class="btn btn-white btn-width-xxl" print-btn>Print Shipping Label</button> -->
              <button ng-click="printToCart('printSectionId')" class="btn btn-white btn-width-xxl">Print</button>
              <button ng-if="$root.permit(31) && getState() == 1" class="btn btn-blue btn-width-xl" ng-click="acknowledge()">Acknowledge</button>
              <button ng-if="$root.permit(31) && getState() == 2" class="btn btn-blue btn-width-xxl" ng-click="readyShip()">Ready to Ship</button>
              <button ng-if="$root.permit(31) && getState() >= 3" class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
              <button ng-if="$root.permit(31) && getState() == 3 && merchantFleet()" class="btn btn-blue btn-width-xl margin-left-10" ng-click="delivered()">Delivered</button>
            </span>
          </div>
        </div>
      </form>
    <!-- </div> -->
    </div>
  </div>

<?php $this->stop() ?>
