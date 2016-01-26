<div id="add-product-more-option-tab-content">
	
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Shop Account Information</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/text-with-label', ["label" => "Admin ID", "field_content" => "001"]) ?>					
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Shop Name", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Shop Type", "label_class" => "required", "options" => ["Select Shop Type", "Type 1"]]) ?>
					<? $this->insert('components/forms/link-action', ['text' => 'Add New Shop Type', 'link' => '/?p=admin_add_shop_type']) ?>
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Shop Status", "label_class" => "required", "options" => ["Active", "Inactive"]]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Comission(%)", "label_class" => "required", "size" => "small"]) ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Shop Owner Information</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Name", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Position", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Email", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Phone Number", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/password-field', ["label" => "Password", "label_class" => "required"]) ?>
					<? $this->insert('components/forms/password-field', ["label" => "Confirm Password", "label_class" => "required"]) ?>

				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Shop Users</h2></div>
				<div class="form-section-content">
					<div class="form-group">
						<!-- <table class="table table-hover">
						  ...
						</table> -->
						<table class="table table-hover no-margin"> 
							<thead> 
								<tr> 
									<th>ID</th> 
									<th>Name</th> 
									<th>Email</th> 
									<th>Role</th> 
									<th>Status</th> 
									<th class="text-align-center">Action</th> 
								</tr> 
							</thead> 
							<tbody> 
								<tr> 
									<td>001</td> 
									<td>Palmy Greengreengreen</td> 
									<td>user1@lara.co.th</td>
									<td>Shop Owner</td>
									<td>Active</td>
									<td class="text-align-center"><a class="btn btn-white btn-width-xl" href="?p=">Login-As</a></td> 
								</tr> 
								<tr> 
									<td>002</td> 
									<td>Sukrit Striketwo</td> 
									<td>content@lara.co.th</td>
									<td>Content Team</td>
									<td>Inactive</td>
									<td class="text-align-center"><a class="btn btn-white btn-width-xl" href="?p=">Login-As</a></td> 
								</tr> 
							</tbody> 
						</table>
					</div>
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