<div id="import-product-content-page">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Export Inventory</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/button-with-label', ["label" => "Inventory List", "btnClass" => "btn-blue", "buttonText" => "Export"]) ?>					
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Import Inventory</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/upload-field-with-label', ["label" => "Choose File", "input_attrs" => "Browse from your computer", "hint" => "Use the inventory list that you exported"]) ?>
					<? $this->insert('components/forms/button-with-label', ["buttonText" => "Import", "btnClass" => "btn-blue", "modalData" => 'data-toggle="modal" data-target="#import-product"']) ?>
				</div>
			</div>
		</div>
	</div>	
</div>

<? $this->insert('components/modal-import-product', ['id' => 'import-product', 'newProductNum' => '1,500', 'updatedProductNum' => '300']) ?>
