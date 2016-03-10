<div id="add-product-more-option-tab-content">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Admin Account Information</h2></div>
				<div class="form-section-content">
					<?php $this->insert('components/forms/text-with-label', ["label" => "Admin Role ID", "field_content" => "001"]) ?>					
					<?php $this->insert('components/forms/input-text-with-label', ["label" => "Role Name", "label_class" => "required"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Role Permission</h2></div>
				<div class="form-section-content">
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Account", "label_class" => "required", "choices" => ["Manage Roles (Add,Edit,Delete)", "Manage Admin (Add,Edit,Delete)", "Manage Shop (Add,Edit,Delete)"]]) ?>
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Product", "label_class" => "required", "choices" => ["Approve Product", "Manage Master Product", "Manage Attribute", "Manage Global Category", "Manage Brand"]]) ?>
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Promotion", "label_class" => "required", "choices" => ["View All Seller's Coupon Code"]]) ?>
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Report", "label_class" => "required", "choices" => ["View Report"]]) ?>
					<?php $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Other", "label_class" => "required", "choices" => ["Login as User", "Commission"]]) ?>
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