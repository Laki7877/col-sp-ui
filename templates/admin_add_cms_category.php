<?php 

	$menus = [
      ["id" => "information", "name" => 'Add Information', "class" => "active"],
      ["id" => "items", "name" => 'Add Product'],
    ];

     $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
<div ng-controller="AdminCMSCategoryAddCtrl" ng-init="init(<?=$params?>)">
    <nc-alert nc-model="alert"></nc-alert>
    <div ng-show="loading" nc-loading="Loading CMS Category.."></div>
    <div ng-show="saving" nc-loading="Saving CMS Category.."></div>
    <form class="ah-form sticky-mainform-action" name="form" ng-show="!loading && !saving" novalidate>

        <div>
            <?php $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "CMS Category/{{title}}", 'border_class' => 'no-padding']) ?>
        </div>

        <div class="add-product-body">
			
			<?php $this->insert('components/tab-nav', ["items" => $menus]) ?>

			<div class="tab-content">
                <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
					<?php $this->insert('partials/create_cms_category_information') ?>
                </div>
                <div role="tabpanel" class="tab-pane margin-top-20" id="items">
					<?php $this->insert('partials/create_cms_category_item') ?>
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
