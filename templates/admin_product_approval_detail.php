<?php
$menus = [
	["id" => "information", "name" => 'Information', "class" => "require active"],
	["id" => "images", "name" => 'Images', "class" => "require"],
	["id" => "category", "name" => 'Category', 'class' => ''],
	["id" => "variation", "name" => 'Variation', 'class' => ''],
	["id" => "more_option", "name" => 'More Options', 'class' => ''],
];
$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Products']);
?>
<?php $this->start('page-body') ?>
<div ng-controller="AdminProductApprovalDetailCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
	<div class="add-product-body">
		
		<nc-alert nc-model="alert"></nc-alert>
		<form name="addProductForm" class="ah-form sticky-mainform-action" novalidate>
			<fieldset> <!-- admin can edit all statuses -->
			<? $this->insert('components/page-title-breadcrumb', ['text' => "Product Approval List/Product Detail", 'urls' => ['/admin/approve']]) ?>
			<div>
					<div class="tab-content">
						<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
							<div id="add-product-more-option-tab-content">
								
								<div class="row">
									<div class="col-xs-12">
										<div class="form-section form-section-content-grey" ng-if="!pageState.loading.state">
											<div class="form-section-header"><h2>Admin Panel</h2></div>
											<div class="form-section-content">

												<div nc-template="common/input/fg-radio-group" nc-label="Information Tab" 
												nc-template-options-path="adminApproveForm/Radio"
								                nc-template-form="form.AdminApproveInformation">
								                    <label class="color-yellow">
								                    	<input type="radio" ng-model="formData.AdminApprove.Information" value="WA" name="AdminApproveInformation"/> Wait for Approval
								                    </label>
								                    <label class="color-green margin-left-10">
								                    	<input type="radio" ng-model="formData.AdminApprove.Information" value="AP" name="AdminApproveInformation"/> Approved
								                    </label>
								                    <label class="color-red margin-left-10">
								                    	<input type="radio" ng-model="formData.AdminApprove.Information" value="RJ" name="AdminApproveInformation"/> Not Approved
								                    </label>
								                </div>

												<div nc-template="common/input/fg-radio-group" nc-label="Image Tab" 
												nc-template-options-path="adminApproveForm/Radio"
								                nc-template-form="form.AdminApproveImage">
								                    <label class="color-yellow">
								                    	<input type="radio" ng-model="formData.AdminApprove.Image" value="WA" name="AdminApproveImage"/> Wait for Approval
								                    </label>
								                    <label class="color-green margin-left-10">
								                    	<input type="radio" ng-model="formData.AdminApprove.Image" value="AP" name="AdminApproveImage"/> Approved
								                    </label>
								                    <label class="color-red margin-left-10">
								                    	<input type="radio" ng-model="formData.AdminApprove.Image" value="RJ" name="AdminApproveImage"/> Not Approved
								                    </label>
								                </div>
												
												<div nc-template="common/input/fg-radio-group" nc-label="Category Tab" 
												nc-template-options-path="adminApproveForm/Radio"
								                nc-template-form="form.AdminApproveCategory">
								                    <label class="color-yellow">
								                    	<input type="radio" ng-model="formData.AdminApprove.Category" value="WA" name="AdminApproveCategory"/> Wait for Approval
								                    </label>
								                    <label class="color-green margin-left-10">
								                    	<input type="radio" ng-model="formData.AdminApprove.Category" value="AP" name="AdminApproveCategory"/> Approved
								                    </label>
								                    <label class="color-red margin-left-10">
								                    	<input type="radio" ng-model="formData.AdminApprove.Category" value="RJ" name="AdminApproveCategory"/> Not Approved
								                    </label>
								                </div>
												
												
												<div nc-template="common/input/fg-radio-group" nc-label="Variation Tab" 
												nc-template-options-path="adminApproveForm/Radio"
								                nc-template-form="form.AdminApproveVariation">
								                    <label class="color-yellow">
								                    	<input type="radio" ng-model="formData.AdminApprove.Variation" value="WA" name="AdminApproveVariation"/> Wait for Approval
								                    </label>
								                    <label class="color-green margin-left-10">
								                    	<input type="radio" ng-model="formData.AdminApprove.Variation" value="AP" name="AdminApproveVariation"/> Approved
								                    </label>
								                    <label class="color-red margin-left-10">
								                    	<input type="radio" ng-model="formData.AdminApprove.Variation" value="RJ" name="AdminApproveVariation"/> Not Approved
								                    </label>
								                </div>


												<div nc-template="common/input/fg-radio-group" nc-label="More Options Tab" 
												nc-template-options-path="adminApproveForm/Radio"
								                nc-template-form="form.AdminApproveMoreOptions">
								                    <label class="color-yellow">
								                    	<input type="radio" ng-model="formData.AdminApprove.MoreOption" value="WA" name="AdminApproveMoreOptions"/> Wait for Approval
								                    </label>
								                    <label class="color-green margin-left-10">
								                    	<input type="radio" ng-model="formData.AdminApprove.MoreOption" value="AP" name="AdminApproveMoreOptions"/> Approved
								                    </label>
								                    <label class="color-red margin-left-10">
								                    	<input type="radio" ng-model="formData.AdminApprove.MoreOption" value="RJ" name="AdminApproveMoreOptions"/> Not Approved
								                    </label>
								                </div>

												<div nc-template="common/input/form-group-with-label" nc-label="Reject Reason" 
												nc-template-options-path="adminApproveForm/NothingSpecial"
								                nc-template-form="form.AdminApproveRejectReason">
								                    <textarea placeholder="Reason why you do not approve this product" 
								                    class="form-control" name="AdminApproveRejectReason" ng-model="formData.AdminApprove.RejectReason">
								                    </textarea>
								                </div>

												<div class="form-group">
													<div class="width-label"><label class="control-label"></label></div>
													<div class="button-size-normal">
														<a ng-disabled="!canApprove()"
														 class="button-size-normal btn btn-green btn-width-xl" ng-click="publish('AP')">Approve</a>
													</div>
													<div class="button-size-normal margin-left-10">
														<a class="button-size-normal btn btn-green btn-width-xl" ng-click="publish('AP')">Force Approve</a>
													</div>
													<div class="button-size-normal margin-left-10">
														<a class="button-size-normal btn btn-red btn-width-xl" ng-click="publish('RJ')">Reject</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>
			<div ng-if="pageState.loading.state" nc-loading="{{ pageState.loading.message }}..">
			</div>
			<div class="add-product-body" ng-if="!pageState.loading.state">
				<? $this->insert('components/tab-nav', ["items" => $menus]) ?>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="information">
						<div ap-component="ap/tab-information"></div>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="images">
						<div ap-component="ap/tab-images"></div>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="category">
						<div ap-component="ap/tab-category"></div>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="more_option">
						<div ap-component="ap/tab-more-option"></div>
					</div>
					<div role="tabpanel" class="tab-pane margin-top-20" id="variation">
						<div ap-component="ap/tab-variations"></div>
					</div>
				</div>
				<!-- tablc-ntent-->
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right" ng-if="adminMode">
							<button ng-show="formData.Status != 'WA'"
							class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>
							
							<button type="submit" class="btn btn-blue btn-width-xl"
							ng-click="saveAsIs()">Save</button>
						</div>
						<div class="float-right" ng-if="!adminMode">
							<a href="/products" class="link-btn-plain">Cancel</a>
							<button ng-show="formData.Status != 'WA'"
							class="btn btn-white btn-width-xl" ng-click="preview()">Preview</button>
							<button ng-show="formData.Status != 'WA'"
							class="btn btn-white btn-width-xl"
							type="submit" ng-click="publish('DF')">Save as Draft</button>
							<button ng-show="formData.Status != 'WA'"
							type="submit" class="btn btn-blue btn-width-xl"
							ng-click="prePublishWA()">Publish</button>
							
						</div>
					</div>
				</div>
				<!--fullwidthrow-->
			</div>
			<!-- apbvody-->
		</fieldset>
	</form>
</div>
</div>

	<link rel="stylesheet" type="text/css" href="/assets/libs/select2/css/select2.min.css">
    <link rel="stylesheet" href="/assets/libs/select2/css/selectize.css">

<?php $this->stop() ?>