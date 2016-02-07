<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Admin - Category']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminCategoryCtrl" ng-init="init()" class="local-category-page">
		<div ng-show="alert.show" uib-alert template-url="common/alert" type="{{alert.type}}" close="alert.close()">{{alert.message}}</div>
		<div class="page-header with-border">
		    <h1 class="float-left page-header-title">Global Category</h1>
		    <span class="float-right page-header-action">
		    	<button type="button" class="btn-white btn margin-right-10">
		          <span class="">Export</span>
		        </button>
		        <button type="button" class="btn-white btn margin-right-10" data-toggle="modal" data-target="#modal-category-detail" ng-click="$emit('openEditGlobalCategory')">
		          <span class="">Add New Category</span>
		        </button>
		        <button type="button" class="btn-blue btn btn-width-xl" ng-click="$emit('saveGlobalCategory')">
	          <span class="">Save Changes</span>
		        </button>
		    </span>
		</div>
		<div ng-show="!loading && categories.length > 0" class="local-category-section">
			<div class="col-xs-12 category-header no-padding">
				<span class="col-xs-7">
					Category Name
				</span>
				<span class="col-xs-1">
					ID
				</span>
				<span class="col-xs-1">
					Products
				</span>
				<span class="col-xs-1 text-align-center">
					Visible
				</span>
					<span class="col-xs-1 text-align-center">
						Move	
					</span>
					<span class="col-xs-1 text-align-center">
						Action
					</span>
				</div>
				<div class="col-xs-12 no-padding margin-bottom-60" ui-tree="treeOptions" max-depth="4">
					<ol class="sortable no-padding" ui-tree-nodes ng-model="categories">
						<li ng-repeat="node in categories" ui-tree-node ng-include="'global_category/nodes'"></li>
					</ol>	
				</div>
		</div>
		<div ng-show="!loading && categories.length == 0" class="local-category-empty-section margin-top-20">
			<span class="">
				<span class="zero-category-image">
				</span>
			</span>
			<span class="local-category-empty-text">You do not have global category</span>
		</div>
      	<div ng-show="loading">
          <? $this->insert('components/table-loading', ['text' => 'Loading...']) ?>
      	</div>
		<!-- Modal -->
		<div class="modal fade" tabindex="-1" role="dialog" id="modal-category-detail">
			<div class="modal-dialog modal-xl">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h3 class="modal-title">Global Category Detail</h3>
					</div>
					<div class="modal-body margin-top-20">
						<div ng-show="alert2.show" uib-alert template-url="common/alert" type="{{ alert2.type }}" close="alert2.close()" ng-bind-html="alert2.message"></div>
						<form class="ah-form" name="editingForm" ng-submit="$emit('saveEditGlobalCategory')" novalidate>
							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header">
											<h2>Global Category Information</h2>
										</div>
										<div class="form-section-content modal-custom">
							                <div ng-template="common/input/text2"
								                ng-template-options="{
								                  'label': 'Category Name (Thai)',
								                  'labelClass': 'required',
								                  'error' : {
								                        'messages': {
								                          'required': 'This is a required field'
								                        },
								                        'show': $root.isInvalid(editingForm.NameTh),
								                        'conditions' : editingForm.NameTh.$error
								                   }
								                }">
												<input
												 class="form-control"
												 name="NameTh"
												 ng-model="editingCategory.NameTh"
												 ng-class="{ 'has-error' : $root.isInvalid(editingForm.NameTh) }"
												 maxlength="100"
												 required />
							                </div>
							                <div ng-template="common/input/text2"
								                ng-template-options="{
								                  'label': 'Category Name (Eng)',
								                  'labelClass': 'required',
								                  'error' : {
								                        'messages': {
								                          'required': 'This is a required field',
								                          'pattern': 'Only English allowed'
								                        },
								                        'show': $root.isInvalid(editingForm.NameEn),
								                        'conditions' : editingForm.NameEn.$error
								                   }
								                }">
												<input
												 class="form-control"
												 name="NameEn"
												 ng-model="editingCategory.NameEn"
												 ng-class="{ 'has-error' : $root.isInvalid(editingForm.NameEn) }"
												 ng-pattern="/^[^ก-๙]+$/"
												 maxlength="100"
												 required />
							                </div>
						                    <div ng-template="common/input/text2"
						                      ng-template-options="{
						                        'label': 'URL (Eng)',
						                        'error' : {
						                              'messages': {
						                                'pattern': 'Only English letters, numbers,  &quot;- &quot;, and   &quot;_&quot;; allowed. Space is not allowed'
						                                },
						                              'show': $root.isInvalid(editingForm.UrlKeyEn),
						                              'conditions' : editingForm.UrlKeyEn.$error
						                         }
						                      }">
						                      <input
						                        class="form-control"
						                        name="UrlKeyEn"
						                        ng-model="editingCategory.UrlKeyEn"
						                        ng-pattern="/^[A-Za-z0-9_\-]+$/"
						                        ng-class="{ 'has-error' : $root.isInvalid(editingForm.UrlKeyEn) }"
						                        maxlength="300"
						                        />
						                    </div>
						                    <div ng-template="common/input/text2"
						                      ng-template-options="{
						                        'label': 'Commission (%)',
						                      	'labelClass': 'required',
						                        'error' : {
						                              'messages': {
								                          	'required': 'This is a required field',
						                            		'pattern': 'Only numbers and decimals (up to 2 digits) allowed'
						                                },
						                              'show': $root.isInvalid(editingForm.Commission),
						                              'conditions' : editingForm.Commission.$error
						                         }
						                      }">
						                      <input
						                        class="form-control"
						                        name="Commission"
						                        ng-model="editingCategory.Commission"
                        						ng-pattern="/^\d+(\.\d{1,})?$/"
						                        ng-class="{ 'has-error' : $root.isInvalid(editingForm.Commission) }"
						                        maxlength="20"
						                        />
						                    </div>
										</div>
									</div>
									<div class="form-section">
										<div class="form-section-header">
											<h2>Map Attribute Set</h2>
										</div>
										<div class="form-section-content modal-custom">
											<div nc-tradable-select nc-test="test" nc-model="editingCategory.AttributeSets" nc-select-options="attributeSetOptions" nc-options="{ 'map' : { 'text': 'AttributeSetNameEn', 'value' : 'AttributeSetId' } }"></div> 
											<div class="row col-xs-12">
							                  <p style="margin-left: 30px; margin-top:15px"><span class="color-red">*</span> If category is mapped to a product, attribute set mapping cannot be changed</p>
							                </div>
										</div>
									</div>
						            <div class="form-section">
						                <div class="form-section-header"><h2>Category Visibility</h2></div>
						                <div class="form-section-content modal-custom">
						                    <div ng-template="common/input/multiline-radio" ng-template-options="{ 'label' : 'Visibility' }">
						                    	<label ng-repeat="choice in editingStatusOptions"><input type="radio" ng-model="editingCategory.Visibility" ng-value="choice.value"/>{{choice.text}}</label>
						                	</div>
						                </div>
						            </div>
								</div> <!-- end .col-xs-12 -->
								<div class="col-xs-12">
									<span class="float-right">
										<a class="link-btn-plain" data-dismiss="modal">Cancel</a>
										<button type="submit" class="btn btn-blue btn-width-xl">Save</button>
									</span>
								</div> <!-- end .col-xs-12 -->
							</div> <!-- end .row -->
						</form>
					</div> <!-- end .modal-body -->
				</div> <!-- end .modal-content -->
			</div> <!-- end .modal-dialog -->
		</div> <!-- end .modal -->
	</div>

<?php $this->stop() ?>