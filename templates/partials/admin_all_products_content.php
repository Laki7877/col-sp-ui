<div id="add-product-more-option-tab-content">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Search</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product Name", ]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "PID" ]) ?>
					<? $this->insert('components/forms/dropdown_tags', ["label" => "Brand Name/ ID", "default_choices" => ["Gulp", "Adico"], "choices" => ["Gulp", "Adico","Pascal"] ]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Global Category Name/ ID" ]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Shop Name/ ID" ]) ?>
					<? $this->insert('components/forms/input_tags', ["label" => "Search Tag", "choices" => ["Gulp", "Adico","Pascal"] ]) ?>
					<? $this->insert('components/forms/input_from_to', ["label" => "Price", "label_extend" => "To" ]) ?>
					<? $this->insert('components/forms/input_from_to', ["label" => "Modified Date", "input_class" => "input-icon-calendar", "label_extend" => "To" ]) ?>
					<div class="form-group">
						<div class="width-label"><label class="control-label"></label></div>
						<div class="button-size-normal">
							<a class="button-size-normal btn btn-blue btn-width-xl">Search</a>
						</div>
						<div class="button-size-normal">
							<a class="button-size-normal margin-left-10 btn btn-white btn-width-xl">Clear</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>