<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>" data-keyboard="false" data-backdrop="static"> 
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
								<div ng-template="common/input/text2"
									ng-template-options="{
									'label': 'Product Name (Thai)',
									'labelClass': 'required',
									'error' : {
									'messages': {
									'pattern': 'Only letters and numbers allowed'
									},
									'show': $root.isInvalid(addProductForm.Modal_ProductNameTh),
									'conditions' : addProductForm.Modal_ProductNameTh.$error
									}
									}">
									<input
									class="form-control width-field-large"
									name="Modal_ProductNameTh"
									ng-model="<?= $model ?>.ProductNameTh"
									ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_ProductNameTh) }"
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
										'pattern': 'Only letters and numbers allowed'
									},
									'show': $root.isInvalid(addProductForm.Modal_ProductNameEn),
									'conditions' : addProductForm.Modal_ProductNameEn.$error
									}
									}">
									<input
									class="form-control width-field-large"
									name="Modal_ProductNameEn"
									ng-model="<?=$model?>.ProductNameEn"
									maxlength="300"
									ng-pattern="/^[0-9a-zA-Z\s]+$/"
									ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_ProductNameEn) }"
									/>
								</div>


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
							<div class="form-section-header"><input type="checkbox" ng-model="<?= $model ?>._embedVideo"/> <span style='margin-bottom: 25px'>Embed Video</span></div>
							<div class="form-section-content" ng-if="<?= $model ?>._embedVideo">
									<div ng-template="common/input/text2"
				                      ng-template-options="{
				                        'label': 'Video Link 1',
				                        'hint': {
				                        	'show': true,
				                        	'message': 'Example: https://www.youtube.com/watch?v=f78M4nKW1Ms'
				                        },
				                        'tooltip': 'Youtube Links',
				                        'error' : {
				                              'messages': {
				                              	'url': 'Please enter valid URL'
				                              },
				                              'show': $root.isInvalid(addProductForm.Modal_VideoLinks0),
				                              'conditions' : addProductForm.Modal_VideoLinks0.$error
				                         }
				                      }">
				                      <input
				                        class="form-control width-field-normal"
				                        name="Modal_VideoLinks0"
				                        type="url"
				                        maxlength="500"
				                        ng-model="<?=$model?>.VideoLinks[0]"
				                        ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_VideoLinks0) }"  />
				                    </div>


				                    <div ng-template="common/input/text2"
				                      ng-template-options="{
				                        'label': 'Video Link 2',
				                        'hint': {
				                        	'show': true,
				                        	'message': 'Example: https://www.youtube.com/watch?v=f78M4nKW1Ms'
				                        },
				                        'tooltip': 'Youtube Links',
				                        'error' : {
				                              'messages': {
				                              	'url': 'Please enter valid URL'
				                              },
				                              'show': $root.isInvalid(addProductForm.Modal_VideoLinks1),
				                              'conditions' : addProductForm.Modal_VideoLinks1.$error
				                         }
				                      }">
				                      <input
				                        class="form-control width-field-normal"
				                        name="Modal_VideoLinks1"
				                        type="url"
				                        maxlength="500"
				                        ng-model="<?=$model?>.VideoLinks[1]"
				                        ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_VideoLinks1) }"  />
				                    </div>


				                    <div ng-template="common/input/text2"
				                      ng-template-options="{
				                        'label': 'Video Link 3',
				                        'hint': {
				                        	'show': true,
				                        	'message': 'Example: https://www.youtube.com/watch?v=f78M4nKW1Ms'
				                        },
				                        'tooltip': 'Youtube Links',
				                        'error' : {
				                              'messages': {
				                              	'url': 'Please enter valid URL'
				                              },
				                              'show': $root.isInvalid(addProductForm.Modal_VideoLinks2),
				                              'conditions' : addProductForm.Modal_VideoLinks2.$error
				                         }
				                      }">
				                      <input
				                        type="url"
				                        class="form-control width-field-normal"
				                        name="Modal_VideoLinks2"
				                        maxlength="500"
				                        ng-model="<?=$model?>.VideoLinks[2]"
				                        ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_VideoLinks2) }"  />
				                    </div>
							</div>
						</div>
						<div class="form-section">
							<div class="form-section-header"><h2>Description</h2></div>
							<div class="form-section-content">
								<? $this->insert('components/forms/ckeditor-with-label', 
								["label" => "Description (Thai)", "size" => "xxl", "label_class" => "required", "ng_model" => $model.".DescriptionFullTh"]) ?>
																
								<div ng-template="common/input/textarea2"
									ng-template-options="{
									'label': 'Short Description (Thai)',
									'inputSize': 'xxl',
									'formGroupClass' : 'margin-top-30',
									'error' : {
									'messages': {
									'pattern': 'Only letters and numbers allowed'
									},
									'show': $root.isInvalid(addProductForm.Modal_DescriptionShortTh),
									'conditions' : addProductForm.Modal_DescriptionShortTh.$error
									}
									}">
									<textarea
										ng-pattern="/^[0-9A-Za-zก-ฮ\s]+$/"
										class="form-control"
										maxlength="500"
										name="Modal_DescriptionShortTh"
										ng-model="<?=$model?>.DescriptionShortTh"
										ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_DescriptionShortTh) }" />
									</textarea>
								</div>

								<? $this->insert('components/forms/ckeditor-with-label', 
								["label" => "Description (English)", "size" => "xxl", "label_class" => "required", "ng_model" => $model.".DescriptionFullEn"]) ?>
								
								<? $this->insert('components/forms/textarea-with-label',
								 ["label" => "Short Description (English)", "tooltip" => "This is a tooltip text", "size" => "xxl", "ng_model" => $model.".DescriptionShortEn"]) ?>
							</div>
						</div>
						<div class="form-section">
							<div class="form-section-header"><h2>Package Detail</h2></div>
							<div class="form-section-content">
								
								<!-- package detail -->
								<div class="form-group">
						<div class="width-label"><label class="control-label required">Package Dimension</label></div>
						<div class="width-field-xxl">
							<div class="multiple-input">
								<div class="input-column">

									<div ng-template="common/input/text3"
										ng-template-options="{
										'label': 'Length',
										'error' : {
										'messages': {
										'required': 'This is a required field',
										'pattern': 'Only numbers and decimals allowed'
										},
										'show': $root.isInvalid(addProductForm.Modal_Length),
										'conditions' : addProductForm.Modal_Length.$error
										}
										}">
										<input
										class="form-control"
										name="Modal_Length"
										ng-pattern="/^\d+(\.\d{1,2})?$/"
										ng-model="<?=$model?>.Length"
										ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_Length) }"  />
									</div>

								</div>

								<div class="input-column">
									<div ng-template="common/input/text3"
										ng-template-options="{
										'label': 'Height',
										'error' : {
										'messages': {
										'required': 'This is a required field',
										'pattern': 'Only numbers and decimals allowed'
										},
										'show': $root.isInvalid(addProductForm.Modal_Height),
										'conditions' : addProductForm.Modal_Length.$error
										}
										}">
										<input
										class="form-control"
										name="Modal_Height"
										ng-pattern="/^\d+(\.\d{1,2})?$/"
										ng-model="<?=$model?>.Height"
										ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_Height) }"  />
									</div>
								</div>

								<div class="input-column">
									<div ng-template="common/input/text3"
										ng-template-options="{
										'label': 'Width',
										'error' : {
										'messages': {
										'required': 'This is a required field',
										'pattern': 'Only numbers and decimals allowed'
										},
										'show': $root.isInvalid(addProductForm.Modal_Width),
										'conditions' : addProductForm.Modal_Width.$error
										}
										}">
										<input
										class="form-control"
										name="Modal_Width"
										ng-pattern="/^\d+(\.\d{1,2})?$/"
										ng-model="<?=$model?>.Width"
										ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_Width) }"  />
									</div>
								</div>

								<div class="input-column no-label select input-xl">
									<select ng-model="<?=$model?>.DimensionUnit" class="form-control">
										<option value="MM"> Millimeter </option>
										<option value="CM"> Centimeter </option>
										<option value="M"> Meter </option>
									</select>
								</div>

							</div>
						</div>
					</div>

								<!-- end of package detail -->
								
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
