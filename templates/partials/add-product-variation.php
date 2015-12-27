<div id="add-product-variation-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>

	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Variation Option</h2></div>
				<div class="form-section-content">
					<div class="form-group">
						<div class="width-label">
							<select class="form-control">
								<option value="">Material</option>
							</select>
						</div>
						<div class="width-field-normal">
							<select class="form-control select2-init" multiple="multiple">
								<option selected value="Wood">Wood</option>
								<option value="Plastic">Plastic</option>
								<option value="Steel">Steel</option>
								<option value="Fiber">Fiber</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<div class="width-label">
							<select class="form-control">
								<option value="">Capacity</option>
							</select>
						</div>
						<div class="width-field-normal">
							<div class="input-with-unit">
								<select class="form-control select2-init" multiple="multiple" data-tags="true">
									<option selected value="10000">10000</option>
									<option selected value="20000">20000</option>
								</select>
								<span class="input-unit">mAh</span>
							</div>
						</div>
					</div>
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Default Variant", "options" => ["Wood, 10000 mAh", "Wood, 20000 mAh"]]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header">Variant</div>
				<div class="form-section-content">
					
				</div>
			</div>
		</div>
	</div>
</div>