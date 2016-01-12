<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Local Category']) ?>

<?php $this->start('page-body') ?>
	<div ng-controller="AdminCategoryCtrl" ng-init="init()" class="local-category-page">
		<pre>{{formData}}</pre>
		<div ng-show="alert.show" uib-alert template-url="common/alert" type="{{ alert.type }}" close="alert.close()">{{alert.message}}</div>
		<div class="page-header with-border">
		    <h1 class="float-left page-header-title">Global Category</h1>
		    <span class="float-right page-header-action">
		    	<button type="button" class="btn-white btn margin-right-10">
		          <span class="">Export</span>
		        </button>
		        <button type="button" class="btn-white btn margin-right-10" data-toggle="modal" data-target="#modal-category-detail" ng-click="$emit('openEditGlobalCategory')">
		          <span class="">Add New Category</span>
		        </button>
		        <button type="button" class="btn-blue btn btn-width-xl">
		          <span class="">Save Changes</span>
		        </button>
		    </span>
		</div>
		<div class="local-category-section">
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
						Action	
					</span>
					<span class="col-xs-1 text-align-center">
						Move
					</span>
				</div>
				<div class="col-xs-12 no-padding" ui-tree max-depth="5">
					<ol class="sortable no-padding" ui-tree-nodes ng-model="categories">
						<li ng-repeat="node in categories" ui-tree-node ng-include="'global_category/nodes'"></li>
					</ol>	
				</div>
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
						<form class="ah-form" name="editingForm" ng-submit="$emit('saveEditGlobalCategory')">
							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header">
											<h2>Global Category Information</h2>
										</div>
										<div class="form-section-content modal-custom">
						                  <input type="text"
							                    name="NameTh"
							                    class="form-control"
							                    autocomplete="off"
							                    ng-class="{ 'has-error' : editingForm.NameTh.$invalid }"
							                    ng-model="editingCategory.NameTh"
							                    ng-pattern="/^[a-zA-Z0-9ก-๙ ]+$/" 
							                    ng-template="common/input/text" 
							                    ng-template-options="{
							                      'label': 'Category Name (Thai)',
							                      'labelClass': 'required',
							                      'error' : {
							                        'message': 'Cannot use special characters such as ! # $ % ^ &',
							                        'show' : editingForm.NameTh.$invalid
							                      }
							                    }"
							                    required
							                  />
							                  <input type="text" 
							                    name="NameEn"
							                    class="form-control"
							                    autocomplete="off"
							                    ng-class="{ 'has-error' : editingForm.NameEn.$invalid }"
							                    ng-model="editingCategory.NameEn" 
							                    ng-pattern="/^[a-zA-Z0-9 ]+$/" 
							                    ng-template="common/input/text" 
							                    ng-template-options="{
							                      'label': 'Category Name (Eng)',
							                      'labelClass': 'required',
							                      'error' : {
							                        'message': 'Cannot use special characters such as ! # $ % ^ &',
							                        'show' : editingForm.NameEn.$invalid
							                      }
							                    }"
							                    required
							                  />
							                  <input type="text" 
							                    name="UrlKeyEn"
							                    class="form-control"
							                    ng-model="editingCategory.UrlKeyEn"
							                    ng-template="common/input/text" 
							                    ng-template-options="{
							                      'label': 'Url (Eng)'
							                    }"
							                  />
							                  <input type="text" 
							                    name="Commission"
							                    class="form-control" 
							                    ng-pattern="/^[0-9]+$/" 
							                    ng-model="editingCategory.Commission"
							                    ng-template="common/input/text" 
							                    ng-template-options="{
							                      'label': 'Commission (%)',
							                      'inputSize': 'small',
							                      'error' : {
							                        'message': 'Must be a number',
							                        'show' : editingForm.Commission.$invalid
							                      }
							                    }"
							                  />
										</div>
									</div>
									<div class="form-section">
										<div class="form-section-header">
											<h2>Map Attribute Set</h2>
										</div>
										<div class="form-section-content modal-custom">
											<div class="tradable-list">
	              
								              <div class="left-column">
								                <div class="search-section section-search">
								                  <div class="input-group">
								                    <input type="text" class="form-control input-search-icon search-box" placeholder="Search Attribute Set" aria-describedby="basic-addon2">
								                    <span class="input-group-btn">
								                      <button class="btn btn-white" type="button">Search</button>
								                    </span>
								                  </div>
								                </div>
								                <div class="clickable-list">
								                  <ul class="content-column">
								                    <li>Attribute Set A</li>
								                    <li class="active">Attribute Set B</li>
								                    <li>Attribute Set C</li>
								                    <li>Attribute Set D</li>
								                    <li>Attribute Set E</li>
								                    <li>Attribute Set F</li>
								                    <li>Attribute Set G</li>
								                    <li>Attribute Set H</li>
								                    <li>Attribute Set J</li>
								                    <li>Attribute Set K</li>
								                    <li>Attribute Set G</li>
								                    <li>Attribute Set H</li>
								                    <li>Attribute Set J</li>
								                  </ul>
								                </div>
								              </div>

								              <div class="center-column">
								                <div class="trade-button active"> 
								                   <i class="fa fa-chevron-right"></i>
								                </div>
								                <div class="trade-button"> 
								                  <i class="fa fa-chevron-left"></i>
								                </div>
								              </div>

								              <div class="right-column">
								                <div class="list-header">
								                  <span class="column-1">Attribute Set in This Category</span>
								                </div>
								                <div class="clickable-list">
								                  <ul class="content-column">
								                    <li>
								                      <span class="column-1">Attribute Set W</span>
								                    </li>
								                    <li class="active">
								                      <span class="column-1">Attribute Set X</span>
								                    </li>
								                    <li>
								                      <span class="column-1">Attribute Set Z</span>
								                    </li>
								                    
								                  </ul>
								                </div>
								              </div>

								            </div>  
										</div>
									</div>
						            <div class="form-section">
						                <div class="form-section-header"><h2>Category Visibility</h2></div>
						                <div class="form-section-content modal-custom">
						                    <label ng-template="common/input/multiline-radio" ng-template-options="{ 'label' : 'Visibility' }" ng-repeat="choice in editingStatusOptions"><input type="radio" ng-model="editingCategory.Status" ng-value="choice.value"/>{{choice.text}}</label>
						                </div>
						            </div>
									<!--div class="form-section">
										<div class="form-section-header"><h2>Category Visibility</h2></div>
										<div class="form-section-content">
											<? $this->insert('components/forms/dropdown-with-label', ["label" => "Visibility", "options" => ["Hide", "Show"]]) ?>
										</div>
									</div-->
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