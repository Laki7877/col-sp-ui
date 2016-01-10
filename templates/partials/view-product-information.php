<div id="add-product-information-tab-content">
	<? $this->insert('components/alert-text', ['color' => 'green', 'close' => false, 'text' => 'This version has been approved on 15/12/2015 at 10:20. Click “Restore” to revert to this version.']) ?>
	<? $this->insert('components/alert-text', ['color' => 'yellow', 'close' => false, 'text' => 'This product is waiting for approval for the admin. You cannot edit any product detail now.']) ?>
	<? $this->insert('components/alert-text-with-header', ['color' => 'red', 'close' => false, 'header' => 'Message from Admin (11/12/2015 at 10:20)', 'text' => 'This product is not approved because the image does not match with the description. Please change it and published again.']) ?>

	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>

	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Overview</h2></div>
				<div class="form-section-content padding-left-30 padding-right-30">
					<div class="view-product-overview-table">
						<table class="table margin-0 ah-table ah-table-line ah-table-extra-padding">
							<thead>
								<tr>
									<th>Product Name</th>
									<th>Info.</th>
									<th>Image</th>
									<th>Status</th>
									<th>Live</th>
									<th>Visible</th>
									<th>Modified</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="">Power Bank MD Tech Model B02</td>
									<td class="info-column"><i class="fa fa-check color-green icon-size-18px"></i></td>
									<td class="image-column"><i class="fa fa-check color-green icon-size-18px"></i></td>
									<td class="status-column">
										<span class="color-red">
											<i class="fa fa-ban"></i>
											Not Approved
										</span>
									</td>
									<td class="live-column"><i class="fa fa-circle color-red"></i></td>
									<td class="visible-column"><i class="fa fa-eye color-dark-grey eye-icon"></i></td>
									<td class="modified-column">14/12/15</td>
								</tr>
								<tr>
									<td class="">Power Bank MD Tech Model B02</td>
									<td class="info-column"><i class="fa fa-check color-green icon-size-18px"></i></td>
									<td class="image-column"><i class="fa fa-check color-green icon-size-18px"></i></td>
									<td class="status-column">
										<span class="color-green">
											<i class="fa fa-check-circle-o"></i>
											Approved
										</span>
									</td>
									<td class="live-column"><i class="fa fa-circle color-green"></i></td>
									<td class="visible-column"><i class="fa fa-eye color-dark-grey eye-icon"></i></td>
									<td class="modified-column">14/12/15</td>
								</tr>
								<tr>
									<td class="">Power Bank MD Tech Model B02</td>
									<td class="info-column"><i class="fa fa-check color-green icon-size-18px"></i></td>
									<td class="image-column"><i class="fa fa-check color-green icon-size-18px"></i></td>
									<td class="status-column">
										<span class="color-yellow">
											<i class="fa fa-circle-o"></i>
											Wait for Approval
										</span>
									</td>
									<td class="live-column"><i class="fa fa-circle color-green"></i></td>
									<td class="visible-column"><i class="fa fa-eye-slash color-grey eye-icon"></i></td>
									<td class="modified-column">14/12/15</td>
								</tr>
								<tr>
									<td class="">Power Bank MD Tech Model B02</td>
									<td class="info-column"><i class="fa fa-check color-green icon-size-18px"></i></td>
									<td class="image-column"><i class="fa fa-check color-green icon-size-18px"></i></td>
									<td class="status-column">
										<span class="color-grey">
											<i class="fa fa-circle-o"></i>
											Draft
										</span>
									</td>
									<td class="live-column"><i class="fa fa-circle color-red"></i></td>
									<td class="visible-column"><i class="fa fa-eye-slash color-grey eye-icon"></i></td>
									<td class="modified-column">14/12/15</td>
								</tr>
								<tr>
									<td colspan="7">
										This product was previously approved on 15/12/2015 at 10:20. <a href="#">View Approved Version</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Vital Information</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "Product Name (Thai)", "label_class" => "required", "size" => "large", 'value' => 'แบตเตอรี่สำรอง MD Tech รุ่น B02']) ?>
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "Product Name (English)", "label_class" => "required", "size" => "large", 'value' => 'Power Bank MD Tech Model B02']) ?>
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "SKU", "label_class" => "required", "size" => "large", 'value' => 'OFM4002933']) ?>
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "UPC", "tooltip" => "The Universal Product Code (UPC) is a barcode symbology (i.e., a specific type of barcode) that is widely used in the USAX.", "size" => "large", 'value' => '']) ?>
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "PID", "tooltip" => "Help text", "value" => "Only for Central Fulfillment", 'value' => '', 'size' => 'large']) ?>
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "Brand Name", "label_class" => "required", 'value' => 'MDTECH', 'input_class' => 'input-icon-right-search', 'placeholder' => 'Search for Brand Name']) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Price</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "Original Price", "hint" => "Example: 200 or 125.50", "label_class" => "required", 'value' => '1300']) ?>
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "Sale Price", "hint" => "Example: 100", 'value' => '']) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Description</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (Thai)", "size" => "xxl"]) ?>
					<? $this->insert('components/forms/textarea-with-label', ["label" => "Short Description (Thai)", "tooltip" => "This is a tooltip text", "size" => "xxl", "form_group_class" => "margin-top-30"]) ?>
					<? $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (English)", "size" => "xxl", "form_group_class" => "margin-top-40"]) ?>
					<? $this->insert('components/forms/textarea-with-label', ["label" => "Short Description (English)", "tooltip" => "This is a tooltip text", "size" => "xxl", "form_group_class" => "margin-top-30"]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Detail</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Attribute Set", "options" => ["แบตเตอรี่เสริม / Power Bank", "สมาร์ทโฟน / Smart Phone"]]) ?>
					<? $this->insert('components/forms/input-text-with-label-unit', ["label" => "Capacity", "unit" => "mAh", "form_group_class" => "margin-top-30"]) ?>
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "Body Color (Thai)", 'value' => 'ขาว']) ?>
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "Body Color (English)", 'value' => 'White']) ?>
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Material", "options" => ["พลาสติก / Plastic", "โลหะ / Iron"]]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Keywords</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Search Tag", "tooltip" => "This is a tooltip text", 
							"input_class" => "select2-init-simple select2-init-track", 
							"size" => "large", "input_attrs" => 'data-tags="true" data-placeholder="Separated by a comma" multiple="multiple"', "options" => []]) ?>
					<? $this->insert('components/forms/tags-with-label', ["label" => "Suggested Search Tag"]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Inventory</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "Inventory Amount", "hint" => "Example: 100", 'value' => '1000']) ?>
					<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "Safety Stock Amount", "hint" => "Example: 10", "tooltip" => "This is a tooltip text", 'value' => '100']) ?>
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Stock Type", "options" => ["Stock", "Others"]]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Shipping Detail</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/multiple-radio-multiline', ["label" => "Shipping Method", "choices" => ["Dropship by 3PL", "Central Fulfillment"]]) ?>
					<? $this->insert('components/forms/input-text-with-label-unit', ["label" => "Preparation Time", "label_class" => "required", "unit" => "Day", "ng_model" => "PrepareDay", "form_group_class" => "margin-top-30"]) ?>
					<? $this->insert('components/forms/multiple-input-with-label', ["label" => "Package Dimension", "label_class" => "required", "form_group_class" => "margin-top-30"]) ?>
					<? $this->insert('components/forms/multiple-input', ["label" => "Weight", "label_class" => "required"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<p class="text-align-right margin-bottom-30"><span class="color-red">*</span> - Required Field</p>
		</div>
	</div>
</div>
