<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Export Products']) ?>

<?php $this->start('page-body') ?>
	<div class="seller-export-page" ng-init="init(<?= json_encode_n($viewBag) ?>)" ng-controller="ProductExportCtrl">

		<div ng-show="loading.length < 2" nc-loading="Loading Fields.."></div>
		<?php $this->insert('components/modal-export-product', ['id' => 'export-product', 'newProductNum' => '1,500']) ?>
		<?php $this->insert('components/modal-export-product-progressing', ['id' => 'export-product-progressing', 'percent' => '60']) ?>
		<?php $this->insert('components/modal-export-product-complete', ['id' => 'export-product-complete']) ?>

		<div class="page-header with-border" ng-show="loading.length >= 2">

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

							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Filter Export Column</h2></div>
										<div class="form-section-content">

											<div class="row">
												<div class="col-sm-12 export-select-all">
													<input type="checkbox" ng-click="toggleSelectAll()" ng-model="ctrl.selectAll"/> Select All Columns
												</div>
												<div class="col-sm-3">
													<ul class="export-list">
														<li class="group-label">
															System Information
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.ProductStatus"> Product Status
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.GroupID"> Group ID
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Default Variant
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.PID"> PID
														</li>

														<li class="group-label">
															Vital Information
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.ProductNameEn"> Product Name (English)
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.ProductNameTh"> Product Name (Thai)
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.SKU"> SKU
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> UPC
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.BrandName"> Brand Name
														</li>

														<li class="group-label">
															Price
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.OriginalPrice"> Original Price
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.SalePrice"> Sale Price
														</li>

														<li class="group-label">
															Description
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.DescriptionEn"> Description (English)
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.DescriptionTh"> Description (Thai)
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.ShortDescriptionEn"> Short Description (English)
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.ShortDescriptionTh"> Short Description (Thai)
														</li>

													</ul>
												</div>
												<div class="col-sm-3">
													<ul class="export-list">

														<li class="group-label">
															Detail & Variation
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Attribute Set
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Variation Option
														</li>

														<li class="group-label">
															Keywords
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Keywords
														</li>

														<li class="group-label">
															Inventory
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.InventoryAmount"> Inventory Amount
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.SafetyStockAmount"> Safety Stock Amount
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Stock Type
														</li>

														<li class="group-label">
															Shipping Detail
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Shipping Method
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.PreparationTime"> Preparation Time
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.PackageHeight"> Package - Height (mm)
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.PackageLength"> Package - Length (mm)
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.PackageWidth"> Package - Width (mm)
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Package - Weight (g)
														</li>

														<li class="group-label">
															Cateogry
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.GlobalCategory"> Global Category
														</li>
														<li>
															<input type="checkbox" name="fieldfilter" ng-model="fields.LocalCategory"> Local Category
														</li>

													</ul>
												</div>

												<div class="col-sm-3">
													<ul class="export-list">

														<li class="group-label">
															Relationship
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Related Products
														</li>

														<li class="group-label">
															SEO
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Meta Title (English)
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Meta Title (Thai)
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Meta Description (English)
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Meta Description (Thai)
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Meta Keywords (English)
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Meta Keywords (Thai)
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Product URL Key (English)
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Product Boosting Weight
														</li>

														<li class="group-label">
															More Detail
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Effective Date
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Effective Time
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Expire Date
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Expire Time
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Control Flag
														</li>
														<li><!-- NEW -->
															<input type="checkbox" name="fieldfilter" ng-model=""> Remark
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
