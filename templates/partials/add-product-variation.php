<div id="add-product-variation-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Variation Option</h2></div>
				<div class="form-section-content padding-left-30" ng-if="!formData.AttributeSet">
					Please first select an attribute set from Information tab
				</div>

				<div class="form-section-content" ng-if="formData.AttributeSet">
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
						<div class="width-field-xl">
							<div class="input-with-unit">
								<ui-select ng-if="_isListInput(attributeOptions[jth].Attribute.DataType)" 
								multiple ng-model="attributeOptions[jth].options">
									<ui-select-match>
										{{ $item.AttributeValue.AttributeValueEn || $item }}	
									</ui-select-match>
									<ui-select-choices repeat="i in attributeOptions[jth].Attribute.AttributeValueMaps | filter:$select.search">
									    {{ i.AttributeValue.AttributeValueEn || i }}
									</ui-select-choices>
								</ui-select>
								<ui-select ng-if="_isFreeTextInput(attributeOptions[jth].Attribute.DataType)" 
								multiple tagging tagging-label="" ng-model="attributeOptions[jth].options">
									<ui-select-match>
										{{ $item.AttributeValue.AttributeValueEn || $item }}	
									</ui-select-match>
									<ui-select-choices repeat="i in attributeOptions[jth].Attribute.AttributeValueMaps | filter:$select.search">
									    {{ i.AttributeValue.AttributeValueEn || i }}
									</ui-select-choices>
								</ui-select>
				
								<span class="input-unit">
									{{ attributeOptions[jth].Attribute.unit }}
								</span>
							</div>
						</div>
						<div class="width-field-normal" ng-if="attributeOptions[0].options.length > 0 && variationFactorIndices.length() == 1">
							<a class="like-text form-text" ng-click="variationFactorIndices.pushSecond()">
								<i class="fa fa-plus-circle color-theme"></i> Add another option
							</a>
						</div>
						<div class="width-field-normal" ng-if="attributeOptions[1].options.length > 0 && variationFactorIndices.length() == 2 && jth == 1">
							<a class="like-text form-text" ng-click="variationFactorIndices.popSecond()">
								<i class="fa fa-trash"></i>
							</a>
						</div>
					</div>
	
	<div class="form-group" ng-show="formData.Variants.length > 0">
		<div class="width-label"><label class="control-label">Default Variant</label></div>
		<div class="width-field-normal">
		<div class="ah-select2-dropdown">
			<select ng-model="formData.DefaultVariant" class="form-control" 
				ng-options="i as i.text for i in formData.Variants">
			</select>
		</div>
		</div>
	</div>

			</div>
			</div> <!-- end .form-section -->
			<div class="form-section" ng-if="formData.AttributeSet && formData.Variants.length > 0">
				<div class="form-section-header">Variant ({{ formData.Variants.length }})</div>
				<div class="form-section-content padding-left-30 padding-right-30">
					<table class="table ah-table variation-table">
						<thead>
							<tr>
								<th class="column-variant">Variant</th>
								<th class="column-sku"><span class="required">SKU</span></th>
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
										{{ pair.text}}
									</td>
									<td><input ng-class="{'opacity-50': !pair.Visibility}"
									 type="text" ng-disabled='!pair.Visibility' class="form-control" 
										ng-model="pair.Sku" /></td>
									<td><input type="text" 
										ng-class="{'opacity-50': !pair.Visibility}"
										ng-model="pair.OriginalPrice" ng-disabled='!pair.Visibility'
										class="form-control" /></td>
									<td><input type="text"
										ng-class="{'opacity-50': !pair.Visibility}"
										ng-model="pair.SalePrice" ng-disabled='!pair.Visibility'
								       		class="form-control" /></td>
									<td><input type="text" ng-model="pair.Quantity" 
										ng-class="{'opacity-50': !pair.Visibility}"
										ng-disabled='!pair.Visibility'
										class="form-control" /></td>
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
