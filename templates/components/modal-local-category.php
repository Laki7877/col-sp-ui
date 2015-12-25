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
                <div class="form-section-content">
                  <? $this->insert('components/forms/input-text-with-label', ["label" => "Category Name (Thai)", "label_class" => "required"]) ?>
                  <? $this->insert('components/forms/input-text-with-label', ["label" => "Category Name (Eng)", "label_class" => "required"]) ?>
                  <? $this->insert('components/forms/input-text-with-label', ["label" => "URL (ENG)"]) ?>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
            
      </div>
    </div>
  </div>
</div>