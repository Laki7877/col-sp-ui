<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title"><?=$header?></h3>
      </div>
      <div class="modal-body">
        <form class="ah-form margin-top-20">
          <div class="row">
            <div class="col-xs-12">
              <div class="form-section">
                <div class="form-section-header"><h2>Review Detail</h2></div>
                <div class="form-section-content modal-custom">
                  <?php $this->insert('components/forms/text-with-label', ["label" => "Date & Time", "field_content" => "14/10/2015 at 10:20", "size" => "normal"]) ?>
                  <?php $this->insert('components/forms/text-with-label', ["label" => "Customer", "field_content" => "Harry Belafonte", "size" => "normal"]) ?>
                  <?php $this->insert('components/forms/text-with-label', ["label" => "Comment", "field_content" => "Harry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry BelafonteHarry Belafonte", "size" => "normal"]) ?>
                </div>
              </div>
              <div class="form-section">
                <div class="form-section-header"><h2>Review Product</h2></div>
                <div class="form-section-content modal-custom">
                  <?php $this->insert('components/forms/text-with-label', ["label" => "PID", "field_content" => "1234567", "size" => "normal"]) ?>
                  <?php $this->insert('components/forms/text-with-label', ["label" => "Product Name (ไทย)", "field_content" => "รองเท้าแตะสีรุ้ง", "size" => "normal"]) ?>
                  <?php $this->insert('components/forms/text-with-label', ["label" => "Product Name (English)", "field_content" => "Rainbow Sandal", "size" => "normal"]) ?>
                  <?php $this->insert('components/forms/text-with-label', ["label" => "Brand", "field_content" => "Nike", "size" => "normal"]) ?>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <!-- <div class="modal-footer">

      </div> -->
    </div>
  </div>
</div>
