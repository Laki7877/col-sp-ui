<div class="modal fade modal-custom" tabindex="-1" role="dialog" id="<?= $id ?>">
  <div class="modal-dialog change-password-modal">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title"><?=$header?></h3>
      </div>
      <div class="modal-body">
        <form class="ah-form margin-top-20">
          <div class="row">
            <div class="col-xs-12">
              
              <!-- <div class="form-section"> -->
                <div class="form-section-content">
                  <? $this->insert('components/forms/password-field', ["size" => "small", "label" => "Old Password", "label_class" => "required", 'font_class' => 'hide-component']) ?>                  
                  <? $this->insert('components/forms/password-field', ["size" => "small", "label" => "New Password", "label_class" => "required", 'font_class' => 'hide-component', 'form_group_class' => 'margin-top-30']) ?>
                  <? $this->insert('components/forms/password-field', ["size" => "small", "label" => "Confirm Password", "label_class" => "required", 'font_class' => 'hide-component']) ?>
                </div>
              <!-- </div> -->
              <div class="container-fluid no-padding margin-top-20">
                  <div class="float-right">
                    <a href="#" class="link-btn-plain" data-dismiss="modal">Cancel</a>
                    <button class="btn btn-blue btn-width-xl">Save</button>
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