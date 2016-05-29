<?php
	$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product Grouping'])
?>
<?php $this->start('page-body') ?>
<div ng-controller="SellerProductGroupAddCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
  <nc-alert nc-model="alert"></nc-alert>
	<nc-page-title nc-title="Product Grouping" link="/products/groups" icon="fa-tag">
	<div class="page-actions float-right" ng-show="!loading">
		<button class="btn btn-blue btn-width-xxl" ng-click="create()">Create Group</button>
	</div>
	</nc-page-title>
	<div ng-show="loading" nc-loading="Saving data.."></div>
	<form name="form" ng-show="!loading" style="margin-top:30px" class="ah-form sticky-mainform-action" novalidate>
		<div ng-include="'product_group/section-group-information'"></div>
		<ap-variation-option form-data="formData" ng-show="formData.AttributeSet"
			generator="variationFactorIndices" dataset="dataset">
		</ap-variation-option>
		<ap-multiplied-variants ng-show="formData.Variants.length > 0" >
			<div ng-include="'ap/section-variant-table-b'"></div>
		</ap-multiplied-variants>
	</form>
</div>
<?php $this->stop() ?>
