<?php
    $menus = [
      ["id" => "information", "name" => 'Information', "class" => "active"],
      ["id" => "conditions", "name" => 'Conditions'],
    ];
    
        $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
<div ng-controller="AdminOnTopCreditAddCtrl">
    <form class="ah-form sticky-mainform-action" name="form" novalidate>

        <div>
            <? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "On Top Credit Card/Create", 'border_class' => 'no-padding']) ?>
        </div>

        <div class="add-product-body">
            <? $this->insert('components/tab-nav', ["items" => $menus]) ?>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
                    <? $this->insert('partials/create_ontopcredit_information') ?>
                </div>
                <div role="tabpanel" class="tab-pane margin-top-20" id="conditions">
                    <? $this->insert('partials/ontopcredit_condition') ?>
                </div>

            </div>
        </div>
        <div class="add-product-form-action main-form-action full-width-row">
            <div class="container-fluid">
                <div class="float-right">
                    <button class="btn btn-white btn-width-xl">Cancel</button>
                    <button class="btn btn-blue btn-width-xl" ng-click="save()">Save</button>
                </div>
            </div>
        </div>
    </form>
</div>
<?php $this->stop() ?>
