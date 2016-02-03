<div id="add-product-more-option-tab-content">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Advance Search</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product Name", ]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "PID" ]) ?>
					<? $this->insert('components/forms/dropdown_tags', ["label" => "Brand Name/ ID", "default_choices" => ["Gulp", "Adico"], "choices" => ["Gulp", "Adico","Pascal"] ]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Global Category Name/ ID" ]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Shop Name/ ID" ]) ?>
					<? $this->insert('components/forms/input_tags', ["label" => "Search Tag", "choices" => ["Gulp", "Adico","Pascal"] ]) ?>

					<div class="form-group">
						<div class="width-label"><label class="control-label"></label></div>
						<div class="button-size-normal">
							<a class="button-size-normal btn btn-blue btn-width-xl">Search</a>
						</div>
						<div class="button-size-normal">
							<a class="button-size-normal margin-left-10 btn btn-white btn-width-xl">Cancel</a>
						</div>
					</div>
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
					<? $this->insert('components/forms/link-action', ['text' => 'Create New Admin Role', 'link' => '/?p=admin_add_role']) ?>
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