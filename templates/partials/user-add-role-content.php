<div id="add-product-more-option-tab-content">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Role Information</h2></div>
				<div class="form-section-content">
					<?php $this->insert('components/forms/text-with-label', ["label" => "Shop Type ID", "field_content" => "001"]) ?>					
					<?php $this->insert('components/forms/input-text-with-label', ["label" => "Type Name", "label_class" => "required"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Role Permission</h2></div>
				<div class="form-section-content">
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "All Features", "choices" => ["Select All"]]) ?>
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Dashboard", "choices" => ["View Dashboard"]]) ?>
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Product", 
						"choices" => ["View Product", "Add Product", "Delete Product", "Edit Product", "Edit Information", "Edit Price" , "Edit Inventory", "Edit Transalation", "Edit Visibility", "Restore Revision", "Manage Product Review"],
						"label_input_class" => ['','','','','margin-left-30','margin-left-60','margin-left-60','margin-left-60']
						]) ?>

					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Inventory", "choices" => ["View Inventory", "Edit Inventory"]]) ?>
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Promotion", "choices" => ["View Promotion", "Edit Promotion"]]) ?>
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Order", "choices" => ["View Order List", "Edit Order List", "View Return List", "Edit Return List"]]) ?>
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Shop Setting", "choices" => ["Shop Profile Setting", "Shop Appearance Setting"]]) ?>
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Order", "choices" => ["Account", "View Sub Account", "Edit Sub Account", "Manage Roles"]]) ?>
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Report", "choices" => ["View Report"]]) ?>
				</div>
			</div>
		</div>
	</div>	
	<div class="row">
		<div class="col-xs-12">
			<p class="text-align-right"><span class="color-red"><i class="fa fa-asterisk"></i></span> - Required Field</p>
		</div>
	</div>
</div>