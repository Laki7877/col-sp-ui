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
			<div class="form-section-header" style="margin-bottom:10px;"><h2>Add Item List</h2></div>
			<div class="form-section-content">

			<div class="ng-isolate-scope form-group"> 
				<div class="width-label ">
					<span class="">
					<button type="submit" class="btn btn-blue btn-width-xl required" style="width:140px;" ng-click="AddToList()">Add To List</button>
<span>
				</div>
				
				<div class="input-with-unit width-field-normal">
					<label class="control-label" >{{formData.PNameBuy}}</label>
				</div>
			</div>

<div class="ng-isolate-scope form-group"> 
			<!-- begin add product item list-->
			<div class="table-section">
	<table ng-show="productAddListItem.length > 0" class="table table-curved">
        <thead>
          <tr class="table-head" >
           <!--  <th class="checkbox-column">
                <input type="checkbox" aria-label="Checkbox for following text input" ng-click="checkAll()" ng-model="allChecked">
            </th> -->
            <th class="display-column"></th>
            <th ng-click="setOrderBy('ProductNameEn')">
              <a class="header-link" ><span ng-class="sort('ProductNameEn', true)">Product Name</span></a>
              <i class="fa" ng-class="sort('ProductNameEn')">
            </th>
            <th class="price-column" ng-click="setOrderBy('OriginalPrice')">
              <a class="header-link" ><span ng-class="sort('OriginalPrice', true)">Price</span></a>
              <i class="fa" ng-class="sort('OriginalPrice')">
            </th>
            <th><span>Info</span></th>
            <th><span>Image</span></th>
            <th class="status-column">
              Status
            </th>
            <th class="live-column" ng-if="showOnOffStatus">Live</th>
            <th class="visible-column">Visible</th>
            <th class="modified-column" ng-click="setOrderBy('UpdatedDt')">
              <a class="header-link" ><span ng-class="sort('UpdatedDt', true)">Modified</span></a>
              <i class="fa" ng-class="sort('UpdatedDt')">
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
      	  <tr ng-repeat="row in productAddListItem" >
                  <!-- <td class="checkbox-column">
                    <input type="checkbox" aria-label="Checkbox for following text input" ng-model="checkBoxCache[row.ProductId]">
                  </td> -->
                  <td class="display-column">
                    <div class="img-holder">
                      <img ng-if='!row.ImageUrl' class="logo-img" src="<?= $this->asset('/assets/img/placeholder-no-image.png') ?>" />
                      <img ng-if='row.ImageUrl' class="logo-img" src="{{ row.ImageUrl }}"/>
                    </div>
                  </td>
                  <td class="column-text-ellipsis"><a href="/products/{{ row.ProductId }}">{{ row.ProductNameEn || '(Untitled Product)' }}</a></td>
                  <td class="price-column">
                    <div>{{ row.OriginalPrice | currency: ' ' : 2 }}</div>
                    <div ng-if="row.VariantCount > 0">({{row.VariantCount}} variants)</div></td>
                  <td class="info-column">
                    <i ng-if="!row.InfoFlag" class="fa fa-minus color-grey icon-size-18px"></i>
                    <i ng-if="row.InfoFlag" class="fa fa-check color-green icon-size-18px"></i>
                  </td>
                  <td class="image-column">
                    <i ng-if="!row.ImageFlag" class="fa fa-minus color-grey icon-size-18px"></i>
                    <i ng-if="row.ImageFlag" class="fa fa-check color-green icon-size-18px"></i>
                  </td>
                  <td class="status-column">
                    <span class="{{ asStatus(row.Status).color }}">
                      <i class="fa {{ asStatus(row.Status).icon }}"></i>
                      {{ asStatus(row.Status).name }}
                    </span>
                  </td>
                  <td class="live-column" ng-if="showOnOffStatus">
                    <i class="fa fa-circle color-grey"></i>
                  </td>
                  <td class="visible-column">
                          <a ng-click="actions.toggle(row)"><i ng-class="{'fa fa-eye-slash color-grey eye-icon' : !row.Visibility,
                            'fa fa-eye color-dark-grey eye-icon' : row.Visibility}"></i></a>
                  </td>
                  <td class="modified-column">{{ row.UpdatedDt | dateTh }}</td>
                  <td class="action-column">
                    <a class="fa fa-gear color-dark-grey icon-size-20"  uib-popover-template="'general/remove_row_add_list_item'" popover-placement="bottom" popover-append-to-body="true" popover-any>
                       <i class="fa fa-caret-down color-dark-grey"></i>
                    </a>
                   
                  </td>
          </tr>
        </tbody>
      </table>
      </div>
			<!-- end add product item list -->
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
