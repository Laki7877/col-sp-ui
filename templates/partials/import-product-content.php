<div id="import-product-content-page">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Getting Started</h2></div>
				<div class="form-section-content">
					<?php $this->insert('components/forms/button-with-label', ["label" => "Import Product Template", "size" => "large", "btnClass" => "btn-white", "buttonText" => "Download Template"]) ?>					
					<?php $this->insert('components/forms/button-with-label', ["label" => "Category ID List", "size" => "large", "btnClass" => "btn-white", "buttonText" => "Download Category ID"]) ?>
					<?php $this->insert('components/forms/button-with-label', ["label" => "Brand ID List", "size" => "large", "btnClass" => "btn-white", "buttonText" => "Download Brand ID"]) ?>
					<?php $this->insert('components/forms/button-with-label', ["label" => "Attribute ID List", "size" => "large", "btnClass" => "btn-white", "buttonText" => "Download Attribute ID"]) ?>
					<?php $this->insert('components/forms/button-with-label', ["label" => "Guideline", "size" => "large", "btnClass" => "btn-white", "buttonText" => "Download Guideline"]) ?>					
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Upload File</h2></div>
				<div class="form-section-content">
					<?php $this->insert('components/forms/upload-field-with-label', ["label" => "Choose File", "input_attrs" => "Browse from your computer"]) ?>
					<?php $this->insert('components/forms/button-with-label', ["buttonText" => "Import", "btnClass" => "btn-blue", "modalData" => 'data-toggle="modal" data-target="#import-product"']) ?>
				</div>
			</div>
		</div>
	</div>	
</div>

<?php $this->insert('components/modal-import-product', ['id' => 'import-product', 'newProductNum' => '1,500 new products to be imported', 'updatedProductNum' => '300']) ?>
