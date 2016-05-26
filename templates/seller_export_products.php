<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Export Products']) ?>

<?php $this->start('page-body') ?>
	<div class="seller-export-page" ng-init="init(<?= json_encode_n($viewBag) ?>)" ng-controller="ProductExportCtrl">

		<div ng-show="loading.length < 2" nc-loading="Loading Fields.."></div>
		<?php $this->insert('components/modal-export-product', ['id' => 'export-product', 'newProductNum' => '1,500']) ?>
		<?php $this->insert('components/modal-export-product-progressing', ['id' => 'export-product-progressing', 'percent' => '60']) ?>
		<?php $this->insert('components/modal-export-product-complete', ['id' => 'export-product-complete']) ?>
        <nc-alert nc-model="alert"></nc-alert>

		<div class="page-header with-border" ng-show="loading.length >= 2">

				<nc-page-title nc-title="Products/Export" link="/products" icon="fa-tag">
					<div class="page-header">
						<a href="/products" class="btn margin-left-10 btn-white btn-width-xl">
		          	<span class="">Cancel</span>
		        </a>
		        <a href="#" class="btn margin-left-10 btn-blue  btn-width-xl" ng-click="startExportProducts()">
		          	<span class="">Export</span>
		        </a>
					</div>
				</nc-page-title>

		</div>

			<form class="ah-form sticky-mainform-action" ng-show="loading.length >= 2">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">

						<div id="import-product-content-page">

							<div class="margin-bottom-20" ng-if="!SELECT_ALL">
								<span>Number of products selected:</span>
								<span>{{ ProductList.length }}</span>
							</div>
							<div class="margin-bottom-20" ng-if="SELECT_ALL">
								<span>Number of products selected: </span> <i>ALL PRODUCTS</i>
							</div>

							<div ng-include="'product/exportResult'"></div>

							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Filter Export Column</h2></div>
										<div class="form-section-content">

											<div class="row">
												<div class="col-sm-12 export-select-all">
													<label>
														<input type="checkbox" ng-click="toggleSelectAll()" ng-model="ctrl.selectAll"/> Select All
													</label>
												</div>
												<div class="col-sm-{{12/columnCount}}" ng-repeat="col in _.range(columnCount)">
													<ul class="export-list" ng-repeat="(group, items) in availableFieldsColumn[col]">
														<li class="group-label">
															{{ group }}
														</li>
														<li ng-repeat="item in items">
															<label>
																<input type="checkbox" name="fieldfilter"
																 ng-disabled="item.MapName == 'AAD'"
																 ng-model="fields[item.MapName]"> 	{{ item.HeaderName }}
															</label>
														</li>
													</ul>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Select Attribute Set</h2></div>
										<div class="form-section-content">
										<div class="form-group" style="margin:0px; padding:0px" ng-show="!selectAllAttributeSets">
												<nc-tradable-select
												nc-test="lockAS"
												on-search="onSearch"
												nc-model="ctrl.tradedAS"
												search-placeholder="Search Attribute Set"
												nc-select-options="dataSet.attributeSets"
												nc-id="AttributeSetId"
												nc-text="Display">
										 	 </nc-tradable-select>

										 </div>
										 	<div class="form-group">
												<div class="checkbox">
	 										 		<!-- <label><input type="checkbox" ng-model="selectAllAttributeSets">Select All Attribute Sets ({{ sumProductAttributeSet }})</label> -->
													<label><input type="checkbox" ng-model="selectAllAttributeSets">Select All Attribute Sets</label>
											 </div>
										 </div>
										</div>
									</div>
								</div>
							</div>




						</div>

					</div>
				</div>

				 <div class="main-form-action full-width-row">
			        <div class="container-fluid">
			          <div class="float-right">
			            <a href="/products" class="link-btn-plain">Cancel</a>
			            <button class="btn btn-blue btn-width-xl"
									ng-click="startExportProducts()"
									>Export</button>
			          </div>
			        </div>
			     </div>

			</form>



	</div>

<?php $this->stop() ?>
