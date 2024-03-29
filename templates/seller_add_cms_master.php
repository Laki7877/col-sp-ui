<?php
    $menus = [
      ["id" => "information", "name" => 'Information', "class" => "active"],
      ["id" => "collections", "name" => 'Collections'],
	  ["id" => "schedulers", "name" => 'Schedulers'],
      //["id" => "conditions", "name" => 'Conditions'],
    ];
    
     $this->layout('layouts/page-with-sidebar', ['title' => 'Seller System'])

?>

<?php $this->start('page-body') ?>
<div ng-controller="SellerCMSMasterAddCtrl" ng-init="init(<?=$params?>)" ng-disabled="CMSview || CMSviewShop">
    <nc-alert nc-model="alert"></nc-alert>
    <div ng-show="loading" nc-loading="Loading CMS Master.."></div>
    <div ng-show="saving" nc-loading="Saving CMS Master.."></div>
    <form class="ah-form sticky-mainform-action" name="form" ng-show="!loading && !saving" novalidate>

        <div>
            <?php $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "CMS Master/Create CMS Master", 'border_class' => 'no-padding']) ?>
        </div>

        <div id="add_cms_master_body" class="add-product-body">
            <?php $this->insert('components/tab-nav', ["items" => $menus]) ?>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
                    <?php $this->insert('partials/create_cms_master_information') ?>
                </div>
				<div role="tabpanel" class="tab-pane margin-top-20" id="collections">
                    <?php $this->insert('partials/create_cms_master_collections') ?>
                </div>
                <div role="tabpanel" class="tab-pane margin-top-20" id="schedulers">
                    <?php $this->insert('partials/create_cms_master_schedulers') ?>
                </div>
			   <!--
               <div role="tabpanel" class="tab-pane margin-top-20" id="conditions">
                    <?php $this->insert('partials/create_cms_master_conditions') ?>
                </div>
				-->
            </div>
            <div class="add-product-form-action main-form-action full-width-row">
                <div class="container-fluid">
                    <div class="float-right">
                        <button class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</button>
                        <button class="btn btn-blue btn-width-xl" ng-click="save()" ng-disabled="CMSadd">Save</button>
                    </div>
                </div>
            </div>

        </div>
    </form>
</div>

<?php $this->stop() ?>
