<?php

$this->layout('layouts/page-with-sidebar', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div>
		<? $this->insert('components/page-title-with-buttons', ['text' => "Shop Profile Setting",
			'buttons' => [
	        	['link' => '#', 'class' => 'btn-white btn-width-xl', 'name' => 'Live View'],
	        	['link' => '#', 'class' => 'btn-blue btn-width-xl', 'name' => 'Save']
	        ]
		]) ?>

		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<div id="add-product-more-option-tab-content">
							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Shop Information</h2></div>
										<div class="form-section-content">
											<? $this->insert('components/forms/text-with-label', ["label" => "Shop ID", "field_content" => "DE3923"]) ?>
											<div class="form-group ">
												<div class="width-label"><label class="control-label"> Shop Logo file</label></div>
											    <div class="width-field-normal">
											    	<input type="file" name="pic" accept="image/*">
											    </div>
											</div>
											<div class="form-group ">
												<div class="width-label"><label class="control-label"> Shop Logo Preview</label></div>
											    <div class="width-field-normal">
											    	<img src="https://placehold.it/160x60">
											    </div>
											</div>

											<? $this->insert('components/forms/input-text-with-label', ["label" => "Shop Name", "label_class" => "required", "size" => "large"]) ?>
											<? $this->insert('components/forms/textarea-with-label', ["label" => "<div>Shop Description</div><div>(English)</div>", "rows" => "4", "size" => "large" ]) ?>
											<? $this->insert('components/forms/textarea-with-label', ["label" => "<div>Shop Description</div><div>(Thai)</div>", "rows" => "4", "size" => "large"]) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Float Message (English)", "size" => "large"]) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Float Message (Thai)", "size" => "large"]) ?>
											<? $this->insert('components/forms/textarea-with-label', ["label" => "Shop Address", "rows" => "4", "size" => "large"]) ?>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Financial Information</h2></div>
										<div class="form-section-content">
											<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "Bank Account Number", "value" => '1234-XXXX-XXXX-1234']) ?>
											<? $this->insert('components/forms/input-text-with-label-disabled', ["label" => "Bank Account Name", "value" => 'Lara Company Limited', 'hint' => 'Please contact COL if you wish to change your financial detail']) ?>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Social Media Link</h2></div>
										<div class="form-section-content">
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Facebook", "size" => 'large']) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "YouTube", "size" => 'large']) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Twitter", "size" => 'large']) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Instragram", "size" => 'large']) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Pinterest", "size" => 'large']) ?>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>More Options</h2></div>
										<div class="form-section-content">
											<? $this->insert('components/forms/dropdown-with-label', ["label" => "Gift Wrap", "options" => ['Not Available'], "tooltip" => "this is tooltip"]) ?>
											<? $this->insert('components/forms/dropdown-with-label', ["label" => "Tax Invoice", "options" => ['Not Available'], "tooltip" => "this is tooltip"]) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Stock Alert", "tooltip" => "this is tooltip", "size" => "small"]) ?>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<button class="btn btn-white btn-width-xl">Live View</button>
							<button class="btn btn-blue btn-width-xl">Save</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->stop() ?>