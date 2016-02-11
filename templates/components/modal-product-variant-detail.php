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
                            <div class="form-section-header">
                                <h2>Vital Information</h2></div>
                            <div class="form-section-content modal-custom">
                                <div ng-template="common/input/text2" ng-template-options="{
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
                                    <input class="form-control width-field-large" name="Modal_ProductNameTh"
                                     ng-model="<?= $model ?>.ProductNameTh" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_ProductNameTh) }" 
                                     ng-pattern="/^[^<>]+$/" maxlength="300" />
                                </div>

                                <div ng-template="common/input/text2" ng-template-options="{
									'label': 'Product Name (English)',
									'labelClass': 'required',
									'error' : {
									'messages': {
										'pattern': 'Special characters are not allowed'
									},
									'show': $root.isInvalid(addProductForm.Modal_ProductNameEn),
									'conditions' : addProductForm.Modal_ProductNameEn.$error
									}
									}">
                                    <input class="form-control width-field-large" name="Modal_ProductNameEn" 
                                    ng-model="<?=$model?>.ProductNameEn" maxlength="300" ng-pattern="/^[^<>ก-๙]+$/" 
                                    ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_ProductNameEn) }" />
                                </div>


                                <div class="form-group">
                                    <div class="width-label">
                                        <label class="control-label">
                                            Display
                                        </label>
                                    </div>
                                    <div class="width-field-normal">
                                        <div class="ah-select2-dropdown">
                                            <select class="form-control" ng-model="<?=$model?>.Display">
                                                <option value="{{op.value}}" ng-repeat="op in dataSet.VariantDisplayOption">
                                                    {{ op.text }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <? $this->insert('components/forms/form-section-upload-new-product-image', 
                        ["uploader" => "uploaderModal",
                        "checkbox" => true,
                        "model" => $model,
                        "images" => $model .".Images"]) ?>
                        
                        <div class="form-section">
                                <div class="form-section-header checkbox">
                                        <label>
                                            <input type="checkbox" ng-model="<?= $model ?>._override.embedVideo"> Override "Embed Video"
                                        </label>
                                </div>
                                <div class="form-section-content" ng-show="<?= $model ?>._override.embedVideo">
                                    <div ng-template="common/input/text2" ng-template-options="{
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
                                        <input class="form-control width-field-normal" name="Modal_VideoLinks0" type="url" maxlength="500" ng-model="<?=$model?>.VideoLinks[0]" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_VideoLinks0) }" />
                                    </div>


                                    <div ng-template="common/input/text2" ng-template-options="{
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
                                        <input class="form-control width-field-normal" name="Modal_VideoLinks1" type="url" maxlength="500" ng-model="<?=$model?>.VideoLinks[1]" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_VideoLinks1) }" />
                                    </div>


                                    <div ng-template="common/input/text2" ng-template-options="{
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
                                        <input type="url" class="form-control width-field-normal" name="Modal_VideoLinks2" maxlength="500" ng-model="<?=$model?>.VideoLinks[2]" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_VideoLinks2) }" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-section">
                                <div class="form-section-header checkbox">
                                    <label>
                                            <input type="checkbox" ng-model="<?= $model ?>._override.description"> 
                                            Override "Description"
                                    </label>  
                                </div>
                                <div class="form-section-content" ng-show="<?= $model ?>._override.description">
                                    <? $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (Thai)", "size" => "xxl", "label_class" => "required", "ng_model" => $model.".DescriptionFullTh"]) ?>

                                        <div ng-template="common/input/textarea2" ng-template-options="{
                                            'label': 'Short Description (Thai)',
                                            'inputSize': 'xxl',
                                            'formGroupClass' : 'margin-top-30',
                                            'error' : {
                                            'messages': {
                                            'pattern': 'Special characters are not allowed'
                                            },
                                            'show': $root.isInvalid(addProductForm.Modal_DescriptionShortTh),
                                            'conditions' : addProductForm.Modal_DescriptionShortTh.$error
                                            }
                                            }">
                                            <textarea ng-pattern="/^[^<>]+$/" class="form-control" maxlength="500" name="Modal_DescriptionShortTh" ng-model="<?=$model?>.DescriptionShortTh" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_DescriptionShortTh) }" />
                                            </textarea>
                                        </div>

                                        <? $this->insert('components/forms/ckeditor-with-label', 
								            ["label" => "Description (English)", "size" => "xxl", "label_class" => "required", "ng_model" => $model.".DescriptionFullEn"]) ?>
                                            
                                            <div ng-template="common/input/textarea2" ng-template-options="{
                                                'label': 'Short Description (English)',
                                                'inputSize': 'xxl',
                                                'formGroupClass' : 'margin-top-30',
                                                'error' : {
                                                'messages': {
                                                    'pattern': 'Special characters are not allowed'
                                                },
                                                'show': $root.isInvalid(addProductForm.Modal_DescriptionShortEn),
                                                'conditions' : addProductForm.Modal_DescriptionShortEn.$error
                                                }
                                                }">
                                                <textarea ng-pattern="/^[^<>]+$/" class="form-control" 
                                                maxlength="500" name="Modal_DescriptionShortEn" ng-model="<?=$model?>.DescriptionShortEn" 
                                                ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_DescriptionShortTh) }" />
                                                </textarea>
                                            </div>
                                        
                                </div>
                            </div>
                            <div class="form-section">
                                <div class="form-section-header checkbox">
                                      <label>
                                            <input type="checkbox" ng-model="<?= $model ?>._override.packageDetail"> Override "Package Detail"
                                    </label>  
                                </div>
                                <div class="form-section-content" ng-show="<?= $model ?>._override.packageDetail">

                                    <!-- package detail -->
                                    <div class="form-group">
                                        <div class="width-label">
                                            <label class="control-label required" style="margin-top: 25px">Package Dimension</label>
                                        </div>
                                        <div class="width-field-xxl">
                                            <div class="multiple-input">
                                                <div class="input-column">

                                                    <div ng-template="common/input/text3" ng-template-options="{
                                                        'label': 'Length',
                                                        'error' : {
                                                        'messages': {
                                                        'required': 'This is a required field',
                                                        'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
                                                        },
                                                        'show': $root.isInvalid(addProductForm.Modal_Length),
                                                        'conditions' : addProductForm.Modal_Length.$error
                                                        }
                                                        }">
                                                        <input class="form-control" name="Modal_Length" maxlength="11" ng-pattern="/^\d+(\.\d{1,2})?$/" ng-model="<?=$model?>.Length" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_Length) }" />
                                                    </div>

                                                </div>

                                                <div class="input-column">
                                                    <div ng-template="common/input/text3" ng-template-options="{
                                                        'label': 'Height',
                                                        'error' : {
                                                        'messages': {
                                                        'required': 'This is a required field',
                                                        'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
                                                        },
                                                        'show': $root.isInvalid(addProductForm.Modal_Height),
                                                        'conditions' : addProductForm.Modal_Height.$error
                                                        }
                                                        }">
                                                        <input class="form-control" maxlength="11" name="Modal_Height" ng-pattern="/^\d+(\.\d{1,2})?$/" ng-model="<?=$model?>.Height" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_Height) }" />
                                                    </div>
                                                </div>

                                                <div class="input-column">
                                                    <div ng-template="common/input/text3" ng-template-options="{
                                                        'label': 'Width',
                                                        'error' : {
                                                        'messages': {
                                                        'required': 'This is a required field',
                                                        'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
                                                        },
                                                        'show': $root.isInvalid(addProductForm.Modal_Width),
                                                        'conditions' : addProductForm.Modal_Width.$error
                                                        }
                                                        }">
                                                        <input class="form-control" maxlength="11" name="Modal_Width" ng-pattern="/^\d+(\.\d{1,2})?$/" ng-model="<?=$model?>.Width" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_Width) }" />
                                                    </div>
                                                </div>

                                                <div class="input-column no-label select input-xl" style="padding-top: 24px">
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


                                    <div class="form-group">
                                        <div class="width-label">
                                            <label class="control-label required">Weight</label>
                                        </div>
                                        <div class="width-field-xxl">
                                            <div class="multiple-input">

                                                <div ng-template="common/input/text-column" ng-template-options="{
                                                        'error' : {
                                                            'messages': {
                                                                'required': 'This is a required field',
                                                                'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
                                                            },
                                                        'show': $root.isInvalid(addProductForm.Modal_Weight),
                                                        'conditions' : addProductForm.Modal_Weight.$error
                                                        }
                                                    }">
                                                    <input type="text" name="Modal_Weight" maxlength="11" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.Modal_Weight) }" class="form-control" ng-pattern="/^\d+(\.\d{1,2})?$/" ng-model="<?= $model ?>.Weight" />
                                                </div>

                                                <div class="input-column select input-xl">
                                                    <div class="ah-select2-dropdown">
                                                        <select class="form-control" ng-model="<?= $model ?>.WeightUnit">
                                                            <option value="G"> Grams </option>
                                                            <option value="KG"> Kilograms </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <!-- input-xl-->
                                            </div>
                                            <!--multi-->
                                        </div>
                                        <!-- widht-xxl-->
                                    </div>
                                    <!--formgp-->

                                </div>
                            </div>
                    </div>
                    <!-- end .col-xs-12 -->
                    <div class="col-xs-12">
                        <span class="float-right">
							<a class="link-btn-plain" data-dismiss="modal">Cancel</a>
							<button type="button" class="btn btn-blue btn-width-xl" ng-click="$emit('savePairModal')" data-dismiss="modal">Save</button>
						</span>
                    </div>
                    <!-- end .col-xs-12 -->
                </div>
                <!-- end .row -->
            </div>
            <!-- end .modal-body -->
        </div>
        <!-- end .modal-content -->
    </div>
    <!-- end .modal-dialog -->
</div>
<!-- end .modal -->