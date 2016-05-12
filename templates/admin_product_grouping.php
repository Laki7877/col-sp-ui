<?php
	$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Pending Products'])
?>
<?php $this->start('page-body') ?>
<div ng-controller="AdminPendingProductGroupAddCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
    <nc-alert nc-model="alert"></nc-alert>
	<nc-page-title nc-title="Pending Products/Create Group Variant" link="/products/groups" icon="fa-tag">
	<div class="page-actions float-right">
		<button class="btn btn-white btn-width-xl">Cancel</button>
		<button class="btn btn-blue btn-width-xl" ng-click="create()">Create</button>
	</div>
	</nc-page-title>
	<form name="form" style="margin-top:30px" class="ah-form sticky-mainform-action" novalidate>
		<div ng-include="'pending_products/section-group-information'"></div>
		<ap-variation-option form-data="formData" ng-show="formData.AttributeSet"
			generator="variationFactorIndices" dataset="dataset">
		</ap-variation-option>
		<ap-multiplied-variants ng-show="formData.Variants.length > 0" >
			<div ng-include="'ap/section-variant-table-b'"></div>
		</ap-multiplied-variants>
	</form>
</div>
<?php $this->stop() ?>
