<div id="add-product-variation-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>
	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Variation Option</h2></div>
				<div class="form-section-content">
					<div class="form-group" ng-repeat="jth in [0,1]">
						<div class="width-label">
							<select class="form-control"
							ng-options="i as i.name 
							for i in available_attribute_options track by i.id"
						       	ng-model="attribute_options[jth].attribute">
							</select>
						</div>
						<div class="width-field-normal">
							<div class="input-with-unit">
								<select ng-options="i as i.Name for i in attribute_options[jth].attribute.available_options track by i.Id" ng-model="attribute_options[jth].options" class="form-control select2-init" multiple="multiple">
								</select>
								<span class="input-unit">
									{{ available_attribute_options[jth].unit }}
								</span>
							</div>
						</div>
					</div>
	
	<div class="form-group">
	<div class="width-label"><label class="control-label">Default Variant</label></div>
	<div class="width-field-normal">
		<div class="ah-select2-dropdown">
			<select ng-model="amd" class="form-control select2-init" 
			ng-options="i as i.text for i in variants track by i.hash">
			</select>
		</div>
	</div></div>

			</div>
			</div> <!-- end .form-section -->
			<div class="form-section">
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
								<tr ng-repeat="pair in variants">
									<td class="column-text-ellipsis"> {{ pair.text}}</td>
									<td><input type="text" class="form-control" /></td>
									<td><input type="text" class="form-control" /></td>
									<td><input type="text" class="form-control" /></td>
									<td><input type="text" class="form-control" /></td>
									<td><a class="btn btn-white btn-width-xl" data-toggle="modal" data-target="#variant-detail-1">More Detail</a></td>
									<td><a class="btn btn-white">Hide</a></td>
								</tr>
						</tbody>
					</table>
				</div>
			</div> <!-- end .form-section -->
		</div> <!-- end .col-xs-12 -->
	</div> <!-- end .row -->
</div> <!-- end #add-product-variation-tab-content -->

<? $this->insert('components/modal-product-variant-detail', ["uploader" => "uploaderModal", "images" => "imagesModal"]) ?>
