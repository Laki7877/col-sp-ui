<?php
    $menus = [
      ["id" => "information", "name" => 'Information', "class" => "active"],
      ["id" => "collections", "name" => 'Collections'],
	  ["id" => "schedulers", "name" => 'Schedulers'],
      ["id" => "conditions", "name" => 'Conditions'],
    ];
    
     $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])

?>

<?php $this->start('page-body') ?>
<div ng-controller="AdminCMSMasterAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <div ng-show="loading" nc-loading="Loading CMS Master.."></div>
    <div ng-show="saving" nc-loading="Saving CMS Master.."></div>
    <form class="ah-form sticky-mainform-action" name="form" ng-show="!loading && !saving" novalidate>

        <div>
            <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "CMS Master/Create CMS Master", 'border_class' => 'no-padding']) ?>
        </div>

        <div id="add_cms_master_body" class="add-product-body">
            <? $this->insert('components/tab-nav', ["items" => $menus]) ?>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
                    <? $this->insert('partials/create_cms_information') ?>
                </div>
				<div role="tabpanel" class="tab-pane margin-top-20" id="collections">
                    <? $this->insert('partials/create_cms_collections') ?>
                </div>
                <div role="tabpanel" class="tab-pane margin-top-20" id="schedulers">
                    <? $this->insert('partials/create_cms_schedulers') ?>
                </div>
               <div role="tabpanel" class="tab-pane margin-top-20" id="conditions">
                    <? $this->insert('partials/create_cms_conditions') ?>
                </div>
            </div>
            <div class="add-product-form-action main-form-action full-width-row">
                <div class="container-fluid">
                    <div class="float-right">
                        <button class="btn btn-white btn-width-xl" ng-click="cancel()">Cancel</button>
                        <button class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
                    </div>
                </div>
            </div>

        </div>
    </form>
</div>

<?php $this->stop() ?>
