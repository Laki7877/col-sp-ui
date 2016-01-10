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
					<div class="form-group" ng-repeat="jth in [0,1]">
						<div class="width-label">
							<select class="form-control"
								ng-options="i as i.Attribute.AttributeNameEn for i in formData.AttributeSet.AttributeSetMaps track by i.$id"
						       		ng-model="attributeOptions[jth].attribute">
							</select>
						</div>
						<div class="width-field-normal">
							<div class="input-with-unit">
								<select ng-model="attributeOptions[jth].options" 
									class="form-control select2-init-{{jth}} select2-track" 
									multiple="multiple">
									<option ng-repeat="i in attributeOptions[jth].attribute.Attribute.AttributeValueMaps">
										{{ i.AttributeValue.AttributeValueEn }}
									</option>
								</select>
								<span class="input-unit">
									{{ attributeOptions[jth].attribute.unit }}
								</span>
							</div>
						</div>
					</div>
	
	<div class="form-group">
	<div class="width-label"><label class="control-label">Default Variant</label></div>
	<div class="width-field-normal">
		<div class="ah-select2-dropdown">
			<select ng-model="formData.DefaultVariant" class="form-control select2-init-track select2-init-simple" 
				ng-options="i as i.text for i in formData.Variants">
			</select>
		</div>
	</div></div>

			</div>
			</div> <!-- end .form-section -->
			<div class="form-section" ng-if="formData.AttributeSet && formData.Variants.length > 0">
				<div class="form-section-header">Variant</div>
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
									<td class="column-text-ellipsis"> {{ pair.text}}</td>
									<td><input type="text" class="form-control" 
										ng-model="pair.Sku" /></td>
									<td><input type="text" 
										ng-model="pair.OriginalPrice"
										class="form-control" /></td>
									<td><input type="text"
										ng-model="pair.SalePrice"
								       		class="form-control" /></td>
									<td><input type="text" ng-model="pair.Quantity"
										class="form-control" /></td>
									<td><a class="btn btn-white btn-width-xl" data-toggle="modal" data-target="#variant-detail-1" ng-click="$emit('openPairModal', pair, formData.Variants, $index)">More Detail</a></td>
									<td><a class="btn btn-white disabled">Hide</a></td>
								</tr>
						</tbody>
					</table>
				</div>
			</div> <!-- end .form-section -->
		</div> <!-- end .col-xs-12 -->
	</div> <!-- end .row -->
</div> <!-- end #add-product-variation-tab-content -->

<? $this->insert('components/modal-product-variant-detail', ["id" => "variant-detail-1", "model" => "pairModal"]) ?>
