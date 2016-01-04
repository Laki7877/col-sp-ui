<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Add Attribute Set']) ?>

<?php $this->start('page-body') ?>
	<div>
    <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Attribute/Add Attribute Set", 'link' => "admin_attribute_set"]) ?>
    <form class="ah-form margin-top-30">
      <div class="row">
      <div class="col-xs-12">
        <div class="form-section">
          <div class="form-section-header"><h2>Attribute Set Information</h2></div>
          <div class="form-section-content">
            <? $this->insert('components/forms/input-text-with-label', ["label" => "Attribute Set Name", "label_class" => "required", "size" => "small"]) ?>
            <? $this->insert('components/forms/textarea-with-label', ["label" => "Attribute Set Description"]) ?>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-header"><h2>Attribute Mapping</h2></div>
          <div class="form-section-content">
            
            <div class="tradable-list">
              
              <div class="left-column">
                <div class="search-section section-search">
                  <div class="input-group">
                    <input type="text" class="form-control input-search-icon search-box" placeholder="Search Attribute Name" aria-describedby="basic-addon2">
                    <span class="input-group-btn">
                      <button class="btn btn-white" type="button">Search</button>
                    </span>
                  </div>
                </div>
                <div class="clickable-list">
                  <ul class="content-column">
                    <li>Attribute A</li>
                    <li class="active">Attribute B</li>
                    <li>Attribute C</li>
                    <li>Attribute D</li>
                    <li>Attribute E</li>
                    <li>Attribute F</li>
                    <li>Attribute G</li>
                    <li>Attribute H</li>
                    <li>Attribute J</li>
                    <li>Attribute K</li>
                    <li>Attribute G</li>
                    <li>Attribute H</li>
                    <li>Attribute J</li>
                  </ul>
                </div>
              </div>

              <div class="center-column">
                <div class="trade-button active"> 
                   <i class="fa fa-chevron-right"></i>
                </div>
                <div class="trade-button"> 
                  <i class="fa fa-chevron-left"></i>
                </div>
              </div>

              <div class="right-column">
                <div class="list-header">
                  <span class="column-1">Attribute</span>
                  <span class="column-2">Required?</span>
                  <span class="column-3">Filterable?</span>
                </div>
                <div class="clickable-list">
                  <ul class="content-column">
                    <li>
                      <span class="column-1">Attribute X</span>
                      <span class="column-2"><input type="checkbox" aria-label="Checkbox for following text input"></span>
                      <span class="column-3"><input type="checkbox" aria-label="Checkbox for following text input"></span>
                    </li>
                    <li class="active">
                      <span class="column-1">Attribute Y</span>
                      <span class="column-2"><input type="checkbox" aria-label="Checkbox for following text input"></span>
                      <span class="column-3"><input type="checkbox" aria-label="Checkbox for following text input"></span>
                    </li>
                    <li>
                      <span class="column-1">Attribute Z/span>
                      <span class="column-2"><input type="checkbox" aria-label="Checkbox for following text input"></span>
                      <span class="column-3"><input type="checkbox" aria-label="Checkbox for following text input"></span>
                    </li>
                    
                  </ul>
                </div>
              </div>

            </div>  
          </div>
        </div>

         <div class="form-section">
          <div class="form-section-header"><h2>Visibility</h2></div>
          <div class="form-section-content">
            <? $this->insert('components/forms/dropdown-with-label', ["label" => "Attribute Set Visibility", "label_class" => "required", "options" => ["No", "Yes"]]) ?>

          </div>
        </div>




      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <p class="text-align-right margin-bottom-30"><span class="color-red">*</span> - Required Field</p>
      </div>
    </div>
	</form>

  <div class="add-product-form-action main-form-action full-width-row">
    <div class="container-fluid">
      <div class="float-right">
        <a href="#" class="link-btn-plain">Cancel</a>
        <button class="btn btn-blue btn-width-xl">Save</button>
      </div>
    </div>
  </div>
<?php $this->stop() ?>