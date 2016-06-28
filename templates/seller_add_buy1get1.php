<?php

	$menus = [
      ["id" => "information", "name" => 'Information', "class" => "active"],
      ["id" => "productbuy", "name" => 'Product Buy'],
      ["id" => "productget", "name" => 'Product Get']  
    ];


$this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Buy 1 Get 1'])
?>

<?php $this->start('page-body') ?>
<div ng-controller="SellerBuy1Get1AddCtrl" ng-init="init(<?=$params?>)" ng-disabied="manageBuy1Get1SE || manageBuy1Get1SH">
    <nc-alert nc-model="alert"></nc-alert>
    <div ng-show="loading" nc-loading="Loading Buy 1 Get 1.."></div>
    <div ng-show="saving" nc-loading="Saving Buy 1 Get 1.."></div>
    <form class="ah-form sticky-mainform-action" name="form" ng-show="!loading && !saving" novalidate>

        <div>
            <?php $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Buy 1 Get 1/Create Buy 1 Get 1", 'border_class' => 'no-padding']) ?>
        </div>

        <div id="add_cms_master_body" class="add-product-body">
            <?php $this->insert('components/tab-nav', ["items" => $menus]) ?>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
                    <?php $this->insert('partials/create_Buy1Get1_information') ?>
                </div>
                <div role="tabpanel" class="tab-pane margin-top-20" id="productbuy">
                    <?php $this->insert('partials/create_Buy1Get1_productbuy') ?>
                </div>
                <div role="tabpanel" class="tab-pane margin-top-20" id="productget">
                    <?php $this->insert('partials/create_Buy1Get1_productget') ?>
                </div>
            </div>
            <div class="add-product-form-action main-form-action full-width-row">
                <div class="container-fluid">
                    <div class="float-right">
                        <button class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</button>
                        <button class="btn btn-blue btn-width-xl" ng-click="save()" ng-show="result == 100">Save</button>
                    </div>
                </div>
            </div>

        </div>
    </form>
</div>

<?php $this->stop() ?>



