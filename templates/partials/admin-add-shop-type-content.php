<div id="add-product-more-option-tab-content">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Admin Account Information</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/text-with-label', ["label" => "Shop Type ID", "field_content" => "001"]) ?>					
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Tyep Name", "label_class" => "required"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Shop Type Permission</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Shop Type Permission", "choices" => ["Select All", "Review Management", "Deal of the Day", "Feature X", "Appearance Setting"]]) ?>
					<? $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Appearance Setting", "choices" => ["Select All", "Template 1", "Template 2", "Template 3", "Template 4"]]) ?>
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