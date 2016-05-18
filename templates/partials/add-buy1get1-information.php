<div id="add-product-information-tab-content">
	<? 
	// $this->insert('partials/add-product-inner-tab-breadcrumb') 
	?>

	<div class="row" ng-if="overview.Status">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Overview</h2></div>
				<div class="form-section-content">
					<div class="container-fluid" style="margin: -15px">
						<table class="table">
						<thead>
							<th>Name</th>
							<th>URLKey</th>
							<th>ShortDescription</th>
							<th>EffectiveDate</th>
							<th>ExpiryDate</th>
							<!-- <th>Status</th> -->
							<th>Visible</th>
						</thead>
						<tbody>
						<tr>
							<td>{{ overview.NameEN }}</td>
							<td>{{ overview.URLKey }}</td>
							<td>{{ overview.ShortDescriptionEN }}</td>
							<td>{{ overview.EffectiveDate }}</td>
							<td>{{ overview.ExpiryDate }}</td>
							<!-- <td>
								<span class="{{ asStatus(overview.CMSStatusFlowId).Color }}">
									<i class="fa {{ asStatus(overview.CMSStatusFlowId).Class }}"></i>
									{{ asStatus(overview.CMSStatusFlowId).Text }}
								</span>

							</td> -->
							<td>
								<i ng-class="{'fa fa-eye-slash color-grey eye-icon' : !overview.Visibility,
									'fa fa-eye color-dark-grey eye-icon' : overview.Visibility}"></i>

							</td>
						</tr>		
						<tbody>	
					</table>
				</div>
			</div>
		</div>			
	</div>
</div>
<div class="row">
	<div class="col-xs-12">
		<div class="form-section">
			<div class="form-section-header"><h2>Vital Information</h2></div>
			<div class="form-section-content">


				<div ng-template="common/input/text2"
					ng-template-options="{
					'label': 'Name (Thai)',
					'labelClass': 'required',
					'error' : {
					'messages': {
					'required': 'This is a required field',
					'pattern': 'Only letters and numbers allowed'
					},
					'show': $root.isInvalid(addProductCollectionForm.formData_CMSNameTH),
					'conditions' : addProductCollectionForm.formData_CMSNameTH$error
					}
					}">
					<input
					class="form-control width-field-large"
					name="NameTH"
					ng-model="formData.NameTH"
					ng-class="{ 'has-error' : $root.isInvalid(addProductCollectionForm.formData_CMSNameTH) }"
					ng-pattern="/^[ก-๙A-Za-z0-9\s]+$/"
					maxlength="300"
					 />
				</div>

				<div ng-template="common/input/text2"
					ng-template-options="{
					'label': 'Name (English)',
					'labelClass': 'required',
					'error' : {
					'messages': {
					'required': 'This is a required field',
					'pattern': 'Only letters and numbers allowed'
					},
					'show': $root.isInvalid(addProductForm.formData_ProductNameEn),
					'conditions' : addProductCollectionForm.formData_CMSNameEN.$error
					}
					}">
					<input
					class="form-control width-field-large"
					name="NameEN"
					ng-model="formData.NameEN"
					maxlength="300"
					ng-pattern="/^[0-9a-zA-Z\s]+$/"
					ng-class="{ 'has-error' : $root.isInvalid(addProductCollectionForm.formData_CMSNameEN) }"
					 />
				</div>

				

			</div>
		</div>
		<div class="form-section">
			<div class="form-section-header"><h2>Buy Item & Get Item</h2></div>
			<div class="form-section-content">
			<div class="ng-isolate-scope form-group"> 
				<div class="width-label ">
					<span class="required">
					<button type="submit" class="btn btn-blue btn-width-xl required" style="width:140px;" ng-click="BuyItemSelected()">Buy Item Selected</button>
<span>
				</div>
				
				<div class="input-with-unit width-field-normal">
					<label class="control-label" >{{formData.PNameBuy}}</label>
				</div>
			</div>
			<div class="ng-isolate-scope form-group">
				<div class="width-label" >
				<span class="required">
					<button type="submit" class="btn btn-blue btn-width-xl" style="width:140px;" ng-click="GetItemSelected()">Get Item Selected</button>							
					</span>
				</div>			
				<div class="input-with-unit width-field-normal">
					<label class="control-label" >{{formData.PNameGet}}</label>
				</div>
				</div>
			</div>
		</div>
		<div class="form-section">
			<div class="form-section-header"><h2>Keywords</h2></div>
			<div class="form-section-content">

		
<div ng-template="common/input/text2"
						ng-template-options="{
						'label': 'URL Key',
						'error' : {
						'messages': {
						'pattern': 'Only letters, numbers, -, and _ allowed. Space is not allowed'
						},
						'show': $root.isInvalid(addProductForm.formData_URLKey),
						'conditions' : addProductForm.formData_URLKey.$error
						}
						}">
						<input
						maxlength="300"
						class="form-control width-field-normal"
						ng-pattern="/^[A-Za-z0-9_\-]+$/"
						name="URLKey"
						ng-model="formData.URLKey"
						ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_URLKey) }"
						/>
					</div>


			</div>
		</div>
		<div class="form-section">
			<div class="form-section-header"><h2>Effective & Expire</h2></div>
			<div class="form-section-content">

		
			<div class="form-group">
						<div class="width-label"><label class="control-label">Effective On</label></div>
						<div class="width-field-normal">
							<div class="dropdown">
								<a class="dropdown-toggle" id="dropdown2" role="button" data-toggle="dropdown" data-target="#" href="#">
									<input type="text" placeholder="Select date and time when product will go online" 
									class="input-icon-calendar form-control" data-ng-model="formData.EffectiveDate">
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
									<input type="text" placeholder="Select date and time when product will go offline"  
									class="input-icon-calendar form-control" 
									name="ExpiryDate"
									ng-class="{'has-error': $root.isInvalid(addProductForm.ExpiryDate) }"
									data-ng-model="formData.ExpiryDate">
								</a>
								<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
									<datetimepicker data-ng-model="formData.ExpiryDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown3', minView: 'hour' }"/>
								</ul>
							</div>
							<div class="width-field-large">
							<span class="help-block color-red" ng-repeat="m in addProductForm.ExpiryDate.$error"> 
								<span>{{ m }}</span>
							</span>
							</div>

						</div>
						<div class="width-field-tooltip no-padding-left"><i class="fa fa-2x fa-question-circle color-grey" data-toggle="btooltip" data-placement="right" title="Date when your product will go offline"></i></div>
						
					</div>

			</div>
		</div>
		<div class="form-section">
			<div class="form-section-header"><h2>Description</h2></div>
			<div class="form-section-content">
				<?php $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (Thai)", "ng_model" => "formData.LongDescriptionTH", "size" => "xxl"]) ?>

				<div ng-template="common/input/textarea2"
					ng-template-options="{
					'label': 'Short Description (Thai)',
					'inputSize': 'xxl',
					'formGroupClass' : 'margin-top-30',
					'error' : {
					'messages': {
					'pattern': 'Only letters and numbers allowed'
					},
					'show': $root.isInvalid(formData_ShortDescriptionTH),
					'conditions' : formData_ShortDescriptionTH.$error
					}
					}">
					<textarea
						ng-pattern="/^[0-9A-Za-zก-ฮ\s]+$/"
						class="form-control"
						maxlength="500"
						name="formData_ShortDescriptionTH"
						ng-model="formData.ShortDescriptionTH"
						 />
					</textarea>
				</div>

				<?php $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (English)", "ng_model" => "formData.LongDescriptionEN", "size" => "xxl", "form_group_class" => "margin-top-40"]) ?>

				<div ng-template="common/input/textarea2"
					ng-template-options="{
					'label': 'Short Description (English)',
					'inputSize': 'xxl',
					'formGroupClass' : 'margin-top-30',
					'error' : {
					'messages': {
					'pattern': 'Only letters and numbers allowed'
					},
					'show': $root.isInvalid(addProductForm.formData_ShortDescriptionEN),
					'conditions' : addProductForm.formData_ShortDescriptionEN.$error
					}
					}">
					<textarea
						ng-pattern="/^[0-9A-Za-z\s]+$/"
						class="form-control"
						maxlength="500"
						name="formData_ShortDescriptionEN"
						ng-model="formData.ShortDescriptionEN"
						 />
					</textarea>
				</div>
			</div>
		</div>
		
		
	</div>
</div>
<div class="row">
	<div class="col-xs-12">
		<p class="text-align-right margin-bottom-30"><span class="color-red"><i class="fa fa-asterisk"></i></span> - Required Field</p>
	</div>
</div>
</div>
