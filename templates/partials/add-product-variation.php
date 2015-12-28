<div id="add-product-variation-tab-content">
	<? $this->insert('partials/add-product-inner-tab-breadcrumb') ?>

	<div class="row">
		<div class="col-xs-12">
			<div class="form-section">
				<div class="form-section-header"><h2>Variation Option</h2></div>
				<div class="form-section-content">
					<div class="form-group">
						<div class="width-label">
							<select class="form-control">
								<option value="">Material</option>
							</select>
						</div>
						<div class="width-field-normal">
							<select class="form-control select2-init" multiple="multiple">
								<option selected value="Wood">Wood</option>
								<option value="Plastic">Plastic</option>
								<option value="Steel">Steel</option>
								<option value="Fiber">Fiber</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<div class="width-label">
							<select class="form-control">
								<option value="">Capacity</option>
							</select>
						</div>
						<div class="width-field-normal">
							<div class="input-with-unit">
								<select class="form-control select2-init" multiple="multiple" data-tags="true">
									<option selected value="10000">10000</option>
									<option selected value="20000">20000</option>
								</select>
								<span class="input-unit">mAh</span>
							</div>
						</div>
					</div>
					<? $this->insert('components/forms/dropdown-with-label', ["label" => "Default Variant", "options" => ["Wood, 10000 mAh", "Wood, 20000 mAh"]]) ?>
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
								<th class="column-pid"><span>PID</span> <i class="fa fa-2x fa-question-circle color-grey"></i></th>
								<th class="column-detail text-center">Detail</th>
								<th class="column-visibility">Visibility</th>
							</tr>
						</thead>
						<tbody>
							<? foreach(["Wood, 10000 mAh", "Plastic, 10000 mAh", "Wood, 12000 mAh", "Plastic, 12000 mAh"] as $item): ?>
								<tr>
									<td class="column-text-ellipsis"><?= $item?></td>
									<td><input type="text" class="form-control" /></td>
									<td><input type="text" class="form-control" /></td>
									<td><input type="text" class="form-control" /></td>
									<td><input type="text" class="form-control" /></td>
									<td><input type="text" class="form-control" /></td>
									<td><a class="btn btn-white btn-width-xl" data-toggle="modal" data-target="#variant-detail-1">More Detail</a></td>
									<td><a class="btn btn-white">Hide</a></td>
								</tr>
							<? endforeach ?>
						</tbody>
					</table>
				</div>
			</div> <!-- end .form-section -->
		</div> <!-- end .col-xs-12 -->
	</div> <!-- end .row -->
</div> <!-- end #add-product-variation-tab-content -->

<? $this->insert('components/modal-product-variant-detail', ["id" => "variant-detail-1", "header" => "Variant Detail"]) ?>