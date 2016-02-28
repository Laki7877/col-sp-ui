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
                                            <i ng-class="{'fa fa-eye-slash color-grey eye-icon font-size-16' : !overview.Visibility, 'fa fa-eye color-dark-grey eye-icon font-size-16' : overview.Visibility}"></i>
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

                        <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.MasterVariant_ProductNameEn" nc-label="Product Name (English)" nc-template-options-path="addProductForm/MasterVariant_ProductNameEn">
                            <input class="form-control width-field-large" name="MasterVariant_ProductNameEn" ng-model="formData.MasterVariant.ProductNameEn" maxlength="300" ng-pattern="/^([^<>ก-๙])+$/" required />
                        </div>

                        <div nc-template="common/input/form-group-with-label" nc-label="Product Name (ไทย)" nc-template-form="addProductForm.MasterVariant_ProductNameTh" nc-template-options-path="addProductForm/MasterVariant_ProductNameTh">
                            <input class="form-control width-field-large" name="MasterVariant_ProductNameTh" ng-model="formData.MasterVariant.ProductNameTh" ng-pattern="/^[^<>]+$/" maxlength="300" required />
                        </div>

                        <div nc-template="common/input/form-group-with-label" nc-label="SKU" nc-template-form="addProductForm.MasterVariant_Sku" nc-template-options-path="addProductForm/MasterVariant_Sku">

                            <input class="form-control width-field-large" name="MasterVariant_Sku" ng-model="formData.MasterVariant.Sku" maxlength="300" ng-pattern="/^[^<>]+$/" />


                        </div>


                        <div nc-template="common/input/form-group-with-label" nc-label="UPC" nc-template-form="addProductForm.MasterVariant_Upc" nc-template-options-path="addProductForm/MasterVariant_Upc">
                            <input class="form-control width-field-large" ng-pattern="/^[^<>]+$/" name="MasterVariant_Upc" maxlength="300" ng-model="formData.MasterVariant.Upc" />
                        </div>

                        <div ng-if="formData.MasterVariant.Pid">
                            <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.MasterVariant_Pid" nc-label="{{ (formData.Variants || []).length > 0 ? 'Group ID' : 'PID' }}" nc-template-options-path="addProductForm/MasterVariant_Pid">
                                <input class="form-control width-field-large" name="MasterVariant_Pid" disabled ng-model="formData.MasterVariant.Pid" />
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="width-label">
                                <label class="control-label required">Brand Name</label>
                            </div>
                            <div class="width-field-normal">
                                <div class="ah-select2-dropdown">
                                    <ui-select ng-model="formData.Brand">
                                        <ui-select-match placeholder="Search Brand...">
                                            <span ng-bind="$select.selected.BrandNameEn"></span>
                                            <span ng-show="!$select.selected.BrandNameEn">- Select Brand -</span>
                                        </ui-select-match>
                                        <ui-select-choices ui-disable-choice="item.disabled" refresh-delay="500" refresh="refreshBrands($select.search)" repeat="item in (dataSet.Brands)  | filter : $select.search  track by item.BrandId">
                                            <span>{{ item.BrandNameEn }} </span>
                                            <span ng-if="item.BrandNameTh">/ {{ item.BrandNameTh }}</span>
                                        </ui-select-choices>
                                    </ui-select>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Price</h2></div>
                    <div class="form-section-content">
                        <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.MasterVariant_SalePrice" nc-label="Sale Price" nc-template-options-path="addProductForm/MasterVariant_SalePrice">
                            <input ng-pattern="/^\d+(\.\d{1,2})?$/" class="form-control width-field-normal" maxlength="20" name="MasterVariant_SalePrice" ng-model="formData.MasterVariant.SalePrice" required/>
                        </div>
                        <div nc-template="common/input/form-group-with-label" nc-label="Original Price" nc-template-options-path="addProductForm/MasterVariant_OriginalPrice" nc-template-form="addProductForm.MasterVariant_OriginalPrice">
                            <input class="form-control width-field-normal" name="MasterVariant_OriginalPrice" ng-pattern="/^\d+(\.\d{1,2})?$/" maxlength="20" ng-model="formData.MasterVariant.OriginalPrice"/>
                        </div>
                    </div>
                </div>
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Description</h2></div>
                    <div class="form-section-content">

                        <? $this->insert('components/forms/ckeditor-with-label',
                            ["label" => "Description (English)", "ng_model" => "formData.MasterVariant.DescriptionFullEn", "size" => "xxl", "label_class" => "required"]) ?>

                            <div nc-template="common/input/form-group-with-label" nc-label="Short Description (English)" nc-template-options-path="addProductForm/MasterVariant_DescriptionShortEn" nc-template-form="addProductForm.MasterVariant_DescriptionShortEn">
                                <textarea ng-pattern="/^[^<>ก-๙]+$/" class="form-control" maxlength="500" name="MasterVariant_DescriptionShortEn" ng-model="formData.MasterVariant.DescriptionShortEn" />
                                </textarea>
                            </div>

                            <? $this->insert('components/forms/ckeditor-with-label', ["label" => "Description (ไทย)", "ng_model" => "formData.MasterVariant.DescriptionFullTh", "size" => "xxl", "form_group_class" => "margin-top-40","label_class" => "required"]) ?>

                                <div nc-template="common/input/form-group-with-label" nc-label="Short Description (ไทย)" nc-template-options-path="addProductForm/MasterVariant_DescriptionShortTh" nc-template-form="addProductForm.MasterVariant_DescriptionShortTh">
                                    <textarea ng-pattern="/^[^<>]+$/" class="form-control" maxlength="500" name="MasterVariant_DescriptionShortTh" ng-model="formData.MasterVariant.DescriptionShortTh" />
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

                                    <select ng-if="controlFlags.variation == 'enable'" class="form-control" disabled>
                                      <option disabled>{{ formData.AttributeSet.AttributeSetNameEn }}</option>
                                    </select>
                                    <!-- dont show if nothing is dataSet. to choose from -->
                                    <ui-select ng-if="controlFlags.variation != 'enable'" ng-model="formData.AttributeSet" ng-show="dataSet.AttributeSets.length > 0">
                                        <ui-select-match placeholder="Search Attribute Set">
                                            <span ng-bind="$select.selected.AttributeSetNameEn"></span>
                                            <span ng-show="!$select.selected.AttributeSetNameEn">- Select Attribute Set -</span>
                                        </ui-select-match>
                                        <ui-select-choices repeat="item in (dataSet.AttributeSets) | filter : $select.search track by item.AttributeSetId">
                                            <span ng-bind="item.AttributeSetNameEn"></span>
                                        </ui-select-choices>
                                    </ui-select>


                                    <!-- if nothing is availalbe to pick -->
                                    <select class="form-control" ng-if="dataSet.AttributeSets.length == 0 && controlFlags.variation == 'enable'" disabled>
                                        <option disabled>This category has no attribute sets</option>
                                    </select>

                                </div>


                            </div>
                            <a class="like-text form-text" ng-if="formData.AttributeSet.AttributeSetId" ng-click="formData.AttributeSet = {}">
                                <i class="fa fa-minus-circle color-theme"></i>
                            </a>
                        </div>

                        <!-- for each attribute in attribute set -->
                        <div class="form-group" ng-repeat="amap in formData.AttributeSet.AttributeSetMaps">
                            <div class="width-label">
                                <label class="control-label" ng-class="{'required': amap.Attribute.Required}">
                                    {{ amap.Attribute.AttributeNameEn }}
                                </label>
                            </div>
                            <div ng-class="{'width-field-normal': !isHtmlInput(amap.Attribute.DataType), 'width-field-xxl': isHtmlInput(amap.Attribute.DataType)}">

                                <select ng-if="isListInput(amap.Attribute.DataType)" ng-required="amap.Attribute.Required"
                                class="form-control" ng-model="formData.MasterAttribute[amap.Attribute.AttributeId]"
                                ng-class="{'has-error' : $root.isInvalid(addProductForm.AmapInput{{ $index }}) }"
                                name="AmapInput{{$index}}"
                                ng-options="item as item.AttributeValue.AttributeValueEn for item in amap.Attribute.AttributeValueMaps track by item.AttributeValueId">
                                    <option disabled value="" selected>- Select option -</option>
                                </select>

                                <div ng-if="isHtmlInput(amap.Attribute.DataType)">
                                    <textarea ng-required="amap.Attribute.Required"
                                    ng-class="{'has-error' : $root.isInvalid(addProductForm.AmapInput{{ $index }}) }"
                                    ng-model="formData.MasterAttribute[amap.Attribute.AttributeId]"
                                    name="AmapInput{{$index}}"
                                    class="form-control" ng-ckeditor="ckOptions"></textarea>
                                </div>

                                <input
                                ng-if="isFreeTextInput(amap.Attribute.DataType)"
                                ng-class="{'has-error' : $root.isInvalid(addProductForm.AmapInput{{ $index }}) }"
                                ng-required="amap.Attribute.Required"
                                type="text" class="form-control"
                                name="AmapInput{{$index}}"
                                ng-model="formData.MasterAttribute[amap.Attribute.AttributeId]" />

                            </div>
                        </div>


                    </div>
                </div>
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Keywords</h2></div>
                    <div class="form-section-content">

                        <div nc-template="common/input/form-group-with-label" nc-label="Keywords" nc-template-form="addProductForm.Keywords" nc-template-options-path="addProductForm/Keywords">
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

                        <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.MasterVariant_Quantity" nc-template-options-path="addProductForm/MasterVariant_Quantity" nc-label="Inventory Amount">
                            <input class="form-control" name="MasterVariant_Quantity" ng-pattern-restrict="^[0-9]*$" maxlength="10" ng-model="formData.MasterVariant.Quantity" />
                        </div>


                        <div nc-template="common/input/form-group-with-label" nc-template-form="addProductForm.MasterVariant_SafetyStock" nc-template-options-path="addProductForm/MasterVariant_SafetyStock" nc-label="Safety Stock Amount">
                            <input class="form-control" name="MasterVariant_SafetyStock" ng-pattern-restrict="^[0-9]*$" maxlength="10" ng-model="formData.MasterVariant.SafetyStock" />
                        </div>

                        <? $this->insert('components/forms/dropdown-with-label', ["label" => "Stock Type", "ng_model" => "formData.MasterVariant.StockType", "choices" => "dataSet.StockTypes", "options" => ["Stock", "Pre-Order"]]) ?>
                    </div>
                </div>
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Shipping Detail</h2></div>
                    <div class="form-section-content">
                        <? $this->insert('components/forms/multiple-radio-multiline', ["label" => "Shipping Method", "ng_model" => "formData.ShippingMethod", "choices" => ["Dropship by 3PL", "Central Fulfillment"]]) ?>

                            <div nc-template="common/input/form-group-with-label" nc-label="Preparation Time" nc-template-form="addProductForm.PrepareDay" nc-template-options-path="addProductForm/PrepareDay">
                                <input class="form-control width-field-normal" name="PrepareDay" ng-pattern-restrict="^[0-9]*$"
                                ng-required="onPublishing" maxlength="5" ng-model="formData.PrepareDay" />
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
