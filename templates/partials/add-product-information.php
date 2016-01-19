<div id="add-product-information-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Vital Information</h2></div>
				<div class="form-section-content">

					<div ng-template="common/input/text"
                      ng-template-options="{
                        'label': 'Product Name (Thai)',
                        'labelClass': 'required'
                      }">
                      <input
                        class="form-control width-field-large"
                        name="MasterVariant_ProductNameTh"
                        ng-model="formData.MasterVariant.ProductNameTh"
                        ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_ProductNameTh) }"
                        required />
                    </div>


                    <div ng-template="common/input/text"
                      ng-template-options="{
                        'label': 'Product Name (English)',
                        'labelClass': 'required'
                      }">
                      <input
                        class="form-control width-field-large"
                        name="MasterVariant_ProductNameEn"
                        ng-model="formData.MasterVariant.ProductNameEn"
                        ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_ProductNameEn) }"
                        required />
                    </div>


					<div ng-template="common/input/text"
                      ng-template-options="{
                        'label': 'SKU',
                        'labelClass': 'required'
                      }">
                      <input
                        class="form-control width-field-large"
                        name="MasterVariant_Sku"
                        ng-model="formData.MasterVariant.Sku"
                        ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_Sku) }"
                        ng-required="onPublishing" />
                    </div>

                    <div ng-template="common/input/text"
                      ng-template-options="{
                        'label': 'UPC',
                        'labelClass': 'required'
                      }">
                      <input
                        class="form-control width-field-large"
                        name="MasterVariant_Upc"
                        ng-model="formData.MasterVariant.Upc"
                        ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_Upc) }"
                      />
                    </div>

                    <div ng-if="formData.MasterVariant.Pid">
	                    <div ng-template="common/input/text"
	                      ng-template-options="{
	                        'label': 'PID',
	                        'labelClass': 'required'
	                      }">
	                      <input
	                        class="form-control width-field-large"
	                        name="MasterVariant_Pid"
	                        disabled
	                        ng-model="formData.MasterVariant.Pid"
	                        ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_Pid) }"
	                      />
	                    </div>
                    </div>

				
					<? $this->insert('components/forms/dropdown-with-label',
						["label" => "Brand Name",
						"showBy" => "BrandNameEn",
						"placeholder" => "Search Brand..",
						"refresh" => "refreshBrands",
						 "trackBy" => "BrandId",
					 	 "choices" => "availableBrands",
				  		 "ng_model"=> "formData.Brand"
						])
					?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Price</h2></div>
				<div class="form-section-content">
				

					<div ng-template="common/input/text"
                      ng-template-options="{
                        'label': 'Original Price',
                        'labelClass': 'required'
                      }">
                      <input
                        class="form-control width-field-normal"
                        name="MasterVariant_OriginalPrice"
                        ng-model="formData.MasterVariant.OriginalPrice"
                        ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_OriginalPrice) }"
                        required />
                    </div>

                    <div ng-template="common/input/text"
                      ng-template-options="{
                        'label': 'Sale Price'
                      }">
                      <input
                        class="form-control width-field-normal"
                        name="MasterVariant_SalePrice"
                        ng-model="formData.MasterVariant.SalePrice"
                        ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_SalePrice) }"
                        required />
                    </div>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Description</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (Thai)", "ng_model" => "formData.MasterVariant.DescriptionFullTh", "size" => "xxl"]) ?>
					<? $this->insert('components/forms/textarea-with-label', ["label" => "Short Description (Thai)", "ng_model" => "formData.MasterVariant.DescriptionShortTh", "size" => "xxl", "form_group_class" => "margin-top-30"]) ?>
					<? $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (English)", "ng_model" => "formData.MasterVariant.DescriptionFullEn", "size" => "xxl", "form_group_class" => "margin-top-40"]) ?>
					<? $this->insert('components/forms/textarea-with-label', ["label" => "Short Description (English)", "ng_model" => "formData.MasterVariant.DescriptionShortEn","size" => "xxl", "form_group_class" => "margin-top-30"]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Detail</h2></div>
				<div class="form-section-content">
					
					<div class="form-group ">
						<div class="width-label"><label class="control-label ">Attribute Set</label></div>
						<div class="width-field-normal">
								<div class="ah-select2-dropdown">
								<ui-select ng-model="formData.AttributeSet">
									<ui-select-match>
										<span ng-bind="$select.selected.AttributeSetNameEn"></span>
									</ui-select-match>
									<ui-select-choices repeat="item in (availableAttributeSets) | filter : $select.search track by item.AttributeSetId">
										<span ng-bind="item.AttributeSetNameEn"></span>
									</ui-select-choices>
								</ui-select>

								</div>
						</div>
					</div>

					<div class="form-group" ng-repeat="amap in formData.AttributeSet.AttributeSetMaps">
						<div class="width-label"><label class="control-label">
							{{ amap.Attribute.AttributeNameEn }} 
						</label></div>
						<div class="width-field-normal">
							<select ng-if="_isListInput(amap.Attribute.DataType)" class="form-control" ng-model="formData.MasterAttribute[amap.Attribute.AttributeId]" >
								<option ng-repeat="vv in amap.Attribute.AttributeValueMaps">
									{{ vv.AttributeValue.AttributeValueEn || vv }}
								</option>
							</select>
							<input ng-if="_isFreeTextInput(amap.Attribute.DataType)" type="text" class="form-control" ng-model="formData.MasterAttribute[amap.Attribute.AttributeId]" />
						</div>
					</div>

					<div class="form-group">
						<div class="width-label"><label class="control-label">Product Variations</label></div>
						<div class="width-field-small">
							<select class="form-control" ng-disabled="availableAttributeSets.length == 0" ng-model="enableProductVariations">
								<option value="enable">
									Enable
								</option>
								<option value="disable" selected>
									Disable
								</option>
							</select>
						</div>
					</div>


 					</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Keywords</h2></div>
				<div class="form-section-content">

					<? $this->insert('components/forms/dropdown-with-label',
							["label" => "Search Tag",
				       		"ng_model" => "formData.Keywords",
					     	"tooltip" => "Search Tag will help you product easier to be discovered",
							"size" => "large",
							"choices" => "formData.AttributeSet.AttributeSetTagMaps",
							"multiple" => true,
							"tagging" => true
						]) ?>

					<div class="form-group" ng-if="formData.AttributeSet.AttributeSetTagMaps.length > 0">
						<div class="width-label"><label class="control-label">Suggested Search Tag</label></div>
						<div class="width-field-xl">
							<div class="bootstrap-tagsinput tagsinput-plain">
								<a class="tag label label-info" ng-repeat="tag in formData.AttributeSet.AttributeSetTagMaps"
								 ng-click="(formData.Keywords.indexOf(tag) == -1) && formData.Keywords.push(tag)"> {{ tag }}</a>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Inventory</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/input-text-with-label',
						["label" => "Inventory Amount", "ng_model" => "formData.MasterVariant.Quantity", "hint" => "Example: 100"]) ?>
					<? $this->insert('components/forms/input-text-with-label', ["label" => "Safety Stock Amount", "ng_model" => "formData.MasterVariant.SafetyStock", "hint" => "Example: 10", "tooltip" => "When your inventory gets lower than saftety stock, you will get a warning"]) ?>
					<? $this->insert('components/forms/dropdown-with-label', 
						["label" => "Stock Type", 
						"ng_model" => "formData.MasterVariant.StockType", 
						"choices" => "availableStockTypes",
						"options" => ["Stock", "Pre-Order"]]) ?>
				</div>
			</div>
			<div class="form-section">
				<div class="form-section-header"><h2>Shipping Detail</h2></div>
				<div class="form-section-content">
					<? $this->insert('components/forms/multiple-radio-multiline', ["label" => "Shipping Method", "ng_model" => "formData.ShippingMethod", "choices" => ["Dropship by 3PL", "Central Fulfillment"]]) ?>
					<? $this->insert('components/forms/input-text-with-label-unit',
					["label" => "Preparation Time",
					"required" => true,
					"ng_model" => "formData.PrepareDay",
					"label_class" => "required",
					"unit" => "Day",
					"form_group_class" => "margin-top-30"]) ?>
					<? $this->insert('components/forms/multiple-input-with-label', ["label" => "Package Dimension", "label_class" => "required",
					"ng_model_width"=>"formData.MasterVariant.Width",
					"ng_model_height"=>"formData.MasterVariant.Height",
					"ng_model_unit" => "formData.MasterVariant.DimensionUnit",
					"ng_model_length"=>"formData.MasterVariant.Length",
					"form_group_class" => "margin-top-30"]) ?>
					<? $this->insert('components/forms/multiple-input', ["label" => "Weight", 
						"ng_model_unit" => "formData.MasterVariant.WeightUnit", 
						"ng_model" => "formData.MasterVariant.Weight", 
						"label_class" => "required"]) ?>
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
