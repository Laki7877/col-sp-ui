<?php 

	$menus = [
      ["id" => "information", "name" => 'Master(Static)', "class" => "active"],
      ["id" => "items", "name" => 'Collectons'],
    ];

    $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
<div ng-controller="AdminCMSCollectionAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <div ng-show="loading" nc-loading="Loading On Top Credit.."></div>
    <div ng-show="saving" nc-loading="Saving On Top Credit.."></div>
    <form class="ah-form sticky-mainform-action" name="form" ng-show="!loading && !saving" novalidate>

        <div>
            <?php $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "CMS Static & Collection/Create", 'border_class' => 'no-padding']) ?>
        </div>

        <div class="add-product-body">
            
			<?php $this->insert('components/tab-nav', ["items" => $menus]) ?>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
					<?php $this->insert('partials/create_cms_collection_information') ?>
                </div>
                <div role="tabpanel" class="tab-pane margin-top-20" id="items">
					<?php $this->insert('partials/create_cms_collection_item') ?>
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
