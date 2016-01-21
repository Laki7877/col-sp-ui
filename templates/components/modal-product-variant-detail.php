<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-header">
					<h3 class="float-left modal-title">Variant: {{ <?=$model?>.text }}</h3>

					<span class="float-right">
						<a class="link-btn-plain" data-dismiss="modal">Cancel</a>
						<button type="button" class="btn btn-blue btn-width-xl" ng-click="$emit('savePairModal')" data-dismiss="modal">Save</button>
					</span>

			</div>
			<div class="modal-body margin-top-20">
				<div class="row">
					<div class="col-xs-12">
						<div class="alert alert-warning " role="alert">
							Please input product variant detail only if it is different from the main product. The fields left blank will use the same information and image as the main product.
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<div class="form-section">
							<div class="form-section-header"><h2>Vital Information</h2></div>
							<div class="form-section-content modal-custom">
								<? $this->insert('components/forms/input-text-with-label', ["label" => "Product Name (Thai)", "ng_model" => $model . ".ProductNameTh"]) ?>
								<? $this->insert('components/forms/input-text-with-label', ["label" => "Product Name (English)", "ng_model" => $model . ".ProductNameEn"]) ?>
								<? $this->insert('components/forms/dropdown-with-label',
									["label" => "Display",
									 "showBy" => "text",
								 	 "choices" => "availableVariantDisplayOption",
							  		 "ng_model"=> $model . ".Display"
									])
								?>

							</div>
						</div>
						<? $this->insert('components/forms/form-section-upload-new-product-image', ["uploader" => "uploaderModal", "images" => $model .".Images"]) ?>
						<div class="form-section">
							<div class="form-section-header"><input type="checkbox" /> <span>Embed Video</span></div>
							<div class="form-section-content">
								<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 1", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "This is a tooltip", "ng_model" => $model . ".VideoLinks[0]"]) ?>
								<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 2", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "This is a tooltip", "ng_model" => $model . ".VideoLinks[1]"]) ?>
								<? $this->insert('components/forms/input-text-with-label', ["label" => "Video Link 3", "size" => "large", "hint" => "Example: https://www.youtube.com/watch?v=f78M4nKW1Ms", "tooltip" => "This is a tooltip", "ng_model" => $model . ".VideoLinks[2]"]) ?>
							</div>
						</div>
						<div class="form-section">
							<div class="form-section-header"><h2>Description</h2></div>
							<div class="form-section-content">
								<? $this->insert('components/forms/ckeditor-with-label', 
								["label" => "Description (Thai)", "size" => "xxl", "label_class" => "required", "ng_model" => $model.".DescriptionFullTh"]) ?>
								<? $this->insert('components/forms/textarea-with-label', 
								["label" => "Short Description (Thai)", "tooltip" => "This is a tooltip text", "size" => "xxl", "ng_model" => $model.".DescriptionShortTh"]) ?>
								<? $this->insert('components/forms/ckeditor-with-label', 
								["label" => "Description (English)", "size" => "xxl", "label_class" => "required", "ng_model" => $model.".DescriptionFullEn"]) ?>
								<? $this->insert('components/forms/textarea-with-label',
								 ["label" => "Short Description (English)", "tooltip" => "This is a tooltip text", "size" => "xxl", "ng_model" => $model.".DescriptionShortEn"]) ?>
							</div>
						</div>
						<div class="form-section">
							<div class="form-section-header"><h2>Package Detail</h2></div>
							<div class="form-section-content">
								<? $this->insert('components/forms/multiple-input-with-label', 
								["label" => "Package Dimension", 
								"ng_model_length" => $model.".Length", 
								"ng_model_height" => $model.".Height", 
								"ng_model_width" => $model.".Width",
								"ng_model_dimension" => $model.".DimensionUnit"]) ?>
								
								<? $this->insert('components/forms/multiple-input', 
								["label" => "Weight", "ng_model" => $model.".Weight", "ng_model_dimension" => $model.".WeightUnit"]) ?>
							</div>
						</div>
					</div> <!-- end .col-xs-12 -->
					<div class="col-xs-12">
						<span class="float-right">
							<a class="link-btn-plain" data-dismiss="modal">Cancel</a>
							<button type="button" class="btn btn-blue btn-width-xl" ng-click="$emit('savePairModal')" data-dismiss="modal">Save</button>
						</span>
					</div> <!-- end .col-xs-12 -->
				</div> <!-- end .row -->
			</div> <!-- end .modal-body -->
		</div> <!-- end .modal-content -->
	</div> <!-- end .modal-dialog -->
</div> <!-- end .modal -->
