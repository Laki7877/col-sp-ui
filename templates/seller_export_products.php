<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Export Products']) ?>

<?php $this->start('page-body') ?>
	<div class="seller-export-page" ng-init="init(<?= json_encode_n($viewBag) ?>)" ng-controller="ProductExportCtrl">

		<?php $this->insert('components/modal-export-product', ['id' => 'export-product', 'newProductNum' => '1,500']) ?>
		<?php $this->insert('components/modal-export-product-progressing', ['id' => 'export-product-progressing', 'percent' => '60']) ?>
		<?php $this->insert('components/modal-export-product-complete', ['id' => 'export-product-complete']) ?>

		<div class="page-header with-border">

		    <h1 class="float-left page-header-title ah-breadcrumb">
		    	<a href="/?p=index" class="ah-breadcrumb-path ah-breadcrumb-idx-0">Products</a>
		    	<span class="ah-breadcrumb-splitter">/</span>
		    	<a href="#" class="ah-breadcrumb-path ah-breadcrumb-idx-1">Export</a>
		    </h1>

		    <span class="float-right page-header-action">
		        <a href="/products" class="btn margin-left-10 btn-white btn-width-xl">
		          	<span class="">Cancel</span>
		        </a>
		        <a href="#" class="btn margin-left-10 btn-blue  btn-width-xl" ng-click="startExportProducts()">
		          	<span class="">Export</span>
		        </a>
		    </span>
		</div>

			<form class="ah-form sticky-mainform-action">
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

							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Filter Export Column</h2></div>
										<div class="form-section-content">

											<div class="row">
												<div nc-template="common/input/form-group-with-label"
												nc-template-options-path="productExport/MultiCheckbox"
												nc-label="">
													<label>
														<input type="checkbox" ng-click="toggleSelectAll()" ng-model="ctrl.selectAll"/> Select All
													</label>
												</div>

												<div nc-template="common/input/form-group-with-label"
												nc-template-options-path="productExport/MultiCheckbox"
												nc-label="System Information">
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.ProductStatus"> Product Status
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.PID"> PID
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.GroupID"> Group ID
													</label>
												</div>

												<div nc-template="common/input/form-group-with-label"
												nc-template-options-path="productExport/MultiCheckbox"
												nc-label="Vital Information">
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.SKU"> SKU
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.ProductNameEn"> Product Name (English)
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.ProductNameTh"> Product Name (Thai)
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.BrandName"> Brand Name
													</label>
												</div>

												<div nc-template="common/input/form-group-with-label"
												nc-template-options-path="productExport/MultiCheckbox"
												nc-label="Category">
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.GlobalCategory"> Global Category
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.LocalCategory"> Local Category
													</label>
												</div>

												<div nc-template="common/input/form-group-with-label"
												nc-template-options-path="productExport/MultiCheckbox"
												nc-label="Price">
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.OriginalPrice"> Original Price
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.SalePrice"> Sale Price
													</label>
												</div>

												<div nc-template="common/input/form-group-with-label"
												nc-template-options-path="productExport/MultiCheckbox"
												nc-label="Description">
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.DescriptionEn"> Description (English)
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.DescriptionTh"> Description (Thai)
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.ShortDescriptionEn"> Short Description (English)
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.ShortDescriptionTh"> Short Description (Thai)
													</label>
												</div>

												<div nc-template="common/input/form-group-with-label"
												nc-template-options-path="productExport/MultiCheckbox"
												nc-label="Shipping &amp; Inventory">
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.PreparationTime"> Preparation Time
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.PackageLength"> Package - Length
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.PackageHeight"> Package - Height
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.PackageWidth"> Package - Width
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.InventoryAmount"> Inventory Amount
													</label>
													<label>
														<input type="checkbox" name="fieldfilter" ng-model="fields.SafetyStockAmount"> Safety Stock Amount
													</label>
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
												nc-model="ctrl.tradedAS"
												nc-select-options="dataSet.attributeSets"
												nc-options="{ 'map' : { 'text': 'Display', 'value' : 'AttributeSetId' } }">
										 	 </nc-tradable-select>

										 </div>
										 	<div class="form-group">
												<div class="checkbox">
	 										 		<label><input type="checkbox" ng-model="selectAllAttributeSets">Select All Attribute Sets ({{ sumProductAttributeSet }})</label>
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
