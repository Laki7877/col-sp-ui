<?php
$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Products']);
?>
<?php $this->start('page-body') ?>
<script type="text/ng-template" id="page-btn-controls">
<div class="float-right" ng-if="!_loading.state && adminMode">
			<a class="btn btn-white btn-width-xl" ng-href="/admin/approve">Cancel</a>
				<button ng-show="formData.Status != 'WA'" class="btn btn-white margin-left-10 btn-width-xl" ng-click="preview()">Preview</button>
					<button type="submit" class="btn btn-blue margin-left-10 btn-width-xl" ng-click="prePublishWA()">Save</button>
	</div>
</script>
<script type="text/ng-template" id="admin-panel">
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
</script>
<div ng-controller="AdminProductApprovalDetailCtrl" ng-init='init(<?= json_encode($viewBag) ?>)'>
	<nc-alert nc-model="alert"></nc-alert>
	<div ap-component="ap/form-product-add">
		<div ng-include="'admin-panel'"></div>
	</div>

</div>
<?php $this->stop() ?>