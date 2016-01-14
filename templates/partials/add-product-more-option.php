<div id="add-product-more-option-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Relationship</h2></div>
				<div class="form-section-content">


					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Related Products",
				       		 "ng_model" => "formData.RelatedProducts",
					     	 "tooltip" => "This is a tooltip text",
						 	 "choices" => "availableRelatedProducts",
						 	 "refresh" => "refreshRelatedProducts",
						 	 "trackBy" => "ProductId",
						 	 "showBy" => "ProductNameEn",
						 	 "multiple" => true ]) ?>
						 	 
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>SEO</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Title", "tooltip" => "Test", "ng_model" => "formData.SEO.MetaTitle", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Description", "ng_model"=> "formData.SEO.MetaDescription", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Keywords", "ng_model" => "formData.SEO.MetaKeywords", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product URL Key (Thai)", "ng_model" => "formData.SEO.ProductUrlKeyTh", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product URL Key (English)", "ng_model"=>"formData.SEO.ProductUrlKeyEn", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product Boosting Weight", "ng_model" => "formData.SEO.ProductBoostingWeight", "tooltip" => "This is a tooltip text"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>More Details</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Effective Date", "ng_model" => "formData.EffectiveDate", "input_class" => "input-icon-calendar", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Effective Time", "ng_model" => "formData.EffectiveTime", "hint" => "Example: 19:15:00"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Expire Date", "ng_model" => "formData.ExpireDate", "input_class" => "input-icon-calendar", "tooltip" => "This is a tooltip text"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Expire Time", "ng_model" => "formData.ExpireTime", "hint" => "Example: 19:15:00"]) ?>
					<? $this->insert('components/forms/multiple-checkbox', ["label" => "Control Flag", "ng_model" => "formData.ControlFlags", "choices" => ["Flag 1", "Flag 2", "Flag 3"]]) ?>
					<? $this->insert('components/forms/textarea-with-label', ["label" => "Remark", "ng_model" => "formData.Remark"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Approve Versions</h2></div>
				<div class="form-section-content">
					<div class="table-wrapper">
						<table class="table" id="add-product-approve-versions">
							<thead>
								<tr>
									<th class="thead-approved-date">Approved Date</th>
									<th class="thead-submitted-date">Submitted Date</th>
									<th class="thead-submitted-by">Submitted By</th>
									<th class="thead-actions">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>14/10/2015 at 13:14:50</td>
									<td>10/10/2015 at 13:14:50</td>
									<td>Andrea Bolan</td>
									<td>
										<button class="btn btn-white">View</button>
										<button class="btn btn-white">Restore</button>
									</td>
								</tr>
								<tr>
									<td>14/10/2015 at 13:14:50</td>
									<td>10/10/2015 at 13:14:50</td>
									<td>John Dara</td>
									<td>
										<button class="btn btn-white">View</button>
										<button class="btn btn-white">Restore</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
