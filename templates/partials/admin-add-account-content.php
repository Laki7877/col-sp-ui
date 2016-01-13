<div id="add-product-more-option-tab-content">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Admin Account Roles</h2></div>
				<div class="form-section-content">
					<div class="form-group">
						<div class="width-label"><label class="control-label required">Admin Role</label></div>
						<div class="width-field-normal">
							<input type="text" class="form-control input-icon-right-search" placeholder="Search by Product Name or UID" />
						</div>
					</div>
					<div class="form-group">
						<div class="width-label"></div>
						<div class="width-field-normal">
							<a class="like-text form-text">
								<i class="fa fa-plus-circle color-theme"></i>
								Add New Admin Role
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Admin Account Information</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Email", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Name", "label_class" => "required"]) ?>
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