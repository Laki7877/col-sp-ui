<div id="import-product-content-page">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Getting Started</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/button-with-label', ["label" => "Import Product Template", "size" => "large", "btnClass" => "btn-white", "buttonText" => "Download Template (.xls)"]) ?>					
					<? $this->insert('components/forms/button-with-label', ["label" => "Category ID List", "size" => "large", "btnClass" => "btn-white", "buttonText" => "Download Category ID (.xls)"]) ?>					
					<? $this->insert('components/forms/button-with-label', ["label" => "Guideline", "size" => "large", "btnClass" => "btn-white", "buttonText" => "Download Guideline (.pdf)"]) ?>					
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Upload File</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/upload-field-with-label', ["label" => "Choose File", "input_attrs" => "Browse from your computer"]) ?>
					<? $this->insert('components/forms/button-with-label', ["buttonText" => "Import", "btnClass" => "btn-blue"]) ?>
				</div>
			</div>
		</div>
	</div>	
</div>