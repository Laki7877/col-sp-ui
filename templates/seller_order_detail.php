<?php
$this->layout('layouts/page-with-sidebar', ['title' => 'Order Detail'])
?>

<?php $this->start('page-body') ?>
  <div>
    <div>
      <? $this->insert('components/page-title-with-buttons', ['text' => 'Orders/Order Detail',
        'buttons' => [
            ['link' => '#', 'class' => 'btn-white btn-width-xl', 'name' => 'Print Invoice'],
            ['link' => '#', 'class' => 'btn-white btn-width-xxl', 'name' => 'Print Shipping Label'],
            ['link' => '#', 'class' => 'btn-blue btn-width-xl', 'name' => 'Ready to Ship']
          ]
        ]) 
      ?>    
    </div>
    <div class="margin-top-30 field_seller">
      <div class="col-xs-12 with_border margin-bottom-30 no-padding">
        <div class="col-xs-6 no-padding">
          <div class="font-size-20">
            <span>Order ID IV002321</span>
            <span class="color-dark-grey margin-left-10">
              [<i class="fa fa-check-circle-o"></i> Payment Confirm]
            </span>
          </div>
          <div class="color-dark-grey margin-top-5">
            <div>Order Date: 05/11/15</div>
            <div>Carrier: Kerry</div>
            <div>Tracking Number: n/a</div>
          </div>
        </div>
        <div class="col-xs-6 no-padding text-align-right ">
          <form class="form-inline">
            <div class="form-group">
              <label class="font-size-20 padding-right-5" for="invoiceInput">Invoice #</label>
              <span class="width-field-small-input">
                <input type="text" class="form-control width-field-small-input" id="invoiceInput" placeholder="Invoice Number (Required)">
              </span>            
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="margin-top-30 field_seller">
      <div class="col-xs-12 margin-bottom-30 no-padding">
        <div class="col-xs-4 no-padding">
          <div class="font-size-20">
            <span>Customer Name: John Bravo</span>
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
            <td class="width_100 text-align-center">1</td>
            <td class="width_100 text-align-center">฿400.00</td>
          </tr>
          <tr>
            <td class="column-text-ellipsis"><a href="#">Power Bank MD Tech Model B01</a></td>
            <td class="width_100 ">฿200.00</td>
            <td class="width_100 text-align-center">2</td>
            <td class="width_100 text-align-center">฿800.00</td>
          </tr>
          <tr>
            <td class="">Sub Total</td>
            <td class="width_100 "></td>
            <td class="width_100 text-align-center"></td>
            <td class="width_100 text-align-center">฿1,200.00</td>
          </tr>
          <tr class="color-red">
            <td class="">Discount: Father Day Coupon</td>
            <td class="width_100 "></td>
            <td class="width_100 text-align-center"></td>
            <td class="width_100 text-align-center">- ฿200.00</td>
          </tr>
          <tr class="color-red">
            <td class="">Discount: Winter Sale</td>
            <td class="width_100 "></td>
            <td class="width_100 text-align-center"></td>
            <td class="width_100 text-align-center">- ฿120.00</td>
          </tr>
          <tr class="background_light_yellow ">
            <td class="">Total Order Price</td>
            <td class="width_100 "></td>
            <td class="width_100 text-align-center"></td>
            <td class="width_100 text-align-center">฿880.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="add-product-body">
      <form class="ah-form sticky-mainform-action">
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
            <? $this->insert('partials/order_cancel') ?>
          </div>
        </div>
        <div class="add-product-form-action main-form-action full-width-row">
          <div class="container-fluid">
            <div class="float-right">
              <button class="btn btn-white btn-width-xl">Print Invoice</button>
              <button class="btn btn-white btn-width-xxl">Print Shipping Label</button>
              <button class="btn btn-blue btn-width-xl">Ready to Ship</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

<?php $this->stop() ?>