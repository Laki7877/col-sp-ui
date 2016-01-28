<?php

$this->layout('layouts/page-with-sidebar-admin', ['title' => 'Administration System'])
?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminAccountAddCtrl">
		<? $this->insert('components/page-title-breadcrumb-with-cancel-save', ['text' => "Admin Accounts/Create New Admin Account"]) ?>
		<div>
			<form ng-show="!saving" name="form" class="ah-form sticky-mainform-action" novalidate>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">
						<div id="add-product-more-option-tab-content">
							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Admin Account Information</h2></div>
										<div class="form-section-content">
											<? $this->insert('components/forms/text-with-label', ["label" => "Admin ID", "field_content" => "{{ formData.NameEn }}"]) ?>
								              <!-- Email -->
								              <div ng-template="common/input/text2"
								                ng-template-options="{
								                  'label': 'Email',
								                  'labelClass': 'required',
								                  'error' : {
								                        'messages': {
								                          'required': 'This is a required field',
								                          'email': 'Only valid email allowed'
								                        },
								                        'show': $root.isInvalid(form.Email),
								                        'conditions' : form.Email.$error
								                   }
								                }">
								                <input
								                  class="form-control"
								                  name="Email"
								                  ng-model="formData.Email"
								                  ng-class="{ 'has-error' : $root.isInvalid(form.Email) }"
								                  type="email"
								                  required />
								              </div>
								              <!-- Name -->
								              <div ng-template="common/input/text2"
								                ng-template-options="{
								                  'label': 'Name',
								                  'labelClass': 'required',
								                  'error' : {
								                        'messages': {
								                          'required': 'This is a required field',
								                          'email': 'Only valid email allowed'
								                        },
								                        'show': $root.isInvalid(form.Email),
								                        'conditions' : form.Email.$error
								                   }
								                }">
								                <input
								                  class="form-control"
								                  name="Email"
								                  ng-model="formData.Email"
								                  ng-class="{ 'has-error' : $root.isInvalid(form.Email) }"
								                  type="email"
								                  required />
								              </div>								              
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Email", "label_class" => "required"]) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Name", "label_class" => "required"]) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Phone Number", "label_class" => "required"]) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Employee ID"]) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Position"]) ?>
											<? $this->insert('components/forms/input-text-with-label', ["label" => "Division / BU"]) ?>
											<? $this->insert('components/forms/password-field', ["label" => "Password", "label_class" => "required", 'form_group_class' => 'margin-top-30']) ?>
											<? $this->insert('components/forms/password-field', ["label" => "Confirm Password", "label_class" => "required"]) ?>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Admin Account Roles</h2></div>
										<div class="form-section-content">
											<? $this->insert('components/forms/dropdown-with-label', ["label" => "Admin Role", "label_class" => "required", "options" => ["Super Admin", "User"]]) ?>
											<? $this->insert('components/forms/link-action', ['text' => 'Create New Admin Role', 'link' => '/?p=admin_add_role']) ?>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<p class="text-align-right"><span class="color-red"><i class="fa fa-asterisk"></i></span> - Required Field</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="add-product-form-action main-form-action full-width-row">
					<div class="container-fluid">
						<div class="float-right">
							<a href="#" class="link-btn-plain">Cancel</a>
							<button class="btn btn-blue btn-width-xl">Save</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

<?php $this->stop() ?>