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
				<div class="form-section-header"><h2>SEO</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Title", "tooltip" => "Test", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Description", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Keywords", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product URL Key (Thai)", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product URL Key (English)", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product Boosting Weight", "tooltip" => "This is a tooltip text"]) ?>
				</div>
			</div>
		</div>
	</div>
</div>