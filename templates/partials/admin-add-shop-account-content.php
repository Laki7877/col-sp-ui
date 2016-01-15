<div id="add-product-more-option-tab-content">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Shop Account Information</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/text-with-label', ["label" => "Admin ID", "field_content" => "001"]) ?>					
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Shop Name", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Shop Type", "label_class" => "required", "options" => ["Select Shop Type", "Type 1"]]) ?>
					<div class="form-group">
						<div class="width-label"></div>
						<div class="width-field-normal">
							<a class="like-text form-text" href="?p=admin_add_shop_type">
								<i class="fa fa-plus-circle color-theme"></i>
								Add New Shop Type
							</a>
						</div>
					</div>
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Shop Status", "label_class" => "required", "options" => ["Active", "Inactive"]]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Comission(%)", "label_class" => "required", "size" => "small"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Admin Account Roles</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Name", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Position", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Email", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Contact Number", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/password-field', ["label" => "Password", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/password-field', ["label" => "Confirm Password", "label_class" => "required"]) ?>

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