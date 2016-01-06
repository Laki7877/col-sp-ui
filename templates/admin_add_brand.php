<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'User Profile']) ?>

<?php $this->start('page-body') ?>
	<div>
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Brand/Add Brand", 'link' => "admin_brand"]) ?>
    <form class="ah-form margin-top-30">
      <div class="row">
      <div class="col-xs-12">
        
        <form class="ah-form">
            <div class="row">
              <div class="col-xs-12">
                <div class="form-section">
                  <div class="form-section-header">
                    <h2>Brand Information</h2>
                  </div>
                  <div class="form-section-content modal-custom">
                    <? $this->insert('components/forms/input-text-with-label', ["label" => "Brand Name","label_class" => "required"]) ?>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-section-header">
                    <h2>Image</h2>
                  </div>
                  <div class="form-section-content modal-custom">
                    <div class="form-group ">
                      <div class="width-label"><label class="control-label required">Logo File</label></div>
                      <div class="width-field-normal margin-top-7">
                        <input type="file" name="img">
                        <span class="help-block">Must be 160 px by 60 px in JPG or PNG</span>
                      </div>
                    </div>
                    <div class="form-group ">
                      <div class="width-label"><label class="control-label">Current Logo</label></div>
                      <div class="width-field-normal margin-top-7">
                        <a href="#">Logo-ABC.png</a> <span class="color-grey">None</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-section">
                  <div class="form-section-header"><h2>SEO</h2></div>
                  <div class="form-section-content">
                    <? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Title", "tooltip" => "Test", "tooltip" => "This is a tooltip text"]) ?>
                    <? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Description", "tooltip" => "This is a tooltip text"]) ?>
                    <? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Keywords", "tooltip" => "This is a tooltip text"]) ?>
                    <? $this->insert('components/forms/input-text-with-label', ["label" => "Brand URL Key", "tooltip" => "This is a tooltip text"]) ?>
                  </div>
                </div>
              </div> <!-- end .col-xs-12 -->
            </div> <!-- end .row -->
          </form>


      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <p class="text-align-right margin-bottom-30"><span class="color-red">*</span> - Required Field</p>
      </div>
    </div>
	</form>

  <div class="add-product-form-action main-form-action full-width-row sticky-footer">
    <div class="container-fluid">
      <div class="float-right">
        <a href="#" class="link-btn-plain">Cancel</a>
        <button class="btn btn-blue btn-width-xl">Save</button>
      </div>
    </div>
  </div>
<?php $this->stop() ?>