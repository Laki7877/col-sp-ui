<div id="add-product-more-option-tab-content">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Admin Account Information</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/text-with-label', ["label" => "Admin ID", "field_content" => "001"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Email", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Name", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Phone Number", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Employee ID"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Position"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Division / BU"]) ?>
					<? $this->insert('components/forms/password-field', ["label" => "Password", "label_class" => "required", 'form_group_class' => 'margin-top-30']) ?>
					<? $this->insert('components/forms/password-field', ["label" => "Confirm Password", "label_class" => "required"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Admin Account Roles</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Admin Role", "label_class" => "required", "options" => ["Super Admin", "User"]]) ?>
					<div class="form-group">
						<div class="width-label"></div>
						<div class="width-field-normal">
							<a href="/?p=admin_add_role" class="form-text">Create New Admin Role</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<p class="text-align-right margin-bottom-30"><span class="color-red"><i class="fa fa-asterisk"></i></span> - Required Field</p>
		</div>
	</div>
</div>