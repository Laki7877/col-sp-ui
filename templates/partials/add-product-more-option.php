<div id="add-product-more-option-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>

	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Relationship</h2></div>
				<div class="form-section-content">

					<div ng-template="common/input/text2"
						ng-template-options="{
						'label': 'Related Products',
						'inputSize': 'xxl'
						}">

						<ui-select ng-model="formData.RelatedProducts" 
						multiple limit="10">
							<ui-select-match placeholder="Separate tags with comma (or enter)">
								<span>{{ $item.ProductNameEn }} ({{$item.Pid}})</span>
							</ui-select-match>
							<ui-select-choices repeat="item in (availableRelatedProducts) track by item.ProductId" 
							refresh="refreshRelatedProducts($select.search)" refresh-delay="1">
								{{ item.ProductNameEn }} ({{item.Pid}})
							</ui-select-choices>
						</ui-select>
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
					
					<div ng-template="common/input/text2"
						ng-template-options="{
						'label': 'Meta Title',
						'error' : {
						'messages': {
						
						},
						'show': $root.isInvalid(addProductForm.SEO_MetaTitle),
						'conditions' : addProductForm.SEO_MetaTitle.$error
						}
						}">
						<input
						maxlength="60"
						class="form-control width-field-normal"
						name="SEO_MetaTitle"
						ng-model="formData.SEO.MetaTitle"
						ng-class="{ 'has-error' : $root.isInvalid(addProductForm.SEO_MetaTitle) }"
						/>
					</div>

					<div ng-template="common/input/text2"
						ng-template-options="{
						'label': 'Meta Description',
						'error' : {
						'messages': {
						
						},
						'show': $root.isInvalid(addProductForm.SEO_MetaDescription),
						'conditions' : addProductForm.SEO_MetaDescription.$error
						}
						}">
						<input
						maxlength="150"
						class="form-control width-field-normal"
						name="SEO_MetaDescription"
						ng-model="formData.SEO.MetaDescription"
						ng-class="{ 'has-error' : $root.isInvalid(addProductForm.SEO_MetaDescription) }"
						/>
					</div>

					<div ng-template="common/input/text2"
						ng-template-options="{
						'label': 'Meta Keywords',
						'error' : {
						'messages': {
							'pattern': 'Only letters and numbers allowed'
						},
						'show': $root.isInvalid(addProductForm.SEO_MetaKeywords),
						'conditions' : addProductForm.SEO_MetaKeywords.$error
						}
						}">
						<input
						placeholder="Keywords separated by comma"
						class="form-control width-field-normal"
						name="SEO_MetaKeywords"
						ng-pattern="/^[0-9A-Za-z,\s]+$/"
						ng-model="formData.SEO.MetaKeywords"
						ng-class="{ 'has-error' : $root.isInvalid(addProductForm.SEO_MetaKeywords) }"
						/>
					</div>

					<div ng-template="common/input/text2"
						ng-template-options="{
						'label': 'Product URL Key (Thai)',
						'error' : {
						'messages': {
						'pattern': 'Only letters, numbers, -, and _ allowed. Space is not allowed'
						},
						'show': $root.isInvalid(addProductForm.SEO_ProductUrlKeyTh),
						'conditions' : addProductForm.SEO_ProductUrlKeyTh.$error
						}
						}">
						<input
						class="form-control width-field-normal"
						ng-pattern="/^[A-Za-z0-9_\-]+$/"
						maxlength="300"
						name="SEO_ProductUrlKeyTh"
						ng-model="formData.SEO.ProductUrlKeyTh"
						ng-class="{ 'has-error' : $root.isInvalid(addProductForm.SEO_ProductUrlKeyTh) }"
						/>
					</div>

					<div ng-template="common/input/text2"
						ng-template-options="{
						'label': 'Product URL Key (English)',
						'error' : {
						'messages': {
						'pattern': 'Only letters, numbers, -, and _ allowed. Space is not allowed'
						},
						'show': $root.isInvalid(addProductForm.SEO_ProductUrlKeyEn),
						'conditions' : addProductForm.SEO_ProductUrlKeyEn.$error
						}
						}">
						<input
						maxlength="300"
						class="form-control width-field-normal"
						ng-pattern="/^[A-Za-z0-9_\-]+$/"
						name="SEO_ProductUrlKeyEn"
						ng-model="formData.SEO.ProductUrlKeyEn"
						ng-class="{ 'has-error' : $root.isInvalid(addProductForm.SEO_ProductUrlKeyEn) }"
						/>
					</div>

					<div ng-template="common/input/text2"
						ng-template-options="{
						'label': 'Product Boosting Weight',
						'error' : {
						'messages': {
						'max': 'Only numbers from 1 to 10000 is allowed',
						'min': 'Only numbers from 1 to 10000 is allowed'
						},
						'show': $root.isInvalid(addProductForm.SEO_ProductBoostingWeight),
						'conditions' : addProductForm.SEO_ProductBoostingWeight.$error
						}
						}">
						<input
						type="number"
						class="form-control width-field-normal"
						min="0" max="10000"
						name="SEO_ProductBoostingWeight"
						ng-model="formData.SEO.ProductBoostingWeight"
						ng-class="{ 'has-error' : $root.isInvalid(addProductForm.SEO_ProductBoostingWeight) }"
						/>
					</div>

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
									<input type="text" placeholder="Select date and time when product will go online" 
									class="input-icon-calendar form-control" data-ng-model="formData.EffectiveDate">
								</a>
								<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
									<datetimepicker data-ng-model="formData.EffectiveDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown2', minView: 'hour' }"/>
								</ul>
							</div>
							<span class="help-block"></span>
						</div>
						<div class="width-field-tooltip no-padding-left">
                            <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter"
                            uib-tooltip="Date when your product will go online"></i>
                        </div>
					</div>

					<div class="form-group">
						<div class="width-label"><label class="control-label">Expire On</label></div>
						<div class="width-field-normal">
							<div class="dropdown">
								<a class="dropdown-toggle" id="dropdown3" role="button" data-toggle="dropdown" data-target="#" href="#">
									<input type="text" placeholder="Select date and time when product will go offline"  
									class="input-icon-calendar form-control" 
									name="ExpireDate"
									ng-class="{'has-error': $root.isInvalid(addProductForm.ExpireDate) }"
									data-ng-model="formData.ExpireDate">
								</a>
								<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
									<datetimepicker data-ng-model="formData.ExpireDate" data-datetimepicker-config="{ dropdownSelector: '#dropdown3', minView: 'hour' }"/>
								</ul>
							</div>
							<div class="width-field-large">
							<span class="help-block color-red" ng-repeat="m in addProductForm.ExpireDate.$error"> 
								<span>{{ m }}</span>
							</span>
							</div>

						</div>
					    <div class="width-field-tooltip no-padding-left">
                            <i class="fa fa-2x fa-question-circle color-grey" tooltip-trigger="mouseenter"
                            uib-tooltip="Date when your product will go offline"></i>
                        </div>
					</div>

					<? $this->insert('components/forms/multiple-checkbox', ["label" => "Control Flag", "ng_model" => "formData.ControlFlags", "choices" => ["Flag 1", "Flag 2", "Flag 3"]]) ?>

					<div ng-template="common/input/textarea2"
						ng-template-options="{
						'label': 'Remark',
						'inputSize': 'normal',
						'formGroupClass' : 'margin-top-30',
						'error' : {
						'messages': {

						},
						'show': $root.isInvalid(addProductForm.Remark),
						'conditions' : addProductForm.Remark.$error
						}
						}">
						<textarea
							class="form-control"
							maxlength="2000"
							name="Remark"
							ng-model="formData.Remark"
							ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Remark) }" />
						</textarea>
					</div>

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
