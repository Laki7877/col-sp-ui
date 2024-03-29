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
							<th>Product Name</th>
							<th>PID</th>
							<th>Price</th>
							<th>Info</th>
							<th>Image</th>
							<th>Status</th>
							<th>Live</th>
							<th>Visible</th>
						</thead>
						<tbody>
						<tr>
							<td>{{ overview.MasterVariant.ProductNameEn }}</td>
							<td>{{ overview.MasterVariant.Pid }}</td>
							<td>{{ overview.MasterVariant.OriginalPrice | number: 2 }}</td>
							<td>
								<i ng-if="!overview.InfoFlag" class="fa fa-minus color-grey icon-size-18px"></i>
								<i ng-if="overview.InfoFlag" class="fa fa-check color-green icon-size-18px"></i>
							</td>
							<td>
								<i ng-if="!overview.ImageFlag" class="fa fa-minus color-grey icon-size-18px"></i>
								<i ng-if="overview.ImageFlag" class="fa fa-check color-green icon-size-18px"></i>
							</td>
							<td>
								<span class="{{ asStatus(overview.Status).Color }}">
									<i class="fa {{ asStatus(overview.Status).Class }}"></i>
									{{ asStatus(overview.Status).Text }}
								</span>

							</td>
							<td>
								<i class="fa fa-circle color-grey"></i>
							</td>
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
					'label': 'Product Name (Thai)',
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
					name="CMSNameTH"
					ng-model="formData.CMSNameTH"
					ng-class="{ 'has-error' : $root.isInvalid(addProductCollectionForm.formData_CMSNameTH) }"
					ng-pattern="/^[ก-๙A-Za-z0-9\s]+$/"
					maxlength="300"
					 />
				</div>

				<div ng-template="common/input/text2"
					ng-template-options="{
					'label': 'Product Name (English)',
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
					name="CMSNameEN"
					ng-model="formData.CMSNameEN"
					maxlength="300"
					ng-pattern="/^[0-9a-zA-Z\s]+$/"
					ng-class="{ 'has-error' : $root.isInvalid(addProductCollectionForm.formData_CMSNameEN) }"
					 />
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
									<datetimepicker data-ng-model="formData.EffectiveDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'minute', minuteStep: 30 }"/>
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
									<datetimepicker data-ng-model="formData.ExpiryDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown3', minView: 'minute', minuteStep: 30 }"/>
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
					'show': $root.isInvalid(formData.ShortDescriptionTH),
					'conditions' : formData.ShortDescriptionTH.$error
					}
					}">
					<textarea
						ng-pattern="/^[0-9A-Za-zก-ฮ\s]+$/"
						class="form-control"
						maxlength="500"
						name="ShortDescriptionTH"
						ng-model="formData.ShortDescriptionTH"
						ng-class="{ 'has-error' : $root.isInvalid(addProductForm.ShortDescriptionTH) }" />
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
						ng-class="{ 'has-error' : $root.isInvalid(addProductForm.formData_ShortDescriptionEN) }" />
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
