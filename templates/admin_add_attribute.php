<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'User Profile']) ?>

<?php $this->start('page-body') ?>
	<div>
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Attribute/Add Attribute", 'link' => "admin_attribute"]) ?>
    <form class="ah-form sticky-mainform-action margin-top-30">
      <div class="row">
        <div class="col-xs-12">
          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Information</h2></div>
            <div class="form-section-content">
              <? $this->insert('components/forms/input-text-with-label', ["label" => "Attribute Name (English)", "label_class" => "required", "tooltip" => "The Universal Product Code (UPC) is a barcode symbology (i.e., a specific type of barcode) that is widely used in the USAX.", "size" => "large"]) ?>
              <? $this->insert('components/forms/input-text-with-label', ["label" => "Display Name (English)", "label_class" => "required", "size" => "large"]) ?>
              <? $this->insert('components/forms/input-text-with-label', ["label" => "Display Name (Thai)", "label_class" => "required", "size" => "large"]) ?>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Input</h2></div>
            <div class="form-section-content">
              <? $this->insert('components/forms/dropdown-with-label', ["label" => "Attribute Input Type", "options" => ["Free Text", "Dropdown", "HTML Box"]]) ?>
              <? $this->insert('components/forms/input-text-with-label', ["label" => "Attribute Unit (Thai)", "label_class" => "required"]) ?>
              <? $this->insert('components/forms/input-text-with-label', ["label" => "Attribute Unit (English)", "label_class" => "required"]) ?>
              <? $this->insert('components/forms/dropdown-with-label', ["label" => "Input Validation", "options" => ["No Validation", "Number Only", "Text Only"]]) ?>
              <? $this->insert('components/forms/input-text-with-label', ["label" => "If empty, value equals"]) ?>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-header"><h2>Attribute Input</h2></div>
            <div class="form-section-content">
              <? $this->insert('components/forms/dropdown-with-label', ["label" => "Attribute Input Type", "options" => ["Dropdown", "HTML Box", "Free Text"]]) ?>
              
              <div class="form-group">
                <div class="width-label"><label class="control-label required">
                  Dropdown Choice</label>
                </div>
                <div class="width-field-xxl">
                  <div class="multiple-input">
                    <div class="input-column input-xxl">
                      <input type="text" class="form-control" placeholder="Option 1 (Thai)"/>
                    </div>
                    <div class="input-column input-xxl">
                      <input type="text" class="form-control" placeholder="Option 2 (English)"/>
                    </div>
                    <i class="clickable fa fa-trash fa-2x margin-left-10 color-grey margin-top-5"></i>
                  </div>
                </div>
              </div>

               <div class="form-group">
                <div class="width-label">
                  <label class="control-label">
                  </label>
                </div>
                <div class="width-field-xxl">
                  <div class="multiple-input">
                    <div class="input-column input-xxl">
                      <input type="text" class="form-control" placeholder="Option 1 (Thai)"/>
                    </div>
                    <div class="input-column input-xxl">
                      <input type="text" class="form-control" placeholder="Option 2 (English)"/>
                    </div>
                    <i class="clickable fa fa-trash fa-2x margin-left-10 color-grey margin-top-5"></i>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="width-label"></div>
                <div class="width-field-normal  margin-bottom-20">
                  <a class="like-text form-text">
                    <i class="fa fa-plus-circle color-theme"></i>
                    Add more option
                  </a>
                </div>
              </div>
            
            <? $this->insert('components/forms/input-text-with-label', ["label" => "If empty, value equals"]) ?>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-header"><h2>Attribute Input</h2></div>
          <div class="form-section-content">
            <? $this->insert('components/forms/dropdown-with-label', ["label" => "Attribute Input Type", "options" => ["HTML Box", "Free Text", "Dropdown"]]) ?>
            <? $this->insert('components/forms/input-text-with-label', ["label" => "If empty, value equals"]) ?>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-header"><h2>Variation</h2></div>
          <div class="form-section-content">
            <? $this->insert('components/forms/dropdown-with-label', ["label" => "Set as Variation", "options" => ["No", "Yes"]]) ?>
            <? $this->insert('components/forms/dropdown-with-label', ["label" => "Variation Display Type", "options" => ["- Select Display Type -", "Dropdown", "Text Box", "Image Box"]]) ?>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-header"><h2>Search Property</h2></div>
          <div class="form-section-content">
            <? $this->insert('components/forms/dropdown-with-label', ["label" => "Use in Global <br> Advanced Search", "options" => ["No", "Yes"]]) ?>
            <? $this->insert('components/forms/dropdown-with-label', ["label" => "Use in Local <br> Advanced Search", "options" => ["No", "Yes"]]) ?>
          </div>
        </div>


      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <p class="text-align-right"><span class="color-red"><i class="fa fa-asterisk"></i></span> - Required Field</p>
      </div>
    </div>
    <div class="main-form-action full-width-row">
      <div class="container-fluid">
        <div class="float-right">
          <a href="#" class="link-btn-plain">Cancel</a>
          <button class="btn btn-blue btn-width-xl">Save</button>
        </div>
      </div>
    </div>
	</form>

<?php $this->stop() ?>