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
         <div nc-template="pending_products/section-group-information"></div>
	</form>
</div>
<?php $this->stop() ?>