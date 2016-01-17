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


					<? $this->insert('components/forms/input-text-with-label',
						["label" => "UPC", "ng_model" => "formData.MasterVariant.Upc",
						"tooltip" => "The Universal Product Code (UPC) is a barcode symbology (i.e., a specific type of barcode) that is widely used in the USA.", "size" => "large"]) ?>
				
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
				<!--	<? $this->insert('components/forms/input-text-with-label',
					 ["ng_model" => "formData.MasterVariant.OriginalPrice", 
					 "required" => true,
					  "label" => "Original Price", 
					  "hint" => "Example: 200 or 125.50", "label_class" => "required"]) ?>-->
				
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


					<? $this->insert('components/forms/input-text-with-label', ["ng_model" => "formData.MasterVariant.SalePrice", "label" => "Sale Price", "hint" => "Example: 100"]) ?>
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
					<? $this->insert('components/forms/dropdown-with-label',
						["label" => "Attribute Set",
						"showBy" => "AttributeSetNameEn",
						 "trackBy" => "AttributeSetId",
					 	 "choices" => "availableAttributeSets",
				  		 "ng_model"=> "formData.AttributeSet"
						])
					?>
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
							"choices" => "availableSearchTags",
							"multiple" => true,
							"tagging" => true
						]) ?>

					<? $this->insert('components/forms/tags-with-label', ["label" => "Suggested Search Tag"]) ?>
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
