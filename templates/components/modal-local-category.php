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
                <div class="form-section-header"><h2>Local Category Detail</h2></div>
                <div class="form-section-content modal-custom">
                  <? $this->insert('components/forms/input-text-with-label', ["label" => "Category Name (Thai)", "label_class" => "required", "input_class" => "has-error", "error_message" => "Cannot use special characters such as ! # $ % ^ &"]) ?>
                  <? $this->insert('components/forms/input-text-with-label', ["label" => "Category Name (Eng)", "label_class" => "required",  "input_class" => "has-error", "error_message" => "This is a required field."]) ?>
                  <? $this->insert('components/forms/input-text-with-label', ["label" => "URL (ENG)"]) ?>
                </div>
              </div>
              <div class="form-section">
                <div class="form-section-header"><h2>Local Category Detail</h2></div>
                <div class="form-section-content modal-custom">
                  <? $this->insert('components/forms/multiple-radio-multiline', ["label" => "URL (ENG)", "choices" =>["Hide", "Show"] ]) ?>
                </div>
              </div>
            </div>
            <div class="category-footer col-xs-12">
              <span class="float-right">
                  <a class="link-btn-plain" data-dismiss="modal">Cancel</a>
                  <button type="button" class="btn btn-blue btn-width-xl">Select</button>
              </span>
            </div>
          </div>
        </form>
      </div>
      <!-- <div class="modal-footer">
            
      </div> -->
    </div>
  </div>
</div>