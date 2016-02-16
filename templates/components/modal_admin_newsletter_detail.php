<div class="modal fade modal-custom" tabindex="-1" role="dialog" id="<?= $id ?>">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> -->
        <h3 class="modal-title modal_title_abosolute"><?=$header?></h3>
        <div class="title_relative">
          <div class="float-right">
            <a href="#" class="link-btn-plain" data-dismiss="modal">Cancel</a>
            <button class="btn btn-blue btn-width-xl">Save</button>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <form class="ah-form margin-top-20">
          <div class="row">
            <div class="col-xs-12">
              <div class="form-section-content">
                <? $this->insert('components/forms/input-text-with-label', ["label" => "Subject"]) ?>
                <? $this->insert('components/forms/textarea-with-label', ["label" => "Content", 'size' => 'large', 'rows' => '10']) ?>          
                <? $this->insert('components/forms/input-text-with-label', ["label" => "Publish Date", "input_class" => "input-icon-calendar"]) ?>
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