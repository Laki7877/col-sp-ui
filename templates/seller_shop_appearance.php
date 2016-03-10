<?= $this->layout('layouts/page-with-sidebar', ['title' => 'Administration System']) ?>

<?php $this->start('page-body') ?>
	<div>
		<div ng-show="loading" nc-loading="Loading Shop Settings.."></div>
		<nc-alert nc-model="alert"></nc-alert>
        <form class="ah-form sticky-mainform-action" name="form" ng-submit="save()" ng-show="!loading">
            <nc-page-title nc-title="Shop Appearance">
                <button class="btn btn-blue btn-width-xl">Save</button>
            </nc-page-title>
		    <div>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<?php $this->insert('partials/shop_appearance_content') ?>
					</div>
				</div>
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<button class="btn btn-blue btn-width-xl">Save</button>
						</div>
					</div>
				</div>
		    </div>
        </form>
	</div>

<?php $this->stop() ?>
