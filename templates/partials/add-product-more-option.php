<div id="add-product-more-option-tab-content">
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Relationship</h2></div>
				<div class="form-section-content">
					<div class="form-group">
						<div class="width-label"><label class="control-label">Relate Products</label></div>
						<div class="width-field-normal">
							<input type="text" class="form-control input-search-icon" placeholder="Search by Product Name or UID" />
						</div>
					</div>
					<div class="form-group">
						<div class="width-label"></div>
						<div class="width-field-normal">
							<a class="like-text form-text">
								<i class="fa fa-2x fa-plus-circle color-theme vertical-align-middle"></i>
								Add more related products
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
					<? $this->insert('components/forms/input-text-with-label-tooltip', ["label" => "Meta Title"]) ?>
					<? $this->insert('components/forms/input-text-with-label-tooltip', ["label" => "Meta Description"]) ?>
					<? $this->insert('components/forms/input-text-with-label-tooltip', ["label" => "Meta Keywords"]) ?>
					<? $this->insert('components/forms/input-text-with-label-tooltip', ["label" => "Product URL Key (Thai)"]) ?>
					<? $this->insert('components/forms/input-text-with-label-tooltip', ["label" => "Product URL Key (English)"]) ?>
					<? $this->insert('components/forms/input-text-with-label-tooltip', ["label" => "Product Boosting Weight"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>More Details</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label-tooltip', ["label" => "Effective Date", "input_class" => "input-icon-calendar"]) ?>
					<? $this->insert('components/forms/input-text-with-label-hint', ["label" => "Effective Time", "hint" => "Example: 19:15:00"]) ?>
					<? $this->insert('components/forms/input-text-with-label-tooltip', ["label" => "Expire Date", "input_class" => "input-icon-calendar"]) ?>
					<? $this->insert('components/forms/input-text-with-label-hint', ["label" => "Expire Time", "hint" => "Example: 19:15:00"]) ?>
					<? $this->insert('components/forms/input-text-with-label-tooltip', ["label" => "Control Flag"]) ?>
					<? $this->insert('components/forms/textarea-with-label', ["label" => "Remark"]) ?>
				</div>
			</div>
		</div>
	</div>
</div>