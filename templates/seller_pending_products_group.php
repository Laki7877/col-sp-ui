<?php
	$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Product'])
?>
<?php $this->start('page-body') ?>
<div ng-controller="SellerPendingProductsGroupCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
	<nc-page-title nc-title="Pending Products/Create Group Variant" link="/products/pending">
	<div class="page-actions float-right">
		<button class="btn btn-white btn-width-xl">Cancel</button>
		<button class="btn btn-blue btn-width-xl" ng-click="create()">Create</button>
	</div>
	</nc-page-title>

	<form name="form" style="margin-top:30px" class="ah-form sticky-mainform-action" novalidate>
         <div ng-include="'pending_products/section-group-information'"></div>

         <ap-variation-option ng-show="groupInfoSelected" form-data="formData"
            generator="variationFactorIndices" dataset="dataset">
         </ap-variation-option>

         <div ng-show="groupInfoSelected && formData.Variants.length > 0"
					 ng-include="'ap/section-variant'"></div>
	</form>
</div>
<?php $this->stop() ?>
