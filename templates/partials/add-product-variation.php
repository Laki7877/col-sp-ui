<div id="add-product-variation-tab-content">
    <? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>


        <div class="row" ng-if="controlFlags.variation != 'enable'">
            <div class="col-xs-12">
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Variation Option</h2></div>
                    <div class="form-section-content">
                        <div class="form-group ">
                            <p class="form-control-static">
                                Variation will allow you to create a group of products with different attributes such as size and color. Once you enable variation, information from other tabs will be copied into variants that you will create, and variation cannot be disabled.
                                <strong>Please select attribute set before enabling variation.</strong>
                            </p>
                            <button class="btn btn-width-xxl btn-blue margin-top-20" ng-disabled="!formData.AttributeSet.AttributeSetId" ng-click="enableVariation()">Enable Variation</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" ng-show="controlFlags.variation == 'enable'">
            <div class="col-xs-12">
                <div class="form-section">
                    <div class="form-section-header">
                        <h2>Variation Option</h2></div>

                    <!-- ng-if too long -->
                    <div class="form-section-content" ng-if="!(formData.AttributeSet && !formData.AttributeSet['AttributeSetId']) && controlFlags.variation == 'enable'">
                        <div class="form-group" ng-repeat="jth in variationFactorIndices.iterator" ng-show="(dataSet.attributeOptions[0].options.length > 0) || (jth == 0)">
                            <div class="width-label">
                                <select class="form-control" ng-options="i as i.Attribute.AttributeNameEn
								for i in formData.AttributeSet.AttributeSetMaps |
								truth: 'Attribute.VariantStatus' |
								exclude: dataSet.attributeOptions[1 - jth].Attribute : 'AttributeId'
								track by i.Attribute.AttributeId" ng-model="dataSet.attributeOptions[jth]">
                                    <option value="" disabled selected>Select an option..</option>
                                </select>
                            </div>

                            <div ng-template="common/input/width-field-large" ng-template-options="{
                                    'error' : {
                                        'messages': {
                                            'maxtagcount': 'Cannot exceed 20 tags',
                                            'maxtaglength': 'Tag must contain 30 characters or less',
                                            'pattern': 'Only letters and numbers allowed'
                                        },
                                        'show': true,
                                        'conditions' :  addProductForm['attributeOptions' + jth].$error
                                    }
                                    }">

                                <ui-select ng-if="isListInput(dataSet.attributeOptions[jth].Attribute.DataType)" multiple ng-model="dataSet.attributeOptions[jth].options">
                                    <ui-select-match placeholder="Select variant">
                                        {{ $item.AttributeValue.AttributeValueEn }}
                                    </ui-select-match>
                                    <ui-select-choices repeat="i in (dataSet.attributeOptions[jth].Attribute.AttributeValueMaps | exclude: dataSet.attributeOptions[jth].options : 'AttributeValue.AttributeValueId' ) | filter:$select.search track by i.AttributeValue.AttributeValueId">
                                        {{ i.AttributeValue.AttributeValueEn }}
                                    </ui-select-choices>
                                </ui-select>

                                <ui-select ng-if="isFreeTextInput(dataSet.attributeOptions[jth].Attribute.DataType)" multiple tagging tagging-label="" tagging-tokens=",|ENTER" name="attributeOptions{{jth}}" nc-tag-validator nc-max-tag-count="20" nc-max-tag-length="30" nc-tag-pattern="^[a-zA-Z0-9ก-๙\s\-]+$"
                                ng-model="dataSet.attributeOptions[jth].options">
                                    <ui-select-match placeholder="Input variant">
                                        {{ $item }}
                                    </ui-select-match>
                                    <ui-select-choices repeat="i in (dataSet.attributeOptions[jth].Attribute.AttributeValueMaps) | filter:$select.search track by i.AttributeValue.AttributeValueId">
                                        {{ i }}
                                    </ui-select-choices>
                                </ui-select>

                                <input ng-if="!dataSet.attributeOptions[jth].Attribute.DataType" type="text" disabled class="form-control" />


                            </div>
                            <!--</div>-->

                            <a class="like-text form-text" ng-click="variationFactorIndices.pushSecond()" ng-if="dataSet.attributeOptions[0].options.length > 0 && variationFactorIndices.length() == 1">
                                <i class="fa fa-plus-circle color-theme"></i> Add another option
                            </a>
                            <a class="like-text form-text" ng-click="variationFactorIndices.popSecond()" ng-if="variationFactorIndices.length() == 2 && jth == 1">
                                <i class="fa fa-trash color-theme icon-size-20"></i>
                            </a>
                        </div>

                        <div class="form-group" ng-show="formData.Variants.length > 0">
                            <div class="width-label">
                                <label class="control-label">Default Variant</label>
                            </div>
                            <div class="width-field-normal">
                                <div class="ah-select2-dropdown">
                                    <select ng-model="formData.DefaultVariant" class="form-control" ng-options="i as i.text for i in formData.Variants track by i.text" required>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- end .form-section -->
                <div class="form-section" ng-if="formData.AttributeSet && formData.Variants.length > 0" ng-show="controlFlags.variation == 'enable'">
                    <div class="form-section-header">Variant ({{ formData.Variants.length }})</div>
                    <div class="form-section-content padding-left-30 padding-right-30">
                        <table class="table ah-table variation-table">
                            <thead>
                                <tr>
                                    <th class="column-variant">Variant</th>
                                    <th ng-if="formData.Variants.length > 0 && formData.Variants[0].Pid">PID</th>
                                    <th class="column-sku">SKU</th>

                                    <th class="column-sale-price">
                                        <label class="required">Sale Price</label>
                                    </th>
                                    <th class="column-price">Original Price</th>

                                    <th class="column-inventory">Inventory</th>
                                    <th class="column-detail text-center">Detail</th>
                                    <th class="column-visibility">Visibility</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="pair in formData.Variants track by $index">
                                    <td class="column-text-ellipsis" ng-class="{'opacity-50': !pair.Visibility}">
                                        {{ pair.text }}
                                    </td>
                                    <td ng-if="formData.Variants.length > 0 && formData.Variants[0].Pid">{{pair.Pid }}</td>
                                    <td ng-template="common/input/text-td" ng-template-options="{
                                        'error' : {
                                            'messages': {
                                                'pattern': 'Special characters are not allowed'
                                            },
                                            'show': $root.isInvalid(addProductForm['pair_Sku' + $index]),
                                            'conditions' : addProductForm['pair_Sku' + $index].$error
                                        }
                                    }">
                                        <input type="text" ng-disabled='!pair.Visibility' class="form-control" name="pair_Sku{{ $index }}" maxlength="300" ng-pattern="/^[^<>]+$/" ng-class="{ 'opacity-50': !pair.Visibility, 'has-error': $root.isInvalid(addProductForm.pair_Sku{{$index}}) }" ng-model="pair.Sku"
                                        />
                                    </td>

                                    <td ng-template="common/input/text-td" ng-template-options="{
                                        'error' : {
                                            'messages': {
                                                'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
                                            },
                                            'show': $root.isInvalid(addProductForm['pair_SalePrice' + $index]),
                                            'conditions' : addProductForm['pair_SalePrice' + $index].$error
                                        }
                                    }">
                                        <input type="text" ng-class="{ 'opacity-50': !pair.Visibility, 'has-error': $root.isInvalid(addProductForm.pair_SalePrice{{$index}}) }" ng-model="pair.SalePrice" name="pair_SalePrice{{ $index }}" ng-disabled='!pair.Visibility' ng-pattern="/^\d+(\.\d{1,2})?$/"
                                        class="form-control" />
                                    </td>

                                    <td ng-template="common/input/text-td" ng-template-options="{
						                                         'error' : {
						                                             'messages': {
						                                                 'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
						                                             },
						                                             'show': $root.isInvalid(addProductForm['pair_OriginalPrice' + $index]),
						                                             'conditions' : addProductForm['pair_OriginalPrice' + $index].$error
						                                         }
						                                     }">
                                        <input type="text" ng-class="{ 'opacity-50': !pair.Visibility, 'has-error': $root.isInvalid(addProductForm.pair_OriginalPrice{{$index}}) }" name="pair_OriginalPrice{{$index}}" ng-pattern="/^\d+(\.\d{1,2})?$/" ng-model="pair.OriginalPrice" ng-disabled='!pair.Visibility'
                                        class="form-control" />

                                    </td>


                                    <td ng-template="common/input/text-td" ng-template-options="{
                                        'error' : {
                                            'messages': {
                                                'pattern': 'Only numbers allowed'
                                            },
                                            'show': $root.isInvalid(addProductForm['pair_Quantity' + $index]),
                                            'conditions' : addProductForm['pair_Quantity' + $index].$error
                                        }
                                    }">
                                        <input type="text" ng-model="pair.Quantity" maxlength="5" ng-class="{ 'opacity-50': !pair.Visibility, 'has-error': $root.isInvalid(addProductForm.pair_Quantity{{$index}}) }" ng-disabled='!pair.Visibility' ng-pattern="/^[0-9]+$/" name="pair_Quantity{{$index}}"
                                        class="form-control" />
                                    </td>

                                    <td><a class="btn btn-white btn-width-xl" ng-disabled='!pair.Visibility' data-toggle="modal" data-target="#variant-detail-1" ng-click="$emit('openPairModal', pair, formData.Variants, $index)">More Detail</a></td>
                                    <td>
                                        <a class="btn btn-white" ng-click='pair.Visibility = !pair.Visibility'>
                                            <span ng-if='pair.Visibility'>Hide</span>
                                            <span ng-if='!pair.Visibility'>Show</span>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- end .form-section -->
            </div>
            <!-- end .col-xs-12 -->
        </div>
        <!-- end .row -->
</div>
<!-- end #add-product-variation-tab-content -->