<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Import - Add New Product']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page" ng-controller="ProductImportCtrl">

		<div class="modal fade" tabindex="-1" role="dialog" id="modal-choose-template">
		  <div class="modal-dialog modal-category-section column-4">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h3 class="modal-title">Choose Template</h3>
		      </div>
		      <div class="modal-body" style="padding-top: 15px">
						<div class="category-section column-4">
		          <nc-tree-select nc-model="ctrl.globalCat"
							nc-tree-select-tree="treeSelectTree" nc-tree-select-title="Choose Global Category"></nc-tree-select>
							<div class="category-footer no-padding">
								<span class="float-left">
									<div nc-loading-small="Loading Attribute Sets.." ng-if="attributeSetLoading.length > 0"></div>
									<select class="form-control" ng-if="attributeSetLoading.length == 0"
									ng-options="item as item.AttributeSetNameEn for item in dataSet.attributeSets track by item.AttributeSetId"
									ng-model="ctrl.attributeSet">
									</select>
								</span>
								<span class="float-right">
									<button ng-click="downloadTemplate()"
									 ng-disabled="!ctrl.attributeSet.AttributeSetId || DownloadBtnText.disabled"
									 ng-class="{'disabled' : !ctrl.attributeSet.AttributeSetId || DownloadBtnText.disabled }"
									 class="btn btn-blue btn-width-xl">
										{{ DownloadBtnText.text || 'Download' }}</button>
									<a id="download_template_btn" href="#" download="template.csv"></a>
								</span>
							</div>
						</div>

		    </div>
		  </div>
		</div>
		</div>

		<!--
		<?php $this->insert('components/alert-text', ['close' => true, 'color' => 'green', 'text' => 'Successfully Import Products. <a class="color-black text-underline">View Product List</a>']) ?>
		<?php $this->insert('components/alert-text', ['close' => true, 'color' => 'red', 'text' => 'Fail to import products', 'header_class' => 'font-weight-bold',
         'text_multilines' => ['- Wrong template file or format', '- Required fields are missing', '- Products with wrong PID', '- Cannot update product that are "Wait for Apporval"', '- Products with wrong brand or category ID', '- Wrong data type', '- Alien Attack',
        ], ]) ?>
		-->

		<?php $this->insert('components/page-title-breadcrumb-border', ['text' => 'Products/Import - Add New Products']) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">

						<div id="import-product-content-page">

							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Getting Started</h2></div>
										<div class="form-section-content">

											<div class="form-group ">
												<div class="width-label"><label class="control-label">Add Products Template</label></div>
												<div class="button-size-large">
													<a class="button-size-large btn btn-white btn-width-xl" data-toggle="modal" data-target="#modal-choose-template">Download Template</a>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Template Guideline [Empty]</h2></div>
										<div class="form-section-content">
											<?php $this->insert('components/forms/input-text-with-label', ['label' => 'Column Header', 'input_class' => 'input-icon-right-search', 'placeholder' => 'Search column header for more detail']) ?>

											<!-- <div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Template Guideline
													</label>
												</div>
												<div class="width-field-normal ">
													<label class="control-label ">
														Nike <a href="#" class="margin-left-10">Copy to Clipboard</a>
													</label>
												</div>
											</div> -->

										</div>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Template Guideline [Normal Result]</h2></div>
										<div class="form-section-content">
											<?php $this->insert('components/forms/input-text-with-label', ['label' => 'Column Header', 'input_class' => 'input-icon-right-search', 'placeholder' => 'Search column header for more detail']) ?>

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Name
													</label>
												</div>
												<div class="width-field-normal text-result">
													UPC
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Description
													</label>
												</div>
												<div class="width-field-large text-result">
													The Universal Product Code (UPC) is a barcode symbology (i.e., a specific type of barcode) that is widely used in the USA.
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Accepted Value
													</label>
												</div>
												<div class="width-field-large text-result">
													12-digit number
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Example
													</label>
												</div>
												<div class="width-field-large text-result">
													<ul>
														<li>
															Acceptable: 123456789012
														</li>
														<li>
															Unacceptable: LFWEPOJ0
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
										<div class="form-section-header"><h2>Template Guideline [Brand]</h2></div>
										<div class="form-section-content">
											<?php $this->insert('components/forms/input-text-with-label', ['label' => 'Column Header', 'input_class' => 'input-icon-right-search', 'placeholder' => 'Search column header for more detail']) ?>

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Name
													</label>
												</div>
												<div class="width-field-normal text-result">
													Brand
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Description
													</label>
												</div>
												<div class="width-field-large text-result">
													Brand or manufaturer of your product.
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Accepted Value
													</label>
												</div>
												<div class="width-field-normal">
													<input type="text" class="form-control input-icon-right-search" placeholder="Search for brand name">
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
													</label>
												</div>
												<div class="width-field-normal scrollable-field">
													<ul class="scrollable-content">
														<li>
															Brand A
														</li>
														<li>
															Brand B
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
										<div class="form-section-header"><h2>Template Guideline [Attribute]</h2></div>
										<div class="form-section-content">
											<?php $this->insert('components/forms/input-text-with-label', ['label' => 'Column Header', 'input_class' => 'input-icon-right-search', 'placeholder' => 'Search column header for more detail']) ?>

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Name
													</label>
												</div>
												<div class="width-field-normal text-result">
													Gadget Capacity
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Description
													</label>
												</div>
												<div class="width-field-large text-result">
													Description of that attribute
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Enable Variation
													</label>
												</div>
												<div class="width-field-large text-result">
													Description of that attribute
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Attribute Type
													</label>
												</div>
												<div class="width-field-large text-result">
													Freetext / Dropdown / HTML Box
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Attribute Unit
													</label>
												</div>
												<div class="width-field-large text-result">
													Volt / โว้อออออ
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Accepted Value
													</label>
												</div>
												<div class="width-field-normal scrollable-field">
													<ul class="scrollable-content">
														<li>
															Attribute Value A <a href="#" class="margin-left-10">Copy to Clipboard</a>
														</li>
														<li>
															Attribute Value A <a href="#" class="margin-left-10">Copy to Clipboard</a>
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
										<div class="form-section-header"><h2>Template Guideline [Global Category]</h2></div>
										<div class="form-section-content">
											<?php $this->insert('components/forms/input-text-with-label', ['label' => 'Column Header', 'input_class' => 'input-icon-right-search', 'placeholder' => 'Search column header for more detail']) ?>

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Name
													</label>
												</div>
												<div class="width-field-normal text-result">
													Global Category
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Description
													</label>
												</div>
												<div class="width-field-large text-result">
													Description babababa
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Global Category
													</label>
												</div>
												<div class="width-field-large text-result">
													<a href="#"><i class="fa fa-plus-circle"></i> Select Category</a>
												</div>
											</div>

											<!-- After select category -->

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Global Category
													</label>
												</div>
												<div class="width-field-large text-result">
													<a href="#">Phone</a>
												</div>
											</div>


											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Category ID
													</label>
												</div>
												<div class="width-field-large text-result">
													F45W <a href="#" class="margin-left-10">Copy to Clipboard</a>
												</div>
											</div>

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Suggested Attribute Set
													</label>
												</div>
												<div class="width-field-normal scrollable-field">
													<ul class="scrollable-content">
														<li>
															Attribute Set A
														</li>
														<li>
															Attribute Set B
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
										<div class="form-section-header"><h2>Template Guideline [Local Category]</h2></div>
										<div class="form-section-content">
											<?php $this->insert('components/forms/input-text-with-label', ['label' => 'Column Header', 'input_class' => 'input-icon-right-search', 'placeholder' => 'Search column header for more detail']) ?>

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Name
													</label>
												</div>
												<div class="width-field-normal text-result">
													Local Category
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Description
													</label>
												</div>
												<div class="width-field-large text-result">
													Description babababa
												</div>
											</div>
											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Local Category
													</label>
												</div>
												<div class="width-field-large text-result">
													<a href="#"><i class="fa fa-plus-circle"></i> Select Category</a>
												</div>
											</div>

											<!-- After select category -->

											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Local Category
													</label>
												</div>
												<div class="width-field-large text-result">
													<a href="#">Phone</a>
												</div>
											</div>


											<div class="form-group ">
												<div class="width-label">
													<label class="control-label ">
														Category ID
													</label>
												</div>
												<div class="width-field-large text-result">
													F4XW <a href="#" class="margin-left-10">Copy to Clipboard</a>
												</div>
											</div>



										</div>
									</div>
								</div>
							</div>



							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Upload File</h2></div>
										<div class="form-section-content">
											<?php $this->insert('components/forms/upload-field-with-label', ['label' => 'Choose File', 'input_attrs' => 'Browse from your computer']) ?>
											<?php $this->insert('components/forms/button-with-label', ['buttonText' => 'Import', 'btnClass' => 'btn-blue', 'modalData' => 'data-toggle="modal" data-target="#import-product"']) ?>
										</div>
									</div>
								</div>
							</div>

						</div>

					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->insert('components/modal-local-category', ['id' => 'local-category-detail', 'header' => 'Local Category Detail']) ?>




<?php $this->insert('components/modal-import-product', ['id' => 'import-product', 'newProductNum' => '1,500 products to be imported', 'updatedProductNum' => '']) ?>


<?php $this->stop() ?>
