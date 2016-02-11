<div id="add-product-information-tab-content">
    <? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>

        <div class="row" ng-if="overview.Status">
            <div class="col-xs-12">
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Overview</h2></div>
                    <div class="form-section-content">
                        <div class="container-fluid" style="margin: -15px">
                            <table class="table">
                                <thead>
                                    <th>Product Name</th>
                                    <th ng-if="(formData.Variants || []).length == 0">PID</th>
                                    <th ng-if="(formData.Variants || []).length > 0">Group ID</th>
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
                                            <span class="{{ asStatus(overview.Status).color }}">
									<i class="fa {{ asStatus(overview.Status).icon }}"></i>
									{{ asStatus(overview.Status).name }}
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
                    <div class="form-section-header">
                        <h2>Vital Information</h2></div>
                    <div class="form-section-content">


                        <div ng-template="common/input/text2" ng-template-options="{
                            'label': 'Product Name (English)',
                            'labelClass': 'required',
                            'error' : {
                            'messages': {
                            'required': 'This is a required field',
                            'pattern': 'Special characters are not allowed'
                            },
                            'show': $root.isInvalid(addProductForm.MasterVariant_ProductNameEn),
                            'conditions' : addProductForm.MasterVariant_ProductNameEn.$error
                            }
                            }">
                            <input class="form-control width-field-large" name="MasterVariant_ProductNameEn" ] ng-model="formData.MasterVariant.ProductNameEn" maxlength="300" ng-pattern="/^([^<>ก-๙])+$/" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_ProductNameEn) }"
                            required />
                        </div>

                        <div ng-template="common/input/text2" ng-template-options="{
                            'label': 'Product Name (Thai)',
                            'labelClass': 'required',
                            'error' : {
                            'messages': {
                            'required': 'This is a required field',
                            'pattern': 'Only letters and numbers allowed'
                            },
                            'show': $root.isInvalid(addProductForm.MasterVariant_ProductNameTh),
                            'conditions' : addProductForm.MasterVariant_ProductNameTh.$error
                            }
                            }">
                            <input class="form-control width-field-large" name="MasterVariant_ProductNameTh" ng-model="formData.MasterVariant.ProductNameTh" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_ProductNameTh) }" ng-pattern="/^[^<>\s]+$/" maxlength="300"
                            required />
                        </div>

                        <div ng-template="common/input/text2" ng-template-options="{
                            'label': 'SKU',
                            'error' : {
                            'messages': {
                            'pattern': 'Special characters are not allowed'
                            },
                            'show': $root.isInvalid(addProductForm.MasterVariant_Sku),
                            'conditions' : addProductForm.MasterVariant_Sku.$error
                            }
                            }">
                            <input class="form-control width-field-large" name="MasterVariant_Sku" ng-show="controlFlags.variation != 'enable'" ng-disabled="controlFlags.variation == 'enable'" ng-model="formData.MasterVariant.Sku" maxlength="300" ng-pattern="/^[^<>]+$/" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_Sku) }"
                            />

                            <input class="form-control width-field-large" value="Edit in Variation Tab" disabled ng-if="controlFlags.variation == 'enable'" />
                        </div>


                        <div ng-template="common/input/text2" ng-template-options="{
					'label': 'UPC',
					'error' : {
					'messages': {
					'pattern': 'Only english letters and numbers allowed'
					},
					'show': $root.isInvalid(addProductForm.MasterVariant_Upc),
					'conditions' : addProductForm.MasterVariant_Upc.$error
					}
					}">
                            <input class="form-control width-field-large" ng-pattern="/^[0-9a-zA-Z\s]+$/" name="MasterVariant_Upc" maxlength="300" ng-model="formData.MasterVariant.Upc" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_Upc) }" />
                        </div>

                        <div ng-if="formData.MasterVariant.Pid">
                            <div ng-template="common/input/text" ng-template-options="{
						'label': (formData.Variants || []).length > 0 ? 'Group ID' : 'PID',
						'labelClass': 'required'
						}">
                                <input class="form-control width-field-large" name="MasterVariant_Pid" disabled ng-model="formData.MasterVariant.Pid" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_Pid) }" />
                            </div>
                        </div>


                        <? $this->insert('components/forms/dropdown-with-label',
				["label" => "Brand Name",
				"showBy" => "BrandNameEn",
				"placeholder" => "Search Brand..",
				"refresh" => "refreshBrands",
				"trackBy" => "BrandId",
				"choices" => "dataSet.Brands",
				"ng_model"=> "formData.Brand"
				])
				?>
                    </div>
                </div>
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Price</h2></div>
                    <div class="form-section-content">

                        <div ng-template="common/input/text2" ng-template-options="{
					'label': 'Original Price',
					'labelClass': 'required',
					'error' : {
					'messages': {
					'required': 'This is a required field',
					'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
					},
					'show': $root.isInvalid(addProductForm.MasterVariant_OriginalPrice),
					'conditions' : addProductForm.MasterVariant_OriginalPrice.$error
					}
					}">
                            <input class="form-control width-field-normal" name="MasterVariant_OriginalPrice" ng-pattern="/^\d+(\.\d{1,2})?$/" maxlength="20" ng-disabled="controlFlags.variation == 'enable'" ng-model="formData.MasterVariant.OriginalPrice" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_OriginalPrice) }"
                            ng-required="controlFlags.variation == 'disable'" />
                        </div>

                        <div ng-template="common/input/text2" ng-template-options="{
					'label': 'Sale Price',
					'error' : {
					'messages': {
					'min': 'Sale price must be lower than the original price',
					'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
					},
					'show': $root.isInvalid(addProductForm.MasterVariant_SalePrice),
					'conditions' : addProductForm.MasterVariant_SalePrice.$error
					}
					}">
                            <input ng-disabled="controlFlags.variation == 'enable'" ng-pattern="/^\d+(\.\d{1,2})?$/" class="form-control width-field-normal" maxlength="20" name="MasterVariant_SalePrice" ng-model="formData.MasterVariant.SalePrice" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_SalePrice) }"
                            />
                        </div>
                    </div>
                </div>
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Description</h2></div>
                    <div class="form-section-content">
                        <? $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (Thai)", "ng_model" => "formData.MasterVariant.DescriptionFullTh", "size" => "xxl"]) ?>

                            <div ng-template="common/input/textarea2" ng-template-options="{
                                'label': 'Short Description (Thai)',
                                'inputSize': 'xxl',
                                'formGroupClass' : 'margin-top-30',
                                'error' : {
                                'messages': {
                                'pattern': 'Special characters are not allowed'
                                },
                                'show': $root.isInvalid(addProductForm.MasterVariant_DescriptionShortTh),
                                'conditions' : addProductForm.MasterVariant_DescriptionShortTh.$error
                                }
                                }">
                                <textarea ng-pattern="/^[^<>]+$/" class="form-control" maxlength="500" name="MasterVariant_DescriptionShortTh" ng-model="formData.MasterVariant.DescriptionShortTh" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_DescriptionShortTh) }"
                                />
                                </textarea>
                            </div>

                            <? $this->insert('components/forms/ckeditor-with-label', 
                            ["label" => "Description (English)", "ng_model" => "formData.MasterVariant.DescriptionFullEn", "size" => "xxl", "form_group_class" => "margin-top-40"]) ?>

                                <div ng-template="common/input/textarea2" ng-template-options="{
                                        'label': 'Short Description (English)',
                                        'inputSize': 'xxl',
                                        'formGroupClass' : 'margin-top-30',
                                        'error' : {
                                        'messages': {
                                        'pattern': 'Only english letters and numbers allowed'
                                        },
                                        'show': $root.isInvalid(addProductForm.MasterVariant_DescriptionShortEn),
                                        'conditions' : addProductForm.MasterVariant_DescriptionShortEn.$error
                                        }
                                        }">
                                    <textarea ng-pattern="/^[0-9A-Za-z\s]+$/" class="form-control" maxlength="500" name="MasterVariant_DescriptionShortEn" ng-model="formData.MasterVariant.DescriptionShortEn" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_DescriptionShortEn) }"
                                    />
                                    </textarea>
                                </div>
                    </div>
                </div>
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Detail</h2></div>
                    <div class="form-section-content">

                        <!-- select attribute set -->
                        <div class="form-group ">
                            <div class="width-label">
                                <label class="control-label ">Attribute Set</label>
                            </div>
                            <div class="width-field-normal">
                                <div class="ah-select2-dropdown">
                                    <!-- dont show if nothing is dataSet. to choose from -->
                                    <ui-select ng-model="formData.AttributeSet" ng-show="dataSet.AttributeSets.length > 0">
                                        <ui-select-match placeholder="Search Attribute Set">
                                            <span ng-bind="$select.selected.AttributeSetNameEn"></span>
                                            <span ng-show="!$select.selected.AttributeSetNameEn">- Select Attribute Set -</span>
                                        </ui-select-match>
                                        <ui-select-choices repeat="item in (dataSet.AttributeSets) | filter : $select.search track by item.AttributeSetId">
                                            <span ng-bind="item.AttributeSetNameEn"></span>
                                        </ui-select-choices>
                                    </ui-select>
                                    <!-- if nothing is availalbe to pick -->
                                    <select class="form-control" ng-if="dataSet.AttributeSets.length == 0" disabled>
                                        <option disabled>Not dataSet. for this Global Category</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- for each attribute in attribute set -->
                        <div class="form-group" ng-repeat="amap in formData.AttributeSet.AttributeSetMaps">
                            <div class="width-label">
                                <label class="control-label">
                                    {{ amap.Attribute.AttributeNameEn }}
                                </label>
                            </div>
                            <div ng-class="{'width-field-normal': !isHtmlInput(amap.Attribute.DataType), 'width-field-xxl': isHtmlInput(amap.Attribute.DataType)}">
                                <!-- disabled if is variant as variant is disabled -->

                                <select class="form-control" disabled ng-show="isListInput(amap.Attribute.DataType) && (amap.Attribute.VariantStatus && controlFlags.variation == 'enable')">
                                    <option selected>Edit in Variation Tab</option>
                                </select>

                                <!-- TODO: refactor -->
                                <input class="form-control" disabled type="text" ng-show="(isHtmlInput(amap.Attribute.DataType) || isFreeTextInput(amap.Attribute.DataType))
                                 && (amap.Attribute.VariantStatus && controlFlags.variation == 'enable')" value="Edit in Variation Tab" />

                                <!-- TODO: refactor -->
                                <select ng-show="isListInput(amap.Attribute.DataType) && (!amap.Attribute.VariantStatus || controlFlags.variation != 'enable')" class="form-control" ng-model="formData.MasterAttribute[amap.Attribute.AttributeId]">
                                    <option value="" disabled selected>- Select option -</option>
                                    <option ng-repeat="vv in amap.Attribute.AttributeValueMaps">
                                        {{ vv.AttributeValue.AttributeValueEn || vv }}
                                    </option>
                                </select>
                                
                                <div ng-if="isHtmlInput(amap.Attribute.DataType)">
                                    <textarea ng-model="formData.MasterAttribute[amap.Attribute.AttributeId]" class="form-control" ng-ckeditor="ckOptions"></textarea>
                                </div>
                                
                                <input ng-show="isFreeTextInput(amap.Attribute.DataType) && (!amap.Attribute.VariantStatus || controlFlags.variation != 'enable')" type="text" class="form-control" ng-model="formData.MasterAttribute[amap.Attribute.AttributeId]" />


                            </div>
                        </div>

                        <!-- select whether the product variation tab should be enabled -->
                        <div class="form-group">
                            <div class="width-label">
                                <label class="control-label">Product Variations</label>
                            </div>
                            <div class="width-field-normal">
                                <select class="form-control" ng-disabled="!formData.AttributeSet.AttributeSetId" ng-model="controlFlags.variation">
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
                    <div class="form-section-header">
                        <h2>Keywords</h2></div>
                    <div class="form-section-content">

                        <div ng-template="common/input/text2" ng-template-options="{
                            'label': 'Search Tag',
                            'inputSize': 'large',
                            'tooltip': 'Search Tag will help your product easier to be discovered',
                            'error' : {
                                'messages': {
                                    'maxtagcount': 'Cannot exceed 20 tags',
                                    'maxtaglength': 'Tag must contain 30 characters or less',
                                    'pattern': 'Only letters and numbers allowed'
                                },
                                'show': true,
                                'conditions' :  addProductForm.Keywords.$error
                            }
                            }">
                            <!-- on-select="onKeywordAdded($item, $model)" on-remove="onKeywordRemoved($item, $model)" -->
                            <ui-select ng-model="formData.Keywords" name="Keywords" nc-tag-validator nc-max-tag-count="20" nc-max-tag-length="30" nc-tag-pattern="^[a-zA-Z0-9ก-๙\s\-]+$" multiple tagging tagging-tokens=",|ENTER" tagging-label="" nc-tag-field>
                                <ui-select-match placeholder="Separate tags with comma (or enter)">
                                    {{$item}}
                                </ui-select-match>
                                <ui-select-choices repeat="item in formData.AttributeSet.AttributeSetTagMaps">
                                    {{item}}
                                </ui-select-choices>
                            </ui-select>

                        </div>

                        <div class="form-group" ng-if="formData.AttributeSet.AttributeSetTagMaps.length > 0">
                            <div class="width-label">
                                <label class="control-label">Suggested Search Tag</label>
                            </div>
                            <div class="width-field-xl">
                                <div class="bootstrap-tagsinput tagsinput-plain">
                                    <a class="tag label label-info" ng-repeat="tag in formData.AttributeSet.AttributeSetTagMaps" ng-click="(formData.Keywords.indexOf(tag) == -1) && formData.Keywords.push(tag)"> {{ tag }}</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Inventory</h2></div>
                    <div class="form-section-content">

                        <div ng-template="common/input/text2" ng-template-options="{
                                'label': 'Inventory Amount',
                                'hint': {
                                'message': 'Example: 100',
                                'show': true
                                },
                                'error' : {
                                'messages': {
                                'pattern': 'Only numbers allowed'
                                },
                                'show': $root.isInvalid(addProductForm.MasterVariant_Quantity),
                                'conditions' : addProductForm.MasterVariant_Quantity.$error
                                }
                                }">
                            <input class="form-control" name="MasterVariant_Quantity" ng-pattern-restrict="^[0-9]*$" maxlength="10" ng-model="formData.MasterVariant.Quantity" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_Quantity) }" />
                        </div>


                        <div ng-template="common/input/text2" ng-template-options="{
					'label': 'Safety Stock Amount',
					'hint': {
					'message': 'Example: 10',
					'show': true
					},
					'error' : {
					'messages': {
					'pattern': 'Only numbers allowed'
					},
					'show': $root.isInvalid(addProductForm.MasterVariant_SafetyStock),
					'conditions' : addProductForm.MasterVariant_SafetyStock.$error
					},
					'tooltip': 'When your inventory gets lower than saftety stock, you will get a warning'
					}">
                            <input class="form-control" name="MasterVariant_SafetyStock" ng-pattern-restrict="^[0-9]*$" maxlength="10" ng-model="formData.MasterVariant.SafetyStock" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_SafetyStock) }" />
                        </div>

                        <? $this->insert('components/forms/dropdown-with-label',
				["label" => "Stock Type",
				"ng_model" => "formData.MasterVariant.StockType",
				"choices" => "dataSet.StockTypes",
				"options" => ["Stock", "Pre-Order"]]) ?>
                    </div>
                </div>
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Shipping Detail</h2></div>
                    <div class="form-section-content">
                        <? $this->insert('components/forms/multiple-radio-multiline',
				["label" => "Shipping Method", "ng_model" => "formData.ShippingMethod", "choices" => ["Dropship by 3PL", "Central Fulfillment"]]) ?>

                            <div ng-template="common/input/text2" ng-template-options="{
					'label': 'Preparation Time',
					'labelClass': 'required',
					'error' : {
					'messages': {
					'required': 'This is a required field',
					'pattern': 'Only numbers allowed'
					},
					'show': $root.isInvalid(addProductForm.PrepareDay),
					'conditions' : addProductForm.PrepareDay.$error
					},
					'unit': 'Day'
					}">
                                <input class="form-control width-field-normal" name="PrepareDay" ng-pattern="/^[0-9]+$/" ng-required="onPublishing" maxlength="5" ng-model="formData.PrepareDay" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.PrepareDay) }" />
                            </div>

                            <div class="form-group">
                                <div class="width-label">
                                    <label class="control-label required" stytle="margin-top:25px">Package Dimension</label>
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
									'show': $root.isInvalid(addProductForm.MasterVariant_Length),
									'conditions' : addProductForm.MasterVariant_Length.$error
									}
									}">
                                                <input class="form-control" name="MasterVariant_Length" ng-pattern="/^\d+(\.\d{1,2})?$/" maxlength="11" ng-required="onPublishing" ng-model="formData.MasterVariant.Length" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_Length) }"
                                                />
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
									'show': $root.isInvalid(addProductForm.MasterVariant_Height),
									'conditions' : addProductForm.MasterVariant_Height.$error
									}
									}">
                                                <input class="form-control" name="MasterVariant_Height" ng-pattern="/^\d+(\.\d{1,2})?$/" maxlength="11" ng-required="onPublishing" ng-model="formData.MasterVariant.Height" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_Height) }"
                                                />
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
									'show': $root.isInvalid(addProductForm.MasterVariant_Width),
									'conditions' : addProductForm.MasterVariant_Width.$error
									}
									}">
                                                <input class="form-control" maxlength="11" name="MasterVariant_Width" ng-pattern="/^\d+(\.\d{1,2})?$/" ng-model="formData.MasterVariant.Width" ng-required="onPublishing" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_Width) }"
                                                />
                                            </div>
                                        </div>

                                        <div class="input-column no-label select input-xl" style="padding-top: 24px">
                                            <select ng-model="formData.MasterVariant.DimensionUnit" class="form-control">
                                                <option value="MM"> Millimeter </option>
                                                <option value="CM"> Centimeter </option>
                                                <option value="M"> Meter </option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                            </div>


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
                                        'show': $root.isInvalid(addProductForm.MasterVariant_Weight),
                                        'conditions' : addProductForm.MasterVariant_Weight.$error
                                        }
									}">
                                            <input type="text" name="MasterVariant_Weight" maxlength="11" ng-required="onPublishing" ng-class="{ 'has-error' : $root.isInvalid(addProductForm.MasterVariant_Weight) }" class="form-control" ng-pattern="/^\d+(\.\d{1,2})?$/" ng-model="formData.MasterVariant.Weight"
                                            />
                                        </div>

                                        <div class="input-column select input-xl">
                                            <div class="ah-select2-dropdown">
                                                <select class="form-control" ng-model="formData.MasterVariant.WeightUnit">
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
        </div>
        <div class="row">
            <div class="col-xs-12">
                <p class="text-align-right margin-bottom-30"><span class="color-red"><i class="fa fa-asterisk"></i></span> - Required Field</p>
            </div>
        </div>
</div>