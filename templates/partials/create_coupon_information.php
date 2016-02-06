<div id="create_coupon_information_tab_content">

	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Coupon Information</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Coupon Name", "label_class" => "required", "size" => "large"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Coupon Code", "label_class" => "required", "size" => "large"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Start Date", "label_class" => "required", "size" => "large", "input_class" => "input-icon-calendar"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Expire Date", "label_class" => "required", "size" => "large", "input_class" => "input-icon-calendar"]) ?>
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Status", "label_class" => "required", 'options' => ['Active', 'Inactive']]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Action</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Action", "label_class" => "required", 'options' => ['-- Select Action --', 'Discount by percent', 'Discount by amount']]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Discount Amount", "hint" => "Example: 50 or 75", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Maximum Amount", 'right_hint' => 'THB']) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>More Options</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "User per Customer"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Maximum Users"]) ?>
				</div>
			</div>
		</div>
	</div>
</div>