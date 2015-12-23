<div id="add-product-more-option-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>
	
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
								<i class="fa fa-plus-circle color-theme"></i>
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
					<? $this->insert('components/forms/input-text-with-label-tooltip', ["label" => "Meta Title", "tooltip" => "Test"]) ?>
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
					<? $this->insert('components/forms/multiple-checkbox', ["label" => "Control Flag"]) ?>
					<? $this->insert('components/forms/textarea-with-label', ["label" => "Remark"]) ?>
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