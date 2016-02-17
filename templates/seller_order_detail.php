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

    <div class="add-product-body">
      <form class="ah-form sticky-mainform-action">
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
            <? $this->insert('partials/create_coupon_information') ?>
          </div>
          <div role="tabpanel" class="tab-pane margin-top-20" id="conditions">
            <? $this->insert('partials/coupon_condition') ?>
          </div>
        </div>
        <div class="add-product-form-action main-form-action full-width-row">
          <div class="container-fluid">
            <div class="float-right">
              <button class="btn btn-white btn-width-xl">Cancel</button>
              <button class="btn btn-blue btn-width-xl">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

<?php $this->stop() ?>