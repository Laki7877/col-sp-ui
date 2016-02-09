<div id="add-product-variation-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Variation Option</h2></div>
				<div class="form-section-content padding-left-30" ng-if="(formData.AttributeSet && !formData.AttributeSet['AttributeSetId']) || enableProductVariations != 'enable'">
					To enable variation option, please select an <strong>Attribute Set</strong> and enable <strong>Product Variation</strong> in the information tab.
				</div>

				<!-- ng-if too long -->
				<div class="form-section-content" ng-if="!(formData.AttributeSet && !formData.AttributeSet['AttributeSetId']) && enableProductVariations == 'enable'">
					<div class="form-group" ng-repeat="jth in variationFactorIndices.iterator" ng-show="(attributeOptions[0].options.length > 0) || (jth == 0)">
						<div class="width-label">
							<select class="form-control"
								ng-options="i as i.Attribute.AttributeNameEn
								for i in formData.AttributeSet.AttributeSetMaps |
								truth: 'Attribute.VariantStatus' |
								exclude: attributeOptions[1 - jth].Attribute : 'AttributeId'
								track by i.Attribute.AttributeId"
								ng-model="attributeOptions[jth]">
								<option value="" disabled selected>Select an option..</option>
							</select>
						</div>
						<div class="width-field-large">
							<!--<div class="input-with-unit">-->
								
								<ui-select ng-if="_isListInput(attributeOptions[jth].Attribute.DataType)"
								multiple ng-model="attributeOptions[jth].options">
								<ui-select-match placeholder="Select variation options">
								{{ $item.AttributeValue.AttributeValueEn || $item }}
								</ui-select-match>
								<ui-select-choices repeat="i in attributeOptions[jth].Attribute.AttributeValueMaps | filter:$select.search">
								{{ i.AttributeValue.AttributeValueEn || i }}
								</ui-select-choices>
								</ui-select>
							
								<ui-select ng-if="_isFreeTextInput(attributeOptions[jth].Attribute.DataType)"
								multiple tagging tagging-label=""
							        tagging-tokens=",|ENTER" 	 
								on-select="onVariationOptionFreeTextAdded($item, $model, jth)" 
								ng-model="attributeOptions[jth].options">
								<ui-select-match placeholder="Variation options separated by a comma (or enter)">
								{{ $item.AttributeValue.AttributeValueEn || $item }}
								</ui-select-match>
								<ui-select-choices repeat="i in attributeOptions[jth].Attribute.AttributeValueMaps | filter:$select.search">
								{{ i.AttributeValue.AttributeValueEn || i }}
								</ui-select-choices>
								</ui-select>

					<!--			<span class="input-unit">
									{{ attributeOptions[jth].Attribute.unit }}
								</span>
							</div>-->
						</div>
						<a class="like-text form-text" ng-click="variationFactorIndices.pushSecond()" ng-if="attributeOptions[0].options.length > 0 && variationFactorIndices.length() == 1">
							<i class="fa fa-plus-circle color-theme"></i> Add another option
						</a>
						<a class="like-text form-text" ng-click="variationFactorIndices.popSecond()" ng-if="attributeOptions[1].options.length > 0 && variationFactorIndices.length() == 2 && jth == 1">
								<i class="fa fa-trash color-theme"></i>
						</a>
						<div class="width-field-large">
							<span class="help-block color-red" ng-repeat="msg in (variationOptionWarning[jth]) track by $index"> 
								<span>{{ msg }}</span>
							</span>
						</div>
					</div>

					<div class="form-group" ng-show="formData.Variants.length > 0">
						<div class="width-label"><label class="control-label">Default Variant</label></div>
						<div class="width-field-normal">
							<div class="ah-select2-dropdown">
								<select ng-model="formData.DefaultVariant" class="form-control"
									ng-options="i as i.text for i in formData.Variants track by i.text" required>
								</select>
							</div>
						</div>
					</div>

				</div>
			</div> <!-- end .form-section -->
			<div class="form-section" ng-if="formData.AttributeSet && formData.Variants.length > 0" ng-show="enableProductVariations == 'enable'">
				<div class="form-section-header">Variant ({{ formData.Variants.length }})</div>
				<div class="form-section-content padding-left-30 padding-right-30">
					<table class="table ah-table variation-table">
						<thead>
							<tr>
								<th class="column-variant">Variant</th>
								<th class="column-sku">SKU</th>
								<th class="column-price">Price</th>
								<th class="column-sale-price">Sale Price</th>
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

                            <td ng-template="common/input/text-td"
                                    ng-template-options="{
                                        'error' : {
                                            'messages': {
                                                'pattern': 'Only english letters and numbers allowed'
                                            },
                                            'show': $root.isInvalid(addProductForm['pair_Sku' + $index]),
                                            'conditions' : addProductForm['pair_Sku' + $index].$error
                                        }
                                    }">
                                    <input 
                                    type="text" ng-disabled='!pair.Visibility' class="form-control"
                                    name="pair_Sku{{ $index }}"
                                    maxlength="300"
                                    ng-pattern="/^[0-9A-Za-z]+$/"
                                    ng-class="{ 'opacity-50': !pair.Visibility, 'has-error': $root.isInvalid(addProductForm.pair_Sku{{$index}}) }"
                                    ng-model="pair.Sku" />
                           </td>

							<td ng-template="common/input/text-td"
                                    ng-template-options="{
                                        'error' : {
                                            'messages': {
                                                'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
                                            },
                                            'show': $root.isInvalid(addProductForm['pair_OriginalPrice' + $index]),
                                            'conditions' : addProductForm['pair_OriginalPrice' + $index].$error
                                        }
                                    }">
                                <input type="text"
								ng-class="{ 'opacity-50': !pair.Visibility, 'has-error': $root.isInvalid(addProductForm.pair_OriginalPrice{{$index}}) }"
								name="pair_OriginalPrice{{$index}}"
								ng-pattern="/^\d+(\.\d{1,2})?$/"
								ng-model="pair.OriginalPrice" ng-disabled='!pair.Visibility'
								class="form-control" />
                                
                            </td>
                                
							<td ng-template="common/input/text-td"
                                    ng-template-options="{
                                        'error' : {
                                            'messages': {
                                                'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
                                            },
                                            'show': $root.isInvalid(addProductForm['pair_SalePrice' + $index]),
                                            'conditions' : addProductForm['pair_SalePrice' + $index].$error
                                        }
                                    }">
                                <input type="text"
								ng-class="{ 'opacity-50': !pair.Visibility, 'has-error': $root.isInvalid(addProductForm.pair_SalePrice{{$index}}) }"
								ng-model="pair.SalePrice" name="pair_SalePrice{{ $index }}" ng-disabled='!pair.Visibility'
								ng-pattern="/^\d+(\.\d{1,2})?$/"
								class="form-control" />
                           </td>
                                
                                
							<td ng-template="common/input/text-td"
                                    ng-template-options="{
                                        'error' : {
                                            'messages': {
                                                'pattern': 'Only numbers allowed'
                                            },
                                            'show': $root.isInvalid(addProductForm['pair_Quantity' + $index]),
                                            'conditions' : addProductForm['pair_Quantity' + $index].$error
                                        }
                                    }">
                                <input type="text" ng-model="pair.Quantity"
								maxlength="5"
								ng-class="{ 'opacity-50': !pair.Visibility, 'has-error': $root.isInvalid(addProductForm.pair_Quantity{{$index}}) }"
								ng-disabled='!pair.Visibility' ng-pattern="/^[0-9]+$/"
								name="pair_Quantity{{$index}}"
								class="form-control" />
                            </td>
                            
							<td><a class="btn btn-white btn-width-xl" ng-disabled='!pair.Visibility'
									data-toggle="modal" data-target="#variant-detail-1"
									ng-click="$emit('openPairModal', pair, formData.Variants, $index)">More Detail</a></td>
							<td><a class="btn btn-white" ng-click='pair.Visibility = !pair.Visibility'>
									<span ng-if='pair.Visibility'>Hide</span>
									<span ng-if='!pair.Visibility'>Show</span>
							</a></td>
						</tr>
						</tbody>
					</table>
				</div>
			</div> <!-- end .form-section -->
		</div> <!-- end .col-xs-12 -->
	</div> <!-- end .row -->
</div> <!-- end #add-product-variation-tab-content -->

<? $this->insert('components/modal-product-variant-detail', ["id" => "variant-detail-1", "model" => "pairModal"]) ?>
