<?php $this->layout('layouts/page-with-sidebar', ['title' => 'Local Category']) ?>

<?php $this->start('page-body') ?>
	<div class="local-category-page">
		<? $this->insert('components/alert-text', ['close' => true, 'color' => 'green', 'text' => 'Your changes have been saved.']) ?>
		<? $this->insert('components/alert-text', ['close' => true, 'color' => 'red', 'text' => 'There is an error!']) ?>

		<? $this->insert('components/page-title-with-buttons-local-category', ['text' => 'Local Category']) ?>

		<div class="local-category-section">
			<div class="col-xs-12 category-header no-padding">
				<span class="col-xs-8">
					Category Name
				</span>
				<span class="col-xs-1 text-align-center">
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
					<li>
				    	<div class="category-content row no-margin">
				    		<div class="category-content-padding">
					    		<span class="col-xs-8 local-category-toggle-area">
									<span class="no-children-row"></span>Category Name0
								</span>
								<span class="col-xs-1">
									20
								</span>
								<span class="col-xs-1 text-align-center">
									<i class="fa fa-eye color-dark-grey icon-size-20"></i>
								</span>
								<span class="col-xs-1 text-align-center">
									<i class="fa fa-gear color-dark-grey icon-size-20"></i>
									<i class="fa fa-caret-down color-dark-grey" 
									   data-container="body" 
									   data-html="true" 
									   data-toggle="popover" 
									   data-placement="bottom" 
									   data-content="
										<div  data-toggle='modal' data-target='#local-category-detail'>View / Edit</div>
										<div>View Products</div>
										<div>Delete</div>">
									</i>	
								</span>
								<span  class="col-xs-1 text-align-center">
									<i class="fa fa-arrows color-dark-grey icon-size-20" 
									></i>
								</span>
							</div>
				    	</div>
				    </li>
				    <li>
				    	<div class="category-content row no-margin">
				    		<div class="category-content-padding">
					    		<span class="col-xs-8 local-category-toggle-area">
									<i class="fa fa-chevron-right toggle-button"></i>Category Name1
								</span>
								<span class="col-xs-1">
									20
								</span>
								<span class="col-xs-1 text-align-center">
									<i class="fa fa-eye color-dark-grey icon-size-20"></i>
								</span>
								<span class="col-xs-1 text-align-center">
									<i class="fa fa-gear color-dark-grey icon-size-20"></i>
									<i class="fa fa-caret-down color-dark-grey" 
									   data-container="body" 
									   data-html="true" 
									   data-toggle="popover" 
									   data-placement="bottom" 
									   data-content="
										<div  data-toggle='modal' data-target='#local-category-detail'>View / Edit</div>
										<div>View Products</div>
										<div>Delete</div>">
									</i>	
								</span>
								<span  class="col-xs-1 text-align-center">
									<i class="fa fa-arrows color-dark-grey icon-size-20" 
									></i>
								</span>
							</div>
				    	</div>
				    </li>
				    <li>
				    	<div class="category-content row no-margin">
				    		<div class="category-content-padding">
					    		<span class="col-xs-8">
					    			<i class="fa fa-level-up fa-rotate-90 caret-grey"></i>
									Category Name2
								</span>
								<span class="col-xs-1">
									10
								</span>
								<span class="col-xs-1 text-align-center">
									<i class="fa fa-eye color-dark-grey icon-size-20"></i>
								</span>
								<span class="col-xs-1 text-align-center">
									<i class="fa fa-gear color-dark-grey icon-size-20"></i>
									<i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<div>View / Edit</div>
											<div>View Products</div>
											<div>Delete</div>"></i>	
								</span>
								<span class="col-xs-1 text-align-center">
									<i class="fa fa-arrows color-dark-grey icon-size-20"></i>
								</span>
							</div>
				    	</div>
				    </li>
				    <li>
				    	<div class="category-content row no-margin">
				    		<div class="category-content-padding">
					    		<span class="col-xs-8">
					    			<i class="fa fa-level-up fa-rotate-90 caret-grey"></i>
									Category Name3
								</span>
								<span class="col-xs-1">
									10
								</span>
								<span class="col-xs-1 text-align-center">
									<i class="fa fa-eye-slash color-grey icon-size-20"></i>
								</span>
								<span class="col-xs-1 text-align-center">
									<i class="fa fa-gear color-dark-grey icon-size-20"></i>
									<i class="fa fa-caret-down color-dark-grey" data-container="body" data-html="true" data-toggle="popover" data-placement="bottom" data-content="<div>View / Edit</div>
											<div>View Products</div>
											<div>Delete</div>"></i>
								</span>
								<span class="col-xs-1 text-align-center">
									<i class="fa fa-arrows color-dark-grey icon-size-20"></i>
								</span>
							</div>
				    	</div>
				    </li>
				</ol>	
			</div>
		</div>
	</div>

<? $this->insert('components/modal-local-category', ['id' => 'local-category-detail', 'header' => 'Local Category Detail']) ?>

<?php $this->stop() ?>