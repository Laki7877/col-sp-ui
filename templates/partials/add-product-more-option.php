<div id="add-product-more-option-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Relationship</h2></div>
				<div class="form-section-content">


					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Related Products",
							"size" => "xxl",
				       		 "ng_model" => "formData.RelatedProducts",
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
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Title", "ng_model" => "formData.SEO.MetaTitle"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Description", "ng_model"=> "formData.SEO.MetaDescription"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Meta Keywords", "ng_model" => "formData.SEO.MetaKeywords"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product URL Key (Thai)", "ng_model" => "formData.SEO.ProductUrlKeyTh"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product URL Key (English)", "ng_model"=>"formData.SEO.ProductUrlKeyEn"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Product Boosting Weight", "ng_model" => "formData.SEO.ProductBoostingWeight"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>More Details</h2></div>
				<div class="form-section-content">

					<div class="form-group">
						<div class="width-label"><label class="control-label">Effective On</label></div>
						<div class="width-field-normal">
							  <div class="dropdown">
								  <a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" href="#">
								   <input type="text" class="input-icon-calendar form-control" data-ng-model="formData.EffectiveDate">
								  </a>
								  <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
								    <datetimepicker data-ng-model="formData.EffectiveDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'hour' }"/>
								  </ul>
							  </div>
							  <span class="help-block"></span>
						</div>
						<div class="width-field-tooltip no-padding-left"><i class="fa fa-2x fa-question-circle color-grey" data-toggle="btooltip" data-placement="right" title="Date when your product will go online"></i></div>
					</div>

					<div class="form-group">
						<div class="width-label"><label class="control-label">Expire On</label></div>
						<div class="width-field-normal">
							  <div class="dropdown">
								  <a class="dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" data-target="#" href="#">
								   <input type="text" class="input-icon-calendar form-control" data-ng-model="formData.ExpireDate">
								  </a>
								  <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
								    <datetimepicker data-ng-model="formData.ExpireDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown3', minView: 'hour' }"/>
								  </ul>
							  </div>
							  <span class="help-block"></span>
						</div>
						<div class="width-field-tooltip no-padding-left"><i class="fa fa-2x fa-question-circle color-grey" data-toggle="btooltip" data-placement="right" title="Date when your product will go offline"></i></div>
					</div>

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
