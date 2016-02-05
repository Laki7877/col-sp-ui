<div id="create_coupon_information_tab_content">

	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Order Condition</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Criteria", 'options' => ['The total price is more than...']]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Price", "hint" => "Example: 200 or 125.50"]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Filter By...</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Filter By", 'options' => ['--Select Filter--', 'All', 'Brand', 'Category']]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Include</h2></div>
				<div class="form-section-content">
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Exclude</h2></div>
				<div class="form-section-content">
				</div>
			</div>
		</div>
	</div>
</div>