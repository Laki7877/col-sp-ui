<div id="add-product-information-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>

	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Vital Information</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product Name (Thai)", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product Name (English)", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Brand Name", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "SKU", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "UPC", "tooltip" => "This is a tooltip text"]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Price</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Original Price", "hint" => "Example: 200 or 125.50", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Sale Price", "hint" => "Example: 100"]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Description</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/textarea-with-label', ["label" => "Description (Thai)"]) ?>
					<? $this->insert('components/forms/textarea-with-label', ["label" => "Short Description (Thai)", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/textarea-with-label', ["label" => "Description (English)"]) ?>
					<? $this->insert('components/forms/textarea-with-label', ["label" => "Short Description (English)", "tooltip" => "This is a tooltip text"]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Detail</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Attribute Set", "options" => ["แบตเตอรี่เสริม / Power Bank", "สมาร์ทโฟน / Smart Phone"]]) ?>
					<? $this->insert('components/forms/input-text-with-label-unit', ["label" => "Capacity", "unit" => "mAh"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Body Color (Thai)"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Body Color (English)"]) ?>
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Material", "options" => ["พลาสติก / Plastic", "โลหะ / Iron"]]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Keywords</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Search Tag", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Suggested Search Tag"]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Inventory</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Inventory Amount", "hint" => "Example: 100"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Safety Stock Amount", "hint" => "Example: 10", "tooltip" => "This is a tooltip text"]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Shipping Detail</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Shipping Method", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "PID", "tooltip" => "Help text"]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Shipping Detail</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Package Dimension", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Weight", "label_class" => "required"]) ?>
				</div>
			</div>
		</div>
	</div>
</div>