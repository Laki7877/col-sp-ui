<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Seller Portal - Import Products']) ?>

<?php $this->start('page-body') ?>
	<div class="import-page" ng-controller="ProductImportCtrl" ng-init="init(<?=$update?>)">
		<!-- MODAL -->
		<div class="modal fade" tabindex="-1" role="dialog" id="modal-choose-template">
		  <div class="modal-dialog modal-category-section column-4">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h3 class="modal-title">Choose Template</h3>
		      </div>
		      <div class="modal-body" style="padding-top: 15px">
				<div class="category-section column-4">
          			<nc-tree-select nc-model="ctrl.globalCat" nc-tree-select-tree="ctrl.GlobalCategoryTree" nc-tree-select-title="Choose Global Category"></nc-tree-select>
					<div class="category-footer no-padding">

						<span class="float-right">
							<button ng-click="downloadTemplate()"
							 ng-disabled="ctrl.globalCat == null || ctrl.globalCat.Rgt - ctrl.globalCat.Lft != 1 || DownloadBtnText.disabled"
							 ng-class="{'disabled' : ctrl.globalCat == null || DownloadBtnText.disabled }"
							 class="btn btn-blue btn-width-xl">
								{{ DownloadBtnText.text || 'Download' }}</button>
							<a id="download_template_btn" href="#" download="template.csv"></a>
						</span>

						<span class="float-right margin-right-20">
							<div nc-loading-small="Loading Attribute Sets.." ng-show="attributeSetLoading"></div>
							<div ng-show="!attributeSetLoading">
								<div ng-show="dataSet.attributeSets.length > 0">
									<select class="form-control"
									ng-options="item as item.AttributeSetNameEn for item in dataSet.attributeSets track by item.AttributeSetId"
									ng-model="ctrl.attributeSet">
										<option value="" disabled selected style="display: none;">- Choose an Attribute Set -</option>
									</select>
								</div>
								<div ng-show="dataSet.attributeSets.length == 0">Please choose the deepest level of category</div>
							</div>
						</span>

					</div>
				</div>
			    </div>
			  </div>
			</div>
		</div>
		<nc-alert nc-model="alert"></nc-alert>
		<nc-page-title nc-title="Products/{{title}}" link="/products" icon="fa-tag"></nc-page-title>

		<form class="ah-form sticky-mainform-action">
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
					<div id="import-product-content-page">
						<div ng-if="!update" class="row">
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
						<div ng-if="update" class="row">
							<div class="col-xs-12">
								<div class="form-section">
									<div class="form-section-header"><h2>Getting Started</h2></div>
									<div class="form-section-content">
										<div class="form-group ">
											<div class="width-label"><label class="control-label">If not already export</label></div>
											<div class="button-size-large">
												<a class="button-size-large btn btn-white btn-width-xl" href="/products/export">Export All Product</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="col-xs-12">
								<div class="form-section">
									<div class="form-section-header"><h2>Template Guideline</h2></div>
									<div class="form-section-content">
										<div nc-template="common/input/form-group-with-label"
											nc-template-form="form.columnSearch"
											nc-label="Column Header"
											nc-template-options-path="productImport/ColumnSearch">
											<input type="text"
												ng-model="ctrl.columnSearch"
												ng-pattern-restrict="[^<>]*"
												maxlength="255"
												uib-typeahead="item as item.HeaderName for item in getGuideline($viewValue)"
												class="form-control input-icon-right-search"
												placeholder="Search column header for more detail"
												typeahead-wait-ms="TYPEAHEAD_DELAY"
												typeahead-on-select="onSearchSelect()"
												/>
										</div>
										<div ng-if="_.isObject(ctrl.columnSearch)" ng-switch="ctrl.columnSearch.HeaderName">
											<div ng-switch-when="Brand Name">
												<div nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/Name"
													nc-label="Name">{{ctrl.columnSearch.HeaderName}}</div>
												<div nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/Description"
													nc-label="Description">{{ctrl.columnSearch.Description}}</div>
												<div nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/BrandSearch"
													nc-label="Accepted Value">
													<input type="text"
														class="form-control input-icon-right-search"
														ng-model="ctrl.BrandSearch"
														placeholder="Search for Brand Name"
														/>
												</div>
												<div nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/BrandValue"
													nc-label="">
													<ul class="scrollable-content">
														<li ng-repeat="brand in ctrl.Brands | filter: ctrl.BrandSearch track by $index">{{brand}}</li>
													</ul>
												</div>
											</div>
											<div ng-switch-when="Global Category ID">
												<div nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/Name"
													nc-label="Name">{{ctrl.columnSearch.HeaderName}}</div>
												<div nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/Description"
													nc-label="Description">{{ctrl.columnSearch.Description}}</div>
												<div nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/Category"
													nc-label="Global Category">
													<a ng-click="openCategoryModal(true)">
														<span ng-if="!ctrl.GlobalCategory"><i class="fa fa-plus-circle"></i> Select Category</span>
														<span ng-if="ctrl.GlobalCategory">{{ctrl.GlobalCategory.NameEn}}</span>
													</a>
												</div>
												<div ng-show="ctrl.GlobalCategory"
													nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/CategoryID"
													nc-label="Category ID">
													<span>{{ctrl.GlobalCategory.CategoryId}}</span>
													<a class="margin-left-10" clipboard text="ctrl.GlobalCategory.CategoryId">Copy to Clipboard</a>
												</div>
												<div ng-show="ctrl.GlobalCategory"
													nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/SuggestedAttributeSet"
													nc-label="Suggested Attribute Set">
													<ul class="scrollable-content">
														<li ng-repeat="attr in ctrl.AttributeSets track by $index">{{attr.AttributeSetNameEn}}</li>
													</ul>
												</div>
											</div>
											<div ng-switch-when="Local Category ID">
												<div nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/Name"
													nc-label="Name">{{ctrl.columnSearch.HeaderName}}</div>
												<div nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/Description"
													nc-label="Description">{{ctrl.columnSearch.Description}}</div>
												<div nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/Category"
													nc-label="Local Category">
													<a ng-click="openCategoryModal(false)">
														<span ng-if="!ctrl.LocalCategory"><i class="fa fa-plus-circle"></i> Select Category</span>
														<span ng-if="ctrl.LocalCategory">{{ctrl.LocalCategory.NameEn}}</span>
													</a>
												</div>
												<div ng-show="ctrl.LocalCategory"
													nc-template="common/input/form-group-with-label"
													nc-template-options-path="productImport/CategoryID"
													nc-label="Category ID">
													<span>{{ctrl.LocalCategory.CategoryId}}</span>
													<a class="margin-left-10" clipboard text="ctrl.LocalCategory.CategoryId">Copy to Clipboard</a>
												</div>
											</div>
											<div ng-switch-default>
												<div ng-if="ctrl.columnSearch.IsAttribute">
													<div nc-template="common/input/form-group-with-label"
														nc-template-options-path="productImport/Name"
														nc-label="Name">{{ctrl.columnSearch.HeaderName}}</div>
													<div nc-template="common/input/form-group-with-label"
														nc-template-options-path="productImport/Description"
														nc-label="Description">{{ctrl.columnSearch.Description}}</div>
													<div nc-template="common/input/form-group-with-label"
														nc-template-options-path="productImport/EnableVariation"
														nc-label="Enable Variation">{{ctrl.columnSearch.IsVariant | mapDropdown: yesNoOptions}}</div>
													<div nc-template="common/input/form-group-with-label"
														nc-template-options-path="productImport/AttributeType"
														nc-label="Attribute Type">
														{{ctrl.columnSearch.AttributeType | mapDropdown: dataTypeOptions}}
													</div>
													<div nc-template="common/input/form-group-with-label"
														nc-template-options-path="productImport/AttributeValues"
														nc-label="Attribute Values">
														<ul class="scrollable-content">
															<li ng-repeat="attr in ctrl.columnSearch.AttributeValue track by $index">
																<span>{{attr.AttributeValueEn}}</span>
																<a class="margin-left-10" clipboard text="attr.AttributeValueEn">Copy to Clipboard</a>
															</li>
														</ul>
													</div>
												</div>
												<div ng-if="!ctrl.columnSearch.IsAttribute">
													<div nc-template="common/input/form-group-with-label"
														nc-template-options-path="productImport/Name"
														nc-label="Name">{{ctrl.columnSearch.HeaderName}}</div>
													<div nc-template="common/input/form-group-with-label"
														nc-template-options-path="productImport/Description"
														nc-label="Description">{{ctrl.columnSearch.Description}}</div>
													<div nc-template="common/input/form-group-with-label"
														nc-template-options-path="productImport/AcceptedValue"
														nc-label="Accepted Value"><span ng-bind-html="ctrl.columnSearch.AcceptedValue"></span></div>
													<div nc-template="common/input/form-group-with-label"
														nc-template-options-path="productImport/Example"
														nc-label="Example"><span ng-bind-html="ctrl.columnSearch.Example"></span></div>
													<div nc-template="common/input/form-group-with-label"
														nc-template-options-path="productImport/Note"
														nc-label="Note">{{ctrl.columnSearch.Note}}</div>
												</div>
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
										<div nc-template="common/input/form-group-with-label"
											nc-template-form="form.Upload"
											nc-label="Choose File (.csv)"
											nc-template-options-path="productImport/Upload">
											<div type="text" class="width-100-percent form-control get_file" ng-delegate="up">
												<span ng-if="uploader.queue.length == 0" class="color-grey">Browse file to upload</span>
												<span ng-if="uploader.queue.length > 0">{{ uploader.queue[uploader.queue.length-1].file.name }}</span>
											</div>
											<i class="fa fa-folder-open fa-lg color-dark-grey fa-input-icon"></i>
											<input nv-file-select
												uploader="uploader" 
												type="file" 
												accept=".csv"
												class="my_file" 
												ng-delegatee="up"/>
										</div>
										<div nc-template="common/input/form-group-with-label" nc-label="">
											<button ng-click="import()" class="button-size-large btn btn-blue btn-width-xl" ng-disabled="uploader.queue.length == 0" type="button">Import Product</button>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</form>

	</div>

<?php $this->insert('components/modal-local-category', ['id' => 'local-category-detail', 'header' => 'Local Category Detail']) ?>




<?php $this->insert('components/modal-import-product', ['id' => 'import-product', 'newProductNum' => '1,500 products to be imported', 'updatedProductNum' => '']) ?>


<?php $this->stop() ?>
