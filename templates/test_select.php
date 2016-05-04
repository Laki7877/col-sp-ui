<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>
<?php $this->start('page-body') ?>
<!-- {{treeSelectModel}}
<div ng-controller="TestCtrl">
	<pre>{{datatype.model | json}}</pre>
	<ui-select ng-model="datatype.model">
		<ui-select-match placeholder="test">{{$select.selected}}</ui-select-match>
		<ui-select-choices repeat="i.value as i in dataTypeOptions">{{i}}</ui-select-choices>
	</ui-select>
</div> -->
<div class="ah-form">
	<div class="form-section">
		<div class="form-section-content no-margin padding-left-15 padding-right-15" style="margin-top:15px;">
			<div nc-template="common/input/form-group-with-label" nc-label="Banner Status">
				<select ng-model="source" class="form-control" ng-options="o.v as o.n for o in [{v: false, n: 'Disable'}, {v: true, n: 'Enable'}]" ng-cloak></select>
			</div>
		</div>
	</div>

	<div class="form-section">
		<div class="form-section-content">
			<div nc-template="common/input/form-group-with-label" nc-template-form="form.StockType"
			nc-template-options-path="addProductForm/StockType"
			nc-label="Stock Type">
					<select ng-model="variantPtr.StockType" class="form-control" name="StockType" ng-cloak ng-click="$event.stopPropagation()">
							<option selected value="-" disabled>- Select Stock Type -</option>
							<option value="Stock">Stock</option>
							<option value="Pre-Order">Pre-Order</option>
					</select>
			</div>

			<div nc-template="common/input/form-group-with-label" nc-template-form="form.IsHasExpiryDate"
			nc-template-options-path="addProductForm/StockType" nc-policy-indy-bu
			nc-label="Has Expiry Date">
					<select ng-model="variantPtr.IsHasExpiryDate" class="form-control" name="IsHasExpiryDate">
							<option value="N">No</option>
							<option value="Y">Yes</option>
					</select>
			</div>
		</div>
	</div>

</div>

<?php $this->stop() ?>
