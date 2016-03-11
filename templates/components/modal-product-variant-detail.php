<div class="modal fade" tabindex="-1" role="dialog" id="<?= $id ?>" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="float-left modal-title">Variant: {{ <?=$model?>.text }}</h3>

                <span class="float-right">
					<a class="link-btn-plain" data-dismiss="modal">Cancel</a>
					<button type="button" class="btn btn-blue btn-width-xl" ng-click="$emit('savePairModal')" ng-disabled="addProductVariantForm.$invalid" data-dismiss="modal">Save</button>
				</span>
            </div>
            <div class="modal-body margin-top-20">
                <div class="row">
                    <div class="col-xs-12">
                        <div ng-show="addProductVariantForm.$invalid" class="alert alert-red">
                            Please make sure all fields have no error.
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
									'label': 'Product Name (English)',
									'labelClass': 'required',
									'error' : {
									'messages': {
										'pattern': 'Special characters are not allowed'
									},
									'show': $root.isInvalid(addProductVariantForm.Modal_ProductNameEn),
									'conditions' : addProductVariantForm.Modal_ProductNameEn.$error
									}
									}">
                                    <input class="form-control width-field-large" name="Modal_ProductNameEn" ng-model="<?=$model?>.ProductNameEn" maxlength="300" ng-pattern="/^[^<>ก-๙]+$/" ng-class="{ 'has-error' : $root.isInvalid(addProductVariantForm.Modal_ProductNameEn) }" />
                                </div>

                                <div ng-template="common/input/text2" ng-template-options="{
									'label': 'Product Name (ไทย)',
									'labelClass': 'required',
									'error' : {
									'messages': {
									'pattern': 'Only letters and numbers allowed'
									},
									'show': $root.isInvalid(addProductVariantForm.Modal_ProductNameTh),
									'conditions' : addProductVariantForm.Modal_ProductNameTh.$error
									}
									}">
                                    <input class="form-control width-field-large" name="Modal_ProductNameTh" ng-model="<?= $model ?>.ProductNameTh" ng-class="{ 'has-error' : $root.isInvalid(addProductVariantForm.Modal_ProductNameTh) }" ng-pattern="/^[^<>]+$/" maxlength="300" />
                                </div>

                                <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.Modal_Upc"
                                nc-label="UPC" nc-template-options-path="addProductForm/MasterVariant_Upc">
                                    <input class="form-control width-field-large" name="Modal_Upc" ng-model="<?= $model ?>.Upc" maxlength="100" />
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
                        <?php $this->insert('components/forms/form-section-upload-new-product-image',
                        ["uploader" => "uploaderModal",
                        "model" => $model,
                        "images" => $model .".Images"]) ?>

                            <div class="form-section">
                                <div class="form-section-header">
                                    Embed Video
                                </div>
                                <div class="form-section-content">
                                    <div ng-template="common/input/text2" ng-template-options="{
				                        'label': 'Video Link 1',
				                        'hint': {
				                        	'show': true,
				                        	'message': 'Example: https://www.youtube.com/watch?v=f78M4nKW1Ms'
				                        },
				                        'error' : {
				                              'messages': {
				                              	'url': 'Please enter valid URL'
				                              },
				                              'show': $root.isInvalid(addProductVariantForm.Modal_VideoLinks0),
				                              'conditions' : addProductVariantForm.Modal_VideoLinks0.$error
				                         }
				                      }">
                                        <input class="form-control width-field-normal" name="Modal_VideoLinks0" type="url" maxlength="500" ng-model="<?=$model?>.VideoLinks[0]" ng-class="{ 'has-error' : $root.isInvalid(addProductVariantForm.Modal_VideoLinks0) }" />
                                    </div>


                                    <div ng-template="common/input/text2" ng-template-options="{
				                        'label': 'Video Link 2',
				                        'hint': {
				                        	'show': true,
				                        	'message': 'Example: https://www.youtube.com/watch?v=f78M4nKW1Ms'
				                        },
				                        'error' : {
				                              'messages': {
				                              	'url': 'Please enter valid URL'
				                              },
				                              'show': $root.isInvalid(addProductVariantForm.Modal_VideoLinks1),
				                              'conditions' : addProductVariantForm.Modal_VideoLinks1.$error
				                         }
				                      }">
                                        <input class="form-control width-field-normal" name="Modal_VideoLinks1" type="url" maxlength="500" ng-model="<?=$model?>.VideoLinks[1]" ng-class="{ 'has-error' : $root.isInvalid(addProductVariantForm.Modal_VideoLinks1) }" />
                                    </div>


                                    <div ng-template="common/input/text2" ng-template-options="{
				                        'label': 'Video Link 3',
				                        'hint': {
				                        	'show': true,
				                        	'message': 'Example: https://www.youtube.com/watch?v=f78M4nKW1Ms'
				                        },
				                        'error' : {
				                              'messages': {
				                              	'url': 'Please enter valid URL'
				                              },
				                              'show': $root.isInvalid(addProductVariantForm.Modal_VideoLinks2),
				                              'conditions' : addProductVariantForm.Modal_VideoLinks2.$error
				                         }
				                      }">
                                        <input type="url" class="form-control width-field-normal" name="Modal_VideoLinks2" maxlength="500" ng-model="<?=$model?>.VideoLinks[2]" ng-class="{ 'has-error' : $root.isInvalid(addProductVariantForm.Modal_VideoLinks2) }" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-section">
                                <div class="form-section-header">
                                    Description
                                </div>
                                <div class="form-section-content">

                                        <?php $this->insert('components/forms/ckeditor-with-label',
								            ["label" => "Description (English)", "size" => "xxl", "label_class" => "required", "ng_model" => $model.".DescriptionFullEn"]) ?>

                                            <div ng-template="common/input/textarea2" ng-template-options="{
                                                'label': 'Short Description (English)',
                                                'inputSize': 'xxl',
                                                'formGroupClass' : 'margin-top-30',
                                                'error' : {
                                                'messages': {
                                                    'pattern': 'Special characters are not allowed'
                                                },
                                                'show': $root.isInvalid(addProductVariantForm.Modal_DescriptionShortEn),
                                                'conditions' : addProductVariantForm.Modal_DescriptionShortEn.$error
                                                }
                                                }">
                                                <textarea ng-pattern="/^[^<>]+$/" class="form-control" maxlength="500" name="Modal_DescriptionShortEn" ng-model="<?=$model?>.DescriptionShortEn" ng-class="{ 'has-error' : $root.isInvalid(addProductVariantForm.Modal_DescriptionShortEn) }" />
                                                </textarea>
                                            </div>


                                             <?php $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (ไทย)", "size" => "xxl", "label_class" => "required","form_group_class" => "margin-top-40", "ng_model" => $model.".DescriptionFullTh"]) ?>

                                        <div ng-template="common/input/textarea2" ng-template-options="{
                                            'label': 'Short Description (ไทย)',
                                            'inputSize': 'xxl',
                                            'formGroupClass' : 'margin-top-30',
                                            'error' : {
                                            'messages': {
                                            'pattern': 'Special characters are not allowed'
                                            },
                                            'show': $root.isInvalid(addProductVariantForm.Modal_DescriptionShortTh),
                                            'conditions' : addProductVariantForm.Modal_DescriptionShortTh.$error
                                            }
                                            }">
                                            <textarea ng-pattern="/^[^<>]+$/" class="form-control" maxlength="500"
                                              name="Modal_DescriptionShortTh" ng-model="<?=$model?>.DescriptionShortTh" ng-class="{ 'has-error' : $root.isInvalid(addProductVariantForm.Modal_DescriptionShortTh) }" />
                                            </textarea>
                                        </div>

                                </div>
                            </div>
                            <div class="form-section">
                                <div class="form-section-header">
                                  Package Detail
                                </div>
                                <div class="form-section-content">
                                    <div nc-template="common/input/form-group-with-label" nc-label="Preparation Time" nc-template-form="Modal_PrepareDay" nc-template-options-path="addProductForm/PrepareDay">
                                        <input class="form-control width-field-normal" name="Modal_PrepareDay" ng-pattern-restrict="^[0-9]*$"
                                        maxlength="5" ng-model="<?=$model?>.PrepareDay" />
                                    </div>

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
                                                        'show': $root.isInvalid(addProductVariantForm.Modal_Length),
                                                        'conditions' : addProductVariantForm.Modal_Length.$error
                                                        }
                                                        }">
                                                        <input class="form-control" name="Modal_Length" maxlength="11" ng-pattern="/^\d+(\.\d{1,2})?$/" ng-model="<?=$model?>.Length" ng-class="{ 'has-error' : $root.isInvalid(addProductVariantForm.Modal_Length) }" />
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
                                                        'show': $root.isInvalid(addProductVariantForm.Modal_Height),
                                                        'conditions' : addProductVariantForm.Modal_Height.$error
                                                        }
                                                        }">
                                                        <input class="form-control" maxlength="11" name="Modal_Height" ng-pattern="/^\d+(\.\d{1,2})?$/" ng-model="<?=$model?>.Height" ng-class="{ 'has-error' : $root.isInvalid(addProductVariantForm.Modal_Height) }" />
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
                                                        'show': $root.isInvalid(addProductVariantForm.Modal_Width),
                                                        'conditions' : addProductVariantForm.Modal_Width.$error
                                                        }
                                                        }">
                                                        <input class="form-control" maxlength="11" name="Modal_Width" ng-pattern="/^\d+(\.\d{1,2})?$/" ng-model="<?=$model?>.Width" ng-class="{ 'has-error' : $root.isInvalid(addProductVariantForm.Modal_Width) }" />
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
                                                        'show': $root.isInvalid(addProductVariantForm.Modal_Weight),
                                                        'conditions' : addProductVariantForm.Modal_Weight.$error
                                                        }
                                                    }">
                                                    <input type="text" name="Modal_Weight" maxlength="11" ng-class="{ 'has-error' : $root.isInvalid(addProductVariantForm.Modal_Weight) }"
                                                    class="form-control" ng-pattern="/^\d+(\.\d{1,2})?$/" ng-model="<?= $model ?>.Weight" />
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

                            <div class="form-section">
                                <div class="form-section-header">
                                    <h2>SEO</h2></div>
                                <div class="form-section-content">

                                    <div ng-template="common/input/text2" ng-template-options="{ 'label': 'Meta Title (English)' }">
                                        <input maxlength="60" class="form-control width-field-normal"
                                        name="Modal_SEO_MetaTitleEn"
                                        ng-model="<?= $model ?>.SEO.MetaTitleEn"
                                        ng-class="{ 'has-error' : $root.isInvalid(Modal_SEO_MetaTitleEn) }" />
                                    </div>

                                    <div ng-template="common/input/text2" ng-template-options="{ 'label': 'Meta Title (ไทย)' }">
                                        <input maxlength="60" class="form-control width-field-normal"
                                        name="Modal_SEO_MetaTitleTh" ng-model="<?= $model ?>.SEO.MetaTitleTh"
                                        ng-class="{ 'has-error' : $root.isInvalid(Modal_SEO_MetaTitleTh) }" />
                                    </div>

                                    <div ng-template="common/input/text2" ng-template-options="{   'label': 'Meta Description (English)' }">
                                        <input maxlength="150" class="form-control width-field-normal"
                                        name="Modal_SEO_MetaDescriptionEn" ng-model="<?= $model ?>.SEO.MetaDescriptionEn"
                                        ng-class="{ 'has-error' : $root.isInvalid(Modal_SEO_MetaDescriptionEn) }" />
                                    </div>

                                    <div ng-template="common/input/text2" ng-template-options="{ 'label': 'Meta Description (ไทย)' }">
                                        <input maxlength="150" class="form-control width-field-normal"
                                        name="Modal_SEO_MetaDescriptionTh"
                                        ng-model="<?= $model ?>.SEO.MetaDescriptionTh"
                                        ng-class="{ 'has-error' : $root.isInvalid(Modal_SEO_MetaDescriptionTh) }" />
                                    </div>

                                    <div ng-template="common/input/text2" ng-template-options="{  'label': 'Meta Keywords (English)'	}">
                                        <input placeholder="Keywords separated by comma"
                                        class="form-control width-field-normal"
                                        name="Modal_SEO_MetaKeywordsEn" ng-model="<?= $model ?>.SEO.MetaKeywordEn"
                                        ng-class="{ 'has-error' : $root.isInvalid(Modal_SEO_MetaKeywordsEn) }" />
                                    </div>

                                    <div ng-template="common/input/text2" ng-template-options="{   'label': 'Meta Keywords (ไทย)' }">
                                        <input placeholder="Keywords separated by comma"
                                        class="form-control width-field-normal" name="Modal_SEO_MetaKeywordTh"
                                        ng-model="<?= $model ?>.SEO.MetaKeywordTh"
                                        ng-class="{ 'has-error' : $root.isInvalid(Modal_SEO_MetaKeywordsTh) }" />
                                    </div>

                                    <div ng-template="common/input/text2" ng-template-options="{ 'label': 'Product URL Key' }">
                                        <input maxlength="300" class="form-control width-field-normal"
                                        ng-pattern="/^[A-Za-z0-9_\-]+$/" name="Modal_SEO_ProductUrlKeyEn"
                                        ng-model="<?= $model ?>.SEO.ProductUrlKeyEn"
                                        ng-class="{ 'has-error' : $root.isInvalid(Modal_SEO_ProductUrlKeyEn) }" />
                                    </div>

                                    <div ng-template="common/input/text2" ng-template-options="{
            						'label': 'Product Boosting Weight',
            						'error' : {
            						'messages': {
            						'max': 'Only numbers from 1 to 10000 is allowed',
            						'min': 'Only numbers from 1 to 10000 is allowed',
                                    'pattern': 'Only numbers from 1 to 10000 is allowed'
            						},
            						'show': $root.isInvalid(addProductForm.SEO_ProductBoostingWeight),
            						'conditions' : addProductForm.SEO_ProductBoostingWeight.$error
            						}
            						}">
                                        <input type="number" class="form-control width-field-normal"
                                        min="0" max="10000" step="1" ng-pattern="/^[0-9]+$/"
                                        name="Modal_SEO_ProductBoostingWeight" ng-model="<?= $model ?>.SEO.ProductBoostingWeight"
                                        ng-class="{ 'has-error' : $root.isInvalid(Modal_SEO_ProductBoostingWeight) }"
                                        />
                                    </div>

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
