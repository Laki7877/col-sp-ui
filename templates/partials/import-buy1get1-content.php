<div id="import-product-content-page">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Getting Started</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/button-with-label', ["label" => "Import Template", "size" => "large", "btnClass" => "btn-white", "buttonText" => "Download Template"]) ?>	
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
					<? $this->insert('components/forms/button-with-label', ["buttonText" => "Import", "btnClass" => "btn-blue", "modalData" => 'data-toggle="modal" data-target="#import-product-collection"']) ?>
				</div>
			</div>
		</div>
	</div>	
</div>

<? $this->insert('components/modal-import-product-collection', ['id' => 'import-product-collection', 'newProductNum' => '1,500 new products to be imported', 'updatedProductNum' => '300']) ?>
