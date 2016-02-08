<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Export Products']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page">


		<div class="page-header with-border">

		    <h1 class="float-left page-header-title ah-breadcrumb">
		    	<a href="/?p=index" class="ah-breadcrumb-path ah-breadcrumb-idx-0">Products</a>
		    	<span class="ah-breadcrumb-splitter">/</span>
		    	<a href="#" class="ah-breadcrumb-path ah-breadcrumb-idx-1">Export</a>
		    </h1>

		    <span class="float-right page-header-action">
		        <a href="#" class="btn margin-left-10 btn-white btn-width-xl">
		          	<span class="">Cancel</span>
		        </a>
		        <a href="#" class="btn margin-left-10 btn-blue  btn-width-xl">
		          	<span class="">Export</span>
		        </a>
		    </span>
		</div>


		<div>
			<form class="ah-form sticky-mainform-action">
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane margin-top-20 active" id="more_option">

						<div id="import-product-content-page">
	
							<div class="row">
								<div class="col-xs-12">
									<div class="form-section">
										<div class="form-section-header"><h2>Select what you want to export</h2></div>
										<div class="form-section-content">

											<div class="row">

												<? $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "", "label_class" => "required", "choices" => ["Select All"]]) ?>
												<? $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "System Information", "label_class" => "required", "choices" => ["Product Status", "PID", "Group ID"]]) ?>
												<? $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Vital Information", "label_class" => "required", "choices" => ["SKU", "Product Name (English)", "Product Name (Thai)","Brand Name"]]) ?>
												<? $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Category", "label_class" => "required", "choices" => ["Global Category", "Local Category"]]) ?>
												<? $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Price", "label_class" => "required", "choices" => ["Original Price","Sale Price"]]) ?>
												<? $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Description", "label_class" => "required", "choices" => ["Description (English)", "Description (Thai)","Short Description (English)","Short Description (Thai)"]]) ?>
												<? $this->insert('components/forms/multiple-checkbox-multiline', ["label" => "Shipping & Inventory", "label_class" => "required", "choices" => ["Stock Type", "Preparation Time", "Package - Lenght", "Package - Height", "Package - Width", "Package - Weight", "Inventroy Amount", "Safety Stock Amount"]]) ?>
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
											
											<div class="tradable-list">
                
											    <div class="left-column">
											      <div class="search-section section-search">
											          <input type="text" class="form-control input-search-icon search-box" placeholder="Search Attribute Set" aria-describedby="basic-addon2">
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
											      <div class="checkbox">
											      	<label><input type="checkbox">Select All Attribute Sets</label>
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

											    <div class="right-column" style="width: 300px;">
											      <div class="list-header">
											        <span>Selected Attribute Set</span>
											      </div>
											      <div class="clickable-list">
											        <ul class="content-column">
											          <li>Attribute Set A</li>
											          <li class="active">Attribute Set B</li>
											          <li>Attribute Set C</li>
											          <li>Attribute Set D</li>
											          <li>Attribute Set E</li>
											          <li>Attribute Set F</li>
											         
											        </ul>
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

				 <div class="main-form-action full-width-row">
			        <div class="container-fluid">
			          <div class="float-right">
			            <a href="#" class="link-btn-plain">Cancel</a>
			            <button class="btn btn-blue btn-width-xl">Export</button>
			          </div>
			        </div>
			     </div>

			</form>
		</div>
	</div>

<? $this->insert('components/modal-local-category', ['id' => 'local-category-detail', 'header' => 'Local Category Detail']) ?>

<?php $this->stop() ?>