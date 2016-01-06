<?php $this->layout('layouts/page-with-sidebar-admin', ['title' => 'Local Category']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page">

		<div class="page-header with-border">
		    <h1 class="float-left page-header-title">Global Category</h1>
		    <span class="float-right page-header-action">
		    	<button type="button" class="btn-white btn margin-right-10">
		          <span class="">Export</span>
		        </button>
		        <button type="button" class="btn-white btn margin-right-10" data-toggle="modal" data-target="#modal-category-detail">
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
			<div class="col-xs-12 no-padding">
				<ol class="sortable no-padding">
					<li><? $this->insert('components/global-category-category-content', ['no_child' => true, 'category' => 'Category Name 0', 'category_id' => 1234567, 'product_count' => 20, 'visible' => true]) ?></li>
					<li>
						<? $this->insert('components/global-category-category-content', ['parent' => true, 'category' => 'Category Name 1', 'category_id' => 1234567, 'product_count' => 20, 'visible' => true]) ?>
						<ol>
							<li><? $this->insert('components/global-category-category-content', ['parent' => false, 'category' => 'Category Name 2', 'category_id' => 1234567, 'product_count' => 10, 'visible' => true]) ?></li>
							<li><? $this->insert('components/global-category-category-content', ['parent' => false, 'category' => 'Category Name 3', 'category_id' => 1234567, 'product_count' => 10, 'visible' => false]) ?></li>
						</ol>
					</li>
				</ol>	
			</div>
		</div>
	</div>

	<script>
		$(document).ready(function() {
			$('.sortable').nestedSortable({
				handle: 'div',
				items: 'li',
				toleranceElement: '> div',
				maxLevels: '5'
			});

			// Toggle Local Category page
			$( "i.local-category-toggle-area" ).click(function() {
				$(this).toggleClass('fa-chevron-right fa-chevron-down').closest('li').children('ol').slideToggle('slow');
			});
		});
	</script>

	<!-- Modal -->
	<div class="modal fade" tabindex="-1" role="dialog" id="modal-category-detail">
		<div class="modal-dialog modal-xl">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h3 class="modal-title">Global Category Detail</h3>
				</div>
				<div class="modal-body margin-top-20">
					<form class="ah-form">
						<div class="row">
							<div class="col-xs-12">
								<div class="form-section">
									<div class="form-section-header">
										<h2>Global Category Information</h2>
									</div>
									<div class="form-section-content modal-custom">
										<? $this->insert('components/forms/input-text-with-label', ["label" => "Category Name (Thai)","label_class" => "required"]) ?>
										<? $this->insert('components/forms/input-text-with-label', ["label" => "Category Name (Eng)","label_class" => "required"]) ?>
										<? $this->insert('components/forms/input-text-with-label', ["label" => "URL (Eng)"]) ?>
										<? $this->insert('components/forms/input-text-with-label', ["label" => "Comission (%)", "size" => "small"]) ?>
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
									<div class="form-section-content">
										<? $this->insert('components/forms/dropdown-with-label', ["label" => "Visibility", "options" => ["Hide", "Show"]]) ?>
									</div>
								</div>
							</div> <!-- end .col-xs-12 -->
							<div class="col-xs-12">
								<span class="float-right">
									<a class="link-btn-plain" data-dismiss="modal">Cancel</a>
									<button type="button" class="btn btn-blue btn-width-xl">Save</button>
								</span>
							</div> <!-- end .col-xs-12 -->
						</div> <!-- end .row -->
					</form>
				</div> <!-- end .modal-body -->
			</div> <!-- end .modal-content -->
		</div> <!-- end .modal-dialog -->
	</div> <!-- end .modal -->

<?php $this->stop() ?>