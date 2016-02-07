<div id="add-product-more-option-tab-content">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>User Account Information</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/text-with-label', ["label" => "User ID", "field_content" => "001"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Email", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Name", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Phone Number", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/password-field', ["label" => "Password", "label_class" => "required", 'form_group_class' => 'margin-top-30']) ?>
					<? $this->insert('components/forms/password-field', ["label" => "Confirm Password", "label_class" => "required"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>User Role</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "User Role", "label_class" => "required", "options" => ["Shop Owner", "Image Team"]]) ?>
					<? $this->insert('components/forms/link-action', ['text' => 'Create New User Role', 'link' => '/?p=user_add_role']) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>User Status</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Status", "label_class" => "required", "options" => ["Active", "Inactive"]]) ?>
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